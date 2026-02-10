import 'dotenv/config'

import Fastify from 'fastify'
import rateLimit from '@fastify/rate-limit'
import cors from '@fastify/cors'
import {auth} from "shared/auth"
import { categoriesRoutes } from './routes/admin/categories.js'
import { menuCategoriesRoutes } from './routes/menu/categories.js'
import { menuItemsRoutes } from './routes/menu/items.js'
import { itemsConfigureRoutes } from './routes/admin/menuItems.js'
import { ordersRoutes } from './routes/admin/orders.js'

const app = Fastify({ logger: true })

// Global rate limit
app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
})

// Route registrations for /admin and /menu
app.register(ordersRoutes, {
  prefix: "/api/admin/orders"
})

app.register(itemsConfigureRoutes, {
  prefix: "/api/admin/items"
})

app.register(menuItemsRoutes, {
  prefix: "/api/menu/items"
})

app.register(menuCategoriesRoutes, {
  prefix: "/api/menu/categories"
})

app.register(cors, {
  origin: ['http://localhost:3000', ''],
  methods:["DELETE", "GET", "POST", "PATCH"],
  credentials: true,
})

app.register(categoriesRoutes, {
  prefix: '/api/admin/categories'
})

app.all('/api/auth/*', 
  {config: {
    rateLimit: {
      max: 20,
      timeWindow: '1 minute'
    }
  }}, 
  async (request, reply) => {
    const url = new URL(request.url, `http://${request.headers.host}`)

    let bodyText = undefined
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      bodyText = JSON.stringify(request.body)
    }


    const webRequest = new Request(url.toString(), {
      method: request.method,
      headers: Object.fromEntries(
          Object.entries(request.headers).filter(([_, v]) => v !== undefined)
      ) as Record<string, string>,
      body: request.method !== 'GET' && request.method !== 'HEAD'
        ? JSON.stringify(request.body)
        : undefined,
    })

    const response = await auth.handler(webRequest)

    reply.status(response.status)

    response.headers.forEach((value, key) => {
      reply.header(key, value)
    })

    const body = await response.text()
    return reply.send(body)
})  

app.listen({ port: 3001 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`🚀 Backend rodando em: ${address}`)
})