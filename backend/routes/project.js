import express from 'express';
import Project from '../models/project.js';

const router = express.Router();

router.post('/createProject', async (req, res) => {
  try {
    const { projectName, projectDescription, projectSkills, projectBudget, projectDeadline, projectDuration, projectPublisher, projectLabels, applicants, chosenApplicant, projectStatus, projectPostTime, projectCompleteTime } = req.body;
    const project = new Project({ projectName, projectDescription, projectSkills, projectBudget, projectDeadline, projectDuration, projectPublisher, projectLabels, applicants, chosenApplicant, projectStatus, projectPostTime, projectCompleteTime });
    await project.save();
    res.status(201).json({ message: 'Project created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('projectPublisher').populate('applicants').populate('chosenApplicant');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
