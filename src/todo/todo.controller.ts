import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  todos: Todo[];

  constructor() {
    this.todos = [];
    this.todos.push({
      id: 1,
      name: 'First TODO',
      description: 'first description',
    });
    this.todos.push({
      id: 2,
      name: 'Second TODO',
      description: 'second description',
    });
  }

  @Get('v2')
  getTodosV2(@Req() request: Request, @Res() response: Response) {
    console.log(request);
    console.log('Récupérer la liste des todos');
    response.status(205);
    response.json({
      contenu: `Je suis une réponse générée à partir de l'objet Response de express`,
    });
  }

  @Get()
  getTodos(@Query('page') page: number): Todo[] {
    console.log('Récupérer liste des todos');
    console.log(`param : ${page}`);
    return this.todos;
  }

  @Get('/:id')
  getTodoById(@Param('id') id: number): Todo {
    return this.todos.filter((todo) => todo.id == id)[0];
  }

  @Post()
  addTodo(@Body() newTodo: Todo) {
    console.log('ajouter todo');
    if (this.todos.length) {
      newTodo.id = this.todos[this.todos.length - 1].id + 1;
    } else {
      newTodo.id = 1;
    }
    this.todos.push(newTodo);
    return newTodo;
  }

  @Delete()
  deleteTodo() {
    console.log('supprimer todo');
    return 'Delete Todo';
  }

  @Put()
  modifierTodo() {
    console.log('modifier todo');
    return 'Update Todo';
  }
}
