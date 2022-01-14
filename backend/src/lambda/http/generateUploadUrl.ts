import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { generateUploadUrl } from '../../utils/attachmentUtils'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { todoExists } from '../../businessLayer/todos'

const logger = createLogger('Todo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(" Processing event for generating signed url", event)

    const todoId = event.pathParameters.todoId
    const userId = getUserId(event);
    const validTodoId = await todoExists(userId, todoId)

    if (!validTodoId) {
      logger.error("No todo found with id ", todoId)
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Todo item does not exist'
        })
      }
    }

    let url = await generateUploadUrl(todoId)
    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: url
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
