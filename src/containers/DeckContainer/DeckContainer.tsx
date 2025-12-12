import { Box, Typography } from '@mui/material';
import { type JSX } from 'react';

import ButtonRemove from '@/components/ButtonRemove/ButtonRemove';
import { MAIN_DECK_SIZE, RUNE_DECK_SIZE } from '@/consts/deck';
import useDeckContainer from './useDeckContainer';

import './DeckContainer.css';

const DeckContainer = (): JSX.Element => {
  // Constants
  const CONTAINER_MAX_HEIGHT_PX = 600;
  const ROW_MAX_HEIGHT_PX = 36;

  // Hooks
  const { cardsInDeck, handleRemoveFromDeck } = useDeckContainer();

  // Sort the cards
  const displayCards = [...cardsInDeck].sort((a, b) =>
    a.id.localeCompare(b.id),
  );

  // Filter by Legend, Unit, Spell, Gear, Battlefield, Runes
  const legendCards = displayCards.filter((card) => card.type === 'Legend');
  const championUnitCards = displayCards.filter(
    (card) => card.type === 'Champion Unit',
  );
  const unitCards = displayCards.filter((card) => card.type === 'Unit');
  const spellCards = displayCards.filter(
    (card) => card.type === 'Spell' || card.type === 'Signature Spell',
  );
  const gearCards = displayCards.filter((card) => card.type === 'Gear');
  const battlefieldCards = displayCards.filter(
    (card) => card.type === 'Battlefield',
  );
  const runeCards = displayCards.filter((card) => card.type === 'Rune');
  // Reduce rune cards to a map that is cardId -> deckId[]
  const runeMap = runeCards.reduce<Map<string, string[]>>(
    (map, { id: cardId, deckId }) => {
      const arr = map.get(cardId);
      if (arr) {
        arr.push(deckId);
      } else {
        map.set(cardId, [deckId]);
      }
      return map;
    },
    new Map(),
  );

  // Statuses & Sections
  const mainDeckCount =
    championUnitCards.length +
    unitCards.length +
    spellCards.length +
    gearCards.length;
  const runeCount = runeCards.length;
  const sections = [
    { key: 'legend', title: 'Legend', cards: legendCards },
    { key: 'champion-unit', title: 'Champion Units', cards: championUnitCards },
    { key: 'unit', title: 'Units', cards: unitCards },
    { key: 'spell', title: 'Spells', cards: spellCards },
    { key: 'gear', title: 'Gear', cards: gearCards },
    { key: 'battlefield', title: 'Battlefields', cards: battlefieldCards },
  ];

  return (
    <Box
      className="deck-container"
      style={{ maxHeight: `${CONTAINER_MAX_HEIGHT_PX}px` }}
    >
      {/* Row: Main deck status */}
      <div
        className={`deck-container__row deck-container__row--status ${
          mainDeckCount === MAIN_DECK_SIZE
            ? 'deck-container__row--ok'
            : mainDeckCount > MAIN_DECK_SIZE
              ? 'deck-container__row--error'
              : ''
        }`}
      >
        <Typography variant="h5">
          Main Deck Cards: {mainDeckCount} / {MAIN_DECK_SIZE}
        </Typography>
      </div>

      {/* Row: Rune deck */}
      <div
        className={`deck-container__row deck-container__row--status ${
          runeCount === RUNE_DECK_SIZE
            ? 'deck-container__row--ok'
            : runeCount > RUNE_DECK_SIZE
              ? 'deck-container__row--error'
              : ''
        }`}
      >
        <Typography variant="h5">
          Runes: {runeCount} / {RUNE_DECK_SIZE}
        </Typography>
      </div>
      {/* Row: Rune cards */}
      {[...runeMap.entries()].map(([cardId, deckIds]) => {
        const rune = runeCards.find((c) => c.id === cardId);

        return (
          <div
            key={cardId}
            className="deck-container__row deck-container__rune-row"
            style={{ maxHeight: `${ROW_MAX_HEIGHT_PX}px` }}
          >
            {/* Remove button */}
            <div className="deck-container__cell deck-container__cell--icon">
              <ButtonRemove
                onRemoveFromDeckClick={() =>
                  handleRemoveFromDeck(deckIds[0], null)
                }
              />
            </div>

            {/* Card name */}
            <Typography
              variant="body1"
              className="deck-container__cell deck-container__cell--name"
            >
              {`${deckIds.length}x ${rune?.name ?? 'RUNE ERROR'}`}
            </Typography>

            {/* Domain */}
            <Typography
              variant="body2"
              className="deck-container__cell deck-container__cell--domain"
            >
              {rune?.domain?.join(', ') ?? '-'}
            </Typography>
          </div>
        );
      })}

      {/* Sections by card type */}
      {sections.map((section) => (
        <div key={section.key} className="deck-container__section">
          {/* Section header */}
          <div className="deck-container__row deck-container__section-header">
            <Typography variant="h5">
              {section.title}: {section.cards.length}
            </Typography>
          </div>

          {/* Card rows */}
          {section.cards.map((card) => (
            <div
              key={card.deckId}
              className="deck-container__row deck-container__card-row"
              style={{ maxHeight: `${ROW_MAX_HEIGHT_PX}px` }}
            >
              {/* Remove button */}
              <div className="deck-container__cell deck-container__cell--icon">
                <ButtonRemove
                  onRemoveFromDeckClick={() =>
                    handleRemoveFromDeck(card.deckId, card.poolId)
                  }
                />
              </div>

              {/* Card name */}
              <Typography
                variant="body1"
                className="deck-container__cell deck-container__cell--name"
              >
                {card.name ?? 'CARD ERROR'}
              </Typography>

              {/* Energy cost */}
              <Typography
                variant="body2"
                className="deck-container__cell deck-container__cell--energy"
              >
                {card.energy ?? '-'}
              </Typography>

              {/* Power cost */}
              <Typography
                variant="body2"
                className="deck-container__cell deck-container__cell--power"
              >
                {card.power ?? '-'}
              </Typography>

              {/* Domain type(s) */}
              <Typography
                variant="body2"
                className="deck-container__cell deck-container__cell--domain"
              >
                {card.domain?.join(', ') ?? '-'}
              </Typography>
            </div>
          ))}
        </div>
      ))}
    </Box>
  );
};

export default DeckContainer;
