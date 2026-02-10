import { FastifyInstance } from "fastify";
import { db } from "shared/db";
import { verificarAdmin } from "../../middleware/auth.js";
import { string, z } from "zod";
import { order, orderItem} from "shared/db/schema";
import { menuItem } from "shared/db/schema";
import { eq } from "drizzle-orm";

export async function ordersRoutes(app: FastifyInstance){
    const createOrderSchema = z.object({
        tableId: z.number().int(),
        items: z.array(z.object({
            menuItemId: z.number().int(),
            quantity: z.number().min(1)
        }))
    })

    app.addHook("onRequest", verificarAdmin)

    app.post("/", async(request, reply) => {
        const result = createOrderSchema.safeParse(request.body)

        if(!result.success){
            return reply.status(400).send({error:"here 1"})
        }

        const {tableId, items} = result.data

        const [newOrder] = await db.insert(order).values({
            tableId: tableId
        }).returning()
        
        const storeOrderItemProps = await Promise.all(
            items.map(async (i) =>{
                const res = await db.select().from(menuItem).where(eq(menuItem.id, i.menuItemId))

                if(!res[0]){
                    throw new Error("Menu item not found")
                }   

                return{
                    menuItemId: i.menuItemId,
                    quantity: i.quantity,
                    orderId: newOrder.id,
                    unitPrice: res[0].price
                }
            })
        )

        const [newOrderItem] = await db.insert(orderItem).values(storeOrderItemProps).returning()

        return reply.status(201).send({data: newOrder, newOrderItem, message: "here2"})
    })

    app.get("/", async(request, reply) => {
        const pedidos = await db.query.order.findMany({
            with:{
                items: true,
                table: true
            }
        })

        return reply.send(pedidos)
    })
    
    app.patch("/:id", async(request, reply) => {
        const statusSchema = z.object({
            status: z.enum(["pending", "onhold", "completed"])
        })

        const result = statusSchema.safeParse(request.body)
        const { id } = request.params as { id: string }

        if(!result.success){
            throw new Error("here3")
        }

        const res = await db.update(order).set({status: result.data.status}).where(eq(order.id, Number(id)))

        return reply.status(201).send({data: res, message: "deu certo"})
    })

    app.patch("/:orderId/items/:itemId", async(request, reply) => {
        const {orderId, itemId} = request.params as {orderId: string, itemId: string}

        const orderItemSchema = z.object({
            done: z.boolean()
        })

        const result = orderItemSchema.safeParse(request.body)

        if(!result.success){
            throw new Error("erro")
        }

        const res = await db.update(orderItem).set({done: result.data.done}).where(eq(orderItem.id, Number(itemId)))
    })
}