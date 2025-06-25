// src/components/FormQRCode/components/FramedQRCode.tsx
import React, { useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { stripAndRebuildQRCode } from "../utils/svgShapeLoader";

interface FramedQRCodeProps {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  logoImage?: string;
  logoSize: number;
  shapeSvg?: string;
}

export const FramedQRCode = React.memo<FramedQRCodeProps>(
  ({ value, size, fgColor, bgColor, logoImage, logoSize, shapeSvg }) => {
    const [processedSVG, setProcessedSVG] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!value) {
        setIsLoading(false);
        return;
      }

      const processQRCode = async () => {
        try {
          if (!shapeSvg) {
            // Regular QR code without shape
            const qr = new QRCodeStyling({
              width: size,
              height: size,
              data: value,
              type: "svg",
              image: logoImage,
              imageOptions: {
                crossOrigin: "anonymous",
                margin: 4,
                imageSize: logoImage ? logoSize / size : 0,
              },
              dotsOptions: {
                color: fgColor,
                type: "square",
              },
              backgroundOptions: {
                color: bgColor,
              },
            });

            const qrBlob = await qr.getRawData("svg");
            if (qrBlob instanceof Blob) {
              const qrText = await qrBlob.text();
              setProcessedSVG(qrText);
            }
          } else {
            // QR code with shape
            await processShapeWithQR();
          }

          setIsLoading(false);
        } catch (error) {
          console.error("Error processing QR code:", error);
          setIsLoading(false);
        }
      };

      const processShapeWithQR = async () => {
        if (!shapeSvg) return;

        // Create QR Code
        const qr = new QRCodeStyling({
          width: 100,
          height: 100,
          data: value,
          type: "svg",
          image: logoImage,
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 1,
            imageSize: logoImage ? 0.15 : 0,
          },
          dotsOptions: {
            color: fgColor,
            type: "square",
          },
          backgroundOptions: {
            color: "transparent",
          },
        });

        const qrBlob = await qr.getRawData("svg");
        if (!(qrBlob instanceof Blob)) return;

        const qrText = await qrBlob.text();
        console.log("Original QR Text:", qrText);

        // Use the enhanced cleaning function
        const cleanedQRText = stripAndRebuildQRCode(qrText);
        console.log("Cleaned QR Text:", cleanedQRText);

        // Parse SVGs
        const parser = new DOMParser();
        const shapeDoc = parser.parseFromString(shapeSvg, "image/svg+xml");
        const qrDoc = parser.parseFromString(cleanedQRText, "image/svg+xml");

        // Find QR placeholder
        const qrObject = shapeDoc.querySelector("#qr");

        if (qrObject && qrDoc.querySelector("svg")) {
          // Extract QR content
          const qrSvgElement = qrDoc.querySelector("svg");
          const qrContent = qrSvgElement?.innerHTML || "";

          // Clear existing content and add cleaned QR content
          qrObject.innerHTML = qrContent;

          // Remove any existing transform attributes from the qr object
          qrObject.removeAttribute("transform");

          // Set a clean viewBox if needed
          const qrRect = qrObject.getBoundingClientRect?.();
          if (qrRect && (qrRect.width === 0 || qrRect.height === 0)) {
            qrObject.setAttribute("viewBox", "0 0 100 100");
          }
        } else {
          // Fallback: create new QR group in center
          const svgRoot = shapeDoc.querySelector("svg");
          if (svgRoot) {
            const qrSvgElement = qrDoc.querySelector("svg");
            const qrContent = qrSvgElement?.innerHTML || "";

            const qrGroup = shapeDoc.createElementNS(
              "http://www.w3.org/2000/svg",
              "g"
            );
            qrGroup.setAttribute("id", "qr");

            // Get SVG dimensions for proper centering
            const svgWidth = svgRoot.getAttribute("width") || "300";
            const svgHeight = svgRoot.getAttribute("height") || "300";
            const centerX = parseInt(svgWidth) / 2 - 150; // 50 is half of QR size
            const centerY = parseInt(svgHeight) / 2 - 150;

            qrGroup.setAttribute(
              "transform",
              `translate(${centerX}, ${centerY})`
            );
            qrGroup.innerHTML = qrContent;

            svgRoot.appendChild(qrGroup);
          }
        }

        // Serialize result
        const serializer = new XMLSerializer();
        const finalSVG = serializer.serializeToString(shapeDoc);
        console.log("Final SVG:", finalSVG);

        setProcessedSVG(finalSVG);
      };

      processQRCode();
    }, [shapeSvg, value, fgColor, bgColor, logoImage, logoSize, size]);

    if (isLoading) {
      return (
        <div
          className="flex items-center justify-center bg-gray-100 rounded-lg"
          style={{ width: size, height: size }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    return (
      <div
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: processedSVG }}
      />
    );
  }
);

FramedQRCode.displayName = "FramedQRCode";
export default FramedQRCode;
