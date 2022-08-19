import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SessionStorageService } from '../services/session-storage.service';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private sessionStorage: SessionStorageService,
        private authService: AuthService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.sessionStorage.getData('access_token')}`
            }
        });

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                // if (event instanceof HttpResponse) {
                //     console.log('event--->>>', event);
                // }
                return event;
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.sessionStorage.clearData(['access_token', 'userInfo']);
                        this.authService.redirectLogin();
                    }
                }
                return throwError(err);
            })
        );
    }
}
