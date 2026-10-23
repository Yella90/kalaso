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
| 12e Biologie | 21 | Rédigés (FR), avec 9 simulations et 14 schémas |
| 12e Maths | 16 | Rédigés (FR) |
| 11e (4 matières) | 41 | Rédigés (FR) |
| 10e maths, physique, biologie | 30 | Rédigés (FR) |
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

## Biologie : simulations et schémas

Les 9 simulations de biologie sont dans `components/sim/bio/` : osmose, mitose et méiose,
croisements (échiquier), génétique des populations (Hardy-Weinberg, drépanocytose et paludisme),
potentiel d'action, glycémie (diabète de type 1 et 2), réponse immunitaire, du gène à la protéine
(mutations), photosynthèse (facteur limitant). Elles sont reliées aux chapitres dans
`lib/curriculum/biologie.ts` (champ `simulation`).

Les schémas sont des SVG dessinés pour Kalanso (`components/figures/`), insérés dans un cours par un
bloc `{ kind: 'figure', id }`. Les photos et figures du Livre de Biologie de D. Nango ne sont pas
reprises : elles appartiennent à l'auteur, à l'éditeur ou à leurs propres sources. Pour un nouveau
schéma, ajouter un composant dans `components/figures/`, son identifiant dans `FigureId`
(`lib/lessons/types.ts`) et dans `components/figures/Figure.tsx`.

## Simulations avancées (3D et animées)

| Simulation | Fichiers | Chapitres |
|---|---|---|
| Explorer une cellule en 3D (animale, végétale, défis) | `components/sim/bio/cellule/` | 10e cellule, 12e structure de la cellule |
| L'ADN en 3D : structure, réplication, compactage | `components/sim/bio/adn/` | 12e support de l'information génétique |
| Établir un caryotype (trisomie 21, Turner, Klinefelter) | `components/sim/bio/CaryotypeSim.tsx` | 12e génétique humaine |
| Le cœur qui bat : cycle cardiaque, pressions, ECG | `components/sim/bio/CoeurSim.tsx` | 11e circulation, 12e pression artérielle |
| Le skate-park de l'énergie | `components/sim/SkateParkSim.tsx` | 11e énergie cinétique, énergie mécanique |

Les simulations 3D (react-three-fiber) attendent que l'élève appuie sur le bouton de lancement,
pour ménager les téléphones modestes.

## Photos libres

`lib/media.ts` liste les photos et vidéos de Wikimedia Commons (domaine public, CC0, CC BY,
CC BY-SA) avec leur auteur, leur licence et leur page. Un cours les affiche avec le bloc
`{ kind: 'photo', id }` ; le crédit est toujours affiché. Le service worker garde les photos
déjà vues pour le hors-ligne. Pour en ajouter : chercher sur commons.wikimedia.org une image
sous licence libre, puis ajouter son entrée dans `lib/media.ts` (auteur et licence relevés sur
sa page).

## Aventures animées

Chaque aventure a une scène illustrée (`components/adventure/scenes/`) qui se construit au fil
des missions réussies : la pompe se monte et arrose le jardin, le champ est mesuré, semé,
labouré puis récolté, l'eau du puits s'éclaircit, le village de Mopti se protège, la moto
s'assemble puis part dans la rue. Le personnage annonce la mission en cours et des confettis
saluent chaque réussite. Animations en CSS, coupées si le téléphone demande moins d'animations.
