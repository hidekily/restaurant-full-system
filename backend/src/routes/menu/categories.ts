import { FastifyInstance } from "fastify"
import { db } from "../../../../shared/src/db"
import { category } from "../../../../shared/src/db/schema"

export async function menuCategoriesRoutes(app: FastifyInstance) {
  // GET /api/menu/categories - Listar categorias (público)
  app.get("/", async (request, reply) => {
    const categorias = await db.select().from(category)
    return reply.send(categorias)
  })
}