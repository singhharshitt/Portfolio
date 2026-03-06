import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';

export default function dynamic(loader, options = {}) {
  const { ssr = true, loading: LoadingComponent = null } = options;

  function DynamicComponent(props) {
    const LazyComponent = useMemo(() => lazy(loader), []);
    const [canRender, setCanRender] = useState(ssr);

    useEffect(() => {
      if (ssr) return undefined;
      setCanRender(true);
      return () => {
        setCanRender(false);
      };
    }, []);

    if (!canRender) {
      return LoadingComponent ? <LoadingComponent {...props} /> : null;
    }

    return (
      <Suspense fallback={LoadingComponent ? <LoadingComponent {...props} /> : null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  }

  DynamicComponent.displayName = 'DynamicComponent';
  return DynamicComponent;
}
