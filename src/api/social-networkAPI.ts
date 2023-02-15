import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "d85e69be-8131-4e67-a4be-aab397617799",
    },
});

export const userAPI = {
    async getUsers(itemsPerPage: number, curPage: number) {
        const resp = await instance.get<UsersResponseType>(`users?count=${itemsPerPage}&page=${curPage}`);
        return resp.data;
    },
    async isUserFollowed(userID: number) {
        const resp = await instance.get<boolean>(`follow/${userID}`);
        return resp.data;
    },
    followUser(userID: number) {
        return instance.post<ResponseType>(`follow/${userID}`);
    },
    unfollowUser(userID: number) {
        return instance.delete<ResponseType>(`follow/${userID}`);
    },
};

//types
export type UserType = {
    name: string;
    id: number;
    uniqueUrlName: string | null;
    photos: UserPhotoType;
    status?: string | null;
    followed: boolean;
};

export type UserPhotoType = {
    small: string;
    large: string;
};

export type UsersResponseType = {
    items: UserType[];
    totalCount: number;
    error: string;
};

export type ResponseType<T = {}> = {
    data: T;
    messages: string[];
    fieldErrors: string[];
    resultCode: number;
};

export enum ResultCode {
    OK = 0,
    Error = 1,
}
