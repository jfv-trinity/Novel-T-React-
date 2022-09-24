var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, } from "typeorm";
var Book = /** @class */ (function () {
    function Book() {
    }
    __decorate([
        PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Book.prototype, "id", void 0);
    __decorate([
        Column("character varying", {
            name: "book_title",
            unique: true,
            length: 150,
        }),
        __metadata("design:type", String)
    ], Book.prototype, "bookTitle", void 0);
    __decorate([
        Column("character varying", { name: "summary", nullable: true }),
        __metadata("design:type", Object)
    ], Book.prototype, "summary", void 0);
    __decorate([
        Column("character varying", { name: "author_username" }),
        __metadata("design:type", String)
    ], Book.prototype, "authorUsername", void 0);
    __decorate([
        Column({ type: "integer", name: "author_id" }),
        __metadata("design:type", Number)
    ], Book.prototype, "authorId", void 0);
    __decorate([
        Column("character varying", { name: "status" }),
        __metadata("design:type", String)
    ], Book.prototype, "status", void 0);
    __decorate([
        Column({ type: "timestamptz", name: "date_updated", nullable: true, default: function () { return "CURRENT_TIMESTAMP"; } }),
        __metadata("design:type", Object)
    ], Book.prototype, "dateUpdated", void 0);
    __decorate([
        CreateDateColumn({ name: "publish_date" }),
        __metadata("design:type", Date)
    ], Book.prototype, "publishDate", void 0);
    Book = __decorate([
        Index("book_book_title_key", ["bookTitle"], { unique: true }),
        Index("book_pkey", ["id"], { unique: true }),
        Entity("book", { schema: "public" })
    ], Book);
    return Book;
}());
export { Book };
