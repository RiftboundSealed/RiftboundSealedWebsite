export type PoolEntity = {
  readonly id: string;
  readonly cardId: string;
  addedToDeck: boolean; // This field will change when the card is being added/removed from the deck
};
