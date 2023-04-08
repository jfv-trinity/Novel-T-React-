import { DataSource } from "typeorm"
import { Book } from "./entity/Book"
import { User } from "./entity/User"
import { Library } from "./entity/Library"
import { Bookgenres } from "./entity/Bookgenres"
import { Bookchapters } from "./entity/Bookchapters"
import process, { env } from "process"

export let AppDataSource:DataSource;

console.log("this is the process env", process.env.NODE_ENV);
if (process.env.NODE_ENV == "production") {
    AppDataSource = new DataSource({
        type: "postgres",
        host: "ec2-54-147-33-38.compute-1.amazonaws.com",
        database: "ddd46bg6ebcm1v",
        username: "fgizpiylzzofhx",
        port: 5432,
        password: "63245a5e017e0a6d151dd3313f857d0319a0e05d5146be11b939d6154e56d4a0",
        synchronize: true,
        logging: false,
        entities: [User, Book, Library, Bookgenres, Bookchapters],
        migrations: [],
        subscribers: [],
        ssl: { rejectUnauthorized: false }
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
     console.log(process.env.NODE_ENV, ": this is the process env");
}
