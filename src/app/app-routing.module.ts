import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TutoDomoticComponent} from './home/tuto-domotic/tuto-domotic.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'project',
    loadChildren: './project-page/project-page.module#ProjectPageModule'
  },
  {
    path: 'profil',
    loadChildren: './user-profil/user-profil.module#UserProfilModule'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
