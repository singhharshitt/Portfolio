import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/home';
import ErrorBoundary from './components/ErrorBoundary';
import { LazyMotion, domAnimation } from './utils/motion';

const CaseStudy = lazy(() => import('./pages/CaseStudy'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <Router>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/case-study/:slug" element={<Suspense fallback={null}><CaseStudy /></Suspense>} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </LazyMotion>
    </QueryClientProvider>
  );
}

export default App;
