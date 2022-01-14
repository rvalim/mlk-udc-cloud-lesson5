import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getTodos } from '../../businessLayer/todos'
import { cors, httpErrorHandler } from 'middy/middlewares'
import * as middy from 'middy'

const logger = createLogger('Todo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info("processing event get todos", event)
    const userId = getUserId(event);
    const items = await getTodos(userId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items
      })
    }
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )