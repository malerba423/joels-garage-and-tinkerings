import { partNo, statusLabel, type Piece } from "./pieces";

// Free-text catalog search.
//   - Case, accents and punctuation are ignored ("Tin-Robot" finds "tin robot").
//   - Each word you type is matched as a partial word in a piece's title,
//     medium, size, notes, tags, year, part number or sale status, so
//     "cop lam" finds "Copper Coil Lamp". Short words (1–3 letters) must match
//     the start of a word, so "tin" finds "Tin Robot" but not "painting";
//     longer ones can match anywhere ("ainting" still finds "painting").
//   - A piece only needs to match ONE of your words to show up, but pieces
//     that match MORE of them (and match in the title) are listed first.

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const searchTerms = (query: string) =>
  [...new Set(normalize(query).split(" ").filter(Boolean))];

function haystack(p: Piece) {
  const rest = [
    p.medium,
    p.size,
    p.notes,
    p.parts,
    p.year,
    p.tags.join(" "),
    p.images.map((i) => i.caption).join(" "),
    p.sale && statusLabel[p.sale.status],
    p.sale?.status === "sold" && "red dot",
  ];
  return {
    title: normalize(p.title),
    // the part number both padded and bare, so "14", "014" and "no 14" all work
    rest: normalize([partNo(p), Number(partNo(p)), ...rest].filter(Boolean).join(" ")),
  };
}

const startsWord = (text: string, t: string) => ` ${text}`.includes(` ${t}`);
const matches = (text: string, t: string) =>
  startsWord(text, t) || (t.length >= 4 && text.includes(t));

export type SearchResult = { piece: Piece; matched: number; score: number };

/** Pieces matching at least one term, best matches first. Empty query = everything, order kept. */
export function search(pieces: Piece[], query: string): SearchResult[] {
  const terms = searchTerms(query);
  if (terms.length === 0)
    return pieces.map((piece) => ({ piece, matched: 0, score: 0 }));

  return pieces
    .map((piece, order) => {
      const h = haystack(piece);
      let matched = 0;
      let score = 0;
      for (const t of terms) {
        const inTitle = matches(h.title, t);
        if (!inTitle && !matches(h.rest, t)) continue;
        matched++;
        score += inTitle ? 3 : 1;
        // word-start hits rank above mid-word hits ("lamp" > "clamp")
        if (startsWord(h.title, t) || startsWord(h.rest, t)) score += 1;
      }
      return { piece, matched, score: matched * 100 + score - order / 1000 };
    })
    .filter((r) => r.matched > 0)
    .sort((a, b) => b.score - a.score);
}
