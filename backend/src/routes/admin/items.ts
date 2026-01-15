import { FastifyInstance } from "fastify";
import { verificarAdmin } from "../../middleware/auth";
import {itemCardapio } from 'shared/db/schema';
import { db } from "shared/db"; 

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
}