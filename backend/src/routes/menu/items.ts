import { FastifyInstance } from "fastify"
import { db } from "shared/db"
import { itemCardapio } from "shared/db/schema"
import { eq } from "drizzle-orm"

export async function menuItemsRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const { categoriaId } = request.query as { categoriaId: string }
    
    const itens = await db
      .select()
      .from(itemCardapio)
      .where(eq(itemCardapio.categoriaId, Number(categoriaId)))
    
    return reply.send(itens)
  })
}