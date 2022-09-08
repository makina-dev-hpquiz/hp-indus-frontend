# HP-INDUS-FRONTEND

***

Cette plateforme a pour objectif de servir le projet principal HP-QUIZ en proposant plusieurs outils à la fois de débug mais également de suivi de projet. 
L'application est utilisable sur navigateur (chrome) ainsi que sur navigateur mobile.

Les fonctionnalités principales sont : 
* Module de gestion des APKs permettant de télécharger les différentes APK liés à l'ensemble du projet
* Module de gestion d'incidents permettant d'ouvrir et de gérer des tickets de bug.
* Module d'accès rapide permettant en un seul lieux d'avoir un ensemble de liens url.

L'application WEB fonctionne avec un serveur Java hp-indus-backend.

*** 

## Installation

Installation directement depuis les sites 
* Notepad++ https://notepad-plus-plus.org/downloads/
* Visual Studio code https://code.visualstudio.com/
* Git https://git-scm.com/
* NodeJS https://nodejs.org/en/

Installation ionic

```
npm install -g @ionic/cli
```

Git 

```
git clone git@github.com:VHauchecorn/hp-indus-frontend.git
```

Installation
```
npm i 
```

## Configuration d'accès à hp-indus-backend
Actuellement, rien n'est pas prévu pour gérer dynamiquement ou de manière externe à hp-indus-frontend l'url d'accès à hp-indus-backend.
Pour la mettre à jour, il est nécessaire d'ouvrir le fichier src/constants/serverUrlConst.ts
Puis de mettre à jour la ligne 2:

```
public static readonly urlServer = 'http://192.168.1.10:8082/';
```

## Commandes

### Commandes de développements 

```
npm run lint -- --fix
```

```
npm run test
```

### Commandes de lancements de l'application en mode Developpement

Démarrage via la console :
```
ionic start
```

2 fichiers sh de commandes sont disponibles permettant de lancer et éteindre l'application web
```
./run.sh
```

```
./stop.sh
```

L'application est accessible à l'adresse :
```
http://localhost:8100
```
```
http://[ip-addr]:8100
```

### Commandes de build

Les phases de packaging et de déploiement sont gérées par le fichier build.sh
Fonctionnement : 
L'application est packagé dans le répertoire www/
Puis le script va supprimer l'ancienne version présente dans le tomcat puis déplacé l'ensemble des fichiers présents dans le répertoire www/ dans le répertoire tomcat hp-indus.

Pour build la webapp sans la déployer, utiliser la commande :
```
ionic build --prod
```

En mode développement le base href correspond à /
En mode production le base href correspond à /hp-indus/ 
Ce dernier est paramètre dans le fichier angular.json
