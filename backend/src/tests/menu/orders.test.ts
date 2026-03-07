import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import {clientOrders} from "../../routes/menu/orders"


const app = Fastify()

beforeAll(async () => {
    app.register(clientOrders, {prefix: 'api/menu/clientorders'})
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('POST /api/menu/clientorders', () => {
    it("should return a invalid order", async() => {
        const response = await app.inject({
            method: "POST",
            url: '/api/menu/clientorders',
            payload: {}
        })
        
        expect(response.statusCode).toBe(400)
    })

    it('should return an invalid order', async () => {
        const response = await app.inject({
            method: "POST",
            url: '/api/menu/clientorders',
            payload: {
                table: 999999999,
                items: [
                    {quantity: 99999, menuItemId: 999999}
                ]
            }
        })

        console.log(response.statusCode, response.json())
        expect(response.statusCode).toBe(404)
    })
})
