import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="workout-card group">
      <div className="card-image-wrap"><img src={workout.image} alt={workout.name} className="card-image" /><span className="difficulty">{workout.difficulty}</span></div>
      <div className="card-body">
        <div className="tags">{workout.muscleGroups.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h3>{workout.name.toUpperCase()}</h3>
        <p className="equipment">{workout.equipment}</p>
        <div className="stats"><span><Clock3 size={13}/>{workout.duration} min</span><span><Flame size={13}/>{workout.caloriesBurned} kcal</span><span><Star size={13}/>{workout.rating}</span></div>
      </div>
    </Link>
  );
}
