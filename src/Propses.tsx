export interface Mountain {
  id: number;
  漢字山名: string;
  ひらがな山名: string;
  都道府県: string;
  標高: number;
}

export interface CardProps {
  id: number;
  KanjiName: string;
  HiraganaName: string;
  prefecture: string;
  matched: boolean;
  flipped: boolean;
  disabled: boolean;
  onClick: (id: number) => void;
}
