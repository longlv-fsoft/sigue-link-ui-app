import { IUser } from "@longlv91/training-common/dist";

export interface AuthLoginModel {
    username: string;
    password: string;
}

export interface AuthReponseModel {
    userInfo: IUser,
    access_token: string;
}