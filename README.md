<div>
  <img src ='./client/public/Udaan logo.png' alt="Logo" width="200" height="200">
</div>
<p>
Udaan is a tool built for schools to help create, organise, and conduct online lessons for their students while keeping them engaged. It makes distance learning more immersive by providing them with a custom built virtual school. Students attend classes as custom characters and access their lesson notes and other data from the library. Teachers are provided with highly intuitive educational tools to seamlessly collaborate with their students.
</p>

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

<strong style="margin-bottom: 10px;">Primary</strong>
<br/>
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
<br/>
<strong>Other</strong>
<br/>
[Phaser](https://phaser.io/) [Colyseus](https://www.colyseus.io/)

## Features

Secure login for students and teachers.
<br/>
<br/>
<img src ="./Feature-pics/Homepage.png" alt="Logo" width="400">
<img src ="./Feature-pics/Auhtentication.png" alt="Logo" width="400">

Interactive virtual school in 2D graphics
<br/>
<br/>
<img src ="./Feature-pics/classroom.png" alt="Logo" width="400">
<img src ="./Feature-pics/Avatar-choosing.png" alt="Logo" width="400">

Ability to Create lessons and conduct them using interactive white boards
<br/>
<br/>
<img src ="./Feature-pics/Create-lessons.png" alt="Logo" width="400">
<img src ="./Feature-pics/Whiteboard-interaction.png" alt="Logo" width="400">

Ability to take down notes and review them later
<br/>
<br/>
<img src ="./Feature-pics/Notes-taking.png" alt="Logo" width="400">
<img src ="./Feature-pics/Notes-display.png" alt="Logo" width="400">

## Getting Started

### Prerequisites

Basic knowledge of the following technologies:
- Node.js
- Node Package Manager
- PostgreSQL

### Installation

#### Steps
1. Clone the git repository to local machine

2. Install dependencies<br/>
From `/` run `npm i` then `npm run install-all-deps` to install all dependecies

3. Setup env variables<br/>
Create `.env` files in `/server` and `/client` (see examples `.env-example`)

4. Database<br/>
You will need a database running on your local machine. Add access details to `/server/.env`<br/>
Database UI: From `/` run `npm run db-ui`

5. Start<br/>
Start client and server: From `/` run dev environment: `npm run start`

## Contributing

Udaan is an open-source application; contributions welcome.

## Development

### Git

#### Commit

`npm run commit`<br/>
Linter will run and then [Commitizen](https://commitizen-tools.github.io/commitizen/)

#### Backend

##### Mock data

Seed the database with mock data
In `/server` run `npx ts-node dataGenerate.ts`

#### Linter

Run linter on `/server` and `/client`

```
npm run lint
```

Run linter on `/server`

```
npm run lint:server
```

Run linter on `/client`

```
npm run lint:client
```

##### Auto-fix

Auto-fix linting issues `/server` and `/client`

```
npm run lint:fix
```

Auto-fix linting issues on `/server`

```
npm run lint:fix:server
```

Auto-fix linting issues on `/client`

```
npm run lint:fix:client
```
