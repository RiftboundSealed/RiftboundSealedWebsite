import random from 'random';

import { fetchCardsData } from '@/services/cards/cardsApi';
import type { CardDto } from '@/types/card';

type PackHitType =
  | 'Signature'
  | 'Overnumbered'
  | 'Alternate Art'
  | 'Two Epics'
  | 'One Epic'
  | 'None';

/**
 * Unpacks 13 cards from a specified set using logic from
 * [Collectability in Riftbound Origins article](https://riftbound.leagueoflegends.com/en-us/news/announcements/collectability-in-riftbound-origins/)
 *
 * @param setId
 */
export const unpackCards = async (setId: string): Promise<CardDto[]> => {
  const cards = await fetchCardsData();

  // Determine if pack is a hit
  const hitType = ((): PackHitType => {
    if (random.int(1, 720) === 1) {
      return 'Signature';
    } else if (random.int(1, 72) === 1) {
      return 'Overnumbered';
    } else if (random.int(1, 12) === 1) {
      return 'Alternate Art';
    } else if (random.int(1, 16) === 1) {
      return 'Two Epics';
    } else if (random.int(1, 4) === 1) {
      return 'One Epic';
    } else {
      return 'None';
    }
  })();

  // Filter cards by setId
  const cardsFromSet = cards.filter((card) => card.set === setId);
  // Remove runes & tokens
  const validCardFromSet = cardsFromSet.filter(
    (card) => !['Rune', 'Token'].includes(card.type),
  );

  // Get cards of each rarity
  const commonCards = validCardFromSet.filter(
    (card) => card.rarity === 'Common',
  );
  const uncommonCards = validCardFromSet.filter(
    (card) => card.rarity === 'Uncommon',
  );
  const rareCards = validCardFromSet.filter((card) => card.rarity === 'Rare');
  const epicCards = validCardFromSet.filter((card) => card.rarity === 'Epic');
  const alternateArtCards = validCardFromSet.filter(
    (card) => card.isAlternateArt,
  );
  const overnumberCards = validCardFromSet.filter((card) => card.isOvernumber);
  const signatureCards = validCardFromSet.filter((card) => card.isSignature);

  // Return 13 cards
  const cardsToReturn: CardDto[] = [];
  // [1-7] 7 commons (unique)
  const commonRoll = new Set<number>();
  while (commonRoll.size < 7) {
    commonRoll.add(random.int(0, commonCards.length - 1));
  }
  for (const index of commonRoll) {
    cardsToReturn.push(commonCards[index]);
  }
  // [8-10] 3 uncommons (unique)
  const uncommonRoll = new Set<number>();
  while (uncommonRoll.size < 3) {
    uncommonRoll.add(random.int(0, uncommonCards.length - 1));
  }
  for (const index of uncommonRoll) {
    cardsToReturn.push(uncommonCards[index]);
  }
  // [11] "Foil" card (common, uncommon, rare, or epic)
  const foilCards = commonCards.concat(uncommonCards, rareCards, epicCards);
  cardsToReturn.push(foilCards[random.int(0, foilCards.length - 1)]);
  // [12] Rare/Epic
  if (hitType === 'Two Epics') {
    cardsToReturn.push(epicCards[random.int(0, epicCards.length - 1)]);
  } else {
    cardsToReturn.push(rareCards[random.int(0, rareCards.length - 1)]);
  }
  // [13] Epic/Showcase/Signature/Overnumbered/Alternate Art
  if (hitType === 'Signature') {
    cardsToReturn.push(
      signatureCards[random.int(0, signatureCards.length - 1)],
    );
  } else if (hitType === 'Overnumbered') {
    cardsToReturn.push(
      overnumberCards[random.int(0, overnumberCards.length - 1)],
    );
  } else if (hitType === 'Alternate Art') {
    cardsToReturn.push(
      alternateArtCards[random.int(0, alternateArtCards.length - 1)],
    );
  } else if (hitType === 'One Epic' || hitType === 'Two Epics') {
    cardsToReturn.push(epicCards[random.int(0, epicCards.length - 1)]);
  } else {
    cardsToReturn.push(rareCards[random.int(0, rareCards.length - 1)]);
  }

  return cardsToReturn;
};
