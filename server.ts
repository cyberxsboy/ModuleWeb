/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'shares.json');

// Memory storage as fallback or cache
let sharesCache: Record<string, any> = {};

// Ensure DB directory and JSON file exist
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    sharesCache = JSON.parse(raw);
  } else {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2), 'utf-8');
  }
} catch (error) {
  console.warn('Failed to initialize file-based persistence, using memory-only database.');
}

// Enable JSON bodies (with high limit for Base64 attachments - GIFs/Videos etc.)
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ limit: '60mb', extended: true }));

// --- API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Save a sharing layout (Website configuration or Greeting Card)
app.post('/api/share', async (req, res) => {
  try {
    const { type, siteData, cardData } = req.body;
    
    if (!type || (type !== 'site' && type !== 'card')) {
      return res.status(400).json({ error: 'Invalid share type. Must be "site" or "card".' });
    }

    if (type === 'site' && !siteData) {
      return res.status(400).json({ error: 'Missing siteData content for site share.' });
    }

    if (type === 'card' && !cardData) {
      return res.status(400).json({ error: 'Missing cardData content for card share.' });
    }

    // Generate a secure shorter ID that looks beautiful
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();

    const newRecord = {
      id,
      type,
      siteData,
      cardData,
      createdAt: Date.now()
    };

    // Save to Cache
    sharesCache[id] = newRecord;

    // Persist to JSON asynchronously
    try {
      await fs.promises.writeFile(DATA_FILE, JSON.stringify(sharesCache, null, 2), 'utf-8');
    } catch (writeErr) {
      console.error('Failed to persist share database to disks:', writeErr);
    }

    res.json({ success: true, id, shareUrl: `/share/${id}` });
  } catch (error: any) {
    console.error('Error sharing content:', error);
    res.status(500).json({ error: error.message || 'Server error occurred during share generation.' });
  }
});

// Load a shared layout by unique code ID
app.get('/api/share/:id', (req, res) => {
  const { id } = req.params;
  const uppercaseId = id.toUpperCase();
  const record = sharesCache[uppercaseId];

  if (!record) {
    return res.status(404).json({ error: '找不到该页面或贺卡，链接可能已过期。' });
  }

  res.json({ success: true, ...record });
});

// --- INTEGRATED VITE & STATIC HANDLING ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running Express server in DEVELOPMENT mode...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    
    // Mount Vite dev server middleware
    app.use(vite.middlewares);
  } else {
    console.log('Running Express server in PRODUCTION mode...');
    const distPath = path.join(process.cwd(), 'dist');
    
    // Serve production built assets
    app.use(express.static(distPath));
    
    // SPA routing fallback: send index.html for all other routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started successfully. Binding to port ${PORT}`);
  });
}

startServer();
