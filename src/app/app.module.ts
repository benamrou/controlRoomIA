import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/** Import Barcode scanner */
import { Barcode, BarcodeScanner,BarcodeScannerPlugin } from '@capacitor-mlkit/barcode-scanning';
/** Import module */
import { LoginModule } from './pages/login/login.module';
import { HomePageModule } from './pages/home/home.module';
import { ToolbarOneWayModule } from './pages/home/toolbar/toolbar.module';
import { DashboardModule } from './pages/home/dashboard/dashboard.module';
import { HistoryModule } from './pages/home/history/history.module';

/** Ipmport Services */
import { AuthentificationGuard } from './services';
import { UserService } from './services';
import { UserDataService } from './services';
import { QueryService } from './services/query/query.service';
import { LogginService } from './services';
import { HttpService } from './services';
import { ScreenService } from './services';
import { HttpClientModule } from '@angular/common/http';

/** Import PrimeNg service/Module */
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from "primeng/message"; 
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';

import { MessageService } from 'primeng/api';

import { NotAccessibleModule } from './pages/not-accessible/not-accessible.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { ServerErrorModule } from './pages/server-error/server-error.module';

@NgModule({
  declarations: [AppComponent],
  imports: [IonicModule.forRoot(), AppRoutingModule,
            BrowserModule,
            BrowserAnimationsModule,
            AppRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            DatePipe,
            CommonModule,
            HttpClientModule,

            /** Prime NG module */
            MessagesModule,MessageModule,ToastModule,PasswordModule,InputTextModule,
            TabViewModule,ToolbarModule,
            AvatarModule, AvatarGroupModule,
            DropdownModule,PanelModule,CalendarModule,
            DataViewModule,TableModule,TagModule,
            InputGroupModule, InputGroupAddonModule,
            ButtonModule,MultiSelectModule,ScrollerModule,ScrollPanelModule,
            CardModule,
            TooltipModule,
            SelectButtonModule,
            ListboxModule,
            DialogModule,
            
            /* One ay components */
            HomePageModule,LoginModule,
            ServerErrorModule, NotAccessibleModule, NotFoundModule,
            ToolbarOneWayModule, DashboardModule, HistoryModule

            
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
              AuthentificationGuard, UserService, LogginService,HttpService,
              UserDataService,DatePipe,
              ScreenService, QueryService, MessageService
            ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
