import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {
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
  getTodos() {
    console.log('Récupérer liste des todos');
    return 'Liste des TODOS';
  }

  @Post()
  addTodo() {
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
