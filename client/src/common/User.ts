import React from 'react';

interface UserProps{
    [x: string]: any;
        id?: number;
        email?: string;
        username?: string;
        password?: string;
        isLoggedIn: boolean;
        children?: React.ReactNode;
    
}

export default UserProps;