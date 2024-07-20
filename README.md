Website for BIOCON 2023

To start:

- Fill in the `.env` (the necessary variables are in `.env.sample`)
- Run `npm run db:generate` to generate migration files
- Run `npm run db:migrate` to start migration or you can just start the server and it will migrate automatically
- Run `npm run build` for build standalone server
- Run `docker build -t biocon --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY=*** --build-arg NEXT_PUBLIC_API_KEY=*** .` to build docker image
