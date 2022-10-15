import * as careTaker from "./images/Notification-Icon-CareTaker.jpg";

const background: string = careTaker.default.toString();

interface NotificationProps{
    context?: string;
    src?: {background: any};
    children?: React.ReactNode;
    MyNotification?: any;
    HandleNotification?: any;
    GetAvatarImage?: any;
    GetErrorMessage?: any;
    Avatars?: any;
    Errors?: any;
}

export default NotificationProps;