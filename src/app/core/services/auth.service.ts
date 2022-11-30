import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseResult, User } from '../models/auth.models';
import { environment } from 'src/environments/environment';
import { CookieService } from './cookie/cookie.service';
import { AppConsts } from '../constant/appConsts';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Injectable({ providedIn: 'root' })
@UntilDestroy()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<ResponseResult>;
    public user: Observable<ResponseResult>;
    headers: HttpHeaders;
    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<ResponseResult>(JSON.parse(this.cookieService.getCookie('currentUser-theLunchCircle')));
        this.user = this.currentUserSubject.asObservable();
    }

    /**
     * Returns the current user
     */
    public currentUser(): ResponseResult {
        if (!this.currentUserSubject.value) {
            this.currentUserSubject.next(JSON.parse(this.cookieService.getCookie('currentUser-theLunchCircle')));
        }
        return this.currentUserSubject.value;
    }

    public get currentUserToken() {
        if (!this.currentUserSubject.value) {
            this.currentUserSubject.next(JSON.parse(this.cookieService.getCookie('currentUser-theLunchCircle')));
        }
        return this.currentUserSubject.value.data.jwt;
    }


    public get currentUserId() {
        if (!this.currentUserSubject.value) {
            this.currentUserSubject.next(JSON.parse(this.cookieService.getCookie('currentUser-theLunchCircle')));
        }
        return this.currentUserSubject.value.data.userId;
    }
    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(username: string, password: string) {

        return this.http.post<any>(environment.apiUrl + AppConsts.authlogin, { username, password })
            .pipe(mergeMap(async (result) => {
                if (result) {
                    if (result.success) {
                        this.cookieService.deleteCookie('currentUser-theLunchCircle');
                        this.cookieService.setCookie('currentUser-theLunchCircle', JSON.stringify(result), 1);
                        this.currentUserSubject.next(result);
                        return result;
                    }
                }
                
            }));
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser-theLunchCircle');
        untilDestroyed(this);
        //this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    updateUserInformation(firstName: string, lastName: string) {
        var user = this.currentUserSubject.value;
        user.data.firstName = firstName;
        user.data.lastName = lastName;
        this.currentUserSubject.next(user);
        this.cookieService.setCookie('currentUser-theLunchCircle', JSON.stringify(this.currentUserSubject.value), 1);
    }
}

