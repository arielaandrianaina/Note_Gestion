# vue_musica

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# Musica_Vutify" 
"# Note_Gestion" 


concéption de la base de données Beta

Table Étudiant:
id (clé primaire)
nom
prénom
adresse
téléphone

Table Professeur:
id (clé primaire)
nom
prénom
adresse
téléphone

Table "Matière":
id (clé primaire)
nom
professeur_id (clé étrangère du professeur)

Table Note:
id (clé primaire)
étudiant_id (clé étrangère de l'étudiant)
matière_id (clé étrangère de la matière)
valeur
