// File: src/components/FormQRCode/utils/loadSvgPath.ts

export const loadSvgPath = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const svgText = await response.text();

  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
  const path = svgDoc.querySelector("path");

  return path?.getAttribute("d") || "";
};
