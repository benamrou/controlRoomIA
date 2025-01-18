import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [ RouterModule,CommonModule,FormsModule, ReactiveFormsModule, 
               ToastModule, MessagesModule, MessageModule,
               PasswordModule,DropdownModule,DialogModule,
               ButtonModule,
               InputTextModule ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LoginModule { }
