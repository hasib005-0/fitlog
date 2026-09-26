import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return <section className="hero section"><div className="hero-copy"><p className="eyebrow">WORKOUT LIBRARY</p><h1>TRAIN WITH INTENT.<br/><span>LOG EVERY SET.</span></h1><p className="hero-sub">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p><Link href="#library" className="primary-btn">BROWSE WORKOUTS <ArrowDownRight size={17}/></Link></div><div className="hero-art"><img src="https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740" alt="Athlete training with a barbell"/></div></section>;
}
