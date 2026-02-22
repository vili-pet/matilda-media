import { Link } from "wouter";
import { Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Blog listing page - displays all blog posts
 * Maintains the same Art Deco Luxury aesthetic as the main site
 */

// Blog post metadata
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

// Sample blog posts (in production, this would come from a CMS or markdown files)
const blogPosts: BlogPost[] = [
  {
    slug: "top-5-tapaa-saada-kasinon-klipit-tiktokiin-2026",
    title: "Top 5 tapaa saada kasinon klipit TikTokiin ilman shadowbannia 2026",
    excerpt: "TikTokin algoritmi on muuttunut merkittävästi vuoden 2026 alussa. Tässä artikkelissa jaamme viisi todistettua strategiaa, joilla kasinon sisältö menee läpi ilman shadowbannia.",
    date: "2026-02-15",
    readTime: "5 min",
    category: "Sosiaalinen media"
  },
  {
    slug: "miten-luoda-engaging-podcast-sisaltoa-igaming-alalle",
    title: "Miten luoda engaging podcast-sisältöä iGaming-alalle",
    excerpt: "Podcastit ovat nousseet yhdeksi tehokkaimmista tavoista rakentaa brändiä iGaming-alalla. Tässä oppaassa käymme läpi, miten luot sisältöä joka resonoi yleisön kanssa.",
    date: "2026-02-10",
    readTime: "8 min",
    category: "Podcast"
  },
  {
    slug: "rahapelilain-avautuminen-2027-mitä-se-tarkoittaa-sisältötuottajille",
    title: "Rahapelilain avautuminen 2027 – mitä se tarkoittaa sisältötuottajille",
    excerpt: "Suomen rahapelilaki aukeaa heinäkuussa 2027. Tämä muutos tuo merkittäviä mahdollisuuksia sisältötuottajille ja markkinoijille. Käymme läpi tärkeimmät muutokset.",
    date: "2026-02-05",
    readTime: "6 min",
    category: "Lainsäädäntö"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_250)] text-[oklch(0.92_0.01_85)]">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 overflow-hidden border-b border-[oklch(0.75_0.15_85)]/10">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[oklch(0.75_0.15_85)] blur-[120px] rounded-full" />
        </div>

        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <Link href="/">
              <a className="inline-block text-3xl sm:text-4xl font-bold mb-6 tracking-tight hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-[oklch(0.85_0.15_85)]">MATILDA</span>
                <span className="text-[oklch(0.92_0.01_85)]"> MEDIA</span>
              </a>
            </Link>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-[oklch(0.75_0.15_85)] to-transparent mb-8" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6 text-[oklch(0.85_0.15_85)]"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Blogi
          </h1>
          <p className="text-center text-lg sm:text-xl text-[oklch(0.65_0.03_85)] max-w-3xl mx-auto font-light">
            Vinkkejä, strategioita ja näkemyksiä iGaming-median maailmasta
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 sm:py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blogi/${post.slug}`}>
                <a>
                  <Card className="bg-gradient-to-b from-[oklch(0.12_0.02_250)] to-[oklch(0.08_0.01_250)] border-[oklch(0.75_0.15_85)]/20 hover:border-[oklch(0.75_0.15_85)]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] group h-full">
                    <div className="p-6 flex flex-col h-full">
                      {/* Category & Read Time */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className="text-[oklch(0.75_0.15_85)] font-medium">{post.category}</span>
                        <span className="text-[oklch(0.55_0.03_85)]">{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[oklch(0.92_0.01_85)] group-hover:text-[oklch(0.85_0.15_85)] transition-colors"
                        style={{ fontFamily: 'Playfair Display, serif' }}>
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[oklch(0.65_0.03_85)] font-light mb-6 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Date & Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-[oklch(0.75_0.15_85)]/10">
                        <div className="flex items-center gap-2 text-sm text-[oklch(0.55_0.03_85)]">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('fi-FI', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </time>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[oklch(0.75_0.15_85)] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[oklch(0.75_0.15_85)]/10 py-12 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <Link href="/">
            <a className="inline-block text-2xl font-bold mb-4 hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-[oklch(0.85_0.15_85)]">MATILDA</span>
              <span className="text-[oklch(0.92_0.01_85)]"> MEDIA</span>
            </a>
          </Link>
          <p className="text-sm text-[oklch(0.55_0.03_85)]">
            © 2026 Matilda Media. Helsinki, Suomi.
          </p>
        </div>
      </footer>
    </div>
  );
}
