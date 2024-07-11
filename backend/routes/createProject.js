import express from 'express';
const router = express.Router();

// Example route handler
router.post('/', (req, res) => {
  // Your project creation logic here
  res.send('Project created');
});

export default router;
