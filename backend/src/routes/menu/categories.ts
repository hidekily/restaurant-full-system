import { FastifyInstance } from "fastify"
import { db } from "../../../../shared/src/db"
import { categoria } from "../../../../shared/src/db/schema"

export async function menuCategoriesRoutes(app: FastifyInstance) {
  // GET /api/menu/categories - Listar categorias (público)
  app.get("/", async (request, reply) => {
    const categorias = await db.select().from(categoria)
    return reply.send(categorias)
  })
}