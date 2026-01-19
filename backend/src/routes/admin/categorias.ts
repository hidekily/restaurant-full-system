import { FastifyInstance } from "fastify";
import { db } from "../../../../shared/src/db";
import { categoria } from "../../../../shared/src/db/schema";
import { verificarAdmin } from "../../middleware/auth";
import { itemCardapio } from 'shared/db/schema';
import { eq } from "drizzle-orm";

export async function categoriesRoutes(app: FastifyInstance){

  // middleware para verificar se o usuario esta logado ou nao 
  app.addHook("onRequest", verificarAdmin)

  // essa rota esta definindo o body da categoria, validando a info, inserindo ela na db e por ultimo, retornando um status de sucesso
  app.post("/", async(request, reply) =>{
    const {nome, imgUrl} = request.body as {
      nome: string;
      imgUrl?: string;
    };


    if(!nome || nome.trim() === ""){
      return reply.status(400).send({
        error: "digite o nome da categoria"
      });
    };

    const [novaCategoria] = await db.insert(categoria).values({
      nome: nome.trim(),
      imagemUrl: imgUrl || null
    }).returning();

    return(
      reply.status(201).send(novaCategoria)
    );
  })

  // lista e manda as categorias para uma interface para eu fazer os cards depois 🤓
  app.get("/", async(request, reply) => {
    const allCategories = await db.select().from(categoria);

    return reply.send(allCategories)
  })

  // deleta as categorias
  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string }

    await db.delete(categoria).where(eq(categoria.id, Number(id)))

    return reply.status(200).send({ message: "Categoria deletada" })
  })
}