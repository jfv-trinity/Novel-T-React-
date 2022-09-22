"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookgenres = void 0;
const typeorm_1 = require("typeorm");
let Bookgenres = class Bookgenres {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
    __metadata("design:type", Number)
], Bookgenres.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "book_title", length: 150 }),
    __metadata("design:type", String)
], Bookgenres.prototype, "bookTitle", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "sci_fi", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "sciFi", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "fantasy", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "fantasy", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "romance", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "romance", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "action_adventure", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "actionAdventure", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "slice_of_life", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "sliceOfLife", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "comedy", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "comedy", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "tragedy", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "tragedy", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "mystery", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "mystery", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "thriller", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "thriller", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "horror", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "horror", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "isekai", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "isekai", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "reincarnation", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "reincarnation", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "transmigration", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "transmigration", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "historical", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "historical", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "military", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "military", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "school", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "spy", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "spy", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "martial_arts", nullable: true }),
    __metadata("design:type", Object)
], Bookgenres.prototype, "martialArts", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "book_id" }),
    __metadata("design:type", Number)
], Bookgenres.prototype, "bookId", void 0);
Bookgenres = __decorate([
    (0, typeorm_1.Index)("bookgenres_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Entity)("bookgenres", { schema: "public" })
], Bookgenres);
exports.Bookgenres = Bookgenres;
