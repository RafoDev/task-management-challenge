# Task Management Application

A modern and flexible task management application that offers both Table and Kanban views, with interactive drag-and-drop functionality for efficient task status management.

## 🚀 Features

- Dual view options:
  - Table view for structured data visualization
  - Kanban board with drag-and-drop functionality
- Comprehensive task management:
  - Create new tasks
  - Update existing tasks
  - Search functionality
  - Remove tasks
- Real-time status updates through drag-and-drop
- Type-safe development with GraphQL and TypeScript
- Responsive and modern UI design

## 🛠️ Tech Stack

### Core Technologies

- **React 18**: Modern UI development with the latest features
- **TypeScript**: Type-safe development
- **GraphQL with Apollo Client**: Efficient data fetching and state management

### Development Tools

- **GraphQL Codegen**: Automated type generation and custom hooks based on GraphQL schema
- **SVGR**: Seamless SVG integration as React components
- **@dnd-kit**: Powerful drag-and-drop functionality
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation
- **SCSS Modules**: Modular and scoped styling
- **React Router DOM**: Client-side routing and navigation
- **React Date Picker**: Customizable date selection component
- **Sonner**: Modern, lightweight toast notifications

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- Yarn package manager
- GraphQL API endpoint

### Environment Setup

1. Clone the repository
2. Create a `.env` file in the root directory using `.env.example` as a template:

```env
# .env
VITE_GQL_API="https://your-api/graphql"
VITE_GQL_API_TOKEN="your-token"
```

### Installation

1. Install dependencies:

```bash
yarn
```

2. Generate TypeScript types for GraphQL queries:

```bash
yarn generate
```

3. Start the development server:

```bash
yarn dev
```

The application should now be running at `http://localhost:5173`

## 🤔 Technical Decisions

### GraphQL with Apollo Client

- Efficient data fetching with precise queries
- Robust caching mechanism
- Real-time updates with optimistic UI

### Type Safety

- GraphQL Codegen for automated type generation
- Zod for runtime validation
- TypeScript for development-time type safety

### Styling Approach

- SCSS Modules chosen for:
  - CSS scoping to prevent style leaks
  - Reusable variables and mixins
  - Better organization with modular approach
