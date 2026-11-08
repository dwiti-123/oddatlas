export type DistinctiveFact = {
  label: string;
  value: string;
  explanation: string;
};

export type PlaceDistinctiveFacts = {
  title: string;
  intro: string;
  facts: DistinctiveFact[];
  source: { label: string; url: string };
  checked: string;
};

/** First-party capacity and visitation facts used on the discovery pages. */
export const placeDistinctiveFacts: Record<string, PlaceDistinctiveFacts> = {
  mirrorcube: {
    title: 'What makes the Mirrorcube unusual?',
    intro: 'The Mirrorcube is not a hotel with dozens of identical rooms. It is one specific tree room, designed to make its small footprint visually disappear into the forest.',
    facts: [
      { label: 'Sleeps', value: '2 guests', explanation: 'Treehotel lists a double bed and a two-person design for this room.' },
      { label: 'Room size', value: '16 m²', explanation: 'The operator’s agent information gives the room’s compact floor area.' },
      { label: 'Built', value: '2010', explanation: 'Treehotel lists the construction year for the Mirrorcube.' },
    ],
    source: { label: 'Treehotel — Mirrorcube facts and rate', url: 'https://treehotel.se/treerooms/mirrorcube/' },
    checked: '2026-11-08',
  },
  'port-arthur': {
    title: 'How unusual is Port Arthur as a visitor site?',
    intro: 'Port Arthur is both a large working heritage site and an after-dark storytelling experience. Its scale is measurable: the operator publishes annual visitor and tour-participation figures.',
    facts: [
      { label: 'Day visitors', value: '333,322 in 2024–25', explanation: 'Port Arthur Historic Site Management Authority’s annual report records day visitors for the historic site.' },
      { label: 'Ghost Tour guests', value: '20,640 in 2024–25', explanation: 'The same report records participants in the lantern-lit Ghost Tours.' },
      { label: 'Historic site', value: '40+ hectares · 30+ buildings', explanation: 'The official FAQ describes the managed grounds and its buildings, ruins and museum houses.' },
    ],
    source: { label: 'PAHSMA Annual Report 2024–25', url: 'https://portarthur.org.au/wp-content/uploads/2025/11/PAHSMA-Annual-Report-2024-25.pdf' },
    checked: '2026-11-08',
  },
  'stanley-hotel': {
    title: 'How many rooms does The Stanley have?',
    intro: 'The Stanley is not a single haunted-room attraction. It is an operating hotel district, so a visitor can choose between a tour, an overnight stay, or both.',
    facts: [
      { label: 'Accommodations', value: '220 across 4 properties', explanation: 'The official hotel site gives this total for The Stanley district, including rooms, lodges, condos and a cottage.' },
      { label: 'Spirited rooms', value: '13 highlighted rooms', explanation: 'The operator identifies 13 rooms as its most “spirited”; this is a storytelling category, not proof of paranormal activity.' },
      { label: 'Founded', value: '1909', explanation: 'The hotel describes the original property as a 1909 landmark.' },
    ],
    source: { label: 'The Stanley — official accommodations', url: 'https://www.stanleyhotel.com/' },
    checked: '2026-11-08',
  },
};
