// generate-shaped-qr.js
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');
const sharp = require('sharp');

/**
 * @param {string} data       الـ URL أو النص الذي تريد توليد QR له
 * @param {string} maskPath   مسار صورة الـ mask (معبأة داخلياً بالأبيض)
 * @param {string} borderPath مسار صورة الحدود (شفافة الوسط، سوداء الاطار)
 * @param {number} size       مقاس الناتج النهائي (px)
 * @param {string} outPath    أين تحفظ الصورة الناتجة
 */
async function generateShapedQR({ data, maskPath, borderPath, size, outPath }) {
  // 1) توليد Buffer للـ QR (بدون هوامش)
  const qrBuffer = await QRCode.toBuffer(data, {
    type: 'png',
    width: size,
    margin: 0,
    color: { dark: '#000000', light: '#FFFFFF' },
  });

  // 2) قراءة الـ mask وتغيير مقاسه
  const maskBuf = await sharp(maskPath)
    .resize(size, size)
    .ensureAlpha()
    .toBuffer();

  // 3) قص الـ QR داخل الـ mask (blend: dest-in)
  const qrMaskedBuf = await sharp(qrBuffer)
    .composite([{ input: maskBuf, blend: 'dest-in' }])
    .toBuffer();

  // 4) قراءة الـ border ورفعه على نفس المقاس
  const borderBuf = await sharp(borderPath)
    .resize(size, size)
    .png()
    .toBuffer();

  // 5) تركيب الـ border فوق الـ QR المقطوع
  await sharp(qrMaskedBuf)
    .composite([{ input: borderBuf, blend: 'over' }])
    .png()
    .toFile(outPath);

  console.log(`✅ Saved: ${outPath}`);
}

(async () => {
  // أنشئ مجلداً outputs/ في مشروعك قبل التشغيل
  fs.mkdirSync('outputs', { recursive: true });

  // مثال للسداسي
  await generateShapedQR({
    data: 'https://your-link.com',
    maskPath: path.join(__dirname, 'shapes/hexagon-mask.png'),
    borderPath: path.join(__dirname, 'shapes/hexagon-border.png'),
    size: 800,
    outPath: 'outputs/hexagon-qr.png',
  });

  // مثال للقلب
  await generateShapedQR({
    data: 'https://your-link.com',
    maskPath: path.join(__dirname, 'shapes/heart-mask.png'),
    borderPath: path.join(__dirname, 'shapes/heart-border.png'),
    size: 800,
    outPath: 'outputs/heart-qr.png',
  });

  // يمكنك إضافة أي شكل بنفس المعطيات
})();
