import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthentificationGuard } from './services/authentification/authentification.guard.component';

import { HomePageComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { NotAccessibleComponent } from './pages/not-accessible/not-accessible.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: HomePageComponent, loadChildren: () => import('./pages/home/home.module').then(module => module.HomePageModule) }, 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthentificationGuard] },

  /** ERROR */
  { path: 'server-error', component: ServerErrorComponent, canActivate: [AuthentificationGuard] },
  { path: 'not-accessible', component: NotAccessibleComponent, canActivate: [AuthentificationGuard] },
  { path: 'not-found', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }
