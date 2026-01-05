/**
 * File will be mainly used to fetch data. Currently, data is mocked.
 */

import type { CardDto, CardType, Domain, Rarity } from '@/types/card';
import mockCardsOGN from '../../mockData/cards-OGN.json';
import mockCardsOGS from '../../mockData/cards-OGS.json';
import mockCardsSFD from '../../mockData/cards-SFD.json';

/** Mock data that is coming from Riftcodex */
type MockCard = {
  name: string;
  id: string;
  riftbound_id: string;
  tcgplayer_id: string | null;
  public_code: string | null;
  collector_number: number | null;
  attributes: {
    energy: number | null;
    might: number | null;
    power: number | null;
  };
  classification: {
    type: string | null;
    supertype: string | null;
    rarity: string | null;
    domain: string[];
  };
  text: {
    rich: string | null;
    plain: string | null;
  };
  set: {
    set_id: string | null;
    label: string | null;
  };
  media: {
    image_url: string;
    artist: string | null;
    accessibility_text: string | null;
  };
  tags: string[];
  orientation: string | null;
  metadata: {
    alternate_art: boolean;
    overnumbered: boolean;
    signature: boolean;
  };
};

const MOCK_CARDS_BY_SET: Record<string, MockCard[]> = {
  OGN: mockCardsOGN as MockCard[],
  OGS: mockCardsOGS as MockCard[],
  SFD: mockCardsSFD as MockCard[],
};

/**
 * Fetches card data. Currently uses mock data.
 * In the future, this function will fetch data from an API.
 * Considering the cards to be fetched by set.
 */
export const fetchCardsBySet = async (setId: string): Promise<CardDto[]> => {
  const mockCards = MOCK_CARDS_BY_SET[setId] || [];
  if (mockCards.length === 0) {
    console.error(`No cards found for set ID: ${setId}`);
  }

  return mockCards.map((card: MockCard) => {
    const {
      name,
      id,
      public_code,
      collector_number,
      attributes,
      classification,
      text,
      set,
      media,
      tags,
      metadata,
    } = card;

    const isMainDeckCard =
      classification.type === 'Unit' ||
      classification.type === 'Spell' ||
      classification.type === 'Gear' ||
      classification.type === 'Signature Spell';
    const isUnit = classification.type === 'Unit';
    const isChampionUnit = classification.supertype === 'Champion Unit';
    const isToken = classification.supertype === 'Token';

    return {
      id: id,
      code: parsePublicCode(public_code) || null,
      collectorNumber: collector_number,
      set: set.set_id,
      name: name,
      description: text.plain,
      type: (isChampionUnit
        ? 'Champion Unit'
        : isToken
          ? 'Token'
          : classification.type) as CardType,
      rarity:
        metadata.overnumbered || metadata.alternate_art
          ? 'Showcase'
          : (classification.rarity as Rarity),
      domain: classification.domain
        ? classification.domain.map((d) => d as Domain)
        : [],
      energy: isMainDeckCard ? attributes.energy : null,
      power: isMainDeckCard ? attributes.power : null,
      might: isUnit ? attributes.might : null,
      keywords: [],
      tags: tags,
      flavorText: null,
      artist: media.artist,
      isAlternateArt: metadata.alternate_art,
      isOvernumber: metadata.overnumbered || metadata.signature,
      isSignature: metadata.signature,
    };
  });
};

const parsePublicCode = (publicCode: string | null): string | null => {
  const splits = publicCode?.split('/') ?? [];
  if (splits.length === 0 || splits.length > 2) return null;

  const cardId = splits[0];
  // Card ids with "*" indicate a signature, though in CDN IDs, we will use "s".
  const finalCodeId = cardId?.replace('*', 's') || null;

  return finalCodeId;
};
