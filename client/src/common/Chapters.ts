import {BookProps} from "./Book";
import UserProps from "./User";

interface ChapterProps{
    id?: number;
    chapterTitle?: string;
    bookTitle?: string;
    chapterNumber?: number;
    context?: string;
    bookId?: number;
    user?: UserProps;
    chapterAuthor?: number;
    book?: BookProps;
}

export default ChapterProps;