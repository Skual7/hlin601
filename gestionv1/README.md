# NB Pour Romain
- Toutes les infos sont dans le fichier services/request.service.ts

# NB
- "pas terminé" c'est surtout pas implémenté du tout. En soit rien n'est terminé
- Pour la liste des choses à faire voir todo.txt
- lors de la validation des formulaires regarder la console les nouveaux objets y sont affichés

# Description (rapide) des composants: 
- Connection (pas terminé)
La connexion est simulée avec les méthode onSignIn/onSignOut et lors de la "connexion"
une redirection vers les événements est faite grâce au routeur

- event
Composant simple affiché dans la page événements comme un list-item

- event-view
C'est la page événements  qui contient une liste d'event

- home ( pas terminé)
Page d'accueil qui ressemble à rien pour l'instant

- new-event
génère le formulaire pour créer un nouvel event.

- new-team
génère le formulaire pour créer une nouvelle équipe 
- les Services
Servent à "centraliser du code" même si des fois du code est directement dans le composant 
alors que j'aurai pu le mettre dans le service (nettoyage de code à la fin je pense)

- connection-guard.service
permet juste à l'utilisateur d'accéder (ou pas) à différentes routes en fonction de son état (connecté ou pas) et permet de rediriger vers la connexion si nécessaire
- single-event 
c'est quand on clique sur détails et tournois, c'est la page réservé à un évènement
 ( je reprendrai surement le code entièrement parce qu'il est pas ouf)
- team 
composant simple pour afficher une équipe 
- tournament
composant présent dans single-event qui permet l'inscription à un évènement 
( pas la suite permettra de récupérer l'event en question mais à implémenter dans user)
- user-profile
Pas encore modifié, j'ai ajouté le type Team comme attribut du modèle mais ça fonctionne pas trop ... à revoir il est buggué mais grossièrement il affiche (simulé ici) les info de la personne connectée.

# Explication des models
- modèle correspond à une classe, donc un nouveau type. Permet de faire new quelque chose.
- ici Team dans le modèle de User fait bugger un peu le User

# Le dossier pseudo BDD
- sert actuellement de "BDD" pour que je puisse aller y chercher des composant correctement fait 
- j'ai pas réusis à y rajouter des éléments (je pense du au const) 


# Gestionv1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

