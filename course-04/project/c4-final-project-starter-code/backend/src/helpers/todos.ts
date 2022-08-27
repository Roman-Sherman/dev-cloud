import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import {TodoItem} from "../models/TodoItem";
import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";
import {TodoUpdate} from "../models/TodoUpdate";
// import { createLogger } from '../utils/logger'

// TODO: Implement businessLogic

const uuidv4 = require('uuid/v4');
const toDoAccess = new TodosAccess();
const attachmentUtils = new AttachmentUtils();

export async function getAllToDo(userId: string): Promise<TodoItem[]> {
    // logger.info('User was authorized', jwtToken)
    return toDoAccess.getAllToDo(userId);
}

export async function createToDo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    const todoId =  uuidv4();
    const s3BucketName = process.env.S3_BUCKET_NAME;
    
    return toDoAccess.createToDo({
        userId: userId,
        todoId: todoId,
        attachmentUrl:  `https://${s3BucketName}.s3.amazonaws.com/${todoId}`, 
        createdAt: new Date().getTime().toString(),
        done: false,
        ...createTodoRequest,
    });
}

export async function updateToDo(updateTodoRequest: UpdateTodoRequest, todoId: string, userId: string): Promise<TodoUpdate> {
    return toDoAccess.updateToDo(updateTodoRequest, todoId, userId);
}

export async function deleteToDo(todoId: string, userId: string): Promise<string> {
    return toDoAccess.deleteToDo(todoId, userId);
}

export async function generateUploadUrl(todoId: string): Promise<string> {
    return attachmentUtils.generateUploadUrl(todoId);
}