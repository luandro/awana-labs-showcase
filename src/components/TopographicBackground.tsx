import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TopographicBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 400], [0.15, 0.05]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.svg
        style={{ y: y1, opacity }}
        className="absolute w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Topographic contour lines */}
        <g stroke="currentColor" strokeWidth="1" fill="none" className="text-primary">
          {/* Outer contours */}
          <motion.path
            d="M-100,400 Q150,200 400,350 T800,300 T1300,400"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M-100,420 Q160,230 420,370 T820,320 T1300,420"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.1, ease: "easeInOut" }}
          />
          <motion.path
            d="M-100,440 Q170,260 440,390 T840,340 T1300,440"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
          />
          
          {/* Middle contours - tighter */}
          <motion.path
            d="M100,380 Q300,280 500,360 T900,330"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
          />
          <motion.path
            d="M100,400 Q310,300 520,380 T920,350"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
          />
          
          {/* Inner contours - central elevation */}
          <motion.path
            d="M250,370 Q400,320 550,370 T750,350"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M280,365 Q420,330 570,365 T730,350"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
          />
          
          {/* Secondary elevation - bottom right */}
          <motion.path
            d="M600,500 Q800,400 1000,480 T1300,500"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.7, ease: "easeInOut" }}
          />
          <motion.path
            d="M620,520 Q820,420 1020,500 T1300,520"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
          />
          <motion.path
            d="M700,540 Q850,460 1000,520"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
          />
          
          {/* Top area contours */}
          <motion.path
            d="M200,150 Q400,80 600,140 T1000,120"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M180,170 Q380,100 580,160 T980,140"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.1, ease: "easeInOut" }}
          />
          
          {/* Bottom area contours */}
          <motion.path
            d="M-50,650 Q200,600 450,660 T900,620 T1250,680"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 1.2, ease: "easeInOut" }}
          />
          <motion.path
            d="M-50,680 Q210,630 470,690 T920,650 T1250,710"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 1.3, ease: "easeInOut" }}
          />
        </g>
      </motion.svg>
      
      {/* Secondary layer with different parallax */}
      <motion.svg
        style={{ y: y2 }}
        className="absolute w-full h-full opacity-10"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary">
          <motion.path
            d="M0,250 Q300,150 600,240 T1200,200"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,550 Q350,480 700,560 T1200,520"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1.7, ease: "easeInOut" }}
          />
        </g>
      </motion.svg>
    </div>
  );
};

export default TopographicBackground;
