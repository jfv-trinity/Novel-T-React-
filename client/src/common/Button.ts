import { Dispatch, SetStateAction } from "react";

interface ButtonProps{
    [x: string]: any;
    id?: string;
    index?: number;
    onClick?:Dispatch<SetStateAction<boolean>>
}

export default ButtonProps;