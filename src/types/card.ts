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
export type Domain = 'Fury' | 'Calm' | 'Mind' | 'Body' | 'Order' | 'Chaos';

export type CardDto = {
  readonly id: string;
  readonly code: string | null;
  readonly collectorNumber: number | null;
  readonly set: string | null;
  readonly name: string;
  readonly description: string | null;
  readonly type: CardType;
  readonly rarity: Rarity;
  readonly domain: Domain[];
  readonly energy: number | null;
  readonly power: number | null;
  readonly might: number | null;
  readonly keywords: string[];
  readonly tags: string[];
  readonly flavorText: string | null;
  readonly artist: string | null;
  readonly isAlternateArt: boolean;
  readonly isOvernumber: boolean;
  readonly isSignature: boolean;
};
