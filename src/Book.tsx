import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import bookPageImage from './assets/front-cover.jpg';
import contentRightImage from './assets/content-right.jpeg';

const LEFT_COVER_WIDTH_RATIO = 1; // left cover is 65% of book width
const BORDER_RADIUS = '6px';
const borderStyle = {
  borderRadius: BORDER_RADIUS,
  border: '1px solid #faf6f0', // i want darker color
  overflow: 'hidden',
  boxShadow: '0 0 2px rgba(0,0,0,0.2)',
};

export function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  isOpenRef.current = isOpen;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const name = useMemo(() => {
    return new URLSearchParams(location.search).get('name');
  }, [location.search]);

  useEffect(() => {
    setTimeout(() => {
      if (isOpenRef.current) return;
      setIsOpen(true);
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleBookToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '800px',
        cursor: 'pointer',
      }}
      role='application'
      aria-label='Book'
      onClick={handleBookToggle}
    >
      <div
        style={{
          position: 'relative',
          width: 'min(80vw, calc(90dvh * 210 / 297))',
          aspectRatio: '210 / 297',
          transformStyle: 'preserve-3d',
          containerType: 'size',
        }}
      >
        {/* Single page (content) – slightly behind so cover never z-fights */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#f5f0e6',
            zIndex: 1,
            transform: 'translateZ(-1px)',
            transformStyle: 'preserve-3d',
            backgroundImage: `url(${contentRightImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '12%',
            ...borderStyle,
          }}
        >
          <div style={{ fontSize: '4cqh', fontWeight: 'bold' }}>{name}</div>
        </div>
        {/* Left cover: hinge on left, opens to the left (slightly back to avoid z-fight with right) */}
        <motion.div
          style={{
            position: 'absolute',
            zIndex: 2,
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            top: 0,
            left: 0,
            width: `${LEFT_COVER_WIDTH_RATIO * 100}%`,
            height: '100%',
          }}
          animate={{
            rotateY: isOpen ? -180 : 0,
            // z: 2,
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 20,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#8b4513',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0.5px)',
              ...borderStyle,
            }}
          >
            <img
              src={bookPageImage}
              alt='Book page'
              style={{ width: '100%', height: '100%', objectFit: 'fill' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'white',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(0.5px)',
              ...borderStyle,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
