"use client";

import Link from "next/link";
import { Dumbbell, ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  return (
    <header className="nav-wrap">
      <nav className="nav">
        <Link href="/" className="brand"><span className="brand-mark"><Dumbbell size={16}/></span><span>FITLOG</span></Link>
        <div className="nav-links">
          <Link className={pathname === "/" ? "nav-link active" : "nav-link"} href="/">Workout</Link>
          <Link className={pathname.startsWith("/my-plan") ? "nav-link active" : "nav-link"} href="/my-plan">My Plan</Link>
        </div>
        <div className="nav-badges">
          <Link href="/my-plan" className="counter plan-counter"><span>Plan</span><b>{plan.length}</b></Link>
          <Link href="/my-plan" className="counter saved-counter"><span>Saved</span><b>{saved.length}</b></Link>
        </div>
      </nav>
    </header>
  );
}
