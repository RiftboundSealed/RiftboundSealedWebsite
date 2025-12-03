import random from 'random';

import { fetchCardsData } from '@/services/cards/cardsApi';
import type { CardDto, Rarity } from '@/types/card';

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
 * @param setId - The ID of the set to unpack cards from
 */
export const unpackCards = async (setId: string): Promise<CardDto[]> => {
  const cards = await fetchCardsData();

  /**
   * Determines what special hit (if any) the pack will contain
   */
  const hitType = ((): PackHitType => {
    const a = 1 / 720; // Signature
    const b = 1 / 72; // Overnumbered
    const c = 1 / 12; // Alternate Art
    const d = 1 / 16; // Two Epics
    const e = 1 / 4; // One Epic

    const pSignature = a;
    const pOvernumbered = (1 - a) * b;
    const pAlternateArt = (1 - a) * (1 - b) * c;
    const pTwoEpics = (1 - a) * (1 - b) * (1 - c) * d;
    const pOneEpic = (1 - a) * (1 - b) * (1 - c) * (1 - d) * e;

    const roll = random.float(0, 1);
    let type = 'None';
    if (roll < pSignature) type = 'Signature';
    else if (roll < pSignature + pOvernumbered) type = 'Overnumbered';
    else if (roll < pSignature + pOvernumbered + pAlternateArt)
      type = 'Alternate Art';
    else if (roll < pSignature + pOvernumbered + pAlternateArt + pTwoEpics)
      type = 'Two Epics';
    else if (
      roll <
      pSignature + pOvernumbered + pAlternateArt + pTwoEpics + pOneEpic
    )
      type = 'One Epic';
    //console.log(`Roll - ${roll.toFixed(6)}: ${type}`);
    return type as PackHitType;
  })();

  /**
   * Determines the rarity of the foil card in the pack
   */
  const foilRarity = ((): Rarity => {
    // Making up these numbers since they aren't specified in the article
    // const pFoilCommon = 0.5;
    const pFoilUncommon = 0.35;
    const pFoilRare = 0.1;
    const pFoilEpic = 0.05;

    const roll = random.float(0, 1);
    if (roll < pFoilEpic) {
      return 'Epic';
    } else if (roll < pFoilEpic + pFoilRare) {
      return 'Rare';
    } else if (roll < pFoilEpic + pFoilRare + pFoilUncommon) {
      return 'Uncommon';
    } else {
      return 'Common';
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
  // Validate that all required card arrays are non-empty
  if (
    commonCards.length === 0 ||
    uncommonCards.length === 0 ||
    rareCards.length === 0 ||
    epicCards.length === 0 ||
    alternateArtCards.length === 0 ||
    overnumberCards.length === 0 ||
    signatureCards.length === 0
  ) {
    throw new Error(
      `Pack generation failed: missing cards for one or more required rarities in set "${setId}".` +
        ` (Common: ${commonCards.length}, Uncommon: ${uncommonCards.length}, Rare: ${rareCards.length}, Epic: ${epicCards.length})`,
    );
  }

  // Return 13 cards (all unique)
  const cardsToReturn: CardDto[] = [];
  /**
   * Rolls a card from the provided list, ensuring it hasn't already been selected
   */
  const rollCard = (cardsList: CardDto[]): CardDto => {
    // Filter out cards with null/undefined collectorNumber or already selected
    const usedCollectorNumbers = new Set(
      cardsToReturn.map((c) => c.collectorNumber),
    );
    const availableCards = cardsList.filter(
      (card) =>
        card.collectorNumber != null &&
        !usedCollectorNumbers.has(card.collectorNumber),
    );
    if (availableCards.length === 0) {
      throw new Error(
        `Pack generation failed: not enough unique cards available to select from the provided list.`,
      );
    }
    return availableCards[random.int(0, availableCards.length - 1)];
  };
  // [1-7] 7 commons slots
  for (let i = 0; i < 7; i++) {
    cardsToReturn.push(rollCard(commonCards));
  }
  // [8-10] 3 uncommons slots
  for (let i = 0; i < 3; i++) {
    cardsToReturn.push(rollCard(uncommonCards));
  }
  // [11] Foil slot (common, uncommon, rare, or epic)
  if (foilRarity === 'Common') {
    cardsToReturn.push(rollCard(commonCards));
  } else if (foilRarity === 'Uncommon') {
    cardsToReturn.push(rollCard(uncommonCards));
  } else if (foilRarity === 'Rare') {
    cardsToReturn.push(rollCard(rareCards));
  } else {
    cardsToReturn.push(rollCard(epicCards));
  }
  // [12] Rare/Epic slot
  if (hitType === 'Two Epics') {
    cardsToReturn.push(rollCard(epicCards));
  } else {
    cardsToReturn.push(rollCard(rareCards));
  }
  // [13] Epic/Showcase/Signature/Overnumbered/Alternate Art slot
  if (hitType === 'Signature') {
    cardsToReturn.push(rollCard(signatureCards));
  } else if (hitType === 'Overnumbered') {
    cardsToReturn.push(rollCard(overnumberCards));
  } else if (hitType === 'Alternate Art') {
    cardsToReturn.push(rollCard(alternateArtCards));
  } else if (hitType === 'One Epic' || hitType === 'Two Epics') {
    cardsToReturn.push(rollCard(epicCards));
  } else {
    cardsToReturn.push(rollCard(rareCards));
  }

  return cardsToReturn;
};
