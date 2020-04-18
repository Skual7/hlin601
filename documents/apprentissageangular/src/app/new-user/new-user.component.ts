import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  // object formulaire qui corrrespondra au formulaire ds template
  userForm: FormGroup;
  // formBuilder outils/class qui permet de creer des formulaire 
  // (objet de type formGroup) plus facilement
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.userForm = this.formBuilder.group({
      firstName: 'Prenom',
      lastName: 'nom',
      email: 'adresse@email.com',
      niveau: 0
    });
  }
}
