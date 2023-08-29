const listStudents = (studentData,mentorName,mentorID,callback)=>{
console.log(studentData)
let tbody = ""
studentData.forEach(student=>{
    tbody+=`
<tr>
<td style="border:2px solid blue;font-size:18px;padding:5px">${student.id}</td>
<td style="border:2px solid blue;font-size:18px;padding:5px">${student.fname}</td>
<td style="border:2px solid blue;font-size:18px;padding:5px">${student.lname}</td>
</tr>
`
});
let html = `
<h1>List Students assigned to mentor</h1>
<p style="font-size:18px;padding:5px;">Mentor Id :${mentorID}</p>
<p style="font-size:18px;padding:5px;">Mentor Name :${mentorName}</p>

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
export default listStudents;