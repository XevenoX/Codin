import express from 'express';
const router = express.Router();

// Example route handler
router.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

export default router;
