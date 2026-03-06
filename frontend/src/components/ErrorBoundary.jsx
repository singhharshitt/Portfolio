import React from 'react';

// Simple error boundary to catch rendering errors in child tree
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can log to an error reporting service here
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-semibold">Something went wrong.</h1>
          <p>Please reload the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
