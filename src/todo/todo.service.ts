import { Injectable } from "@nestjs/common";
import { Todo } from "./todo.interface";

@Injectable()
export class TodoService {
    private storage: Todo[] = [];

    create(todo: Todo): void {
        const currentID = Math.max(...this.storage.map( todo => todo.id), 0);
        const id = currentID + 1;
        this.storage.push({ ...todo, id});
    }

    findAll(): Todo[] {
        return this.storage;
    }

    findOne(id: number): Todo | null {
        return this.storage.find( todo => todo.id === id);
    }

    update(id: number, todo: Todo): void {
        const index = this.storage.findIndex( todo => todo.id === id);
        this.storage[index] = {...todo, id};
    }

    remove(id: number): void {
        const index = this.storage.findIndex( todo => todo.id === id);
        this.storage.splice(index, 1);
    }
}