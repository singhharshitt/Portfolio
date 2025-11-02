import { motion, useTransform, useMotionValue } from "framer-motion";

export default function BallDropAnimation() {
  const ballY = useMotionValue(-800);
  const shadowScale = useTransform(ballY, [-800, 0], [0.2, 1.2]);
  const shadowOpacity = useTransform(ballY, [-800, 0], [0.1, 0.6]);

  return (
    <motion.div
      className="w-screen h-screen flex justify-center items-center relative overflow-hidden"
      initial={{ backgroundColor: "#F4FFF8" }}
      animate={{ backgroundColor: "#000000" }}
      transition={{ delay: 3.5, duration: 1.2, ease: "easeInOut" }}
    >

      

      {/* Floor Line */}
      <div
        className="absolute mt-16 center-0 w-[80%] md:w-[70%] lg:w-[60%] h-1 bg-[#A6A6A6] rounded-full shadow-lg"
      />

      {/* Ball */}
      <motion.div
        className="w-16 h-16 bg-black rounded-full relative"
        style={{ y: ballY }}
        initial={{ y: -800, scale: 1 }}
        animate={{
          y: [-400, 0, -120, 0, -90, 0, -60, 0], // 3 bounces
          scale: [1, 1, 1.2, 1.2, 1.4, 1.4, 30], // grows on each bounce, then pop
        }}
        transition={{
          duration: 3.5,
          ease: "easeOut",
          times: [0, 0.2, 0.35, 0.55, 0.7, 0.85, 1],
        }}
      >
        {/* Ball Shadow */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/40 rounded-full blur-md"
          style={{
            scale: shadowScale,
            opacity: shadowOpacity,
          }}
        />

        {/* Velocity Speed Lines */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-10 bg-black/60 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
        <motion.div
          className="absolute -top-6 left-[40%] w-1 h-6 bg-black/40 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
        />
        <motion.div
          className="absolute -top-6 left-[60%] w-1 h-6 bg-black/40 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}
