import BookProps from "./Book";
import UserProps from "./User";

interface ChapterProps{
    id?: number;
    bookTitle?: string;
    bookId?: number;
    chapterTitle?: string;
    chapterNumber?: number;
    context?: string;
    user?: UserProps;
    chapterAuthor?: number;
    book?: BookProps;
}

export default ChapterProps;