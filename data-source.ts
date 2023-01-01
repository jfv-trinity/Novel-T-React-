import { DataSource } from "typeorm"
import { Book } from "./entity/Book"
import { User } from "./entity/User"
import { Library } from "./entity/Library"
import { Bookgenres } from "./entity/Bookgenres"
import { Bookchapters } from "./entity/Bookchapters"

export let AppDataSource:DataSource;

console.log("this is the process env", process.env.NODE_ENV);
if (process.env.NODE_ENV == "production") {
    AppDataSource = new DataSource({
        type: "postgres",
        host: "ec2-3-230-122-20.compute-1.amazonaws.com",
        database: "d9d3n49njrgind",
        username: "pdfhjvxklsvdzu",
        port: 5432,
        password: "0660688a2bf0acee127e5ef035ed7f30a84ed101ae0103f7df3fad413117aa09",
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
