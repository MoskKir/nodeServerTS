import app from '../app';
import supertest from 'supertest';

const request = supertest(app)

it('gets the test endpoint', async done => {
  const response = await request.get('/')
  expect(response.status).toBe(200)
  done()
})

it('gets the test endpoint', async done => {
  const response = await request.get('/api/users/')
  expect(response.status).toBe(200)
  done()
})
