"use client";

import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";
import { Toast } from "@/components/Toast";
import { Workout } from "@/lib/types";

export default function MyPlanPage(){
  const { plan, saved, done, removeFromPlan, removeSaved, markDone, hydrated } = usePlan();
  const [tab,setTab]=useState<"plan"|"saved">("plan");
  const [toast,setToast]=useState("");
  const list=tab === "plan" ? plan : saved;
  const metrics=useMemo(()=>({minutes:plan.reduce((a,w)=>a+w.duration,0),calories:plan.reduce((a,w)=>a+w.caloriesBurned,0)}),[plan]);
  const remove=(w:Workout)=>{tab === "plan" ? removeFromPlan(w.id) : removeSaved(w.id); setToast(`Removed ${w.name}`)};
  const complete=(w:Workout)=>{markDone(w.id);setToast(`${w.name} marked as done`)};
  return <main className="section plan-page"><div className="plan-head"><div><p className="eyebrow">YOUR WORKOUT LOG</p><h1>MY PLAN</h1><p className="plan-sub">Cap of five lifts for today. Finish them, then load more.</p></div></div><div className="metrics"><div className="metric"><p>Exercises</p><strong>{plan.length}</strong></div><div className="metric"><p>Minutes</p><strong>{metrics.minutes}</strong></div><div className="metric"><p>Calories</p><strong>{metrics.calories}</strong></div></div><div className="tabs"><button className={tab==="plan"?"tab active":"tab"} onClick={()=>setTab("plan")}>Today&apos;s Plan ({plan.length})</button><button className={tab==="saved"?"tab active":"tab"} onClick={()=>setTab("saved")}>Saved ({saved.length})</button></div>{!hydrated ? <div className="loading-state"><div className="spinner"/><span>Loading workouts…</span></div> : list.length===0 ? <div className="empty"><h2>NOTHING HERE YET</h2><p>Browse the library and add a lift to get today moving.</p><Link href="/" className="primary-btn">GO TO WORKOUTS</Link></div> : <div className="plan-list">{list.map(w=><article className="plan-card" key={w.id}><img className="plan-thumb" src={w.image} alt={w.name}/><div><div className="tags">{w.muscleGroups.map(t=><span key={t}>{t}</span>)}</div><h3>{w.name.toUpperCase()}</h3><p className="equipment">{w.equipment}</p><div className="stats"><span><Clock3 size={13}/>{w.duration} min</span><span><Flame size={13}/>{w.caloriesBurned} kcal</span><span><Star size={13}/>{w.rating}</span></div></div><div className="actions"><Link className="secondary-btn" href={`/workout/${w.id}`}>VIEW DETAILS</Link>{tab==="plan" && <button className="secondary-btn" onClick={()=>complete(w)}><Check size={13}/>{done.includes(w.id)?"DONE":"MARK AS DONE"}</button>}<button className="danger-btn" onClick={()=>remove(w)}><X size={13}/>REMOVE</button></div></article>)}</div>}{toast && <Toast message={toast} onClose={()=>setToast("")}/>}</main>
}
