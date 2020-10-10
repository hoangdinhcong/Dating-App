import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({ providedIn: 'root' })
export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        const id = +route.params.id;
        return this.userService.getUser(id).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data: ' + error);
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
