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
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "id" }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "email", unique: true, length: 150 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "username", unique: true, length: 150 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "password", length: 150 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "security_question",
        nullable: true,
        length: 150,
    }),
    __metadata("design:type", Object)
], User.prototype, "securityQuestion", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "security_answer",
        nullable: true,
        length: 150,
    }),
    __metadata("design:type", Object)
], User.prototype, "securityAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", name: "signed_in" }),
    __metadata("design:type", Boolean)
], User.prototype, "isLoggedIn", void 0);
User = __decorate([
    (0, typeorm_1.Index)("user_email_key", ["email"], { unique: true }),
    (0, typeorm_1.Index)("user_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Index)("user_username_key", ["username"], { unique: true }),
    (0, typeorm_1.Entity)("user", { schema: "public" })
], User);
exports.User = User;
