// InteractiveOCROverlay.jsx
import React, { useEffect, useRef, useState } from "react";

export default function InteractiveOCROverlay({ imageSrc, words }) {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [selectedWords, setSelectedWords] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        const { width, height } = imageRef.current.getBoundingClientRect();
        setImageSize({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageSrc]);

  const handleWordClick = (word) => {
    console.log(word)
    setSelectedWords((prev) => {
      const exists = prev.find((w) => w.text === word.text && w.bbox.x0 === word.bbox.x0);
      if (exists) {
        return prev.filter((w) => w !== exists);
      } else {
        return [...prev, word];
      }
    });
  };

  const scaleBox = (bbox, originalSize) => {
    const scaleX = imageSize.width / originalSize.width;
    const scaleY = imageSize.height / originalSize.height;
    return {
      left: (bbox.x0 - 5) * scaleX,
      top: (bbox.y0 - 3) * scaleY,
      width: (bbox.x1 - bbox.x0 + 3) * scaleX,
      height: (bbox.y1 - bbox.y0 + 5) * scaleY,
    };
  };

  // Guess original size from first word (can be stored from OCR metadata instead)
  const originalSize = words.length > 0 ? {
    width: Math.max(...words.map(w => w.bbox.x1)),
    height: Math.max(...words.map(w => w.bbox.y1))
  } : { width: 1, height: 1 };

  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline-block" }}>
      <img
        src={imageSrc}
        ref={imageRef}
        alt="Analyzed"
        style={{ width: "100%", display: "block" }}
      />

      {words.map((word, i) => {
        const scaled = scaleBox(word.bbox, originalSize);
        const isSelected = selectedWords.includes(word);

        return (
          <div
            key={i}
            onClick={() => handleWordClick(word)}
            title={word.text}
            style={{
              position: "absolute",
              ...scaled,
              border: "none",
              borderColor: isSelected ? "#ADDC92" : "rgba(0, 123, 255, 0.5)",
              backgroundColor: isSelected ? "rgba(173, 220, 146, 0.2)" : "rgba(0, 123, 255, 0.1)",
              color: "transparent",
              cursor: "pointer",
              zIndex: 10,
              boxSizing: "border-box"
            }}
          >
            {word.text}
          </div>
        );
      })}
    </div>
  );
}
