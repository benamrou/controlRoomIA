import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../request/html.service';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { UserDataService, User, Environment } from './user.data.service';
import { QueryService } from '../query/query.service';


 @Injectable()
 export class UserService {
 
   private queryUserPassOK : string = 'ONE0000002';
   private queryUserEnv : string = 'ONE0000003';
   private queryUserStore : string = 'ONE0000004';
   
   private request: string = '/api/request/';
   private params: HttpParams;
   private options: HttpHeaders;
 
   constructor(private http:HttpService, private router:Router, private _userDataService: UserDataService,
               private _queryService: QueryService) { 
   }
 
     /**
      * This function retrieves the User information.
      * @method getUserInfo
      * @param username 
      * @returns JSON User information object
      */
   getInfo (username: string) {
    //console.log('***** getInfo - User -  ****');
    let parameters = []
    this._userDataService.userInfo = new User();
    this.params= new HttpParams();
    parameters.push( username);

    let headersSearch = new HttpHeaders();
    this.params= new HttpParams();
    parameters.push( username);
    headersSearch = headersSearch.set('QUERY_ID', this.queryUserPassOK);

    console.log(' getInfo this._userDataService [BEGIN]: ',this._userDataService);
    console.log ('getInfo', username);
    for (let i=0; i < parameters.length;i++) {
        this.params = this.params.append('PARAM',parameters[i]);
    }
    this.params = this.params.append('PARAM',this._userDataService.ICRUser!);
         return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
                 let data = <any> response;
                 console.log ('queryUserPassOK', data[0], this._userDataService.userInfo);
                 this._userDataService.userInfo.username = data[0].USERID; // @ts-ignore
                 this._userDataService.userInfo.corporate = data[0].USERCORP; // @ts-ignore
                 this._userDataService.userInfo.password = data[0].USERPASS;
                 this._userDataService.userInfo.authentificationMethod = data[0].USERAUTH; // @ts-ignore
                 this._userDataService.userInfo.language = data[0].USERLANG; 
                 this._userDataService.userInfo.profile = data[0].USERPROF;
                 this._userDataService.userInfo.application = data[0].USERAPPLI;
                 this._userDataService.userInfo.firstname = data[0].USERFNAME;
                 this._userDataService.userInfo.lastname = data[0].USERLNAME;
                 this._userDataService.userInfo.email = data[0].USEREMAIL;
                 this._userDataService.userInfo.mobile = data[0].USERMOBILE;
                 this._userDataService.userInfo.team = data[0].USERTEAM;
                 this._userDataService.userInfo.dataIntegrity = data[0].USERDATAINTEGRITY;
                 this._userDataService.userInfo.it = data[0].USERIT;
                 this._userDataService.userInfo.buyer = data[0].USERBUYER;
                 this._userDataService.userInfo.helpDesk = data[0].USERHELPDESK;
                 this._userDataService.userInfo.warehouse = data[0].USERWAREHOUSE;
                 this._userDataService.userInfo.spaceplanning = data[0].USERSPACEPLANNING;
                 this._userDataService.userInfo.status = data[0].USERACTIVE;
                 this._userDataService.userInfo.createdOn = data[0].USERDCRE;
                 this._userDataService.userInfo.updatedOn = data[0].USERDMAJ;
                 this._userDataService.userInfo.lastUserUpdate = data[0].USERUTIL;
                 this._userDataService.userInfo.type = data[0].USERTYPE;
 
                 //console.log ('data[0] : ' + JSON.stringify(data[0]));
                 //console.log ('USERLNAME : ' + data[0].USERLNAME);
                 this._userDataService.userInfo.userNameDisplay = this._userDataService.userInfo.firstname;

                 console.log(' getInfo this._userDataService [END]: ',this._userDataService.userInfo);
                 return this._userDataService.userInfo;
         }));
   }
 
 
    /**
     * This function retrieves the User Environment access information.
     * @method getEnvironment
     * @param username 
     * @returns JSON User Environment information object
     */
    getEnvironment(username: string) {
        console.log('***** getEnvironment - User -  ****');
        let parameters = []
        let headersSearch = new HttpHeaders();
        this.params= new HttpParams();
        parameters.push( username);
        headersSearch = headersSearch.set('QUERY_ID', this.queryUserEnv);

        for (let i=0; i < parameters.length;i++) {
            this.params = this.params.append('PARAM',parameters[i]);
        }
      this.params = this.params.append('PARAM',this._userDataService.ICRUser!);

      console.log(' getEnvironment this._userDataService [BEGIN]: ',this._userDataService.userInfo);

        return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
                let data = <any> response;
                this._userDataService.userInfo.sid = [];
                for(let i=0; i < data.length; i ++) {
                    // Parse the environment and add them to the User Card
                    //console.log('Environment: ' + JSON.stringify(data[i]));

                    let env = new Environment();
                    env.level = data[i].LEVEL;
                    env.id = data[i].ENVID;
                    env.code = data[i].ENVCODE;
                    env.type = data[i].ENVTYPE;
                    env.status = data[i].ENVACTIVE;
                    env.shortDescription = data[i].ENVSDESC;
                    env.longDescription = data[i].ENVLDESC;
                    env.dbType = data[i].ENVDBTYPE;
                    env.ipAddress = data[i].ENVIP;
                    env.portNumber = data[i].ENVPORT;
                    env.connectionID = data[i].ENVUSER;
                    env.connectionPassword = data[i].ENVPASSWORD;
                    env.databaseSourceSID = data[i].ENVSOURCE;
                    env.dbLink = data[i].ENVDBLINK;
                    env.GOLDversion = data[i].ENVVERSION;
                    env.default = data[i].ENVDEFAULT;
                    env.defaultLanguage = data[i].ENVDEFLANG;
                    env.initSH = data[i].ENVVARINITSH;
                    env.titleColor = data[i].ENVTITLECOLOR;
                    env.title = data[i].ENVTITLE;
                    env.picture = data[i].CORPPIC;
                    env.domain = data[i].ENVDOMAIN;
                    env.restartcentral = data[i].ENVCENTRALRESTART;
                    env.restartstock = data[i].ENVSTOCKRESTART;
                    env.restartallstock = data[i].ENVALLSTOCKRESTART;
                    env.restartmob = data[i].ENVMOBRESTART;
                    env.restartgfa = data[i].ENVGFARESTART;
                    env.restartgwvo = data[i].ENVGWVORESTART;
                    env.restartgwr = data[i].ENVGWRRESTART;
                    env.restartprint = data[i].ENVPRINTERRESTART;
                    env.restartradio = data[i].ENVRADIORESTART;
                    env.restartxml = data[i].ENVXMLRESTART;
                    env.restartvocal = data[i].ENVVOCALRESTART;

                    this._userDataService.userInfo.envDefaultLanguage = env.defaultLanguage;
                
                    if (env.level === 'USER') { this._userDataService.userInfo.envUserAccess.push(env); }
                    if (env.level === 'CORPORATE') { this._userDataService.userInfo.envCorporateAccess.push(env); }

                    if (env.default === 1) {
                    //console.log('MAIN ',env);
                    // Set cookies for environment access information
                    this.setCookiesEnvironment(env);

                    this._userDataService.userInfo.mainEnvironment.push(env);
                    this._userDataService.userInfo.envDefaultLanguage = env.defaultLanguage;
                    if ( ! this._userDataService.userInfo.sid.includes(env.dbLink)) {
                        this._userDataService.userInfo.sid.push(env.dbLink);
                    }
                    }

                }
                //console.log('ICRSID', this._userDataService.userInfo);
                //localStorage.setItem('ICRSID', this._userDataService.userInfo.sid[0].toString());
                //localStorage.setItem('ICRLanguage', this._userDataService.userInfo.envDefaultLanguage);
                this._userDataService.ICRSID = this._userDataService.userInfo.sid[0].toString();
                this._userDataService.ICRLanguage= this._userDataService.userInfo.envDefaultLanguage;
                
                console.log(' getEnvironment this._userDataService [END]: ',this._userDataService.userInfo);
                //console.log('Env: ' + JSON.stringify (this._userDataService.userInfo));
                return data;
        }));
        
    }
 
    /**
     * This function retrieves the User store access information.
     * @method getStore
     * @param username 
     * @returns JSON User Environment information object
     */
    getStore(username: string) {
    //console.log('***** getStore - User -  ****');
    let parameters = []
    let headersSearch = new HttpHeaders();
    this.params= new HttpParams();
    parameters.push( username);

    for (let i=0; i < parameters.length;i++) {
        this.params = this.params.append('PARAM',parameters[i]);
      }
      this.params = this.params.append('PARAM',this._userDataService.ICRUser!);
  
      headersSearch = headersSearch.set('QUERY_ID', this.queryUserStore);
      console.log(' getStore this._userDataService [BEGIN]: ',this._userDataService.userInfo);
      if (this._userDataService.userInfo.sid.length >0 ) {
        headersSearch = headersSearch.set('DATABASE_SID', this._userDataService.userInfo.sid[0].toString());
        headersSearch = headersSearch.set('LANGUAGE', this._userDataService.userInfo.envDefaultLanguage);
      }
      return this.http.get(this.request, this.params, headersSearch).pipe(map(response => {
              let data = <any> response;
              for (let i=0; i < data.length; i++) {
                 this._userDataService.storeAccess.push( {
                     storeNum: data[i].storeNum,
                     storeDesc: data[i].storeDesc,
                     storeDisplay: data[i].storeNum + ' | ' + data[i].storeDesc
                 })
                }

           console.log(' getStore this._userDataService [END]: ',this._userDataService.userInfo);
              return data;
      }));
    }

     /**
      * This function is switching the User Main environment based on the environment type
      * @method setMainEnvironmentUsingType
      * @param envID envrionment type  
      */
     setMainEnvironment(envType: string) {
         this._userDataService.userInfo.mainEnvironment = [];
         this._userDataService.userInfo.sid = [];
 
         this.unsetCookiesEnvironment();
         // Two information - 
         // INFO 1 - Redefine the main environment using the type
         // INFO 2 - Redefine the SIDs environment using the type
         console.log('Switching to type: ',envType, this._userDataService.userInfo.envUserAccess);
         if (this._userDataService.userInfo.envUserAccess.length > 0) {
             for (let i = 0; i < this._userDataService.userInfo.envUserAccess.length; i ++) {
                 if (this._userDataService.userInfo.envUserAccess[i].type === envType) {
                     this._userDataService.userInfo.mainEnvironment.push(this._userDataService.userInfo.envUserAccess[i]);
                     this._userDataService.userInfo.sid.push(this._userDataService.userInfo.envUserAccess[i].dbLink);
 
                     this.setCookiesEnvironment(this._userDataService.userInfo.envUserAccess[i]);
                 }
             }
         } else {
             for (let i = 0; i < this._userDataService.userInfo.envCorporateAccess.length; i ++) {
                 if (this._userDataService.userInfo.envUserAccess[i].type === envType) {
                     this._userDataService.userInfo.mainEnvironment.push(this._userDataService.userInfo.envCorporateAccess[i]);
                     this._userDataService.userInfo.sid.push(this._userDataService.userInfo.envUserAccess[i].dbLink);
                    
                     this.setCookiesEnvironment(this._userDataService.userInfo.envUserAccess[i]);
                 }
             }
         }
         this._userDataService.ICRSID =this._userDataService.userInfo.sid.toString();
         //localStorage.setItem('ICRSID', this._userDataService.userInfo.sid.toString());
         this._userDataService.ICRSID = this._userDataService.userInfo.sid.toString();
     }
 
     setMainLanguage (newLanguage: string) {
         this._userDataService.userInfo.envDefaultLanguage =newLanguage;
         //localStorage.setItem('ICRLanguage', this._userDataService.userInfo.envDefaultLanguage);
         this._userDataService.ICRLanguage = this._userDataService.userInfo.envDefaultLanguage;
     }
   

     setCookiesEnvironment (env: Environment) {
        //console.log('Set cookies: ', env);
        switch(env.domain) {
            case '1' /*CENTRAL*/: 
                this._userDataService.ENV_IP = env.ipAddress;
                this._userDataService.ENV_ID = env.connectionID;
                this._userDataService.ENV_PASS = env.connectionPassword;
                break;
            case '2' /*STOCK*/: 
                this._userDataService.ENV_IP_STOCK = env.ipAddress;
                this._userDataService.ENV_ID_STOCK = env.connectionID;
                this._userDataService.ENV_PASS_STOCK = env.connectionPassword;
                break;
            case '3' /*GWR*/:
                this._userDataService.ENV_IP_GWR = env.ipAddress;
                this._userDataService.ENV_ID_GWR = env.connectionID;
                this._userDataService.ENV_PASS_GWR = env.connectionPassword;
                break;
            case '4' /*MOBILITY*/:
                this._userDataService.ENV_IP_MOB = env.ipAddress;
                this._userDataService.ENV_ID_MOB = env.connectionID;
                this._userDataService.ENV_PASS_MOB = env.connectionPassword;
                break;
            case '5' /*GFA*/:
                this._userDataService.ENV_IP_GFA = env.ipAddress;
                this._userDataService.ENV_ID_GFA = env.connectionID;
                this._userDataService.ENV_PASS_GFA = env.connectionPassword;
                break;
            default:
                this._userDataService.ENV_IP = env.ipAddress;
                this._userDataService.ENV_ID = env.connectionID;
                this._userDataService.ENV_PASS = env.connectionPassword;
            break;
         }   
     }

     unsetCookiesEnvironment() {
        this._userDataService.ENV_IP = '';
        this._userDataService.ENV_ID = '';
        this._userDataService.ENV_PASS = '';
        this._userDataService.ENV_IP_STOCK = '';
        this._userDataService.ENV_ID_STOCK = '';
        this._userDataService.ENV_PASS_STOCK = '';
        this._userDataService.ENV_IP_MOB = '';
        this._userDataService.ENV_ID_MOB = '';
        this._userDataService.ENV_PASS_MOB = '';
        this._userDataService.ENV_IP_GWR = '';
        this._userDataService.ENV_ID_GWR = '';
        this._userDataService.ENV_PASS_GWR = '';
        this._userDataService.ENV_IP_GFA = '';
        this._userDataService.ENV_ID_GFA = '';
        this._userDataService.ENV_PASS_GFA = '';
     }

 } 
 
 