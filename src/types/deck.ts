export type DeckEntity = {
  readonly id: string;
  readonly cardId: string;
  readonly poolId: string | null; // null if it's a rune card
};
