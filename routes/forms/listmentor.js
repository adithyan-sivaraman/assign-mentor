const listMentors = (students,mentors,callback)=>{
const studentID = students.id;
const studentName = students.fname + " " + students.lname;
let tbody = ""
mentors.forEach(mentor=>{
    tbody+=`
<tr>
<td style="border:2px solid blue;font-size:18px;padding:5px">${mentor.id}</td>
<td style="border:2px solid blue;font-size:18px;padding:5px">${mentor.fname}</td>
<td style="border:2px solid blue;font-size:18px;padding:5px">${mentor.lname}</td>
</tr>
`
});
let html = `
<h1>List Previous Mentors assigned to Student</h1>
<p style="font-size:18px;padding:5px;">Student Id :${studentID}</p>
<p style="font-size:18px;padding:5px;">Student Name :${studentName}</p>

<table style="border-collapse:collapse">
<thead>
<tr>
<th style="border:2px solid blue;font-size:18px;padding:5px">Student ID</th>
<th style="border:2px solid blue;font-size:18px;padding:5px">First Name</th>
<th style="border:2px solid blue;font-size:18px;padding:5px">Last Name</th>
</tr>
</thead>
<tbody>
${tbody}
</tbody>
</table>
`
callback(html)
}
export default listMentors;