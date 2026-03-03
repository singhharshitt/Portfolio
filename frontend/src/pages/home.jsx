import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../Sections/Hero.jsx';
import Aboutme from '../Sections/Aboutme.jsx';
import JourneyTimeline from '../components/TimeLine.jsx';
import TechStack from '../Sections/TechStack.jsx';
import ProjectsSection from '../Sections/ProjectsSection.jsx';
import SkillsVisualization from '../Sections/SkillsVisualization.jsx';
import CodingActivity from '../Sections/CodingActivity.jsx';
import Certificates from '../Sections/Certificates.jsx';
import BlogSection from '../Sections/BlogSection.jsx';
import ConnectSection from '../Sections/ConnectSection.jsx';
import dynamic from '../utils/dynamic.jsx';
import { EMPTY_GFG_STATS, EMPTY_GITHUB_STATS, EMPTY_LEETCODE_STATS } from '../types/activityStats';

const Dashboard = dynamic(() => import('../Sections/DeveloperActivityDashboard.jsx'), { ssr: false });

const DASHBOARD_PROPS = Object.freeze({
  githubStats: EMPTY_GITHUB_STATS,
  leetCodeStats: EMPTY_LEETCODE_STATS,
  gfgStats: EMPTY_GFG_STATS,
});

function Home() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(
        '.reveal-item, .skill-category, .stat-card, .certificate-card, .blog-card, .tech-item, .timeline-node'
      )
    );
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
          window.setTimeout(() => {
            entry.target.classList.add('is-visible');
            entry.target.classList.add('animate-in');
          }, delay);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar onNavigate={scrollToSection} />

      <main className="site-main">
        <Hero />
        <Aboutme />
        <TechStack />
        <SkillsVisualization />
        <ProjectsSection />
        <JourneyTimeline />
        <CodingActivity />
        <Dashboard {...DASHBOARD_PROPS} />
        <Certificates />
        <BlogSection />
        <ConnectSection />
      </main>

      <Footer />
    </>
  );
}

export default Home;
