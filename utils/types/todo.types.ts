import { Tables, TablesInsert } from "./database.types";

export type Todo = Tables<'todos'>

export type CreateTodoInput = TablesInsert<'todos'>