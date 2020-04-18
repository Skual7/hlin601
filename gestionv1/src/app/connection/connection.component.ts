import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ConnectionService } from '../services/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})

export class ConnectionComponent implements OnInit {
  connected: boolean;
  constructor(private connectionService: ConnectionService,
              private router : Router) { }

  ngOnInit() {
    this.connected = this.connectionService.isConnected;
  }
  onSignIn(){
    this.connectionService.signIn().then(
      () => {
        this.connected = this.connectionService.isConnected;
        this.router.navigate(['/events']);
      }
    )
  }
  onSignOut(){
    this.connectionService.signOut();
    this.connected = this.connectionService.isConnected;
  }

}
