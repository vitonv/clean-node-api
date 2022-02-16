import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'

let surveyCollection: Collection
describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    it('Should return 204 on add survey success', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
            question: 'Question',
            answers: [{
                answer:'Answer 1',
                image:'http://imagename.com'
            },
            {
                answer:'Answer 2',
            }]
        })
        .expect(204)
    })
  })
})
