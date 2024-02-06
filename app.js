const express = require('express');
const fs = require('fs');
const generatePDFHtml = require('./generatePDFHtml');

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to generate PDF from HTML content
app.post('/generate-invoice', async (req, res) => {
  const htmlContent = req.body.html; // Assuming the HTML is sent in the request body
  const fileName = 'invoice.pdf';
  const filePath = `./${fileName}`;

  try {
    await generatePDFHtml(htmlContent, filePath);
    res.download(filePath, fileName, (err) => {
      if (err) {
        // Handle error
        console.error(err);
        res.status(500).send('Error generating PDF');
      } else {
        // Cleanup: Delete the PDF file after sending it to the client
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting PDF file', err);
        });
      }
    });
  } catch (error) {
    console.error('Error generating PDF', error);
    res.status(500).send('Error generating PDF');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
