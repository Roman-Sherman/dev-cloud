import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { deleteToDo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Remove a TODO item by id
    console.log("Getting UserId");
    const userId = getUserId(event);
    
    console.log("Deleting Todo Item");
    
    const todoId = event.pathParameters.todoId;
    const deleteData = await deleteToDo(todoId, userId);

    return {
        statusCode: 200,
        body: deleteData,
    }
    
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
