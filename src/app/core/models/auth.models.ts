

export interface User {
    jwt: string;
    userName: string;
    userEmail: string;
    firstName:string;
    lastName:string;
    userId: string;
    roles: string[];
    streamIoToken: string;
}

export interface ResponseResult {
    message: string;
    data: User;
    success: boolean;
    statusCode: number;
}
