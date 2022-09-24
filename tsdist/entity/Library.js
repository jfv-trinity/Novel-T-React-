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
var Library = /** @class */ (function () {
    function Library() {
    }
    __decorate([
        PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Library.prototype, "id", void 0);
    __decorate([
        Column("character varying", { name: "book_title", length: 150 }),
        __metadata("design:type", String)
    ], Library.prototype, "bookTitle", void 0);
    __decorate([
        Column("integer", { name: "book_id" }),
        __metadata("design:type", Number)
    ], Library.prototype, "bookId", void 0);
    __decorate([
        Column("integer", { name: "user_id" }),
        __metadata("design:type", Number)
    ], Library.prototype, "userId", void 0);
    Library = __decorate([
        Index("library_pkey", ["id"], { unique: true }),
        Entity("library", { schema: "public" })
    ], Library);
    return Library;
}());
export { Library };
