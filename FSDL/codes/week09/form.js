const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Configuration
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const TEMP_DIR = path.join(__dirname, 'temp_uploads');
const PORT = 8080;

// Ensure directories exist
[UPLOAD_DIR, TEMP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const server = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true);
  
  try {
    // Handle file upload
    if (reqUrl.pathname === '/fileupload' && req.method.toLowerCase() === 'post') {
      const form = new formidable.IncomingForm();
      form.uploadDir = TEMP_DIR;
      form.keepExtensions = true;
      form.maxFileSize = 200 * 1024 * 1024;

      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          err ? reject(err) : resolve([fields, files]);
        });
      });

      if (!files.filetoupload?.[0]) throw new Error('No file uploaded');
      
      const uploadedFile = files.filetoupload[0];
      const newPath = path.join(UPLOAD_DIR, uploadedFile.originalFilename);
      
      await fs.promises.rename(uploadedFile.filepath, newPath);
      res.writeHead(303, { 'Location': '/gallery' });
      return res.end();
    }

    // Display gallery of images
    if (reqUrl.pathname === '/gallery') {
      const files = fs.readdirSync(UPLOAD_DIR).filter(file => 
        ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase())
      );

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Image Gallery</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
            .image-card { border: 1px solid #ddd; padding: 10px; border-radius: 5px; }
            .image-card img { max-width: 100%; height: auto; display: block; }
            .upload-btn { display: block; margin: 20px auto; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; text-align: center; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1 style="text-align: center;">Image Gallery</h1>
          <a href="/" class="upload-btn">Upload New Image</a>
          <div class="gallery">
            ${files.map(file => `
              <div class="image-card">
                <img src="/images/${encodeURIComponent(file)}" alt="${file}">
                <p>${file}</p>
              </div>
            `).join('')}
          </div>
        </body>
        </html>
      `);
      return;
    }

    // Serve individual images
    if (reqUrl.pathname.startsWith('/images/')) {
      const filename = path.basename(reqUrl.pathname);
      const filePath = path.join(UPLOAD_DIR, filename);
      
      try {
        const data = fs.readFileSync(filePath);
        const ext = path.extname(filename).toLowerCase();
        const contentType = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif'
        }[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        return res.end(data);
      } catch {
        res.writeHead(404);
        return res.end('Image not found');
      }
    }

    // Display upload form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>File Upload</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          form { border: 2px dashed #ccc; padding: 20px; max-width: 500px; margin: 0 auto; }
          input[type="file"] { margin-bottom: 15px; }
          .view-gallery { display: block; margin-top: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <h1 style="text-align: center;">File Upload</h1>
        <form action="/fileupload" method="post" enctype="multipart/form-data">
          <input type="file" name="filetoupload" accept="image/*" required><br><br>
          <input type="submit" value="Upload">
        </form>
        <a href="/gallery" class="view-gallery">View Image Gallery</a>
      </body>
      </html>
    `);

  } catch (error) {
    console.error('Error:', error.message);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`
      <h1 style="color: red;">Error</h1>
      <p>${error.message}</p>
      <a href="/">Try again</a>
    `);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Upload directory: ${UPLOAD_DIR}`);
});