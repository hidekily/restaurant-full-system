import { FastifyInstance } from "fastify";
import { db } from "shared/db";
import { category } from "shared/db/schema";
import { verificarAdmin } from "../../middleware/auth.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function categoriesRoutes(app: FastifyInstance){

  const createCategorySchema = z.object({
    name: z.string().min(1),
    imageUrl: z.string().optional()
  })

  // middleware para verificar se o usuario esta logado ou nao 
  app.addHook("onRequest", verificarAdmin)

  // essa rota esta definindo o body da categoria, validando a info, inserindo ela na db e por ultimo, retornando um status de sucesso
  app.post("/", async (request, reply) => {
    const result = createCategorySchema.safeParse(request.body)
    
    if(!result.success){
      return reply.status(400).send({error: "erro"})
    }

    const { name, imageUrl } = result.data

    const [newCategory] = await db.insert(category).values({
      name,
      imageUrl
    }).returning()

    return reply.status(201).send({data: newCategory, message: "sucesso! 🦦"})
  })

  // lista e manda as categorias para uma interface para eu fazer os cards depois 🤓
  app.get("/", async(request, reply) => {
    const allCategories = await db.select().from(category);

    return reply.send(allCategories)
  })

  // deleta as categorias
  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string }

    const idParamsSchema = z.object({
      id: z.string().regex(/^\d+$/)
    })

    const parseResult = idParamsSchema.safeParse({ id })

    if(!parseResult.success){
      return reply.status(400).send("id invalido")
    }

    await db.delete(category).where(eq(category.id, Number(id)))

    return reply.status(201).send({message:"success  on deleting your category 🦦"})
  })
}
