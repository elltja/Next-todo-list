# Next Todo App

This is a simple Todo application that allows users to add, toggle, and delete tasks. The app uses Supabase for authentication and data storage, and it includes an optimistic UI to ensure smooth user experience during updates.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Supabase**: Backend for authentication and data storage.
- **Next.js**: Framework for building the application, including server-side actions.
- **TailwindCSS**: Utility-first CSS framework for styling.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/elltja/Next-todo-list.git
   cd Next-todo-list
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root of the project and add the following:

   ```env
    SUPABASE_URL=your-supabase-url
    SUPABASE_ANON_KEY=your-supabase-anon-key
    NODE_ENV=development
   ```

4. Run the project:
   ```bash
   npm run dev
   ```


## Usage

After logging in via GitHub authentication, you can add tasks, mark them as completed, and delete them. The app provides an optimistic UI, meaning changes are reflected instantly while waiting for the backend to update.
