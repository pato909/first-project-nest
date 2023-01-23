import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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

  @Delete('/:id')
  deleteTodo(@Param('id') id: number) {
    console.log('supprimer todo');
    const index = this.todos.findIndex((todo) => todo.id == id);
    console.log(index);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }

    return {
      message: `Le todo ${id} a été supprimer`,
      count: 1,
    };
  }

  @Put('/:id')
  modifierTodo(@Param('id') id: number, @Body() body: Partial<Todo>) {
    const todo = this.getTodoById(id);
    if (todo) {
      todo.description = body.description ? body.description : todo.description;
      todo.name = body.name ? body.name : todo.name;
      return todo;
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
  }
}
