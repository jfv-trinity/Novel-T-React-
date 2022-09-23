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
        host: "ec2-34-227-135-211.compute-1.amazonaws.com",
        port: 5432,
        username: "dfwgnjbmfclrjc",
        password: "b00ed334dbaa45d25bafdf14f25226ec58fe975d44abcca842a27e2c91e7bb65",
        database: "d7thqat7e1if1d",
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
