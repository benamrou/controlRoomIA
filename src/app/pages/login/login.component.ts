import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { Message } from "primeng/api"; 
import { LogginService, UserDataService, ScreenService, UserService } from '../../services/index';
import { MessageService } from 'primeng/api';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {


//@ViewChild('versionDiv') divVersion: ElementRef;

	authentification : any = {};
	mess: string = '';

	userInfoGathered: boolean = false;
	environmentGathered: boolean = false;
	parameterGathered: boolean = false;
	labelsGathered: boolean = false;

    canConnect: boolean = false;
    divVersion: any;

    showPsw: boolean = false;
    messages: Message[]=[];

    storesListDisplay = [];
    storeUserSelection;

    multiStoreSelectionVisible = false;

    constructor(public router: Router, 
                private _logginService: LogginService, 
                private _userDataService: UserDataService,
                private _userService: UserService,
                private _screenService: ScreenService,
                private _messageService: MessageService) { 
        this.canConnect = false;
        this.authentification.username = '';
        this.messages=[];
    
    }

    ngOnInit() {
        StatusBar.hide();       
        this._userDataService.userInfo = null;         
        this._userDataService.ICRAuthToken = null;
        this._userDataService.ICRUser = null;
        this._userDataService.ICRSID = '';
        this._userDataService.ICRLanguage = '';
    }

    onLoggedin() {
        this._messageService.clear();  
        //this.router.navigate(['/home']);
        //localStorage.setItem('isLoggedin', 'true');
        if (!this.authentification.password || !this.authentification.username) {
            this.showMissingPassword();
        }
        else {
            this._logginService.login(this.authentification.username, this.authentification.password) 
                .subscribe( result => {
                    this.canConnect = result;
                    if (this.canConnect) {
                        this.fetchUserConfiguration();
                    }
                    else {
                        this.showInvalidCredential();
                    }
                }
            );
        }
    }

    showMissingPassword() {
        this._messageService.add({sticky:true, severity:'error', 
                            summary:'Missing identification', 
                            detail: 'User and password are requried for authentification'});
	}
    showInvalidCredential() {
        this._messageService.add({sticky:true, severity:'error', 
                            summary:'Invalid credentials', 
                            detail: 'Use your GOLD user/password or contact HelpDesk'});
	}

    async fetchUserConfiguration() {
        /**
		 * 1. Load User information to enable menu access and functionnality
		 * 2. Get the corporate environments user can have access
		 * 3. Get Profile and Menu access
		 */

        console.log('LOGIN : Fectching user configuration');

        this.parameterGathered = true;
        this.labelsGathered = true;
        this._userDataService.storeAccess = [];  
        this._userService.getInfo(this._userDataService.ICRUser!).subscribe( 
            data => {  
                console.log('User info' , this._userDataService.userInfo);
                this.userInfoGathered = true;  
            },
            error => {
                // console.log('Error HTTP GET Service ' + error + JSON.stringify(error)); // in case of failure show this message
                //this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
            },
            () => {
                this._userService.getEnvironment(this._userDataService.ICRUser!).subscribe( 
                    data => {  
                        console.log('Environment data gathered' , this._userDataService.userInfo);
                        this.environmentGathered = true;
                        this._userDataService.isLoggedin = true;
                    }, 
                    error => {
                        // console.log('Error HTTP GET Service ' + error + JSON.stringify(error)); // in case of failure show this message
                        //this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
                    },
                    () => {
                        this._userService.getStore(this._userDataService.ICRUser!).subscribe(
                            data => {  
                                console.log(' getStore this._userDataService :', this._userDataService.storeAccess.length, this._userDataService);
                                this.storesListDisplay =  this._userDataService.storeAccess.map((x)=>x['storeDisplay']);
                                this.storeUserSelection = this.storesListDisplay[0];
                                //console.log(' getStore this._userDataService :', this._userDataService, this.storeUserSelection, this.storesListDisplay);
                            }, 
                            error => {
                                // console.log('Error HTTP GET Service ' + error + JSON.stringify(error)); // in case of failure show this message
                                //this._messageService.add({severity:'error', summary:'ERROR Message', detail: error });
                            },
                            () => {
                                if (this._userDataService.storeAccess.length >1) {
                                    this.multiStoreSelectionVisible = true;
                                }
                                if (this._userDataService.storeAccess.length == 0) {
                                    console.log('this._userDataService.storeAccess:', this._userDataService.storeAccess.length)
                                    this._messageService.add({sticky:true, severity:'error', 
                                                        summary:'Invalid store access', 
                                                        detail: 'This user is not allowed to store access'});
                        
                                }
                                if (this._userDataService.storeAccess.length == 1) {
                                    this._userDataService.selectedStore = this._userDataService.storeAccess[0];
                                    this.multiStoreSelectionVisible = false;

                                    // Route to dashboard
                                    this.router.navigate(['/home']);
                                    localStorage.setItem('isLoggedin', 'true');
                                }
                            }
                        )

                    }
                )
            }
        );
       
        //this.router.navigate(['/home']);

    }

    showHideVersion() {
       if(this.divVersion.nativeElement.style.visibility === 'hidden') {
            this.divVersion.nativeElement.style.visibility = 'visible';
        }
        else {
            this.divVersion.nativeElement.style.visibility = 'hidden';
        }
    }

    enteringPassword(event) {
        if (event.keyCode === 13) {
            //keycode for enter
            this.onLoggedin();
        }
    }
    seletedStore() {
        this._userDataService.selectedStore = this._userDataService.storeAccess.filter(item =>
            item.storeDisplay.toLowerCase().includes(this.storeUserSelection.toLowerCase()))[0];
        this.multiStoreSelectionVisible = false;
        // Route to dashboard
        this.router.navigate(['/home']);
        localStorage.setItem('isLoggedin', 'true');
    }
}