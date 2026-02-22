import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Calendar, TrendingUp, Users, Zap, CheckCircle2, ArrowRight, Globe } from "lucide-react";

/**
 * Matilda Media - Professional B2B iGaming Media Platform
 * Design Philosophy: Art Deco Luxury meets Modern Brutalism
 * - Dark background with subtle neon accents
 * - Large typography, clean hierarchy
 * - Premium B2B positioning with transparent pricing
 * - Focus on trust, expertise, and measurable results
 * - Bilingual support (Finnish + English)
 */

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [language, setLanguage] = useState<'fi' | 'en'>('fi');

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

  const t = {
    fi: {
      tagline1: "Näkyvyyttä joka konvertoi.",
      tagline2: "Sisältöä joka jää mieleen.",
      hero: "Me tunnemme iGamingin säännöt – ja osaamme pelata niillä paremmin kuin kukaan muu Suomessa. Valmistaudu Suomen rahapelimarkkinan avaukseen 1.7.2027. Autamme kansainvälisiä operaattoreita räjäyttämään some-näkyvyyden jo ennen ensimmäistä pelaajaa.",
      impressions: "Yli 22 miljoonaa orgaanista näyttökertaa asiakkaillemme jo ennen markkinan avausta.",
      bookCall: "Varaa 15 min ilmaista strategia-puhelua",
      services: "Tutustu palveluihin",
      packages: "iGaming Media Packages",
      packagesDesc: "Valitse tarpeisiisi sopiva paketti – kaikki räätälöitävissä",
      coreVisibility: "Core Visibility",
      coreDesc: "Lyhytvideoiden ja reelien tehopaketti nopeaan näkyvyyteen.",
      corePrice: "alkaen 7 900 € / kk",
      coreFeatures: ["10–15 lyhytvideota / kk", "Trumppeja somessa", "Perusanalytiikkaraportti"],
      coreCase: "+340 % engagement eräälle eurooppalaiselle kasinoasiakkaalle 45 päivässä",
      fullPodcast: "Full Podcast Power",
      fullDesc: "Koko some + podcast -paketti, joka rakentaa brändiä pitkällä tähtäimellä.",
      fullPrice: "alkaen 14 900 € / kk",
      fullFeatures: ["4–6 podcast-jaksoa / kk (täysi tuotanto: äänitys, editointi, miksaus)", "12–16 some-postausta / kk", "Promo-klipit kaikkiin kanaviin", "Täysi jakelu + optimointi"],
      fullCase: "1,2 miljoonaa impressions ensimmäisessä kuukaudessa",
      popular: "SUOSITUIN",
      enterprise: "Enterprise Full Control",
      enterpriseDesc: "Täysi some-hallinta + strategiakonsultointi.",
      enterprisePrice: "alkaen 24 900 € / kk",
      enterpriseFeatures: ["Kaikki ylläoleva + rajaton määrä sisältöä", "Viikottainen strategia-kokous", "Kampanjoiden suunnittelu markkinan avaukseen", "Oma dedikoitu account manager", "Vuosiraportti + seuraavan kvartaalin roadmap"],
      enterpriseNote: "Minimissään 6 kk sopimus – markkinan avautumisen takia.",
      results: "Tulokset puhuvat puolestaan",
      resultsDesc: "Anonymisoituja case-esimerkkejä asiakkaidemme menestyksestä",
      case1: "Eurooppalainen operaattori A",
      case1Before: "Ennen: 8 400 seuraajaa, 2,1 % engagement",
      case1After: "Jälkeen 90 päivää: 52 000 seuraajaa, 13,7 % engagement → +520 % kasvu",
      case2: "Vedonlyöntibrändi B",
      case2Result: "1,2 miljoonaa impressions ensimmäisessä kuukaudessa → ROI 8,4x",
      case3: "Uusi kasino C (valmistautumassa 2027)",
      case3Result: "TikTok-reelsit keräsivät 430 000 katselukertaa ilman maksettua mainontaa.",
      why: "Miksi Matilda Media?",
      whyDesc: "Me tunnemme iGamingin säännöt – ja osaamme pelata niillä.",
      affiliate: "Affiliate-markkinointi",
      affiliateDesc: "Ymmärrämme affiliate-ekosysteemin läpikotaisin ja luomme sisältöä, joka muuttaa katsojat pelaajiksi.",
      responsible: "Vastuullinen pelaaminen",
      responsibleDesc: "Kaikki sisältömme noudattaa 100 % Suomen tulevaa lainsäädäntöä ja vastuullisen pelaamisen periaatteita. Et koskaan joudu punaiselle listalle.",
      algorithm: "Algoritmi-optimointi 2027",
      algorithmDesc: "Tiedämme tarkalleen, miten välttää shadowbannit TikTokissa, Instagramissa ja YouTubessa markkinan avautuessa.",
      data: "Data & raportointi",
      dataDesc: "Kuukausittainen läpinäkyvä raportti: reach, engagement, konversiot ja ROI. Tiedät tarkalleen mihin rahasi menevät.",
      latestBlog: "UUSIN BLOGI",
      blogTitle: "Top 5 tapaa saada kasinon klipit TikTokiin ilman shadowbannia 2026",
      blogDesc: "Lue miten navigoit sosiaalisen median sääntöjen harmaalla alueella jo ennen markkinan avausta.",
      readMore: "Lue lisää",
      countdown: "Suomen rahapelimarkkina aukeaa 1.7.2027 klo 00:00",
      countdownSubtitle: "Ole valmis ensimmäisenä. Me olemme.",
      days: "Päivää",
      hours: "Tuntia",
      minutes: "Minuuttia",
      seconds: "Sekuntia",
      ready: "Oletko valmis?",
      contact: "Aloitetaan yhteistyö",
      contactDesc: "Varaa 15 minuutin strategia-puhelu tai ota yhteyttä suoraan",
      name: "Nimi",
      email: "Sähköposti",
      company: "Yritys",
      budget: "Budjetti ja tavoite",
      send: "Lähetä yhteydenottopyyntö",
      directContact: "Tai ota yhteyttä suoraan:",
      footer: "Suomalainen iGaming-some-toimisto. Valmiina 2027.",
      address: "Helsinki / Keuruu",
      businessId: "Y-tunnus: 3469822-4",
      phone: "+358 40 258 1601",
      links: "Linkit",
      blog: "Blogi",
      privacy: "Tietosuojakäytäntö",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      gdpr: "GDPR & responsible marketing compliant",
      copyright: "© 2026 Matilda Media. Kaikki oikeudet pidätetään.",
    },
    en: {
      tagline1: "Visibility that converts.",
      tagline2: "Content that sticks.",
      hero: "We know the iGaming rules – and we play them better than anyone in Finland. Prepare for the Finnish gambling market opening on 1.7.2027. We help international operators explode social visibility before the first player.",
      impressions: "Over 22 million organic impressions for our clients before market opening.",
      bookCall: "Book a free 15-min strategy call",
      services: "Explore services",
      packages: "iGaming Media Packages",
      packagesDesc: "Choose a package that fits your needs – everything is customizable",
      coreVisibility: "Core Visibility",
      coreDesc: "Short videos and reels package for rapid visibility.",
      corePrice: "from 7,900 € / month",
      coreFeatures: ["10–15 short videos / month", "Social media hits", "Basic analytics report"],
      coreCase: "+340% engagement for a European casino client in 45 days",
      fullPodcast: "Full Podcast Power",
      fullDesc: "Complete social + podcast package that builds brand long-term.",
      fullPrice: "from 14,900 € / month",
      fullFeatures: ["4–6 podcast episodes / month (full production: recording, editing, mixing)", "12–16 social posts / month", "Promo clips for all channels", "Full distribution + optimization"],
      fullCase: "1.2M impressions in the first month",
      popular: "MOST POPULAR",
      enterprise: "Enterprise Full Control",
      enterpriseDesc: "Complete social management + strategy consulting.",
      enterprisePrice: "from 24,900 € / month",
      enterpriseFeatures: ["Everything above + unlimited content", "Weekly strategy sessions", "Campaign planning for market opening", "Dedicated account manager", "Annual report + next quarter roadmap"],
      enterpriseNote: "Minimum 6-month contract – due to market opening.",
      results: "Results speak for themselves",
      resultsDesc: "Anonymized case examples of our clients' success",
      case1: "European Operator A",
      case1Before: "Before: 8,400 followers, 2.1% engagement",
      case1After: "After 90 days: 52,000 followers, 13.7% engagement → +520% growth",
      case2: "Betting Brand B",
      case2Result: "1.2M impressions in the first month → 8.4x ROI",
      case3: "New Casino C (preparing for 2027)",
      case3Result: "TikTok reels generated 430,000 views without paid advertising.",
      why: "Why Matilda Media?",
      whyDesc: "We know the iGaming rules – and we know how to play them.",
      affiliate: "Affiliate Marketing",
      affiliateDesc: "We master the affiliate ecosystem and create content that turns viewers into players.",
      responsible: "Responsible Gaming",
      responsibleDesc: "All our content follows 100% responsible gaming standards and upcoming Finnish regulation.",
      algorithm: "Algorithm Optimization 2027",
      algorithmDesc: "We know exactly how to beat shadowbans on TikTok, IG & YouTube in 2027.",
      data: "Data & Reporting",
      dataDesc: "Monthly transparent report: reach, engagement, conversions, and ROI. Know exactly where your money goes.",
      latestBlog: "LATEST BLOG",
      blogTitle: "Top 5 Ways to Get Casino Clips on TikTok Without Shadowbans in 2026",
      blogDesc: "Learn how to navigate social media rules before market opening.",
      readMore: "Read more",
      countdown: "Finnish gambling market opens 1.7.2027 at 00:00",
      countdownSubtitle: "Be ready first. We are.",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      ready: "Are you ready?",
      contact: "Let's start working together",
      contactDesc: "Book a 15-minute strategy call or contact us directly",
      name: "Name",
      email: "Email",
      company: "Company",
      budget: "Budget and goal",
      send: "Send inquiry",
      directContact: "Or contact us directly:",
      footer: "Finnish iGaming social media agency. Ready for 2027.",
      address: "Helsinki / Keuruu",
      businessId: "Business ID: 3469822-4",
      phone: "+358 40 258 1601",
      links: "Links",
      blog: "Blog",
      privacy: "Privacy Policy",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      gdpr: "GDPR & responsible marketing compliant",
      copyright: "© 2026 Matilda Media. All rights reserved.",
    }
  };

  const content = t[language];

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_250)] text-[oklch(0.92_0.01_85)]">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setLanguage('fi')}
          className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
            language === 'fi'
              ? 'bg-[oklch(0.75_0.15_85)] text-[oklch(0.08_0.01_250)]'
              : 'bg-[oklch(0.12_0.02_250)] text-[oklch(0.75_0.15_85)] border border-[oklch(0.75_0.15_85)]/50'
          }`}
        >
          FI
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
            language === 'en'
              ? 'bg-[oklch(0.75_0.15_85)] text-[oklch(0.08_0.01_250)]'
              : 'bg-[oklch(0.12_0.02_250)] text-[oklch(0.75_0.15_85)] border border-[oklch(0.75_0.15_85)]/50'
          }`}
        >
          EN
        </button>
      </div>

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
            {content.tagline1}<br />
            <span className="text-[oklch(0.75_0.15_85)]">{content.tagline2}</span>
          </h2>

          <p className="text-center text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto mb-12 font-light">
            {content.hero}
          </p>

          <p className="text-center text-base sm:text-lg text-[oklch(0.75_0.15_85)] max-w-3xl mx-auto mb-12 font-semibold">
            {content.impressions}
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
              {content.bookCall}
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
              {content.services}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ Why Matilda - Expertise ═══ */}
      <section className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {content.why}
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto font-light">
              {content.whyDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-6">
              <div className="text-[oklch(0.75_0.15_85)] mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">{content.affiliate}</h3>
              <p className="text-[oklch(0.65_0.03_85)] text-sm font-light">
                {content.affiliateDesc}
              </p>
            </Card>

            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-6">
              <div className="text-[oklch(0.75_0.15_85)] mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">{content.responsible}</h3>
              <p className="text-[oklch(0.65_0.03_85)] text-sm font-light">
                {content.responsibleDesc}
              </p>
            </Card>

            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-6">
              <div className="text-[oklch(0.75_0.15_85)] mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">{content.algorithm}</h3>
              <p className="text-[oklch(0.65_0.03_85)] text-sm font-light">
                {content.algorithmDesc}
              </p>
            </Card>

            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-6">
              <div className="text-[oklch(0.75_0.15_85)] mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">{content.data}</h3>
              <p className="text-[oklch(0.65_0.03_85)] text-sm font-light">
                {content.dataDesc}
              </p>
            </Card>
          </div>

          {/* Blog teaser */}
          <Card className="bg-gradient-to-r from-[oklch(0.10_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="inline-block bg-[oklch(0.75_0.15_85)]/10 text-[oklch(0.75_0.15_85)] text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {content.latestBlog}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">
                  {content.blogTitle}
                </h3>
                <p className="text-[oklch(0.65_0.03_85)] font-light">
                  {content.blogDesc}
                </p>
              </div>
              <Button
                variant="outline"
                className="border-2 border-[oklch(0.75_0.15_85)]/50 text-[oklch(0.85_0.15_85)] hover:bg-[oklch(0.75_0.15_85)]/10 hover:border-[oklch(0.75_0.15_85)] font-semibold px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                {content.readMore}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══ Service Packages ═══ */}
      <section id="services" className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {content.packages}
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto font-light">
              {content.packagesDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Core Visibility */}
            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 hover:border-[oklch(0.75_0.15_85)]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
                <div>
                  <h3 className="text-2xl font-bold text-[oklch(0.85_0.15_85)]">{content.coreVisibility}</h3>
                  <p className="text-[oklch(0.75_0.15_85)] font-semibold text-lg">{content.corePrice}</p>
                </div>
              </div>
              <p className="text-[oklch(0.65_0.03_85)] mb-6 font-light">
                {content.coreDesc}
              </p>
              <ul className="space-y-3 mb-8">
                {content.coreFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[oklch(0.75_0.03_85)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center pt-6 border-t border-[oklch(0.75_0.15_85)]/20">
                <p className="text-sm text-[oklch(0.55_0.03_85)] mb-2">Case:</p>
                <p className="text-[oklch(0.75_0.15_85)] font-semibold">{content.coreCase}</p>
              </div>
            </Card>

            {/* Full Podcast Power */}
            <Card className="bg-gradient-to-b from-[oklch(0.14_0.03_250)] to-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/40 p-8 relative overflow-hidden hover:border-[oklch(0.75_0.15_85)]/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] transform hover:scale-105">
              <div className="absolute top-4 right-4 bg-[oklch(0.75_0.15_85)] text-[oklch(0.08_0.01_250)] text-xs font-bold px-3 py-1 rounded-full">
                {content.popular}
              </div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
                <div>
                  <h3 className="text-2xl font-bold text-[oklch(0.85_0.15_85)]">{content.fullPodcast}</h3>
                  <p className="text-[oklch(0.75_0.15_85)] font-semibold text-lg">{content.fullPrice}</p>
                </div>
              </div>
              <p className="text-[oklch(0.65_0.03_85)] mb-6 font-light">
                {content.fullDesc}
              </p>
              <ul className="space-y-3 mb-8">
                {content.fullFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[oklch(0.75_0.03_85)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center pt-6 border-t border-[oklch(0.75_0.15_85)]/20">
                <p className="text-sm text-[oklch(0.55_0.03_85)] mb-2">Case:</p>
                <p className="text-[oklch(0.75_0.15_85)] font-semibold">{content.fullCase}</p>
              </div>
            </Card>

            {/* Enterprise Full Control */}
            <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 hover:border-[oklch(0.75_0.15_85)]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
                <div>
                  <h3 className="text-2xl font-bold text-[oklch(0.85_0.15_85)]">{content.enterprise}</h3>
                  <p className="text-[oklch(0.75_0.15_85)] font-semibold text-lg">{content.enterprisePrice}</p>
                </div>
              </div>
              <p className="text-[oklch(0.65_0.03_85)] mb-6 font-light">
                {content.enterpriseDesc}
              </p>
              <ul className="space-y-3 mb-8">
                {content.enterpriseFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[oklch(0.75_0.03_85)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center pt-6 border-t border-[oklch(0.75_0.15_85)]/20">
                <p className="text-sm text-[oklch(0.55_0.03_85)]">{content.enterpriseNote}</p>
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
              {content.results}
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto font-light">
              {content.resultsDesc}
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
                    {content.case1}
                  </h3>
                  <p className="text-[oklch(0.65_0.03_85)] mb-4 font-light">
                    {content.case1Before}
                  </p>
                  <p className="text-[oklch(0.75_0.15_85)] font-semibold mb-6">
                    {content.case1After}
                  </p>
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
                    {content.case2}
                  </h3>
                  <p className="text-[oklch(0.75_0.15_85)] font-semibold">
                    {content.case2Result}
                  </p>
                </div>
              </div>
            </Card>

            {/* Case 3 */}
            <Card className="bg-gradient-to-r from-[oklch(0.10_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-[oklch(0.75_0.15_85)]/10 text-[oklch(0.75_0.15_85)] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    CASE STUDY #3
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">
                    {content.case3}
                  </h3>
                  <p className="text-[oklch(0.75_0.15_85)] font-semibold">
                    {content.case3Result}
                  </p>
                </div>
                <div className="bg-[oklch(0.06_0.01_250)] rounded-lg p-8 border border-[oklch(0.75_0.15_85)]/10 flex items-center justify-center min-h-[300px]">
                  <p className="text-[oklch(0.45_0.03_85)] text-center">
                    [Video embed tai Before/After -klipit]
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ Market Opening Countdown ═══ */}
      <section className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[oklch(0.85_0.15_85)]"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            {content.countdown}
          </h2>
          <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] mb-8 font-light">
            {content.countdownSubtitle}
          </p>
          <div className="grid grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
            {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
              <div key={unit} className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] rounded-lg p-4 sm:p-6 border border-[oklch(0.75_0.15_85)]/20">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[oklch(0.75_0.15_85)] tabular-nums">
                  {String(timeLeft[unit]).padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-[oklch(0.55_0.03_85)] mt-2 uppercase tracking-wider">
                  {unit === 'days' ? content.days : unit === 'hours' ? content.hours : unit === 'minutes' ? content.minutes : content.seconds}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-[oklch(0.55_0.03_85)] font-light italic">
            {content.ready}
          </p>
        </div>
      </section>

      {/* ═══ VIP Booking Flow ═══ */}
      <section id="contact" className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {content.contact}
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] font-light">
              {content.contactDesc}
            </p>
          </div>

          <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-8 sm:p-10">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[oklch(0.75_0.03_85)] mb-2">{content.name}</label>
                <input
                  type="text"
                  className="w-full bg-[oklch(0.06_0.01_250)] border border-[oklch(0.75_0.15_85)]/20 rounded-lg px-4 py-3 text-[oklch(0.92_0.01_85)] focus:outline-none focus:border-[oklch(0.75_0.15_85)] transition-colors"
                  placeholder={content.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[oklch(0.75_0.03_85)] mb-2">{content.email}</label>
                <input
                  type="email"
                  className="w-full bg-[oklch(0.06_0.01_250)] border border-[oklch(0.75_0.15_85)]/20 rounded-lg px-4 py-3 text-[oklch(0.92_0.01_85)] focus:outline-none focus:border-[oklch(0.75_0.15_85)] transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[oklch(0.75_0.03_85)] mb-2">{content.company}</label>
                <input
                  type="text"
                  className="w-full bg-[oklch(0.06_0.01_250)] border border-[oklch(0.75_0.15_85)]/20 rounded-lg px-4 py-3 text-[oklch(0.92_0.01_85)] focus:outline-none focus:border-[oklch(0.75_0.15_85)] transition-colors"
                  placeholder={content.company}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[oklch(0.75_0.03_85)] mb-2">{content.budget}</label>
                <textarea
                  rows={4}
                  className="w-full bg-[oklch(0.06_0.01_250)] border border-[oklch(0.75_0.15_85)]/20 rounded-lg px-4 py-3 text-[oklch(0.92_0.01_85)] focus:outline-none focus:border-[oklch(0.75_0.15_85)] transition-colors resize-none"
                  placeholder={content.budget}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.08_0.01_250)] hover:from-[oklch(0.80_0.15_85)] hover:to-[oklch(0.70_0.15_85)] font-semibold text-lg py-6 rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
                onClick={(e) => {
                  e.preventDefault();
                  toast.success(language === 'fi' ? "Kiitos yhteydenotostasi! Palaamme asiaan 1-2 arkipäivän kuluessa." : "Thank you for reaching out! We'll get back to you within 1-2 business days.");
                }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {content.send}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-[oklch(0.75_0.15_85)]/20 text-center">
              <p className="text-sm text-[oklch(0.65_0.03_85)] mb-3">{content.directContact}</p>
              <div className="space-y-2">
                <a
                  href="mailto:info@matilda.media"
                  className="block text-[oklch(0.85_0.15_85)] hover:text-[oklch(0.95_0.15_85)] font-semibold transition-colors underline decoration-[oklch(0.75_0.15_85)]/50 hover:decoration-[oklch(0.75_0.15_85)]"
                >
                  info@matilda.media
                </a>
                <a
                  href="tel:+358402581601"
                  className="block text-[oklch(0.85_0.15_85)] hover:text-[oklch(0.95_0.15_85)] font-semibold transition-colors underline decoration-[oklch(0.75_0.15_85)]/50 hover:decoration-[oklch(0.75_0.15_85)]"
                >
                  {content.phone}
                </a>
              </div>
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
                {content.footer}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3 text-[oklch(0.75_0.03_85)] uppercase tracking-wider">Yhteystiedot</h4>
              <p className="text-sm text-[oklch(0.65_0.03_85)] font-light mb-2">
                {content.address}
              </p>
              <p className="text-sm text-[oklch(0.65_0.03_85)] font-light mb-2">
                {content.businessId}
              </p>
              <a
                href="mailto:info@matilda.media"
                className="text-sm text-[oklch(0.75_0.15_85)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
              >
                info@matilda.media
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3 text-[oklch(0.75_0.03_85)] uppercase tracking-wider">{content.links}</h4>
              <Link href="/blogi">
                <span className="block text-sm text-[oklch(0.65_0.03_85)] hover:text-[oklch(0.75_0.15_85)] transition-colors font-light mb-2 cursor-pointer">
                  {content.blog}
                </span>
              </Link>
              <p className="text-sm text-[oklch(0.65_0.03_85)] font-light mt-4">
                {content.gdpr}
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-[oklch(0.75_0.15_85)]/10 text-center">
            <p className="text-sm text-[oklch(0.55_0.03_85)] font-light">
              {content.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Spacer for mobile scrolling */}
      <div className="h-[20vh] sm:h-[15vh]"></div>
    </div>
  );
}
