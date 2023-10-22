export interface IUser {
    id: number,
    username: string,
    avatar: string,
}

export interface IRegistration {
    username: string,
    email: string,
    password: string
}

export interface ILogin {
    email: string,
    password: string,
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser,
}