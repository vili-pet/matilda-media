import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Calendar, TrendingUp, Users, Zap, CheckCircle2, ArrowRight, Shield, BarChart3, Target } from "lucide-react";

/**
 * Matilda Media - Premium B2B iGaming Market Entry Platform
 * Design Philosophy: Luxury Minimalism
 * - Dark background with refined gold accents
 * - Clear hierarchy, generous whitespace
 * - Benefit-first messaging for CMOs and market entry teams
 * - English default, Finnish secondary
 * - No pricing - engagement models only
 * - Compliance and ROI focus
 */

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'fi'>('en');
  const [impressions, setImpressions] = useState(0);

  // Animate impressions counter on mount
  useEffect(() => {
    const target = 31000000;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setImpressions(target);
        clearInterval(timer);
      } else {
        setImpressions(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const t = {
    en: {
      hero1: "Finland Opens in 2027.",
      hero2: "The Audience Is Being Built Now.",
      heroSub: "Matilda Media helps international iGaming operators establish organic authority in Finland before regulation shifts. Local culture. Platform algorithms. Compliance-first execution.",
      ctaPrimary: "Schedule a Strategic Market Entry Call",
      ctaSecondary: "View Market Impact",
      kpi1: "organic views delivered",
      kpi2: "paid media views",
      kpi3: "estimated monthly ROI",
      kpi4: "100% compliance-focused execution",
      kpiNote: "Updated monthly • Based on platform analytics • Available for due diligence under NDA",
      whyTitle: "Why Matilda Media?",
      whySub: "Finland-first organic market positioning for iGaming brands entering a regulated environment.",
      pillar1Title: "Market Entry Strategy",
      pillar1Desc: "Position your brand in Finnish digital culture before paid media becomes crowded and expensive.",
      pillar2Title: "Compliance-Ready Content",
      pillar2Desc: "Built with regulatory awareness and responsible gaming principles from day one.",
      pillar3Title: "Organic Distribution Engine",
      pillar3Desc: "Algorithm-native short-form and podcast ecosystems that scale without paid acquisition dependency.",
      pillar4Title: "Reporting & ROI Intelligence",
      pillar4Desc: "Know what drives deposits — not just views. Transparent analytics and monthly performance reviews.",
      packagesTitle: "Strategic Partnership",
      packagesSub: "Fully customized market entry execution. No templates. No limits.",
      packageMain: "The sky is the limit",
      packageDesc: "Every operator's market entry is unique. If you have the budget, we'll source whatever you need — from Finnish cultural consultants to Japanese video editors. No templates. No limits. Just results.",
      packageFeatures: ["Fully custom market entry strategy", "Compliance-first execution from day one", "Dedicated strategic lead", "Whatever resources your brand needs", "Cross-platform organic dominance (TikTok, YouTube, Instagram, Facebook, X, Snapchat)", "Market transition roadmap to 2027", "Monthly performance reviews & ROI intelligence"],
      packageGuarantee: "Performance Guarantee",
      packageGuaranteeDesc: "We stand behind our work. If we don't deliver measurable organic growth within 90 days, we'll work for free until we do.",
      ctaProposal: "Request Custom Proposal",
      casesTitle: "Measured Market Impact",
      casesSub: "Client identities withheld due to confidentiality agreements and Finnish gambling legislation. All campaigns executed in compliance with applicable regulations.",
      case1Title: "European Operator",
      case1Sub: "Pre-regulation organic positioning",
      case1Metric1: "+520% follower growth (8.4K → 52K)",
      case1Metric2: "13.7% engagement rate",
      case1Note: "Well-known online casino brand. Client confidentiality protected under NDA.",
      case2Title: "Betting Brand",
      case2Metric1: "1.2M impressions (first month)",
      case2Metric2: "8.4x ROI",
      case2Note: "Established betting brand. Client confidentiality protected under NDA.",
      case3Title: "New Casino (Preparing for 2027)",
      case3Metric1: "430K organic TikTok views",
      case3Metric2: "Pre-2027 audience building",
      case3Note: "New casino operator. Client confidentiality protected under NDA.",
      casesFooter: "Detailed performance data available under NDA.",
      contactTitle: "Start Your Market Entry",
      contactSub: "Schedule a 15-minute strategic call or contact us directly",
      name: "Name",
      email: "Email",
      company: "Company",
      message: "Market entry goals",
      send: "Send Inquiry",
      directContact: "Or contact us directly:",
      footer: "Finnish iGaming market entry specialist. Ready for 2027.",
      address: "Helsinki / Keuruu",
      businessId: "Business ID: 3469822-4",
      links: "Links",
      privacy: "Privacy Policy",
      legalNotice: "Compliance",
      legalText: "All activities conducted in full compliance with Finnish gambling legislation. No violations at any stage.",
      gdpr: "GDPR & responsible marketing compliant",
      copyright: "© 2026 Matilda Media. All rights reserved.",
    },
    fi: {
      hero1: "Suomi avautuu 2027.",
      hero2: "Yleisö rakennetaan nyt.",
      heroSub: "Matilda Media auttaa kansainvälisiä iGaming-operaattoreita rakentamaan orgaanista auktoriteettia Suomessa ennen sääntelyn muutosta. Paikallinen kulttuuri. Alustakohtaiset algoritmit (TikTok, YouTube, Facebook, Instagram, X, Snapchat). Compliance-fokus.",
      ctaPrimary: "Varaa strateginen markkinoille tulopuhelu",
      ctaSecondary: "Katso markkinavaikutus",
      kpi1: "orgaanista katselukertaa toimitettu",
      kpi2: "maksettua mainoskatselua",
      kpi3: "arvioitu kuukausittainen ROI",
      kpi4: "100% compliance-fokus",
      kpiNote: "Päivitetään kuukausittain • Perustuu alusta-analytiikkaan • Saatavilla due diligence -tarkoituksiin NDA:n alla",
      whyTitle: "Miksi Matilda Media?",
      whySub: "Suomi-ensiksi orgaaninen markkinapositiointi iGaming-brändeille, jotka tulevat säänneltyyn ympäristöön.",
      pillar1Title: "Markkinoille tulostrategia",
      pillar1Desc: "Asemoi brändisi suomalaiseen digitaaliseen kulttuuriin ennen kuin maksettu media muuttuu ruuhkaiseksi ja kalliiksi.",
      pillar2Title: "Compliance-valmis sisältö",
      pillar2Desc: "Rakennettu sääntelytietoisuudella ja vastuullisen pelaamisen periaatteilla alusta alkaen.",
      pillar3Title: "Orgaaninen jakelumoottori",
      pillar3Desc: "Algoritmiystävälliset lyhytvideot (TikTok, YouTube Shorts, Instagram Reels, Facebook, X, Snapchat), jotka skaalautuvat ilman maksettua hankintariippuvuutta.",
      pillar4Title: "Raportointi & ROI-älykkyys",
      pillar4Desc: "Tiedä mikä ajaa talletuksia — ei vain katselukertoja. Läpinäkyvä analytiikka ja kuukausittaiset suorituskykyarvioinnit.",
      packagesTitle: "Strateginen kumppanuus",
      packagesSub: "Täysin räätälöity markkinoille tulototeutus. Ei malleja. Ei rajoja.",
      packageMain: "Taivas on rajana",
      packageDesc: "Jokaisen operaattorin markkinoille tulo on ainutlaatuinen. Jos sinulla on budjetti, hankimme mitä tahansa tarvitset — suomalaisista kulttuurikonsulteista japanilaisiin videoeditoreihiin. Ei malleja. Ei rajoja. Vain tuloksia.",
      packageFeatures: ["Täysin räätälöity markkinoille tulostrategia", "Compliance-ensiksi toteutus alusta alkaen", "Oma strateginen johtaja", "Mitä tahansa resursseja brändisi tarvitsee", "Monialustainen orgaaninen dominanssi (TikTok, YouTube, Instagram, Facebook, X, Snapchat)", "Markkinasiirtymän roadmap 2027:ään", "Kuukausittaiset suorituskykyarvioinnit & ROI-älykkyys"],
      packageGuarantee: "Tulostakuu",
      packageGuaranteeDesc: "Seisomme työmme takana. Jos emme toimita mitattavaa orgaanista kasvua 90 päivän kuluessa, työskentelemme ilmaiseksi kunnes teemme.",
      ctaProposal: "Pyydä räätälöity ehdotus",
      casesTitle: "Mitattu markkinavaikutus",
      casesSub: "Asiakkaiden henkilöllisyys salattu luottamuksellisuussopimusten ja Suomen rahapelihallinnon vuoksi. Kaikki kampanjat toteutettu sovellettavien säännösten mukaisesti.",
      case1Title: "Eurooppalainen operaattori",
      case1Sub: "Esisääntelyorgaaninen positiointi",
      case1Metric1: "+520% seuraajien kasvu (8,4K → 52K)",
      case1Metric2: "13,7% sitoutumisprosentti",
      case1Note: "Tunnettu online-kasinobrändi. Asiakkaan luottamuksellisuus suojattu NDA:lla.",
      case2Title: "Vedonlyöntibrändi",
      case2Metric1: "1,2M näyttökertaa (ensimmäinen kuukausi)",
      case2Metric2: "8,4x ROI",
      case2Note: "Vakiintunut vedonlyöntibrändi. Asiakkaan luottamuksellisuus suojattu NDA:lla.",
      case3Title: "Uusi kasino (Valmistellaan 2027)",
      case3Metric1: "430K orgaanista TikTok-katselukertaa",
      case3Metric2: "Yleisön rakentaminen ennen 2027",
      case3Note: "Uusi kasinooperaattori. Asiakkaan luottamuksellisuus suojattu NDA:lla.",
      casesFooter: "Yksityiskohtainen suorituskykydata saatavilla NDA:n alla.",
      contactTitle: "Aloita markkinoille tulosi",
      contactSub: "Varaa 15 minuutin strateginen puhelu tai ota yhteyttä suoraan",
      name: "Nimi",
      email: "Sähköposti",
      company: "Yritys",
      message: "Markkinoille tulon tavoitteet",
      send: "Lähetä kysely",
      directContact: "Tai ota yhteyttä suoraan:",
      footer: "Suomalainen iGaming-markkinoille tulon asiantuntija. Valmis 2027.",
      address: "Helsinki / Keuruu",
      businessId: "Y-tunnus: 3469822-4",
      links: "Linkit",
      privacy: "Tietosuojakäytäntö",
      legalNotice: "Vaatimustenmukaisuus",
      legalText: "Kaikki toiminta suoritetaan täysin Suomen rahapelihallinnon mukaisesti. Ei rikkomuksia missään vaiheessa.",
      gdpr: "GDPR- ja vastuullinen markkinointi -yhteensopiva",
      copyright: "© 2026 Matilda Media. Kaikki oikeudet pidätetään.",
    }
  };

  const content = t[language];

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_250)] text-[oklch(0.92_0.01_85)]">
      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
            language === 'en'
              ? 'bg-[oklch(0.75_0.15_85)] text-[oklch(0.08_0.01_250)]'
              : 'bg-[oklch(0.12_0.02_250)] text-[oklch(0.75_0.15_85)] border border-[oklch(0.75_0.15_85)]/30'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('fi')}
          className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
            language === 'fi'
              ? 'bg-[oklch(0.75_0.15_85)] text-[oklch(0.08_0.01_250)]'
              : 'bg-[oklch(0.12_0.02_250)] text-[oklch(0.75_0.15_85)] border border-[oklch(0.75_0.15_85)]/30'
          }`}
        >
          FI
        </button>
      </div>

      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[oklch(0.75_0.15_85)] blur-[150px] rounded-full" />
        </div>

        <div className="container max-w-6xl mx-auto relative z-10">
          {/* Logo/Brand */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-[oklch(0.85_0.15_85)]">MATILDA</span>
              <span className="text-[oklch(0.92_0.01_85)]"> MEDIA</span>
            </h1>
          </div>

          {/* Hero Message */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-center mb-6 leading-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {content.hero1}<br />
            <span className="text-[oklch(0.75_0.15_85)]">{content.hero2}</span>
          </h2>

          <p className="text-center text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-4xl mx-auto mb-16 font-light leading-relaxed">
            {content.heroSub}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.08_0.01_250)] hover:from-[oklch(0.80_0.15_85)] hover:to-[oklch(0.70_0.15_85)] font-semibold text-lg px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-105"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {content.ctaPrimary}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.85_0.15_85)] hover:bg-[oklch(0.75_0.15_85)]/10 hover:border-[oklch(0.75_0.15_85)] font-semibold text-lg px-8 py-6 rounded-lg transition-all duration-300"
              onClick={() => {
                const casesSection = document.getElementById('cases');
                casesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {content.ctaSecondary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* KPI Strip */}
          <div className="bg-[oklch(0.10_0.02_250)] border border-[oklch(0.75_0.15_85)]/10 rounded-lg p-8 sm:p-10">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[oklch(0.75_0.15_85)] mb-2 tabular-nums">
                  {(impressions / 1000000).toFixed(0)}M+
                </div>
                <div className="text-xs sm:text-sm text-[oklch(0.65_0.03_85)] font-light">
                  {content.kpi1}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[oklch(0.75_0.15_85)] mb-2">
                  2.1M
                </div>
                <div className="text-xs sm:text-sm text-[oklch(0.65_0.03_85)] font-light">
                  {content.kpi2}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[oklch(0.75_0.15_85)] mb-2">
                  €120K+
                </div>
                <div className="text-xs sm:text-sm text-[oklch(0.65_0.03_85)] font-light">
                  {content.kpi3}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[oklch(0.75_0.15_85)] mb-2">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-[oklch(0.65_0.03_85)] font-light">
                  {content.kpi4}
                </div>
              </div>
            </div>
            <p className="text-xs text-center text-[oklch(0.55_0.03_85)] font-light">
              {content.kpiNote}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Why Matilda - Core Pillars ═══ */}
      <section className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {content.whyTitle}
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto font-light">
              {content.whySub}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <Card className="bg-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/10 p-8 hover:border-[oklch(0.75_0.15_85)]/30 transition-all duration-300">
              <div className="text-[oklch(0.75_0.15_85)] mb-6">
                <Target className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">{content.pillar1Title}</h3>
              <p className="text-[oklch(0.65_0.03_85)] font-light leading-relaxed">
                {content.pillar1Desc}
              </p>
            </Card>

            <Card className="bg-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/10 p-8 hover:border-[oklch(0.75_0.15_85)]/30 transition-all duration-300">
              <div className="text-[oklch(0.75_0.15_85)] mb-6">
                <Shield className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">{content.pillar2Title}</h3>
              <p className="text-[oklch(0.65_0.03_85)] font-light leading-relaxed">
                {content.pillar2Desc}
              </p>
            </Card>

            <Card className="bg-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/10 p-8 hover:border-[oklch(0.75_0.15_85)]/30 transition-all duration-300">
              <div className="text-[oklch(0.75_0.15_85)] mb-6">
                <TrendingUp className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">{content.pillar3Title}</h3>
              <p className="text-[oklch(0.65_0.03_85)] font-light leading-relaxed">
                {content.pillar3Desc}
              </p>
            </Card>

            <Card className="bg-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/10 p-8 hover:border-[oklch(0.75_0.15_85)]/30 transition-all duration-300">
              <div className="text-[oklch(0.75_0.15_85)] mb-6">
                <BarChart3 className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">{content.pillar4Title}</h3>
              <p className="text-[oklch(0.65_0.03_85)] font-light leading-relaxed">
                {content.pillar4Desc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ Engagement Models (No Pricing) ═══ */}
      <section id="services" className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {content.packagesTitle}
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto font-light">
              {content.packagesSub}
            </p>
          </div>

          {/* Single Premium Package */}
          <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 p-10 sm:p-12 max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <Users className="h-12 w-12 text-[oklch(0.75_0.15_85)]" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">
                {content.packageMain}
              </h3>
              <p className="text-lg text-[oklch(0.65_0.03_85)] font-light leading-relaxed max-w-2xl mx-auto">
                {content.packageDesc}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {content.packageFeatures.map((feature: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[oklch(0.75_0.15_85)] flex-shrink-0 mt-0.5" />
                  <span className="text-[oklch(0.75_0.03_85)]">{feature}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[oklch(0.75_0.15_85)]/20 pt-8">
              <div className="bg-[oklch(0.75_0.15_85)]/10 rounded-lg p-6 text-center">
                <h4 className="text-xl font-bold text-[oklch(0.75_0.15_85)] mb-3">
                  {content.packageGuarantee}
                </h4>
                <p className="text-sm text-[oklch(0.65_0.03_85)] font-light">
                  {content.packageGuaranteeDesc}
                </p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.08_0.01_250)] hover:from-[oklch(0.80_0.15_85)] hover:to-[oklch(0.70_0.15_85)] font-semibold text-lg px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {content.ctaProposal}
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ Case Studies ═══ */}
      <section id="cases" className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {content.casesTitle}
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-4xl mx-auto font-light">
              {content.casesSub}
            </p>
          </div>

          <div className="space-y-12 mb-12">
            {/* Case 1 */}
            <Card className="bg-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/10 p-8 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-[oklch(0.75_0.15_85)]/10 text-[oklch(0.75_0.15_85)] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    CASE STUDY #1
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-[oklch(0.85_0.15_85)]">
                    {content.case1Title}
                  </h3>
                  <p className="text-sm text-[oklch(0.55_0.03_85)] mb-4 font-light">
                    {content.case1Sub}
                  </p>
                  <p className="text-xl font-bold text-[oklch(0.75_0.15_85)] mb-2">
                    {content.case1Metric1}
                  </p>
                  <p className="text-lg text-[oklch(0.65_0.03_85)] mb-3 font-light">
                    {content.case1Metric2}
                  </p>
                  <p className="text-sm text-[oklch(0.55_0.03_85)] font-light">
                    {content.case1Note}
                  </p>
                </div>
                <div className="bg-[oklch(0.06_0.01_250)] rounded-lg p-8 border border-[oklch(0.75_0.15_85)]/10 min-h-[300px] flex flex-col justify-center">
                  {/* Blurred Green Logo (Unibet-style) */}
                  <div className="mb-8 flex justify-center relative">
                    <div className="w-32 h-32 rounded-2xl relative" style={{
                      background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                      filter: 'blur(12px)',
                      opacity: 0.4
                    }}>
                      <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white" style={{ filter: 'blur(2px)' }}>U</div>
                    </div>
                  </div>
                  {/* Performance Meters */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-[oklch(0.65_0.03_85)] mb-1">
                        <span>Engagement Rate</span>
                        <span>13.7%</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.15_0.02_250)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)]" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-[oklch(0.65_0.03_85)] mb-1">
                        <span>Follower Growth</span>
                        <span>+520%</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.15_0.02_250)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)]" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-[oklch(0.65_0.03_85)] mb-1">
                        <span>Organic Reach</span>
                        <span>100%</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.15_0.02_250)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)]" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Case 2 */}
            <Card className="bg-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/10 p-8 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-[oklch(0.06_0.01_250)] rounded-lg p-8 border border-[oklch(0.75_0.15_85)]/10 min-h-[300px] flex flex-col justify-center">
                  {/* Blurred Red Logo (Bet365-style) */}
                  <div className="mb-8 flex justify-center relative">
                    <div className="w-32 h-32 rounded-2xl relative" style={{
                      background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                      filter: 'blur(12px)',
                      opacity: 0.4
                    }}>
                      <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white" style={{ filter: 'blur(2px)' }}>B</div>
                    </div>
                  </div>
                  {/* Performance Meters */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-[oklch(0.65_0.03_85)] mb-1">
                        <span>Impressions</span>
                        <span>1.2M</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.15_0.02_250)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)]" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-[oklch(0.65_0.03_85)] mb-1">
                        <span>ROI</span>
                        <span>8.4x</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.15_0.02_250)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)]" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-[oklch(0.65_0.03_85)] mb-1">
                        <span>Paid Media</span>
                        <span>0%</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.15_0.02_250)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[oklch(0.55_0.15_85)] to-[oklch(0.45_0.15_85)]" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block bg-[oklch(0.75_0.15_85)]/10 text-[oklch(0.75_0.15_85)] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    CASE STUDY #2
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">
                    {content.case2Title}
                  </h3>
                  <p className="text-xl font-bold text-[oklch(0.75_0.15_85)] mb-2">
                    {content.case2Metric1}
                  </p>
                  <p className="text-lg text-[oklch(0.65_0.03_85)] mb-3 font-light">
                    {content.case2Metric2}
                  </p>
                  <p className="text-sm text-[oklch(0.55_0.03_85)] font-light">
                    {content.case2Note}
                  </p>
                </div>
              </div>
            </Card>

            {/* Case 3 */}
            <Card className="bg-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/10 p-8 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-[oklch(0.75_0.15_85)]/10 text-[oklch(0.75_0.15_85)] text-xs font-bold px-3 py-1 rounded-full mb-4">
                    CASE STUDY #3
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[oklch(0.85_0.15_85)]">
                    {content.case3Title}
                  </h3>
                  <p className="text-xl font-bold text-[oklch(0.75_0.15_85)] mb-2">
                    {content.case3Metric1}
                  </p>
                  <p className="text-lg text-[oklch(0.65_0.03_85)] mb-3 font-light">
                    {content.case3Metric2}
                  </p>
                  <p className="text-sm text-[oklch(0.55_0.03_85)] font-light">
                    {content.case3Note}
                  </p>
                </div>
                <div className="bg-[oklch(0.06_0.01_250)] rounded-lg p-8 border border-[oklch(0.75_0.15_85)]/10 min-h-[300px] flex flex-col justify-center">
                  {/* Blurred Blue Logo (888-style) */}
                  <div className="mb-8 flex justify-center relative">
                    <div className="w-32 h-32 rounded-2xl relative" style={{
                      background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                      filter: 'blur(12px)',
                      opacity: 0.4
                    }}>
                      <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white" style={{ filter: 'blur(2px)' }}>8</div>
                    </div>
                  </div>
                  {/* Performance Meters */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-[oklch(0.65_0.03_85)] mb-1">
                        <span>TikTok Views</span>
                        <span>430K</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.15_0.02_250)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)]" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-[oklch(0.65_0.03_85)] mb-1">
                        <span>Pre-2027 Positioning</span>
                        <span>Active</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.15_0.02_250)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)]" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-[oklch(0.65_0.03_85)] mb-1">
                        <span>Paid Advertising</span>
                        <span>0%</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.15_0.02_250)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[oklch(0.55_0.15_85)] to-[oklch(0.45_0.15_85)]" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-sm text-[oklch(0.75_0.15_85)] font-semibold">
              {content.casesFooter}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Contact ═══ */}
      <section id="contact" className="py-20 sm:py-32 px-4 border-t border-[oklch(0.75_0.15_85)]/10">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[oklch(0.85_0.15_85)]"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {content.contactTitle}
            </h2>
            <p className="text-lg sm:text-xl text-[oklch(0.65_0.03_85)] font-light">
              {content.contactSub}
            </p>
          </div>

          <Card className="bg-[oklch(0.10_0.02_250)] border-[oklch(0.75_0.15_85)]/10 p-8 sm:p-10">
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
                <label className="block text-sm font-medium text-[oklch(0.75_0.03_85)] mb-2">{content.message}</label>
                <textarea
                  rows={4}
                  className="w-full bg-[oklch(0.06_0.01_250)] border border-[oklch(0.75_0.15_85)]/20 rounded-lg px-4 py-3 text-[oklch(0.92_0.01_85)] focus:outline-none focus:border-[oklch(0.75_0.15_85)] transition-colors resize-none"
                  placeholder={content.message}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[oklch(0.75_0.15_85)] to-[oklch(0.65_0.15_85)] text-[oklch(0.08_0.01_250)] hover:from-[oklch(0.80_0.15_85)] hover:to-[oklch(0.70_0.15_85)] font-semibold text-lg py-6 rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
                onClick={(e) => {
                  e.preventDefault();
                  toast.success(language === 'en' ? "Thank you for reaching out! We'll get back to you within 1-2 business days." : "Kiitos yhteydenotostasi! Palaamme asiaan 1-2 arkipäivän kuluessa.");
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
                  +358 40 258 1601
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
              <h4 className="text-sm font-bold mb-3 text-[oklch(0.75_0.03_85)] uppercase tracking-wider">Contact</h4>
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
              <h4 className="text-sm font-bold mb-3 text-[oklch(0.75_0.03_85)] uppercase tracking-wider">{content.legalNotice}</h4>
              <p className="text-sm text-[oklch(0.65_0.03_85)] font-light leading-relaxed">
                {content.legalText}
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-[oklch(0.75_0.15_85)]/10 text-center">
            <p className="text-sm text-[oklch(0.65_0.03_85)] font-light mb-2">
              {content.gdpr}
            </p>
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
