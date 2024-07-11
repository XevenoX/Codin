import express from 'express';
const router = express.Router();

// Example route handler
router.post('/', (req, res) => {
  // Your sign-up logic here
  res.send('User signed up');
});

export default router;
