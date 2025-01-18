import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserDataService } from '../user/user.data.service';

@Injectable()
export class AuthentificationGuard implements CanActivate {

    constructor(private router: Router, private _userDataService: UserDataService) { }

    canActivate() {
        //console.log('canActivate() : ' +this._userDataService.ICRAuthToken);
        if (this._userDataService.ICRAuthToken) {
            // logged in so return true
            return true;
        }

        
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
