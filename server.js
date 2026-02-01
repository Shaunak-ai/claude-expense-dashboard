import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.ANTHROPIC_ADMIN_API_KEY;
const API_BASE_URL = 'https://api.anthropic.com/v1';

// Check if API key is configured
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    apiKeyConfigured: !!API_KEY
  });
});

// Proxy endpoint for organization info
app.get('/api/organizations', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/organizations`, {
      headers: {
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for usage data
app.get('/api/usage', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { start_date, end_date, group_by } = req.query;

  try {
    const url = new URL(`${API_BASE_URL}/usage`);
    if (start_date) url.searchParams.append('start_date', start_date);
    if (end_date) url.searchParams.append('end_date', end_date);
    if (group_by) url.searchParams.append('group_by', group_by);

    const response = await fetch(url.toString(), {
      headers: {
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching usage:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`API Key configured: ${!!API_KEY}`);
});
