# classzoom

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
