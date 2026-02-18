import { FastifyInstance } from "fastify";
import { db } from "shared/db";
import { eq } from "drizzle-orm";
import { number, z } from "zod"
import { diningTable } from "shared/db/schema";
import { verificarAdmin } from "../../middleware/auth";

export async function tablesRoutes(app: FastifyInstance){

    app.addHook("onRequest", verificarAdmin)

    const table = z.object({
        number: z.number().int(),
        area: z.enum(["indoor", "outdoor"])
    })

    app.post("/", async(request, reply) => {
        const res = table.safeParse(request.body)

        if(!res.success){
            return reply.status(400).send("erro")
        }

        const {number, area} = res.data

        const [newTable] = await db.insert(diningTable).values({
            number, 
            area
        }).returning()

        return reply.status(201).send({data: newTable, message:"deu certo"})
    })

    app.get("/", async(request, reply) => {
        const alltables = await db.select().from(diningTable)

        return reply.send(alltables)
    })

    app.delete('/:id', async(request, reply) => {
        const {id} = request.params as {id: number}

        await db.delete(diningTable).where(eq(diningTable.id, Number(id)))

        return reply.status(201).send("sucesso ao deletar")
    })
}