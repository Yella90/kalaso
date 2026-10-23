# Plan de rédaction du contenu

Objectif : chaque chapitre du programme (245) a un cours, une simulation quand c'est utile, des exercices,
un quiz et une application à la vie réelle. Ce fichier suit l'avancement entre les sessions.

## Sources

| Source | Ce qu'on en tire | Comment |
|---|---|---|
| `physique-3d` (site cecp, projet de l'utilisateur) | Cours, exercices, situations réelles et simulations de 12e Physique-Chimie | **Import direct** par `scripts/import-cecp.ts` |
| Prébac Sciences Physiques TSE/TSExp (D. L. Diarra) | Programme, ordre et contenu attendu de la 12e PC | Référence : cours et exercices rédigés à nouveau |
| Top Chrono PC Terminale D (Côte d'Ivoire) | Chapitres absents du programme malien | Ajoutés en compléments de 12e : cinématique du point, montages intégrateur et dérivateur, solutions tampons |
| Manuel Combiné TSE (Mali, APC) | Maths 12e : chapitres, situations-problèmes | Référence |
| Découpages officiels (Barinta) | Maths 10e, 11e, 12e | Référence |
| Livre de Biologie TSExp (D. Nango) | Biologie 12e | Référence |
| Lycée Kodonso (exercices) | Types d'exercices de 12e | Référence |

Les manuels publiés (Prébac, Top Chrono, Manuel Combiné, Livre de Biologie) appartiennent à leurs auteurs
et éditeurs, et Kalanso sera vendu : on suit leur programme et leur niveau, mais les textes et les
exercices sont rédigés pour Kalanso, sans copie. Le contenu de `physique-3d` appartient à l'utilisateur
et peut être repris tel quel.

## Avancement

| Lot | Chapitres | État |
|---|---|---|
| Chimie 9e-10e (atome → mole) | 6 | Rédigés, FR + BM |
| 12e Physique-Chimie depuis cecp | 30 | Importés (FR) : cours, 95 exercices à réponse vérifiée, 59 situations réelles |
| 12e Physique : mouvement du centre d'inertie, projectile, satellite, particule dans un champ électrique | 4 | Cours à réécrire : dans cecp, ils sont marqués « D'après D. Diarra, Prébac » |
| 12e Chimie restante (glucose, polymères, cinétique, équilibres, acides-bases) | 9 | Rédigés (FR) |
| Compléments Top Chrono : cinématique du point, montages dérivateur et intégrateur | 2 | Rédigés (FR) ; exercices du TD 01 de cecp pour la cinématique |
| Complément Top Chrono : solutions tampons | — | Rédigé dans « Les réactions acido-basiques » |
| 12e Biologie | 21 | À rédiger |
| 12e Maths | 16 | À rédiger |
| 11e (4 matières) | 41 | À rédiger |
| 10e (reste) | 30 | À rédiger |
| 7e-9e (4 matières) | ~80 | À rédiger, d'après les titres de chapitres |

## Réimporter le contenu de cecp

Depuis le dossier `physique-3d` :

```bash
npx --yes tsx@4.19.2 ../kalanso/scripts/import-cecp.ts
```

Puis, depuis `kalanso`, vérifier les formules :

```bash
npx --yes tsx@4.19.2 scripts/check-tex.ts
```

L'import corrige les accents manquants des premiers chapitres (`scripts/cecp-orthographe.ts`).
Une modification faite à la main dans `lib/lessons/content-cecp/` est perdue à la réimportation :
corriger plutôt la source dans cecp, ou retirer le chapitre de la liste de l'import.

## Simulations de cecp

Le dossier `cecp/` contient les 30 simulations de 12e du site cecp, copiées avec leurs moteurs
de calcul (`cecp/lib/physics`, `cecp/lib/chemistry`). `cecp/labs.ts` dit quel chapitre a une
simulation ; `cecp/CecpLab.tsx` les monte dans l'étape « Simuler ». Les simulations en 3D
(three.js) ne se téléchargent que si l'élève appuie sur « Lancer la simulation 3D ».
Leurs textes restent en français.
