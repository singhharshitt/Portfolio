import { memo } from 'react';

const tooltipWrapperStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid rgba(148, 163, 184, 0.35)',
  borderRadius: '0.75rem',
  padding: '0.5rem 0.65rem',
  color: '#f8fafc',
  fontSize: '0.75rem',
};

const labelStyle = { color: '#cbd5e1', marginBottom: '0.2rem' };

const valueStyle = { color: '#f8fafc', fontWeight: 600 };

const itemStyle = { marginTop: '0.15rem' };

const MinimalTooltip = memo(function MinimalTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div style={tooltipWrapperStyle}>
      {label ? <p style={labelStyle}>{label}</p> : null}
      {payload.map((entry) => (
        <p key={`${entry.name}-${entry.dataKey}`} style={itemStyle}>
          <span style={labelStyle}>{entry.name}: </span>
          <span style={valueStyle}>{entry.value}</span>
        </p>
      ))}
    </div>
  );
});

export default MinimalTooltip;
