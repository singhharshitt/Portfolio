import React, { lazy, Suspense, useCallback, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../Sections/Hero.jsx';

const Aboutme = lazy(() => import('../Sections/Aboutme.jsx'));
const JourneyTimeline = lazy(() => import('../components/TimeLine.jsx'));
const TechStack = lazy(() => import('../Sections/TechStack.jsx'));
const ProjectsSection = lazy(() => import('../Sections/ProjectsSection.jsx'));
const SkillsVisualization = lazy(() => import('../Sections/SkillsVisualization.jsx'));
const Certificates = lazy(() => import('../Sections/Certificates.jsx'));
const BlogSection = lazy(() => import('../Sections/BlogSection.jsx'));
const ConnectSection = lazy(() => import('../Sections/ConnectSection.jsx'));
const InterestsSection = lazy(() => import('../Sections/InterestsSection.jsx'));


function Home() {
  useEffect(() => {
    const revealSelector =
      '.reveal-item, .skill-category, .stat-card, .certificate-card, .blog-card, .tech-item, .timeline-node';
    const observedElements = new WeakSet();
    const revealTimeouts = new Set();

    const observeNode = (node) => {
      if (!(node instanceof Element)) return;

      if (node.matches(revealSelector) && !observedElements.has(node)) {
        observedElements.add(node);
        observer.observe(node);
      }

      const descendants = node.querySelectorAll(revealSelector);
      descendants.forEach((element) => {
        if (observedElements.has(element)) return;
        observedElements.add(element);
        observer.observe(element);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = entry.target.parentElement?.children
            ? Array.from(entry.target.parentElement.children)
            : [];
          const index = siblings.indexOf(entry.target);
          const delayAttr = Number(entry.target.getAttribute('data-reveal-delay') || '0');
          const delay = Number.isFinite(delayAttr) && delayAttr > 0 ? delayAttr * 1000 : Math.max(index, 0) * 100;
          const timeoutId = window.setTimeout(() => {
            revealTimeouts.delete(timeoutId);
            entry.target.classList.add('is-visible');
            entry.target.classList.add('animate-in');
          }, delay);
          revealTimeouts.add(timeoutId);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    document.querySelectorAll(revealSelector).forEach((element) => {
      observedElements.add(element);
      observer.observe(element);
    });

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(observeNode);
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      revealTimeouts.clear();
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <Navbar onNavigate={scrollToSection} />

      <main className="pt-20 md:pt-24 lg:pt-27">
        <Hero />
        <Suspense fallback={null}>
          <Aboutme />
        </Suspense>
        <Suspense fallback={null}>
          <TechStack />
        </Suspense>
        <Suspense fallback={null}>
          <SkillsVisualization />
        </Suspense>
        <Suspense fallback={null}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={null}>
          <JourneyTimeline />
        </Suspense>
        <Suspense fallback={null}>
          <InterestsSection />
        </Suspense>
        <Suspense fallback={null}>
          <Certificates />
        </Suspense>
        <Suspense fallback={null}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={null}>
          <ConnectSection />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default Home;
