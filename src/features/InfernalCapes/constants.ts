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
    image: "/assets/infernal/veracs-helm.webp",
  },
  {
    id: "zerker",
    name: "ZERKER",
    subtitle: "94+ Ranged and 95+ Magic*",
    image: "/assets/infernal/berserker-helm.webp",
  },
  {
    id: "pure",
    name: "PURE",
    subtitle: "94+ Ranged and 95+ Magic*",
    image: "/assets/infernal/robin-hood-hat.webp",
  },
];

export const WEAPON_OPTIONS: WeaponOption[] = [
  {
    id: "twisted_bow",
    name: "TWISTED BOW",
    image: "/assets/infernal/osrs-twisted-bow.webp",
  },
  {
    id: "bow_of_faerdhinen",
    name: "BOW OF FAERDHINEN",
    image: "/assets/infernal/bow-of-faerdhinen.webp",
  },
  {
    id: "armadyl_crossbow",
    name: "ARMADYL CROSSBOW",
    image: "/assets/infernal/armadyl-crossbow.webp",
  },
];

export const LIMITATION_OPTIONS: LimitationOption[] = [
  {
    id: "no_rigour",
    name: "NO RIGOUR",
    image: "/assets/infernal/rigour.webp",
    priceDelta: 10.0,
  },
];

export const INFERNAL_PRICES: Record<string, number> = {
  main_twisted_bow: 59.99,
  main_bow_of_faerdhinen: 67.99,
  main_armadyl_crossbow: 77.99,
  zerker_twisted_bow: 77.99,
  zerker_bow_of_faerdhinen: 85.99,
  zerker_armadyl_crossbow: 94.99,
  pure_twisted_bow: 97.99,
  pure_bow_of_faerdhinen: 106.99,
  pure_armadyl_crossbow: 116.99,
};

export function calculateInfernalPrice(
  buildId: string,
  weaponId: string,
  hasNoRigour: boolean
): number {
  const key = `${buildId}_${weaponId}`;
  const base = INFERNAL_PRICES[key] ?? 59.99;
  return base + (hasNoRigour ? 10.0 : 0);
}
