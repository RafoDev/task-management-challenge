# Task Management Challenge

## Getting Started

Follow the steps below to set up and run the project:

### Set Environment Variables

Before proceeding, ensure you have the following environment variables initialized. Create a .env file in the root directory (also you have a `.env.example` as a example) and add:

```
# .env
VITE_GQL_API="https://your-api/graphql"
VITE_GQL_API_TOKEN="your-token"
```

### Install Dependencies

To install the required Yarn packages, run:

```bash
yarn
```

### Generate TypeScript Types

Generate the TypeScript types for the GraphQL queries by executing:

```bash
yarn generate
```
