import UserProps from "./User";

interface BookProps{
    id?: number;
    bookTitle?: string;
    image?: string;
    MRchapter?: string;
    Rchapter?: string;
    authorId?: number;
    authorUsername?: string;
    summary?: string;
    publishDate?: Date;
    dateUpdated?: Date;
    status?: string;
    bookGenres?: [];
    rank?: number;
    rating?: number;
    user?: UserProps;
    authorPenName?: string;
}

export default BookProps;