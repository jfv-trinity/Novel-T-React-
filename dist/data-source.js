"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Book_1 = require("./entity/Book");
const User_1 = require("./entity/User");
const Library_1 = require("./entity/Library");
const Bookgenres_1 = require("./entity/Bookgenres");
const Bookchapters_1 = require("./entity/Bookchapters");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Abathur",
    database: "react-novel-t",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Book_1.Book, Library_1.Library, Bookgenres_1.Bookgenres, Bookchapters_1.Bookchapters],
    migrations: [],
    subscribers: [],
});
