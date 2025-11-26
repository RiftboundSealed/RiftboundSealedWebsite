// DEPRECATE THE FILE: Was only used in examples. Remove once examples are updated.
// Common types used throughout the application

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Card {
  id: string;
  name: string;
  type: string;
  rarity: string;
  manaCost?: string;
}

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SealedPool {
  id: string;
  cards: Card[];
  userId: string;
}
