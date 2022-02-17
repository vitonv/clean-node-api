import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
let surveyCollection: Collection
let accountCollection: Collection
describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    accountCollection = MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    it('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://imagename.com'
          },
          {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })
    it('Should return 204 on add survey with valid accessToken', async () => {
      const { insertedId } = await accountCollection.insertOne({
        name: 'Rodrigo',
        email: 'rodrigo.manguinho@gmail.com',
        password: '123',
        role: 'admin'
      })
      const accessToken = sign({ id: insertedId }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: insertedId
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://imagename.com'
          },
          {
            answer: 'Answer 2'
          }]
        })
        .expect(204)
    })
  })
})
