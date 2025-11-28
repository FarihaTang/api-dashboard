# API Dashboard — Technical Case Study

## Overview
API Dashboard is a feature-rich React + TypeScript application designed to demonstrate modern front‑end engineering capabilities.  
It showcases production‑grade patterns used in UK & EU tech teams, including feature‑based architecture, React Query, URL‑driven state, modular API slices, and reusable UI components.

This project serves as a high‑quality portfolio piece for professional front‑end positions.

---

## 🎯 Goals
- Demonstrate mastery of **React + TypeScript**
- Build a **scalable, maintainable** front‑end architecture
- Implement **real-world data flows**, CRUD operations, and filters
- Showcase **React Query**, optimistic updates, and caching
- Highlight engineering abilities such as:
  - Clean code
  - Modularization
  - Reusable components
  - URL state
  - Loading/error/empty states
  - Skeleton UI
  - Global error handling

---

## 🏗️ Architecture

### **Feature-Based Structure**
```
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── queryClient.ts
│   ├── GlobalErrorBoundary.tsx
│
├── shared/
│   ├── components/      # Reusable UI primitives
│   ├── hooks/           # Reusable logic
│   ├── http/            # Fetch wrapper + API error normalization
│   └── utils/
│
├── features/
│   └── users/
│       ├── api/         # API slice: getUsers, createUser, updateUser, deleteUser
│       ├── components/  # UserTable, SearchInput, StatusFilter, Modals
│       ├── hooks/       # useUsersQuery, useUsersPage, useUserMutations
│       ├── pages/       # UsersPage
│       └── types/
```

### **Key Architecture Patterns**
- Separation of Concerns (UI ↔ Logic ↔ API)
- Modular API slice per feature
- Query keys grouped via `userKeys`
- Hooks layer manages:
  - URL params
  - Mutations
  - Filters
  - Business logic

---

## 🔌 API Layer

### **API Slice**
Each API endpoint is isolated:

```
getUsers.ts
createUser.ts
updateUser.ts
deleteUser.ts
```

### **Unified HTTP Client**
Handles:
- Automatic JSON parsing
- API error normalization
- Global error format

---

## 🧠 State Management

### **React Query**
- Data fetching
- Caching
- Automatic background refetch
- Request deduplication
- Pagination with `keepPreviousData`
- Global error + success toast handling
- Mutations with optimistic UI updates

### **URL State (useSearchParams)**
Filters and pagination are fully URL-driven:
- Shareable URLs
- Browser navigation compatibility
- No global state pollution

---

## 🧩 Custom Hooks

### `useUsersQuery`
Encapsulates list fetching.

### `useUserMutations`
Encapsulates:
- Create
- Update
- Delete  
with optimistic updates + toast notifications.

### `useUsersFilters`
Encapsulates URL search parameters.

### `useUsersPage`
Combines all logic into a single hook, keeping the page extremely clean.

---

## 💡 UI/UX Enhancements

### Loading UX
- Skeleton table UI
- Button-level loading states
- Page-level loading overlay

### Error UX
- Empty state
- Error boundary
- Global error handler
- React Query onError fallback

### Modal System
- Animated modal
- Add User / Edit User forms
- Keyboard accessibility
- Close-on-backdrop-click

### Reusable Components
- Pagination
- Input
- Select
- StatusFilter
- UserTable

---

## 🚀 Features Delivered

### Users Module
- Search by keyword
- Filter by status
- Pagination
- List users with details
- Add user
- Edit user
- Delete user

### Technical Capabilities Demonstrated
- React 18 concurrent rendering
- Feature-based architecture
- Full TypeScript coverage
- API abstraction + query keys
- React Query mutation flows
- URL-driven state
- Custom hooks design
- Enterprise-level error handling
- Skeleton loading UI
- Global toast notifications
- Animated modal UX

---

## 📦 Tech Stack
- **React 18**
- **TypeScript**
- **Vite**
- **React Router**
- **React Query**
- **Tailwind CSS**
- **DummyJSON API**
- **React Hot Toast**
- **ESLint + Prettier + Import Sort**

---

## 📚 Learning Outcomes
Through this project, I strengthened the following engineering skills:

### ✔ Scalable front-end architecture  
### ✔ Advanced TypeScript patterns  
### ✔ Modular API design  
### ✔ Data synchronization with React Query  
### ✔ Optimistic UI strategies  
### ✔ Custom hook composition  
### ✔ Enterprise-level error handling  
### ✔ URL-driven state  
### ✔ Build reusable, composable UI components  
### ✔ Clean code & lint/format conventions  

---

## 📈 Future Enhancements (optional)
- Role-based auth (login/logout)
- Infinite scrolling
- Column sorting
- Advanced filtering panel
- User details page
- Audit logs
- Integration tests (Vitest + RTL)

---

## 📝 Summary
API Dashboard is a production-style project demonstrating strong engineering fundamentals, with clean architecture, reusable UI, and modern React patterns.  
It is designed as part of a professional portfolio targeted at UK front-end roles.

This project highlights not only coding ability but architectural thinking, scalability, and product-level polish.
