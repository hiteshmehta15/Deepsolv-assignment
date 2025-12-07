# Pokedex Lite

A modern, feature-rich Pokedex web application built with Next.js 15, TypeScript, and Tailwind CSS. This project demonstrates a comprehensive implementation of a Pokemon encyclopedia with advanced features including server-side rendering, authentication, and smooth animations.

## Features

### Core Features
- **Pokemon Listing**: Browse through 150+ Pokemon with beautiful card layouts
- **Search Functionality**: Real-time search to find Pokemon by name
- **Type Filtering**: Filter Pokemon by their types (Fire, Water, Grass, etc.)
- **Pagination**: Navigate through Pokemon with smooth pagination controls
- **Favorites System**: Mark Pokemon as favorites with localStorage persistence
- **Detail View**: Comprehensive modal showing Pokemon stats, abilities, height, weight, and more
- **Responsive Design**: Fully responsive UI that works seamlessly on mobile, tablet, and desktop

### Bonus Features
- **Firebase Authentication**: OAuth integration with Google and GitHub login
- **Server-Side Rendering**: Initial Pokemon data loaded server-side for better SEO and performance
- **Smooth Animations**: Polished UI with hover effects, transitions, and modal animations
- **Loading States**: Beautiful loading spinners and error handling
- **Type-Safe**: Full TypeScript implementation for better code quality

## Technologies Used

- **Framework**: Next.js 15 (App Router with SSR)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth (Google & GitHub OAuth)
- **API**: PokéAPI (https://pokeapi.co)
- **State Management**: React Hooks
- **Image Optimization**: Next.js Image Component

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Firebase project (for authentication features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hiteshmehta15/Deepsolv-assignment.git
cd Deepsolv-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Firebase Configuration (Optional - for authentication):

The Firebase configuration is already set up in the project. If you want to use your own Firebase project, update the configuration in `lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Project Structure

```
Deepsolv-assignment/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with SSR
│   ├── globals.css         # Global styles and animations
│   └── pokemon/
│       └── [id]/
│           └── page.tsx    # Individual Pokemon SSR page
├── components/
│   ├── ErrorMessage.tsx    # Error display component
│   ├── Header.tsx          # Navigation header with auth
│   ├── LoadingSpinner.tsx  # Loading state component
│   ├── Pagination.tsx      # Pagination controls
│   ├── PokemonCard.tsx     # Individual Pokemon card
│   ├── PokemonClient.tsx   # Client-side Pokemon logic
│   ├── PokemonDetailModal.tsx  # Pokemon details modal
│   ├── PokemonGrid.tsx     # Grid layout for cards
│   ├── SearchBar.tsx       # Search input component
│   └── TypeFilter.tsx      # Type filter controls
├── context/
│   └── AuthContext.tsx     # Firebase auth context
├── lib/
│   ├── api.ts             # PokéAPI service functions
│   ├── constants.ts       # App constants and type colors
│   ├── firebase.ts        # Firebase configuration
│   └── storage.ts         # localStorage utilities
├── types/
│   └── pokemon.ts         # TypeScript interfaces
└── package.json
```

## Key Implementation Details

### Server-Side Rendering

The application uses Next.js App Router with server components to fetch initial Pokemon data server-side. This provides:
- Faster initial page loads
- Better SEO with pre-rendered content
- Improved Core Web Vitals scores

### Authentication Flow

Firebase Authentication is implemented with:
- Google OAuth provider
- GitHub OAuth provider
- Persistent auth state across sessions
- Protected routes and user-specific features

### State Management

The app uses React hooks for state management:
- `useState` for local component state
- `useEffect` for side effects and data fetching
- `useContext` for global auth state
- localStorage for favorites persistence

### API Integration

PokéAPI integration includes:
- Efficient batch fetching of Pokemon data
- Error handling and retry mechanisms
- Type-safe API responses with TypeScript
- Caching strategies for better performance

## Challenges and Solutions

### Challenge 1: Initial Load Performance
The app needed to fetch data for 150 Pokemon on initial load, which could be slow.

**Solution**: Implemented server-side rendering to fetch data during build time, combined with progressive loading on the client side. This significantly improved the initial page load experience.

### Challenge 2: Type Filtering Complexity
Filtering Pokemon by multiple types while maintaining search functionality required careful state management.

**Solution**: Created a filtering pipeline that processes search queries and type filters sequentially, updating the displayed Pokemon dynamically without refetching data.

### Challenge 3: Firebase Auth with SSR
Firebase client SDK doesn't work seamlessly with server components.

**Solution**: Separated client-side authentication logic into a dedicated context provider, while keeping the main page as a server component for optimal performance.

### Challenge 4: Responsive Grid Layout
Creating a responsive grid that works well across all screen sizes with varying Pokemon card sizes.

**Solution**: Used Tailwind CSS responsive utilities with a flexible grid system that adjusts from 1 column on mobile to 5 columns on large screens, maintaining consistent spacing and alignment.

## Performance Optimizations

- Server-side rendering for initial content
- Image optimization using Next.js Image component
- Lazy loading for Pokemon details modal
- Efficient re-rendering with React memo patterns
- Debounced search functionality
- Pagination to limit rendered components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy with a single click

Alternative deployment platforms:
- Netlify
- AWS Amplify
- Railway
- Render

## Future Enhancements

Potential features for future iterations:
- Pokemon comparison tool
- Advanced filtering (by stats, abilities, etc.)
- Battle simulator
- Team builder
- Progressive Web App (PWA) capabilities
- Internationalization (i18n)
- Dark mode theme
- Pokemon evolution chains
- Move details and effectiveness charts

## License

This project is created as an assignment submission and is available for educational purposes.

## Acknowledgments

- Pokemon data provided by [PokéAPI](https://pokeapi.co)
- Pokemon and all related properties are trademarks of Nintendo, Game Freak, and The Pokemon Company
- UI/UX inspiration from modern web design patterns
- Firebase for authentication infrastructure

## Contact

Hitesh Mehta - [GitHub](https://github.com/hiteshmehta15)

Project Link: [https://github.com/hiteshmehta15/Deepsolv-assignment](https://github.com/hiteshmehta15/Deepsolv-assignment)
