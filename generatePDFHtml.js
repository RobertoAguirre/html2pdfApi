const puppeteer = require('puppeteer');

async function generatePDFHtml(html, path) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' }); // Ensures all resources are loaded
  await page.emulateMediaType('screen');
  await page.pdf({
    path: path, // Path to save the PDF
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
}

module.exports = generatePDFHtml;
