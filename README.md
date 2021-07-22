# Projet 7 - Créez un réseau social d’entreprise

## Backend
### Préparation

La base de donnée utilisé est Mysql. Cree une base de donnée pour le projet, au lancement du serveur les tables seront cree automatiquement si elles n'existent pas.

Le backend utilise node js.Pour installé les dependances node, allez grace à un terminal (powershell,cmder,terminal de l'editeur de code, etc...) dans le dossier backend ,puis taper la commande "npm install".

Puis créé un fichier .env dans le dossier backend avec :
```
// Connection à la base de donnée MySql
MYSQL_DATABASE = // nom de la base de donnée
MYSQL_LOGIN = // login de connection à la base de donnée
MYSQL_PASSWORD = // mot de passe de connection à la base de donnée
MYSQL_HOST = localhost //adresse du serveur Mysql

// Reglage serveur - port du backend
PORT = 4200 

//Securiter - clef de génération du token utilisateur
TOKEN = RANDOM_SECRET_TOKEN
```

### Lancement 

Lancez le backend avec la commande "npm start" (toujours dans le dossier backend)

## Frontend
### Préparation

Le frontend utilise node js.Pour installé les dependances node, allez grace à un terminal (powershell,cmder,terminal de l'editeur de code, etc...) dans le dossier frontend ,puis taper la commande "npm install".

Créé un fichier .env dans le dossier frontend avec :
```
// Adresse du serveur de l'Api
REACT_APP_API_URL= http://localhost:4200

// port du frontend
PORT= 3000
```
### Lancement 

Lancez le frontend avec la commande "npm start" (toujours dans le dossier frontend)