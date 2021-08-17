import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Todo } from "./todo.interface";
import { TodoService } from "./todo.service";

@Controller("todo") 
export class TodoController {
    private readonly logger = new Logger(TodoController.name);
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create(@Body() todo: Todo): void {
        this.logger.log("Handling create request");
        this.todoService.create(todo);
    }

    @Get()
    findAll(): Todo[] {
        this.logger.log("Handling findAll request");
        return this.todoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number): Todo | null {
        this.logger.log(`Handling findOne request with id=${id}`);
        return this.todoService.findOne(id);
    }

    @Put(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body() todo: Todo) : void {
        this.logger.log(`Handling update request with id=${id}`);
        this.todoService.update(id, todo);
    }

    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number): void {
        this.logger.log(`Handling remove request with id=${id}`);
        this.todoService.remove(id);
    }
}