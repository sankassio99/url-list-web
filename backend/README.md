# URL List API

This is the backend API for The Urlist, a service that allows users to create, manage, and share lists of URLs.

## Features

- Create, view, update, and delete URL lists
- Customize the list URL or get an automatically generated one
- Add, edit, and remove URLs from a list
- View all lists
- Share lists via unique URLs

## Tech Stack

- NestJS - A progressive Node.js framework
- TypeScript - For type safety
- PostgreSQL - Database
- Prisma - ORM
- Docker - For containerization

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Start the database:
   ```bash
   $ docker-compose up -d
   ```
4. Apply database migrations:
   ```bash
   $ npx prisma migrate dev --name init
   ```
5. Start the development server:
   ```bash
   $ npm run start:dev
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/urllist?schema=public"
```

## API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:3001/api
```

### Endpoints

#### URL Lists

- `POST /url-lists` - Create a new URL list
- `GET /url-lists` - Get all URL lists
- `GET /url-lists/:id` - Get a URL list by ID
- `GET /url-lists/slug/:slug` - Get a URL list by slug
- `PATCH /url-lists/:id` - Update a URL list
- `DELETE /url-lists/:id` - Delete a URL list

#### URLs

- `POST /urls` - Add a URL to a list
- `GET /urls/list/:listId` - Get all URLs for a specific list
- `PATCH /urls/:id` - Update a URL
- `DELETE /urls/:id` - Delete a URL from a list

## Development

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

### Building for production

```bash
$ npm run build
```

### Docker

You can use the provided Docker Compose file to run the database:

```bash
$ docker-compose up -d
```

## Resources

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- [Prisma Documentation](https://www.prisma.io/docs/) for database operations.
- [Swagger UI](https://swagger.io/tools/swagger-ui/) for API documentation.

## License

This project is [MIT licensed](LICENSE).
