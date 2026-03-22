import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/home';
import ErrorBoundary from './components/ErrorBoundary';
import { LazyMotion, domAnimation } from './utils/motion';

const queryClient = new QueryClient();
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <Router>
          <ScrollToTopOnRouteChange />
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
