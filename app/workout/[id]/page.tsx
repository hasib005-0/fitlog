import Link from "next/link";
import { notFound } from "next/navigation";
import WorkoutDetails from "@/components/WorkoutDetails";
import { getWorkout } from "@/lib/api";

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) notFound();
  return <main className="section detail-page"><Link href="/" className="back-link">← Back to library</Link><WorkoutDetails workout={workout}/></main>;
}
