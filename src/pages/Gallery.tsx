import { Link, useSearchParams } from "react-router-dom";
import {
  allTags,
  cover,
  filterByTag,
  partNo,
  type SaleStatus,
} from "../data/pieces";
import { StatusLegend, StatusMark } from "../components/Shop";

const statusFilters: { id: SaleStatus; label: string }[] = [
  { id: "available", label: "available" },
  { id: "commission", label: "can build another" },
  { id: "sold", label: "sold" },
];

export default function Gallery() {
  const [params, setParams] = useSearchParams();
  const tag = params.get("tag");
  const status = params.get("status") as SaleStatus | null;
  const shown = filterByTag(tag).filter(
    (p) => !status || p.sale?.status === status,
  );

  const set = (next: { tag?: string | null; status?: string | null }) => {
    const merged = { tag, status, ...next };
    const clean: Record<string, string> = {};
    if (merged.tag) clean.tag = merged.tag;
    if (merged.status) clean.status = merged.status;
    setParams(clean);
  };

  return (
    <>
      <div className="index-head">
        <h1>
          {status === "available"
            ? "Available Creations"
            : "Catalog of Creations"}
        </h1>
        <StatusLegend />
      </div>

      <div className="toolbar">
        <div className="tags" role="group" aria-label="Filter">
          <button
            className={!tag && !status ? "tag active" : "tag"}
            onClick={() => setParams({})}
          >
            all
          </button>
          {statusFilters.map((s) => (
            <button
              key={s.id}
              className={status === s.id ? "tag active" : "tag"}
              aria-pressed={status === s.id}
              onClick={() => set({ status: status === s.id ? null : s.id })}
            >
              {s.label}
            </button>
          ))}
          <span className="tags-divider" aria-hidden="true" />
          {allTags.map((t) => (
            <button
              key={t}
              className={tag === t ? "tag active" : "tag"}
              aria-pressed={tag === t}
              onClick={() => set({ tag: tag === t ? null : t })}
            >
              {t}
            </button>
          ))}
        </div>
        <Link
          to={tag ? `/present?tag=${tag}` : "/present"}
          className="button ghost"
        >
          Present {tag ?? "all"} ({shown.length})
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
