import { JSX } from "react";
import { Segment } from "./Segment";

const buildRune = (segments: JSX.Element[]) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 30px)",
        gridTemplateRows: "repeat(3, 30px)",
        position: "relative",
        width: "60px",
        height: "90px",
        boxSizing: "border-box",
      }}
    >
      {segments.map((segment, index) => (
        <div
          key={index}
          style={{
            width: "2px",
            height: "30px",
            position: "relative",
            left: index % 2 !== 0 ? "-1px" : "0",
          }}
        >
          {segment}
        </div>
      ))}
    </div>
  );
};

const overlapRunes = (...runes: JSX.Element[]) => {
  return (
    <div style={{ position: "relative", width: "60px", height: "90px" }}>
      {runes.map((rune, i) => (
        <div key={i} style={{ position: "absolute", top: 0, left: 0 }}>
          {rune}
        </div>
      ))}
    </div>
  );
};

const transformRune = (rune: JSX.Element, transform: string) => {
  return <div style={{ transform }}>{rune}</div>;
};

const getRunesObject = (): Record<string, JSX.Element> => {
  const runesObject: Record<string, JSX.Element> = {};

  const rune1 = buildRune([
    Segment.verticalRight,
    Segment.horizontalTop,
    Segment.verticalRight,
    Segment.placeholder,
    Segment.verticalRight,
    Segment.placeholder,
  ]);

  runesObject["rune1"] = rune1;

  const rune2 = buildRune([
    Segment.verticalRight,
    Segment.horizontalBot,
    Segment.verticalRight,
    Segment.placeholder,
    Segment.verticalRight,
    Segment.placeholder,
  ]);

  runesObject["rune2"] = rune2;

  const rune3 = buildRune([
    Segment.verticalRight,
    Segment.diagonalDown,
    Segment.verticalRight,
    Segment.placeholder,
    Segment.verticalRight,
    Segment.placeholder,
  ]);

  runesObject["rune3"] = rune3;

  const rune4 = buildRune([
    Segment.verticalRight,
    Segment.placeholder,
    Segment.verticalRight,
    Segment.diagonalUp,
    Segment.verticalRight,
    Segment.placeholder,
  ]);

  runesObject["rune4"] = rune4;

  const rune5 = overlapRunes(rune1, rune4);
  runesObject["rune5"] = rune5;

  const rune6 = buildRune([
    Segment.verticalRight,
    Segment.verticalRight,
    Segment.verticalRight,
    Segment.placeholder,
    Segment.verticalRight,
    Segment.placeholder,
  ]);

  runesObject["rune6"] = rune6;

  const rune7 = overlapRunes(rune1, rune6);
  runesObject["rune7"] = rune7;

  const rune8 = overlapRunes(rune2, rune6);
  runesObject["rune8"] = rune8;

  const rune9 = overlapRunes(rune2, rune7);
  runesObject["rune9"] = rune9;

  for (let i = 1; i < 10; i++) {
    runesObject[`rune${i}0`] = transformRune(
      runesObject[`rune${i}`],
      "scaleX(-1)"
    );
    runesObject[`rune${i}00`] = transformRune(
      runesObject[`rune${i}`],
      "scaleY(-1)"
    );
    runesObject[`rune${i}000`] = transformRune(
      runesObject[`rune${i}`],
      "rotate(180deg)"
    );
  }

  return runesObject;
};

export const decomposeNumber = (num: number) => {
  if (!num || num <= 0) return [];
  const parts = [];
  const levels = [1000, 100, 10, 1];

  for (const level of levels) {
    const digit = Math.floor(num / level);
    if (digit > 0) {
      parts.push(digit * level);
    }
    num %= level;
  }

  return parts;
};

export const getRuneFromNumber = (parts: number[]) => {
  const runesObject = getRunesObject();
  return overlapRunes(...parts.map((part) => runesObject[`rune${part}`]));
};
