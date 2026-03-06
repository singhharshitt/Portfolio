import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/home';
import ErrorBoundary from './components/ErrorBoundary';
import { LazyMotion, domAnimation } from './utils/motion';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <Router>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </LazyMotion>
    </QueryClientProvider>
  );
}

export default App;
