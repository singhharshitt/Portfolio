import React from 'react';

export default function CaseStudyMarkdownSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="h-8 w-3/5 animate-pulse rounded-lg bg-[#FFF8EE]" />
      <div className="h-4 w-full animate-pulse rounded bg-[#FFF8EE]" />
      <div className="h-4 w-11/12 animate-pulse rounded bg-[#FFF8EE]" />
      <div className="h-4 w-4/5 animate-pulse rounded bg-[#FFF8EE]" />

      <div className="pt-2">
        <div className="h-6 w-2/5 animate-pulse rounded bg-[#FFF8EE]" />
      </div>

      <div className="h-4 w-full animate-pulse rounded bg-[#FFF8EE]" />
      <div className="h-4 w-10/12 animate-pulse rounded bg-[#FFF8EE]" />
      <div className="h-4 w-9/12 animate-pulse rounded bg-[#FFF8EE]" />

      <div className="h-48 w-full animate-pulse rounded-xl border border-[#452215] bg-[#FFF8EE]" />
    </div>
  );
}
