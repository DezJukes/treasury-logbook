# Treasury Logbook

A digital logbook system for the treasury department, designed to help record students that inquire about their financial assistance.

![Treasury Logbook System Screenshot](public/ui-ss.png)

## Features

- Basic CRD System (Create, Read, Delete System)
- Built with **React**, **TailwindCSS**, **Supabase**, and **shadcn/ui**
- Follows software engineering best practices

## Getting Started

To set up and run the project locally:

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Start the development server**
    ```bash
    npm run dev
    ```

## Project Structure

- `components/ui/`  
  Contains reusable UI components from shadcn/ui.

- `components/SectionInputs.jsx`  
  Handles student inputs and actions.

- `components/SectionDisplay.jsx`  
  Displays data fetched from the database.

- `App.jsx`  
  Main entry point that composes all sections.

## Notes

- shadcn/ui components are used similarly to their native HTML counterparts (e.g., `<Button onClick={...} />`).
- The system is structured for maintainability and scalability.

## Future Improvements

- Integrate AI-powered search and Q&A features.

---
