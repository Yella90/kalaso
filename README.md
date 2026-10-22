# Kalanso

Plateforme de sciences pour les élèves maliens, de la 7e année au Bac : Maths, Physique, Chimie, Biologie.
Chaque chapitre suit le parcours **Cours → Simuler → S'exercer → Appliquer**, et des **aventures** font
utiliser les notions dans un vrai projet. Interface en français et en bamanankan (brouillon à relire).

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000/fr. Sans configuration, les comptes utilisent une base **en mémoire**
(tout est perdu au redémarrage). Pour devenir administrateur en local, mettre son numéro dans
`ADMIN_PHONES` (voir `.env.example`) avant de créer le compte.

## Mettre en ligne avec les comptes

1. Base de données : les tables `kalanso_*` sont déjà créées dans le projet Supabase **liveshop**
   (`https://duilcacabsfokrxuvmjm.supabase.co`), partagé avec l'application liveshop. Le préfixe évite
   tout mélange. Pour une autre base, exécuter `supabase/migrations/0001_kalanso_comptes_activation.sql`.
   Les tables sont protégées par RLS sans politique, et les rôles `anon` et `authenticated` n'y ont
   aucun droit : seul le serveur, avec la clé `service_role`, y accède.
2. Chez l'hébergeur (Vercel par exemple), définir `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` et `ADMIN_PHONES`.
   La base est à Francfort (eu-central-1) : régler la région des fonctions du site au plus près (Vercel : `fra1`).
3. Créer son compte avec un numéro listé dans `ADMIN_PHONES`, puis générer des codes sur `/fr/admin/codes`.

Sans ces variables en production, les comptes sont désactivés et **tout le contenu reste ouvert**.

## Ce qui est réservé aux comptes activés

- Ouvert à tous : cours, simulations, deux premières missions de chaque aventure.
- Accès annuel : exercices corrigés, quiz, « Appliquer », suite des aventures.
- Les enseignants et administrateurs ont accès à tout sans code.

## Organisation

| Dossier | Contenu |
|---|---|
| `lib/curriculum/` | Programme de la 7e à la 12e, par matière (statut officiel ou anticipé) |
| `lib/lessons/content/` | Leçons rédigées (cours, exercices, quiz, vie réelle) |
| `lib/adventures/content/` | Aventures et leurs missions |
| `lib/i18n/` | Textes de l'interface : `fr.ts` (référence) et `bm.ts` (bamanankan) |
| `lib/server/` | Comptes, sessions, codes d'activation (serveur uniquement) |
| `docs/bambara-relecture.md` | Vocabulaire bambara à faire valider |

Ajouter une leçon : un fichier dans `lib/lessons/content/` et une ligne dans `lib/lessons/index.ts`.
Ajouter une aventure : un fichier dans `lib/adventures/content/` et une ligne dans `lib/adventures/index.ts`.
