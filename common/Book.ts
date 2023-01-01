import UserProps from "./User";

interface BookProps{
    id?: number;
    bookTitle?: string;
    numberOfChapters?: number;
    image?: string;
    MRchapter?: string;
    Rchapter?: string;
    authorId?: number;
    authorUsername?: string;
    authorPenName?: string;
    summary?: string;
    publishDate?: Date;
    dateUpdated?: Date;
    status?: string;
    bookGenres?: [];
    rank?: number;
    rating?: number;
    user?: UserProps;
}

export default BookProps;