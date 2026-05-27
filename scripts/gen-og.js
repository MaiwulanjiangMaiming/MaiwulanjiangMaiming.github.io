const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

const grad = ctx.createLinearGradient(0, 0, W, H);
grad.addColorStop(0, '#090b0e');
grad.addColorStop(0.5, '#11141a');
grad.addColorStop(1, '#0a1628');
ctx.fillStyle = grad;
ctx.fillRect(0, 0, W, H);

ctx.strokeStyle = 'rgba(61,201,176,0.08)';
ctx.lineWidth = 1;
for (let i = 0; i < W; i += 40) {
  ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
}
for (let j = 0; j < H; j += 40) {
  ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke();
}

ctx.fillStyle = '#e2e8f0';
ctx.font = 'bold 64px sans-serif';
ctx.fillText('Maiwulanjiang Maiming', 80, 200);

ctx.fillStyle = '#3dc9b0';
ctx.font = '36px sans-serif';
ctx.fillText('Medical Imaging Researcher', 80, 270);

ctx.fillStyle = '#8892a4';
ctx.font = '28px sans-serif';
const lines = [
  'MRI Reconstruction · Quantitative Mapping',
  'Clinical AI · Deep Learning for Imaging'
];
lines.forEach((line, i) => {
  ctx.fillText(line, 80, 350 + i * 45);
});

ctx.fillStyle = '#5b9cf5';
ctx.font = '24px sans-serif';
ctx.fillText('mawlan.me', 80, 530);

const outDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'og-image.png');
fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log('Generated:', outPath);
