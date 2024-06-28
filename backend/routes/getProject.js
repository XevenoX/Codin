//JUST FOR TESTING WILLBE REPLAACED, I GUESS

import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a single record by id
// router.get("/", async (req, res) => {
//     let collection = await db.collection("projects");
//     let query = { project_name: "frontend development" };
//     let result = await collection.findOne(query);
//     console.log(result);
  
//     if (!result) res.send("Not found").status(404);
//     else res.send(result).status(200);
//   });

router.get("/publisher/:id", async (req, res) => {
  
  const { id } = req.params;
  // console.log(id);
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ObjectId format");
  }
  try{
    let collection = await db.collection("projects");
  let query = { _id: new ObjectId(id) };
  let project = await collection.findOne(query);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  //get applicants

  //TODO: if (role = publisher) 
  if(project.applicants && project.applicants.length > 0){
    collection = await db.collection("users");
    // query = {_id: { $in: project.applicants }};
    query = { _id: { $in: project.applicants.map(applicantId => new ObjectId(applicantId)) } };
    const applicants = await collection.find(query).toArray();
    

    project.applicants = applicants;
    ///TODO: get reviews of each applicants (projects: finished & _id matches) 
    // console.log(project);
  }

  res.status(200).json(project);
  }catch(error){
    console.error("Failed to fetch project and applicants:", error);
    res.status(500).send("Internal Server Error");
  }
  
});



router.get("/developer/:id", async (req, res) => {
  
  const { id } = req.params;
  // console.log(id);
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ObjectId format");
  }
  try{
    let collection = await db.collection("projects");
  let query = { _id: new ObjectId(id) };
  let project = await collection.findOne(query);
  console.log(project);

  if (!project) {
    return res.status(404).send("Project not found");
  }else{
    //  get publisher
  collection = await db.collection("users");
  // query = {_id: { $in: project.applicants }};
  query = { _id: new ObjectId(project.project_publisher)};
  let publisher = await collection.findOne(query);
  // console.log(publisher);
  project.project_publisher = publisher.name;
  // console.log(publisher.name);
  }

 

  //get applicants

  //TODO: if (subscription) 
  if(project.applicants && project.applicants.length > 0){
    collection = await db.collection("users");
    // query = {_id: { $in: project.applicants }};
    query = { _id: { $in: project.applicants.map(applicantId => new ObjectId(applicantId)) } };
    const applicants = await collection.find(query).toArray();
    

    project.applicants = applicants.length;

    
    


    ///TODO: get reviews of each applicants (projects: finished & _id matches) 
    // console.log(project);

    // console.log(project);
  }

  res.status(200).json(project);
  }catch(error){
    console.error("Failed to fetch project and applicants:", error);
    res.status(500).send("Internal Server Error");
  }
  
});




export default router;