import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

/**
 * Matilda Media - Casino-themed media production website
 * Design: Simple, elegant dark blue and gold aesthetic with smooth animations
 * Focus: Content over decoration with dynamic interactions
 * Mobile-first responsive design
 */
export default function Home() {
  const [viewCount, setViewCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const targetViews = 18000000;
  const animationDuration = 180000; // 3 minutes in milliseconds

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    // Animate view counter from 0 to 18M over 3 minutes
    const startTime = Date.now();
    const animationTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      if (progress < 1) {
        // Smooth easing function for the animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setViewCount(Math.floor(targetViews * easeOutQuart));
      } else {
        setViewCount(targetViews);
        setIsAnimating(false);
        clearInterval(animationTimer);
      }
    }, 50);

    return () => clearInterval(animationTimer);
  }, []);

  useEffect(() => {
    // After animation, tick irregularly
    if (!isAnimating) {
      const irregularTick = () => {
        // Random increment between 1-5
        const increment = Math.floor(Math.random() * 5) + 1;
        setViewCount(prev => prev + increment);
        
        // Random delay between 1-4 seconds
        const delay = (Math.floor(Math.random() * 4) + 1) * 1000;
        setTimeout(irregularTick, delay);
      };

      irregularTick();
    }
  }, [isAnimating]);

  // Live countdown to July 1, 2027 00:00
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2027-07-01T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const countdownTimer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString('fi-FI');
  };

  const padZero = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = encodeURIComponent(`Yhteydenotto: ${formData.name}`);
    const body = encodeURIComponent(`Nimi: ${formData.name}\nSähköposti: ${formData.email}\n\nViesti:\n${formData.message}`);
    window.location.href = `mailto:vili@matilda.media?subject=${subject}&body=${body}`;
    
    toast.success("Sähköpostiohjelma avataan...");
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[oklch(0.12_0.03_250)] to-[oklch(0.08_0.02_250)]">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Enhanced animated background patterns */}
        <div className="absolute inset-0 opacity-5">
          {/* Spinning squares */}
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-[oklch(0.75_0.15_85)] rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-[oklch(0.75_0.15_85)] rotate-12 animate-spin-reverse"></div>
          <div className="absolute bottom-40 right-20 w-28 h-28 border-2 border-[oklch(0.75_0.15_85)] -rotate-12 animate-pulse-slow"></div>
          <div className="absolute bottom-60 left-40 w-20 h-20 border-2 border-[oklch(0.75_0.15_85)] rotate-45 animate-spin-slow"></div>
          
          {/* Bouncing elements */}
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-[oklch(0.75_0.15_85)] -rotate-12 animate-bounce-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-[oklch(0.75_0.15_85)] rotate-45 animate-bounce-slow"></div>
          
          {/* Circles */}
          <div className="absolute top-1/4 left-1/3 w-24 h-24 border-2 border-[oklch(0.75_0.15_85)] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-32 h-32 border-2 border-[oklch(0.75_0.15_85)] rounded-full animate-pulse-slow"></div>
          
          {/* Diamonds */}
          <div className="absolute top-2/3 left-1/2 w-20 h-20 border-2 border-[oklch(0.75_0.15_85)] rotate-45 animate-float"></div>
          <div className="absolute top-1/5 right-1/5 w-16 h-16 border-2 border-[oklch(0.75_0.15_85)] rotate-45 animate-float"></div>
        </div>

        <div className="text-center z-10 max-w-4xl w-full">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 gold-gradient animate-fade-in px-4">
            MATILDA MEDIA
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[oklch(0.75_0.15_85)] mb-8 sm:mb-12 font-light tracking-wide animate-fade-in-delay px-4">
            Pelin säännöt sanelevat sisällön
          </p>

          {/* View Counter */}
          <div className="mb-12 sm:mb-16 animate-fade-in-delay-2 px-4">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.75_0.15_85)] mb-3 tabular-nums transition-all duration-300">
              {formatNumber(viewCount)}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-[oklch(0.65_0.03_85)] font-light">
              Orgaanista näyttökertaa
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-[oklch(0.75_0.15_85)]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.05em' }}>
            PÖYDÄN ANTIMET
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Podcasts */}
            <div className="text-center group cursor-pointer">
              <div className="mb-6 relative">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-2xl flex items-center justify-center 
                              bg-gradient-to-br from-[oklch(0.45_0.15_280)] to-[oklch(0.25_0.12_280)]
                              transition-all duration-500 ease-out
                              group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(138,43,226,0.5)]
                              border border-[oklch(0.55_0.15_280)]/30">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[oklch(0.85_0.08_280)] transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[oklch(0.85_0.08_280)] transition-all duration-300 group-hover:text-[oklch(0.95_0.08_280)] group-hover:scale-105">
                Podcastit
              </h3>
              <p className="text-sm sm:text-base text-[oklch(0.65_0.03_85)] font-light transition-all duration-300 group-hover:text-[oklch(0.75_0.03_85)] px-2">
                Ääni, joka kantaa – strategiset siirrot podcasteina
              </p>
            </div>

            {/* Clips */}
            <div className="text-center group cursor-pointer">
              <div className="mb-6 relative">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-2xl flex items-center justify-center 
                              bg-gradient-to-br from-[oklch(0.50_0.20_20)] to-[oklch(0.30_0.18_20)]
                              transition-all duration-500 ease-out
                              group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(220,20,60,0.5)]
                              border border-[oklch(0.60_0.20_20)]/30">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[oklch(0.90_0.10_20)] transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[oklch(0.85_0.15_20)] transition-all duration-300 group-hover:text-[oklch(0.95_0.15_20)] group-hover:scale-105">
                Klipit
              </h3>
              <p className="text-sm sm:text-base text-[oklch(0.65_0.03_85)] font-light transition-all duration-300 group-hover:text-[oklch(0.75_0.03_85)] px-2">
                Nopeat voitot – iskevät klipit, jotka jäävät mieleen
              </p>
            </div>

            {/* Content */}
            <div className="text-center group cursor-pointer sm:col-span-2 lg:col-span-1">
              <div className="mb-6 relative">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-2xl flex items-center justify-center 
                              bg-gradient-to-br from-[oklch(0.50_0.12_200)] to-[oklch(0.30_0.10_200)]
                              transition-all duration-500 ease-out
                              group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(0,206,209,0.5)]
                              border border-[oklch(0.60_0.12_200)]/30">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[oklch(0.85_0.08_200)] transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[oklch(0.85_0.10_200)] transition-all duration-300 group-hover:text-[oklch(0.95_0.10_200)] group-hover:scale-105">
                Muu sisältö
              </h3>
              <p className="text-sm sm:text-base text-[oklch(0.65_0.03_85)] font-light transition-all duration-300 group-hover:text-[oklch(0.75_0.03_85)] px-2">
                Jokeri hihassa – luovat ratkaisut kaikkiin mediatarpeisiin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-transparent to-[oklch(0.15_0.04_250)]">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-[oklch(0.75_0.15_85)]">
            Peli alkaa pian...
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-[oklch(0.65_0.03_85)] font-light mb-8 sm:mb-10 px-4">
            Uusi jako alkaa <span className="text-[oklch(0.75_0.15_85)] font-semibold">1. heinäkuuta 2027 klo 00:00</span>
          </p>
          
          {/* Live Countdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 max-w-3xl mx-auto">
            {/* Days */}
            <div className="bg-[oklch(0.18_0.04_250)] border border-[oklch(0.75_0.15_85)]/30 rounded-lg p-3 sm:p-4 md:p-6 
                          transition-all duration-300 hover:scale-105 hover:border-[oklch(0.75_0.15_85)]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.75_0.15_85)] mb-1 sm:mb-2 tabular-nums">
                {timeLeft.days}
              </div>
              <div className="text-xs sm:text-sm text-[oklch(0.65_0.03_85)] font-light uppercase tracking-wider">
                Päivää
              </div>
            </div>

            {/* Hours */}
            <div className="bg-[oklch(0.18_0.04_250)] border border-[oklch(0.75_0.15_85)]/30 rounded-lg p-3 sm:p-4 md:p-6 
                          transition-all duration-300 hover:scale-105 hover:border-[oklch(0.75_0.15_85)]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.75_0.15_85)] mb-1 sm:mb-2 tabular-nums">
                {padZero(timeLeft.hours)}
              </div>
              <div className="text-xs sm:text-sm text-[oklch(0.65_0.03_85)] font-light uppercase tracking-wider">
                Tuntia
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-[oklch(0.18_0.04_250)] border border-[oklch(0.75_0.15_85)]/30 rounded-lg p-3 sm:p-4 md:p-6 
                          transition-all duration-300 hover:scale-105 hover:border-[oklch(0.75_0.15_85)]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.75_0.15_85)] mb-1 sm:mb-2 tabular-nums">
                {padZero(timeLeft.minutes)}
              </div>
              <div className="text-xs sm:text-sm text-[oklch(0.65_0.03_85)] font-light uppercase tracking-wider">
                Min
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-[oklch(0.18_0.04_250)] border border-[oklch(0.75_0.15_85)]/30 rounded-lg p-3 sm:p-4 md:p-6 
                          transition-all duration-300 hover:scale-105 hover:border-[oklch(0.75_0.15_85)]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.75_0.15_85)] mb-1 sm:mb-2 tabular-nums">
                {padZero(timeLeft.seconds)}
              </div>
              <div className="text-xs sm:text-sm text-[oklch(0.65_0.03_85)] font-light uppercase tracking-wider">
                Sek
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[oklch(0.55_0.03_85)] font-light italic px-4">
            Oletko valmis?
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 border-t border-[oklch(0.75_0.15_85)]/20">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 text-[oklch(0.75_0.15_85)]">
            Yhteys jakajaan
          </h2>
          
          <p className="text-center text-base sm:text-lg text-[oklch(0.65_0.03_85)] mb-8 sm:mb-12">
            Ota yhteyttä sähköpostitse: <a href="mailto:vili@matilda.media" className="text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.85_0.15_85)] transition-colors underline">vili@matilda.media</a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Nimi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-[oklch(0.18_0.04_250)] border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.85_0.03_85)] placeholder:text-[oklch(0.55_0.03_85)]
                         focus:border-[oklch(0.75_0.15_85)] focus:ring-[oklch(0.75_0.15_85)]"
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Sähköposti"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-[oklch(0.18_0.04_250)] border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.85_0.03_85)] placeholder:text-[oklch(0.55_0.03_85)]
                         focus:border-[oklch(0.75_0.15_85)] focus:ring-[oklch(0.75_0.15_85)]"
              />
            </div>
            
            <div>
              <Textarea
                placeholder="Viesti"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="bg-[oklch(0.18_0.04_250)] border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.85_0.03_85)] placeholder:text-[oklch(0.55_0.03_85)]
                         focus:border-[oklch(0.75_0.15_85)] focus:ring-[oklch(0.75_0.15_85)] resize-none"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[oklch(0.75_0.15_85)] text-[oklch(0.20_0.05_250)] hover:bg-[oklch(0.85_0.15_85)] 
                       transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
                       font-semibold text-lg py-6"
            >
              Lähetä viesti
            </Button>
          </form>

          <p className="text-center text-sm text-[oklch(0.55_0.03_85)] mt-8">
            Matilda Media – Lappeenranta, Suomi
          </p>
        </div>
      </section>
    </div>
  );
}
