import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new mongoose.Schema(
  {
    project_name: { type: String, required: true },
    //general info
    project_publisher: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project_description: { type: String, required: false },
    project_skills: { type: String, required: false },
    //post time, application deadline, project duration
    project_posttime: { type: Date, required: true },
    project_deadline: { type: Date, required: true },
    project_duration: { type: Number, required: true },
    //budget
    project_budget: { type: Number, required: true },
    // project label: list, chosen from predefined labels stored on frontend
    project_labels: { type: [String], required: false },
    // candidates and the chosen developer
    applicants: [
      { type: mongoose.Types.ObjectId, ref: "User", required: false },
    ],
    chosen_applicants: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    //status: 1-open,2-awaiting acceptence,3-in progress,4-awaiting confirm,5-complete,6-failure
    project_status: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5, 6],
      default: 1,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
