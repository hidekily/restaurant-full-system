import { FastifyInstance } from "fastify";
import { verificarAdmin } from "../../middleware/auth";
import { menuItem } from 'shared/db/schema';
import { db } from "shared/db"; 
import { eq } from "drizzle-orm";
import z from "zod";

export async function itemsConfigureRoutes(app: FastifyInstance){

    const createItemSchema = z.object({
        name: z.string().min(1),
        price: z.string().min(1),
        categoryId: z.number()
    })

    // middleware para verificar se o usuario esta logado ou nao
    app.addHook("onRequest", verificarAdmin)

    app.post("/", async(request, reply) => {
        const result = createItemSchema.safeParse(request.body)

        if(!result.success){
            return reply.status(400).send({erro:"error"})
        }

        const {name, price, categoryId} = result.data

        const [newItems] = await db.insert(menuItem).values({
            name,
            price,
            categoryId
        }).returning()

        return(reply.status(201).send({data: newItems, message:"success on creating item 🦦"}))
    })

      // deleta os itesns
      app.delete("/:id", async (request, reply) => {
        const { id } = request.params as { id: string }
    
        const idParamsSchema = z.object({
            id: z.string().regex(/^\d+$/)
        })

        const parseResult = idParamsSchema.safeParse({id})

        await db.delete(menuItem).where(eq(menuItem.id, Number(id)))
    
        return reply.status(200).send({data:parseResult, message: "success on deleting your item🦦" })
      })
}