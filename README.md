# Restaurant System

Project splited in 3 main files --> frontend | backend | shared

Before you start, please, create a root file and the required files into the root file

So, the project structure should be like this:
```bash
root-|
     |
     backend
     |
     |
     frontend
     |
     |
     shared
     |
     |
     your dotenv
     your gitignore
     docker-compose.yml
     pnpm-lock.yaml
     pnpm-workspace.yaml
     README.md (if you want)

```

## Backend

```bash
cd backend
pnpm install
pnpm db:push 
pnpm db:studio 
```

## Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

## Shared
```bash
cd shared
pnpm i or pnpm install
```

If you wanna run all files at the same time, use 
```bash
pnpm -r dev
```
in the root file
