import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import { menuItemsRoutes } from '../../routes/menu/items'

const app = Fastify()

beforeAll(async () => {
    app.register(menuItemsRoutes, {prefix:'/api/menu/items'})
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

describe('GET /api/menu/items', () => {

    it('should return status 200', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/api/menu/items?categoryId=1`
        })

        expect(response.statusCode).toBe(200)
    })

    it("should return an array", async () => {
        const response = await app.inject({
            method: "GET",
            url: `/api/menu/items?categoryId=1`
        })

        const data = response.json()
        expect(Array.isArray(data)).toBe(true)
    })

    it('should return the item props', async () => {
        const response = await app.inject({
            method: "GET",
            url: `/api/menu/items?categoryId=1`
        })

        const data = response.json() as {id: string, name: string | null}[]
        data.forEach(items => {
              expect(items).toHaveProperty('name')
              expect(items).toHaveProperty('id')
              expect(items).toHaveProperty('price')
        });
        
    })
})