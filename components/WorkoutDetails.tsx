"use client";

import { useState } from "react";
import { Check, Clock3, Flame, Heart, Plus, Star } from "lucide-react";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import { Toast } from "./Toast";

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, saveForLater } = usePlan();
  const [toast, setToast] = useState("");
  const inPlan = plan.some((x) => x.id === workout.id);
  const isSaved = saved.some((x) => x.id === workout.id);
  const add = () => { if (inPlan) return setToast("Already in today's plan"); if (plan.length >= 5) return setToast("Today's plan is full (5 lifts)"); addToPlan(workout); setToast("Added to today's plan"); };
  const save = () => { if (isSaved) return setToast("Already saved for later"); saveForLater(workout); setToast("Saved for later"); };
  return <div className="detail-grid"><div className="detail-media"><img src={workout.image} alt={workout.name}/></div><div className="detail-content"><div className="tags">{workout.muscleGroups.map((tag) => <span key={tag}>{tag}</span>)}</div><h1>{workout.name.toUpperCase()}</h1><p className="detail-desc">{workout.description}</p><div className="stats" style={{marginTop:14}}><span><Clock3 size={13}/>{workout.duration} min</span><span><Flame size={13}/>{workout.caloriesBurned} kcal</span><span><Star size={13}/>{workout.rating}</span></div><div className="specs">{[["Equipment",workout.equipment],["Difficulty",workout.difficulty],["Sets",workout.sets],["Reps",workout.reps],["Duration",`${workout.duration} min`],["Calories",`${workout.caloriesBurned} kcal`],["Rating",workout.rating]].map(([label,value])=><div className="spec-row" key={String(label)}><span>{label}</span><span>{value}</span></div>)}</div><div className="instructions"><h3>INSTRUCTIONS</h3><ol>{workout.instructions.map((step,i)=><li key={i}>{step}</li>)}</ol></div><div className="detail-actions"><button className="primary-btn" onClick={add}><Plus size={15}/>{inPlan ? "IN TODAY'S PLAN" : "ADD TO TODAY'S PLAN"}</button><button className="secondary-btn" onClick={save}>{isSaved ? <Check size={15}/> : <Heart size={15}/>} {isSaved ? "SAVED" : "SAVE FOR LATER"}</button></div></div>{toast && <Toast message={toast} onClose={()=>setToast("")}/>}</div>;
}
