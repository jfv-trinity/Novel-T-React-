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
exports.LibraryController = void 0;
const Library_1 = require("../entity/Library");
const data_source_1 = require("../data-source");
class LibraryController {
    constructor() {
        this.libraryRepository = data_source_1.AppDataSource.getRepository(Library_1.Library);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.libraryRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //return this.libraryRepository.findOne(request.params.id)
            return this.libraryRepository.findOneBy({ userId: parseInt(request.params.id) });
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.libraryRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookToRemove = yield this.libraryRepository.findOneBy({ id: parseInt(request.params.id) });
            if (!bookToRemove)
                throw Error('book does not exist in library');
            yield this.libraryRepository.remove(bookToRemove);
        });
    }
    findByUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.libraryRepository.find({ where: { userId: parseInt(request.params.id) } });
        });
    }
    findBookByUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.libraryRepository.find({ where: { userId: parseInt(request.params.id), bookId: parseInt(request.params.bookId) } });
        });
    }
    bookmark(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingBookMark = yield this.libraryRepository.findOneBy({ userId: parseInt(request.params.userId), bookId: parseInt(request.params.bookId) });
            console.log(existingBookMark);
            if (existingBookMark == null) {
                console.log("It does not exist");
                return this.libraryRepository.save(request.body);
            }
            else {
                console.log("It exists");
                yield this.libraryRepository.remove(existingBookMark);
            }
            return existingBookMark;
        });
    }
}
exports.LibraryController = LibraryController;
