/**
 * File will be mainly used to fetch data. Currently, data is mocked.
 */

import type { CardDto, CardType, Domain, Rarity } from '@/types/card';
import mockCards from '../../mockData/cards.json';

type MockCard = {
  id: string;
  number: string | null;
  code: string | null;
  name: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    id: string;
    name: string;
    releaseDate: string;
  };
  tcgplayer: {
    id: number;
    url: string;
  };
  cleanName: string;
  rarity: string;
  cardType: string;
  domain: string | null;
  energyCost: string | null;
  powerCost: string | null;
  might: string | null;
  description: string | null;
  flavorText: string | null;
  modifiedOn: string;
};

export const fetchCardsData = async (): Promise<CardDto[]> => {
  return mockCards.map((card: MockCard) => {
    const isMainDeckCard =
      card.cardType === 'Unit' ||
      card.cardType === 'Champion Unit' ||
      card.cardType === 'Spell' ||
      card.cardType === 'Gear' ||
      card.cardType === 'Signature Spell';

    const isUnit =
      card.cardType === 'Unit' || card.cardType === 'Champion Unit';

    return {
      id: card.id,
      collectorNumber: card.number
        ? parseInt(card.number.split('/')[0].slice(0, 3))
        : null, // can assume first 3 chars before '/' are the collector number
      set: card.set.id,
      name: card.name,
      description: card.description,
      type: card.cardType as CardType,
      rarity:
        card.rarity === 'Overnumbered' || card.rarity === 'Alternate Art'
          ? 'Showcase'
          : (card.rarity as Rarity),
      domain: card.domain ? card.domain.split(';').map((d) => d as Domain) : [],
      energy: isMainDeckCard ? parseInt(card.energyCost || '0') : null,
      power: isMainDeckCard ? parseInt(card.powerCost || '0') : null,
      might: isUnit ? parseInt(card.might || '0') : null,
      keywords: [],
      tags: [],
      flavorText: card.flavorText,
      artist: 'Mock Artist',
      thumbnailUrl: card.images.small,
      fullUrl: card.images.large,
      isAlternateArt: card.number?.includes('a') || false,
      isOvernumber: card.rarity === 'Overnumbered' || false,
      isSignature: card.number?.includes('*') || false,
    };
  });
};
