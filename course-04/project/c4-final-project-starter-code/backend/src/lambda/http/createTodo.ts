import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'
import { createToDo } from '../../businessLogic/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Implement creating a new TODO item

    console.log('Getting UserId')
    const userId = getUserId(event)

    console.log('Creating Todo Item')
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const toDoItem = await createToDo(newTodo, userId)

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: toDoItem
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
