import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * Matilda Media - Casino-themed media production website
 * Design: Dark navy blue and gold casino aesthetic
 * Contact flow: Coin flip → Slot (777 on 3rd spin) → email reveal
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
        const rnd = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
        setDisplay(rnd);
      }, 100);
      setTimeout(() => {
        if (ref.current) clearInterval(ref.current);
        setDisplay(finalSymbol); setIsSpinning(false); setStopped(true);
      }, delay);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [spinning, finalSymbol, delay]);
  const isRed = finalSymbol === WIN_SYMBOL;
  return (
    <div className={`flex items-center justify-center w-16 h-20 sm:w-20 sm:h-24 rounded-lg text-4xl sm:text-5xl font-bold transition-all duration-300 ${
      isSpinning ? 'bg-[oklch(0.10_0.02_250)] animate-pulse' : stopped && isRed ? 'bg-gradient-to-b from-red-600/30 to-red-800/30 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-[oklch(0.10_0.02_250)]'
    }`}>
      <span className={stopped && isRed ? 'text-red-500 animate-pulse' : 'text-[oklch(0.75_0.15_85)]'}>{display}</span>
    </div>
  );
}

export default function Home() {
  // ─── View counter ────────────────────────────────────────
  const [viewCount, setViewCount] = useState(0);
  const targetViews = 22000000;
  const animationDuration = 360000; // 6 minutes
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Contact flow: coin → slot → email (no wheel)
  const [contactPhase, setContactPhase] = useState<'idle' | 'coin-flipping' | 'coin-landing' | 'coin-done' | 'slot' | 'revealed'>('idle');
  const [slotSpinning, setSlotSpinning] = useState(false);
  const [slotSpinCount, setSlotSpinCount] = useState(0);
  const [reelSymbols, setReelSymbols] = useState(['?', '?', '?']);
  const [slotWon, setSlotWon] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // ─── View counter ────────────────────────────────────────
  useEffect(() => {
    const t0 = Date.now();
    let currentViews = 0;
    const animate = () => {
      const elapsed = Date.now() - t0;
      if (elapsed < animationDuration) {
        currentViews = Math.floor((elapsed / animationDuration) * targetViews);
        setViewCount(currentViews);
        requestAnimationFrame(animate);
      } else {
        currentViews = targetViews;
        setViewCount(currentViews);
        const tickInterval = setInterval(() => {
          const randomIncrement = Math.floor(Math.random() * 5) + 1;
          const randomDelay = (Math.random() * 3 + 1) * 1000;
          setTimeout(() => {
            currentViews += randomIncrement;
            setViewCount(currentViews);
          }, randomDelay);
        }, 2000);
        return () => clearInterval(tickInterval);
      }
    };
    animate();
  }, []);

  // ─── Countdown to July 1, 2027 ───────────────────────────
  useEffect(() => {
    const target = new Date('2027-07-01T00:00:00').getTime();
    const calc = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
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

  // ─── Slot machine (3rd spin = 777 → email reveal) ────────
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
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 7000);
        toast.success("🎰 7 7 7 – JACKPOT! Yhteystiedot paljastettu!", { duration: 5000 });
        // Reveal email after celebration
        setTimeout(() => setContactPhase('revealed'), 2500);
      }
    }, 2600);
  }, [slotSpinning, slotSpinCount]);

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
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 text-[oklch(0.85_0.15_85)] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            MATILDA MEDIA
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[oklch(0.75_0.15_85)] font-light mb-10 sm:mb-12 tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Pelin säännöt sanelevat sisällön
          </p>
        </div>

        <div className="text-center animate-fade-in-delay">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.75_0.15_85)] mb-3 tabular-nums">
            {fmt(viewCount)}
          </div>
          <div className="text-sm sm:text-base md:text-lg text-[oklch(0.65_0.03_85)] font-light" style={{fontSize: '16px'}}>
            Orgaanista näyttökertaa asiakkaideni sosiaalisen median kanavoissa,<br className="hidden sm:block" /> joihin sinäkin olet varmasti törmännyt.
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
            {/* Podcasts - Purple/Violet */}
            <div className="group relative bg-gradient-to-br from-purple-600/10 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-5 sm:mb-6 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-700/30 flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                    🎙️
                  </div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-105" style={{ color: '#c4b5fd' }}>Podcastit</h3>
              <p className="text-sm sm:text-base text-[oklch(0.65_0.03_85)] font-light px-2" style={{fontSize: '16px'}}>Ääni, joka kantaa – strategiset siirrot podcasteina</p>
            </div>

            {/* Clips - Red/Crimson */}
            <div className="group relative bg-gradient-to-br from-red-600/10 to-red-900/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-5 sm:mb-6 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-500/30 to-red-700/30 flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                    🎬
                  </div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-105" style={{ color: '#fca5a5' }}>Klipit</h3>
              <p className="text-sm sm:text-base text-[oklch(0.65_0.03_85)] font-light px-2" style={{fontSize: '16px'}}>Nopeat voitot – iskevät klipit, jotka jäävät mieleen</p>
            </div>

            {/* Content - Teal */}
            <div className="group relative bg-gradient-to-br from-teal-600/10 to-teal-900/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-teal-500/20 hover:border-teal-400/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-5 sm:mb-6 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-teal-500/30 to-teal-700/30 flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                    ✨
                  </div>
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
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-3 sm:mb-4 text-[oklch(0.65_0.03_85)]">
            Uusi aikakausi alkaa pian...
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-[oklch(0.55_0.03_85)] font-light mb-6 sm:mb-8 px-4">
            1. heinäkuuta 2027 klo 00:00
          </p>

          <div className="flex justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
            {[
              { label: 'Päivää', value: timeLeft.days },
              { label: 'Tuntia', value: timeLeft.hours },
              { label: 'Minuuttia', value: timeLeft.minutes },
              { label: 'Sekuntia', value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[oklch(0.75_0.15_85)] tabular-nums mb-1 sm:mb-2">
                  {pad(value)}
                </div>
                <div className="text-xs sm:text-sm text-[oklch(0.55_0.03_85)] font-light uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-[oklch(0.45_0.03_85)] font-light italic" style={{fontSize: '13px'}}>Oletko valmis?</p>
        </div>
      </section>

      {/* ═══ Contact ═══ */}
      <section className="py-16 sm:py-20 md:py-24 px-4 pb-[30vh] sm:pb-[25vh] border-t border-[oklch(0.75_0.15_85)]/20 relative z-10">
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
      <div className="h-[20vh] sm:h-[15vh]"></div>

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
                  <Button onClick={handleSlotSpin} disabled={slotSpinning}
                    className="w-full bg-gradient-to-b from-[oklch(0.80_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.05_250)] hover:from-[oklch(0.85_0.15_85)] hover:to-[oklch(0.70_0.15_85)] font-bold text-base sm:text-lg py-3 sm:py-4 rounded-lg shadow-[0_4px_12px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95">
                    {slotSpinning ? "Pyörii..." : "VEDÄ"}
                  </Button>
                )}
                {slotWon && (
                  <div className="text-center animate-fade-in py-2">
                    <p className="text-lg sm:text-xl font-bold text-red-500 mb-1">🎉 7 7 7 – JACKPOT! 🎉</p>
                    <p className="text-[oklch(0.65_0.03_85)] text-sm">Yhteystiedot paljastuvat...</p>
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
    </div>
  );
}
