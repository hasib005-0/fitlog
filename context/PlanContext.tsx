"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Workout } from "@/lib/types";

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem("fitlog-plan");
      const s = localStorage.getItem("fitlog-saved");
      const d = localStorage.getItem("fitlog-done");
      if (p) setPlan(JSON.parse(p));
      if (s) setSaved(JSON.parse(s));
      if (d) setDone(JSON.parse(d));
    } catch {
      // Keep clean defaults if localStorage contains invalid data.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    localStorage.setItem("fitlog-done", JSON.stringify(done));
  }, [plan, saved, done, hydrated]);

  const value = useMemo<PlanContextType>(() => ({
    plan,
    saved,
    done,
    hydrated,
    addToPlan: (workout) => {
      if (plan.some((item) => item.id === workout.id) || plan.length >= 5) return false;
      setPlan((items) => [...items, workout]);
      return true;
    },
    saveForLater: (workout) => {
      if (saved.some((item) => item.id === workout.id)) return false;
      setSaved((items) => [...items, workout]);
      return true;
    },
    removeFromPlan: (id) => setPlan((items) => items.filter((item) => item.id !== id)),
    removeSaved: (id) => setSaved((items) => items.filter((item) => item.id !== id)),
    markDone: (id) => setDone((items) => items.includes(id) ? items : [...items, id])
  }), [plan, saved, done, hydrated]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside PlanProvider");
  return context;
}
