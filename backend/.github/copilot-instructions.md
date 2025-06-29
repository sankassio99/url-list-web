The Urlist

An application for sharing a list of links with a URL.
list is a web application that allows users to create, manage, and share lists of URLs. It provides a user-friendly interface for adding, editing, and deleting links, as well as organizing them into categories or tags. Users can also share their lists with others via unique URLs.

## Overview
Rest API for managing URL lists

Technologies used:

- Nest
- TypeScript
- PostgreSQL
- Prisma
- Docker
- Docker Compose
- Redis

## Best Practices

### Clean Architecture

- **Separation of Concerns:** Structure your NestJS app into layers (Controllers, Services, Repositories, Entities/Models, DTOs) to separate business logic from infrastructure and presentation.
- **Dependency Inversion:** Use interfaces and dependency injection to decouple high-level modules from low-level implementations.
- **Domain-Driven Design:** Place core business logic in the domain layer, keeping it independent from frameworks and external libraries.

### Clean Code

- **Consistent Naming:** Use descriptive and consistent names for variables, functions, classes, and files.
- **Single Responsibility Principle:** Each class and function should have one responsibility.
- **Small Functions:** Keep functions short and focused on a single task.
- **Error Handling:** Handle errors gracefully and consistently using NestJS exception filters.
- **Documentation:** Use comments and JSDoc for complex logic, and keep API documentation up to date.
- **Linting and Formatting:** Enforce code style with tools like ESLint and Prettier.

## Folder Structure

Structure your NestJS application to follow a clean architecture approach. Here’s a suggested folder structure:

```
src/
├── app.module.ts
├── main.ts
├── controllers/
│   └── link.controller.ts
├── dtos/
│   ├── create-link.dto.ts
│   └── update-link.dto.ts
├── entities/
│   ├── link.entity.ts
│   └── interfaces/
│       └── link.repository.interface.ts
├── repositories/
│   └── link.repository.ts
└── use-cases/
  ├── get-links.use-case.ts
  └── create-link.use-case.ts
```

## Controllers
Controllers in NestJS handle incoming requests and return responses. They should be thin, delegating business logic to services or use cases.

## dtos
DTOs (Data Transfer Objects) are used to define the structure of data sent over the network. They help in validating and transforming incoming data before it reaches the business logic layer.
Used to receive data from the client and validate it before processing. DTOs ensure that the data conforms to expected formats and types, enhancing type safety and reducing runtime errors.

## Entities
Entities represent the core business objects in your application. They encapsulate the properties and behaviors of these objects, serving as the foundation for your domain logic.

## Repositories
Repositories are responsible for data access and persistence. They abstract the underlying database operations, allowing you to focus on the business logic without worrying about the details of data storage and retrieval.

## Use Cases
Use cases encapsulate the business logic of your application. They define the operations that can be performed

## DTO Validation in Next.js API Routes

DTO validation in Next.js, particularly within its API routes, can be effectively implemented using libraries like class-validator and class-transformer. This approach ensures data integrity and consistency for incoming requests.
Here's how DTO validation with class-validator and class-transformer works in a Next.js API route: Define a DTO Class.
Create a TypeScript class that represents the expected structure of your incoming data. Use class-validator decorators (e.g., @IsString(), @IsNumber(), @IsEmail(), @ValidateNested()) to define validation rules for each property.
```typescript
    import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

    export class CreateUserDto {
      @IsString()
      @IsNotEmpty()
      name: string;

      @IsEmail()
      email: string;
    }
```

Use DTO in API Route.
In your Next.js API route handler, receive the incoming request body. Use class-transformer to transform the plain JavaScript object from the request body into an instance of your DTO class. This allows class-validator to perform its validation checks.

```typescript
    import type { NextApiRequest, NextApiResponse } from 'next';
    import { validate } from 'class-validator';
    import { plainToInstance } from 'class-transformer';
    import { CreateUserDto } from '../../DTOs/CreateUserDto';

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method === 'POST') {
        const createUserDto = plainToInstance(CreateUserDto, req.body);
        const errors = await validate(createUserDto);

        if (errors.length > 0) {
          return res.status(400).json({ errors: errors.map(error => error.constraints) });
        }

        // If validation passes, process the data
        return res.status(200).json({ message: 'User created successfully', data: createUserDto });
      }

      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
```

This setup ensures that any data submitted to your Next.js API routes adheres to the defined DTO structure and validation rules, enhancing data integrity and application robustness.


