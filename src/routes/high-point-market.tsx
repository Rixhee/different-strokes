import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArtworkCard } from "@/components/artwork-card";
import { getArtwork, type Artwork } from "@/data/artworks";
import { site, canonical, shareImage } from "@/data/site";
import {
  market,
  marketAddress,
  googleDirections,
  appleDirections,
  mapEmbed,
  boothPhotos,
  onTheStand,
  type BoothPhoto,
} from "@/data/market";

const PATH = "/high-point-market";
const TITLE = `Different Strokes at High Point Market ${market.season} — Booth ${market.booth}`;
const DESCRIPTION = `Visit Different Strokes, art and functional furniture by ${site.artist}, at High Point Market ${market.season}: ${market.datesLabel}, booth ${market.booth}, ${market.building}, High Point, NC. Directions and photos of the booth.`;

/**
 * Structured data. This is what lets Google show the stand as an event, with
 * dates and an address, when someone searches for Different Strokes or High
 * Point Market exhibitors.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ExhibitionEvent",
  name: `${site.name} at ${market.name} ${market.season}`,
  description: DESCRIPTION,
  startDate: market.start,
  endDate: market.end,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: canonical(PATH),
  image: [shareImage("high-point-market")],
  location: {
    "@type": "Place",
    name: `${market.building}, Booth ${market.booth}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${market.street}, Booth ${market.booth}`,
      addressLocality: market.city,
      addressRegion: market.region,
      postalCode: market.postcode,
      addressCountry: market.country,
    },
  },
  organizer: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    sameAs: [site.instagram],
  },
  performer: { "@type": "Person", name: site.artist },
  superEvent: {
    "@type": "Event",
    name: `${market.name} ${market.season}`,
    url: market.officialSite,
    startDate: market.start,
    endDate: market.end,
    location: {
      "@type": "Place",
      name: market.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: market.city,
        addressRegion: market.region,
        addressCountry: market.country,
      },
    },
  },
};

export const Route = createFileRoute("/high-point-market")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content: `Different Strokes, High Point Market, High Point Market ${market.season}, booth ${market.booth}, ${market.building}, ${site.artist}, functional art, painted furniture, art furniture, High Point NC`,
      },
      { property: "og:title", content: TITLE },
      {
        property: "og:description",
        content: `${market.datesLabel} · Booth ${market.booth}, ${market.building}, High Point, NC.`,
      },
      { property: "og:url", content: canonical(PATH) },
      { property: "og:locale", content: "en_US" },
      // Overrides the site-wide share image with a photo of the booth.
      { property: "og:image", content: shareImage("high-point-market") },
      { name: "twitter:image", content: shareImage("high-point-market") },
    ],
    links: [{ rel: "canonical", href: canonical(PATH) }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
  component: HighPointMarket,
});

/** A booth photo, serving the 800px copy to phones and the 2000px one to wide screens. */
function Photo({
  photo,
  sizes,
  className = "",
  eager = false,
}: {
  photo: BoothPhoto;
  sizes: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={photo.src}
      srcSet={`${photo.thumb} 800w, ${photo.src} 2000w`}
      sizes={sizes}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={`h-auto w-full rounded-sm outline-1 -outline-offset-1 outline-ink/5 ${className}`}
    />
  );
}

function Directions({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <a
        href={googleDirections}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-xs bg-ink px-6 py-2.5 text-sm text-paper ring-1 ring-ink/20 transition-colors hover:bg-ink/90"
      >
        Directions in Google Maps
      </a>
      <a
        href={appleDirections}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-xs px-6 py-2.5 text-sm text-ink ring-1 ring-ink/25 transition-colors hover:bg-ink/5"
      >
        Open in Apple Maps
      </a>
    </div>
  );
}

function HighPointMarket() {
  const pieces = onTheStand
    .map((slug) => getArtwork(slug))
    .filter((artwork): artwork is Artwork => Boolean(artwork && artwork.images.length > 0));

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 sm:pt-24 sm:pb-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="art-fade lg:col-span-5">
              <p className="eyebrow">
                {market.name} · {market.season}
              </p>
              <h1 className="mt-5 max-w-[20ch] text-4xl leading-none text-balance text-ink sm:text-5xl">
                Visit {site.name} at {market.name}.
              </h1>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-pretty text-stone">
                We're exhibiting at {market.name} {market.season} in High Point, North Carolina.
                Come and see the painted consoles, cabinets, stained glass and sculptural work by{" "}
                {site.artist} in person — the colour and texture are best up close.
              </p>

              <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-line pt-6 text-sm">
                <dt className="text-stone">When</dt>
                <dd className="text-ink">
                  <time dateTime={market.start}>October 16</time>–
                  <time dateTime={market.end}>21, 2026</time>
                </dd>
                <dt className="text-stone">Booth</dt>
                <dd className="font-display text-lg leading-tight text-clay">{market.booth}</dd>
                <dt className="text-stone">Where</dt>
                <dd className="text-ink">
                  <address className="not-italic">
                    {market.building}
                    <br />
                    {market.street}, {market.city}, {market.region} {market.postcode}
                  </address>
                </dd>
              </dl>

              <Directions className="mt-8" />
            </div>

            <div className="art-fade-2 lg:col-span-7">
              <Photo photo={boothPhotos.wide} sizes="(min-width: 1024px) 680px, 100vw" eager />
              <p className="mt-3 text-xs text-stone/80">
                Booth {market.booth}, {market.building}
              </p>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="w-full bg-linen">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <p className="eyebrow">Finding the booth</p>
                <h2 className="mt-4 max-w-[20ch] text-3xl leading-tight text-balance text-ink sm:text-4xl">
                  {market.building}, booth {market.booth}
                </h2>
                <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-pretty text-stone">
                  {marketAddress}. Head to {market.building} and look for booth {market.booth}. Tap
                  a button to get directions on your phone.
                </p>
                <Directions className="mt-8" />
                <p className="mt-8 max-w-[40ch] text-sm leading-relaxed text-pretty text-stone">
                  {market.name} is a trade event. If you haven't registered yet, you can do so on
                  the{" "}
                  <a
                    href={market.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-clay"
                  >
                    official {market.name} website
                  </a>
                  .
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="aspect-4/3 w-full overflow-hidden rounded-sm outline-1 -outline-offset-1 outline-ink/10 sm:aspect-16/10">
                  <iframe
                    src={mapEmbed}
                    title={`Map showing ${market.building}, High Point, NC — booth ${market.booth}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
                <a
                  href={googleDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-stone transition-colors hover:text-ink"
                >
                  Open the map full screen →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Booth photos */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
          <p className="eyebrow">At the booth</p>
          <h2 className="mt-4 max-w-[30ch] text-3xl text-balance text-ink sm:text-4xl">
            A look inside booth {market.booth}.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
            <figure>
              <Photo photo={boothPhotos.treeWall} sizes="(min-width: 640px) 50vw, 100vw" />
              <figcaption className="mt-3 text-xs text-stone/80">
                The Divine, flanked by the Vintage Noir collection
              </figcaption>
            </figure>
            <figure>
              <Photo photo={boothPhotos.peacockWall} sizes="(min-width: 640px) 50vw, 100vw" />
              <figcaption className="mt-3 text-xs text-stone/80">
                Feathers of Color, in stained glass
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Works on the stand */}
        {pieces.length > 0 && (
          <section className="w-full bg-linen">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
              <div className="mb-12">
                <p className="eyebrow">On the stand</p>
                <h2 className="mt-3 max-w-[40ch] text-3xl text-balance text-ink">
                  Pieces you can see at {market.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {pieces.map((artwork) => (
                  <ArtworkCard key={artwork.slug} artwork={artwork} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Can't make it */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
          <h2 className="max-w-[28ch] text-3xl leading-tight text-balance text-ink sm:text-4xl">
            Can't make it to High Point?
          </h2>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-pretty text-stone">
            Every piece on the stand is also on the website, with dimensions and materials. Write to
            us about a piece, a trade order or a commission and we'll reply directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-xs bg-clay px-6 py-2.5 text-sm text-paper ring-1 ring-clay/20 transition-colors hover:bg-clay/90"
            >
              Get in touch
            </Link>
            <Link to="/works" className="text-sm text-stone transition-colors hover:text-ink">
              Browse all works
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
