import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        // publisher
        publisher: { type: String, required: true },
        project_name: { type: String, required: true },
        description: { type: String, required: false },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        keyTechnologies: { type: String, required: false },
        contractAmount: { type: float, required: true },
        projectStatus: { type: String, required: true },
        // project label
        projectIndex: { type: projectLabel, required: true },
        // candidates
        applicants: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
        chosenCandidateId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
