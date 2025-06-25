// src/components/FormQRCode/utils/svgShapeLoader.ts

export interface SVGShapeFile {
  id: string;
  name: string;
  category: string;
  icon: string;
  path: string; // ✅ renamed from filePath to path for consistency
}

export const svgShapeFiles: SVGShapeFile[] = [
  {
    id: "fish",
    name: "Fish",
    category: "animals",
    icon: "🐟",
    path: "/assets/qr-shapes/fish.svg",
  },
  {
    id: "airplane",
    name: "Airplane",
    category: "transport",
    icon: "✈️",
    path: "/assets/qr-shapes/airplane.svg",
  },
  {
    id: "dress",
    name: "Dress",
    category: "fashion",
    icon: "👗",
    path: "/assets/qr-shapes/dress.svg",
  },
  {
    id: "egg",
    name: "Egg",
    category: "food",
    icon: "🥚",
    path: "/assets/qr-shapes/egg.svg",
  },
  {
    id: "heart",
    name: "Heart",
    category: "love",
    icon: "❤️",
    path: "/assets/qr-shapes/heart.svg",
  },
  {
    id: "star",
    name: "Star",
    category: "shapes",
    icon: "⭐",
    path: "/assets/qr-shapes/star.svg",
  },
];

// دالة لتحميل محتوى الـ SVG
export const loadSVGContent = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load SVG: ${response.status}`);
    }
    const svgContent = await response.text();

    // التأكد من أن الـ SVG يحتوي على object اسمه "qr"
    if (!svgContent.includes('id="qr"')) {
      console.warn(`SVG at ${path} doesn't contain an element with id="qr"`);
    }

    return svgContent;
  } catch (error) {
    console.error("Error loading SVG:", error);
    // إرجاع SVG بسيط مع qr object كـ fallback
    return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="300" height="300" fill="white" stroke="black" stroke-width="4"/>
      <rect id="qr" x="150" y="150" width="100" height="100" fill="red" opacity="0.3"/>
    </svg>`;
  }
};

// دالة لاستخراج الـ path من الـ SVG
export const extractSVGPath = (
  svgContent: string
): { path: string; viewBox: string; background?: string } => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, "image/svg+xml");
  const svgElement = doc.querySelector("svg");
  const pathElement = doc.querySelector("path");

  const viewBox = svgElement?.getAttribute("viewBox") || "0 0 512 512";
  const path = pathElement?.getAttribute("d") || "";

  // استخرج الخلفية أو بقية عناصر الـ SVG لو احتجت
  const background = svgElement?.innerHTML || "";

  return { path, viewBox, background };
};

// Add this new function to svgShapeLoader.ts
// Add this to your svgShapeLoader.ts
export const stripAndRebuildQRCode = (svgContent: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, "image/svg+xml");

  // Get the original SVG dimensions
  const originalSvg = doc.querySelector("svg");
  if (!originalSvg) return svgContent;

  const width = originalSvg.getAttribute("width") || "100";
  const height = originalSvg.getAttribute("height") || "100";
  const viewBox =
    originalSvg.getAttribute("viewBox") || `0 0 ${width} ${height}`;

  // Extract rectangles from clipPath definitions
  const clipPaths = doc.querySelectorAll("clipPath");
  const rectData: Array<{
    x: string;
    y: string;
    width: string;
    height: string;
  }> = [];

  clipPaths.forEach((clipPath) => {
    const rects = clipPath.querySelectorAll("rect");
    rects.forEach((rect) => {
      // Skip background rectangles (usually the first large one)
      const rectWidth = parseInt(rect.getAttribute("width") || "0");
      const rectHeight = parseInt(rect.getAttribute("height") || "0");

      // Only include small rectangles (QR dots), skip large background rectangles
      if (rectWidth <= 10 && rectHeight <= 10) {
        rectData.push({
          x: rect.getAttribute("x") || "0",
          y: rect.getAttribute("y") || "0",
          width: rect.getAttribute("width") || "3",
          height: rect.getAttribute("height") || "3",
        });
      }
    });
  });

  // If no small rectangles found, try to extract from the main content
  if (rectData.length === 0) {
    const mainRects = doc.querySelectorAll("rect");
    mainRects.forEach((rect) => {
      const rectWidth = parseInt(rect.getAttribute("width") || "0");
      const rectHeight = parseInt(rect.getAttribute("height") || "0");

      if (rectWidth <= 10 && rectHeight <= 10) {
        rectData.push({
          x: rect.getAttribute("x") || "0",
          y: rect.getAttribute("y") || "0",
          width: rect.getAttribute("width") || "3",
          height: rect.getAttribute("height") || "3",
        });
      }
    });
  }

  // Get the fill color from the original SVG
  const fillColorElement = doc.querySelector(
    'rect[fill]:not([fill="transparent"])'
  );
  const fillColor = fillColorElement?.getAttribute("fill") || "#000000";

  // Create a clean SVG with direct rectangles
  const cleanSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}">
      ${rectData
        .map(
          (rect) =>
            `<rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" fill="${fillColor}"/>`
        )
        .join("")}
    </svg>
  `;

  return cleanSvg;
};
