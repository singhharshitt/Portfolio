import React from 'react';

function BlockParagraph({ text }) {
  return <p className="font-bodycopy my-3 text-base leading-relaxed text-[#452215]">{text}</p>;
}

function BlockHeading({ text }) {
  return <h3 className="font-ui mt-8 text-2xl text-[#452215]">{text}</h3>;
}

function BlockHighlight({ text }) {
  return (
    <div className="my-5 rounded-xl border border-[#DF6C4F] bg-[#FFF8EE] p-4">
      <p className="font-bodycopy text-base leading-relaxed text-[#452215]">{text}</p>
    </div>
  );
}

function BlockQuote({ text }) {
  return (
    <blockquote className="my-5 border-l-4 border-[#FF9398] bg-[#FFF8EE] px-4 py-3 font-bodycopy italic text-[#452215]">
      {text}
    </blockquote>
  );
}

function BlockDivider() {
  return <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#DF6C4F] to-transparent" />;
}

function BlockGif({ suggestion }) {
  return (
    <div className="my-5 rounded-xl border border-dashed border-[#452215]/50 bg-[#FFF8EE] p-4">
      <p className="font-mono-ui text-xs uppercase tracking-[0.14em] text-[#DF6C4F]">GIF Suggestion</p>
      <p className="font-bodycopy mt-2 text-sm leading-relaxed text-[#452215]">{suggestion}</p>
    </div>
  );
}

function renderBlock(block, idx) {
  if (!block || typeof block !== 'object') {
    return null;
  }

  const key = `block-${idx}-${block.type || 'unknown'}`;

  switch (block.type) {
    case 'paragraph':
      return <BlockParagraph key={key} text={block.text || ''} />;
    case 'heading':
      return <BlockHeading key={key} text={block.text || ''} />;
    case 'highlight':
      return <BlockHighlight key={key} text={block.text || ''} />;
    case 'quote':
      return <BlockQuote key={key} text={block.text || ''} />;
    case 'divider':
      return <BlockDivider key={key} />;
    case 'gif':
      return <BlockGif key={key} suggestion={block.suggestion || ''} />;
    default:
      return null;
  }
}

export default function CaseStudyStructuredRenderer({ caseStudy }) {
  if (!caseStudy) {
    return null;
  }

  return (
    <div>
      {caseStudy.description ? (
        <p className="font-bodycopy mb-5 text-base leading-relaxed text-[#452215]">{caseStudy.description}</p>
      ) : null}

      {Array.isArray(caseStudy.techStack) && caseStudy.techStack.length > 0 ? (
        <div className="mb-6 flex flex-wrap gap-2">
          {caseStudy.techStack.map((tech) => (
            <span
              key={`structured-tech-${tech}`}
              className="font-mono-ui rounded-full border border-[#452215] bg-[#FFF8EE] px-3 py-1 text-xs text-[#452215]"
            >
              {tech}
            </span>
          ))}
        </div>
      ) : null}

      <div>{(caseStudy.content || []).map((block, idx) => renderBlock(block, idx))}</div>
    </div>
  );
}
