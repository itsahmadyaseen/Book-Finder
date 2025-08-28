📚 Book Finder

A responsive React application built with Tailwind CSS that allows users to search for books using the Open Library API. Designed for a college student persona, Alex, the app provides an intuitive interface to search and browse books quickly by title, displaying relevant details including covers, authors, and publication year.

🚀 Features

Book Search: Search books by title using the Open Library API.

Responsive UI: Works on both desktop and mobile devices.

Book Details: View book title, author(s), first publish year, and cover.

Error Handling: Gracefully handles network errors and empty search results.

Loading State: Skeletons displayed while fetching data.

Clean Code Structure: Modular components, reusable hooks, and maintainable code.

Optional / Future Enhancements:

Search by author, subject, or ISBN.

Filtering by language or publication year.

Favorites saved in localStorage.

Book details modal with additional metadata.

🛠️ Tech Stack

Frontend: React, Tailwind CSS

API: Open Library Search API

Deployment: CodeSandbox / StackBlitz (or any free hosting)

Testing: React Testing Library (unit/component tests)

🗂️ Project Structure
book-finder/
│
├── public/                     # Static assets
├── src/                        
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Buttons, Inputs, Spinners
│   │   ├── layout/             # Header, Footer, Container
│   │   └── books/              # BookCard, BookList, SearchBar, EmptyState
│   │
│   ├── hooks/                  # Custom hooks
│   │   └── useOpenLibrarySearch.js
│   │
│   ├── pages/                  # Page-level components
│   │   └── Home.jsx
│   │
│   ├── utils/                  # API helpers and constants
│   ├── styles/                 # Tailwind/global styles
│   ├── tests/                  # Unit & component tests
│   ├── App.jsx                 # Root component
│   └── index.js                # Entry point
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md

⚙️ How to Run Locally

Clone the repository:

git clone https://github.com/itsahmadyaseen/book-finder.git
cd book-finder


Install dependencies:

npm install


Start the development server:

npm start


Open http://localhost:5173
 in your browser.

🔗 Deployment

The app can be deployed to CodeSandbox, StackBlitz, or Vercel/Netlify.

Live Demo (example):
https://codesandbox.io/s/book-finder

📝 How It Works

User types a query into the search bar.

The app calls the Open Library API with the search query.

The response is parsed and displayed in a responsive grid of BookCards.

Skeleton loaders are shown while fetching.

If no results are found or if there’s an API error, a friendly message is displayed.

🧩 Component Hierarchy
App
 ├── Header
 ├── SearchBar
 ├── BookList
 │    ├── BookCard
 │    ├── SkeletonCard
 │    ├── EmptyState
 │    └── ErrorState
 ├── Pagination / LoadMore
 └── Footer

✅ Testing

Unit tests for custom hooks (useOpenLibrarySearch).

Component tests for BookCard, SearchBar, and BookList.

Manual E2E flow: search → results → pagination → error handling → empty state.

🛠️ Key Implementation Notes

API Call Handling: Debounced input, abort controller to cancel stale requests.

Error Handling: Network errors and no-results states are handled gracefully.

Performance: Lazy loading of cover images; small page size; responsive grid.

Accessibility: Proper labels, alt text for images, keyboard navigation support.

Clean Code: Modular components, descriptive comments, reusable hooks.

📄 References

Open Library API Documentation: https://openlibrary.org/dev/docs/api/search

Tailwind CSS: https://tailwindcss.com/

React Docs: https://reactjs.org/

👤 Author

Ahmad Yaseen

GitHub: https://github.com/your-username

ChatGPT Reference: Link to ChatGPT conversation
 (include your shared conversation link for Level 1)

📌 Submission Notes

Level 1 (50%): ChatGPT work li