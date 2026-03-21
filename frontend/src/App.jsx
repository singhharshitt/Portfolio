import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/home';
import ErrorBoundary from './components/ErrorBoundary';
import { LazyMotion, domAnimation } from './utils/motion';

const queryClient = new QueryClient();
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <Router>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/case-study/:slug" element={<CaseStudy />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Router>
      </LazyMotion>
    </QueryClientProvider>
  );
}

export default App;
