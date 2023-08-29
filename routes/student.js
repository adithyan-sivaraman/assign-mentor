import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { student as studentModel } from '../database/schema.js';
import { mentor as mentorModel } from '../database/schema.js';
import createMentorHtml from './forms/assignmentor.js';
import listMentors from './forms/listmentor.js';
const studentRouter = express.Router();

/*
1. this endpoint is to add a mentor
2. this will server addstudent html page
*/

studentRouter.get('/add', (req, res) => {
    const modulePath = fileURLToPath(import.meta.url);
    const htmlPath = path.join(path.dirname(modulePath), './forms/addstudent.html');
    res.sendFile(htmlPath);

});

/*
1. this endpoint is to handle form submit to add student
2. First we get the last student Id and increment it by 1 to set next studentId
*/

studentRouter.post('/add/submit', async (req, res) => {
    try {
        const mentorData = req.body;
        const lastID = await studentModel.findOne({}, {}, { sort: { id: -1 } });
        const nextId = lastID ? Number(lastID.id) + 1 : 1;
        mentorData.id = nextId;
        mentorData.mentorId = "";
        mentorData.previousMentorIDs = [];
        const students = new studentModel(mentorData);
        await students.save();
        res.send(`Student with ID ${nextId} Created Successfully`);
    }
    catch (err) {
        res.status(500).send({ msg: 'Error in creating' });
    }
});

/*
1. this endpoint is for  new assignment or change in assignment of mentor to student
2. First we get the  student Id and if it not exists then display dialog with content as Invalid Student ID. student does not exist
3. If Student exists, then call createStudentHtml function to create html content
4. the form has option to select a new mentor and submit it
*/

studentRouter.get("/assign/:studentID", async (req, res) => {
    try {
        const { studentID } = req.params;
        const students = await studentModel.findOne({ id: studentID });
        const mentors = await mentorModel.find({});
        if (students === null) {
            res.send(`
        <dialog open>
        <p style="font-size:20px;">Invalid Student ID. student does not exist</p>
        </dialog>
        `)
        }
        else {
            createMentorHtml(mentors, students, (content) => {
                res.send(content);
            });
        }
    }
    catch (err) {
        res.status(500).send({ msg: 'Error in fetching' });
    }
});

/*
1. this endpoint is to handle form submit for new assignment or change in assignment of mentor to student
2. There are two operations to be performed
3. First one is to update the mentorID and previousMentorIDs in students collection
4. Second is to update studentsIDs array in mentor collection
*/

studentRouter.put("/assign/submit", async (req, res) => {
    try {
        const { curid, newid, stuid } = req.body;
        const mentorData = await studentModel.findOne({ id: stuid });
        let previousIDs = mentorData.previousMentorIDs;

        //if student has current mentor then push current id to previousIDs and then remove the new id from previousIDs
        if (curid !== "NA") {
            previousIDs.push(curid);
            previousIDs = previousIDs.filter(id => id !== newid);
        }

        //update mentorID as new id and previousMentorIDs as previousIDs
        await studentModel.findOneAndUpdate({ id: stuid }, { $set: { mentorId: newid, previousMentorIDs: previousIDs } });

        // if there is no current mentor for student then update studentIDs array using findOneAndUpdate and $set
        if (curid === "NA") {
            await mentorModel.findOneAndUpdate({ id: newid }, { $set: { studentIDs: [stuid] } });
        }

        /*
            If student has current mentor, use findOneAndUpdate and then
                1. add new mentor id using $addToSet
                2. remove current mentor id using $pull
        */
        else {
            await mentorModel.findOneAndUpdate(
                { id: newid },
                { $addToSet: { studentIDs: stuid } }
            );

            await mentorModel.findOneAndUpdate(
                { id: curid },
                { $pull: { studentIDs: stuid } }
            );
        }
        res.send("Mentor assigned to student successfully")
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: 'Error in assigning' });
    }
});

/*
1. this endpoint is to show the list previously assigned mentors for a particular student
2. First we get the  student Id and if it's invalid then create a dailog with text as Student ID. student does not exist
3. Else Check whether previousMentorIDs array is empty or not
4. If its empty send response text
5. If its not empty then send the previous mentor data as response
*/

studentRouter.get('/show/:studentID', async (req, res) => {
    try {
        const { studentID } = req.params;
        const students = await studentModel.findOne({ id: studentID }, { _id: 0, __v: 0 })
        if (students === null) {
                res.send(`
                    <dialog open>
                    <p style="font-size:20px;">Invalid student ID. student does not exist</p>
                    </dialog>`)
        }
        else {
            const mentorData = students.previousMentorIDs;
            const studentName = students.fname + " " + students.lname;;
            if (mentorData.length === 0) {
                res.send(`
                    <h1>List Students assigned to mentor</h1>
                    <p style="font-size:18px;padding:5px;">Student Id :${studentID}</p>
                    <p style="font-size:18px;padding:5px;">Student Name :${studentName}</p>
                    <p style="display:inline;font-size:18px;padding:5px;background-color:blue;color:white"><b>No Previous mentors assigned to this student</b></p>`)
            }
            else {
                const mentors = await mentorModel.find({ id: { $in: mentorData } })
                listMentors(students, mentors, (content) => {
                    res.send(content)
                })

            }
        }
    }
    catch (error) {
        res.status(500).send({ msg: 'Error in fetching' });
    }

});

export default studentRouter;