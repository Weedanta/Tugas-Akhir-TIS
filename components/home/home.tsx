// components/pages/home-page.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Star, 
  Calendar, 
  Camera, 
  Telescope, 
  Globe,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const HomePage: React.FC = () => {
  const splineRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  // Animated Counter Component
  const AnimatedCounter = ({ value, duration = 2000 }: { value: string; duration?: number }) => {
    const [count, setCount] = React.useState('0');
    const counterRef = useRef(null);
    const inView = useInView(counterRef);

    useEffect(() => {
      if (inView) {
        if (value === '∞') {
          setCount('∞');
          return;
        }
        
        const numericValue = parseInt(value.replace(/\D/g, ''));
        const suffix = value.replace(/[0-9]/g, '');
        let startTime: number;
        
        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          const currentCount = Math.floor(progress * numericValue);
          setCount(currentCount + suffix);
          
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };
        
        requestAnimationFrame(animateCount);
      }
    }, [inView, value, duration]);

    return <span ref={counterRef}>{count}</span>;
  };

  useEffect(() => {
    // Load Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js';
    
    script.onload = () => {
      // Create spline-viewer element after script loads
      if (splineRef.current) {
        const splineViewer = document.createElement('spline-viewer');
        splineViewer.setAttribute('loading-anim-type', 'spinner-small-light');
        splineViewer.setAttribute('url', 'https://prod.spline.design/H4aw8VeY0ATSL3MC/scene.splinecode');
        
        // Apply styles
        Object.assign(splineViewer.style, {
          position: 'absolute',
          top: '-5%',
          left: '30%',
          width: '100%',
          height: '120%',
          zIndex: '0',
          overflow: 'hidden',
        });
        
        splineRef.current.appendChild(splineViewer);
      }
    };
    
    document.head.appendChild(script);

    return () => {
      // Clean up
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (splineRef.current) {
        splineRef.current.innerHTML = '';
      }
    };
  }, []);

  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Daily Updates",
      description: "Get fresh space content every single day with NASA's carefully curated astronomical imagery and discoveries."
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "High-Quality Images",
      description: "Experience breathtaking high-resolution images from NASA's telescopes, spacecraft, and astronomical observatories."
    },
    {
      icon: <Telescope className="h-8 w-8" />,
      title: "Scientific Explanations",
      description: "Learn from expert astronomers and scientists with detailed explanations accompanying each cosmic phenomenon."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Explore the Universe",
      description: "Journey through galaxies, nebulae, planets, and cosmic events that shape our understanding of space."
    }
  ];

  const stats = [
    { number: "25+", label: "Years of APOD" },
    { number: "9000+", label: "Space Images" },
    { number: "365", label: "Days Per Year" },
    { number: "∞", label: "Wonder & Discovery" }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-visible">
        {/* Spline 3D Scene */}
        <div 
          ref={splineRef}
          className="hidden md:block absolute inset-0 w-full h-full"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10" />
        
        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Astronomy
                  </span>
                  <br />
                  <span className="text-foreground">Picture of</span>
                  <br />
                  <span className="text-foreground">the Day</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Discover the cosmos through NASA&apos;s daily featured astronomical images. 
                  Each day brings a new window into the infinite beauty and mystery of our universe.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/daily-facts" className="flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Explore Today&apos;s Image
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link href="/about">
                    Learn More
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side for larger screens - space for 3D scene */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* About APOD Section */}
      <motion.section 
        className="py-20 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              What is <span className="text-primary">APOD</span>?
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              The Astronomy Picture of the Day (APOD) is a website provided by NASA and Michigan 
              Technological University. Since June 16, 1995, the website has featured an astronomy 
              or space science image each day, along with a brief explanation written by professional astronomers.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                A Daily Journey Through Space
              </motion.h3>
              <motion.div 
                className="space-y-4 text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Every single day, NASA presents a carefully selected image or video showcasing 
                  the beauty and wonder of our cosmos. From distant galaxies billions of light-years 
                  away to detailed views of planets in our own solar system.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Each image comes with an expert explanation from professional astronomers, 
                  making complex astronomical concepts accessible to everyone. Whether you&apos;re 
                  a space enthusiast or just curious about the universe, APOD offers something 
                  fascinating every day.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Our website brings you this incredible content in a modern, user-friendly 
                  interface, making it easier than ever to explore the wonders of space.
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="relative h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl overflow-hidden border border-primary/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="text-center space-y-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Star className="h-16 w-16 text-primary mx-auto" />
                    </motion.div>
                    <motion.div 
                      className="text-lg font-semibold"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      Today&apos;s Featured Image
                    </motion.div>
                    <motion.div 
                      className="text-sm text-muted-foreground px-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      Experience breathtaking views of nebulae, galaxies, and cosmic phenomena
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Why Choose <span className="text-primary">NASA Facts</span>?
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We bring NASA&apos;s incredible APOD content to you in a modern, accessible way.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="group p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                variants={{
                  initial: { opacity: 0, y: 60, scale: 0.9 },
                  animate: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Explore the <span className="text-primary">Universe</span>?
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join millions of space enthusiasts who start their day with NASA&apos;s 
              incredible astronomical discoveries.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/daily-facts" className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Telescope className="h-5 w-5" />
                    </motion.div>
                    View Today&apos;s Image
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link href="/gallery">
                    Browse Gallery
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;