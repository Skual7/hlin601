import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AppComponent } from './app.component';

import { TournoiComponent } from './tournoi/tournoi.component';
import { TournoiService } from "./services/tournoi.service";
import { AuthComponent } from './auth/auth.component';
import { TournoiViewComponent } from './tournoi-view/tournoi-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SingleTournoiComponent } from './single-tournoi/single-tournoi.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';
import { EditTournoiComponent } from './edit-tournoi/edit-tournoi.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user.service';
import { NewUserComponent } from './new-user/new-user.component';

const appRoutes: Routes = [
  { path: 'tournois', canActivate: [AuthGuard],component: TournoiViewComponent},
  { path: 'tournois/:id',canActivate: [AuthGuard], component: SingleTournoiComponent},
  { path: 'edit', canActivate: [AuthGuard], component: EditTournoiComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'users', component: UserListComponent},
  { path: '', component: TournoiViewComponent},
  { path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: '/not-found'} // toujours mettre à la fin les **
];

@NgModule({
  declarations: [
    AppComponent,
    TournoiComponent,
    AuthComponent,
    TournoiViewComponent,
    SingleTournoiComponent,
    FourOhFourComponent,
    EditTournoiComponent,
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TournoiService,
    AuthService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
