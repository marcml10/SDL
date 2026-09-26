import express from 'express';
import bcrypt  from 'bcrypt';
import pool    from '../db.js';
import { dbErrorMessage } from '../dbErrors.js';

const router = express.Router();

// ── Check username ──────────────────────────────────────────
router.get('/check-username', async (req, res) => {
  try {
    const username =
      typeof req.query.username === 'string' ? req.query.username.trim() : '';
    if (!username) {
      return res.status(400).json({ error: 'Username is required.' });
    }
    const [rows] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );
    res.json({ taken: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ error: dbErrorMessage(err) });
  }
});

// ── Check email ─────────────────────────────────────────────
router.get('/check-email', async (req, res) => {
  try {
    const email =
      typeof req.query.email === 'string' ? req.query.email.trim() : '';
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    const [rows] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    res.json({ taken: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ error: dbErrorMessage(err) });
  }
});

// ── Sign up ─────────────────────────────────────────────────
router.post('/signup', async (req, res) => {
  try {
    const username =
      typeof req.body.username === 'string' ? req.body.username.trim() : '';
    const email =
      typeof req.body.email === 'string' ? req.body.email.trim() : '';
    const password = req.body.password;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashed]
    );
    res.json({ success: true });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Username or email already exists.' });
    } else {
      res.status(500).json({ error: dbErrorMessage(err) });
    }
  }
});

// ── Sign in ─────────────────────────────────────────────────
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?', [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    res.json({ success: true, username: rows[0].username });
  } catch (err) {
    res.status(500).json({ error: dbErrorMessage(err) });
  }
});

export default router;

