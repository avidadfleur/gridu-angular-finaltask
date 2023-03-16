import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";
import { IndividualUserData, RegisterOrLoginData, SeveralUserData} from "../shared/interfaces";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor (private http: HttpClient) {}

    registerProceed(inputData: RegisterOrLoginData): Observable<RegisterOrLoginData> {
        return this.http.post<RegisterOrLoginData>('https://reqres.in/api/register', inputData);
    }

    loginProceed(inputData: RegisterOrLoginData): Observable<RegisterOrLoginData>  {
        return this.http.post<RegisterOrLoginData>('https://reqres.in/api/login', inputData);
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem('token') !== null;
    }

    getToken() : string | null {
        return sessionStorage.getItem('token') !== null? sessionStorage.getItem('token') : '';
    }

    getAllUsers(): Observable<SeveralUserData> {
        return this.http.get<SeveralUserData>(`https://reqres.in/api/users?page=1&per_page=12`);
    }

    selectUser(id: number): Observable<IndividualUserData> {
        return this.http.get<IndividualUserData>(`https://reqres.in/api/users/${id}`);
    }
}