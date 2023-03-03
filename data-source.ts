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
        host: "ec2-3-219-229-143.compute-1.amazonaws.com",
        database: "d4ef6fs50ujdt9",
        username: "zmymtehxdwbehj",
        port: 5432,
        password: "2fc1a5a2c894548e34190f154bf992013077ee5806d1ae83595266ff6736a21c",
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
