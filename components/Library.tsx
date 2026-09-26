"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/lib/types";

type Sort = "duration" | "calories" | "rating";

export default function Library({ workouts }: { workouts: Workout[] }) {
  const [sort, setSort] = useState<Sort>("duration");

  const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sort === "duration") {
        return Number(b.duration) - Number(a.duration);
      }

      if (sort === "calories") {
        return Number(b.caloriesBurned) - Number(a.caloriesBurned);
      }

      return Number(b.rating) - Number(a.rating);
    });
  }, [workouts, sort]);

  return (
    <section id="library" className="section library">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE LIBRARY</p>
          <h2>Twelve lifts for every major muscle group.</h2>
        </div>

        <label className="sort">
          Sort By

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>

          <ChevronDown size={15} />
        </label>
      </div>

      <div className="workout-grid">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}