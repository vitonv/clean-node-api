import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import bcrypt from 'bcrypt'
import { app } from '../config/app'

let accountCollection: Collection
describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    it('Should return 200 on signup', async () => {
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
  describe('POST /login', () => {
    it('Should return 200 on login', async () => {
      const password = await bcrypt.hash('123', 12)
      await accountCollection.insertOne({
        name: 'rodrigo',
        email: 'rodrigo.manguinho@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'rodrigo.manguinho@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
