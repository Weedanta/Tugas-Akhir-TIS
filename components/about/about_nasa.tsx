// components/pages/about-nasa-page.tsx
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Star, 
  Globe, 
  Satellite,
  Users,
  Target,
  ChevronRight,
  Telescope,
  Zap,
  Atom,
  Orbit,
  Space
} from 'lucide-react';

const AboutNASAPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animated Counter Component
  const AnimatedCounter = ({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = React.useState(0);
    const counterRef = useRef(null);
    const inView = useInView(counterRef);

    React.useEffect(() => {
      if (inView) {
        let startTime: number;
        
        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          const currentCount = Math.floor(progress * value);
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };
        
        requestAnimationFrame(animateCount);
      }
    }, [inView, value, duration]);

    return <span ref={counterRef}>{count.toLocaleString()}{suffix}</span>;
  };

  const programs = [
    {
      icon: Orbit,
      title: "Artemis Program",
      description: "Return humans to the Moon and establish a sustainable presence",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Space,
      title: "Mars Exploration",
      description: "Robotic missions preparing for human exploration of Mars",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Star,
      title: "James Webb Space Telescope",
      description: "Observing the universe's first galaxies and exoplanets",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Atom,
      title: "Earth Science",
      description: "Monitoring our planet's climate and environmental changes",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const achievements = [
    { icon: Rocket, title: "Moon Landing", year: "1969", description: "First humans on the Moon with Apollo 11" },
    { icon: Satellite, title: "International Space Station", year: "1998", description: "Continuous human presence in space" },
    { icon: Telescope, title: "Hubble Space Telescope", year: "1990", description: "Revolutionary deep space observations" },
    { icon: Globe, title: "Mars Exploration", year: "2021", description: "Perseverance rover searching for life" },
  ];

  const timeline = [
    { year: "1958", event: "NASA Established", description: "Founded as America's civilian space agency" },
    { year: "1961", event: "First American in Space", description: "Alan Shepard's suborbital flight" },
    { year: "1969", event: "Moon Landing", description: "Apollo 11 - One giant leap for mankind" },
    { year: "1981", event: "Space Shuttle Era", description: "Reusable spacecraft program begins" },
    { year: "1990", event: "Hubble Launched", description: "Revolutionary space telescope deployed" },
    { year: "2020", event: "Commercial Crew", description: "SpaceX Crew Dragon certified for astronauts" },
  ];

  const stats = [
    { value: 65, suffix: "+", label: "Years of Exploration" },
    { value: 400, suffix: "+", label: "Crewed Missions" },
    { value: 18000, suffix: "+", label: "Employees" },
    { value: 24, suffix: "", label: "Billion Dollar Budget" }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div ref={containerRef} className=" bg-background -mt-32 ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="h-4 w-4 sm:h-6 sm:w-6 text-blue-400" />
              </motion.div>
              <span className="text-sm sm:text-lg font-medium text-blue-300">National Aeronautics and Space Administration</span>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                NASA
              </span>
            </motion.h1>

            <motion.p 
              className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              For over six decades, NASA has been pushing the boundaries of human knowledge, 
              exploring the cosmos, and inspiring generations to reach for the stars.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8">
                  <Link href="/daily-facts" className="flex items-center gap-2 justify-center">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                    Explore APOD
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8">
                  <Link href="https://nasa.gov" target="_blank">
                    Official NASA
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-10  transform  w-full px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex justify-between gap-4 bg sm:gap-8 text-center max-w-2xl sm:max-w-none mx-auto">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="space-y-1 sm:space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-primary">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <motion.section 
        className="py-12 sm:py-20 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              Our <span className="text-primary">Mission</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
              To drive advances in science, technology, aeronautics, and space exploration to enhance 
              knowledge, education, innovation, economic vitality, and stewardship of Earth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Target className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Explore",
                description: "Advance our understanding of Earth, the solar system, and the universe beyond."
              },
              {
                icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Inspire",
                description: "Engage the public in space exploration and scientific discovery through education."
              },
              {
                icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />,
                title: "Innovate",
                description: "Drive technological advancement that benefits life on Earth and enables space exploration."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 sm:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-primary mb-4 flex justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2, type: "spring" }}
                  viewport={{ once: true }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        className="py-12 sm:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              Historic <span className="text-primary">Milestones</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Key achievements that shaped our understanding of the universe
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ top: "2rem", bottom: "2rem" }}
            />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div 
                      className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <motion.div 
                        className="text-2xl font-bold text-primary mb-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.2, type: "spring" }}
                        viewport={{ once: true }}
                      >
                        {item.year}
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">{item.event}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2, type: "spring" }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative">
            {/* Mobile Timeline Line */}
            <motion.div 
              className="absolute left-4 top-8 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "calc(100% - 4rem)" }}
              transition={{ duration: 2, ease: "easeOut" }}
              viewport={{ once: true }}
            />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Mobile Timeline Dot */}
                  <motion.div 
                    className="w-3 h-3 bg-primary rounded-full border-2 border-background shadow-lg mr-4 mt-2 flex-shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2, type: "spring" }}
                    viewport={{ once: true }}
                  />

                  <motion.div 
                    className="bg-card border border-border rounded-xl p-4 shadow-lg flex-1"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className="text-lg sm:text-xl font-bold text-primary mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.2, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      {item.year}
                    </motion.div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">{item.event}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Current Programs Section */}
      <motion.section 
        className="py-12 sm:py-20 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              Current <span className="text-primary">Programs</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Leading the frontier of space exploration and scientific discovery
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {programs.map((program, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border hover:border-primary/50 transition-all duration-500"
                variants={{
                  initial: { opacity: 0, y: 60, scale: 0.9 },
                  animate: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.8, 
                      delay: index * 0.2,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className="relative p-6 sm:p-8">
                  <motion.div 
                    className="text-primary mb-4 sm:mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    <program.icon className="h-8 w-8 sm:h-12 sm:w-12" />
                  </motion.div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                    {program.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                    {program.description}
                  </p>
                  
                  <motion.div 
                    className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    Learn More <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section 
        className="py-12 sm:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              Greatest <span className="text-primary">Achievements</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Monumental accomplishments that changed our perspective of the universe
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="group text-center p-4 sm:p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                variants={{
                  initial: { opacity: 0, y: 60, rotateY: -20 },
                  animate: { 
                    opacity: 1, 
                    y: 0, 
                    rotateY: 0,
                    transition: { 
                      duration: 0.8, 
                      delay: index * 0.15,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="text-primary mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300"
                  initial={{ scale: 0, rotate: 180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.15, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <achievement.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </motion.div>
                
                <motion.div 
                  className="text-base sm:text-lg font-bold text-primary mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {achievement.year}
                </motion.div>
                
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                  {achievement.title}
                </h3>
                
                <motion.p 
                  className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {achievement.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-12 sm:py-20 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="space-y-6 sm:space-y-8"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-6xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to <span className="text-primary">Explore</span>?
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Discover the wonders of space through NASA&apos;s daily astronomical pictures 
              and join the journey of cosmic exploration.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button asChild size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8">
                  <Link href="/daily-facts" className="flex items-center gap-2 justify-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Telescope className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                    View Today&apos;s APOD
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8">
                  <Link href="/gallery">
                    Explore Gallery
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

export default AboutNASAPage;