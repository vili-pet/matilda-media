import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * Matilda Media - Casino-themed media production website
 * Design: Dark navy blue and gold casino aesthetic
 * Contact flow: Coin flip → Slot (777) → Wheel of Fortune (true random) → email reveal
 */

const SLOT_SYMBOLS = ['🍒', '🔔', '💎', 'BAR', '⭐', '🍋'];
const WIN_SYMBOL = '7';

// ─── Confetti ────────────────────────────────────────────────
function Confetti({ active, duration = 7000 }: { active: boolean; duration?: number }) {
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
    const spawnWave = () => {
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width, y: -20 - Math.random() * 300,
          vx: (Math.random() - 0.5) * 8, vy: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          w: Math.random() * 10 + 4, h: Math.random() * 6 + 2,
          rotation: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 12,
          gravity: 0.03 + Math.random() * 0.02, drag: 0.99,
          wobble: Math.random() * 10, wobbleSpeed: 0.05 + Math.random() * 0.1,
        });
      }
    };
    spawnWave();
    const w2 = setTimeout(spawnWave, 1500);
    const w3 = setTimeout(spawnWave, 3000);
    let animId: number;
    const t0 = Date.now();
    const animate = () => {
      const el = Date.now() - t0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let vis = false;
      particles.forEach(p => {
        if (p.y < canvas.height + 100) vis = true;
        p.wobble += p.wobbleSpeed; p.vx += Math.sin(p.wobble) * 0.1;
        p.vx *= p.drag; p.vy += p.gravity; p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = el > duration - 1000 ? Math.max(0, (duration - el) / 1000) : 1;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      if (vis && el < duration) animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); clearTimeout(w2); clearTimeout(w3); };
  }, [active, duration]);
  if (!active) return null;
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />;
}

// ─── Slot Reel ───────────────────────────────────────────────
function SlotReel({ spinning, finalSymbol, delay, isWin }: {
  spinning: boolean; finalSymbol: string; delay: number; isWin: boolean;
}) {
  const [display, setDisplay] = useState('?');
  const [isSpinning, setIsSpinning] = useState(false);
  const [stopped, setStopped] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (spinning) {
      setStopped(false); setIsSpinning(true);
      ref.current = setInterval(() => {
        setDisplay([...SLOT_SYMBOLS, WIN_SYMBOL][Math.floor(Math.random() * 7)]);
      }, 80);
      setTimeout(() => {
        if (ref.current) clearInterval(ref.current);
        setDisplay(finalSymbol); setIsSpinning(false); setStopped(true);
      }, delay);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [spinning, finalSymbol, delay]);
  return (
    <div className={`w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 bg-[oklch(0.08_0.02_250)] border-2 rounded-lg flex items-center justify-center transition-all duration-300
      ${stopped && isWin ? 'border-red-500 shadow-[0_0_20px_rgba(220,20,60,0.6)]' : 'border-[oklch(0.35_0.06_250)]'}
      ${isSpinning ? 'animate-pulse' : ''}`}>
      <span className={`text-2xl sm:text-3xl md:text-4xl font-bold select-none
        ${stopped && finalSymbol === WIN_SYMBOL ? 'text-red-500' : 'text-[oklch(0.75_0.15_85)]'}
        ${isSpinning ? 'blur-[1px]' : ''} transition-all duration-200`}>
        {display}
      </span>
    </div>
  );
}

// ─── Wheel of Fortune (TRUE RANDOM) ─────────────────────────
// SVG Layout:
//   The GREEN half is drawn as a semicircle on the RIGHT side of the SVG (center of green = 90° in SVG space).
//   The RED half is drawn as a semicircle on the LEFT side of the SVG (center of red = 270° in SVG space).
//   The pointer sits at the TOP of the wheel (12 o'clock = 0° in SVG space).
//
// How CSS rotation works:
//   CSS `rotate(Xdeg)` rotates the entire SVG clockwise by X degrees.
//   To bring the GREEN center (90° in SVG) under the pointer (0°), we need to rotate the wheel by -90° (or +270°).
//   To bring the RED center (270° in SVG) under the pointer (0°), we need to rotate the wheel by -270° (or +90°).
//
// So:
//   WIN (green under pointer): final normalized angle should be in range 225°–315° (center 270°)
//   LOSE (red under pointer):  final normalized angle should be in range 45°–135° (center 90°)
//   We add a safety margin of 15° from the divider lines to avoid ambiguity.

function WheelOfFortune({ onResult }: { onResult: (won: boolean) => void }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<'none' | 'win' | 'lose'>('none');

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setLastResult('none');

    // TRUE RANDOM - 50/50 chance every spin
    const isWin = Math.random() < 0.5;

    const fullSpins = 6 + Math.floor(Math.random() * 3); // 6-8 full rotations
    
    // Calculate target angle (where the wheel stops, normalized 0-360)
    // GREEN half center is at SVG 90° → to put it under pointer, wheel must rotate 270° 
    // RED half center is at SVG 270° → to put it under pointer, wheel must rotate 90°
    let targetAngle: number;
    if (isWin) {
      // KORJATTU: Jotta vihreä (oikea puoli) osuu ylös,
      // rengasta täytyy pyörittää 240-300 astetta.
      targetAngle = 240 + Math.random() * 60; // 240°-300° range
    } else {
      // KORJATTU: Jotta punainen (vasen puoli) osuu ylös,
      // rengasta täytyy pyörittää 60-120 astetta.
      targetAngle = 60 + Math.random() * 60;  // 60°-120° range
    }
    
    const total = rotation + (360 * fullSpins) + targetAngle;
    setRotation(total);
    
    setTimeout(() => {
      setSpinning(false);
      setLastResult(isWin ? 'win' : 'lose');
      onResult(isWin);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        {/* Pointer at top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[22px] border-t-[oklch(0.75_0.15_85)] drop-shadow-[0_2px_4px_rgba(212,175,55,0.6)]" />
        </div>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}>
          {/* GREEN = RIGHT half of SVG (clockwise arc from top-center to bottom-center via right) */}
          <path d="M 100 100 L 100 0 A 100 100 0 0 1 100 200 Z" fill="#16a34a" />
          {/* RED = LEFT half of SVG (clockwise arc from bottom-center to top-center via left) */}
          <path d="M 100 100 L 100 200 A 100 100 0 0 1 100 0 Z" fill="#dc2626" />
          {/* Gold border */}
          <circle cx="100" cy="100" r="98" fill="none" stroke="#D4AF37" strokeWidth="4" />
          {/* Divider line (vertical) */}
          <line x1="100" y1="0" x2="100" y2="200" stroke="#D4AF37" strokeWidth="3" />
          {/* Center hub */}
          <circle cx="100" cy="100" r="10" fill="#D4AF37" />
          <circle cx="100" cy="100" r="6" fill="#1a1a2e" />
          {/* Green text (right side, centered at x=150) */}
          <text x="150" y="95" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Yhteystiedot</text>
          <text x="150" y="112" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">paljastetaan</text>
          {/* Red text (left side, centered at x=50) */}
          <text x="50" y="95" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">Ei</text>
          <text x="50" y="112" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">tällä kertaa</text>
        </svg>
      </div>
      {lastResult !== 'none' && (
        <p className={`text-sm font-semibold ${lastResult === 'win' ? 'text-green-400' : 'text-red-400'}`}>
          {lastResult === 'win' ? '🎉 Vihreä – voitit!' : '❌ Punainen – ei tällä kertaa'}
        </p>
      )}
      <Button onClick={spin} disabled={spinning}
        className="bg-gradient-to-b from-[oklch(0.80_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.05_250)] hover:from-[oklch(0.85_0.15_85)] hover:to-[oklch(0.70_0.15_85)] transition-all duration-300 hover:scale-105 font-bold text-base px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(212,175,55,0.3)]">
        {spinning ? "Pyörii..." : "Pyöräytä!"}
      </Button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function Home() {
  const [viewCount, setViewCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const targetViews = 22000000;
  const animationDuration = 360000; // 6 minutes
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Contact flow: coin → slot → wheel → email
  const [contactPhase, setContactPhase] = useState<'idle' | 'coin-flipping' | 'coin-landing' | 'coin-done' | 'slot' | 'slot-won' | 'wheel' | 'revealed'>('idle');
  const [slotSpinning, setSlotSpinning] = useState(false);
  const [slotSpinCount, setSlotSpinCount] = useState(0);
  const [reelSymbols, setReelSymbols] = useState(['?', '?', '?']);
  const [slotWon, setSlotWon] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // ─── View counter ────────────────────────────────────────
  useEffect(() => {
    const t0 = Date.now();
    const timer = setInterval(() => {
      const p = Math.min((Date.now() - t0) / animationDuration, 1);
      if (p < 1) { setViewCount(Math.floor(targetViews * (1 - Math.pow(1 - p, 4)))); }
      else { setViewCount(targetViews); setIsAnimating(false); clearInterval(timer); }
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

  // ─── Countdown ───────────────────────────────────────────
  useEffect(() => {
    const calc = () => {
      const diff = new Date('2027-07-01T00:00:00').getTime() - Date.now();
      if (diff > 0) setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (n: number) => n.toLocaleString('fi-FI');
  const pad = (n: number) => n.toString().padStart(2, '0');

  // ─── Coin flip ───────────────────────────────────────────
  const handleCoinFlip = () => {
    if (contactPhase !== 'idle') return;
    setContactPhase('coin-flipping');
    setTimeout(() => setContactPhase('coin-landing'), 2500);
    setTimeout(() => setContactPhase('coin-done'), 3500);
  };

  // ─── Slot machine ────────────────────────────────────────
  const handleSlotSpin = useCallback(() => {
    if (slotSpinning) return;
    setSlotSpinning(true); setLeverPulled(true);
    setTimeout(() => setLeverPulled(false), 500);
    const nc = slotSpinCount + 1;
    setSlotSpinCount(nc);
    const symbols = nc < 3
      ? [['🍒','🔔','💎'],['BAR','⭐','🍋'],['🔔','🍒','BAR'],['💎','🍋','⭐']][Math.floor(Math.random()*4)]
      : [WIN_SYMBOL, WIN_SYMBOL, WIN_SYMBOL];
    setReelSymbols(symbols);
    setTimeout(() => {
      setSlotSpinning(false);
      if (nc < 3) {
        toast.error("Ei tärpännyt! Kokeile uudelleen 🎰", { duration: 3000 });
      } else {
        setSlotWon(true);
        toast.success("🎰 7 7 7 – JACKPOT!", { duration: 4000 });
        // After brief celebration, move to wheel
        setTimeout(() => setContactPhase('wheel'), 2500);
      }
    }, 2600);
  }, [slotSpinning, slotSpinCount]);

  // ─── Wheel result (true random) ──────────────────────────
  const handleWheelResult = (won: boolean) => {
    if (won) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 7000);
      toast.success("🎉 Yhteystiedot paljastettu!", { duration: 5000 });
      setContactPhase('revealed');
    } else {
      toast.error("Ei tällä kertaa! Pyöräytä uudelleen.", { duration: 3000 });
    }
  };

  // ─── Render ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-[oklch(0.16_0.04_250)] to-[oklch(0.11_0.03_250)] relative">
      <Confetti active={showConfetti} duration={7000} />

      {/* ═══ Background slot symbols - covers entire page ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 ios-dimmed-bg">
        {/* More visible, varied slot symbols with gold tint */}
        <div className="absolute top-[3%] left-[3%] text-5xl sm:text-7xl font-bold animate-spin-slow text-amber-500/[0.08] ios-symbol">7</div>
        <div className="absolute top-[8%] right-[8%] text-6xl sm:text-8xl font-bold animate-pulse-slow text-amber-400/[0.07] ios-symbol">7</div>
        <div className="absolute top-[18%] left-[20%] text-4xl sm:text-6xl font-bold animate-float text-red-500/[0.06] ios-symbol">7</div>
        <div className="absolute top-[25%] right-[25%] text-3xl sm:text-5xl font-bold tracking-wider animate-bounce-slow text-amber-500/[0.07] ios-symbol">BAR</div>
        <div className="absolute top-[35%] left-[8%] text-4xl sm:text-6xl font-bold tracking-wider animate-pulse-slow text-amber-400/[0.06] ios-symbol">BAR</div>
        <div className="absolute top-[15%] left-[55%] text-5xl sm:text-6xl animate-spin-reverse text-red-400/[0.07] ios-symbol">🍒</div>
        <div className="absolute top-[42%] right-[5%] text-4xl sm:text-6xl animate-float text-red-400/[0.08] ios-symbol">🍒</div>
        <div className="absolute top-[10%] left-[75%] text-5xl sm:text-7xl animate-pulse-slow text-cyan-400/[0.06] ios-symbol">💎</div>
        <div className="absolute top-[48%] left-[18%] text-4xl sm:text-5xl animate-spin-slow text-cyan-300/[0.07] ios-symbol">💎</div>
        <div className="absolute top-[30%] right-[12%] text-4xl sm:text-6xl animate-bounce-slow text-yellow-400/[0.07] ios-symbol">🔔</div>
        <div className="absolute top-[55%] left-[40%] text-3xl sm:text-5xl animate-float text-yellow-300/[0.06] ios-symbol">🔔</div>
        <div className="absolute top-[60%] right-[30%] text-5xl sm:text-7xl animate-spin-reverse text-amber-300/[0.07] ios-symbol">⭐</div>
        <div className="absolute top-[68%] left-[5%] text-4xl sm:text-6xl animate-pulse-slow text-amber-400/[0.08] ios-symbol">⭐</div>
        <div className="absolute top-[72%] right-[8%] text-5xl sm:text-7xl font-bold animate-float text-red-500/[0.06] ios-symbol">7</div>
        <div className="absolute top-[78%] left-[30%] text-3xl sm:text-5xl font-bold tracking-wider animate-bounce-slow text-amber-500/[0.07] ios-symbol">BAR</div>
        <div className="absolute top-[82%] right-[40%] text-4xl sm:text-6xl animate-spin-slow text-red-400/[0.07] ios-symbol">🍒</div>
        <div className="absolute top-[88%] left-[60%] text-4xl sm:text-5xl animate-pulse-slow text-cyan-400/[0.06] ios-symbol">💎</div>
        <div className="absolute top-[92%] left-[10%] text-5xl sm:text-6xl animate-float text-yellow-400/[0.08] ios-symbol">🔔</div>
        <div className="absolute top-[85%] right-[15%] text-4xl sm:text-5xl animate-spin-reverse text-amber-300/[0.06] ios-symbol">⭐</div>
        <div className="absolute top-[50%] left-[65%] text-6xl sm:text-8xl font-bold animate-pulse-slow text-amber-500/[0.05] ios-symbol">7</div>
        <div className="absolute top-[38%] left-[48%] text-3xl sm:text-4xl animate-bounce-slow text-green-400/[0.06] ios-symbol">🍋</div>
        <div className="absolute top-[75%] left-[45%] text-4xl sm:text-5xl animate-float text-green-300/[0.07] ios-symbol">🍋</div>
      </div>

      {/* ═══ Hero ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-4xl w-full">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 gold-gradient animate-fade-in px-4">
            MATILDA MEDIA
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[oklch(0.75_0.15_85)] mb-6 sm:mb-10 font-light tracking-wide animate-fade-in-delay px-4">
            Pelin säännöt sanelevat sisällön
          </p>
          <div className="mb-6 sm:mb-8 animate-fade-in-delay-2 px-4">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.75_0.15_85)] mb-3 tabular-nums">
              {fmt(viewCount)}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-[oklch(0.65_0.03_85)] font-light" style={{fontSize: '16px'}}>
              Orgaanista näyttökertaa asiakkaideni sosiaalisen median kanavoissa,<br className="hidden sm:block" /> joihin sinäkin olet varmasti törmännyt.
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Services ═══ */}
      <section className="py-4 sm:py-6 md:py-8 px-4 relative z-10 -mt-16 sm:-mt-24">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-10 text-[oklch(0.75_0.15_85)]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, letterSpacing: '0.02em' }}>
            Matilda Media jakaa pöydän: podcastit, klipit ja muun sisällön:
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Podcasts - Purple */}
            <div className="text-center group cursor-pointer">
              <div className="mb-6">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 border"
                  style={{ background: 'linear-gradient(to bottom right, #7c3aed, #4c1d95)', borderColor: 'rgba(124,58,237,0.3)' }}>
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="#c4b5fd" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-105" style={{ color: '#c4b5fd' }}>Podcastit</h3>
              <p className="text-sm sm:text-base text-[oklch(0.65_0.03_85)] font-light px-2" style={{fontSize: '16px'}}>Ääni, joka kantaa – strategiset siirrot podcasteina</p>
            </div>

            {/* Clips - Red/Crimson */}
            <div className="text-center group cursor-pointer">
              <div className="mb-6">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 border"
                  style={{ background: 'linear-gradient(to bottom right, #dc2626, #7f1d1d)', borderColor: 'rgba(220,38,38,0.3)' }}>
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="#fca5a5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-105" style={{ color: '#fca5a5' }}>Klipit</h3>
              <p className="text-sm sm:text-base text-[oklch(0.65_0.03_85)] font-light px-2" style={{fontSize: '16px'}}>Nopeat voitot – iskevät klipit, jotka jäävät mieleen</p>
            </div>

            {/* Content - Teal */}
            <div className="text-center group cursor-pointer sm:col-span-2 lg:col-span-1">
              <div className="mb-6">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 border"
                  style={{ background: 'linear-gradient(to bottom right, #0d9488, #134e4a)', borderColor: 'rgba(13,148,136,0.3)' }}>
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="#99f6e4" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-105" style={{ color: '#99f6e4' }}>Muu sisältö</h3>
              <p className="text-sm sm:text-base text-[oklch(0.65_0.03_85)] font-light px-2" style={{fontSize: '16px'}}>Jokeri hihassa – luovat ratkaisut kaikkiin mediatarpeisiin</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ About ═══ */}
      <section className="py-16 sm:py-20 md:py-24 px-4 relative z-10">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[oklch(0.75_0.15_85)]">Tietoa Matilda Mediasta:</h2>
          <div className="text-base sm:text-lg text-[oklch(0.65_0.03_85)] font-light space-y-4 sm:space-y-6 px-4">
            <p>Matilda Media on erikoistunut uhkapeliteemaiseen mediaan: podcasteihin, klippeihin, äänityksiin, videoihin ja valokuviin, jotka resonoivat yleisön kanssa.</p>
            <p>Yli 22 miljoonaa orgaanista näyttökertaa kotiuttavat sen, että me osaamme luoda sisältöä, joka leviää ja jää mieleen.</p>
            <p className="text-[oklch(0.75_0.15_85)] font-medium">Peli on jo käynnissä – oletko mukana?</p>
          </div>
        </div>
      </section>

      {/* ═══ Countdown ═══ */}
      <section className="py-12 sm:py-16 md:py-20 px-4 relative z-10">
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
              <div key={i} className="bg-[oklch(0.20_0.04_250)]/50 border border-[oklch(0.75_0.15_85)]/10 rounded-lg p-2 sm:p-3 md:p-4 transition-all duration-300 hover:border-[oklch(0.75_0.15_85)]/30">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[oklch(0.65_0.03_85)] mb-1 tabular-nums">{t.val}</div>
                <div className="text-xs text-[oklch(0.55_0.03_85)] font-light uppercase tracking-wider">{t.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-[oklch(0.45_0.03_85)] font-light italic" style={{fontSize: '13px'}}>Oletko valmis?</p>
        </div>
      </section>

      {/* ═══ Contact ═══ */}
      <section className="py-16 sm:py-20 md:py-24 px-4 pb-[60vh] sm:pb-[50vh] border-t border-[oklch(0.75_0.15_85)]/20 relative z-10">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[oklch(0.75_0.15_85)]">Yhteystiedot</h2>

          {/* Phase: idle - show coin flip button */}
          {contactPhase === 'idle' && (
            <button onClick={handleCoinFlip}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-[oklch(0.75_0.15_85)]/40 bg-transparent hover:bg-[oklch(0.75_0.15_85)]/10 transition-all duration-300 hover:scale-105 hover:border-[oklch(0.75_0.15_85)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <span className="text-4xl group-hover:animate-bounce">🪙</span>
              <span className="text-[oklch(0.75_0.15_85)] font-semibold text-base sm:text-lg">Heitä kolikkoa paljastaaksesi yhteystiedot</span>
            </button>
          )}

          {/* Phase: coin flipping */}
          {contactPhase === 'coin-flipping' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="text-7xl sm:text-8xl animate-coin-flip">🪙</div>
              <p className="text-[oklch(0.65_0.03_85)] text-sm animate-pulse">Kolikko pyörii...</p>
            </div>
          )}

          {/* Phase: coin landing */}
          {contactPhase === 'coin-landing' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="text-7xl sm:text-8xl animate-coin-land">🪙</div>
              <p className="text-[oklch(0.65_0.03_85)] text-sm">Kolikko laskeutuu...</p>
            </div>
          )}

          {/* Phase: coin done - show slot button */}
          {contactPhase === 'coin-done' && (
            <div className="animate-fade-in">
              <p className="text-[oklch(0.75_0.15_85)] text-lg mb-4">Kolikko tippui! Nyt tarvitset jackpotin...</p>
              <button onClick={() => setContactPhase('slot')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-[oklch(0.75_0.15_85)]/40 bg-transparent hover:bg-[oklch(0.75_0.15_85)]/10 transition-all duration-300 hover:scale-105 hover:border-[oklch(0.75_0.15_85)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <span className="text-3xl">🎰</span>
                <span className="text-[oklch(0.75_0.15_85)] font-semibold text-base sm:text-lg">Avaa hedelmäpeli</span>
              </button>
            </div>
          )}

          {/* Phase: revealed - show email */}
          {contactPhase === 'revealed' && (
            <div className="animate-fade-in">
              <p className="text-xl sm:text-2xl text-[oklch(0.75_0.15_85)] font-semibold mb-4">🎉 Yhteystiedot paljastettu! Laita sähköpostia tulemaan:</p>
              <a href="mailto:vili@matilda.media"
                className="inline-block text-lg sm:text-xl text-[oklch(0.85_0.15_85)] hover:text-[oklch(0.95_0.15_85)] transition-all duration-300 underline decoration-[oklch(0.75_0.15_85)]/50 hover:decoration-[oklch(0.75_0.15_85)] hover:scale-105">
                vili@matilda.media
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Spacer for better mobile scrolling */}
      <div className="h-[40vh] sm:h-[30vh]"></div>

      {/* ═══ Slot Machine Modal ═══ */}
      {contactPhase === 'slot' && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-sm w-full">
            {/* Metal frame */}
            <div className="bg-gradient-to-b from-[#4a4a5a] via-[#2a2a3a] to-[#1a1a2a] rounded-2xl p-1.5 shadow-[0_0_60px_rgba(212,175,55,0.15)]">
              <div className="bg-gradient-to-b from-[oklch(0.18_0.04_250)] to-[oklch(0.12_0.03_250)] rounded-xl p-5 sm:p-6 border border-[oklch(0.75_0.15_85)]/20">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-[oklch(0.75_0.15_85)]/40" />
                  <h3 className="text-xl sm:text-2xl font-bold text-[oklch(0.75_0.15_85)] tracking-wider">JACKPOT</h3>
                  <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-[oklch(0.75_0.15_85)]/40" />
                </div>
                <p className="text-center text-xs sm:text-sm text-[oklch(0.55_0.03_85)] mb-5">Kolme punaista seiskaa vie sinut eteenpäin</p>

                {/* Reels */}
                <div className="bg-[oklch(0.06_0.01_250)] rounded-lg p-3 sm:p-4 mb-4 border border-[#3a3a4a]/50 shadow-inner">
                  <div className="flex justify-center gap-2 sm:gap-3">
                    <SlotReel spinning={slotSpinning} finalSymbol={reelSymbols[0]} delay={1200} isWin={slotWon} />
                    <SlotReel spinning={slotSpinning} finalSymbol={reelSymbols[1]} delay={1800} isWin={slotWon} />
                    <SlotReel spinning={slotSpinning} finalSymbol={reelSymbols[2]} delay={2400} isWin={slotWon} />
                  </div>
                  <div className="flex items-center mt-3">
                    <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.15_85)] shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
                    <div className="flex-1 h-0.5 bg-[oklch(0.75_0.15_85)]/30" />
                    <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.15_85)] shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
                  </div>
                </div>

                {!slotWon && (
                  <div className="flex gap-3">
                    <Button onClick={handleSlotSpin} disabled={slotSpinning}
                      className="flex-1 bg-gradient-to-b from-[oklch(0.80_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.05_250)] hover:from-[oklch(0.85_0.15_85)] hover:to-[oklch(0.70_0.15_85)] font-bold text-base sm:text-lg py-3 sm:py-4 rounded-lg shadow-[0_4px_12px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95">
                      {slotSpinning ? "Pyörii..." : "VEDÄ"}
                    </Button>
                    {!slotSpinning && (
                      <Button onClick={() => { setContactPhase('coin-done'); setSlotSpinCount(0); setReelSymbols(['?','?','?']); setSlotWon(false); }}
                        variant="outline" className="border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.75_0.15_85)]/10 py-3 sm:py-4">Sulje</Button>
                    )}
                  </div>
                )}
                {slotSpinCount > 0 && !slotWon && (
                  <p className="text-center text-[oklch(0.55_0.03_85)] text-xs sm:text-sm mt-3">Yritys {slotSpinCount}/3</p>
                )}
                {slotWon && (
                  <div className="text-center animate-fade-in py-2">
                    <p className="text-lg sm:text-xl font-bold text-red-500 mb-1">🎉 7 7 7 – JACKPOT! 🎉</p>
                    <p className="text-[oklch(0.65_0.03_85)] text-sm">Siirrytään onnenpyörään...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Lever */}
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
      {contactPhase === 'wheel' && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[oklch(0.20_0.04_250)] to-[oklch(0.14_0.03_250)] border-2 border-[oklch(0.75_0.15_85)]/40 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-[0_0_60px_rgba(212,175,55,0.15)]">
            <h3 className="text-xl sm:text-2xl font-bold text-[oklch(0.75_0.15_85)] text-center mb-2">Onnenpyörä</h3>
            <p className="text-center text-xs sm:text-sm text-[oklch(0.55_0.03_85)] mb-6">
              Pyöräytä vihreälle paljastaaksesi yhteystiedot!
            </p>
            <WheelOfFortune onResult={handleWheelResult} />
          </div>
        </div>
      )}
    </div>
  );
}
