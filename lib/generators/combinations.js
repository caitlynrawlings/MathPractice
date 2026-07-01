import { pick, numericChoices } from "@/lib/utils";

export default function genOutfitCount() {
  const shirts = pick([5, 6, 7, 8, 9, 10]);
  const shorts = pick([3, 4, 5, 6]);
  const pants = pick([2, 3, 4, 5]);

  const outfitWithShorts = shirts * shorts;
  const outfitWithPants = shirts * pants;
  const correct = outfitWithShorts + outfitWithPants;

  const distractor1 = shirts * (shorts + pants - 1); // off by one bottom item
  const distractor2 = (shirts - 1) * (shorts + pants); // off by one shirt set
  const distractor3 = outfitWithShorts + outfitWithPants + shirts; // extra mistake add shirts

  const lines = `shirts: ${shirts}, shorts: ${shorts}, pants: ${pants}`;

  return {
    prompt: `Bill went to the store to purchase new clothes for the upcoming school year. He purchased ${shirts} shirts, ${shorts} pairs of shorts, and ${pants} pairs of pants. If a single outfit consists of one shirt and either one pair of shorts or one pair of pants, how many outfits can Bill create with the clothes he purchased? (${lines})`,
    choices: numericChoices(
      correct,
      [distractor1, distractor2, distractor3],
      (n) => String(n),
      5
    ),
  };
}