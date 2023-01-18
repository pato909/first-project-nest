import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get()
  getTodos() {
    console.log('Récupérer liste des todos');
    return 'Liste des TODOS';
  }

  @Post()
  addTOdo() {
    console.log('ajouter todo');
    return 'Add TODO';
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
