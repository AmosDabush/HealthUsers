
# Health User Management System

## Overview

The Health User Management System is a sophisticated full-stack application dedicated to simplifying health and user management. It integrates a powerful NestJS backend with a dynamic React frontend, leveraging Vite for an enhanced development experience. This solution aims to streamline user registration, authentication, and management processes, backed by modern security standards.

## Key Technologies

- **NestJS**: For scalable server-side application development.
- **React**: For building a responsive and component-driven UI.
- **Vite**: For rapid development and efficient production builds.
- **JWT Authentication**: For secure user access and session management.
- **Docker**: For consistent deployments via containerization.
- **MongoDB**: Assumed for its flexibility as a NoSQL database solution.

## Features

### Backend (API)

- Secure user registration and login.
- JWT token management for authentication and access control.
- Comprehensive API endpoints for user management.

### Frontend (Client)

- **Protected Routes & Authentication Flow**:
  - Redirects for unauthenticated users to encourage registration.
  - Session expiration handling to maintain security.
  - Access control based on user authentication status.
- **Design & User Experience**:
  - Developed with React and Material-UI for a contemporary, intuitive user interface.
  - Supports dark mode, enhancing visual comfort and accessibility.
- **Material-UI Theming**:
  - Implements a custom theme for light and dark modes, easily toggled through the UI.
- **Dynamic User Listing**:
  - A sortable and interactive table for user management, with backend-supported sorting features.

### User Generator

- Generates mock user data for database seeding.
- Simplifies development and testing with `import-script.sh` for database population.

## Getting Started

### Quick Setup

```bash
# Install dependencies and start the application
yarn setup OR npm run setup

# Start the app with docker compose
yarn start OR npm run start

# Seed the database with mock users
# note!!! this will work only in linux bash envirament
yarn seed:new OR npm run seed:new

# use port 80 for the client 
http://localhost:80/
```


OR, for manual setup:

```bash
# Backend setup
cd api
npm install

# Client setup
cd client
npm install

# userGenerator setup
cd userGenerator
npm install

# Start the app with docker compose
npm run start

# Seed the database
# note!!! this will work only in linux bash envirament
npm run seed:new

# use port 80 for the client 
http://localhost:80/
```

## Project Insights

- **Client Architecture**:
  - **Hook Separation**: Custom hooks for authentication, form handling, and data fetching to encapsulate logic and promote reuse.
  - **Dumb Components**: UI components focus on presentation, driven by props for versatility and testing ease.
- **Dark Mode Switch**: A toggleable component allows users to switch between light and dark themes dynamically, stored in local preferences for persistent user experience.
- **Material-UI Customization**: Demonstrates best practices in applying a unified look and feel across the application while allowing for theme flexibility.

## Project Structure

- `api/`: Contains the NestJS backend.
- `client/`: Houses the React frontend.
- `userGenerator/`: Scripts for mock data generation.

## Contributing

We welcome contributions! Please see our contribution guidelines for more information.

## License

This project is licensed under the MIT License. View [LICENSE](LICENSE.md) for details.

```├── api
│   ├── Dockerfile
│   ├── nest-cli.json
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── auth
│   │   │   ├── auth.controller.spec.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.spec.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── dto
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── login.dto.ts
│   │   │   ├── guards
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   └── strategies
│   │   │       └── jwt.strategy.ts
│   │   ├── main.ts
│   │   ├── scripts
│   │   │   ├── generated_users.json
│   │   │   └── import-script.sh
│   │   └── users
│   │       ├── interfaces
│   │       │   └── user.interface.ts
│   │       ├── schemas
│   │       │   └── user.schema.ts
│   │       ├── users.controller.spec.ts
│   │       ├── users.controller.ts
│   │       ├── users.module.ts
│   │       ├── users.service.spec.ts
│   │       └── users.service.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── client
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   ├── 404.webp
│   │   │   ├── lightModeBackground.webp
│   │   │   └── react.svg
│   │   ├── context
│   │   │   └── AuthContext.tsx
│   │   ├── helpers
│   │   │   ├── httpHelper.ts
│   │   │   └── validationHelper.ts
│   │   ├── hooks
│   │   │   ├── useAuthProtected.ts
│   │   │   ├── useAxios.ts
│   │   │   ├── useLoginForm.ts
│   │   │   ├── useRegisterForm.ts
│   │   │   └── useUsersData.ts
│   │   ├── index.css
│   │   ├── interfaces
│   │   │   └── user_interface.ts
│   │   ├── main.tsx
│   │   ├── pages
│   │   │   ├── HomePage
│   │   │   │   └── HomePage.tsx
│   │   │   ├── LoginPage
│   │   │   │   ├── LoginPage.css
│   │   │   │   └── LoginPage.tsx
│   │   │   ├── NotFoundPage
│   │   │   │   ├── NotFoundPage.css
│   │   │   │   └── NotFoundPage.tsx
│   │   │   ├── RegisterPage
│   │   │   │   ├── RegisterPage.css
│   │   │   │   └── RegisterPage.tsx
│   │   │   └── UsersPage
│   │   │       └── UsersPage.tsx
│   │   ├── partials
│   │   │   ├── DarkModeSwitch
│   │   │   │   ├── DarkModeSwitch.css
│   │   │   │   └── DarkModeSwitch.tsx
│   │   │   ├── Header
│   │   │   │   ├── Header.css
│   │   │   │   └── Header.tsx
│   │   │   ├── LoginForm
│   │   │   │   └── LoginForm.tsx
│   │   │   ├── RegisterForm
│   │   │   │   └── RegisterForm.tsx
│   │   │   └── UsersTable
│   │   │       ├── UsersTable.css
│   │   │       └── UsersTable.tsx
│   │   ├── routes
│   │   │   └── ProtectedRoute.tsx
│   │   ├── themes
│   │   │   └── themes.ts
│   │   └── vite-env.d.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── docker-compose.yml
├── package.json
├── setup.js
└── userGenerator
    ├── generator.js
    ├── package.json
    ├── package-lock.json
    └── yarn.lock```


