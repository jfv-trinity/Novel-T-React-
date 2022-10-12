import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Bookchapters } from "./Bookchapters";
import { Bookgenres } from "./Bookgenres";

@Index("book_book_title_key", ["bookTitle"], { unique: true })
@Index("book_pkey", ["id"], { unique: true })
@Entity("book", { schema: "public" })
export class Book {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "book_title",
    unique: true,
    length: 150,
  })
  bookTitle: string;

  @Column("character varying", { name: "summary", nullable: true })
  summary: string | null;

  @Column("character varying", { name: "author_username"})
  authorUsername: string;

  @Column("character varying", { name: "author_pen_name", nullable: true})
  authorPenName: string;

  @Column({type: "integer", name: "author_id"})
  authorId: number;

  @Column("character varying", { name: "status"})
  status: string;

  @Column({ type: "timestamptz",  name: "date_updated", nullable: true , default: () => "CURRENT_TIMESTAMP" })
  dateUpdated: Date | null;
  
  @CreateDateColumn({ name: "publish_date" })
  publishDate: Date;
  
  // @ManyToOne(() => User, (user) => user.books)
  // @JoinColumn([{ name: "author", referencedColumnName: "id" }])
  // author: User;

  // @OneToMany(() => Bookchapters, (bookchapters) => bookchapters.book)
  // bookchapters: Bookchapters[];

  // @OneToMany(() => Bookgenres, (bookgenres) => bookgenres.book)
  // bookgenres: Bookgenres[];
}
