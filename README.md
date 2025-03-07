# Country Info Project

A NestJS project for retrieving and managing country and holiday-related information.

## Preparation

Before you begin, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node package manager)
- **PostgreSQL** (or another database, if configured)

## Installation

Follow these steps to set up the application:

1. **Clone the repository**:

   ```
   git clone https://github.com/Mar88888888/Countries.git
   cd country-info
   ```  

2. **Install dependencies**:

   ```
   npm install
   ```

## Configuration

3. **Create a Postgres DB**
4. **Configure environment variables inside *.env* file as in example**:
   ```
    DATE_NAGER_API=https://date.nager.at/api/v3
    COUNTRIES_NOW_API=https://countriesnow.space/api/v0.1/countries
    DB_USER=username
    DB_PASSWORD=password
    DB_HOST=host
    DB_PORT=5432
    DB_NAME=dbname
   ```

## Migration

5. **Generate and run TypeORM migration to synchronize the schema**:
   ```
   npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/InitialMigration -d ./data-source.ts
   npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./data-source.ts
   ```

## Running the Application

6. **Start the application in development mode**:
   ```
   npm run start:dev
   ```

## Running Tests

7. **Run the tests**:
   ```
   npm test
   ```
