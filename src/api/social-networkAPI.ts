import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "d85e69be-8131-4e67-a4be-aab397617799",
    },
});

export const userAPI = {
    getUsers(itemsPerPage: number, curPage: number) {
        return instance.get<UsersResponseType>(`users?count=${itemsPerPage}&page=${curPage}`);
    },
    async isUserFollowed(userID: number) {
        const resp = await instance.get<boolean>(`follow/${userID}`);
        return resp.data;
    },
    followUser(userID: number) {
        return instance.post<ServerResponseType>(`follow/${userID}`);
    },
    unfollowUser(userID: number) {
        return instance.delete<ServerResponseType>(`follow/${userID}`);
    },
};

export const authAPI = {
    authorizeUser() {
        return instance.get<ServerResponseType<AuthUserDataType>>(`auth/me`);
    },
    loginUser(formData: LoginData) {
        return instance.post<LoginData, AxiosResponse<ServerResponseType<{ userId: number }>>>(`auth/login`, formData);
    },
    logoutUser() {
        return instance.delete<ServerResponseType>("auth/login");
    },
};

export const profileAPI = {
    fetchProfile(userID: string | number) {
        return instance.get<ProfileResponseType>(`profile/` + userID);
    },

    getProfileStatus(userID: string | number) {
        return instance.get<string>(`profile/status/` + userID);
    },

    updateProfileStatus(status: string) {
        return instance.put<{ status: string }, AxiosResponse<ServerResponseType>>(`profile/status`, { status });
    },

    changeProfilePhoto(formData: FormData) {
        return instance.put<
            { photos: UserPhotoType },
            AxiosResponse<ServerResponseType<{ photos: UserPhotoType }>>,
            FormData
        >(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateProfileData(formData: ProfileData) {
        return instance.put<ProfileData, AxiosResponse<ServerResponseType>>("profile", formData);
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
    small: string | null;
    large: string | null;
};

export type UsersResponseType = {
    items: UserType[];
    totalCount: number;
    error: string;
};

export type ProfileResponseType = {
    aboutMe: string;
    contacts: ContactsDomainType;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number | null;
    photos: UserPhotoType;
};

export type ContactsDomainType = {
    [key: string]: string;
};

export type AuthUserDataType = {
    id: number | null;
    email: string | null;
    login: string | null;
};

export type LoginData = {
    email: string;
    password: string;
    rememberMe?: boolean;
    captcha?: boolean;
};

export type ServerResponseType<T = {}> = {
    data: T;
    messages: string[];
    fieldErrors: string[];
    resultCode: number;
};

export enum ServerResultCode {
    OK = 0,
    Error = 1,
}

export type ProfileData = Partial<ProfileResponseType>