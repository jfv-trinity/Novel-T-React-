import {BookProps} from "./Book";
import UserProps from "./User";

interface CommentProps{
    id?: number;
    context?: string;
    user?: UserProps;
    book?: BookProps;
}

export default CommentProps;