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


# Setting up Backend

## Software requirements
- Python 3.12
- Command Prompt or Windows Powershell
- VSCode
- Postgresql (if not please set it up [see here](##-Setting-up-PostgreSQL))

## Run Locally

### In terminal of VSCode

Go to project directory
```bash
$ cd backend
```

Create virtual environment
```bash
$ python -m venv venv
```

Activate virtual environment
```bash
$ venv\Scripts\activate
```

Install requirements
```bash
$ pip install -r requirements.txt

```

Go to backend project directory

```bash
$ cd logbook_backend
```

Migrations
```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

Run the server
```bash
$ python manage.py runserver
```

## Setting up PostgreSQL

### Installation & Setup
- Follow this [guide](https://docs.google.com/document/d/1-bvDPgd2EP4ROR7DJ18rJzwcz6KD01DcDkr2S1KAzKQ/edit?usp=sharing) for installing and setting up PostgreSQL.
- Name your database as you prefer, but we recommend to name it **_Treasury-DB-Schema_**.
- For creating tables paste and run this [script](https://rentry.co/uikxwc4a) in the created schema in a query tool.
- For inserting dummy data paste and run this [script](https://rentry.co/y8wq364y) into a query tool aswell.