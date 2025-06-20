# EnglishMate

A web application for learning English vocabulary, grammar, and practice exercises.

## Project Structure

```
src/
├── assets/            # Images, fonts, icons, etc.
├── components/        # Reusable components (buttons, cards, modals, etc.)
├── features/          # Independent features (by domain/business logic)
│   └── auth/          # Authentication feature
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── AuthPage.tsx
├── hooks/             # Custom hooks used across the app
├── layouts/           # Main layouts (MainLayout, AdminLayout, etc.)
├── lib/               # Configuration or shared libraries (axios instance, validation schemas, etc.)
├── pages/             # Main application pages
│   └── Home.tsx
├── routes/            # Route configuration (React Router)
├── store/             # Global state (using Zustand)
├── types/             # Types/interfaces used across the app
├── utils/             # Utility functions (formatDate, parsePrice, etc.)
├── App.tsx
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

### Dependencies

The project uses the following main dependencies:

- React
- TypeScript
- Vite
- React Router
- Zustand (for state management)
- Axios (for API requests)

## Notes

- This project uses a feature-based folder structure to organize code by domain.
- Reusable components are placed in the `components` directory.
- Feature-specific components are placed in the `features/[feature-name]/components` directory.
- Custom hooks can be global (in `hooks/`) or feature-specific (in `features/[feature-name]/hooks/`).
- Type definitions are in the `types` directory.
