import express from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db/connection.js";

const router = express.Router();

// 获取与用户相关的所有项目
router.get('/all', async (req, res) => {
    const userId = req.query.userId;

    if (!ObjectId.isValid(userId)) {
        console.error('Invalid user ID format:', userId);
        return res.status(400).send('Invalid user ID format');
    }

    try {
        const db = getDB();
        const projects = await db.collection('projects').find({
            $or: [
                { project_publisher: new ObjectId(userId) },
                { applicants: new ObjectId(userId) },
                { chosen_applicants: new ObjectId(userId) }
            ]
        }).toArray();

        console.log('Projects found for user:', userId, projects);
        res.json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ message: err.message });
    }
});

// 更新项目状态
router.patch('/:id', async (req, res) => {
    const userId = req.body.userId;
    const projectId = req.params.id;
    const newStatus = req.body.project_status;

    if (!ObjectId.isValid(userId) || !ObjectId.isValid(projectId)) {
        console.error('Invalid ID format:', userId, projectId);
        return res.status(400).send('Invalid ID format');
    }

    try {
        const db = getDB();
        const result = await db.collection('projects').updateOne(
            { _id: new ObjectId(projectId), $or: [{ project_publisher: new ObjectId(userId) }, { 'applicants.applicantId': new ObjectId(userId) }] },
            { $set: { project_status: newStatus } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send('Project not found or user not authorized');
        }

        const updatedProject = await db.collection('projects').findOne({ _id: new ObjectId(projectId) });
        res.json(updatedProject);
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
