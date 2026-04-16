import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon, Sparkles, Layers, Cpu } from 'lucide-react';
import { slides, SlideData } from './slidesData';

// Note: Using the provided photo and logo from the user request
const USER_PHOTO = "https://drive.google.com/uc?export=view&id=1G6Yht6reZxqGIofRpsbUeBVnme8T2C7u"; 
const LOGO_URL = "https://ais-pre-ldjic77mffub2wqfuevnkn-401725063697.us-east1.run.app/api/attachments/401725063697/ldjic77mffub2wqfuevnkn/01JPV2XH06S789C4X56J65873W/image.png";

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slides[currentSlideIndex];

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const renderLayout = (slide: SlideData) => {
    switch (slide.layout) {
      case 'focus':
        return (
          <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-purple-400" />
            </motion.div>
            <motion.h1 
              className="text-6xl lg:text-8xl font-serif italic font-bold tracking-tight text-glow"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {slide.title}
            </motion.h1>
            <motion.div className="space-y-6">
              {slide.points.map((p, i) => (
                <p key={i} className="text-2xl text-white/60 font-light leading-relaxed">{p}</p>
              ))}
            </motion.div>
          </div>
        );
      case 'bento':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full">
            <div className="flex flex-col justify-center space-y-8">
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">{slide.title}</h1>
              <div className="space-y-4">
                {slide.points.map((p, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <p className="text-lg text-white/80">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden">
               <Layers className="w-32 h-32 text-white/5 absolute -bottom-8 -right-8 rotate-12" />
               <div className="text-center p-12">
                 <span className="text-xs font-mono text-purple-400 uppercase tracking-[1em]">Atmosphere</span>
                 <p className="text-4xl font-serif italic mt-4">Visual Emotion</p>
               </div>
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="flex flex-col justify-center items-start space-y-16 max-w-4xl">
            <div className="space-y-4">
              <span className="text-purple-500 font-mono text-sm tracking-widest uppercase">Process Flow</span>
              <h1 className="text-7xl font-light tracking-tighter leading-tight">{slide.title}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {slide.points.map((p, i) => (
                <div key={i} className="space-y-4">
                  <span className="text-4xl font-serif italic text-purple-500/50">0{i+1}</span>
                  <p className="text-lg text-white/70 leading-snug">{p}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
            <div className={`flex-1 flex flex-col justify-center space-y-12 ${slide.illustration ? 'lg:w-1/2' : 'w-full max-w-4xl'}`}>
              <motion.h1 
                className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                {slide.title}
              </motion.h1>
              <ul className="space-y-8">
                {slide.points.map((point, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start space-x-6 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="mt-3 w-12 h-[1px] bg-purple-500 group-hover:w-20 transition-all" />
                    <span className="text-xl lg:text-2xl text-white/60 group-hover:text-white transition-colors font-light">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
            {slide.illustration && (
              <div className="lg:w-1/2 w-full aspect-square lg:aspect-video bg-white/[0.02] border border-white/5 rounded-[40px] flex items-center justify-center relative overflow-hidden group shadow-2xl">
                {slide.id === 0 ? (
                  <img src={USER_PHOTO} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                ) : (
                  <div className="flex flex-col items-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <Cpu className="w-20 h-20 mb-6 text-purple-500" />
                    <span className="text-[10px] font-mono tracking-[1em] uppercase">Creative Engine</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
      <div className="grain" />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/10 blur-[180px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-900/10 blur-[180px] rounded-full" 
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.main
          key={currentSlide.id}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full h-screen flex flex-col items-center justify-center p-12 lg:p-24"
        >
          <div className="w-full max-w-7xl h-full flex flex-col relative">
            
            {/* Header */}
            <div className="w-full flex justify-between items-start mb-12">
              <div className="space-y-2">
                <span className="text-purple-500 font-mono text-xs tracking-[0.5em] uppercase block">
                  {currentSlide.section || "Vision"}
                </span>
                <div className="h-[2px] w-24 bg-gradient-to-r from-purple-500 to-transparent" />
              </div>

              {/* Creative Video Space */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-64 h-40 bg-black border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Play className="w-12 h-12 text-white/20 group-hover:text-purple-400 group-hover:scale-125 transition-all duration-500" />
                  <div className="absolute top-3 left-3 flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center">
              {renderLayout(currentSlide)}
            </div>

            {/* Footer */}
            <div className="w-full flex justify-between items-end mt-12">
              <div className="flex flex-col space-y-4">
                <div className="flex items-baseline space-x-4">
                  <span className="text-5xl font-serif italic text-white/10">{String(currentSlide.id + 1).padStart(2, '0')}</span>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em]">Sequence</span>
                </div>
                <div className="w-64 h-[1px] bg-white/10 relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Logo */}
              <div className="flex items-center space-x-6 group cursor-pointer">
                <div className="relative">
                  <div className="absolute -inset-2 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={LOGO_URL} alt="Logo" className="w-16 h-16 object-contain relative z-10" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col border-l border-white/10 pl-6">
                  <span className="text-lg font-black tracking-[0.3em] uppercase">CULT CLIPSY</span>
                  <span className="text-[9px] tracking-[0.6em] uppercase text-white/30">Future Aesthetics</span>
                </div>
              </div>
            </div>
          </div>
        </motion.main>
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-12 bg-white/[0.03] backdrop-blur-3xl border border-white/10 px-10 py-5 rounded-full shadow-2xl">
        <button 
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className="text-white/40 hover:text-white disabled:opacity-5 transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div className="hidden lg:flex items-center space-x-3">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-1 rounded-full cursor-pointer transition-all duration-500 ${idx === currentSlideIndex ? 'w-8 bg-purple-500' : 'w-1 bg-white/10 hover:bg-white/30'}`} 
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          disabled={currentSlideIndex === slides.length - 1}
          className="text-white/40 hover:text-white disabled:opacity-5 transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
