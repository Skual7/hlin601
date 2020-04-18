import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TournoisService } from './tournois.service';
import { QualifServiceService } from './qualif-service.service';
import { VueGeneraleComponent } from './vue-generale/vue-generale.component';
import { PouleComponent } from './poule/poule.component';
import { RoundComponent } from './round/round.component'

@NgModule({
  declarations: [
    AppComponent,
    VueGeneraleComponent,
    PouleComponent,
    RoundComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ TournoisService, QualifServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
