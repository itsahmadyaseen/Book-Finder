# 📚 Book Finder

A responsive **React** application built with **Tailwind CSS** that allows users to search for books using the **Open Library API**.  

Designed for a college student persona (*Alex*), the app provides an intuitive interface to quickly search and browse books by title, displaying details including covers, authors, and publication year.

---

## 🚀 Features

- 🔍 **Book Search**: Search books by title using the Open Library API  
- 📱 **Responsive UI**: Works on both desktop and mobile devices  
- 📖 **Book Details**: View title, author(s), first publish year, and cover  
- ⚠️ **Error Handling**: Gracefully handles network errors and empty results  
- ⏳ **Loading State**: Skeletons displayed while fetching data  
- 🧩 **Clean Code Structure**: Modular components, reusable hooks, and maintainable code  

### Optional / Future Enhancements
- Search by author, subject, or ISBN  
- Filtering by language or publication year  
- Favorites saved in `localStorage`  
- Book details modal with additional metadata  

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS  
- **API**: Open Library Search API  
- **Deployment**: CodeSandbox / StackBlitz / Vercel / Netlify  
- **Testing**: React Testing Library  

---

## 🗂️ Project Structure

book-finder/
│
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── common/ # Buttons, Inputs, Spinners
│ │ ├── layout/ # Header, Footer, Container
│ │ └── books/ # BookCard, BookList, SearchBar, EmptyState
│ │
│ ├── hooks/ # Custom hooks
│ │ └── useOpenLibrarySearch.js
│ │
│ ├── pages/ # Page-level components
│ │ └── Home.jsx
│ │
│ ├── utils/ # API helpers and constants
│ ├── styles/ # Tailwind/global styles
│ ├── tests/ # Unit & component tests
│ ├── App.jsx # Root component
│ └── index.js # Entry point
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md


---

## ⚙️ How to Run Locally

1. **Clone the repository**  
   ```bash
   git clone https://github.com/itsahmadyaseen/book-finder.git
   cd book-finder
Install dependencies

bash
Copy code
npm install
Start the development server

bash
Copy code
npm start
Open http://localhost:5173 in your browser.

# Deployment

## Live Demo (example): https://q75vlz-5173.csb.app/
Book Finder on CodeSandbox

# How It Works
User types a query into the search bar.

The app calls the Open Library API with the search query.

The response is parsed and displayed in a responsive grid of BookCards.

Skeleton loaders are shown while fetching.

If no results are found or if there’s an API error, a friendly message is displayed.



# Testing
Unit tests for custom hooks (useOpenLibrarySearch)

Component tests for BookCard, SearchBar, and BookList

Manual E2E flow: search → results → pagination → error handling → empty state

# Key Implementation Notes
API Call Handling: Debounced input, AbortController to cancel stale requests

Error Handling: Network errors and no-results states handled gracefully

Performance: Lazy loading of cover images; responsive grid; small page size

Accessibility: Proper labels, alt text for images, keyboard navigation support

Clean Code: Modular components, descriptive comments, reusable hooks

# References
Open Library API Documentation

Tailwind CSS

React Documentation

# Author
Ahmad Yaseen

GitHub: https://github.com/itsahmadyaseen

ChatGPT Reference: https://chatgpt.com/share/68b13ecc-c1b4-800c-91e3-9a9241c1d68e

