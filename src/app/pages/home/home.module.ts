import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarOneWayModule } from './toolbar/toolbar.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HistoryModule } from './history/history.module';
import { InventoryModule } from './inventory/inventory.module';


@NgModule({
  imports: [ RouterModule,CommonModule,FormsModule, ReactiveFormsModule, 
             ToastModule, MessagesModule, MessageModule,
             TabViewModule,ToolbarModule,
             AvatarModule, AvatarGroupModule,
             DropdownModule,
             ToolbarOneWayModule,
             DashboardModule, HistoryModule, InventoryModule,
             InputTextModule ],
  declarations: [HomePageComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
