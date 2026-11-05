import { BuildOption, WeaponOption, LimitationOption } from "./types";

export const INFERNAL_CAPE_STEPS = [
  {
    step: 1,
    title: "Select your account build and weapon type",
  },
  {
    step: 2,
    title: "Complete order with any payment method of your choice",
  },
  {
    step: 3,
    title: "Choose payment method and proceed your payment",
  },
  {
    step: 4,
    title: "Wait for your order to get completed and leave feedback",
  },
];

export const BUILD_OPTIONS: BuildOption[] = [
  {
    id: "main",
    name: "MAIN",
    subtitle: "94+ Ranged and 95+ Magic*",
    image: "/assets/infernal/main.png",
  },
  {
    id: "zerker",
    name: "ZERKER",
    subtitle: "94+ Ranged and 95+ Magic*",
    image: "/assets/infernal/berserker.png",
  },
  {
    id: "pure",
    name: "PURE",
    subtitle: "94+ Ranged and 95+ Magic*",
    image: "/assets/infernal/pure.png",
  },
];

export const WEAPON_OPTIONS: WeaponOption[] = [
  {
    id: "twisted_bow",
    name: "TWISTED BOW",
    image: "/assets/infernal/twisted-bow.png",
  },
  {
    id: "bow_of_faerdhinen",
    name: "BOW OF FAERDHINEN",
    image: "/assets/infernal/bowoffaerdhinen.webp",
  },
  {
    id: "armadyl_crossbow",
    name: "ARMADYL CROSSBOW",
    image: "/assets/infernal/armadylcrossbow.webp",
  },
];

export const LIMITATION_OPTIONS: LimitationOption[] = [
  {
    id: "no_rigour",
    name: "NO RIGOUR",
    image: "/assets/infernal/rigour.webp",
    priceDelta: 6.0,
  },
];

export const INFERNAL_PRICES: Record<string, number> = {
  main_twisted_bow: 55.0,
  main_bow_of_faerdhinen: 62.0,
  main_armadyl_crossbow: 68.0,
  zerker_twisted_bow: 73.0,
  zerker_bow_of_faerdhinen: 79.0,
  zerker_armadyl_crossbow: 79.0,
  pure_twisted_bow: 92.0,
  pure_bow_of_faerdhinen: 99.0,
  pure_armadyl_crossbow: 99.0,
};

export function calculateInfernalPrice(
  buildId: string,
  weaponId: string,
  hasNoRigour: boolean
): number {
  const key = `${buildId}_${weaponId}`;
  const base = INFERNAL_PRICES[key] ?? 55.0;
  return base + (hasNoRigour ? 6.0 : 0);
}
