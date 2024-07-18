const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        message_to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        // 1 open -> awaiting acceptence: to developer, 'You received a new offer from {publisher_name}! Check it on the project management page and decide whether to accept it or not.'
        // 2 awaiting acceptence -> open: to publisher, '{developer_name} rejected the offer. Please choose another applicant.'
        // 3 awaiting acceptence -> in progress: to publisher, '{developer_name} accepted the offer. The project is now in progress!'
        // 4 in progress -> awaiting confirm: to publisher, '{developer_name} has finished the project. Please check and confirm the completion on the project management page. After confirmation, the project budget will be transferred to the developer.'
        // 5 awaiting confirm -> complete: to developer, '{publisher_name} confirmed the completion. You will receive the payment within 5 working days! Please contact us if there is any delay.'
        message_type: { type: Number, required: true },
        // 0 read, 1 unread
        unread: { type: Number, required: true },
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
