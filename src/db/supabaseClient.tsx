import { createClient } from "@supabase/supabase-js";
import { Mountain } from "../Propses";

const URL = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = createClient(
  URL,
  anonKey,
);

export default async function getMountains() {
  const { data, error } = await supabaseClient.from("mountains").select();

  if (error) {
    console.error(
      "Supabaseからのデータの取得に失敗してしまいました…。：",
      error,
    );
    return;
  }

  const flippedData = data.map((mountain) => ({ ...mountain, flipped: false }));
  const shuffledData = shuffleArray(flippedData);
  console.log("supabaseClient.tsx - Supabaseからデータを取得してシャッフルしました。：", shuffledData);
  return shuffledData;
}

function shuffleArray(array: Mountain[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
