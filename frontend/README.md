# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Running the full stack

The frontend fetches activity data from a local backend server proxyed via `/api`. Environment variables like `VITE_GITHUB_USERNAME`, `VITE_LEETCODE_USERNAME`, and `VITE_GFG_USERNAME` are read at build time; restart the dev server after changing them.

Start the backend before running the dev server:

```bash
cd ../backend
npm install   # if you haven't already
npm run dev    # listens on port 4000
```

When the backend isn't running Vite will log `http proxy error: /api... ECONNREFUSED`, but the UI gracefully falls back and still works.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
