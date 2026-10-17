import booth from "@/assets/high-point-market/01-booth.webp";
import boothThumb from "@/assets/high-point-market/01-booth.thumb.webp";
import treeWall from "@/assets/high-point-market/02-tree-wall.webp";
import treeWallThumb from "@/assets/high-point-market/02-tree-wall.thumb.webp";
import peacockWall from "@/assets/high-point-market/03-peacock-wall.webp";
import peacockWallThumb from "@/assets/high-point-market/03-peacock-wall.thumb.webp";

/**
 * Everything about the High Point Market stand, in one place, so the page,
 * the homepage notice and the search-engine data never disagree.
 *
 * For a future market: change the dates, booth and photos here. The homepage
 * notice hides itself the day after `end`.
 */
export const market = {
  name: "High Point Market",
  season: "Fall 2026",
  /** ISO dates, used for search engines and for hiding the homepage notice. */
  start: "2026-10-16",
  end: "2026-10-21",
  datesLabel: "October 16–21, 2026",
  datesLong: "Friday, October 16 – Wednesday, October 21, 2026",
  booth: "M-5025",
  building: "Suites at Market Square",
  street: "Jacobs Pl",
  city: "High Point",
  region: "NC",
  postcode: "27260",
  country: "US",
  officialSite: "https://www.highpointmarket.org",
  registerUrl: "https://www.highpointmarket.org/register",
} as const;

export const marketAddress = `${market.building}, ${market.street}, ${market.city}, ${market.region} ${market.postcode}`;

const mapQuery = encodeURIComponent(marketAddress);

/** Opens turn-by-turn directions in the Google Maps app or site. */
export const googleDirections = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
/** Opens Apple Maps on iPhone and Mac, and Apple's web map elsewhere. */
export const appleDirections = `https://maps.apple.com/?daddr=${mapQuery}`;
/** A keyless Google Maps embed with a pin on the building. */
export const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`;

export type BoothPhoto = {
  src: string;
  thumb: string;
  width: number;
  height: number;
  alt: string;
};

export const boothPhotos = {
  wide: {
    src: booth,
    thumb: boothThumb,
    width: 2000,
    height: 1125,
    alt: "The Different Strokes booth M-5025 at High Point Market, with painted consoles, cabinets and wall art",
  },
  treeWall: {
    src: treeWall,
    thumb: treeWallThumb,
    width: 1125,
    height: 2000,
    alt: "The Divine, a sculptural tree painting, hung between the Vintage Noir glass pieces at the Different Strokes booth",
  },
  peacockWall: {
    src: peacockWall,
    thumb: peacockWallThumb,
    width: 1125,
    height: 2000,
    alt: "Feathers of Color, a stained glass peacock, on the wall of the Different Strokes booth at High Point Market",
  },
} satisfies Record<string, BoothPhoto>;

/** Pieces on the stand, in the order they appear on the page. */
export const onTheStand = [
  "between-day-and-night",
  "the-floating-lotus",
  "the-golden-duo",
  "feathers-of-color",
  "the-divine",
  "full-circle",
  "vintage-noir",
  "glass-reflections",
  "the-core",
  "rhythm-of-color",
] as const;

/** True once the market has closed, in the visitor's own clock. */
export const marketIsOver = (now = new Date()): boolean =>
  now > new Date(`${market.end}T23:59:59-04:00`);
