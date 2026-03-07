import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import { menuCategoriesRoutes } from "../../routes/menu/categories"

const app = Fastify()

beforeAll(async () => {
  app.register(menuCategoriesRoutes, { prefix: '/api/menu/categories' })
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('GET /api/menu/categories', () => {
  it('should return status 200', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/menu/categories'
    })

    expect(response.statusCode).toBe(200)
  })

  it('should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/menu/categories'
    })

    const data = response.json()
    expect(Array.isArray(data)).toBe(true)
  })

  it('should return categories props', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/menu/categories'
    })

    const data = response.json() as {id: number, name: string, ImgUrl: string | null}[]
    data.forEach(category => {
      expect(category).toHaveProperty('name')
    });
  })
})

