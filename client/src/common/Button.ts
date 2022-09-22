import { Dispatch, SetStateAction } from "react";

interface ButtonProps{
    id?: string;
    index?: number;
    onClick?:Dispatch<SetStateAction<boolean>>
}

export default ButtonProps;