import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ConnectionService } from '../services/connection.service';
import { Router } from '@angular/router';
import { RequestService } from '../services/request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})

export class ConnectionComponent implements OnInit {

  constructor(private connectionService: ConnectionService,
              private router : Router, private formBuilder: FormBuilder,
              private requestService: RequestService, private  userService: UserService) { }

  formConnexion : FormGroup;
  formInscription: FormGroup;
  ////// GETTERS utiles pour la gestion d'erreurs au niveau du template d'inscritpion //////
  get niveau(){
    return this.formInscription.get('niveau');
  }
  get prenom(){
    return this.formInscription.get('prenom');
  }
  get mdp(){
    return this.formInscription.get('mdp');
  }
  get email(){
    return this.formInscription.get('email');
  }

  ngOnInit() {
    // création du formulaire de connexion //
    this.formConnexion = this.formBuilder.group({
      email: ['', Validators.required],
      mdp: ['', Validators.required]
    });
    // création du formulaire d'inscription //
    this.formInscription = this.formBuilder.group({
      nom: ['',[Validators.required] ],
      prenom: ['',[Validators.required, Validators.minLength(3)]],
      birthday: ['',[Validators.required]],
      niveau : [null,[Validators.required, Validators.min(1),Validators.max(5)]],
      email: ['',[Validators.required]], /* , Validators.pattern('[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}') */
      mdp: [, [Validators.required, Validators.minLength(5)]]
    });
    
  }

  onSignIn(){
    const connexionValues = this.formConnexion.value;
   this.userService.setUser(this.requestService.request('SELECT * FROM user where user.email = "'+connexionValues['email']+'"'));
    this.connectionService.connexion(connexionValues['email'],connexionValues['mdp']);
    if(this.connectionService.isConnected){
      this.router.navigate(['/events']);
    }
    else if (this.connectionService.wrongPwd){
      console.log("Mauvaais identifiant ou mot de passe")
    } if (this.connectionService.pbCoBdd){
      console.log("Une erreur de connexion à la BDD est survenue: Réessayer")
    }
    this.requestService.request('Select * from User where email = "'+connexionValues['email']+'"');
  }
  onInscription(){
    const inscValues = this.formInscription.value;
    // insertion dans la bdd
    let t = this.requestService.request('INSERT INTO user VALUES ('+'"'+inscValues['email']+'"'+', "'+inscValues['prenom']+'", "'+
    inscValues['nom']+'", "'+inscValues['niveau']+'", "'+inscValues['birthday']+'", "'+inscValues['mdp']+'")');
    console.log(t);
    // connexion automatique si insertion pas torp longue ... 
    this.autoCo(inscValues['email'], inscValues['mdp']);
    
  }
  autoCo(email : string , pwd: string){
    this.connectionService.connexion(email,pwd);
    if(this.connectionService.isConnected){
      this.router.navigate(['/events']);
    }
    
  }
}
