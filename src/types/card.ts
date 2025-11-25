export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Showcase';
export type CardType =
  | 'Legend'
  | 'Unit'
  | 'Champion Unit'
  | 'Spell'
  | 'Gear'
  | 'Battlefield'
  | 'Rune'
  | 'Signature Spell'
  | 'Token';
export type Domain = 'Body' | 'Mind' | 'Chaos' | 'Body' | 'Fury' | 'Order';

export type CardDto = {
  readonly id: string;
  readonly collectorNumber: number;
  readonly set: string;
  readonly name: string;
  readonly description: string;
  readonly type: CardType;
  readonly rarity: Rarity;
  readonly domain: Domain[];
  readonly energy: number | null;
  readonly might: number | null;
  readonly power: number | null;
  readonly keywords: string[];
  readonly tags: string[];
  readonly flavorText: string;
  readonly artist: string;
  readonly thumbnailUrl: string;
  readonly fullUrl: string;
  readonly isAlternateArt: boolean;
  readonly isOvernumber: boolean;
  readonly isSignature: boolean;
};
