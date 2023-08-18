Website for BIOCON 2023

To start:

- Fill in the `.env` (the necessary variables are in `.env.sample`)
- Run `npm run db:biocon && npm run db:world` to generate Prisma code
- Run `npm run dev` for dev server
- Run `npm run build` for build standalone server
- Run `docker build -t biocon --build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY=*** --build-arg NEXT_PUBLIC_API_KEY=*** .` to build docker image
