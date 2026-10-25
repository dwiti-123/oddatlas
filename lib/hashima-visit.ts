export const hashimaVisit = {
 checked: '2026-10-24',
 sources: [
  {title:'Gunkanjima Cruise — 21 October landing suspension notice',url:'https://www.gunkanjima-cruise.jp/en/2026/10/21/%E3%80%90%E9%87%8D%E8%A6%81%E3%80%918%E6%9C%8827%E6%97%A5%E3%82%88%E3%82%8A%E8%BB%8D%E8%89%A6%E5%B3%B6%E3%81%AB%E3%81%AF%E4%B8%8A%E9%99%B8%E5%87%BA%E6%9D%A5%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82/'},
  {title:'Gunkanjima Cruise — fares, itinerary and reception',url:'https://www.gunkanjima-cruise.jp/en/'},
  {title:'Gunkanjima Cruise — reservation conditions',url:'https://www.gunkanjima-cruise.jp/en/about/'},
  {title:'Gunkanjima Concierge — official ticket prices and calendar (Japanese)',url:'https://www.gunkanjima-concierge.com/cgi/web/'},
 ],
 booking:'https://www.gunkanjima-cruise.jp/reserve_input.php?lang=en',
};

// Dated budget conversion, not a live exchange-rate quote.
export const hashimaFx = {jpyPerUsd:156.87,date:'2026-10-23',source:'https://www.investing.com/currencies/usd-jpy-historical-data'};
export function hashimaUsd(yen:number) {return `US$${Math.round(yen/hashimaFx.jpyPerUsd)}`;}
