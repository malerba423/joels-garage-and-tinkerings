import { Link } from "react-router-dom";
import { pieces } from "../data/pieces";
import { mailto } from "../data/shop";

/** Sec. 00: the note at the top of the catalog. Counts come from the catalog, so they stay current. */
export default function Foreword() {
  const available = pieces.filter((p) => p.sale?.status === "available").length;
  return (
    <section className="foreword" aria-labelledby="foreword-title">
      <div className="foreword-strip">
        <span>Sec. 00 · Foreword</span>
      </div>
      <div className="foreword-body">
        <div className="foreword-side">
          <h2 id="foreword-title">A note before you browse</h2>
          <dl className="foreword-spec">
            <dt>Catalogued</dt>
            <dd>{pieces.length} entries</dd>
            <dt>Available</dt>
            <dd>
              <span className="dot dot-available" aria-hidden="true" />
              {available} {available === 1 ? "piece" : "pieces"}
            </dd>
            <dt>Questions</dt>
            <dd>Always welcome</dd>
          </dl>
        </div>
        <div className="foreword-text">
          <p>
            I built this little portfolio partly to show off some of the pieces
            I've made over the years, and partly just to catalog my work, so
            most of my efforts live in one place that's easy to share with
            friends, family, and colleagues.
          </p>
          <p>
            Most items aren't for sale, and some of the “items” are really jobs
            I wanted to document more than objects — the tile floor or the
            kitchen pantry, for instance.
          </p>
          <p>
            A few pieces are available, though (look for the green dot). Feel
            free to reach out if something catches your eye, or if you're just
            curious and have questions about any of these projects, jobs, or
            builds.
          </p>
          <div className="foreword-sign">
            <span className="signature">Cheers! — Joel</span>
            <span className="foreword-actions">
              <Link to="/?status=available" className="button ghost">
                See what's available
              </Link>
              <a href={mailto("Question about your work")} className="button">
                Ask about a piece
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
