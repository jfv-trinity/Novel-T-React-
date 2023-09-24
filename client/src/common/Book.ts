import CommentProps from "./Comment";
import UserProps from "./User";

export interface BookProps{
     
    id?: number;
    authorUsername?: string;
    authorPenName?: string;
    authorId?: number;
    bookTitle?: string;
    commentCount?: number;
    dateUpdated?: Date;
    image?: string;
    numberOfChapters?: number;
    MRchapter?: string;
    Rchapter?: string;
    summary?: string;
    publishDate?: Date;
    status?: string;
    bookGenres?: [];
    rank?: number;
    views?: number;
    rating?: number;
    comments?: CommentProps;
    user?: UserProps;
    
    
}

export interface ContainerProps{
    book?: BookProps;
    user?: UserProps;
}