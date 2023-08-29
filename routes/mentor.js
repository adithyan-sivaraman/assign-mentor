import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { mentor as mentorModel } from '../database/schema.js';
import { student as studentModel } from '../database/schema.js';
import createStudentHtml from './forms/assignstudent.js';
import listStudents from './forms/liststudent.js';
const mentorRouter = express.Router();

/*
1. this endpoint is to add a mentor
2. this will server addmentor html page
*/
mentorRouter.get('/add', (req, res) => {
    const modulePath = fileURLToPath(import.meta.url);
    const htmlPath = path.join(path.dirname(modulePath), './forms/addmentor.html');
    res.sendFile(htmlPath);
});

/*
1. this endpoint is to handle form submit to add mentor
2. First we get the last mentor Id and increment it by 1 to set next MentorId
*/
mentorRouter.post('/add/submit', async (req, res) => {
    try {
        const mentorData = req.body;
        const lastID = await mentorModel.findOne({}, {}, { sort: { id: -1 } });
        const nextId = lastID ? Number(lastID.id) + 1 : 1;
        mentorData.id = nextId;
        mentorData.studentIDs = [];
        const mentors = new mentorModel(mentorData);
        await mentors.save();
        res.send(`Mentor with ID ${nextId} Created Successfully`);
    }
    catch (err) {
        res.status(500).send({ msg: 'Error in creating' });
    }
});

/*
1. this endpoint is to show the list of students assigned to a particular mentor
2. First we get the  mentor Id and checked whether studentsID array is empty or not
3. If mentor ID is invalid then create a dailog with text as Invalid Mentor ID. mentor does not exist
4. If its empty then send response that no student assigned to mentor
5. If its not empty then send the student data as response
*/

mentorRouter.get('/show/:mentorID', async (req, res) => {
    const { mentorID } = req.params;
    const mentors = await mentorModel.findOne({ id: mentorID }, { _id: 0, __v: 0 })

    if (mentors === null) {
        res.send(`
        <dialog open>
        <p style="font-size:20px;">Invalid Mentor ID. mentor does not exist</p>
        </dialog>`)
    }
    else {
        const StudentData = mentors.studentIDs;
        const mentorName = mentors.fname + " " + mentors.lname;;
        if (StudentData.length === 0) {
            res.send(`
        <h1>List Students assigned to mentor</h1>
        <p style="font-size:18px;padding:5px;">Mentor Id :${mentorID}</p>
        <p style="font-size:18px;padding:5px;">Mentor Name :${mentorName}</p>
        <p style="display:inline;font-size:18px;padding:5px;background-color:blue;color:white"><b>No Student Assigned for this mentor</b></p> `)
        }
        else {
            const students = await studentModel.find({ id: { $in: StudentData } })
            listStudents(students,mentorName,mentorID, (content) => {
                res.send(content)
            })
        }
    }

});

/*
1. this endpoint is to show to list of students who are not yet assigned with mentor
2. First we get the  mentor Id and checked whether studentsID array is empty or not
3. Then call createStudentHtml function to create html content
3. If studentsID array  its empty then create table  with text as There are no Students left for assigning
4. If its not empty then create a form with the student id and name in a table format
*/

mentorRouter.get("/assign/:mentorID", async (req, res) => {
    const {mentorID} = req.params;
    const mentors = await mentorModel.findOne({id:mentorID});
        if (mentors === null) {
            res.send(`
        <dialog open>
        <p style="font-size:20px;">Invalid Mentor ID. mentor does not exist</p>
        </dialog>
        `)
        }
        else {
            const students = await studentModel.find({ mentorId: { $in: [null, ""] } }, { _id: 0, __v: 0 })
            createStudentHtml(students, (content) => {
                res.send(content)
            })
        }
    
});

/*
1. this endpoint is to handle form submit for assignment of students to mentor
2. There are two operations to be performed
3. First one is to update the mentorID in students collection
4. Second is to update studentsIDs array in mentor collection
*/

mentorRouter.put("/assign/submit", async (req, res) => {
    try {
        const { mentorID, studentIDs } = req.body;
        studentIDs.forEach(async (studentID) => {
            const students = await studentModel.findOne({ id: studentID });
            students.mentorId = mentorID;
            await students.save();

        });

        const mentors = await mentorModel.findOne({ id: mentorID })
        const existingStudentIds = mentors.studentIDs;
        const newStudentIds = [...existingStudentIds, ...studentIDs];
        mentors.studentIDs = newStudentIds;
        await mentors.save();
        res.send("students assigned successfully")
    }
    catch (err) {
        res.status(500).send({ msg: 'Error in assigning' });
    }
});

export default mentorRouter