import { body, param, ValidationChain } from "express-validator"
import { BookController } from "./controller/BookController"
import { UserController } from "./controller/UserController"
import { ChapterController } from "./controller/ChapterController"
import { LibraryController } from "./controller/LibraryController"

export const Routes = [{

    //User Routes
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
},
{
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
},
{
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update",
},
{
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
},
{
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "findByEmail",
    },
{
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "checkExistingAccount",
},
{
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
},


    // Book Routes
    {
    method: "get",
    route: "/books",
    controller: BookController,
    action: "all",
},
{
    method: "get",
    route: "/books/:id",
    controller: BookController,
    action: "one",
}, 
{
    method: "post",
    route: "/books",
    controller: BookController,
    action: "save",
}, 
{
    method: "post",
    route: "/bookGenres/create",
    controller: BookController,
    action: "saveGenres",
}, 
{
    method: "put",
    route: "/books/:id",
    controller: BookController,
    action: "update",
},
{
    method: "delete",
    route: "/books/:id",
    controller: BookController,
    action: "remove",
    }, 

{
    method: "get",
    route: "/books/search/:id",
    controller: BookController,
    action: "findByIdLessThan",
    }, 
    
{
    method: "get",
    route: "/books/search/author/:id",
    controller: BookController,
    action: "findByAuthor",
    }, 

    //Chapter Routes
{
    method: "get",
    route: "/chapters",
    controller: ChapterController,
    action: "all",
    }, 
{
    method: "get",
    route: "/chapters/:book_id",
    controller: ChapterController,
    action: "findByBook",
    }, 
{
    method: "get",
    route: "/chapters/:bookId/:chapterNumber",
    controller: ChapterController,
    action: "findBookChapter",
    }, 
{
    method: "get",
    route: "/chapter/:id",
    controller: ChapterController,
    action: "one",
    }, 
{
    method: "post",
    route: "/chapters",
    controller: ChapterController,
    action: "save",
    }, 
{
    method: "put",
    route: "/chapter/:id",
    controller: ChapterController,
    action: "update",
    }, 
{
    method: "delete",
    route: "/chapters/:id",
    controller: ChapterController,
    action: "remove",
    }, 

    //Library Routes

    {
    method: "get",
    route: "/libraries",
    controller: LibraryController,
    action: "all",
    }, 
{
    method: "get",
    route: "/library/:id",
    controller: LibraryController,
    action: "one",
    }, 
{
    method: "post",
    route: "/libraries",
    controller: LibraryController,
    action: "save",
    }, 
{
    method: "delete",
    route: "/libraries/:id",
    controller: LibraryController,
    action: "remove",
    }, 

{
    method: "get",
    route: "/libraries/:id",
    controller: LibraryController,
    action: "findByUser",
    }, 

{
    method: "get",
    route: "/libraries/:userId/:bookId",
    controller: LibraryController,
    action: "findBookByUser",
    }, 
{
    method: "post",
    route: "/libraries/:userId/:bookId",
    controller: LibraryController,
    action: "bookmark",
    }, 
]