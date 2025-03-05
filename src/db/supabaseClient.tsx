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

  const allPrefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', 
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', 
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', 
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', 
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', 
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', 
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];

  // 12個の都道府県をランダムに選択する関数
  const getRandomPrefectures = (prefectures: string[]) => {
    const shuffled = [...prefectures];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 12);
  };

  const selectedPrefectures = getRandomPrefectures(allPrefectures);

  // 特定の都道府県から2つのランダムな山を取得する関数
  const getRandomMountainsForPrefecture = (prefecture: string) => {
    const prefectureMountains = data.filter(mountain => 
      mountain['都道府県'] === prefecture
    );
    
    const shuffledPrefectureMountains = shuffleArray(prefectureMountains);
    
    return shuffledPrefectureMountains.slice(0, 2);
  };

  // 選ばれた都道府県から2つのランダムな山を集める
  const selectedMountains = selectedPrefectures.flatMap(prefecture => 
    getRandomMountainsForPrefecture(prefecture)
  );

  const selectedMountainsShuffled = shuffleArray(selectedMountains);

  console.log("supabaseClient.tsx - Supabaseから12都道府県の山をランダムに取得しました。：", selectedMountainsShuffled);
  console.log("選ばれた都道府県：", selectedPrefectures);
  return selectedMountainsShuffled;
}

// 配列をシャッフルする関数
function shuffleArray(array: Mountain[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
