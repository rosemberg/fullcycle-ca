# FullCycle Clean Architecture Project Guidelines

This document provides essential information for developers working on this project.

## Project Overview

This is a TypeScript-based backend application implementing Clean Architecture principles. The project is an e-commerce system with:

- Domain entities: Customer, Product, Order
- REST API with Express.js
- Sequelize ORM with SQLite database
- Content negotiation (JSON/XML responses)

## Project Structure

The project follows Clean Architecture with clear separation of concerns:

```
src/
├── domain/             # Core business rules and entities
│   ├── @shared/        # Shared components across domains
│   ├── checkout/       # Order/checkout domain
│   ├── customer/       # Customer domain
│   └── product/        # Product domain
├── infrastructure/     # External interfaces (API, database)
│   ├── api/            # Express.js API
│   ├── customer/       # Customer infrastructure
│   ├── order/          # Order infrastructure
│   └── product/        # Product infrastructure
└── usecase/            # Application use cases
    └── customer/       # Customer use cases
```

## Build/Configuration Instructions

### Prerequisites

- Node.js (v14+)
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

```bash
# Start development server with auto-reload
npm run dev
```

The server will start at http://localhost:3000 by default.

### Building for Production

```bash
# Compile TypeScript to JavaScript
npm run tsc
```

Compiled files will be output to the `./dist` directory.

## Testing Information

### Test Structure

Tests are organized following the same structure as the source code:

- **Unit tests**: Test individual components in isolation
- **Integration tests**: Test interactions between components
- **E2E tests**: Test API endpoints

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test/file.spec.ts

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Writing Tests

#### Test Naming Conventions

- Unit tests: `*.spec.ts`
- Integration tests: `*.integration.spec.ts`
- E2E tests: `*.e2e.spec.ts`

#### Test Structure

Tests should follow the Arrange-Act-Assert pattern:

```typescript
describe("Component name", () => {
  it("should do something specific", () => {
    // Arrange
    const input = "some input";
    
    // Act
    const result = someFunction(input);
    
    // Assert
    expect(result).toBe("expected output");
  });
});
```

#### Database Tests

For tests requiring a database, use the in-memory SQLite database:

```typescript
let sequelize: Sequelize;

beforeEach(async () => {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });
  
  await sequelize.addModels([YourModel]);
  await sequelize.sync();
});

afterEach(async () => {
  await sequelize.close();
});
```

#### API Tests

For E2E API tests, use supertest:

```typescript
import request from "supertest";
import { app } from "../express";

it("should return data from API", async () => {
  const response = await request(app)
    .get("/endpoint")
    .send();
    
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("data");
});
```

### Example Test

Here's a simple test example:

```typescript
// src/domain/@shared/util/string-formatter.spec.ts
import StringFormatter from "./string-formatter";

describe("StringFormatter unit tests", () => {
  describe("capitalize", () => {
    it("should capitalize the first letter of each word", () => {
      // Arrange
      const input = "hello world";
      const expected = "Hello World";
      
      // Act
      const result = StringFormatter.capitalize(input);
      
      // Assert
      expect(result).toBe(expected);
    });
  });
});
```

## Development Guidelines

### TypeScript Configuration

- Target: ES2020
- Module system: CommonJS
- Strict type checking enabled
- Experimental decorators enabled (for Sequelize)

### Code Style

The project uses TSLint with the recommended ruleset. Key style points:

- Use PascalCase for class names
- Use camelCase for variables and functions
- Use descriptive names
- Document public APIs with JSDoc comments

### Clean Architecture Guidelines

1. **Dependency Rule**: Dependencies should only point inward. Outer layers can depend on inner layers, but inner layers cannot depend on outer layers.

2. **Domain Layer**: Contains business entities and rules. Should not depend on any external frameworks or libraries.

3. **Use Case Layer**: Contains application-specific business rules. Orchestrates the flow of data to and from entities.

4. **Infrastructure Layer**: Contains adapters to external systems (database, API, etc.).

### Error Handling

- Domain entities should validate their state and throw errors for invalid states
- Use cases should catch domain errors and translate them to application errors
- Infrastructure layer should catch application errors and translate them to HTTP responses

### Repository Pattern

The project uses the Repository pattern to abstract data access:

- Repository interfaces are defined in the domain layer
- Repository implementations are in the infrastructure layer
- Use cases depend on repository interfaces, not implementations

## Debugging

- Use `console.log` for quick debugging
- For more advanced debugging, use the Node.js debugger with VS Code
- Set breakpoints in TypeScript files and run with the "Debug: Start Debugging" command

## Deployment

The application can be deployed as a Node.js service. Key environment variables:

- `PORT`: The port to run the server on (default: 3000)
- `DB_CONNECTION`: Database connection string