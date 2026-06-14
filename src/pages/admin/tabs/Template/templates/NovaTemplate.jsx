import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight, Star, Plus, Leaf } from "lucide-react";
import TemplatePreviewMeta from "../TemplatePreviewMeta";
import { Link } from "react-router-dom";

/* ---------------- DATA ---------------- */
const HERO_IMAGES = [
  { src: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80", tag: "Hatha" },
  { src: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=900&q=80", tag: "Pilates" },
  { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80", tag: "Meditation" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80", tag: "Vinyasa" },
  { src: "https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=900&q=80", tag: "Yin" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80", tag: "Breathwork" },
  { src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80", tag: "Power" },
];

const ABOUT_CARDS = [
  { img: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=900&q=80", tag: "All Levels" },
  { img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80", tag: "Advanced" },
  { img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80", tag: "Beginner" },
];

const STATS = [
  { v: "93", suffix: "%", t: "Feel More Mentally Clear", d: "Members report sharper focus within four weeks of weekly practice." },
  { v: "87", suffix: "%", t: "Feel More Connected", d: "Quiet group classes build a room full of regulars who quietly nod hello." },
  { v: "95", suffix: "%", t: "Self-Care Routine", d: "Small, weekly rituals that turn into the calmest hour of the week." },
];

const CLASSES = [
  { id: "breath-cold", title: "Breath & Cold", level: "Beginner", duration: "60 min", img: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=900&q=80", desc: "A dynamic, breath-led practice that builds heat, strength and fluidity." },
  { id: "restorative-yoga", title: "Restorative Yoga", level: "Intermediate", duration: "40 min", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80", desc: "Slow, deeply held postures that release tension and restore the nervous system." },
  { id: "infrared-sauna", title: "Infrared Sauna", level: "Advanced", duration: "40 min", img: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80", desc: "Heat-based therapy that supports circulation, detoxification and recovery." },
  { id: "sound-bath", title: "Sound Bath", level: "Intermediate", duration: "55 min", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80", desc: "Immersive sound healing using crystal bowls, gongs and resonant vibration." },
  { id: "contrast-therapy", title: "Contrast Therapy", level: "Intermediate", duration: "60 min", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80", desc: "Alternating heat and cold cycles for resilience and metabolic balance." },
  { id: "slow-vinyasa", title: "Slow Vinyasa", level: "Beginner", duration: "45 min", img: "https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=900&q=80", desc: "Movement, unhurried — half the pace of a regular class, twice the awareness." },
];

const SCHEDULE = {
  Mon: [
    { n: "01", t: "Vinyasa Yoga", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80", dur: "75 min", price: "€28", desc: "The room dim enough to fall asleep in." },
    { n: "02", t: "Breath & Cold", img: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=600&q=80", dur: "60 min", price: "€65", desc: "Slow, deep table work for runners and climbers." },
    { n: "03", t: "Sound Bath", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80", dur: "45 min", price: "€52", desc: "The room dim enough to fall asleep in." },
    { n: "04", t: "Infrared Sauna", img: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=600&q=80", dur: "50 min", price: "€50", desc: "Movement, unhurried. Half the pace of the city." },
    { n: "05", t: "Myofascial Release", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80", dur: "31 min", price: "€40", desc: "Targeted release for deep, lingering tension." },
    { n: "06", t: "Slow Vinyasa", img: "https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=600&q=80", dur: "60 min", price: "€38", desc: "The room dim enough to fall asleep in." },
  ],
  Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [],
};

const TEACHERS = [
  { id: "sophia-lee", name: "Sophia Lee", style: "Yin Yoga", cred: "200hr YTT, Reiki Practitioner", img: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=700&q=80" },
  { id: "james-smith", name: "James Smith", style: "Power Yoga", cred: "250hr YTT, Strength Training", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80" },
  { id: "olivia-brown", name: "Olivia Brown", style: "Iyengar Yoga", cred: "200hr YTT, Alignment Specialist", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=80" },
  { id: "noah-wilson", name: "Noah Wilson", style: "Iyengar Yoga", cred: "200hr YTT, Alignment Specialist", img: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=700&q=80" },
  { id: "ava-davis", name: "Ava Davis", style: "Restorative", cred: "500hr YTT, Trauma-Informed", img: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=700&q=80" },
  { id: "mason-garcia", name: "Mason Garcia", style: "Aerial Yoga", cred: "300hr YTT, Heat Adaptation", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80" },
];

const PRICING = [
  { tag: "Drop-in", title: "Single Visit", monthly: "€180", annual: "€165", unit: "/Class", features: ["Any group class, any day", "Book up to 48 hours ahead", "Free cancellation (12h)", "Book up to 2 weeks ahead", "Pause anytime, no penalty"], cta: "Book a Drop-in" },
  { tag: "Most popular", title: "Monthly Member", monthly: "€220", annual: "€200", unit: "/month", features: ["Unlimited group classes", "One private per month", "Sauna & cold included", "Book up to 2 weeks ahead", "Pause anytime, no penalty"], cta: "Start Monthly", featured: true },
  { tag: "All-access", title: "House Member", monthly: "€320", annual: "€300", unit: "/month", features: ["Everything in Monthly", "Two privates per month", "Unlimited sauna + plunge", "Dedicated locker", "Sunday Reset ritual included"], cta: "Go House" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
];

const TESTIMONIALS = [
  { quote: "I started attending these yoga classes during a very stressful period in my life, and the difference it has made is incredible. From the very first session, I felt supported.", author: "Savannah Nguyen", role: "Nursing Assistant", img: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=400&q=80" },
  { quote: "I had never tried yoga before and honestly felt intimidated at first, but this class completely changed my perspective. The instructors make beginners feel comfortable.", author: "Esther Howard", role: "Marketing Coordinator", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" },
  { quote: "These yoga classes have transformed my overall wellbeing in ways I never expected. I originally joined to improve flexibility, but I gained mental clarity.", author: "Jenny Wilson", role: "President of Sales", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80" },
];

const BLOG = [
  { slug: "yin-yoga-patience", title: "What Yin Yoga Taught Me About Patience", tag: "Nutrition", time: "5 mins read", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80", excerpt: "Modern life often pulls us away from our bodies, keeping us in a constant state of distraction. Gentle yoga invites you back." },
  { slug: "restorative-yoga-art", title: "Finding Balance: The Art of Restorative Yoga", tag: "Movement", time: "6 mins read", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", excerpt: "How you begin your morning shapes the energy you carry throughout the day. A mindful start doesn't require hours." },
  { slug: "gentle-yoga-life", title: "Unwinding: How Gentle Yoga Changed My Life", tag: "Mindfulness", time: "7 mins read", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80", excerpt: "Balance isn't something you achieve once and hold onto forever—it's something you return to, again and again." },
];

const POLICIES = [
  { title: "Refund Policy", short: "7-day full refund window", body: "Memberships and class packs can be refunded in full within 7 days of purchase if you haven't attended a session." },
  { title: "Cancellation Policy", short: "Cancel up to 4 hours before", body: "Class bookings can be cancelled or rescheduled up to 4 hours before the session with no penalty." },
  { title: "Privacy Policy", short: "Your data stays yours", body: "We collect only what's needed. We never sell or share your personal data with third parties." },
  { title: "Terms of Service", short: "Clear, fair, transparent", body: "By joining you agree to our community guidelines, liability waiver and code of conduct — written in plain language." },
];

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Classes", to: "/classes" },
  { label: "Teachers", to: "/teachers" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

/* ---------------- HELPERS ---------------- */
// Calmlyss signature: huge letter-spaced text
const Spaced = ({ children, className = "" }) => (
  <span className={className} style={{ letterSpacing: "0.18em" }}>{children}</span>
);

const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-3">
    <span className="h-1.5 w-1.5 rounded-full bg-[#2e5d4a]" />
    <span className="text-xs uppercase tracking-[0.35em] text-[#2e5d4a]/80">{children}</span>
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */
const NovaTemplate = ({ template = {}, onApply }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [billing, setBilling] = useState("monthly");
  const [activeDay, setActiveDay] = useState("Mon");

  return (
    <div
      data-testid="nova-template-root"
      className="min-h-screen bg-[#eee9df] text-[#15281f] selection:bg-[#15281f] selection:text-[#eee9df]"
      style={{ fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap');
        .nova-serif{ font-family:'Fraunces',serif; font-optical-sizing:auto; font-variation-settings:"opsz" 144; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .nova-marquee{ animation: marquee 50s linear infinite; }
        .nova-marquee:hover{ animation-play-state: paused; }
        .nova-grid-bg{
          background-image: linear-gradient(to right, rgba(21,40,31,.06) 1px, transparent 1px);
          background-size: 80px 100%;
        }
      `}</style>

      {/* ─────── NAV ─────── */}
      <header className="sticky top-0 z-50 bg-[#eee9df]/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <Leaf className="h-5 w-5 text-[#2e5d4a]" />
            <span className="nova-serif text-2xl tracking-tight">{template.name || "Calmlyss"}</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                data-testid={`nav-${n.label.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-sm text-[#15281f]/75 transition hover:bg-[#15281f]/5 hover:text-[#15281f]"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {onApply && (
              <button
                onClick={onApply}
                data-testid="apply-template-button"
                className="hidden rounded-full bg-[#15281f] px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-[#eee9df] transition hover:bg-[#2e5d4a] lg:block"
              >
                Apply
              </button>
            )}
            <Link
              to="/contact"
              data-testid="header-book-btn"
              className="group hidden items-center gap-2 rounded-full border border-[#15281f] px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition hover:bg-[#15281f] hover:text-[#eee9df] lg:inline-flex"
            >
              Book Now <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:rotate-45" />
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden" data-testid="mobile-menu-toggle">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-[#15281f]/10 bg-[#eee9df] px-6 py-6 lg:hidden">
            <div className="flex flex-col gap-3">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setMenuOpen(false)} className="nova-serif text-3xl">{n.label}</Link>
              ))}
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#15281f] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#eee9df]">
                Book Now <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* ─────── HERO ─────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 flex items-center gap-4">
            <SectionLabel>(01) Welcome</SectionLabel>
          </div>

          <h1 className="nova-serif text-[clamp(2.5rem,8.5vw,8.5rem)] font-light leading-[0.95] tracking-tight text-[#15281f]">
            <Spaced>Where</Spaced> <Spaced>Stillness</Spaced>
            <br />
            <span className="italic text-[#2e5d4a]"><Spaced>Becomes</Spaced></span> <Spaced>Strength</Spaced>
          </h1>

          <div className="mt-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <p className="max-w-md text-lg leading-relaxed text-[#15281f]/70">
              A welcoming space for yoga, movement, and the quiet practice of returning home.
            </p>
            <Link
              to="/about"
              data-testid="hero-learn-more"
              className="group inline-flex items-center gap-3 rounded-full bg-[#15281f] px-7 py-4 text-xs uppercase tracking-[0.25em] text-[#eee9df] transition hover:bg-[#2e5d4a]"
            >
              <span className="overflow-hidden">
                <span className="block transition-transform group-hover:-translate-y-full">Learn More</span>
                <span className="block -translate-y-0 transition-transform group-hover:-translate-y-full">Learn More</span>
              </span>
              <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        {/* Marquee with images & tags */}
        <div className="relative mt-16 overflow-hidden">
          <div className="nova-marquee flex w-max gap-5">
            {[...HERO_IMAGES, ...HERO_IMAGES].map((it, i) => (
              <Link key={i} to={`/classes/${it.tag.toLowerCase()}`} className="group relative block h-[280px] w-[200px] flex-shrink-0 overflow-hidden rounded-[28px] md:h-[380px] md:w-[280px]">
                <img src={it.src} alt={it.tag} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute left-4 top-4 rounded-full bg-[#eee9df]/95 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#15281f]">{it.tag}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── ABOUT ─────── */}
      <section className="border-t border-[#15281f]/10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10">
            <SectionLabel>(02) About Us</SectionLabel>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05] lg:col-span-9">
              <Spaced>Your</Spaced> <Spaced>Space</Spaced> <Spaced>to</Spaced> <Spaced>Feel</Spaced>
              <br />
              <span className="italic text-[#2e5d4a]"><Spaced>Reflect,</Spaced></span> <Spaced>And</Spaced> <Spaced>Grow</Spaced>
            </h2>
            <p className="lg:col-span-3 text-base leading-relaxed text-[#15281f]/70">
              We make mindful practice accessible to everyone, no matter where they're starting from or how loud the week has been.
            </p>
          </div>

          {/* Image cards with tags */}
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {ABOUT_CARDS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-[28px]"
              >
                <img src={c.img} alt="" className="aspect-[4/5] w-full object-cover" />
                <div className="absolute left-5 top-5 rounded-full bg-[#eee9df]/95 px-4 py-1.5 text-xs uppercase tracking-[0.2em]">{c.tag}</div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-20 grid gap-12 md:grid-cols-3">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-t border-[#15281f]/15 pt-8"
              >
                <div className="flex items-baseline">
                  <span className="nova-serif text-7xl font-light text-[#2e5d4a] md:text-8xl">{s.v}</span>
                  <span className="nova-serif text-3xl text-[#2e5d4a] md:text-5xl">{s.suffix}</span>
                </div>
                <h3 className="nova-serif mt-6 text-2xl font-light md:text-3xl">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#15281f]/65">{s.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <Link to="/about" data-testid="about-learn-more" className="group inline-flex items-center gap-3 rounded-full bg-[#15281f] px-7 py-4 text-xs uppercase tracking-[0.25em] text-[#eee9df] transition hover:bg-[#2e5d4a]">
              Learn More <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────── CLASSES ─────── */}
      <section className="border-t border-[#15281f]/10 bg-[#e3ddd1] py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10"><SectionLabel>(03) Find Your Practice</SectionLabel></div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05] lg:col-span-9">
              <Spaced>Developed</Spaced> <Spaced>With</Spaced> <Spaced>Insight,</Spaced>
              <br />
              <span className="italic text-[#2e5d4a]"><Spaced>Guided</Spaced></span> <Spaced>With</Spaced> <Spaced>Empathy</Spaced>
            </h2>
            <p className="lg:col-span-3 text-base leading-relaxed text-[#15281f]/70">
              Designed by those who understand the practice, for those who want to feel better.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Personalized", "Certified", "Experienced", "Trauma-Informed"].map((t) => (
              <span key={t} className="rounded-full border border-[#15281f]/20 bg-[#eee9df] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#15281f]/80">{t}</span>
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CLASSES.map((c, i) => (
              <Link
                key={c.id}
                to={`/classes/${c.id}`}
                data-testid={`class-card-${c.id}`}
                className="group block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-[28px]"
                >
                  <img src={c.img} alt={c.title} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-[#eee9df]/95 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">{c.level}</span>
                    <span className="rounded-full bg-[#eee9df]/95 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">{c.duration}</span>
                  </div>
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#eee9df] opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-[#15281f]" />
                  </div>
                </motion.div>
                <div className="mt-6">
                  <h3 className="nova-serif text-2xl font-light md:text-3xl">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#15281f]/65">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <Link to="/classes" data-testid="view-all-classes" className="group inline-flex items-center gap-3 rounded-full bg-[#15281f] px-7 py-4 text-xs uppercase tracking-[0.25em] text-[#eee9df] transition hover:bg-[#2e5d4a]">
              View All Classes <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────── SCHEDULE ─────── */}
      <section className="border-t border-[#15281f]/10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10"><SectionLabel>(04) Schedule</SectionLabel></div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05] lg:col-span-9">
              <Spaced>Find</Spaced> <Spaced>a</Spaced> <Spaced>Time</Spaced>
              <br />
              <span className="italic text-[#2e5d4a]"><Spaced>That</Spaced></span> <Spaced>Fits</Spaced> <Spaced>Your</Spaced> <Spaced>Life</Spaced>
            </h2>
            <p className="lg:col-span-3 text-base leading-relaxed text-[#15281f]/70">
              Eight practices, each one designed to be repeatable twice a week for a year without losing its edge.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {Object.keys(SCHEDULE).map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                data-testid={`schedule-tab-${d}`}
                className={`rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em] transition ${
                  activeDay === d ? "bg-[#15281f] text-[#eee9df]" : "border border-[#15281f]/20 text-[#15281f]/80 hover:bg-[#15281f]/5"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="mt-10 divide-y divide-[#15281f]/10 border-y border-[#15281f]/10">
            {(SCHEDULE[activeDay].length ? SCHEDULE[activeDay] : SCHEDULE.Mon).map((s, i) => (
              <div key={i} className="grid grid-cols-12 items-center gap-4 py-6">
                <div className="col-span-2 nova-serif text-2xl text-[#2e5d4a] md:col-span-1 md:text-3xl">{s.n}</div>
                <div className="col-span-10 md:col-span-3">
                  <h3 className="nova-serif text-2xl font-light md:text-3xl">{s.t}</h3>
                </div>
                <div className="col-span-4 hidden md:block">
                  <img src={s.img} alt="" className="h-16 w-24 rounded-2xl object-cover" />
                </div>
                <div className="col-span-7 hidden text-sm text-[#15281f]/65 md:col-span-2 md:block">{s.desc}</div>
                <div className="col-span-3 text-xs uppercase tracking-[0.2em] md:col-span-1">{s.dur}</div>
                <div className="col-span-3 nova-serif text-xl md:col-span-1">{s.price}</div>
                <div className="col-span-6 md:col-span-2 md:text-right">
                  <Link to="/contact" data-testid={`book-class-${s.n}`} className="inline-flex items-center gap-2 rounded-full border border-[#15281f] px-5 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-[#15281f] hover:text-[#eee9df]">
                    Book Class <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── TEACHERS ─────── */}
      <section className="border-t border-[#15281f]/10 bg-[#2e5d4a] py-24 text-[#eee9df] lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8d6c8]" />
            <span className="text-xs uppercase tracking-[0.35em] text-[#c8d6c8]">(05) Your Teachers</span>
          </div>

          <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05]">
            <Spaced>Guided</Spaced> <Spaced>by</Spaced> <Spaced>Those</Spaced> <Spaced>Who</Spaced>
            <br />
            <span className="italic"><Spaced>Practice</Spaced></span> <Spaced>What</Spaced> <Spaced>They</Spaced> <Spaced>Teach</Spaced>
          </h2>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {TEACHERS.map((t, i) => (
              <Link
                key={t.id}
                to={`/teachers/${t.id}`}
                data-testid={`teacher-card-${t.id}`}
                className="group block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-[28px]"
                >
                  <img src={t.img} alt={t.name} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#15281f]/95 via-[#15281f]/40 to-transparent p-6 pt-20">
                    <h3 className="nova-serif text-2xl font-light">{t.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#c8d6c8]">{t.style}</p>
                    <p className="mt-3 text-xs text-[#eee9df]/70">{t.cred}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <Link to="/teachers" data-testid="meet-team-btn" className="group inline-flex items-center gap-3 rounded-full bg-[#eee9df] px-7 py-4 text-xs uppercase tracking-[0.25em] text-[#15281f] transition hover:bg-[#c8d6c8]">
              Meet the Full Team <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────── PRICING ─────── */}
      <section className="border-t border-[#15281f]/10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10"><SectionLabel>(06) Pricing</SectionLabel></div>

          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05]">
              <Spaced>Choose</Spaced> <Spaced>the</Spaced> <Spaced>Practice</Spaced>
              <br />
              <span className="italic text-[#2e5d4a]"><Spaced>That</Spaced></span> <Spaced>Fits</Spaced> <Spaced>Your</Spaced> <Spaced>Life</Spaced>
            </h2>

            <div className="flex items-center gap-2 rounded-full border border-[#15281f]/20 bg-[#eee9df] p-1">
              <button
                onClick={() => setBilling("monthly")}
                data-testid="billing-monthly"
                className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] transition ${billing === "monthly" ? "bg-[#15281f] text-[#eee9df]" : ""}`}
              >Monthly</button>
              <button
                onClick={() => setBilling("annual")}
                data-testid="billing-annual"
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] transition ${billing === "annual" ? "bg-[#15281f] text-[#eee9df]" : ""}`}
              >
                Annual <span className="rounded-full bg-[#c8d6c8] px-2 py-0.5 text-[9px] text-[#15281f]">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {PRICING.map((p) => (
              <div
                key={p.title}
                className={`relative rounded-[32px] border p-8 lg:p-10 ${p.featured ? "border-[#15281f] bg-[#15281f] text-[#eee9df]" : "border-[#15281f]/15 bg-[#eee9df]"}`}
              >
                <div className={`inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${p.featured ? "bg-[#c8d6c8] text-[#15281f]" : "bg-[#e3ddd1] text-[#15281f]/70"}`}>
                  {p.tag}
                </div>
                <h3 className="nova-serif mt-6 text-3xl font-light">{p.title}</h3>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="nova-serif text-6xl">{billing === "monthly" ? p.monthly : p.annual}</span>
                  <span className={`${p.featured ? "text-[#c8d6c8]" : "text-[#15281f]/60"} text-sm`}>{p.unit}</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Plus className={`mt-0.5 h-4 w-4 flex-shrink-0 ${p.featured ? "text-[#c8d6c8]" : "text-[#2e5d4a]"}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  data-testid={`pricing-cta-${p.title.toLowerCase().replace(/\s/g, "-")}`}
                  className={`mt-10 inline-flex w-full items-center justify-between gap-2 rounded-full px-6 py-4 text-xs uppercase tracking-[0.25em] transition ${
                    p.featured ? "bg-[#eee9df] text-[#15281f] hover:bg-[#c8d6c8]" : "bg-[#15281f] text-[#eee9df] hover:bg-[#2e5d4a]"
                  }`}
                >
                  {p.cta} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link to="/pricing" data-testid="view-all-plans" className="group inline-flex items-center gap-3 rounded-full border border-[#15281f] px-7 py-4 text-xs uppercase tracking-[0.25em] transition hover:bg-[#15281f] hover:text-[#eee9df]">
              View All Plans <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────── GALLERY ─────── */}
      <section className="border-t border-[#15281f]/10 bg-[#e3ddd1] py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10"><SectionLabel>(07) Gallery</SectionLabel></div>
          <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05]">
            <Spaced>Glimpses</Spaced> <Spaced>From</Spaced> <Spaced>our</Spaced>
            <br />
            <span className="italic text-[#2e5d4a]"><Spaced>Past</Spaced></span> <Spaced>Retreats</Spaced>
          </h2>

          <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {GALLERY.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`overflow-hidden rounded-[20px] md:rounded-[28px] ${[0, 4, 8].includes(i) ? "md:row-span-2 aspect-[3/5]" : "aspect-[4/5]"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── TESTIMONIALS ─────── */}
      <section className="border-t border-[#15281f]/10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10"><SectionLabel>(08) Testimonials</SectionLabel></div>
          <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05]">
            <Spaced>Stories</Spaced> <Spaced>of</Spaced>
            <br />
            <span className="italic text-[#2e5d4a]"><Spaced>Transformation</Spaced></span>
          </h2>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-[28px] border border-[#15281f]/10 bg-[#eee9df] p-8"
              >
                <div className="flex gap-1 text-[#2e5d4a]">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="nova-serif mt-8 text-xl font-light leading-relaxed md:text-2xl">"{t.quote}"</p>
                <div className="mt-10 flex items-center gap-4 border-t border-[#15281f]/10 pt-6">
                  <img src={t.img} alt={t.author} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="nova-serif text-lg">{t.author}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#15281f]/60">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── BLOG ─────── */}
      <section className="border-t border-[#15281f]/10 bg-[#e3ddd1] py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10"><SectionLabel>(09) From the Journal</SectionLabel></div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05] lg:col-span-9">
              <Spaced>Reflections</Spaced> <Spaced>from</Spaced>
              <br />
              <span className="italic text-[#2e5d4a]"><Spaced>The</Spaced></span> <Spaced>Practice</Spaced>
            </h2>
            <Link to="/blog" data-testid="see-all-blogs" className="lg:col-span-3 group inline-flex w-fit items-center gap-3 rounded-full bg-[#15281f] px-7 py-4 text-xs uppercase tracking-[0.25em] text-[#eee9df] transition hover:bg-[#2e5d4a]">
              See all Blogs <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </Link>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG.map((b, i) => (
              <Link key={b.slug} to={`/blog/${b.slug}`} data-testid={`blog-${b.slug}`} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-[28px]"
                >
                  <img src={b.img} alt={b.title} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-full bg-[#eee9df]/95 px-4 py-1.5 text-xs uppercase tracking-[0.2em]">{b.tag}</div>
                </motion.div>
                <div className="mt-6">
                  <h3 className="nova-serif text-2xl font-light leading-tight md:text-3xl">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#15281f]/65">{b.excerpt}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[#15281f]/50">{b.time}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── POLICIES ─────── */}
      <section className="border-t border-[#15281f]/10 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10"><SectionLabel>(10) Policies</SectionLabel></div>
          <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05]">
            <Spaced>Honest</Spaced> <span className="italic text-[#2e5d4a]"><Spaced>Policies.</Spaced></span>
            <br />
            <Spaced>No</Spaced> <Spaced>Fine</Spaced> <Spaced>Print.</Spaced>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {POLICIES.map((p, i) => (
              <Link
                key={p.title}
                to={`/policies#${p.title.toLowerCase().replace(/\s/g, "-")}`}
                data-testid={`policy-${p.title.toLowerCase().replace(/\s/g, "-")}`}
                className="group rounded-[28px] border border-[#15281f]/15 bg-[#eee9df] p-8 transition hover:border-[#15281f]/40"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#2e5d4a]">(0{i + 1})</span>
                  <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
                </div>
                <h3 className="nova-serif mt-8 text-3xl font-light">{p.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#2e5d4a]">{p.short}</p>
                <p className="mt-5 text-sm leading-relaxed text-[#15281f]/65">{p.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── NEWSLETTER ─────── */}
      <section className="border-t border-[#15281f]/10 bg-[#2e5d4a] py-24 text-[#eee9df] lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8d6c8]" />
            <span className="text-xs uppercase tracking-[0.35em] text-[#c8d6c8]">(11) Newsletter</span>
          </div>

          <h2 className="nova-serif text-[clamp(2rem,5.5vw,5rem)] font-light leading-[1.05]">
            <Spaced>Stay</Spaced> <Spaced>Close</Spaced> <Spaced>to</Spaced>
            <br />
            <span className="italic"><Spaced>The</Spaced></span> <Spaced>Practice</Spaced>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#eee9df]/75">
            Seasonal offerings, mindful notes, and early booking for retreats — in your inbox, gently.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-12 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              data-testid="newsletter-input"
              className="flex-1 rounded-full border border-[#c8d6c8]/30 bg-transparent px-6 py-4 text-[#eee9df] placeholder-[#eee9df]/50 outline-none focus:border-[#c8d6c8]"
            />
            <button data-testid="newsletter-submit" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#eee9df] px-8 py-4 text-xs uppercase tracking-[0.25em] text-[#15281f] transition hover:bg-[#c8d6c8]">
              Subscribe <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </button>
          </form>
        </div>
      </section>

      <TemplatePreviewMeta template={template} />

      {/* ─────── FOOTER ─────── */}
      <footer className="bg-[#15281f] text-[#eee9df]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-[#c8d6c8]" />
                <h3 className="nova-serif text-4xl font-light">{template.name || "Calmlyss"}</h3>
              </div>
              <p className="mt-6 max-w-sm text-[#eee9df]/60 leading-relaxed">
                A welcoming space for yoga, movement, and the quiet practice of returning home.
              </p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#eee9df] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#15281f]">
                Book Now <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="md:col-span-2">
              <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-[#c8d6c8]/70">Explore</h4>
              <div className="space-y-3 text-sm">
                {NAV.slice(1).map((n) => (
                  <Link key={n.to} to={n.to} className="block hover:text-[#c8d6c8]">{n.label}</Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-[#c8d6c8]/70">Resources</h4>
              <div className="space-y-3 text-sm">
                <Link to="/schedule" className="block hover:text-[#c8d6c8]">Schedule</Link>
                <Link to="/policies" className="block hover:text-[#c8d6c8]">Policies</Link>
                <Link to="/faq" className="block hover:text-[#c8d6c8]">FAQ</Link>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-[#c8d6c8]/70">Contact</h4>
              <div className="space-y-3 text-sm text-[#eee9df]/70">
                <p>hello@calmlyss.com</p>
                <p>+1 234 567 890</p>
                <p>California, USA</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#c8d6c8]/10 pt-8 text-xs text-[#eee9df]/50 sm:flex-row sm:items-center">
            <div>© {new Date().getFullYear()} {template.name || "Calmlyss"}. All rights reserved.</div>
            <div className="flex gap-6">
              <Link to="/policies#privacy-policy" className="hover:text-[#c8d6c8]">Privacy</Link>
              <Link to="/policies#terms-of-service" className="hover:text-[#c8d6c8]">Terms</Link>
              <Link to="/policies#refund-policy" className="hover:text-[#c8d6c8]">Refund</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NovaTemplate;