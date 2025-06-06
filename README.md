# DALLEEL – Plateforme d’Orientation Scolaire

> **Projet académique / compétition** – Architecture micro‑services · Node.js · React · MongoDB

DALLEEL est une plateforme web d’orientation scolaire qui aide les élèves marocains à découvrir les domaines d’étude qui leur correspondent, à trouver les écoles adaptées à leurs notes et à gérer facilement leur inscription. Le système propose un espace administrateur pour les écoles, un chatbot alimenté par RAG + ChatGPT, ainsi qu’un mois d’essai gratuit pour les directeurs.

---

## ✨ Fonctionnalités principales

* 🎓 **Gestion complète des écoles, domaines et étudiants**
* ⚖️ **Test SWOT interactif** pour identifier les préférences et points forts des élèves
* 🔍 **Filtrage intelligent** des écoles selon la note, le domaine et la localisation
* 📑 **Importation de données** en masse via fichiers Excel (élèves, écoles, domaines…)
* 💬 **Chat en temps réel** entre étudiants (socket.io)
* 🤖 **Chatbot intégré** (RAG + ChatGPT) pour répondre aux questions fréquentes
* 💸 **Paiements en ligne** sécurisés pour inscriptions et événements
* 📅 **Événements d’orientation** avec billetterie et suivi des participants
* 🔔 **Notifications** par e‑mail et in‑app (Nodemailer + Web Push)

---

## 🛠️ Stack technique

| Couche          | Technologies / Librairies              |
| --------------- | -------------------------------------- |
| Backend         | Node.js · Express · MongoDB (Mongoose) |
| Auth & Sécurité | JWT · bcrypt                           |
| Emails          | Nodemailer                             |
| Frontend        | React · Redux Toolkit · Tailwind CSS   |
| Chatbot         | OpenAI API (ChatGPT) + RAG             |
| Temps réel      | Socket.io                              |
| Déploiement     | Docker · Render / Vercel               |
| Tests           | Jest · Supertest                       |

---

## 🚀 Mise en route

### Prérequis

* **Node.js** ≥ 18
* **npm** ≥ 9
* **MongoDB** (Atlas ou instance locale)
* Compte **SMTP** (Gmail, SendGrid…) pour l’envoi d’e‑mails

### Variables d’environnement (`.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dalleel
JWT_SECRET=UneCléTrèsSecrète
EMAIL_USER=votre.email@example.com
EMAIL_PASS=motdepasse
CLIENT_URL=http://localhost:3000
```

### Installation

```bash
# 1. Cloner le dépôt
$ git clone https://github.com/<votre‑orga>/dalleel.git
$ cd dalleel

# 2. Installer les dépendances
$ npm install

# 3. Lancer le serveur en mode développement
$ npm run dev
```

Le front‑end (React) se trouve dans le dossier `client/` ; exécutez :

```bash
cd client
npm install
npm start
```

---

## 📁 Structure du projet (backend)

```
.
├── Models/
│   ├── User.js
│   ├── Ecole.js
│   ├── Domaine.js
│   ├── Question.js
│   ├── Event.js
│   └── ...
├── Routes/
│   ├── auth.routes.js
│   ├── ecole.routes.js
│   └── ...
├── Controllers/
├── middlewares/
├── utils/
└── server.js
```

---

## 📜 Scripts npm utiles

| Script          | Fonction                                      |
| --------------- | --------------------------------------------- |
| `node server.js`   | Démarre l’API en mode développement (nodemon) |
| `npm run build` | Démarre l’API en production                   |
| `npm run test`  | Lance les tests unitaires (Jest + Supertest)  |

---

## 🤝 Contribuer

1. **Fork** du repo
2. Créez votre branche : `git checkout -b feature/ma‑feature`
3. **Commit** : `git commit -m 'feat: ajoute ma fonctionnalité'`
4. **Push** : `git push origin feature/ma‑feature`
5. Ouvrez une **Pull Request**
---


## 👥 Auteurs

* **Oumaima El Badraouy** [omaima@example.com](mailto:omaima@example.com)
*  **Abdlhadi Nachit** 
