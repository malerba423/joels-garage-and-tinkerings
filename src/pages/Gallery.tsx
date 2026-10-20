import { Fragment, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  allTags,
  availabilityFilters,
  cover,
  partNo,
  pieces,
  type Availability,
} from "../data/pieces";
import { search, searchTerms } from "../data/search";
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
  const q = params.get("q") ?? "";
  const navigate = useNavigate();
  const [draft, setDraft] = useState(q);
  // Keep the box in sync when the URL changes some other way (back button, nav links)
  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setDraft(q);
  }
  const availability =
    availabilityFilters.find((f) => f.id === params.get("status")) ??
    availabilityFilters[0];

  // Search first, then the two filters. Counts on each filter respect
  // everything else that's set, so they match what clicking would show.
  const results = search(pieces, q);
  const terms = searchTerms(q);
  const searched = results.map((r) => r.piece);
  const byAvailability = searched.filter(availability.test);
  const shown = results.filter(
    (r) => availability.test(r.piece) && (!tag || r.piece.tags.includes(tag)),
  );
  const countFor = (test: (typeof availabilityFilters)[number]["test"]) =>
    searched.filter((p) => test(p) && (!tag || p.tags.includes(tag))).length;
  const keywordCount = (t: string) =>
    byAvailability.filter((p) => p.tags.includes(t)).length;

  // URL for the current view with some filters changed. Keywords are plain links built from this.
  const urlWith = (next: { tag?: string | null; status?: string | null; q?: string | null }) => {
    const merged = { tag, status: availability.id as string | null, q, ...next };
    const out = new URLSearchParams();
    if (merged.status && merged.status !== "all") out.set("status", merged.status);
    if (merged.tag) out.set("tag", merged.tag);
    if (merged.q?.trim()) out.set("q", merged.q.trim());
    const s = out.toString();
    return s ? `/?${s}` : "/";
  };

  const onSearch = (value: string) => {
    setDraft(value);
    const next = new URLSearchParams(params);
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    setParams(next, { replace: true }); // typing shouldn't fill up browser history
  };

  return (
    <>
      <div className="index-head">
        <h1>{headings[availability.id] ?? "Catalog of Creations"}</h1>
        <StatusLegend />
      </div>

      <div className="filters">
        <form
          className="filter-row"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="mono-label" htmlFor="catalog-search">
            SEARCH
          </label>
          <div className="search-box">
            <input
              id="catalog-search"
              type="search"
              value={draft}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Try “copper lamp”, “steel”, “2025” or “014”"
              autoComplete="off"
            />
            {draft && (
              <button type="button" className="clear" onClick={() => onSearch("")}>
                Clear ×
              </button>
            )}
          </div>
        </form>

        <div className="filter-row">
          <span className="mono-label" id="availability-label">
            AVAILABILITY
          </span>
          <div className="segmented" role="group" aria-labelledby="availability-label">
            {availabilityFilters.map((f) => (
              <button
                key={f.id}
                className={availability.id === f.id ? "active" : ""}
                aria-pressed={availability.id === f.id}
                onClick={() => navigate(urlWith({ status: f.id }))}
              >
                {f.label} <span className="count">{countFor(f.test)}</span>
              </button>
            ))}
          </div>
        </div>

        <nav className="filter-row" aria-labelledby="keyword-label">
          <span className="mono-label" id="keyword-label">
            KEYWORDS
          </span>
          <div className="keywords">
            {allTags.map((t) => {
              const n = keywordCount(t);
              const active = tag === t;
              if (n === 0 && !active)
                return (
                  <span key={t} className="keyword empty-keyword" aria-disabled="true">
                    {t}
                  </span>
                );
              return (
                <Link
                  key={t}
                  to={urlWith({ tag: active ? null : t })}
                  className={active ? "keyword active" : "keyword"}
                  aria-current={active ? "true" : undefined}
                >
                  {t}
                  <span className="count">{n}</span>
                  {active && <span className="visually-hidden"> (click to remove)</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        <Link
          to={tag ? `/present?tag=${tag}` : "/present"}
          className="button ghost present-link"
        >
          Present {tag ?? "all"}
        </Link>
      </div>

      {(terms.length > 0 || tag) && (
        <p className="result-line" aria-live="polite">
          {shown.length} {shown.length === 1 ? "creation" : "creations"}
          {terms.length > 0 && <> matching “{q.trim()}”</>}
          {tag && <> tagged “{tag}”</>}
          {" · "}
          <Link to={urlWith({ tag: null, q: null })}>
            reset
          </Link>
        </p>
      )}

      {shown.length === 0 ? (
        <p className="empty">Nothing on this shelf matches that.</p>
      ) : (
        <div className="parts-grid">
          {shown.map((r) => (
            <Fragment key={r.piece.slug}>
              <Link to={`/piece/${r.piece.slug}`} className="part-card">
                <img src={cover(r.piece).src} alt={r.piece.title} loading="lazy" />
                {r.piece.images.length > 1 && (
                  <span className="photo-count">{r.piece.images.length} sheets</span>
                )}
                <span className="part-card-bar">
                  <span>
                    {partNo(r.piece)} {r.piece.title}
                  </span>
                  {r.piece.sale && <StatusMark status={r.piece.sale.status} />}
                </span>
              </Link>
            </Fragment>
          ))}
        </div>
      )}
    </>
  );

}
