import request from 'supertest'
import { app } from '../config/app'
describe('SignUp Routes', () => {
  it('Should return true on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'rodrigo',
        email: 'rodrigo.manguinho@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
