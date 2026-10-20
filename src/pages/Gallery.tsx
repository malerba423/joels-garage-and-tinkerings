import { Link, useSearchParams } from "react-router-dom";
import {
  allTags,
  availabilityFilters,
  cover,
  partNo,
  pieces,
  type Availability,
} from "../data/pieces";
import { StatusLegend, StatusMark } from "../components/Shop";

const headings: Partial<Record<Availability, string>> = {
  "for-sale": "Creations for Sale",
  available: "Available Creations",
  sold: "Sold Creations",
  "not-for-sale": "Not for Sale",
};

export default function Gallery() {
  const [params, setParams] = useSearchParams();
  const tag = params.get("tag");
  const availability =
    availabilityFilters.find((f) => f.id === params.get("status")) ??
    availabilityFilters[0];

  // Each filter's count respects the other filter, so the numbers always
  // match what you'd see if you clicked it.
  const byAvailability = pieces.filter(availability.test);
  const shown = byAvailability.filter((p) => !tag || p.tags.includes(tag));
  const countFor = (test: (typeof availabilityFilters)[number]["test"]) =>
    pieces.filter((p) => test(p) && (!tag || p.tags.includes(tag))).length;
  const keywordCount = (t: string) =>
    byAvailability.filter((p) => p.tags.includes(t)).length;

  const set = (next: { tag?: string | null; status?: string | null }) => {
    const merged = { tag, status: availability.id as string | null, ...next };
    const clean: Record<string, string> = {};
    if (merged.tag) clean.tag = merged.tag;
    if (merged.status && merged.status !== "all") clean.status = merged.status;
    setParams(clean);
  };

  return (
    <>
      <div className="index-head">
        <h1>{headings[availability.id] ?? "Catalog of Creations"}</h1>
        <StatusLegend />
      </div>

      <div className="filters">
        <div className="filter-row">
          <span className="mono-label" id="availability-label">
            AVAILABILITY
          </span>
          <div
            className="segmented"
            role="group"
            aria-labelledby="availability-label"
          >
            {availabilityFilters.map((f) => (
              <button
                key={f.id}
                className={availability.id === f.id ? "active" : ""}
                aria-pressed={availability.id === f.id}
                onClick={() => set({ status: f.id })}
              >
                {f.label} <span className="count">{countFor(f.test)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <span className="mono-label" id="keyword-label">
            KEYWORDS
          </span>
          <div className="tags" role="group" aria-labelledby="keyword-label">
            {allTags.map((t) => {
              const n = keywordCount(t);
              return (
                <button
                  key={t}
                  className={tag === t ? "tag active" : "tag"}
                  aria-pressed={tag === t}
                  disabled={n === 0 && tag !== t}
                  onClick={() => set({ tag: tag === t ? null : t })}
                >
                  {t} <span className="count">{n}</span>
                </button>
              );
            })}
            {tag && (
              <button className="clear" onClick={() => set({ tag: null })}>
                Clear keyword ×
              </button>
            )}
          </div>
        </div>

        <Link
          to={tag ? `/present?tag=${tag}` : "/present"}
          className="button ghost present-link"
        >
          Present {tag ?? "all"}
        </Link>
      </div>

      {shown.length === 0 ? (
        <p className="empty">Nothing on this shelf right now.</p>
      ) : (
        <div className="parts-grid">
          {shown.map((p) => (
            <Link key={p.slug} to={`/piece/${p.slug}`} className="part-card">
              <img src={cover(p).src} alt={p.title} loading="lazy" />
              {p.images.length > 1 && (
                <span className="photo-count">{p.images.length} sheets</span>
              )}
              <span className="part-card-bar">
                <span>
                  {partNo(p)} {p.title}
                </span>
                {p.sale && <StatusMark status={p.sale.status} />}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
