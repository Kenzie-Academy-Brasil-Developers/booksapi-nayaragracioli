import { booksDatabase, generateBookId } from "../database/database";
import { IBook, TCreateBody, TUpdateBody } from "../interfaces/books.interface";

interface IBookServices {
    create(body: TCreateBody): IBook;
    getOne(id: string): IBook;
    update(body: TUpdateBody, id: string): IBook;
    delete(id: string): void;
}

export class BooksServices implements IBookServices {
    create(body: TCreateBody): IBook {
        const date = new Date();

        const newBook: IBook = {
            id: generateBookId(),
            name: body.name,
            pages: body.pages,
            category: body.category,
            createdAt: date,
            updatedAt: date,
        }

        booksDatabase.push(newBook);
        return newBook;
    }

    getOne(id: string): IBook{
        const book = booksDatabase.find(book => book.id === Number(id)) as IBook;

        return book;
    }

    update(body: TUpdateBody, id: string): IBook{
        const currentCar = booksDatabase.find(book => book.id === Number(id)) as IBook;
        const index = booksDatabase.findIndex(book => book.id === Number(id));

        const date = new Date();

        const newBook = {...currentCar, ...body, updatedAt: date};

        booksDatabase.splice(index, 1, newBook);
        
        return newBook;
    }

    delete(id: string): void{
        const index = booksDatabase.findIndex(book => book.id === Number(id));

        booksDatabase.splice(index, 1);
    }
}