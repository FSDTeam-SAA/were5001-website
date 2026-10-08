export interface BuildOption {
  id: "main" | "zerker" | "pure";
  name: string;
  subtitle: string;
  image: string;
}

export interface WeaponOption {
  id: "twisted_bow" | "bow_of_faerdhinen" | "armadyl_crossbow";
  name: string;
  image: string;
}

export interface LimitationOption {
  id: "no_rigour";
  name: string;
  image: string;
  priceDelta: number;
}
