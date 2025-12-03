'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

function createSnowflake(x, y, speed, size, opacity, maxY, maxX) {
  return {
    x,
    y,
    speed,
    size,
    opacity,
    swing: rand(0, Math.PI * 2),
    swingSpeed: rand(0.01, 0.03),
    wind: rand(-0.15, 0.15),
    originalY: y, // Track original position for seamless looping
    update(maxY, maxX) {
      // Smooth continuous falling motion
      this.y += this.speed;
      
      // Gentle side-to-side swaying motion for natural drift
      this.x += Math.sin(this.swing) * 0.25 + this.wind;
      this.swing += this.swingSpeed;
      
      // Seamlessly reset to create infinite continuous loop
      // Reset when snowflake passes bottom edge
      if (this.y > maxY + this.size * 2) {
        // Reset to well above screen with random offset for natural distribution
        this.y = -this.size * 2 - rand(0, maxY * 0.5);
        this.x = rand(0, maxX);
        // Maintain natural properties but with slight variation
        this.swing = rand(0, Math.PI * 2);
        this.wind = rand(-0.15, 0.15);
      }
      
      // Smooth horizontal wrapping for infinite scrolling effect
      if (this.x < -this.size - 20) {
        this.x = maxX + this.size + 20;
      } else if (this.x > maxX + this.size + 20) {
        this.x = -this.size - 20;
      }
    },
    draw(ctx, maxY) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      
      // Draw soft snowflake with subtle glow for depth
      ctx.shadowBlur = this.size * 0.6;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      
      ctx.restore();
    },
  };
}

function SnowBackground({
  ref,
  className,
  canvasProps,
  count = 50,
  speed = { min: 0.5, max: 2 },
  size = { min: 2, max: 5 },
  opacity = { min: 0.3, max: 0.8 },
  ...props
}) {
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => containerRef.current);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let maxX = container.offsetWidth || window.innerWidth;
    let maxY = container.offsetHeight || window.innerHeight;
    
    let dpr = window.devicePixelRatio || 1;
    
    const setCanvasSize = () => {
      maxX = container.offsetWidth || window.innerWidth;
      maxY = container.offsetHeight || window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = maxX * dpr;
      canvas.height = maxY * dpr;
      canvas.style.width = maxX + 'px';
      canvas.style.height = maxY + 'px';
      // Reset transform and scale for crisp rendering
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const snowflakes = [];
    const getValueByRange = (range) => {
      if (typeof range === 'number') return range;
      return rand(range.min, range.max);
    };

    // Initialize snowflakes evenly distributed across a seamless vertical loop
    // This creates a continuous stream where snowflakes are always present
    for (let i = 0; i < count; i++) {
      // Distribute snowflakes evenly across extended vertical range
      // This ensures there's always a snowflake at every position
      const spacing = (maxY * 3) / count; // Cover 3x the height for seamless loop
      const verticalPosition = (i * spacing) - maxY; // Start from above screen
      
      snowflakes.push(
        createSnowflake(
          rand(-50, maxX + 50),
          verticalPosition + rand(-spacing * 0.3, spacing * 0.3), // Add slight variation
          getValueByRange(speed),
          getValueByRange(size),
          getValueByRange(opacity),
          maxY,
          maxX
        )
      );
    }

    let animationFrameId;
    let lastTime = performance.now();
    
    const animate = (currentTime) => {
      // Use delta time for consistent animation speed
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Clear canvas for fresh frame
      ctx.clearRect(0, 0, maxX, maxY);

      // Update and draw all snowflakes for continuous flow
      snowflakes.forEach((snowflake) => {
        snowflake.update(maxY, maxX);
        snowflake.draw(ctx, maxY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, speed, size, opacity]);

  return (
    <div
      ref={containerRef}
      data-slot="snow-background"
      className={cn('relative size-full overflow-hidden', className)}
      {...props}>
      <canvas
        {...canvasProps}
        ref={canvasRef}
        className={cn('absolute inset-0 size-full', canvasProps?.className)} />
    </div>
  );
}

export { SnowBackground };

