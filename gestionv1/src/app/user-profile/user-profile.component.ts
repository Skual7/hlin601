import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  modifying = false;

  birthday : string;
  //tournoisInscrit : string[]; // à rempl
  //teams 

  constructor(public userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.birthday = this.userService.user.birthday;
   
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
/*
  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User( formValue['firstName'], formValue['lastName'],this.birthday, formValue['email'], formValue['niveau'], this.tournoisInscrit);
    this.userService.user = newUser;
    this.modifying = false;
  }
  */

} 
