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

## API Configuration

The project uses Axios for API calls with the following features:

- **Environment-aware configuration**: API URL and settings are configured based on the current environment (development, staging, production)
- **Authentication handling**: Automatically sends authentication tokens with requests
- **Token refresh**: Automatically refreshes expired tokens and retries failed requests
- **Error handling**: Centralized error handling for API requests
- **Request/response logging**: Detailed logging in development mode
- **Helper functions**: Type-safe helper functions for API calls
- **Queue management**: Queues requests during token refresh to avoid multiple refresh attempts

### Microservices Architecture

The project uses a microservice architecture with the following services:

- **Auth Service**: Authentication and authorization (/auth)
- **User Service**: User management and profiles (/user)
- **Core Service**: Course management and learning content (/core)
- **Payment Service**: Payment processing and subscriptions (/payment)

Each service has its own API client configuration, allowing for:

- **Service-specific settings**: Each service can have different timeouts, headers, etc.
- **Independent token management**: Services can handle authentication differently
- **Retry and circuit breaker**: Automatic retry for failed requests with exponential backoff
- **Service discovery**: Environment-specific service URLs

### Usage Examples

#### Basic API Calls

```typescript
// Using the API helpers
import { api } from './lib/axios';

// Type-safe GET request
const data = await api.get<UserData>('/users/profile');

// POST request with body
const result = await api.post<CreateResponse>('/items', { 
  name: 'New Item', 
  description: 'Description' 
});

// With query parameters
const search = await api.get<SearchResults>('/search', { 
  params: { 
    q: 'term', 
    page: 1 
  } 
});
```

#### Microservice API Calls

```typescript
// Using specific service APIs
import { authApi, userApi, coreApi, paymentApi } from './lib/microservices';

// Auth service
const authResponse = await authApi.post('/login', { email, password });

// User service
const userProfile = await userApi.get('/profile');

// Core service
const courses = await coreApi.get('/courses', { params: { level: 'beginner' } });

// Payment service
const subscription = await paymentApi.post('/subscribe', { planId: 'premium' });

// Dynamic service selection
import { createServiceApi } from './lib/microservices';
const serviceApi = createServiceApi('core');
const data = await serviceApi.get('/endpoint');
```

### Custom Hooks

We provide custom hooks for easier API integration in components:

```typescript
// Using the general API hook
import { useApi } from './hooks/useApi';
import { userService } from './features/user/services/user.service';

const { data, loading, error, execute } = useApi(userService.getCurrentUser);

// Using the microservice-specific hook
import { useServiceApi } from './hooks/useServiceApi';

const { 
  data, 
  loading, 
  error, 
  execute: fetchCourses 
} = useServiceApi('core', '/courses', 'get');

// In useEffect
useEffect(() => {
  fetchCourses(null, { params: { page: 1, level: 'advanced' } });
}, [fetchCourses]);

// Show loading/error states
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error.message} />;

// Use the data
return <CourseList courses={data.data} />;
```

## Notes

- This project uses a feature-based folder structure to organize code by domain.
- Reusable components are placed in the `components` directory.
- Feature-specific components are placed in the `features/[feature-name]/components` directory.
- Custom hooks can be global (in `hooks/`) or feature-specific (in `features/[feature-name]/hooks/`).
- Type definitions are in the `types` directory.
