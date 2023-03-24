import { FormControl } from "@angular/forms";

export interface SeveralUserData {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        UserData[];
    support:     Support;
}

export interface UserData {
    readonly id: number;
    email:       string;
    first_name:  string;
    last_name:   string;
    avatar:      string;
}

export interface IndividualUserData {
    data:    UserData;
    support: Support;
}

export interface Support {
    url:  string;
    text: string;
}

export interface RegisterOrLoginData {
    email: string;
    password: string;
}

export enum IsLoading {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}