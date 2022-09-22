import "reflect-metadata"
import { DataSource } from "typeorm"
import { Book } from "./entity/Book"
import { User } from "./entity/User"
import { Library } from "./entity/Library"
import { Bookgenres } from "./entity/Bookgenres"
import { Bookchapters } from "./entity/Bookchapters"

export let AppDataSource:DataSource;

if (process.env.NODE_ENV == "production") {
    AppDataSource =  new DataSource({
        type: "postgres",
        host: "ec2-44-198-24-0.compute-1.amazonaws.com",
        port: 5432,
        username: "yhslrfopruboqu",
        password: "f8ee68219de833159b732325e940174f7f10bc0138daa17b009dcb745cc13b8a",
        database: "d2qbqedi3pjns4",
        synchronize: true,
        logging: false,
        entities: [User, Book, Library, Bookgenres, Bookchapters],
        migrations: [],
        subscribers: [],
    })
}
else {
    AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Abathur",
    database: "react-novel-t",
    synchronize: true,
    logging: false,
    entities: [User, Book, Library, Bookgenres, Bookchapters],
    migrations: [],
    subscribers: [],
})
}


 AppDataSource;

