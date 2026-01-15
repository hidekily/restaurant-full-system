import { FastifyRequest, FastifyReply } from "fastify"
import { auth } from "shared/auth"

export async function verificarAdmin(request: FastifyRequest, reply: FastifyReply) {
  const session = await auth.api.getSession({
    headers: request.headers
  }) 

    if(!session){
        return reply.status(401).send({error: "..."})        
    }
    
}

