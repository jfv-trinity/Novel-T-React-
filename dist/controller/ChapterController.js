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
exports.ChapterController = void 0;
const Book_1 = require("../entity/Book");
const Bookchapters_1 = require("../entity/Bookchapters");
const data_source_1 = require("../data-source");
class ChapterController {
    constructor() {
        this.bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);
        this.chapterRepository = data_source_1.AppDataSource.getRepository(Bookchapters_1.Bookchapters);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chapterRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chapterRepository.findOneBy({ id: parseInt(request.params.id) });
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chapterRepository.save(request.body);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chapterRepository.update(request.params.id, request.body);
        });
    }
    ;
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapterToRemove = yield this.chapterRepository.findOneBy({ id: parseInt(request.params.id) });
            if (!chapterToRemove)
                throw Error('chapter does not exist');
            yield this.chapterRepository.remove(chapterToRemove);
        });
    }
    findByBook(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chapterRepository.find({ where: { bookId: parseInt(request.params.book_id) } });
        });
    }
}
exports.ChapterController = ChapterController;
