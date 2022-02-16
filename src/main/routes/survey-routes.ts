import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/add-survey'
export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
