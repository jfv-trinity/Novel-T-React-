import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";
import { Library } from "./Library";

@Index("user_email_key", ["email"], { unique: true })
@Index("user_pkey", ["id"], { unique: true })
@Index("user_username_key", ["username"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "email", unique: true, length: 150 })
  email: string;

  @Column("character varying", { name: "username", unique: true, length: 150 })
  username: string;

  @Column("character varying", { name: "password", length: 150 })
  password: string;

  @Column("character varying", {
    name: "security_question",
    nullable: true,
    length: 150,
  })
  securityQuestion: string | null;

  @Column("character varying", {
    name: "security_answer",
    nullable: true,
    length: 150,
  })
  securityAnswer: string | null;

  @Column( { type: "bool", name: "signed_in" })
  isLoggedIn: boolean;

  // @OneToMany(() => Book, (book) => book.author)
  // books: Book[];

  // @OneToMany(() => Library, (library) => library.user)
  // libraries: Library[];
}
