import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { market, marketIsOver } from "@/data/market";

/**
 * A slim band at the top of the homepage pointing to the High Point Market
 * page. It is in the prerendered HTML, so search engines see the link, and it
 * removes itself in the browser once the market has closed.
 */
export function MarketNotice() {
  const [over, setOver] = useState(false);
  useEffect(() => setOver(marketIsOver()), []);
  if (over) return null;

  return (
    <div className="w-full bg-ink text-paper">
      <Link
        to="/high-point-market"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-3 text-center text-sm sm:px-10"
      >
        <span>
          Now exhibiting at {market.name} {market.season}
        </span>
        <span className="text-paper/60">
          {market.datesLabel} · Booth {market.booth}, {market.building}
        </span>
        <span className="underline decoration-paper/40 underline-offset-4">Directions →</span>
      </Link>
    </div>
  );
}
