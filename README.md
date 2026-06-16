🚀 Next.js Form Submission Project

URL: https://prisma-form.vercel.app/

This project is completed as part of a task requirement.

It is a Next.js + TypeScript + Tailwind CSS application that demonstrates a full-stack form submission workflow with frontend and backend validation, along with database integration using Prisma.

🛠️ Tech Stack
Next.js (App Router)
TypeScript
Tailwind CSS
React Hook Form
Yup Validation
Prisma ORM
SQLite (development database)

📋 Features

✅ Frontend
A user form is created with the following fields:
Name (required)
Age (required)
Email (required)
Gender (optional dropdown)
Form validation is handled using Yup + React Hook Form
Real-time validation errors are displayed for better UX
Clean and responsive UI using Tailwind CSS

⚙️ Backend (API Route)
API created using Next.js Route Handler (/api/application)
Server-side validation is implemented to ensure data integrity
Additional backend validations include:
Strict email format validation (regex-based)
Age validation rules beyond frontend checks
Ensures backend security by not trusting frontend data

🗄️ Database (Prisma)
Prisma ORM is used for database operations (first-time usage in this project)
Data is stored in a SQLite database
Application model includes:
name
email (unique constraint)
age
gender
timestamps
Unique email constraint is enforced at database level to prevent duplicate submissions

🔐 Validation Strategy
This project follows a double-layer validation approach:

Frontend (Yup): Improves user experience and prevents invalid submissions
Backend (API): Ensures security and data integrity
Database (Prisma): Enforces uniqueness and final data consistency

📚 Learning Experience
This is my first time working with Prisma ORM
It took some time to understand:
Schema design
Migrations / db push
Unique constraints handling
AI assistance was used for:
Prisma setup and configuration
Handling unique email validation flow
Debugging schema migration issues

This helped in better understanding full-stack data flow and ORM concepts.

📦 How to Run
npm install
npx prisma db push
npm run dev

🙌 Conclusion
This project demonstrates a complete full-stack workflow using modern Next.js architecture, with proper validation layers, database integration, and production-style API structure.
