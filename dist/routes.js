"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const BookController_1 = require("./controller/BookController");
const UserController_1 = require("./controller/UserController");
const ChapterController_1 = require("./controller/ChapterController");
const LibraryController_1 = require("./controller/LibraryController");
exports.Routes = [{
        //User Routes
        method: "get",
        route: "/users",
        controller: UserController_1.UserController,
        action: "all",
    },
    {
        method: "post",
        route: "/users",
        controller: UserController_1.UserController,
        action: "save",
    },
    {
        method: "put",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "update",
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "one",
    },
    {
        method: "post",
        route: "/users/login",
        controller: UserController_1.UserController,
        action: "findByEmail",
    },
    {
        method: "post",
        route: "/users/register",
        controller: UserController_1.UserController,
        action: "checkExistingAccount",
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "remove",
    },
    // Book Routes
    {
        method: "get",
        route: "/books",
        controller: BookController_1.BookController,
        action: "all",
    },
    {
        method: "get",
        route: "/books/:id",
        controller: BookController_1.BookController,
        action: "one",
    },
    {
        method: "post",
        route: "/books",
        controller: BookController_1.BookController,
        action: "save",
    },
    {
        method: "put",
        route: "/books/:id",
        controller: BookController_1.BookController,
        action: "update",
    },
    {
        method: "delete",
        route: "/books/:id",
        controller: BookController_1.BookController,
        action: "remove",
    },
    {
        method: "get",
        route: "/books/search/:id",
        controller: BookController_1.BookController,
        action: "findByIdLessThan",
    },
    {
        method: "get",
        route: "/books/search/author/:author",
        controller: BookController_1.BookController,
        action: "findByAuthor",
    },
    //Chapter Routes
    {
        method: "get",
        route: "/chapters",
        controller: ChapterController_1.ChapterController,
        action: "all",
    },
    {
        method: "get",
        route: "/chapters/:book_id",
        controller: ChapterController_1.ChapterController,
        action: "findByBook",
    },
    {
        method: "get",
        route: "/chapter/:id",
        controller: ChapterController_1.ChapterController,
        action: "one",
    },
    {
        method: "post",
        route: "/chapters",
        controller: ChapterController_1.ChapterController,
        action: "save",
    },
    {
        method: "put",
        route: "/chapter/:id",
        controller: ChapterController_1.ChapterController,
        action: "update",
    },
    {
        method: "delete",
        route: "/chapters/:id",
        controller: ChapterController_1.ChapterController,
        action: "remove",
    },
    //Library Routes
    {
        method: "get",
        route: "/libraries",
        controller: LibraryController_1.LibraryController,
        action: "all",
    },
    {
        method: "get",
        route: "/library/:id",
        controller: LibraryController_1.LibraryController,
        action: "one",
    },
    {
        method: "post",
        route: "/libraries",
        controller: LibraryController_1.LibraryController,
        action: "save",
    },
    {
        method: "delete",
        route: "/libraries/:id",
        controller: LibraryController_1.LibraryController,
        action: "remove",
    },
    {
        method: "get",
        route: "/libraries/:id",
        controller: LibraryController_1.LibraryController,
        action: "findByUser",
    },
    {
        method: "get",
        route: "/libraries/:userid/:bookId",
        controller: LibraryController_1.LibraryController,
        action: "findBookByUser",
    },
    {
        method: "post",
        route: "/libraries/:bookId/:userId",
        controller: LibraryController_1.LibraryController,
        action: "bookmark",
    },
];
