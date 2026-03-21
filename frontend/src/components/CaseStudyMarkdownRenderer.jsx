import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownImageWithFallback from './MarkdownImageWithFallback';
import { resolveMarkdownAssetUrl, resolveMarkdownLinkUrl } from '../utils/markdownParser';

export default function CaseStudyMarkdownRenderer({ markdown, repoOwner, repoName, defaultBranch }) {
  if (!markdown) {
    return <p className="font-bodycopy">README content is unavailable for this project.</p>;
  }

  return (
    <div className="prose prose-neutral max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="font-fliege mt-8 text-4xl text-[#452215]">{children}</h1>,
          h2: ({ children }) => <h2 className="font-ui mt-8 text-3xl text-[#452215]">{children}</h2>,
          h3: ({ children }) => <h3 className="font-ui mt-6 text-2xl text-[#452215]">{children}</h3>,
          p: ({ children }) => <p className="font-bodycopy my-3 text-base leading-relaxed text-[#452215]">{children}</p>,
          ul: ({ children }) => <ul className="my-3 list-disc space-y-1 pl-5 text-[#452215]">{children}</ul>,
          ol: ({ children }) => <ol className="my-3 list-decimal space-y-1 pl-5 text-[#452215]">{children}</ol>,
          li: ({ children }) => <li className="font-bodycopy text-base leading-relaxed">{children}</li>,
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-xl border border-[#452215] bg-[#FFF8EE] p-4">{children}</pre>
          ),
          code: ({ className, children }) => {
            if (className) {
              return <code className={className}>{children}</code>;
            }
            return <code className="rounded bg-[#FFF8EE] px-1.5 py-0.5 text-sm text-[#452215]">{children}</code>;
          },
          img: ({ src, alt }) => (
            <MarkdownImageWithFallback
              src={resolveMarkdownAssetUrl(src, repoOwner, repoName, defaultBranch)}
              alt={alt || 'README media'}
              className="my-4 w-full rounded-xl border border-[#452215]"
            />
          ),
          a: ({ href, children }) => (
            <a
              href={resolveMarkdownLinkUrl(href, repoOwner, repoName, defaultBranch)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DF6C4F] underline decoration-[#DF6C4F]/40 underline-offset-4 hover:text-[#452215]"
            >
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
