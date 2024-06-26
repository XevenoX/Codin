const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        ratedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        ratedFor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
