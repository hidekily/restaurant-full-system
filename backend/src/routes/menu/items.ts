import { FastifyInstance } from "fastify"
import { db } from "shared/db"
import { menuItem } from "shared/db/schema"
import { eq } from "drizzle-orm"

export async function menuItemsRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const { categoryId } = request.query as { categoryId: string }
    
    const itens = await db
      .select()
      .from(menuItem)
      .where(eq(menuItem.categoryId, Number(categoryId)))
    
    return reply.send(itens)
  })
}