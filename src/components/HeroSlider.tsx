import React, { useEffect, useRef, useState } from 'react';
import { Slide } from '../context/SiteContext';
type HeroSliderProps = {
  slides: Slide[];
  bgImage?: string;
  height?: string;
  children?: React.ReactNode;
};
export function HeroSlider({
  slides,
  bgImage = 'https://images.unsplash.com/photo-1541888081622-15cb2a061487?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  height = 'py-24 lg:py-32',
  children
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mountedRef = useRef(true);
  const slidesLenRef = useRef(slides?.length ?? 0);
  slidesLenRef.current = slides?.length ?? 0;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      if (mountedRef.current) {
        setCurrentIndex((prev) => (prev + 1) % slidesLenRef.current);
      }
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides?.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover opacity-30" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${height} flex flex-col justify-center min-h-[400px]`}>

        <div className="max-w-3xl relative h-[200px] md:h-[250px]">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-all duration-500 ease-in-out"
              style={{
                opacity: idx === currentIndex ? 1 : 0,
                transform: `translateY(${idx === currentIndex ? 0 : '12px'})`,
                pointerEvents: idx === currentIndex ? 'auto' : 'none',
              }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {slide.title.split("l'avenir").length > 1 ?
                  <>
                    {slide.title.split("l'avenir")[0]}
                    <span className="text-red-500">l'avenir</span>
                    {slide.title.split("l'avenir")[1]}
                  </> :
                  slide.title
                }
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10">
                {slide.subtitle}
              </p>
            </div>
          ))}
        </div>

        {children && <div className="relative z-10 mt-4">{children}</div>}
      </div>
    </section>
  );
}