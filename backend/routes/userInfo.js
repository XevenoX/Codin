// routes/userInfo.js
import express from "express";
const router = express.Router();
import { ObjectId } from "mongodb";
import db from "../db/connection.js";

// test GET to fetch all users
router.get('/', async (req, res) => {
    try {
        let collection = await db.collection("users");
        const users = await collection.find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
});

// load user info by email
router.get('/findByEmail', async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).send('Email is required');
        }

        let collection = await db.collection("users");
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal server error');
    }
});

// update publisher info
router.post("/publisherUpdate", async (req, res) => {
    try {
        const { email, about_us, industry, website, organization_size, specialities } = req.body;
        let updatedPublisherInfo = {
            about_us,
            industry,
            website,
            organization_size,
            specialities
        };
        let collection = await db.collection("users");
        let result = await collection.updateOne(
            { email: email },
            { $set: updatedPublisherInfo }
        );
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: "Record updated successfully" });
        } else {
            res.status(404).send({ message: "Record not found or no changes made" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user information");
    }
});

// update publisher slogan
router.post("/sloganUpdate", async (req, res) => {
    try {
        const { email, slogan } = req.body;
        let updatedslogan = {
            slogan
        };
        let collection = await db.collection("users");
        let result = await collection.updateOne(
            { email: email },
            { $set: updatedslogan }
        );
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: "Record updated successfully" });
        } else {
            res.status(404).send({ message: "Record not found or no changes made" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user information");
    }
});

// update developer info
router.post("/developerUpdate", async (req, res) => {
    try {
        const { email, website, work_status, location, school, skills } = req.body;
        let updatedDeveloperInfo = {
            website,
            work_status,
            location,
            school,
            skills
        };
        let collection = await db.collection("users");
        let result = await collection.updateOne(
            { email: email },
            { $set: updatedDeveloperInfo }
        );
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: "Record updated successfully" });
        } else {
            res.status(404).send({ message: "Record not found or no changes made" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user information");
    }
});

//get feedbacks
router.get('/feedbacks', async (req, res) => {
    try {
        const rated_for = req.query._id;
        const collection = db.collection("feedbacks");
        const pipeline = [
            {
                $match: {
                    rated_for: new ObjectId(rated_for),
                },
            },
            {
                $sort: {
                    rated_date: -1,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'rated_by',
                    foreignField: '_id',
                    as: 'raterDetails',
                },
            },
            {
                $unwind: '$raterDetails',
            },
            {
                $project: {
                    comment: 1,
                    rated_date: 1,
                    rating: 1,
                    rater_name: '$raterDetails.name',
                },
            },
        ];
        const feedbacks = await collection.aggregate(pipeline).toArray();
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).send('Internal server error');
    }
});

//get average rating
router.get('/averageRating', async (req, res) => {
    try {
        const rated_for = req.query._id;
        const collection = db.collection("feedbacks");
        const pipeline = [
            {
                $match: {
                    rated_for: new ObjectId(rated_for),
                },
            },
            {
                $group: {
                    _id: '$ratedFor',
                    averageRating: { $avg: '$rating' },
                    totalRatings: { $sum: 1 },
                },
            },
        ];
        const result = await collection.aggregate(pipeline).toArray();
        if (result.length === 0) {
            res.status(200).send({ averageRating: null, totalRatings: 0 });
        } else {
            res.status(200).json(result[0]);
        }
    } catch (error) {
        console.error('Error fetching average rating:', error);
        res.status(500).send('Internal server error');
    }
});

export default router;
