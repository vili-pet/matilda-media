import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

/**
 * Matilda Media - Casino-themed media production website
 * Design: Dark blue and gold casino aesthetic
 * Features: Animated coin flip, slot machine captcha, confetti
 */

// Slot symbols
const SLOT_SYMBOLS = ['🍒', '🔔', '💎', 'BAR', '⭐', '🍋'];
const WIN_SYMBOL = '7';

// Confetti component
function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      color: string; size: number; rotation: number; rotationSpeed: number;
    }> = [];
    
    const colors = ['#D4AF37', '#FFD700', '#B8860B', '#DAA520', '#F0E68C', '#FF6B6B', '#4ECDC4'];
    
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }
    
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let allDone = true;
      particles.forEach(p => {
        if (p.y < canvas.height + 50) allDone = false;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.rotation += p.rotationSpeed;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      
      if (!allDone) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [active]);
  
  if (!active) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
}

// Slot Reel component
function SlotReel({ 
  spinning, 
  finalSymbol, 
  delay,
  isWin
}: { 
  spinning: boolean; 
  finalSymbol: string; 
  delay: number;
  isWin: boolean;
}) {
  const [displaySymbol, setDisplaySymbol] = useState('?');
  const [isSpinning, setIsSpinning] = useState(false);
  const [stopped, setStopped] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  useEffect(() => {
    if (spinning) {
      setStopped(false);
      setIsSpinning(true);
      
      // Rapidly cycle through symbols
      intervalRef.current = setInterval(() => {
        const allSymbols = [...SLOT_SYMBOLS, WIN_SYMBOL];
        setDisplaySymbol(allSymbols[Math.floor(Math.random() * allSymbols.length)]);
      }, 80);
      
      // Stop after delay
      setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplaySymbol(finalSymbol);
        setIsSpinning(false);
        setStopped(true);
      }, delay);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [spinning, finalSymbol, delay]);
  
  return (
    <div className={`
      w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 
      bg-[oklch(0.10_0.02_250)] 
      border-2 rounded-lg
      flex items-center justify-center
      transition-all duration-300
      ${stopped && isWin ? 'border-[oklch(0.60_0.25_25)] shadow-[0_0_20px_rgba(220,20,60,0.5)]' : 'border-[oklch(0.75_0.15_85)]/50'}
      ${isSpinning ? 'animate-pulse' : ''}
    `}>
      <span className={`
        text-3xl sm:text-4xl md:text-5xl font-bold select-none
        ${stopped && finalSymbol === WIN_SYMBOL ? 'text-red-500' : 'text-[oklch(0.75_0.15_85)]'}
        ${isSpinning ? 'blur-[1px]' : ''}
        transition-all duration-200
      `}>
        {displaySymbol}
      </span>
    </div>
  );
}

export default function Home() {
  const [viewCount, setViewCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const targetViews = 22000000;
  const animationDuration = 360000; // 6 minutes

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Contact form state
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Coin flip state
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [coinPhase, setCoinPhase] = useState<'idle' | 'flipping' | 'landing' | 'done'>('idle');

  // Slot machine state
  const [showSlot, setShowSlot] = useState(false);
  const [slotSpinning, setSlotSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [reelSymbols, setReelSymbols] = useState(['?', '?', '?']);
  const [slotWon, setSlotWon] = useState(false);

  // Confetti state
  const [showConfetti, setShowConfetti] = useState(false);

  // Email revealed state
  const [emailRevealed, setEmailRevealed] = useState(false);

  // View counter animation
  useEffect(() => {
    const startTime = Date.now();
    const animationTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      if (progress < 1) {
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

  // Irregular ticking after animation
  useEffect(() => {
    if (!isAnimating) {
      let timeoutId: ReturnType<typeof setTimeout>;
      const irregularTick = () => {
        const increment = Math.floor(Math.random() * 5) + 1;
        setViewCount(prev => prev + increment);
        const delay = (Math.floor(Math.random() * 4) + 1) * 1000;
        timeoutId = setTimeout(irregularTick, delay);
      };
      irregularTick();
      return () => clearTimeout(timeoutId);
    }
  }, [isAnimating]);

  // Live countdown
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

  const formatNumber = (num: number) => num.toLocaleString('fi-FI');
  const padZero = (num: number) => num.toString().padStart(2, '0');

  // Coin flip handler
  const handleCoinFlip = () => {
    if (coinPhase !== 'idle') return;
    setCoinFlipping(true);
    setCoinPhase('flipping');
    
    // After 2 seconds of spinning, start landing
    setTimeout(() => {
      setCoinPhase('landing');
    }, 2000);
    
    // After 2.5 seconds, show result
    setTimeout(() => {
      setCoinPhase('done');
      setCoinFlipping(false);
      // Don't reveal email yet - need to win slot machine
      setShowSlot(true);
    }, 2800);
  };

  // Slot machine spin handler
  const handleSlotSpin = useCallback(() => {
    if (slotSpinning) return;
    
    setSlotSpinning(true);
    const newSpinCount = spinCount + 1;
    setSpinCount(newSpinCount);
    
    let symbols: string[];
    if (newSpinCount < 3) {
      // First two spins: random losing combinations (no triple 7s)
      const losingSets = [
        ['🍒', '🔔', '💎'],
        ['BAR', '⭐', '🍋'],
        ['🔔', '🍒', 'BAR'],
        ['💎', '🍋', '⭐'],
        ['🍋', 'BAR', '🔔'],
      ];
      symbols = losingSets[Math.floor(Math.random() * losingSets.length)];
    } else {
      // Third spin: triple red 7s!
      symbols = [WIN_SYMBOL, WIN_SYMBOL, WIN_SYMBOL];
    }
    
    setReelSymbols(symbols);
    
    // Wait for all reels to stop (last reel stops at 2.4s)
    setTimeout(() => {
      setSlotSpinning(false);
      
      if (newSpinCount < 3) {
        toast.error("Ei tärpännyt! Kokeile uudelleen 🎰", { duration: 3000 });
      } else {
        // WIN!
        setSlotWon(true);
        setShowConfetti(true);
        setEmailRevealed(true);
        
        toast.success("🎰 7 7 7 – JACKPOT! Sähköposti paljastettu!", { duration: 5000 });
        
        // Hide confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000);
        
        // Close slot after 3 seconds
        setTimeout(() => setShowSlot(false), 3000);
      }
    }, 2600);
  }, [slotSpinning, spinCount]);

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Yhteydenotto: ${formData.name}`);
    const body = encodeURIComponent(`Nimi: ${formData.name}\nSähköposti: ${formData.email}\n\nViesti:\n${formData.message}`);
    window.location.href = `mailto:vili@matilda.media?subject=${subject}&body=${body}`;
    
    toast.success("Talletuksesi on saatu. Olen sinuun yhteydessä 1–37 arkipäivän kuluessa.", {
      duration: 6000,
    });
    
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[oklch(0.12_0.03_250)] to-[oklch(0.08_0.02_250)]">
      {/* Confetti overlay */}
      <Confetti active={showConfetti} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Casino slot symbols background - faded */}
        <div className="absolute inset-0 opacity-[0.03] text-[oklch(0.75_0.15_85)]">
          <div className="absolute top-20 left-10 text-6xl font-bold animate-spin-slow">7</div>
          <div className="absolute top-1/4 right-20 text-7xl font-bold animate-pulse-slow">7</div>
          <div className="absolute bottom-1/3 left-1/4 text-5xl font-bold animate-float">7</div>
          <div className="absolute top-1/3 left-1/3 text-4xl font-bold tracking-wider animate-bounce-slow">BAR</div>
          <div className="absolute bottom-1/4 right-1/3 text-5xl font-bold tracking-wider animate-pulse-slow">BAR</div>
          <div className="absolute top-1/2 right-1/4 text-6xl animate-spin-reverse">🍒</div>
          <div className="absolute bottom-40 left-20 text-5xl animate-float">🍒</div>
          <div className="absolute top-40 right-40 text-6xl animate-pulse-slow">💎</div>
          <div className="absolute bottom-1/2 left-[20%] text-5xl animate-spin-slow">💎</div>
          <div className="absolute top-2/3 right-[20%] text-5xl animate-bounce-slow">🔔</div>
          <div className="absolute top-[20%] left-[40%] text-4xl animate-float">🔔</div>
          <div className="absolute bottom-[20%] right-[40%] text-6xl animate-spin-reverse">⭐</div>
          <div className="absolute top-[16%] right-[16%] text-5xl animate-pulse-slow">⭐</div>
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
              Orgaanista näyttökertaa asiakkaideni sosiaalisen median kanavoissa,<br className="hidden sm:block" /> joihin sinäkin olet varmasti törmännyt.
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-10 sm:mb-14 text-[oklch(0.75_0.15_85)]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, letterSpacing: '0.02em' }}>
            Matilda Media jakaa pöydän: podcastit, klipit ja muun sisällön:
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

      {/* About Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-transparent to-[oklch(0.15_0.04_250)]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[oklch(0.75_0.15_85)]">
            Tietoa minusta
          </h2>
          
          <div className="text-base sm:text-lg text-[oklch(0.65_0.03_85)] font-light space-y-4 sm:space-y-6 px-4">
            <p>
              Matilda Media on erikoistunut uhkapeliteemaiseen mediaan: podcasteihin, klippeihin, äänityksiin, videoihin ja valokuviin, jotka resonoivat yleisön kanssa.
            </p>
            <p>
              Yli 22 miljoonaa orgaanista näyttökertaa kotiuttavat sen, että me osaamme luoda sisältöä, joka leviää ja jää mieleen.
            </p>
            <p className="text-[oklch(0.75_0.15_85)] font-medium">
              Peli on jo käynnissä – oletko mukana?
            </p>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-3 sm:mb-4 text-[oklch(0.65_0.03_85)]">
            Uusi aikakausi alkaa pian...
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-[oklch(0.55_0.03_85)] font-light mb-6 sm:mb-8 px-4">
            Uusi jako alkaa <span className="text-[oklch(0.65_0.03_85)]">1. heinäkuuta 2027 klo 00:00</span>
          </p>
          
          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 max-w-2xl mx-auto">
            <div className="bg-[oklch(0.18_0.04_250)]/50 border border-[oklch(0.75_0.15_85)]/10 rounded-lg p-2 sm:p-3 md:p-4 transition-all duration-300 hover:border-[oklch(0.75_0.15_85)]/30">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[oklch(0.65_0.03_85)] mb-1 tabular-nums">{timeLeft.days}</div>
              <div className="text-xs text-[oklch(0.55_0.03_85)] font-light uppercase tracking-wider">Päivää</div>
            </div>
            <div className="bg-[oklch(0.18_0.04_250)]/50 border border-[oklch(0.75_0.15_85)]/10 rounded-lg p-2 sm:p-3 md:p-4 transition-all duration-300 hover:border-[oklch(0.75_0.15_85)]/30">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[oklch(0.65_0.03_85)] mb-1 tabular-nums">{padZero(timeLeft.hours)}</div>
              <div className="text-xs text-[oklch(0.55_0.03_85)] font-light uppercase tracking-wider">Tuntia</div>
            </div>
            <div className="bg-[oklch(0.18_0.04_250)]/50 border border-[oklch(0.75_0.15_85)]/10 rounded-lg p-2 sm:p-3 md:p-4 transition-all duration-300 hover:border-[oklch(0.75_0.15_85)]/30">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[oklch(0.65_0.03_85)] mb-1 tabular-nums">{padZero(timeLeft.minutes)}</div>
              <div className="text-xs text-[oklch(0.55_0.03_85)] font-light uppercase tracking-wider">Min</div>
            </div>
            <div className="bg-[oklch(0.18_0.04_250)]/50 border border-[oklch(0.75_0.15_85)]/10 rounded-lg p-2 sm:p-3 md:p-4 transition-all duration-300 hover:border-[oklch(0.75_0.15_85)]/30">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[oklch(0.65_0.03_85)] mb-1 tabular-nums">{padZero(timeLeft.seconds)}</div>
              <div className="text-xs text-[oklch(0.55_0.03_85)] font-light uppercase tracking-wider">Sek</div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[oklch(0.45_0.03_85)] font-light italic px-4">
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
          
          {/* Email reveal with coin flip + slot machine */}
          <div className="text-center mb-8 sm:mb-12">
            {!emailRevealed && coinPhase === 'idle' && (
              <Button
                onClick={handleCoinFlip}
                className="bg-[oklch(0.75_0.15_85)] text-[oklch(0.20_0.05_250)] hover:bg-[oklch(0.85_0.15_85)] 
                         transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
                         font-semibold text-lg px-8 py-4"
              >
                🪙 Heitä kolikkoa paljastaaksesi sähköposti
              </Button>
            )}

            {/* Coin flip animation */}
            {(coinPhase === 'flipping' || coinPhase === 'landing') && (
              <div className="flex flex-col items-center gap-4">
                <div className={`
                  text-7xl sm:text-8xl
                  ${coinPhase === 'flipping' ? 'animate-coin-spin' : 'animate-coin-land'}
                `}>
                  🪙
                </div>
                <p className="text-[oklch(0.65_0.03_85)] text-sm">
                  {coinPhase === 'flipping' ? 'Kolikko pyörii...' : 'Kolikko laskeutuu...'}
                </p>
              </div>
            )}

            {/* After coin flip, show slot machine prompt */}
            {coinPhase === 'done' && !emailRevealed && !showSlot && (
              <div className="animate-fade-in">
                <p className="text-[oklch(0.65_0.03_85)] mb-4">Kolikko tippui! Nyt tarvitset vielä jackpotin...</p>
                <Button
                  onClick={() => setShowSlot(true)}
                  className="bg-[oklch(0.75_0.15_85)] text-[oklch(0.20_0.05_250)] hover:bg-[oklch(0.85_0.15_85)] 
                           transition-all duration-300 hover:scale-105 font-semibold text-lg px-8 py-4"
                >
                  🎰 Avaa hedelmäpeli
                </Button>
              </div>
            )}

            {/* Email revealed */}
            {emailRevealed && (
              <div className="animate-fade-in">
                <p className="text-base sm:text-lg text-[oklch(0.65_0.03_85)]">
                  Ota yhteyttä sähköpostitse: <a href="mailto:vili@matilda.media" className="text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.85_0.15_85)] transition-colors underline">vili@matilda.media</a>
                </p>
              </div>
            )}
          </div>

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
        </div>
      </section>

      {/* Slot Machine Modal */}
      {showSlot && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[oklch(0.18_0.04_250)] to-[oklch(0.12_0.03_250)] border-2 border-[oklch(0.75_0.15_85)] rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-[0_0_60px_rgba(212,175,55,0.2)]">
            {/* Slot machine header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-[oklch(0.75_0.15_85)] mb-2">
                🎰 JACKPOT
              </h3>
              <p className="text-sm text-[oklch(0.55_0.03_85)]">
                Saat kolme punaista seiskaa = sähköposti paljastuu
              </p>
            </div>

            {/* Slot reels */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-6">
              <SlotReel 
                spinning={slotSpinning} 
                finalSymbol={reelSymbols[0]} 
                delay={1200}
                isWin={slotWon}
              />
              <SlotReel 
                spinning={slotSpinning} 
                finalSymbol={reelSymbols[1]} 
                delay={1800}
                isWin={slotWon}
              />
              <SlotReel 
                spinning={slotSpinning} 
                finalSymbol={reelSymbols[2]} 
                delay={2400}
                isWin={slotWon}
              />
            </div>

            {/* Win line indicator */}
            <div className="flex justify-center mb-6">
              <div className="h-0.5 w-full max-w-[280px] bg-[oklch(0.75_0.15_85)]/30 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[oklch(0.75_0.15_85)]"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[oklch(0.75_0.15_85)]"></div>
              </div>
            </div>

            {/* Spin button */}
            {!slotWon && (
              <div className="flex gap-3">
                <Button
                  onClick={handleSlotSpin}
                  disabled={slotSpinning}
                  className="flex-1 bg-[oklch(0.75_0.15_85)] text-[oklch(0.20_0.05_250)] hover:bg-[oklch(0.85_0.15_85)] 
                           transition-all duration-300 hover:scale-105 font-bold text-lg py-4
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {slotSpinning ? "Pyörii..." : "VEDÄ"}
                </Button>
                
                {!slotSpinning && (
                  <Button
                    onClick={() => {
                      setShowSlot(false);
                      setSpinCount(0);
                      setReelSymbols(['?', '?', '?']);
                    }}
                    variant="outline"
                    className="border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.75_0.15_85)]/10 py-4"
                  >
                    Sulje
                  </Button>
                )}
              </div>
            )}

            {/* Spin counter */}
            {spinCount > 0 && !slotWon && (
              <p className="text-center text-[oklch(0.55_0.03_85)] text-sm mt-4">
                Yritys {spinCount}/3
              </p>
            )}

            {/* Win message */}
            {slotWon && (
              <div className="text-center animate-fade-in">
                <p className="text-xl font-bold text-red-500 mb-2">
                  🎉 7 7 7 – JACKPOT! 🎉
                </p>
                <p className="text-[oklch(0.65_0.03_85)] text-sm">
                  Sähköposti paljastettu!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
