# Treasury Logbook

A digital logbook system for the treasury department, designed to help record students that inquire about their financial assistance.

![Treasury Logbook System Screenshot](public/updated-ui-logbook.png)

## Features

- Basic CRD System (Create, Read, Delete System)
- Built with **React**, **TailwindCSS**, **Postgre**, and **shadcn/ui**
- Follows software engineering best practices
> 🚀 **New! TELLY telly AI Assistant:**  
> - Instantly find students in the logbook with the built-in AI-powered search assistant.  
> - Just type a name or query—let the AI do the rest!

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

---
