import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();
import db from "../db/connection.js";

// test GET to fetch all projects
router.get('/', async (req, res) => {
    try {
        let collection = await db.collection("projects");
        const projects = await collection.find({}).toArray();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Internal server error');
    }
});

//get list of publishers ongoing projects
router.get('/byPublisher/ongoing', async (req, res) => {
    const project_publisher = req.query.project_publisher;
    try {
        const collection = db.collection("projects");
        const ongoingProjects = await collection.find({
            project_publisher: new ObjectId(project_publisher),
            project_status: { $in: [1] } // contain more items to also select projects in other status
        }).toArray();
        res.status(200).json(ongoingProjects);
    } catch (error) {
        console.error('Error fetching ongoing projects:', error);
        res.status(500).send('Internal server error');
    }
});

//get list of developer past projects
router.get('/byDeveloper/past', async (req, res) => {
    const chosen_applicants = req.query.chosen_applicants;
    try {
        const collection = db.collection("projects");
        const pastProjects = await collection.find({
            chosen_applicants: new ObjectId(chosen_applicants),
            project_status: { $in: [5] } // contain more items to also select projects in other status
        }).toArray();
        res.status(200).json(pastProjects);
    } catch (error) {
        console.error('Error fetching ongoing projects:', error);
        res.status(500).send('Internal server error');
    }
});

export default router;
