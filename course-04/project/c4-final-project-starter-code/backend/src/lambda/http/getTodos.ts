import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getAllToDo } from '../../businessLogic/todos'
import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    console.log("Getting UserId");
    const userId = getUserId(event);

    console.log("Getting All Todos");
    const toDos = await getAllToDo(userId);

    return {
        statusCode: 200,
        body: JSON.stringify({
            "items": toDos,
        }),
    }
  })

handler.use(
  cors({
    credentials: true
  })
)
