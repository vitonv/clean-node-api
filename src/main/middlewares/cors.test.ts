import request from 'supertest'
import { app } from '../config/app'
describe('Cors Middleware', () => {
  it('Should enable cors', async () => {
    app.post('/test_cors', (req, res) => {
      return res.send()
    })
    await request(app)
      .post('/test_body_parser')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
