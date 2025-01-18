import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
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
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';


@NgModule({
  imports: [ RouterModule,CommonModule,FormsModule, ReactiveFormsModule, 
             ToastModule, MessagesModule, MessageModule,
             TabViewModule,ToolbarModule,
             AvatarModule, AvatarGroupModule,
             CalendarModule,
             PanelModule,
             DropdownModule,
             TableModule,TagModule,
             InputTextModule ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
