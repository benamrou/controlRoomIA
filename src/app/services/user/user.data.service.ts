import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../request/html.service';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';


export class User {
    public userNameDisplay: string;
    public username: string;
    public corporate: string;
    public password: string;
    public authentificationMethod: string;
    public language: string;
    public profile: string;
    public application: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public mobile: string;
    public team: string;
    public status: string;
    public createdOn: string;
    public updatedOn: string;
    public lastUserUpdate: string;
    public type: string;
    public dataIntegrity: number;
    public it: number;
    public buyer: number;
    public helpDesk: number;
    public warehouse: number;
    public spaceplanning: number;
 
    public envCorporateAccess: Environment[] = [];
    public envUserAccess: Environment[] = [];
    public mainEnvironment: Environment[] = []; // Can be multiple such as GOLD CEMTRAL and GOLD STOCK , main is by env type
    public sid: String [] = [];
    public envDefaultLanguage: string;
    
 
    /********************************************************/
    /* Data Storage to refrain regular search - Static Info */
    /********************************************************/
    public screenInfo: any;
 }
 export class Environment {
    public level: string; 
    public id: string;
    public code: string;
    public type: string;
    public status: string;
    public dbType: string;
    public shortDescription: string;
    public longDescription: string;
    public ipAddress: string;
    public portNumber: string;
    public connectionID: string;
    public connectionPassword: string;
    public databaseSourceSID: string;
    public dbLink: string;
    public default: number;
    public defaultLanguage: string;
    public GOLDversion: string;
    public initSH: string;
    public titleColor: string;
    public title: string;
    public picture: string;
    public domain: string;
    public restartallstock: string;
    public restartstock: string;
    public restartcentral: string;
    public restartgfa: string;
    public restartgwr: string;
    public restartgwvo: string;
    public restartradio: string;
    public restartprint: string;
    public restartmob: string;
    public restartxml: string;
    public restartvocal: string;
 }
 
 @Injectable()
 export class UserDataService {
 
   public userInfo : User;

   public ICRAuthToken: string;
   public ICRUser: string;
   public ICRSID: string;
   public ICRLanguage: string;
   public isLoggedin: boolean = false;


   /** Cookies */
   public ENV_IP: string;
   public ENV_ID: string;
   public ENV_PASS: string;
   public ENV_IP_STOCK: string;
   public ENV_ID_STOCK: string;
   public ENV_PASS_STOCK: string;
   public ENV_IP_MOB: string;
   public ENV_ID_MOB: string;
   public ENV_PASS_MOB: string;
   public ENV_IP_GWR: string;
   public ENV_ID_GWR: string;
   public ENV_PASS_GWR: string;
   public ENV_IP_GFA: string;
   public ENV_ID_GFA: string;
   public ENV_PASS_GFA: string;

   public selectedStore: string;
   public storeAccess = [];
 
   constructor() { 
   }
 
 
 } 
 
 