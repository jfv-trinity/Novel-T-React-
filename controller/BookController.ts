import { NextFunction, Request, Response } from "express"
import { Book } from "../entity/Book"
import { Bookgenres } from "../entity/Bookgenres"
import { AppDataSource } from "../data-source"
import { LessThan } from "typeorm"

export class BookController {

    private bookRepository = AppDataSource.getRepository(Book)
    private genreRepository = AppDataSource.getRepository(Bookgenres)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        //return this.bookRepository.findOne(request.params.id)
        return this.bookRepository.findOneBy({ id: parseInt(request.params.id) })
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.save(request.body)
    }

     async saveGenres(request: Request, response: Response, next: NextFunction) {
        return this.genreRepository.save(request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const bookToRemove = await this.bookRepository.findOneBy({ id: parseInt(request.params.id) })
        if (!bookToRemove) throw Error('book does not exist')
        await this.bookRepository.remove(bookToRemove)
    }

    async findByIdLessThan(request: Request, response: Response, next: NextFunction) {
        // return this.bookRepository.find({ where: { id: LessThan(parseInt(request.params.id)) } })
        return this.bookRepository.find({ order: { dateUpdated: "DESC" } })
    }

    async findByAuthor(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.find({ where: { authorId: (parseInt(request.params.id) )} })
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.update(request.params.id, request.body);
    };

}