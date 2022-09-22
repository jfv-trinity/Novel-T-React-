"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const Book_1 = require("../entity/Book");
const Bookgenres_1 = require("../entity/Bookgenres");
const data_source_1 = require("../data-source");
const typeorm_1 = require("typeorm");
class BookController {
    constructor() {
        this.bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
        this.genreRepository = data_source_1.AppDataSource.getRepository(Bookgenres_1.Bookgenres);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //return this.bookRepository.findOne(request.params.id)
            return this.bookRepository.findOneBy({ id: parseInt(request.params.id) });
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request.body);
            return this.bookRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookToRemove = yield this.bookRepository.findOneBy({ id: parseInt(request.params.id) });
            if (!bookToRemove)
                throw Error('book does not exist');
            yield this.bookRepository.remove(bookToRemove);
        });
    }
    findByIdLessThan(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.find({ where: { id: (0, typeorm_1.LessThan)(parseInt(request.params.id)) } });
        });
    }
    findByAuthor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.find({ where: { authorId: (parseInt(request.params.author)) } });
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookRepository.update(request.params.id, request.body);
        });
    }
    ;
}
exports.BookController = BookController;
