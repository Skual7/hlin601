import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';


import { EventService } from './services/event.service';
import { EventViewComponent } from './event-view/event-view.component';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SingleEventComponent } from './single-event/single-event.component';
import { ConnectionService } from './services/connection.service';
import { HomeComponent } from './home/home.component';
import { ConnectionGuard } from './services/connection-guard.service';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentService } from './services/tournament.service';
import { TeamListComponent } from './team-list/team-list.component';
import { NewTeamComponent } from './new-team/new-team.component';
import { TeamService } from './services/team.service';



const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'events', canActivate:[ConnectionGuard], component: EventViewComponent},
  {path: 'events/:id', canActivate:[ConnectionGuard], component: SingleEventComponent},
//  {path: 'new-team', canActivate:[ConnectionGuard], component: NewTeamComponent},
  { path: 'connection', component: ConnectionComponent},
  { path: 'profile', canActivate:[ConnectionGuard], component: UserProfileComponent },
  { path: '', component: HomeComponent},
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventViewComponent,
    ConnectionComponent,
    UserProfileComponent,
    SingleEventComponent,
    HomeComponent,
    TournamentComponent,
    TeamListComponent,
    NewTeamComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    EventService,
    UserService,
    ConnectionService,
    ConnectionGuard,
    TournamentService,
    TeamService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }