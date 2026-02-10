import { FastifyInstance } from "fastify"
import { db } from "shared/db"
import { category } from "shared/db/schema"

export async function menuCategoriesRoutes(app: FastifyInstance) {
  // GET /api/menu/categories - Listar categorias (público)
  app.get("/", async (request, reply) => {
    const categories = await db.select().from(category)
    return reply.send(categories)
  })
}