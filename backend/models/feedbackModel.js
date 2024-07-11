const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        rated_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rated_for: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        rated_date: { type: Date, required: true },
    },
    { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
