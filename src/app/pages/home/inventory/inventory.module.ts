import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InventoryComponent } from './inventory.component';
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
import { DataViewModule } from 'primeng/dataview';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ListboxModule } from 'primeng/listbox';


@NgModule({
  imports: [ RouterModule,CommonModule,FormsModule, ReactiveFormsModule, 
             ToastModule, MessagesModule, MessageModule,
             TabViewModule,ToolbarModule,
             AvatarModule, AvatarGroupModule,
             DataViewModule,
             DropdownModule,
             ButtonModule,
             MultiSelectModule,
             ScrollerModule,
             ScrollPanelModule,
             CardModule,SelectButtonModule,
             TableModule,
             TooltipModule,
             NgxDatatableModule,
             InputGroupModule,InputGroupAddonModule,
             InputTextModule, ListboxModule ],
  declarations: [InventoryComponent],
  exports: [InventoryComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryModule {}
