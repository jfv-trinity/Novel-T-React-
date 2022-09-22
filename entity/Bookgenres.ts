import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Index("bookgenres_pkey", ["id"], { unique: true })
@Entity("bookgenres", { schema: "public" })
export class Bookgenres {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "book_title", length: 150 })
  bookTitle: string;

  @Column("boolean", { name: "sci_fi", nullable: true })
  sciFi: boolean | null;

  @Column("boolean", { name: "fantasy", nullable: true })
  fantasy: boolean | null;

  @Column("boolean", { name: "romance", nullable: true })
  romance: boolean | null;

  @Column("boolean", { name: "action_adventure", nullable: true })
  actionAdventure: boolean | null;

  @Column("boolean", { name: "slice_of_life", nullable: true })
  sliceOfLife: boolean | null;

  @Column("boolean", { name: "comedy", nullable: true })
  comedy: boolean | null;

  @Column("boolean", { name: "tragedy", nullable: true })
  tragedy: boolean | null;

  @Column("boolean", { name: "mystery", nullable: true })
  mystery: boolean | null;

  @Column("boolean", { name: "thriller", nullable: true })
  thriller: boolean | null;

  @Column("boolean", { name: "horror", nullable: true })
  horror: boolean | null;

  @Column("boolean", { name: "isekai", nullable: true })
  isekai: boolean | null;

  @Column("boolean", { name: "reincarnation", nullable: true })
  reincarnation: boolean | null;

  @Column("boolean", { name: "transmigration", nullable: true })
  transmigration: boolean | null;

  @Column("boolean", { name: "historical", nullable: true })
  historical: boolean | null;

  @Column("boolean", { name: "military", nullable: true })
  military: boolean | null;

  @Column("boolean", { name: "school", nullable: true })
  school: boolean | null;

  @Column("boolean", { name: "spy", nullable: true })
  spy: boolean | null;

  @Column("boolean", { name: "martial_arts", nullable: true })
  martialArts: boolean | null;

  @Column("integer", { name: "book_id" })
  bookId: number;

  // @ManyToOne(() => Book, (book) => book.bookgenres)
  // @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  // book: Book;
}
