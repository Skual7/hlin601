import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventVB } from '../models/event.modele';
import { EventService } from '../services/event.service';
import { Team } from '../models/team.modele';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  modifying = false;

  // birthday : string;
  events : EventVB[];
  

    @Input() firstName: string; 
    @Input() lastName: string;
    @Input() birthday: string;
    @Input() email: string;
    @Input() niveau: number;
    @Input() inscrit: Team[];
    @Input() event: string[];

  constructor(public userService: UserService,
              private formBuilder: FormBuilder,
              private eventService: EventService) { }

  ngOnInit() {
    this.initForm();
    this.birthday = this.userService.user.birthday;
    this.events = this.eventService.getEventForUser(this.userService.user.event);
   
  }
  initForm(){
    this.userForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        niveau: [ , Validators.required]
      }
    );
  }
  test(){
    console.log(this.userService.user);
  }
  /*
  CommencerEvent(name: string){
    this.router.navigate(['event/gestion/'+name])
  }*/

/*
  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User( formValue['firstName'], formValue['lastName'],this.birthday, formValue['email'], formValue['niveau'], this.tournoisInscrit);
    this.userService.user = newUser;
    this.modifying = false;
  }
  */
  

} 
