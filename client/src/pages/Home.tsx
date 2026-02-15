import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

/**
 * Matilda Media - Casino-themed media production website
 * Design: Dark blue and gold casino aesthetic
 * Features: Coin flip, slot machine (email), wheel of fortune (messages), confetti
 */

const SLOT_SYMBOLS = ['🍒', '🔔', '💎', 'BAR', '⭐', '🍋'];
const WIN_SYMBOL = '7';

// ─── Confetti ────────────────────────────────────────────────
function Confetti({ active, duration = 6000 }: { active: boolean; duration?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#D4AF37', '#FFD700', '#B8860B', '#DAA520', '#F0E68C', '#FF6B6B', '#4ECDC4', '#FF4444', '#44FF44'];
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      color: string; w: number; h: number; rotation: number; rotSpeed: number;
      gravity: number; drag: number; wobble: number; wobbleSpeed: number;
    }> = [];

    // Spawn particles in waves
    const spawnWave = () => {
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -20 - Math.random() * 300,
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          w: Math.random() * 10 + 4,
          h: Math.random() * 6 + 2,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 12,
          gravity: 0.03 + Math.random() * 0.02,
          drag: 0.99,
          wobble: Math.random() * 10,
          wobbleSpeed: 0.05 + Math.random() * 0.1,
        });
      }
    };

    spawnWave();
    const wave2 = setTimeout(spawnWave, 1500);
    const wave3 = setTimeout(spawnWave, 3000);

    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let anyVisible = false;
      particles.forEach(p => {
        if (p.y < canvas.height + 100) anyVisible = true;
        p.wobble += p.wobbleSpeed;
        p.vx += Math.sin(p.wobble) * 0.1;
        p.vx *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = elapsed > duration - 1000 ? Math.max(0, (duration - elapsed) / 1000) : 1;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (anyVisible && elapsed < duration) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(wave2);
      clearTimeout(wave3);
    };
  }, [active, duration]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />;
}

// ─── Slot Reel ───────────────────────────────────────────────
function SlotReel({ spinning, finalSymbol, delay, isWin }: {
  spinning: boolean; finalSymbol: string; delay: number; isWin: boolean;
}) {
  const [displaySymbol, setDisplaySymbol] = useState('?');
  const [isSpinning, setIsSpinning] = useState(false);
  const [stopped, setStopped] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (spinning) {
      setStopped(false);
      setIsSpinning(true);
      intervalRef.current = setInterval(() => {
        const allSymbols = [...SLOT_SYMBOLS, WIN_SYMBOL];
        setDisplaySymbol(allSymbols[Math.floor(Math.random() * allSymbols.length)]);
      }, 80);
      setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplaySymbol(finalSymbol);
        setIsSpinning(false);
        setStopped(true);
      }, delay);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [spinning, finalSymbol, delay]);

  return (
    <div className={`
      w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28
      bg-[oklch(0.08_0.02_250)]
      border-2 rounded-lg
      flex items-center justify-center
      transition-all duration-300
      ${stopped && isWin ? 'border-red-500 shadow-[0_0_20px_rgba(220,20,60,0.6)]' : 'border-[oklch(0.35_0.06_250)]'}
      ${isSpinning ? 'animate-pulse' : ''}
    `}>
      <span className={`
        text-2xl sm:text-3xl md:text-4xl font-bold select-none
        ${stopped && finalSymbol === WIN_SYMBOL ? 'text-red-500' : 'text-[oklch(0.75_0.15_85)]'}
        ${isSpinning ? 'blur-[1px]' : ''}
        transition-all duration-200
      `}>
        {displaySymbol}
      </span>
    </div>
  );
}

// ─── Wheel of Fortune (SVG) ─────────────────────────────────
function WheelOfFortune({ onResult, spinCount }: {
  onResult: (won: boolean) => void;
  spinCount: number;
}) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const spins = 5 + Math.random() * 3;
    // First 2 spins: land on red (180-360 range = bottom half)
    // 3rd spin: land on green (0-180 range = top half)
    const isWin = spinCount >= 2;
    const targetAngle = isWin
      ? 45 + Math.random() * 90   // Green zone (top)
      : 225 + Math.random() * 90; // Red zone (bottom)

    const totalRotation = rotation + (360 * spins) + targetAngle;
    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      onResult(isWin);
    }, 3500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        {/* Pointer at top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-[oklch(0.75_0.15_85)]" />
        </div>

        {/* Wheel */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full transition-transform duration-[3500ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Green half (top: 0-180deg) */}
          <path d="M 100 100 L 100 0 A 100 100 0 0 1 100 200 Z" fill="#22c55e" />
          {/* Red half (bottom: 180-360deg) */}
          <path d="M 100 100 L 100 200 A 100 100 0 0 1 100 0 Z" fill="#ef4444" />

          {/* Gold border */}
          <circle cx="100" cy="100" r="98" fill="none" stroke="#D4AF37" strokeWidth="4" />
          {/* Center divider */}
          <line x1="100" y1="0" x2="100" y2="200" stroke="#D4AF37" strokeWidth="3" />
          {/* Center dot */}
          <circle cx="100" cy="100" r="8" fill="#D4AF37" />
          <circle cx="100" cy="100" r="5" fill="#1a1a2e" />

          {/* Text on green half */}
          <text x="145" y="95" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 145, 95)">
            Viesti
          </text>
          <text x="145" y="115" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 145, 115)">
            lähetetään
          </text>

          {/* Text on red half */}
          <text x="55" y="95" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(90, 55, 95)">
            Viestiäsi ei
          </text>
          <text x="55" y="115" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(90, 55, 115)">
            lähetetä
          </text>
        </svg>
      </div>

      <Button
        onClick={spin}
        disabled={spinning}
        className="bg-[oklch(0.75_0.15_85)] text-[oklch(0.20_0.05_250)] hover:bg-[oklch(0.85_0.15_85)]
                 transition-all duration-300 hover:scale-105 font-bold text-lg px-8 py-3
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {spinning ? "Pyörii..." : "Pyöräytä!"}
      </Button>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function Home() {
  const [viewCount, setViewCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const targetViews = 22000000;
  const animationDuration = 360000;

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Coin flip
  const [coinPhase, setCoinPhase] = useState<'idle' | 'flipping' | 'landing' | 'done'>('idle');

  // Slot machine (for email reveal)
  const [showSlot, setShowSlot] = useState(false);
  const [slotSpinning, setSlotSpinning] = useState(false);
  const [slotSpinCount, setSlotSpinCount] = useState(0);
  const [reelSymbols, setReelSymbols] = useState(['?', '?', '?']);
  const [slotWon, setSlotWon] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);

  // Wheel of fortune (for message sending)
  const [showWheel, setShowWheel] = useState(false);
  const [wheelSpinCount, setWheelSpinCount] = useState(0);

  // Confetti
  const [showConfetti, setShowConfetti] = useState(false);

  // Email revealed
  const [emailRevealed, setEmailRevealed] = useState(false);

  // ─── Effects ─────────────────────────────────────────────
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      if (progress < 1) {
        const ease = 1 - Math.pow(1 - progress, 4);
        setViewCount(Math.floor(targetViews * ease));
      } else {
        setViewCount(targetViews);
        setIsAnimating(false);
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isAnimating) {
      let tid: ReturnType<typeof setTimeout>;
      const tick = () => {
        setViewCount(p => p + Math.floor(Math.random() * 5) + 1);
        tid = setTimeout(tick, (Math.floor(Math.random() * 4) + 1) * 1000);
      };
      tick();
      return () => clearTimeout(tid);
    }
  }, [isAnimating]);

  useEffect(() => {
    const calc = () => {
      const diff = new Date('2027-07-01T00:00:00').getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (n: number) => n.toLocaleString('fi-FI');
  const pad = (n: number) => n.toString().padStart(2, '0');

  // ─── Coin flip ───────────────────────────────────────────
  const handleCoinFlip = () => {
    if (coinPhase !== 'idle') return;
    setCoinPhase('flipping');
    setTimeout(() => setCoinPhase('landing'), 2000);
    setTimeout(() => {
      setCoinPhase('done');
      setShowSlot(true);
    }, 2800);
  };

  // ─── Slot machine ────────────────────────────────────────
  const handleSlotSpin = useCallback(() => {
    if (slotSpinning) return;
    setSlotSpinning(true);
    setLeverPulled(true);
    setTimeout(() => setLeverPulled(false), 500);

    const newCount = slotSpinCount + 1;
    setSlotSpinCount(newCount);

    let symbols: string[];
    if (newCount < 3) {
      const losingSets = [
        ['🍒', '🔔', '💎'], ['BAR', '⭐', '🍋'], ['🔔', '🍒', 'BAR'],
        ['💎', '🍋', '⭐'], ['🍋', 'BAR', '🔔'],
      ];
      symbols = losingSets[Math.floor(Math.random() * losingSets.length)];
    } else {
      symbols = [WIN_SYMBOL, WIN_SYMBOL, WIN_SYMBOL];
    }
    setReelSymbols(symbols);

    setTimeout(() => {
      setSlotSpinning(false);
      if (newCount < 3) {
        toast.error("Ei tärpännyt! Kokeile uudelleen 🎰", { duration: 3000 });
      } else {
        setSlotWon(true);
        setShowConfetti(true);
        setEmailRevealed(true);
        toast.success("🎰 7 7 7 – JACKPOT! Sähköposti paljastettu!", { duration: 5000 });
        setTimeout(() => setShowConfetti(false), 7000);
        setTimeout(() => setShowSlot(false), 3500);
      }
    }, 2600);
  }, [slotSpinning, slotSpinCount]);

  // ─── Form submit → show wheel ────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWheel(true);
  };

  // ─── Wheel result ────────────────────────────────────────
  const handleWheelResult = (won: boolean) => {
    const newCount = wheelSpinCount + 1;
    setWheelSpinCount(newCount);

    if (!won) {
      toast.error("Punainen! Viestiäsi ei lähetetty. Kokeile uudelleen!", { duration: 3000 });
    } else {
      toast.success("Vihreä! Viesti lähetetään!", { duration: 3000 });

      setTimeout(() => {
        const subject = encodeURIComponent(`Yhteydenotto: ${formData.name}`);
        const body = encodeURIComponent(`Nimi: ${formData.name}\nSähköposti: ${formData.email}\n\nViesti:\n${formData.message}`);
        window.location.href = `mailto:vili@matilda.media?subject=${subject}&body=${body}`;

        toast.success("Talletuksesi on saatu. Olen sinuun yhteydessä 1–37 arkipäivän kuluessa.", { duration: 6000 });
        setFormData({ name: "", email: "", message: "" });
        setShowWheel(false);
        setWheelSpinCount(0);
      }, 1500);
    }
  };

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-[oklch(0.12_0.03_250)] to-[oklch(0.08_0.02_250)]">
      <Confetti active={showConfetti} duration={7000} />

      {/* ═══ Hero ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
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
          <div className="mb-12 sm:mb-16 animate-fade-in-delay-2 px-4">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.75_0.15_85)] mb-3 tabular-nums">
              {fmt(viewCount)}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-[oklch(0.65_0.03_85)] font-light">
              Orgaanista näyttökertaa asiakkaideni sosiaalisen median kanavoissa,<br className="hidden sm:block" /> joihin sinäkin olet varmasti törmännyt.
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Services ═══ */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-10 sm:mb-14 text-[oklch(0.75_0.15_85)]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, letterSpacing: '0.02em' }}>
            Matilda Media jakaa pöydän: podcastit, klipit ja muun sisällön:
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {[
              { icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z', title: 'Podcastit', desc: 'Ääni, joka kantaa – strategiset siirrot podcasteina', from: '0.45_0.15_280', to: '0.25_0.12_280', glow: 'rgba(138,43,226,0.5)', text: '0.85_0.08_280' },
              { icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z|M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Klipit', desc: 'Nopeat voitot – iskevät klipit, jotka jäävät mieleen', from: '0.50_0.20_20', to: '0.30_0.18_20', glow: 'rgba(220,20,60,0.5)', text: '0.85_0.15_20' },
              { icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', title: 'Muu sisältö', desc: 'Jokeri hihassa – luovat ratkaisut kaikkiin mediatarpeisiin', from: '0.50_0.12_200', to: '0.30_0.10_200', glow: 'rgba(0,206,209,0.5)', text: '0.85_0.10_200' },
            ].map((s, i) => (
              <div key={i} className={`text-center group cursor-pointer ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <div className="mb-6">
                  <div className={`w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-2xl flex items-center justify-center
                    bg-gradient-to-br from-[oklch(${s.from})] to-[oklch(${s.to})]
                    transition-all duration-500 ease-out
                    group-hover:scale-105 group-hover:shadow-[0_0_40px_${s.glow}]
                    border border-[oklch(${s.from})]/30`}>
                    <svg className={`w-16 h-16 sm:w-20 sm:h-20 text-[oklch(${s.text})] transition-transform duration-500 group-hover:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {s.icon.split('|').map((d, j) => (
                        <path key={j} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
                      ))}
                    </svg>
                  </div>
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[oklch(${s.text})] transition-all duration-300 group-hover:scale-105`}>
                  {s.title}
                </h3>
                <p className="text-sm sm:text-base text-[oklch(0.65_0.03_85)] font-light px-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ About ═══ */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-transparent to-[oklch(0.15_0.04_250)]">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[oklch(0.75_0.15_85)]">Tietoa minusta</h2>
          <div className="text-base sm:text-lg text-[oklch(0.65_0.03_85)] font-light space-y-4 sm:space-y-6 px-4">
            <p>Matilda Media on erikoistunut uhkapeliteemaiseen mediaan: podcasteihin, klippeihin, äänityksiin, videoihin ja valokuviin, jotka resonoivat yleisön kanssa.</p>
            <p>Yli 22 miljoonaa orgaanista näyttökertaa kotiuttavat sen, että me osaamme luoda sisältöä, joka leviää ja jää mieleen.</p>
            <p className="text-[oklch(0.75_0.15_85)] font-medium">Peli on jo käynnissä – oletko mukana?</p>
          </div>
        </div>
      </section>

      {/* ═══ Countdown ═══ */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-3 sm:mb-4 text-[oklch(0.65_0.03_85)]">Uusi aikakausi alkaa pian...</h2>
          <p className="text-sm sm:text-base md:text-lg text-[oklch(0.55_0.03_85)] font-light mb-6 sm:mb-8 px-4">
            Uusi jako alkaa <span className="text-[oklch(0.65_0.03_85)]">1. heinäkuuta 2027 klo 00:00</span>
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 max-w-2xl mx-auto">
            {[
              { val: timeLeft.days, label: 'Päivää' },
              { val: pad(timeLeft.hours), label: 'Tuntia' },
              { val: pad(timeLeft.minutes), label: 'Min' },
              { val: pad(timeLeft.seconds), label: 'Sek' },
            ].map((t, i) => (
              <div key={i} className="bg-[oklch(0.18_0.04_250)]/50 border border-[oklch(0.75_0.15_85)]/10 rounded-lg p-2 sm:p-3 md:p-4 transition-all duration-300 hover:border-[oklch(0.75_0.15_85)]/30">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[oklch(0.65_0.03_85)] mb-1 tabular-nums">{t.val}</div>
                <div className="text-xs text-[oklch(0.55_0.03_85)] font-light uppercase tracking-wider">{t.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-[oklch(0.45_0.03_85)] font-light italic">Oletko valmis?</p>
        </div>
      </section>

      {/* ═══ Contact ═══ */}
      <section className="py-16 sm:py-20 md:py-24 px-4 border-t border-[oklch(0.75_0.15_85)]/20">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 text-[oklch(0.75_0.15_85)]">Yhteys jakajaan</h2>

          {/* Email reveal */}
          <div className="text-center mb-8 sm:mb-12">
            {!emailRevealed && coinPhase === 'idle' && (
              <button
                onClick={handleCoinFlip}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg
                         border-2 border-[oklch(0.75_0.15_85)]/40 
                         bg-transparent hover:bg-[oklch(0.75_0.15_85)]/10
                         transition-all duration-300 hover:scale-105 hover:border-[oklch(0.75_0.15_85)]"
              >
                <span className="text-3xl group-hover:animate-bounce">🪙</span>
                <span className="text-[oklch(0.75_0.15_85)] font-semibold text-base sm:text-lg">
                  Heitä kolikkoa paljastaaksesi sähköposti
                </span>
              </button>
            )}

            {(coinPhase === 'flipping' || coinPhase === 'landing') && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className={`text-6xl sm:text-7xl ${coinPhase === 'flipping' ? 'animate-coin-spin' : 'animate-coin-land'}`}>
                  🪙
                </div>
                <p className="text-[oklch(0.65_0.03_85)] text-sm">
                  {coinPhase === 'flipping' ? 'Kolikko pyörii...' : 'Kolikko laskeutuu...'}
                </p>
              </div>
            )}

            {coinPhase === 'done' && !emailRevealed && !showSlot && (
              <div className="animate-fade-in">
                <p className="text-[oklch(0.65_0.03_85)] mb-4">Kolikko tippui! Nyt tarvitset vielä jackpotin...</p>
                <button
                  onClick={() => setShowSlot(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
                           border-2 border-[oklch(0.75_0.15_85)]/40 bg-transparent
                           hover:bg-[oklch(0.75_0.15_85)]/10 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-2xl">🎰</span>
                  <span className="text-[oklch(0.75_0.15_85)] font-semibold">Avaa hedelmäpeli</span>
                </button>
              </div>
            )}

            {emailRevealed && (
              <div className="animate-fade-in">
                <p className="text-base sm:text-lg text-[oklch(0.65_0.03_85)]">
                  Ota yhteyttä sähköpostitse:{' '}
                  <a href="mailto:vili@matilda.media" className="text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.85_0.15_85)] transition-colors underline">
                    vili@matilda.media
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input type="text" placeholder="Nimi" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required
              className="bg-[oklch(0.18_0.04_250)] border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.85_0.03_85)] placeholder:text-[oklch(0.55_0.03_85)] focus:border-[oklch(0.75_0.15_85)] focus:ring-[oklch(0.75_0.15_85)]" />
            <Input type="email" placeholder="Sähköposti" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required
              className="bg-[oklch(0.18_0.04_250)] border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.85_0.03_85)] placeholder:text-[oklch(0.55_0.03_85)] focus:border-[oklch(0.75_0.15_85)] focus:ring-[oklch(0.75_0.15_85)]" />
            <Textarea placeholder="Viesti" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required rows={5}
              className="bg-[oklch(0.18_0.04_250)] border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.85_0.03_85)] placeholder:text-[oklch(0.55_0.03_85)] focus:border-[oklch(0.75_0.15_85)] focus:ring-[oklch(0.75_0.15_85)] resize-none" />
            <Button type="submit"
              className="w-full bg-[oklch(0.75_0.15_85)] text-[oklch(0.20_0.05_250)] hover:bg-[oklch(0.85_0.15_85)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] font-semibold text-lg py-6">
              Lähetä viesti
            </Button>
          </form>
        </div>
      </section>

      {/* ═══ Slot Machine Modal ═══ */}
      {showSlot && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-sm w-full">
            {/* Metal frame */}
            <div className="bg-gradient-to-b from-[#3a3a4a] via-[#2a2a3a] to-[#1a1a2a] rounded-2xl p-1 shadow-[0_0_60px_rgba(212,175,55,0.15)]">
              <div className="bg-gradient-to-b from-[oklch(0.16_0.04_250)] to-[oklch(0.10_0.03_250)] rounded-xl p-5 sm:p-6 border border-[oklch(0.75_0.15_85)]/20">

                {/* Top decorative bar */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-[oklch(0.75_0.15_85)]/40" />
                  <h3 className="text-xl sm:text-2xl font-bold text-[oklch(0.75_0.15_85)] tracking-wider">JACKPOT</h3>
                  <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-[oklch(0.75_0.15_85)]/40" />
                </div>

                <p className="text-center text-xs sm:text-sm text-[oklch(0.55_0.03_85)] mb-5">
                  Kolme punaista seiskaa = sähköposti paljastuu
                </p>

                {/* Reels area with metal inset */}
                <div className="bg-[oklch(0.06_0.01_250)] rounded-lg p-3 sm:p-4 mb-4 border border-[#3a3a4a]/50 shadow-inner">
                  <div className="flex justify-center gap-2 sm:gap-3">
                    <SlotReel spinning={slotSpinning} finalSymbol={reelSymbols[0]} delay={1200} isWin={slotWon} />
                    <SlotReel spinning={slotSpinning} finalSymbol={reelSymbols[1]} delay={1800} isWin={slotWon} />
                    <SlotReel spinning={slotSpinning} finalSymbol={reelSymbols[2]} delay={2400} isWin={slotWon} />
                  </div>

                  {/* Win line */}
                  <div className="flex items-center mt-3">
                    <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.15_85)] shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
                    <div className="flex-1 h-0.5 bg-[oklch(0.75_0.15_85)]/30" />
                    <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.15_85)] shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
                  </div>
                </div>

                {/* Controls */}
                {!slotWon && (
                  <div className="flex gap-3">
                    <Button onClick={handleSlotSpin} disabled={slotSpinning}
                      className="flex-1 bg-gradient-to-b from-[oklch(0.80_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.05_250)] hover:from-[oklch(0.85_0.15_85)] hover:to-[oklch(0.70_0.15_85)] font-bold text-base sm:text-lg py-3 sm:py-4 rounded-lg shadow-[0_4px_12px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95">
                      {slotSpinning ? "Pyörii..." : "VEDÄ"}
                    </Button>
                    {!slotSpinning && (
                      <Button onClick={() => { setShowSlot(false); setSlotSpinCount(0); setReelSymbols(['?', '?', '?']); }}
                        variant="outline" className="border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.75_0.15_85)]/10 py-3 sm:py-4">
                        Sulje
                      </Button>
                    )}
                  </div>
                )}

                {slotSpinCount > 0 && !slotWon && (
                  <p className="text-center text-[oklch(0.55_0.03_85)] text-xs sm:text-sm mt-3">Yritys {slotSpinCount}/3</p>
                )}

                {slotWon && (
                  <div className="text-center animate-fade-in py-2">
                    <p className="text-lg sm:text-xl font-bold text-red-500 mb-1">🎉 7 7 7 – JACKPOT! 🎉</p>
                    <p className="text-[oklch(0.65_0.03_85)] text-sm">Sähköposti paljastettu!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Lever on the right side */}
            <div className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-3 sm:w-4 h-24 sm:h-32 bg-gradient-to-b from-[#555] to-[#333] rounded-full relative">
                <div className={`absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-[0_0_10px_rgba(220,20,60,0.4)] border-2 border-red-400/50 transition-transform duration-500 ${leverPulled ? 'translate-y-16 sm:translate-y-20' : ''}`} />
              </div>
              <div className="w-5 sm:w-6 h-2 bg-[#444] rounded-b-lg mt-1" />
            </div>
          </div>
        </div>
      )}

      {/* ═══ Wheel of Fortune Modal ═══ */}
      {showWheel && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[oklch(0.18_0.04_250)] to-[oklch(0.12_0.03_250)] border-2 border-[oklch(0.75_0.15_85)]/40 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-[0_0_60px_rgba(212,175,55,0.15)]">
            <h3 className="text-xl sm:text-2xl font-bold text-[oklch(0.75_0.15_85)] text-center mb-2">Onnenpyörä</h3>
            <p className="text-center text-xs sm:text-sm text-[oklch(0.55_0.03_85)] mb-6">
              Pyöräytä vihreälle lähettääksesi viestisi!
            </p>

            <WheelOfFortune onResult={handleWheelResult} spinCount={wheelSpinCount} />

            {wheelSpinCount > 0 && (
              <p className="text-center text-[oklch(0.55_0.03_85)] text-xs sm:text-sm mt-4">Yritys {wheelSpinCount}/3</p>
            )}

            <div className="mt-4 text-center">
              <button onClick={() => { setShowWheel(false); setWheelSpinCount(0); }}
                className="text-[oklch(0.55_0.03_85)] text-sm hover:text-[oklch(0.75_0.15_85)] transition-colors underline">
                Peruuta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
