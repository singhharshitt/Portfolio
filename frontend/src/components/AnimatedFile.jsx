import { motion } from 'framer-motion';

const typeAccentClass = {
  frontend: 'text-orange-400',
  backend: 'text-[var(--app-accent-secondary)]',
  devops: 'text-orange-400',
  core: 'text-[var(--app-accent-secondary)]',
};

export default function AnimatedFile({ title = 'Stack', type = 'frontend', cards = [] }) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return null;
  }

  const accentClass = typeAccentClass[type] || 'text-orange-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full max-w-[560px] rounded-2xl border border-sand-200/80 bg-sand-100/70 shadow-sm p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-sand-200/80">
        <h4 className="plus-jakarta-sans-semibold text-sm sm:text-base uppercase tracking-[0.08em] text-charcoal/85">
          {title}
        </h4>
        <span className={`inline-flex w-2.5 h-2.5 rounded-full bg-current ${accentClass}`} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((item, index) => (
          <motion.div
            key={`${item.name}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.28, ease: 'easeOut', delay: index * 0.04 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className="min-w-0"
          >
            <div className="group h-20 sm:h-24 rounded-xl border border-sand-200 bg-white/90 shadow-sm flex flex-col items-center justify-center gap-2 px-2 text-center transition-all duration-300 hover:border-orange-400/45 hover:shadow-md">
              {item.icon && (
                <item.icon className={`text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110 ${accentClass}`} />
              )}
              <span className="text-[11px] sm:text-xs plus-jakarta-sans-medium text-charcoal/85 leading-snug">
                {item.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
