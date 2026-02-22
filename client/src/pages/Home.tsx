import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Calendar, TrendingUp, Users, Zap, CheckCircle2, ArrowRight } from "lucide-react";

/**
 * Matilda Media - Professional B2B iGaming Media Platform
 * Design Philosophy: Art Deco Luxury meets Modern Brutalism
 * - Dark background with subtle neon accents
 * - Large typography, clean hierarchy
 * - No game mechanics, pure professionalism
 * - Focus on trust, expertise, and results
 */

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown to July 1, 2027 00:00
  useEffect(() => {
    const target = new Date('2027-07-01T00:00:00').getTime();
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_250)] text-[oklch(0.92_0.01_85)]">
      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[oklch(0.75_0.15_85)] blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[oklch(0.65_0.20_280)] blur-[120px] rounded-full" />
        </div>

        <div className="container max-w-6xl mx-auto relative z-10">
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-[oklch(0.85_0.15_85)]">MATILDA</span>
              <span className="text-[oklch(0.92_0.01_85)]"> MEDIA</span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[oklch(0.75_0.15_85)] to-transparent mb-8" />
          </div>

          {/* Tagline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-center mb-8 leading-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Näkyvyyttä joka konvertoi.<br />
            <span className="text-[oklch(0.75_0.15_85)]">Sisältöä joka jää mieleen.</span>
          </h2>

          <p className="text-center text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto mb-12 font-light">
            Erikoistumme uhkapeliteemaisen median tuotantoon – podcasteista klippeihin, äänityksistä videoihin.
            Yli 22 miljoonaa orgaanista näyttökertaa kertovat, että osaamme luoda sisältöä, joka leviää.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.08_0.01_250)] hover:from-[oklch(0.80_0.15_85)] hover:to-[oklch(0.70_0.15_85)] font-semibold text-lg px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-105"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Varaa 15 min strategia-puhelu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[oklch(0.75_0.15_85)]/50 text-[oklch(0.85_0.15_85)] hover:bg-[oklch(0.75_0.15_85)]/10 hover:border-[oklch(0.75_0.15_85)] font-semibold text-lg px-8 py-6 rounded-lg transition-all duration-300"
              onClick={() => {
                const servicesSection = document.getElementById('services');
                servicesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Tutustu palveluihin
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust Logos */}
          <div className="text-center">
            <p className="text-sm text-[oklch(0.55_0.03_85)] mb-6 uppercase tracking-wider font-light">
              Yhteistyössä Suomen johtavien iGaming-brändien kanssa
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60">
              {/* Placeholder logos - replace with real partner logos */}
              <div className="text-2xl sm:text-3xl font-bold text-[oklch(0.45_0.03_85)]">BRÄNDI 1</div>
              <div className="text-2xl sm:text-3xl font-bold text-[oklch(0.45_0.03_85)]">BRÄNDI 2</div>
              <div className="text-2xl sm:text-3xl font-bold text-[oklch(0.45_0.03_85)]">BRÄNDI 3</div>
              <div className="text-2xl sm:text-3xl font-bold text-[oklch(0.45_0.03_85)]">BRÄNDI 4</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Service Packages ═══ */}
      <section id="services" className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              iGaming Media Packages
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto font-light">
              Valitse tarpeisiisi sopiva paketti – kaikki räätälöitävissä
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Core Visibility */}
            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 hover:border-[oklch(0.75_0.15_85)]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
                <h3 className="text-2xl font-bold text-[oklch(0.85_0.15_85)]">Core Visibility</h3>
              </div>
              <p className="text-[oklch(0.65_0.03_85)] mb-6 font-light">
                Shorts/Reels + thumbnailit – nopea näkyvyys sosiaalisessa mediassa
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">10-15 lyhytvideota/kk</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">Thumbnail-suunnittelu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">Peruskäsikirjoitus</span>
                </li>
              </ul>
              <div className="text-center pt-6 border-t border-[oklch(0.75_0.15_85)]/20">
                <p className="text-sm text-[oklch(0.55_0.03_85)] mb-2">Case example:</p>
                <p className="text-[oklch(0.75_0.15_85)] font-semibold">+340% engagement eräällä kasinoasiakkaalla</p>
              </div>
            </Card>

            {/* Full Podcast Power */}
            <Card className="bg-gradient-to-b from-[oklch(0.14_0.03_250)] to-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/40 p-8 relative overflow-hidden hover:border-[oklch(0.75_0.15_85)]/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] transform hover:scale-105">
              <div className="absolute top-4 right-4 bg-[oklch(0.75_0.15_85)] text-[oklch(0.08_0.01_250)] text-xs font-bold px-3 py-1 rounded-full">
                SUOSITUIN
              </div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
                <h3 className="text-2xl font-bold text-[oklch(0.85_0.15_85)]">Full Podcast Power</h3>
              </div>
              <p className="text-[oklch(0.65_0.03_85)] mb-6 font-light">
                Koko tuotanto + jakelu + promo – täysi podcast-palvelu
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">4-6 podcast-jaksoa/kk</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">Täysi tuotanto (äänitys, editointi, miksaus)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">Jakelu kaikille alustoille</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">Promo-klipit sosiaaliseen mediaan</span>
                </li>
              </ul>
              <div className="text-center pt-6 border-t border-[oklch(0.75_0.15_85)]/20">
                <p className="text-sm text-[oklch(0.55_0.03_85)] mb-2">Case example:</p>
                <p className="text-[oklch(0.75_0.15_85)] font-semibold">1,2M impressions ensimmäisessä kuussa</p>
              </div>
            </Card>

            {/* High Roller Campaign */}
            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 hover:border-[oklch(0.75_0.15_85)]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
                <h3 className="text-2xl font-bold text-[oklch(0.85_0.15_85)]">High Roller Campaign</h3>
              </div>
              <p className="text-[oklch(0.65_0.03_85)] mb-6 font-light">
                360° sisältö + paid boost + raportointi – täysi kampanja
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">Kaikki Core + Podcast -sisällöt</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">Paid media boost (Meta, TikTok, YouTube)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">Kuukausiraportointi + strategia-puhelut</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[oklch(0.75_0.03_85)]">Dediko itu account manager</span>
                </li>
              </ul>
              <div className="text-center pt-6 border-t border-[oklch(0.75_0.15_85)]/20">
                <p className="text-sm text-[oklch(0.55_0.03_85)] mb-2">Case example:</p>
                <p className="text-[oklch(0.75_0.15_85)] font-semibold">ROI 4,2x ensimmäisellä kvartaalilla</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ Portfolio / Case Studies ═══ */}
      <section className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Tulokset puhuvat puolestaan
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto font-light">
              Anonymisoituja case-esimerkkejä asiakkaidemme menestyksestä
            </p>
          </div>

          <div className="space-y-12">
            {/* Case 1 */}
            <Card className="bg-gradient-to-r from-[oklch(0.10_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-[oklch(0.75_0.15_85)]/10 text-[oklch(0.75_0.15_85)] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    CASE STUDY #1
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">
                    Uusi kasino: 0 → 1,2M impressions 30 päivässä
                  </h3>
                  <p className="text-[oklch(0.65_0.03_85)] mb-6 font-light">
                    Uusi kasinobrändi tarvitsi nopean lanseerauksen sosiaalisessa mediassa. Toteutimme 30 päivän kampanjan, joka yhdisti podcastit, lyhytvideot ja paid median.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-3xl font-bold text-[oklch(0.75_0.15_85)]">1,2M</p>
                      <p className="text-sm text-[oklch(0.55_0.03_85)]">Impressions</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[oklch(0.75_0.15_85)]">+340%</p>
                      <p className="text-sm text-[oklch(0.55_0.03_85)]">Engagement</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[oklch(0.75_0.15_85)]">30</p>
                      <p className="text-sm text-[oklch(0.55_0.03_85)]">Päivää</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[oklch(0.06_0.01_250)] rounded-lg p-8 border border-[oklch(0.75_0.15_85)]/10 flex items-center justify-center min-h-[300px]">
                  <p className="text-[oklch(0.45_0.03_85)] text-center">
                    [Video embed tai Before/After -klipit]
                  </p>
                </div>
              </div>
            </Card>

            {/* Case 2 */}
            <Card className="bg-gradient-to-r from-[oklch(0.10_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-[oklch(0.06_0.01_250)] rounded-lg p-8 border border-[oklch(0.75_0.15_85)]/10 flex items-center justify-center min-h-[300px]">
                  <p className="text-[oklch(0.45_0.03_85)] text-center">
                    [Video embed tai Before/After -klipit]
                  </p>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block bg-[oklch(0.75_0.15_85)]/10 text-[oklch(0.75_0.15_85)] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    CASE STUDY #2
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">
                    Podcast-sarja: 500K+ kuuntelua 3 kuukaudessa
                  </h3>
                  <p className="text-[oklch(0.65_0.03_85)] mb-6 font-light">
                    Kasinoalan podcast-sarja, joka käsitteli vastuullista pelaamista ja alan tulevaisuutta. Tuotimme 12 jaksoa ja promoklippejä.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-3xl font-bold text-[oklch(0.75_0.15_85)]">500K+</p>
                      <p className="text-sm text-[oklch(0.55_0.03_85)]">Kuuntelua</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[oklch(0.75_0.15_85)]">4,8/5</p>
                      <p className="text-sm text-[oklch(0.55_0.03_85)]">Arvosana</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[oklch(0.75_0.15_85)]">12</p>
                      <p className="text-sm text-[oklch(0.55_0.03_85)]">Jaksoa</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ Why Matilda - Expertise ═══ */}
      <section className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Miksi Matilda Media?
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto font-light">
              Me tunnemme iGamingin säännöt – ja osaamme pelata niillä
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-6">
              <div className="text-[oklch(0.75_0.15_85)] mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">Affiliate-markkinointi</h3>
              <p className="text-[oklch(0.65_0.03_85)] text-sm font-light">
                Ymmärrämme affiliate-ekosysteemin ja osaamme luoda sisältöä, joka konvertoi.
              </p>
            </Card>

            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-6">
              <div className="text-[oklch(0.75_0.15_85)] mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">Responsible Gaming</h3>
              <p className="text-[oklch(0.65_0.03_85)] text-sm font-light">
                Kaikki sisältömme noudattaa vastuullisen pelaamisen periaatteita ja paikallista lainsäädäntöä.
              </p>
            </Card>

            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-6">
              <div className="text-[oklch(0.75_0.15_85)] mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">Algoritmi-optimointi</h3>
              <p className="text-[oklch(0.65_0.03_85)] text-sm font-light">
                Tiedämme, miten välttää shadowbannit ja saada kasinoklipit TikTokiin ja Instagramiin 2026.
              </p>
            </Card>
          </div>

          {/* Blog teaser */}
          <Card className="bg-gradient-to-r from-[oklch(0.10_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="inline-block bg-[oklch(0.75_0.15_85)]/10 text-[oklch(0.75_0.15_85)] text-xs font-bold px-3 py-1 rounded-full mb-3">
                  UUSIN BLOGI
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">
                  Top 5 tapaa saada kasinon klipit TikTokiin ilman shadowbannia 2026
                </h3>
                <p className="text-[oklch(0.65_0.03_85)] font-light">
                  Lue vinkkimme, miten navigoit sosiaalisen median säännöissä ja saat sisältösi näkyviin.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-2 border-[oklch(0.75_0.15_85)]/50 text-[oklch(0.85_0.15_85)] hover:bg-[oklch(0.75_0.15_85)]/10 hover:border-[oklch(0.75_0.15_85)] font-semibold px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                Lue lisää
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══ Market Opening Countdown ═══ */}
      <section className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[oklch(0.85_0.15_85)]"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Uusi aikakausi alkaa pian...
          </h2>
          <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] mb-8 font-light">
            Suomen rahapelilaki aukeaa 1. heinäkuuta 2027 klo 00:00
          </p>
          <div className="grid grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
            {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit, idx) => (
              <div key={unit} className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] rounded-lg p-4 sm:p-6 border border-[oklch(0.75_0.15_85)]/20">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[oklch(0.75_0.15_85)] tabular-nums">
                  {String(timeLeft[unit]).padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-[oklch(0.55_0.03_85)] mt-2 uppercase tracking-wider">
                  {unit === 'days' ? 'Päivää' : unit === 'hours' ? 'Tuntia' : unit === 'minutes' ? 'Minuuttia' : 'Sekuntia'}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-[oklch(0.55_0.03_85)] font-light italic">
            Oletko valmis?
          </p>
        </div>
      </section>

      {/* ═══ VIP Booking Flow ═══ */}
      <section id="contact" className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Aloitetaan yhteistyö
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] font-light">
              Varaa 15 minuutin strategia-puhelu tai ota yhteyttä suoraan
            </p>
          </div>

          <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 sm:p-10">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[oklch(0.75_0.03_85)] mb-2">Nimi</label>
                <input
                  type="text"
                  className="w-full bg-[oklch(0.06_0.01_250)] border border-[oklch(0.75_0.15_85)]/20 rounded-lg px-4 py-3 text-[oklch(0.92_0.01_85)] focus:outline-none focus:border-[oklch(0.75_0.15_85)] transition-colors"
                  placeholder="Nimesi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[oklch(0.75_0.03_85)] mb-2">Sähköposti</label>
                <input
                  type="email"
                  className="w-full bg-[oklch(0.06_0.01_250)] border border-[oklch(0.75_0.15_85)]/20 rounded-lg px-4 py-3 text-[oklch(0.92_0.01_85)] focus:outline-none focus:border-[oklch(0.75_0.15_85)] transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[oklch(0.75_0.03_85)] mb-2">Yritys</label>
                <input
                  type="text"
                  className="w-full bg-[oklch(0.06_0.01_250)] border border-[oklch(0.75_0.15_85)]/20 rounded-lg px-4 py-3 text-[oklch(0.92_0.01_85)] focus:outline-none focus:border-[oklch(0.75_0.15_85)] transition-colors"
                  placeholder="Yrityksesi nimi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[oklch(0.75_0.03_85)] mb-2">Budjetti ja tavoite</label>
                <textarea
                  rows={4}
                  className="w-full bg-[oklch(0.06_0.01_250)] border border-[oklch(0.75_0.15_85)]/20 rounded-lg px-4 py-3 text-[oklch(0.92_0.01_85)] focus:outline-none focus:border-[oklch(0.75_0.15_85)] transition-colors resize-none"
                  placeholder="Kerro lyhyesti tavoitteestasi ja budjetistasi (esim. alkaen 4 900 €/kk)"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.08_0.01_250)] hover:from-[oklch(0.80_0.15_85)] hover:to-[oklch(0.70_0.15_85)] font-semibold text-lg py-6 rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
                onClick={(e) => {
                  e.preventDefault();
                  toast.success("Kiitos yhteydenotostasi! Palaamme asiaan 1-2 arkipäivän kuluessa.");
                }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Lähetä yhteydenottopyyntö
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-[oklch(0.75_0.15_85)]/20 text-center">
              <p className="text-sm text-[oklch(0.65_0.03_85)] mb-3">Tai ota yhteyttä suoraan:</p>
              <a
                href="mailto:vili@matilda.media"
                className="text-[oklch(0.85_0.15_85)] hover:text-[oklch(0.95_0.15_85)] font-semibold transition-colors underline decoration-[oklch(0.75_0.15_85)]/50 hover:decoration-[oklch(0.75_0.15_85)]"
              >
                vili@matilda.media
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="py-12 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[oklch(0.85_0.15_85)]"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                MATILDA MEDIA
              </h3>
              <p className="text-sm text-[oklch(0.65_0.03_85)] font-light">
                Erikoistumme uhkapeliteemaisen median tuotantoon – podcasteista klippeihin.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3 text-[oklch(0.75_0.03_85)] uppercase tracking-wider">Yhteystiedot</h4>
              <p className="text-sm text-[oklch(0.65_0.03_85)] font-light mb-2">
                Lappeenranta, Suomi
              </p>
              <a
                href="mailto:vili@matilda.media"
                className="text-sm text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
              >
                vili@matilda.media
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3 text-[oklch(0.75_0.03_85)] uppercase tracking-wider">Compliance</h4>
              <p className="text-sm text-[oklch(0.65_0.03_85)] font-light">
                GDPR & responsible marketing compliant
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-[oklch(0.75_0.15_85)]/10 text-center">
            <p className="text-sm text-[oklch(0.55_0.03_85)] font-light">
              © 2026 Matilda Media. Kaikki oikeudet pidätetään.
            </p>
          </div>
        </div>
      </footer>

      {/* Spacer for mobile scrolling */}
      <div className="h-[20vh] sm:h-[15vh]"></div>
    </div>
  );
}
