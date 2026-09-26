"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Library from "@/components/Library";
import WorkoutLoading from "@/components/WorkoutLoading";
import { Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then(setWorkouts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return <main><Hero/>{loading ? <section className="section"><WorkoutLoading/></section> : error ? <section className="section"><div className="empty"><h2>COULD NOT LOAD WORKOUTS</h2><p>Please refresh and try again.</p></div></section> : <Library workouts={workouts}/>}</main>;
}
