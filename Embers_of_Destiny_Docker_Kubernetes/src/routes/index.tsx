import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import GlowCursor from "@/components/GlowCursor";
import city from "@/assets/city.jpg";
import temple from "@/assets/temple.jpg";
import flight from "@/assets/flight.jpg";
import voidImg from "@/assets/void.jpg";
import sunrise from "@/assets/sunrise.jpg";
import ember from "@/assets/astra.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Embers of Destiny — A Dragon & Friend Story" },
      { name: "description", content: "Kael and Ember discover an ancient bond and stand together against a ruthless dragon hunter." },
      { property: "og:title", content: "Embers of Destiny" },
      { property: "og:description", content: "A cinematic scroll story about Kael and Ember." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const chapters = [
  {
    id: "legend", n: "01", label: "THE VILLAGE & THE LEGEND", title: "Embers of Destiny",
    image: city,
    text: [
      "In a peaceful valley surrounded by mountains, the village of Eldermere lived beneath an old legend.",
      "The elders spoke of Ember — a legendary dragon who once protected the land before vanishing centuries ago.",
      "Kael never stopped believing the stories were true."
    ], quote: "“There has to be more beyond those mountains.”"
  },
  {
    id: "egg", n: "02", label: "THE MYSTERIOUS EGG", title: "A Warm Light in the Forest",
    image: temple,
    text: [
      "While exploring the forest near the mountains, Kael discovered something hidden beneath ancient roots.",
      "A mysterious egg pulsed with a warm orange glow. He had never seen anything like it.",
      "Then the egg moved."
    ], quote: "“Easy... I'm not going to hurt you.”"
  },
  {
    id: "bond", n: "03", label: "THE BIRTH OF A BOND", title: "Meet Ember",
    image: flight,
    text: [
      "The shell cracked. A tiny dragon with fiery scales blinked up at Kael.",
      "Kael named him Ember. They could not speak with words, but somehow they understood each other.",
      "Kael hid Ember from the village, afraid that fear would turn their friendship into danger."
    ], quote: "“You're my secret... and my friend.”"
  },
  {
    id: "training", n: "04", label: "TRAINING & DISCOVERY", title: "Learning to Fly",
    image: flight,
    text: [
      "Days became weeks. Kael taught Ember to control little bursts of fire and flap his wings without crashing.",
      "Ember discovered something even stranger: his warm flames could sense danger and heal small wounds.",
      "Their games became trust. Their trust became a friendship."
    ], quote: "“Again! This time, don't hit the tree.”"
  },
  {
    id: "threat", n: "05", label: "THE THREAT EMERGES", title: "The Hunter Arrives",
    image: voidImg,
    text: [
      "Then the village changed. Livestock vanished. Strange shadows moved between the trees. Rumors of a dragon spread.",
      "A ruthless hunter named Varek arrived, offering one promise: he would capture or kill the creature.",
      "Kael knew he could no longer keep Ember hidden forever."
    ], quote: "“They won't take you. I promise.”"
  },
  {
    id: "chase", n: "06", label: "THE CHASE & ESCAPE", title: "Run. Fly. Don't Look Back.",
    image: flight,
    text: [
      "Varek's trap snapped shut in the forest. Ember was caught — but Kael refused to leave him behind.",
      "Together they broke free and raced toward the cliffs.",
      "For the first time, Kael climbed onto Ember's back."
    ], quote: "“Ember... fly!”"
  },
  {
    id: "prophecy", n: "07", label: "THE PROPHECY", title: "The Dragon Rider",
    image: temple,
    text: [
      "The village elder finally revealed the truth: an ancient prophecy spoke of a rider who would unite dragons and humans.",
      "Kael understood why Ember had chosen him.",
      "But a prophecy was not a promise of victory. It was a promise of responsibility."
    ], quote: "“A true rider protects the bond.”"
  },
  {
    id: "battle", n: "08", label: "THE FINAL BATTLE", title: "Together",
    image: voidImg,
    text: [
      "Varek returned with mercenaries and surrounded the village. This time, Kael and Ember stood ready.",
      "Steel met flame. Fear met courage. Varek tried to break the bond — but Kael and Ember fought as one.",
      "They defeated the hunter and his forces."
    ], quote: "“I won't abandon you.”"
  },
  {
    id: "ending", n: "09", label: "A NEW BEGINNING", title: "The Valley Takes Flight",
    image: sunrise,
    text: [
      "The villagers finally saw Ember for what he truly was: not a monster, but a protector.",
      "Kael promised to guard the peace between dragons and humans.",
      "At sunrise, Kael and Ember soared above the valley — together."
    ], quote: "“Where do we go next?” — “Anywhere.”"
  },
];

function Index() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: { trigger: ".hero", start: "top top", end: "+=170%", scrub: 1, pin: true },
        })
          .to(".hero-title", { scale: 0.65, y: -150, opacity: 0, ease: "none" }, 0)
          .fromTo(".hero-dragon", { x: "-65vw", y: "20vh", rotate: -8, scale: 0.42 }, { x: "65vw", y: "-28vh", rotate: 7, scale: 1.15, ease: "none" }, 0)
          .to(".hero-bg", { scale: 1.22, yPercent: 8, ease: "none" }, 0);

        gsap.utils.toArray<HTMLElement>(".chapter").forEach((el, index) => {
          const img = el.querySelector<HTMLElement>(".ch-img");
          const head = el.querySelector<HTMLElement>(".ch-head");
          const lines = el.querySelectorAll<HTMLElement>(".ch-line");
          const glow = el.querySelector<HTMLElement>(".scene-glow");
          const egg = el.querySelector<HTMLElement>(".egg-orb");
          const fire = el.querySelector<HTMLElement>(".fire-orb");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "+=190%", scrub: 1, pin: true, anticipatePin: 1 },
          });

          tl.fromTo(img, { scale: 1.22, yPercent: -7 }, { scale: 1.04, yPercent: 7, ease: "none", duration: 3 }, 0)
            .fromTo(head, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.4)
            .fromTo(lines, { y: 55, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.22, duration: 1 }, 0.8)
            .fromTo(el.querySelector(".ch-quote"), { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: .8 }, 1.5)
            .to(glow, { opacity: 0.75, scale: 1.3, duration: 1.5 }, 1.1)
            .to(head, { y: -70, opacity: 0, duration: .8 }, 2.7)
            .to(lines, { y: -50, opacity: 0, stagger: 0.1, duration: .6 }, 2.8);

          if (egg) {
            tl.fromTo(egg, { scale: .45, opacity: 0, rotate: -8 }, { scale: 1, opacity: 1, rotate: 5, duration: 1.1 }, 0.7)
              .to(egg, { scale: 1.13, boxShadow: "0 0 100px 35px rgba(255,155,56,.65)", duration: .8 }, 1.5)
              .to(egg, { scale: .3, opacity: 0, duration: .8 }, 2.4);
          }
          if (fire) {
            tl.fromTo(fire, { scale: .2, opacity: 0 }, { scale: 1, opacity: 1, duration: .7 }, 1.2)
              .to(fire, { scale: 2.4, opacity: 0, duration: 1 }, 2.1);
          }

          if (index === 5) {
            tl.to(el.querySelector(".ch-img"), { xPercent: -8, scale: 1.12, duration: 1.5 }, 1.3);
          }
          if (index === 7) {
            tl.to(el.querySelector(".ch-img"), { filter: "brightness(1.45) saturate(1.25)", duration: .8 }, 1.8)
              .to(el.querySelector(".battle-flash"), { opacity: 0.75, duration: .12 }, 2.15)
              .to(el.querySelector(".battle-flash"), { opacity: 0, duration: .35 }, 2.27);
          }
        });

        gsap.timeline({ scrollTrigger: { trigger: ".finale", start: "top top", end: "+=150%", scrub: 1, pin: true } })
          .fromTo(".finale-img", { scale: 1.05 }, { scale: 1.16, ease: "none" }, 0)
          .fromTo(".finale-word", { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: .25, duration: 1 }, .4)
          .to(".finale-img", { filter: "brightness(1.15) saturate(1.08)", duration: 1 }, 1.5);

        gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { scrub: true } });
      }, root);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={root} className="bg-background text-foreground overflow-x-hidden">
      <GlowCursor color="#67E8F9" secondaryColor="#F59E0B" trailLength={46} trailWidth={7} trailTaper={0.82} followSpeed={0.18} glowIntensity={2.1} glowSpread={1.35} hotspot={0.72} brightness={1.35} opacity={0.95} pulseSpeed={1.15} noiseStrength={0.03} idleFade idleTimeout={650} fadeDuration={700} blendMode="screen" />
      <div className="progress fixed top-0 left-0 z-50 h-1.5 w-full origin-left scale-x-0 bg-primary" />

      <section className="hero relative h-screen overflow-hidden">
        <img src={city} alt="A peaceful mountain village" className="hero-bg absolute inset-0 h-full w-full object-cover" width={1600} height={912} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-background" />
        <div className="hero-title relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <p className="font-display text-xl tracking-[0.3em] text-primary uppercase">A dragon & friend story</p>
          <h1 className="font-display text-7xl md:text-9xl text-foreground drop-shadow-lg">Embers of Destiny</h1>
          <p className="mt-4 text-2xl md:text-3xl font-display">Kael & Ember</p>
          <p className="mt-10 animate-bounce text-lg">Scroll to begin the story ↓</p>
        </div>
        <img src={ember} alt="Ember the dragon" className="hero-dragon pointer-events-none absolute left-1/2 top-1/2 z-20 w-[40vw] -translate-x-1/2 -translate-y-1/2" width={1024} height={1024} />
      </section>

      {chapters.map((c, i) => (
        <section key={c.id} className={`chapter scene-${c.id} relative min-h-[190vh] overflow-hidden`}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <img src={c.image} alt={c.title} loading="lazy" width={1600} height={912} className="ch-img absolute inset-0 h-full w-full object-cover" />
            <div className={`absolute inset-0 ${i % 2 ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-background/95 via-background/45 to-transparent`} />
            <div className="scene-glow absolute inset-0 opacity-20 pointer-events-none" />

            {c.id === "egg" && <div className="egg-orb absolute left-[66%] top-[48%] z-20 h-28 w-20 rounded-[48%] border-2 border-orange-200 bg-gradient-to-br from-orange-200 via-orange-500 to-red-900 shadow-[0_0_45px_15px_rgba(255,150,40,.4)]" />}
            {c.id === "training" && <div className="fire-orb absolute left-[63%] top-[48%] z-20 h-16 w-16 rounded-full bg-orange-300 shadow-[0_0_60px_20px_rgba(255,130,20,.8)]" />}
            {c.id === "battle" && <div className="battle-flash pointer-events-none absolute inset-0 z-40 bg-white opacity-0" />}

            <div className={`relative z-30 flex h-full items-center px-6 md:px-20 ${i % 2 ? "justify-end text-right" : ""}`}>
              <div className="max-w-xl">
                <div className="ch-head">
                  <p className="font-display text-primary text-sm md:text-xl uppercase tracking-[0.22em]">Chapter {c.n} · {c.label}</p>
                  <h2 className="font-display text-5xl md:text-7xl mb-8">{c.title}</h2>
                </div>
                {c.text.map((t) => <p key={t} className="ch-line mb-5 text-lg md:text-xl leading-relaxed text-foreground/90">{t}</p>)}
                <blockquote className="ch-quote mt-7 border-l-2 border-primary pl-5 font-display text-xl md:text-2xl text-primary/90">{c.quote}</blockquote>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="finale relative h-screen overflow-hidden">
        <img src={sunrise} alt="Kael and Ember above the valley" loading="lazy" width={1600} height={912} className="finale-img absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center px-6">
          <p className="finale-word font-display text-2xl md:text-4xl">“Where do we go next?”</p>
          <p className="finale-word mt-4 text-lg md:text-xl">Ember spread his wings. Kael smiled.</p>
          <p className="finale-word font-display mt-6 text-6xl md:text-8xl text-primary">“Anywhere.”</p>
          <p className="finale-word mt-8 text-lg">The End ✦</p>
        </div>
      </section>
    </div>
  );
}
