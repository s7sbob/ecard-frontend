#!/usr/bin/env node

/**
 * Script: generateMasks.js
 * -----------------------------------
 * يحول ملفات SVG الخاصة بالإطارات (border-only SVG) إلى ماسك أبيض:
 * 1) يبحث بشكلٍ تكراري في مجلد الإدخال عن كل ملفات SVG.
 * 2) يزيل خواص stroke و fill القديمة.
 * 3) يضيف fill="white" في عنصر <svg>.
 * 4) يحفظ الـ SVG المعدّل في masks/svg/.
 * 5) يحول الـ SVG إلى PNG في masks/png/.
 *
 * Usage:
 *   node src/scripts/generateMasks.js [inputFolder]
 *
 *   - inputFolder (اختياري): مسار مجلّد border-only SVGs نسبيًا من جذر المشروع.
 *       الافتراض: "borders/svg".
 *   - يبحث بشكلٍ تكراري (*.svg) داخل هذا المجلّد.
 *
 * Examples:
 *   node src/scripts/generateMasks.js
 *   node src/scripts/generateMasks.js src/components/FormQRCode/shapes
 */

const fs = require('fs-extra');
const path = require('path');
const { sync: globSync } = require('glob');
const sharp = require('sharp');

// جذر المشروع
const projectRoot = process.cwd();
// مسار مجلّد border-only SVGs (اختياري)
const inputDir = process.argv[2]
  ? path.join(projectRoot, process.argv[2])
  : path.join(projectRoot, 'borders/svg');

// مجلّدات الإخراج
const masksSvgDir = path.join(projectRoot, 'masks/svg');
const masksPngDir = path.join(projectRoot, 'masks/png');

console.log(`🔍 Scanning input directory: ${inputDir}`);
// تحقق من وجود مجلّد الإدخال
if (!fs.existsSync(inputDir)) {
  console.error(`❌ Input folder not found: ${inputDir}`);
  process.exit(1);
}

// أنشئ مجلّدات الإخراج إن لم تكن موجودة
fs.ensureDirSync(masksSvgDir);
fs.ensureDirSync(masksPngDir);

// Normalize Windows backslashes to forward slashes for glob
const normalizedInput = inputDir.replace(/\\/g, '/');
const pattern = `${normalizedInput}/**/*.svg`;

// ابحث بشكلٍ تكراري عن كل ملفات SVG داخل inputDir
const svgFiles = globSync(pattern, { absolute: true });
console.log(`Found ${svgFiles.length} SVG file(s) to process.`);
if (!svgFiles.length) {
  console.warn('⚠ No SVG files found. تأكد من المسار وامتداد الملفات.');
  process.exit(0);
}

(async () => {
  for (const fullPath of svgFiles) {
    const fileName = path.basename(fullPath);
    try {
      const content = await fs.readFile(fullPath, 'utf-8');
      // إزالة stroke و fill القديمة وإضافة fill أبيض
      const maskSvg = content
        .replace(/stroke="[^"]*"/g, '')
        .replace(/stroke-width="[^"]*"/g, '')
        .replace(/fill="[^"]*"/g, '')
        .replace(/<svg([^>]+)>/, '<svg$1 fill="white">');

      // حفظ الـ SVG المعدّل
      const outSvg = path.join(masksSvgDir, fileName);
      await fs.writeFile(outSvg, maskSvg, 'utf-8');

      // تحويل SVG إلى PNG
      const outPng = path.join(
        masksPngDir,
        fileName.replace(/\.svg$/i, '.png')
      );
      await sharp(Buffer.from(maskSvg))
        .png()
        .toFile(outPng);

      console.log(`✔ Converted: ${fileName}`);
    } catch (err) {
      console.error(`✖ Error on ${fileName}:`, err.message);
    }
  }
  console.log('✅ All masks generated successfully.');
})();
