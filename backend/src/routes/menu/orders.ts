import {z} from "zod"
import { FastifyInstance } from 'fastify'
import { db } from "shared/db"
import { menuItem, order, orderItem } from "shared/db/schema"
import { eq } from "drizzle-orm"

const createOrderSchema = z.object({
        tableId: z.number().int(),
        items: z.array(z.object({
            menuItemId: z.number().int(),
            quantity: z.number().min(1),
        }))
    })

export function clientOrders(app: FastifyInstance){
    app.post('/', async(request, reply) =>{
        const result = createOrderSchema.safeParse(request.body)

        if(!result.success){
            return reply.status(400).send({error:"falha ao buscar dados"})
        }

        const {tableId, items} = result.data

        const [newOrderTableId] = await db.insert(order).values({
            tableId, 
        }).returning()

        const storeOrderItemsValues = await Promise.all(
            items.map(async (i) => {
                const res = await db.select().from(menuItem).where(eq(menuItem.id, i.menuItemId))

                if(!res[0]){
                    throw new Error("order not found")
                }

                return{
                    menuItemId: i.menuItemId,
                    quantity: i.quantity,
                    orderId: newOrderTableId.id,
                    unitPrice: res[0].price
                }
            })

        )

        const [newOrderItems] = await db.insert(orderItem).values(storeOrderItemsValues).returning()

        return reply.status(204).send({data: {newOrderItems, newOrderTableId}, message:"deu certo"})
    })
}