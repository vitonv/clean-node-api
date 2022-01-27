import request from 'supertest'
import { app } from '../config/app'
describe('Body Parser Middleware', () => {
  it('Should parse body as JSON', async () => {
    app.post('/test_body_parser', (req, res) => {
      return res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
