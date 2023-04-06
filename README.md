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

1. Clone the git repository

   git clone

2. Install dependencies:

3. setup env variables:

4. Start the server:

## Contributing

Udaan is an open-source application; contributions welcome.

## License

## Development

### Getting started

- From `/` run `npm run install-all-deps` to install all dependecies
- Create `.env` files in `/server` and `/client` (see examples `.env-example`)
- Start: From `/` run dev environment: `npm run dev`
- Database UI: From `/` run `npm run db-ui`

### Git

- Commit with [Commitizen](https://commitizen-tools.github.io/commitizen/)

## Development

### Git

#### Commit

Run linter followed by `git cz`

```
npm run commit
```

#### BackEnd

In `/server`:

```
npx ts-node dataGenerate.ts
```

Runs the file and create a mock data on database

```
npm start
```

Runs `tsc -w` and `nodemon` at the same time.

#### linter

Run lint checker on `/server` and `/client`

```
npm run lint
```

Run lint checker on `/server`

```
npm run lint:server
```

Run lint checker on `/client`

```
npm run lint:client
```

##### Fix

Fix linting issues `/server` and `/client`

```
npm run lint:fix
```

Fix linting issues on `/server`

```
npm run lint:fix:server
```

Fix linting issues on `/client`

```
npm run lint:fix:client
```
