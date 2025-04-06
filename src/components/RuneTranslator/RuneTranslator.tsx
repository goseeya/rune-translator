import { JSX, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { decomposeNumber, getRuneFromNumber } from "./utils";

export const RuneTranslator = () => {
  const [number, setNumber] = useState("");
  const [rune, setRune] = useState<JSX.Element | null>(null);
  const [svgDataUrl, setSvgDataUrl] = useState(null);
  const runeRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    const n = parseInt(number);
    if (isNaN(n) || n <= 0 || n > 9999)
      return alert("Enter number between 1 and 9999");
    const parts = decomposeNumber(n);
    const result = getRuneFromNumber(parts);
    setRune(result);

    setTimeout(() => {
      if (runeRef.current) {
        htmlToImage
          .toSvg(runeRef.current, { width: 60, height: 120 })
          .then((dataUrl: any) => {
            setSvgDataUrl(dataUrl);
          });
      }
    }, 100);
  };

  const handleDownloadPNG = () => {
    if (!runeRef.current) return;
    htmlToImage
      .toPng(runeRef.current, {
        width: 60,
        height: 120,
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `rune_${number}.png`;
        link.href = dataUrl;
        link.click();
      });
  };

  const handleDownloadSVG = () => {
    if (!svgDataUrl) return;
    const link = document.createElement("a");
    link.download = `rune_${number}.svg`;
    link.href = svgDataUrl;
    link.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Enter number</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter num (1-9999)"
      />
      <button onClick={handleGenerate}>Generate Rune</button>
      {rune && (
        <div>
          <div
            ref={runeRef}
            style={{
              display: "flex",
              color: "#a98de0",
              justifyContent: "center",
              marginTop: 20,
              width: "100%",
              height: "auto",
              overflow: "visible",
              boxSizing: "border-box",
            }}
          >
            {rune}
          </div>
          {svgDataUrl && (
            <div style={{ marginTop: 10 }}>
              <h4>SVG Preview:</h4>
              <img
                src={svgDataUrl}
                alt="Rune SVG Preview"
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          )}
          <button onClick={handleDownloadPNG} style={{ marginTop: 10 }}>
            Download as PNG
          </button>
          <button
            onClick={handleDownloadSVG}
            style={{ marginTop: 10, marginLeft: 10 }}
          >
            Download as SVG
          </button>
        </div>
      )}
    </div>
  );
};
