import {BookProps} from "./Book";
import UserProps from "./User";

interface LibraryProps{
    MRchapter: string;
    Rchapter: string;
    id?: number;
    image?: string;
    bookTitle?: string;
    bookId?: number;
    userId?: number;
    book?: BookProps;
    user?: UserProps;
    authorUsername?: string;
}

export default LibraryProps;