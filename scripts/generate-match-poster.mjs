/**
 * Match-day posters for Prosperity.
 * Type-only, same stationery as the opening-hours card.
 * Run: node scripts/generate-match-poster.mjs
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'downloads');

const SPOON = `<svg class="spoon" viewBox="0 0 40 10" aria-hidden="true"><path d="M33.5014 9.5C37.0847 9.5 39.9998 7.48129 39.9998 4.99995C39.9998 2.51861 37.0847 0.5 33.5014 0.5C30.112 0.5 27.3219 2.30637 27.0298 4.6018H22.3527V3.6552L-0.000213623 3.6552V6.34446L22.3528 6.34446V5.39798H27.0299C27.3221 7.69352 30.112 9.5 33.5014 9.5ZM21.4896 5.54839L0.863079 5.54839V4.45161H21.4896V5.54839ZM27.866 4.99995C27.866 2.95778 30.3942 1.2964 33.5015 1.2964C36.6088 1.2964 39.137 2.95778 39.137 4.99995C39.137 7.04222 36.6088 8.7037 33.5015 8.7037C30.3942 8.7037 27.866 7.04222 27.866 4.99995Z" fill="#C6A56A"/></svg>`;

function posterHtml({ width, height, layout }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
      background: #12110e;
    }
    .sheet {
      width: ${width}px;
      height: ${height}px;
      position: relative;
      background:
        radial-gradient(90% 55% at 50% 0%, rgba(214, 186, 120, 0.13), transparent 58%),
        #12110e;
      color: #e6d3aa;
      font-family: "Cormorant Garamond", Palatino, "Palatino Linotype", serif;
      -webkit-font-smoothing: antialiased;
    }
    .grain {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.16;
      mix-blend-mode: overlay;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='4'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    }
    .frame {
      position: absolute;
      inset: ${layout === 'portrait' ? '28px' : '26px'};
      border: 1px solid rgba(198, 165, 106, 0.72);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: ${layout === 'portrait' ? '56px 48px' : '40px 48px'};
    }
    .frame::before {
      content: "";
      position: absolute;
      inset: 7px;
      border: 1px solid rgba(198, 165, 106, 0.28);
      pointer-events: none;
    }
    .dot {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #c6a56a;
      z-index: 1;
    }
    .dot-tl { top: -2.5px; left: -2.5px; }
    .dot-tr { top: -2.5px; right: -2.5px; }
    .dot-bl { bottom: -2.5px; left: -2.5px; }
    .dot-br { bottom: -2.5px; right: -2.5px; }

    .brand {
      font-weight: 600;
      font-size: ${layout === 'portrait' ? '20px' : '18px'};
      letter-spacing: 0.46em;
      text-indent: 0.46em;
      text-transform: uppercase;
      color: #d4bc86;
      line-height: 1;
    }
    .brand-sub {
      margin-top: 9px;
      font-weight: 500;
      font-size: ${layout === 'portrait' ? '13px' : '12px'};
      letter-spacing: 0.34em;
      text-indent: 0.34em;
      text-transform: uppercase;
      color: #a89470;
      line-height: 1;
    }
    .date {
      margin-top: ${layout === 'portrait' ? '44px' : '30px'};
      font-weight: 600;
      font-size: ${layout === 'portrait' ? '18px' : '17px'};
      letter-spacing: 0.28em;
      text-indent: 0.28em;
      text-transform: uppercase;
      color: #f0e2c4;
    }
    .fixture {
      margin-top: ${layout === 'portrait' ? '18px' : '6px'};
      display: flex;
      align-items: ${layout === 'portrait' ? 'center' : 'baseline'};
      justify-content: center;
      gap: ${layout === 'portrait' ? '0' : '0.72em'};
      flex-direction: ${layout === 'portrait' ? 'column' : 'row'};
    }
    .team {
      font-weight: 500;
      font-size: ${layout === 'portrait' ? '96px' : '86px'};
      line-height: 0.9;
      letter-spacing: 0.01em;
      color: #e3cc96;
    }
    .vee {
      font-style: italic;
      font-weight: 500;
      font-size: ${layout === 'portrait' ? '34px' : '34px'};
      color: #b7a27a;
      line-height: 1;
      margin: ${layout === 'portrait' ? '8px 0 10px' : '0'};
    }
    .meta {
      margin-top: ${layout === 'portrait' ? '22px' : '12px'};
      font-weight: 500;
      font-size: ${layout === 'portrait' ? '22px' : '21px'};
      letter-spacing: 0.03em;
      color: #f4ead8;
    }
    .meta span {
      color: #b7a27a;
      padding: 0 0.35em;
    }
    .spoon {
      display: block;
      width: ${layout === 'portrait' ? '92px' : '84px'};
      height: auto;
      margin-top: ${layout === 'portrait' ? '34px' : '20px'};
    }
    .offer {
      margin-top: ${layout === 'portrait' ? '26px' : '14px'};
    }
    .offer-lead {
      font-weight: 500;
      font-size: ${layout === 'portrait' ? '50px' : '44px'};
      line-height: 1;
      color: #e3cc96;
    }
    .offer-free {
      margin-top: 8px;
      font-style: italic;
      font-weight: 500;
      font-size: ${layout === 'portrait' ? '40px' : '36px'};
      line-height: 1;
      color: #f6efe2;
    }
    .offer-with {
      margin-top: ${layout === 'portrait' ? '16px' : '12px'};
      font-weight: 500;
      font-size: ${layout === 'portrait' ? '20px' : '18px'};
      letter-spacing: 0.1em;
      text-indent: 0.1em;
      text-transform: uppercase;
      color: #c6b189;
      white-space: nowrap;
    }
    .foot {
      margin-top: ${layout === 'portrait' ? '40px' : '26px'};
    }
    .where {
      font-weight: 500;
      font-size: ${layout === 'portrait' ? '20px' : '18px'};
      letter-spacing: 0.03em;
      color: #f0e6d2;
    }
    .hours {
      margin-top: 4px;
      font-weight: 500;
      font-size: ${layout === 'portrait' ? '18px' : '16px'};
      letter-spacing: 0.08em;
      color: #b7a27a;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="grain"></div>
    <div class="frame">
      <span class="dot dot-tl"></span>
      <span class="dot dot-tr"></span>
      <span class="dot dot-bl"></span>
      <span class="dot dot-br"></span>
      <p class="brand">Prosperity</p>
      <p class="brand-sub">Ukrainian Restaurant</p>
      <p class="date">Sunday 8 November</p>
      <div class="fixture">
        <p class="team">England</p>
        <p class="vee">v</p>
        <p class="team">Australia</p>
      </div>
      <p class="meta">Kick-off 15:10<span>·</span>Allianz Stadium</p>
      ${SPOON}
      <div class="offer">
        <p class="offer-lead">A glass of Bosca</p>
        <p class="offer-free">on the house</p>
        <p class="offer-with">Sparkling wine with every main course</p>
      </div>
      <div class="foot">
        <p class="where">59 York Street, Twickenham</p>
        <p class="hours">Open 12:00–22:00</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function shoot(browser, { file, width, height, layout }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.setContent(posterHtml({ width, height, layout }), {
    waitUntil: 'networkidle0',
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  const family = await page.evaluate(() => getComputedStyle(document.querySelector('.team')).fontFamily);
  await page.screenshot({
    path: path.join(OUT_DIR, file),
    type: 'jpeg',
    quality: 90,
  });
  await page.close();
  return family;
}

const browser = await puppeteer.launch({ headless: true });
try {
  await mkdir(OUT_DIR, { recursive: true });
  const googleFont = await shoot(browser, {
    file: 'Prosperity-England-Australia-Google.jpg',
    width: 1152,
    height: 864,
    layout: 'landscape',
  });
  const popupFont = await shoot(browser, {
    file: 'Prosperity-England-Australia.jpg',
    width: 840,
    height: 1120,
    layout: 'portrait',
  });
  console.log('google font:', googleFont);
  console.log('popup font:', popupFont);
  console.log('wrote', OUT_DIR);
} finally {
  await browser.close();
}
