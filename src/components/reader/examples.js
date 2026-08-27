/** Short everyday examples for a few well-known verses; otherwise a calm generic line. */
const EXAMPLES = {
  '2.47':
    'You can study hard for a test. You cannot control every mark you get. Do the work carefully — then let the result come.',
  '2.14':
    'Hot days and cold days both pass. Feelings rise and fall the same way. Notice them, and keep going.',
  '18.66':
    'When you feel lost, ask for help from someone you trust. Putting down the worry is part of moving forward.',
};

export function getEverydayExample(chapterNumber, verseNumber) {
  const key = `${chapterNumber}.${verseNumber}`;
  return (
    EXAMPLES[key] ||
    'Think of one small action you can take today with care — without clinging to how it turns out.'
  );
}
