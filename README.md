# Pagination Task - Art Gallery

This project implements a paginated table for displaying artworks fetched from an API. The table uses **PrimeReact's DataTable component** and supports features like **pagination**, **row selection**, and **custom row selection** persistence across pages.

## Key Features:
- **Vite React App with TypeScript**: A modern, optimized setup for React.
- **PrimeReact DataTable**: For displaying and paginating artwork data.
- **Server-Side Pagination**: The app fetches data only for the current page from the server.
- **Row Selection**: Users can select individual rows or all rows at once.
- **Custom Row Selection Panel**: Allows users to toggle between selected and unselected rows, which persists across page changes.

## Demo
You can view the deployed version of the application here:
[Deployed Application](https://paginationgmo.netlify.app/)

## API
The data is fetched from the following API:
[Artworks API](https://api.artic.edu/api/v1/artworks?page=1)

### API Fields:
- **title**
- **place_of_origin**
- **artist_display**
- **inscriptions**
- **date_start**
- **date_end**

## Tech Stack:
- **React (Vite)**: A fast and modern JavaScript framework for building the app.
- **PrimeReact**: A library for UI components, used here for the DataTable component.
- **TypeScript**: Ensures type safety across the application.

## Setup Instructions

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/pagination-task.git
cd pagination-task
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Run the app locally:
```bash
npm run dev
```

This will start the application locally at `http://localhost:3000`.

## Key Features and Steps Implemented:

### 1. **React App Created with VITE**:
- The app is created using Vite for fast development and build speed, with TypeScript enabled.

### 2. **PrimeReact DataTable**:
- Added a **DataTable** component from PrimeReact.
- The table displays the following fields fetched from the API:
  - `title`
  - `place_of_origin`
  - `artist_display`
  - `inscriptions`
  - `date_start`
  - `date_end`
  
### 3. **Pagination**:
- Server-side pagination is implemented, meaning when the user changes pages, the app fetches the respective data from the server based on the page number.

### 4. **Row Selection**:
- Users can select rows using checkboxes.
- The selection can either be **single (row click)** or **multiple (checkboxes)**.

### 5. **Custom Row Selection Panel**:
- A custom row selection panel is included, which allows users to manage the selection state across multiple pages.

### 6. **Persistence of Selection Across Pages**:
- When a user selects or deselects a row on a given page, the selection state persists even when they navigate to other pages.

## Important Notes:
- Ensure that the application does **not hold all rows in memory** across different pages, as this can lead to memory issues.
- Every page change triggers a fresh API call to fetch the respective page's data.
- Selection state must be preserved even when users navigate between pages.

## Checklist Before Submission:
1. **Ensure no memory issues**: There must not be any variable holding all rows fetched from different pages.
2. **API Call on Page Change**: The app should fetch data from the server on each page change.
3. **Row Selection Persistence**: Row selection and deselection must persist across different pages.
4. **Custom Row Selection Panel**: Custom selection panel must work as expected, with correct persistence.

## Deployment
The application has been deployed on Netlify. You can access it here:
[Deployed URL](https://paginationgmo.netlify.app/)
