![WhatsApp Image 2025-08-27 at 8 26 21 AM](https://github.com/user-attachments/assets/4ba0b62d-351f-4b92-97c5-ddd9e7ad79f6)


# ShopHub - E-commerce Website

A modern, lightweight e-commerce frontend built with React, TypeScript, and Tailwind CSS. Features a complete shopping experience with product browsing, cart management, and checkout flow.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd shophub

# Install dependencies
npm install

# Start development server
npm run dev


# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Layout components
│   ├── Products/       # Product-related components
│   ├── Cart/          # Shopping cart components
│   └── ui/            # Generic UI components (LoadingSpinner, ErrorMessage)
├── pages/             # Route-level page components
│   ├── ProductListing.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   └── Checkout.tsx
├── hooks/             # Custom React hooks
│   ├── useProducts.ts
│   └── useProduct.ts
├── stores/            # Global state management (Zustand)
│   └── useStore.ts
├── api/               # API layer and external service calls
│   └── productsApi.ts
├── router/            # Routing configuration
│   └── AppRouter.tsx
├── types/             # TypeScript type definitions
│   └── index.ts
└── utils/             # Utility functions (future use)
```

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Zustand with persistence
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: FakeStore API (https://fakestoreapi.com)

## ✨ Features

### Core Functionality
- **Product Listing** (`/`)
  - Responsive grid layout with product cards
  - Search functionality (filter by title)
  - Category filtering dropdown
  - Loading states and error handling

- **Product Details** (`/product/:id`)
  - Full product information display
  - Image gallery, description, ratings
  - Quantity selector (1-5 items)
  - Add to cart functionality

- **Shopping Cart** (`/cart`)
  - Cart item management (add, remove, update quantities)
  - Quantity controls (1-10 per item)
  - Real-time total calculations
  - Persistent cart state

- **Checkout Flow** (`/checkout`)
  - Order summary with item details
  - Form validation (name, email, address)
  - Order confirmation
  - Cart clearing after successful order

### Data Management
- **Caching Strategy**:
  - Product lists cached in memory during session
  - Individual product details cached in Zustand store
  - Cart data persisted to localStorage
  - Prevents redundant API calls

- **State Management**:
  - Global state with Zustand
  - Persistent storage for cart and cached products
  - Optimistic UI updates
  - Error state management

## 🎨 Design Decisions

### Architecture Choices

## 🛠️ Architecture & Design Choices

- **Component Organization**: Feature-based folders with clear separation of UI, logic, and data. Built a small reusable component library for consistency.  
- **State Management**: Used Zustand for simplicity, with persistence for cart data and a clean centralized store.  
- **Data Fetching**: Custom hooks handle fetching with cache-first strategy, plus error + loading states.  
- **Styling**: Tailwind CSS for speed, responsive-first design, and a consistent design system.  


### UX/UI Decisions

- **Progressive Enhancement**: Core functionality works without JavaScript
- **Responsive Design**: Mobile-first approach with breakpoints
- **Loading States**: Skeleton screens and spinners for better perceived performance
- **Error Handling**: User-friendly error messages with retry options
- **Micro-interactions**: Hover states, transitions, and feedback animations

## ⚖️ Trade-offs & Considerations

- **Performance**: Added routing + validation for smoother UX, with a simple caching strategy to balance speed and persistence.  
- **Development**: Chose TypeScript for safety and Zustand for simplicity. Testing focused on core flows to ship MVP faster.  
- **Technical Debt**: Error handling is coarse, accessibility is minimal, and client-side routing limits SEO.  


## 🚀 Bonus Enhancements

### Implemented
- **Persistent Shopping Cart**: Cart survives browser refresh/close
- **Product Caching**: Intelligent caching reduces API calls
- **Form Validation**: Comprehensive validation with user feedback
- **Responsive Design**: Works seamlessly across all device sizes
- **Loading States**: Professional loading indicators throughout
- **Error Handling**: Graceful error recovery with retry options
- **Quantity Limits**: Smart quantity controls with validation
- **Real-time Updates**: Instant cart total calculations


```

## 📝 API Integration

### FakeStore API Endpoints Used
- `GET /products` - Product listing
- `GET /products/:id` - Product details
- `GET /products/categories` - Category list
- `GET /products/category/:category` - Products by category

### Error Handling
- Network failures gracefully handled
- Loading states for all async operations
- User-friendly error messages
- Retry mechanisms where appropriate

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
