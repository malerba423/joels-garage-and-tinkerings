import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { cover, partNo, pieces } from "../data/pieces";
import { mailto } from "../data/shop";

const heights = ["Sitting", "Standing", "Bar height", "Not a table"];
const woods = [
  {
    id: "rack",
    label: "From the rack",
    detail: "Reclaimed, whatever Joel has. Every board is different.",
  },
  {
    id: "yours",
    label: "Bring your own",
    detail: "A barn board, an old door, a slab with a story.",
  },
  { id: "unsure", label: "Not sure yet", detail: "Talk it through first." },
];

// A static site has nowhere to post a form, so a work order goes out as an email.
export default function WorkOrder() {
  const [params] = useSearchParams();
  const base = pieces.find((p) => p.slug === params.get("from"));
  const buildable = pieces.filter(
    (p) => p.sale?.status === "commission" || p.sale?.status === "sold",
  );
  const [from, setFrom] = useState(base?.slug ?? buildable[0]?.slug ?? "");
  const [height, setHeight] = useState("");
  const [wood, setWood] = useState("rack");
  const picked = pieces.find((p) => p.slug === from);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ref = picked ? `${partNo(picked)} ${picked.title}` : "something new";
    const body = [
      `Based on: ${ref}`,
      `Height: ${height || "-"}`,
      `Wood: ${woods.find((w) => w.id === wood)?.label}`,
      `Rough size: ${f.get("size") || "-"}`,
      "",
      String(f.get("notes") || ""),
      "",
      `Reply to: ${f.get("email")}`,
    ].join("\n");
    window.location.href = mailto(`Work order: ${ref}`, body);
  };

  return (
    <div className="work-order">
      <div className="work-order-media">
        {picked ? (
          <figure className="sheet">
            <img src={cover(picked).src} alt={picked.title} />
            <figcaption>
              <span>REF. PART NO. {partNo(picked)}</span>
              <span>{picked.title.toUpperCase()}</span>
            </figcaption>
          </figure>
        ) : (
          <div className="sheet sheet-blank">New part, no drawing yet</div>
        )}
        <p className="mono-note">
          Nothing to pay until you've both agreed on the drawing. A deposit
          holds your spot on the bench.
        </p>
      </div>

      <form className="work-order-form" onSubmit={submit}>
        <div className="detail-heading">
          <span className="mono-label">WORK ORDER</span>
          <h1>Make me one like this</h1>
        </div>

        <label className="field">
          <span className="mono-label">BASED ON</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">Something new</option>
            {pieces.map((p) => (
              <option key={p.slug} value={p.slug}>
                {partNo(p)} {p.title}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="field">
          <legend className="mono-label">HEIGHT</legend>
          <div className="chips">
            {heights.map((h) => (
              <button
                type="button"
                key={h}
                className={height === h ? "tag active" : "tag"}
                aria-pressed={height === h}
                onClick={() => setHeight(h)}
              >
                {h}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="field">
          <legend className="mono-label">MATERIAL</legend>
          <div className="choice-list">
            {woods.map((w) => (
              <label
                key={w.id}
                className={wood === w.id ? "choice active" : "choice"}
              >
                <input
                  type="radio"
                  name="wood"
                  value={w.id}
                  checked={wood === w.id}
                  onChange={() => setWood(w.id)}
                />
                <span>
                  <strong>{w.label}</strong>
                  <span>{w.detail}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field-row">
          <label className="field">
            <span className="mono-label">ROUGH SIZE</span>
            <input
              name="size"
              type="text"
              placeholder="e.g. fits a 7 ft wall"
            />
          </label>
          <label className="field">
            <span className="mono-label">YOUR EMAIL</span>
            <input
              name="email"
              type="email"
              required
              placeholder="malerba423@gmail.com"
            />
          </label>
        </div>

        <label className="field">
          <span className="mono-label">WHERE'S IT GOING, WHAT'S IT FOR?</span>
          <textarea
            name="notes"
            rows={4}
            placeholder="A photo of the room helps."
          />
        </label>

        <button type="submit" className="button block">
          Send work order →
        </button>
      </form>
    </div>
  );
}
