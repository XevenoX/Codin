import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  projectSkills: { type: String, required: true },
  projectBudget: { type: Number, required: true },
  projectDeadline: { type: Date, required: true },
  projectDuration: { type: Number, required: true },
  projectPublisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectLabels: [String],
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chosenApplicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectStatus: { type: String, required: true }, // e.g., 'In Progress', 'Open', 'Awaiting Acceptance', 'Completed'
  projectPostTime: { type: Date, default: Date.now },
  projectCompleteTime: { type: Date }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
