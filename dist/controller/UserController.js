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
exports.UserController = void 0;
const User_1 = require("../entity/User");
const data_source_1 = require("../data-source");
class UserController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOneBy({ id: parseInt(request.params.id) });
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.save(request.body);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.update(request.params.id, request.body);
        });
    }
    ;
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToRemove = yield this.userRepository.findOneBy({ id: parseInt(request.params.id) });
            if (!userToRemove)
                throw Error('user does not exist');
            yield this.userRepository.remove(userToRemove);
            return;
        });
    }
    findByEmail(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email: request.body.loginEmail } });
        });
    }
    checkExistingAccount(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email: request.body.email } });
        });
    }
}
exports.UserController = UserController;
