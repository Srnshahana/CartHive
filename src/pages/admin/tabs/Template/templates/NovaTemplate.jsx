import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Star, Plus, Menu, X } from "lucide-react";

/* ---------------- THEME: Dark Forest Green Premium ----------------
   #0a2418  base forest (darkest)
   #0f2e1f  deep forest (main bg)
   #1a3d2a  mid forest (alt section bg)
   #1f4d38  light forest (cards/borders)
   #a8c4a2  soft sage (secondary text)
   #c9a96e  premium gold (accents)
   #f4efe4  ivory (primary text)
-------------------------------------------------------------------*/

const NAV_ITEMS = [
  { id: "home", label: "Home" }, { id: "about", label: "About" },
  { id: "classes", label: "Classes" }, { id: "schedule", label: "Schedule" },
  { id: "teachers", label: "Teachers" }, { id: "pricing", label: "Pricing" },
  { id: "gallery", label: "Gallery" }, { id: "blog", label: "Blog" },
];

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

const SCHEDULE_ROWS = [
  { n: "01", t: "Vinyasa Yoga", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80", dur: "75 min", price: "€28", desc: "The room dim enough to fall asleep in." },
  { n: "02", t: "Breath & Cold", img: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=600&q=80", dur: "60 min", price: "€65", desc: "Slow, deep table work for runners and climbers." },
  { n: "03", t: "Sound Bath", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80", dur: "45 min", price: "€52", desc: "The room dim enough to fall asleep in." },
  { n: "04", t: "Infrared Sauna", img: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=600&q=80", dur: "50 min", price: "€50", desc: "Movement, unhurried." },
  { n: "05", t: "Myofascial Release", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80", dur: "31 min", price: "€40", desc: "Targeted release for deep tension." },
  { n: "06", t: "Slow Vinyasa", img: "https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=600&q=80", dur: "60 min", price: "€38", desc: "Half the pace of the city." },
];

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
  { quote: "I started attending these yoga classes during a very stressful period and the difference it has made is incredible. From the very first session, I felt supported.", author: "Savannah Nguyen", role: "Nursing Assistant", img: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=400&q=80" },
  { quote: "I had never tried yoga before and honestly felt intimidated at first, but this class completely changed my perspective. The instructors make beginners feel comfortable.", author: "Esther Howard", role: "Marketing Coordinator", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" },
  { quote: "These classes have transformed my overall wellbeing in ways I never expected. I joined to improve flexibility, but I gained mental clarity.", author: "Jenny Wilson", role: "President of Sales", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80" },
];

const BLOG = [
  { slug: "yin-yoga-patience", title: "What Yin Yoga Taught Me About Patience", tag: "Nutrition", time: "5 mins read", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80", excerpt: "Modern life often pulls us away from our bodies. Gentle yoga invites you back." },
  { slug: "restorative-yoga-art", title: "Finding Balance: The Art of Restorative Yoga", tag: "Movement", time: "6 mins read", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", excerpt: "How you begin your morning shapes the energy you carry throughout the day." },
  { slug: "gentle-yoga-life", title: "Unwinding: How Gentle Yoga Changed My Life", tag: "Mindfulness", time: "7 mins read", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80", excerpt: "Balance isn't something you achieve once — it's something you return to." },
];

/* Sentences that slide across the hero — left & right */
const HERO_PHRASES_RIGHT = [
  "Breathe in stillness",
  "Move with intention",
  "Soften the noise",
  "Return to the body",
  "Find your edge — gently",
];

const HERO_PHRASES_LEFT = [
  "Slow is the new strong",
  "A quiet hour, a quieter mind",
  "Stretch beyond the mat",
  "Steady, soft, sovereign",
  "Practice over perfection",
];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Spaced = ({ children }) => (
  <span style={{ letterSpacing: "-0.02em" }}>{children}</span>
);

/* ---------- FallingText: animates each letter dropping from the top ---------- */
const FallingText = ({ text, className = "", italic = false, baseDelay = 0 }) => {
  const words = text.split(" ");
  let letterIndex = 0;
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" style={{ marginRight: "0.28em" }}>
          {word.split("").map((ch, ci) => {
            const i = letterIndex++;
            return (
              <motion.span
                key={`${wi}-${ci}`}
                initial={{ y: "-110%", opacity: 0, rotate: -10 }}
                animate={{ y: "0%", opacity: 1, rotate: 0 }}
                transition={{
                  delay: baseDelay + i * 0.045,
                  type: "spring",
                  stiffness: 220,
                  damping: 16,
                  mass: 0.9,
                }}
                className={`inline-block ${italic ? "italic" : ""}`}
                style={{ transformOrigin: "50% 0%" }}
              >
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

const Bullet = () => (
  <span className="mx-6 inline-block h-2 w-2 rounded-full bg-[#c9a96e] align-middle" aria-hidden />
);

/* ---------- Sliding sentence rows (right & left) ---------- */
const SlidingSentences = () => (
  <div className="relative mt-10 select-none space-y-4 overflow-hidden py-2" data-testid="hero-sliding-sentences">
    {/* RIGHT → LEFT row */}
    <div className="relative overflow-hidden">
      <div className="nova-slide-right flex w-max items-center whitespace-nowrap">
        {[...HERO_PHRASES_RIGHT, ...HERO_PHRASES_RIGHT].map((p, i) => (
          <span key={`r-${i}`} className="nova-serif flex items-center text-[clamp(1.5rem,3.5vw,3rem)] font-light italic text-[#f4efe4]/85">
            {p}<Bullet />
          </span>
        ))}
      </div>
    </div>

    {/* LEFT → RIGHT row */}
    <div className="relative overflow-hidden">
      <div className="nova-slide-left flex w-max items-center whitespace-nowrap">
        {[...HERO_PHRASES_LEFT, ...HERO_PHRASES_LEFT].map((p, i) => (
          <span key={`l-${i}`} className="nova-serif flex items-center text-[clamp(1.5rem,3.5vw,3rem)] font-light text-[#c9a96e]">
            {p}<Bullet />
          </span>
        ))}
      </div>
    </div>
  </div>
);

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3">
    <span className="h-1.5 w-1.5 rounded-full bg-[#c9a96e]" />
    <span className="text-xs uppercase tracking-[0.35em] text-[#a8c4a2]">{children}</span>
  </div>
);

const PrimaryBtn = ({ target, children, full, onClick }) => (
  <button
    type="button"
    onClick={onClick ? onClick : () => target && scrollToId(target)}
    className={`group inline-flex items-center justify-center gap-3 rounded-full bg-[#c9a96e] px-6 py-3.5 sm:px-7 sm:py-4 text-xs uppercase tracking-[0.25em] text-[#0f2e1f] transition hover:bg-[#f4efe4] ${full ? "w-full sm:w-auto" : ""}`}
  >
    {children} <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
  </button>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const go = (id) => { setOpen(false); setTimeout(() => scrollToId(id), 50); };
  const brand = "NOVA";

  return (
    <header className="sticky top-0 z-50 bg-[#0f2e1f]/95 backdrop-blur-md border-b border-[#f4efe4]/10">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
        {/* <button onClick={() => go("home")} className="relative flex items-center justify-center rounded-full border border-[#c9a96e] nova-serif text-5xl font-light tracking-tight text-[#f4efe4]">
          <span className="inline-flex overflow-hidden">
            {brand.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "-120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </button> */}
        <button
  onClick={() => go("home")}
  className="group flex flex-col items-center"
>
  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a96e]">
    <div className="absolute inset-1 rounded-full border border-[#c9a96e]/30"></div>
    <span className="nova-serif text-4xl text-[#f4efe4]">N</span>
  </div>

  <span className="mt-1 text-2xl uppercase tracking-[0.45em] text-[#f4efe4]/80">
    NOVA
  </span>
</button>


        <nav className="hidden lg:flex items-center gap-8 ml-10">
          {NAV_ITEMS.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className="text-[11px] uppercase tracking-[0.3em] text-[#f4efe4]/75 transition duration-300 hover:text-[#c9a96e]">
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hidden lg:block">
          <button onClick={() => go("pricing")} className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#0f2e1f] transition hover:bg-[#f4efe4]">
            Book Now <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </button>
        </div>
        <button className="lg:hidden text-[#f4efe4]" onClick={() => setOpen((v) => !v)} aria-label="menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[#f4efe4]/10 bg-[#0f2e1f]">
          <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_ITEMS.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} className="rounded-lg px-4 py-3 text-left text-sm uppercase tracking-[0.2em] text-[#f4efe4] transition hover:bg-[#1a3d2a]">
                {n.label}
              </button>
            ))}
            <button onClick={() => go("pricing")} className="mt-3 rounded-full bg-[#c9a96e] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#0f2e1f]">
              Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="border-t border-[#f4efe4]/10 bg-[#0a2418] py-12 text-[#f4efe4]/70">
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 sm:px-6 lg:px-10 md:grid-cols-4">
      <div>
        <div className="nova-serif text-2xl text-[#f4efe4]">NOVA<span className="text-[#c9a96e]">.</span></div>
        <p className="mt-4 text-sm leading-relaxed">A welcoming space for yoga, movement, and the quiet practice of returning home.</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#a8c4a2]">Explore</p>
        <ul className="mt-4 space-y-2 text-sm">
          {NAV_ITEMS.slice(0, 4).map((n) => <li key={n.id}><button onClick={() => scrollToId(n.id)} className="hover:text-[#c9a96e]">{n.label}</button></li>)}
        </ul>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#a8c4a2]">More</p>
        <ul className="mt-4 space-y-2 text-sm">
          {NAV_ITEMS.slice(4).map((n) => <li key={n.id}><button onClick={() => scrollToId(n.id)} className="hover:text-[#c9a96e]">{n.label}</button></li>)}
        </ul>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#a8c4a2]">Contact</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li>hello@Nova.studio</li><li>+33 1 42 00 00 00</li><li>12 Rue du Calme, Paris</li>
        </ul>
      </div>
    </div>
    <div className="mx-auto mt-10 max-w-[1400px] border-t border-[#f4efe4]/10 px-4 pt-6 text-xs text-[#f4efe4]/40 sm:px-6 lg:px-10">
      © {new Date().getFullYear()} NOVA Studio. All rights reserved.
    </div>
  </footer>
);

const NovaTemplate = () => {
  const [billing, setBilling] = useState("monthly");
  const [activeDay, setActiveDay] = useState("Mon");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-[#0f2e1f] text-[#f4efe4] font-sans overflow-x-hidden" style={{ scrollBehavior: "smooth" }}>
      <Navbar />

      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-10">
            <SectionLabel>(01) Welcome</SectionLabel>
          </motion.div>

          {/* ✨ Falling-letters hero headline */}
          <h1 className="nova-serif text-[clamp(2rem,6.5vw,6.5rem)] font-light leading-[0.95] tracking-tight">
            <span className="block overflow-hidden pb-2">
              <FallingText text="Where Stillness" />
            </span>
            <span className="block overflow-hidden pb-2 text-[#c9a96e]">
              <FallingText text="Becomes" italic baseDelay={0.4} />{" "}
              <FallingText text="Strength" baseDelay={0.7} />
            </span>
          </h1>

          {/* ✨ Sliding sentences — right & left */}
          <SlidingSentences />

          <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:gap-8 lg:flex-row lg:items-end">
            <motion.p initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="max-w-md text-base sm:text-lg leading-relaxed text-[#f4efe4]/70">
              A welcoming space for yoga, movement, and the quiet practice of returning home.
            </motion.p>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
              <PrimaryBtn target="about" full>Learn More</PrimaryBtn>
            </motion.div>
          </div>
        </div>

        {/* ✨ Floating images marquee */}
        <div className="relative mt-12 sm:mt-16 overflow-hidden">
          <div className="nova-marquee flex w-max gap-4 sm:gap-5">
            {[...HERO_IMAGES, ...HERO_IMAGES].map((it, i) => (
              <button key={i} type="button" onClick={() => scrollToId("classes")} className="group relative block h-[220px] w-[160px] flex-shrink-0 overflow-hidden rounded-2xl sm:h-[280px] sm:w-[200px] sm:rounded-[28px] md:h-[380px] md:w-[280px]">
                <img src={it.src} alt={it.tag} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-[#0f2e1f]/85 backdrop-blur px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#f4efe4]">{it.tag}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-[#f4efe4]/10 py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10"><SectionLabel>(02) About Us</SectionLabel></div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="nova-serif text-[clamp(1.75rem,5.5vw,5rem)] font-light leading-[1.05] lg:col-span-9">
              <Spaced>Your</Spaced> <Spaced>Space</Spaced> <Spaced>to</Spaced> <Spaced>Feel</Spaced><br />
              <span className="italic text-[#c9a96e]"><Spaced>Reflect,</Spaced></span> <Spaced>And</Spaced> <Spaced>Grow</Spaced>
            </motion.h2>
            <motion.p initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} className="lg:col-span-3 text-sm sm:text-base leading-relaxed text-[#f4efe4]/70">
              We make mindful practice accessible to everyone, no matter where they&apos;re starting from.
            </motion.p>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
            {ABOUT_CARDS.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }} className="relative overflow-hidden rounded-2xl sm:rounded-[28px]">
                <motion.img src={c.img} alt="" className="aspect-[4/5] w-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }} />
                <div className="absolute left-4 top-4 rounded-full bg-[#0f2e1f]/85 backdrop-blur px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#f4efe4]">{c.tag}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 sm:mt-20 grid gap-10 md:grid-cols-3">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }} className="border-t border-[#f4efe4]/15 pt-6 sm:pt-8">
                <div className="flex items-baseline">
                  <span className="nova-serif text-6xl sm:text-7xl md:text-8xl font-light text-[#c9a96e]">{s.v}</span>
                  <span className="nova-serif text-2xl sm:text-3xl md:text-5xl text-[#c9a96e]">{s.suffix}</span>
                </div>
                <h3 className="nova-serif mt-5 text-xl sm:text-2xl md:text-3xl font-light">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#f4efe4]/65">{s.d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 sm:mt-16"><PrimaryBtn target="classes" full>Explore Classes</PrimaryBtn></div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="border-t border-[#f4efe4]/10 bg-[#1a3d2a] py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10"><SectionLabel>(03) Find Your Practice</SectionLabel></div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="nova-serif text-[clamp(1.75rem,5.5vw,5rem)] font-light leading-[1.05] lg:col-span-9">
              <Spaced>Developed</Spaced> <Spaced>With</Spaced> <Spaced>Insight,</Spaced><br />
              <span className="italic text-[#c9a96e]"><Spaced>Guided</Spaced></span> <Spaced>With</Spaced> <Spaced>Empathy</Spaced>
            </motion.h2>
            <p className="lg:col-span-3 text-sm sm:text-base leading-relaxed text-[#f4efe4]/70">Designed by those who understand the practice, for those who want to feel better.</p>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLASSES.map((c, i) => (
              <button key={c.id} type="button" onClick={() => scrollToId("schedule")} className="group block text-left">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7 }} className="relative overflow-hidden rounded-2xl sm:rounded-[28px]">
                  <img src={c.img} alt={c.title} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute left-3 top-3 sm:left-4 sm:top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#0f2e1f]/85 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f4efe4]">{c.level}</span>
                    <span className="rounded-full bg-[#0f2e1f]/85 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f4efe4]">{c.duration}</span>
                  </div>
                </motion.div>
                <div className="mt-5">
                  <h3 className="nova-serif text-2xl sm:text-3xl font-light">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#f4efe4]/65">{c.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-12 sm:mt-16"><PrimaryBtn target="schedule" full>View All Classes</PrimaryBtn></div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="border-t border-[#f4efe4]/10 py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10"><SectionLabel>(04) Schedule</SectionLabel></div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="nova-serif text-[clamp(1.75rem,5.5vw,5rem)] font-light leading-[1.05] lg:col-span-9">
              <Spaced>Find</Spaced> <Spaced>a</Spaced> <Spaced>Time</Spaced><br />
              <span className="italic text-[#c9a96e]"><Spaced>That</Spaced></span> <Spaced>Fits</Spaced> <Spaced>Your</Spaced> <Spaced>Life</Spaced>
            </motion.h2>
            <p className="lg:col-span-3 text-sm sm:text-base leading-relaxed text-[#f4efe4]/70">Eight practices, repeatable twice a week for a year.</p>
          </div>
          <div className="mt-10 sm:mt-12 flex flex-wrap gap-2">
            {days.map((d) => (
              <button key={d} onClick={() => setActiveDay(d)} className={`flex-1 sm:flex-none rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] transition ${activeDay === d ? "bg-[#c9a96e] text-[#0f2e1f]" : "border border-[#f4efe4]/20 text-[#f4efe4]/80 hover:bg-[#f4efe4]/5"}`}>{d}</button>
            ))}
          </div>
          <div className="mt-8 sm:mt-10 divide-y divide-[#f4efe4]/10 border-y border-[#f4efe4]/10">
            {SCHEDULE_ROWS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }} className="grid grid-cols-12 items-center gap-3 py-5 sm:gap-4 sm:py-6">
                <div className="col-span-2 nova-serif text-xl sm:text-3xl text-[#c9a96e] md:col-span-1">{s.n}</div>
                <div className="col-span-10 md:col-span-3"><h3 className="nova-serif text-xl sm:text-3xl font-light">{s.t}</h3></div>
                <div className="col-span-4 hidden md:block"><img src={s.img} alt="" className="h-16 w-24 rounded-2xl object-cover" /></div>
                <div className="col-span-7 hidden text-sm text-[#f4efe4]/65 md:col-span-2 md:block">{s.desc}</div>
                <div className="col-span-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] md:col-span-1">{s.dur}</div>
                <div className="col-span-3 nova-serif text-base sm:text-xl md:col-span-1">{s.price}</div>
                <div className="col-span-5 md:col-span-2 md:text-right">
                  <button type="button" onClick={() => scrollToId("pricing")} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#c9a96e] px-3 py-2 sm:px-5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#c9a96e] transition hover:bg-[#c9a96e] hover:text-[#0f2e1f]">
                    Book <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="teachers" className="border-t border-[#f4efe4]/10 bg-[#1a3d2a] py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10"><SectionLabel>(05) Your Teachers</SectionLabel></div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="nova-serif text-[clamp(1.75rem,5.5vw,5rem)] font-light leading-[1.05]">
            <Spaced>Guided</Spaced> <Spaced>by</Spaced> <Spaced>Those</Spaced> <Spaced>Who</Spaced><br />
            <span className="italic text-[#c9a96e]"><Spaced>Practice</Spaced></span> <Spaced>What</Spaced> <Spaced>They</Spaced> <Spaced>Teach</Spaced>
          </motion.h2>
          <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEACHERS.map((t, i) => (
              <button key={t.id} type="button" onClick={() => scrollToId("testimonials")} className="group block text-left">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7 }} className="relative overflow-hidden rounded-2xl sm:rounded-[28px]">
                  <img src={t.img} alt={t.name} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a2418]/95 via-[#0a2418]/40 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
                    <h3 className="nova-serif text-xl sm:text-2xl font-light">{t.name}</h3>
                    <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#c9a96e]">{t.style}</p>
                    <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs text-[#f4efe4]/70">{t.cred}</p>
                  </div>
                </motion.div>
              </button>
            ))}
          </div>
          <div className="mt-12 sm:mt-16"><PrimaryBtn target="testimonials" full>Meet the Full Team</PrimaryBtn></div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-[#f4efe4]/10 py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10"><SectionLabel>(06) Pricing</SectionLabel></div>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="nova-serif text-[clamp(1.75rem,5.5vw,5rem)] font-light leading-[1.05]">
              <Spaced>Choose</Spaced> <Spaced>the</Spaced> <Spaced>Practice</Spaced><br />
              <span className="italic text-[#c9a96e]"><Spaced>That</Spaced></span> <Spaced>Fits</Spaced>
            </motion.h2>
            <div className="flex items-center gap-2 rounded-full border border-[#f4efe4]/20 bg-[#1a3d2a] p-1">
              <button onClick={() => setBilling("monthly")} className={`rounded-full px-4 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] transition ${billing === "monthly" ? "bg-[#c9a96e] text-[#0f2e1f]" : "text-[#f4efe4]"}`}>Monthly</button>
              <button onClick={() => setBilling("annual")} className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] transition ${billing === "annual" ? "bg-[#c9a96e] text-[#0f2e1f]" : "text-[#f4efe4]"}`}>
                Annual <span className="rounded-full bg-[#c9a96e] px-2 py-0.5 text-[9px] text-[#0f2e1f]">-20%</span>
              </button>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 lg:grid-cols-3">
            {PRICING.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }} whileHover={{ y: -6 }} className={`relative rounded-2xl sm:rounded-[32px] border p-6 sm:p-8 lg:p-10 ${p.featured ? "border-[#c9a96e] bg-[#c9a96e] text-[#0f2e1f]" : "border-[#f4efe4]/15 bg-[#1a3d2a] text-[#f4efe4]"}`}>
                <div className={`inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${p.featured ? "bg-[#0f2e1f] text-[#c9a96e]" : "bg-[#0f2e1f] text-[#a8c4a2]"}`}>{p.tag}</div>
                <h3 className="nova-serif mt-5 text-2xl sm:text-3xl font-light">{p.title}</h3>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="nova-serif text-5xl sm:text-6xl">{billing === "monthly" ? p.monthly : p.annual}</span>
                  <span className={`${p.featured ? "text-[#0f2e1f]/70" : "text-[#a8c4a2]"} text-sm`}>{p.unit}</span>
                </div>
                <ul className="mt-6 sm:mt-8 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Plus className={`mt-0.5 h-4 w-4 flex-shrink-0 ${p.featured ? "text-[#0f2e1f]" : "text-[#c9a96e]"}`} /> {f}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => scrollToId("newsletter")} className={`mt-8 sm:mt-10 inline-flex w-full items-center justify-between gap-2 rounded-full px-6 py-4 text-xs uppercase tracking-[0.25em] transition ${p.featured ? "bg-[#0f2e1f] text-[#c9a96e] hover:bg-[#1a3d2a]" : "bg-[#c9a96e] text-[#0f2e1f] hover:bg-[#f4efe4]"}`}>
                  {p.cta} <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="border-t border-[#f4efe4]/10 bg-[#1a3d2a] py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10"><SectionLabel>(07) Gallery</SectionLabel></div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="nova-serif text-[clamp(1.75rem,5.5vw,5rem)] font-light leading-[1.05]">
            <Spaced>Glimpses</Spaced> <Spaced>From</Spaced><br />
            <span className="italic text-[#c9a96e]"><Spaced>Past</Spaced></span> <Spaced>Retreats</Spaced>
          </motion.h2>
          <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {GALLERY.map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }} whileHover={{ scale: 1.03 }} className={`overflow-hidden rounded-xl md:rounded-[28px] ${[0, 4, 8].includes(i) ? "md:row-span-2 aspect-[3/5]" : "aspect-[4/5]"}`}>
                <img src={src} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="border-t border-[#f4efe4]/10 py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10"><SectionLabel>(08) Testimonials</SectionLabel></div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="nova-serif text-[clamp(1.75rem,5.5vw,5rem)] font-light leading-[1.05]">
            <Spaced>Stories</Spaced> <Spaced>of</Spaced><br />
            <span className="italic text-[#c9a96e]"><Spaced>Transformation</Spaced></span>
          </motion.h2>
          <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }} className="rounded-2xl sm:rounded-[28px] border border-[#f4efe4]/10 bg-[#1a3d2a] p-6 sm:p-8">
                <div className="flex gap-1 text-[#c9a96e]">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
                <p className="nova-serif mt-6 text-lg sm:text-2xl font-light leading-relaxed text-[#f4efe4]">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-4 border-t border-[#f4efe4]/10 pt-5 sm:pt-6">
                  <img src={t.img} alt={t.author} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover" />
                  <div>
                    <p className="nova-serif text-base sm:text-lg">{t.author}</p>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#a8c4a2]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="border-t border-[#f4efe4]/10 bg-[#1a3d2a] py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10"><SectionLabel>(09) From the Journal</SectionLabel></div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="nova-serif text-[clamp(1.75rem,5.5vw,5rem)] font-light leading-[1.05] lg:col-span-9">
              <Spaced>Reflections</Spaced> <Spaced>from</Spaced><br />
              <span className="italic text-[#c9a96e]"><Spaced>The</Spaced></span> <Spaced>Practice</Spaced>
            </motion.h2>
            <div className="lg:col-span-3"><PrimaryBtn target="newsletter" full>See all Blogs</PrimaryBtn></div>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG.map((b, i) => (
              <button key={b.slug} type="button" onClick={() => scrollToId("newsletter")} className="group block text-left">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }} className="relative overflow-hidden rounded-2xl sm:rounded-[28px]">
                  <img src={b.img} alt={b.title} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-full bg-[#0f2e1f]/85 backdrop-blur px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#f4efe4]">{b.tag}</div>
                </motion.div>
                <div className="mt-5">
                  <h3 className="nova-serif text-xl sm:text-2xl md:text-3xl font-light leading-tight">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#f4efe4]/65">{b.excerpt}</p>
                  <p className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#a8c4a2]">{b.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" className="border-t border-[#f4efe4]/10 bg-[#0a2418] py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10"><SectionLabel>(10) Newsletter</SectionLabel></div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="nova-serif text-[clamp(1.75rem,5.5vw,5rem)] font-light leading-[1.05]">
            <Spaced>Stay</Spaced> <Spaced>Close</Spaced> <Spaced>to</Spaced><br />
            <span className="italic text-[#c9a96e]"><Spaced>The</Spaced></span> <Spaced>Practice</Spaced>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#f4efe4]/75">
            Seasonal offerings, mindful notes, and early booking for retreats — in your inbox, gently.
          </motion.p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-10 sm:mt-12 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="your@email.com" className="flex-1 rounded-full border border-[#a8c4a2]/30 bg-transparent px-6 py-4 text-[#f4efe4] placeholder-[#f4efe4]/50 outline-none focus:border-[#c9a96e]" />
            <button type="submit" className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-8 py-4 text-xs uppercase tracking-[0.25em] text-[#0f2e1f] transition hover:bg-[#f4efe4]">
              Subscribe <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NovaTemplate;