var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, Index, PrimaryGeneratedColumn, } from "typeorm";
var Bookchapters = /** @class */ (function () {
    function Bookchapters() {
    }
    __decorate([
        PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Bookchapters.prototype, "id", void 0);
    __decorate([
        Column("character varying", {
            name: "chapter_title",
            nullable: true,
            length: 150,
        }),
        __metadata("design:type", Object)
    ], Bookchapters.prototype, "chapterTitle", void 0);
    __decorate([
        Column("character varying", {
            name: "context",
            nullable: true,
            length: 50000,
        }),
        __metadata("design:type", Object)
    ], Bookchapters.prototype, "context", void 0);
    __decorate([
        Column("integer", { name: "book_id" }),
        __metadata("design:type", Number)
    ], Bookchapters.prototype, "bookId", void 0);
    __decorate([
        Column("integer", { name: "chapter_author" }),
        __metadata("design:type", Number)
    ], Bookchapters.prototype, "chapterAuthor", void 0);
    Bookchapters = __decorate([
        Index("bookchapters_pkey", ["id"], { unique: true }),
        Entity("bookchapters", { schema: "public" })
    ], Bookchapters);
    return Bookchapters;
}());
export { Bookchapters };
