import { FastifyInstance } from "fastify";
import { verificarAdmin } from "../../middleware/auth";
import {itemCardapio } from 'shared/db/schema';
import { db } from "shared/db"; 
import { eq } from "drizzle-orm";

export async function itemsConfigureRoutes(app: FastifyInstance){
    app.addHook("onRequest", verificarAdmin)

    app.post("/", async(request, reply) => {
        const {nome, categoriaId, preco} = request.body as {
            nome: string,
            preco: string,
            categoriaId: number
        }

        if(!nome || !preco || !categoriaId){
            return reply.status(400).send({
                error:'defina o nome, preco e categoria do item'
            })
        }

        const [novoItem] = await db.insert(itemCardapio).values({
            nome: nome,
            preco: preco,
            categoriaId: categoriaId
        }).returning();

        return reply.status(201).send(novoItem)
    })

      // deleta os itesns
      app.delete("/:id", async (request, reply) => {
        const { id } = request.params as { id: string }
    
        await db.delete(itemCardapio).where(eq(itemCardapio.id, Number(id)))
    
        return reply.status(200).send({ message: "item deletado" })
      })
}