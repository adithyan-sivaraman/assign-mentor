const createMentorHtml = (mentors,students, callback) => {
  const mentorID = students.mentorId;
  const studentName = students.fname +" "+ students.lname;
  const studentId = students.id;
  const currMentorData = mentors.find(mentor=>mentor.id===mentorID)
  const curMentorName = currMentorData ?currMentorData.fname +" "+ currMentorData.lname : 'NA';
  const curMentorID = currMentorData ?currMentorData.id : 'NA';
  const newMentorData = mentors.filter(mentor=>mentor.id!==mentorID)
  let options = `<option value="">-- Select --</option>`;
  newMentorData.forEach(mentor => {
    
    options += `
    <option value="${mentor.id}">${mentor.fname} ${mentor.lname}</option>
    `
  });
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assign Mentor to Student</title>
    <style>
      input,label,select{
        display: inline-block;
        padding:10px;
       width:250px !important;
       font-size:18px;
      }
     
      div{
        display: flex;
        flex-direction: row;
        align-items: center;
        
        border:2px solid red
      }
      
  
      button {
        font-size: 20px;
        background-color: blue;
        color: white;
        margin-top:10px;
        padding: 5px;
        letter-spacing: 0.05em;
        cursor: pointer;
        transition: background-color 0.5s ease;
      }
  
      button:hover {
        background-color: lightblue;
        color: black;
      }
    </style>
  </head>
  
  <body>
    <h1>Assign Mentor to Student</h1>
    <form>
    <label for="curname">Current Mentor Name</label>
    <input type="text" name="curname" id="curname" readOnly value ="${curMentorName}"  disabled/>
    <br><br>
    <label for="curid">Current Mentor ID</label>
    <input type="text" name="curid" id="curid" readOnly value ="${curMentorID}" />
    <br><br>
     <label for="stuname">Student Name</label>
      <input type="text" name="stuname" id="stuname" readOnly value ="${studentName}" disabled/>
      <br><br>
      <label for="stuid">Student ID</label>
      <input type="text" name="stuid" id="stuid" readOnly value ="${studentId}" />
      <br><br>
      <label for="select">Select a mentor</label>
      <select name="newid" id="select" required>${options}</select>
      <br><br>
      <button type="submit">Submit</button>
    </form>
  </body>
  
  <script>
  const url = window.location.href.split('/')
  const id = url[url.length -1];
  console.log(id)
  const form = document.querySelector('form');
  form.onsubmit=(e)=>{
    e.preventDefault();
    console.log('submit prevented');
    const inputs = document.querySelectorAll('input:not([disabled]),select')
    const data = {};
    Array.from(inputs).forEach(input => {
      data[input.name] = input.value;
    })
    console.log(data);
    fetch('/student/assign/submit', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.text())  // 
      .then(respText => {
        alert(respText);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  </script>
  </html>`

  callback(html)
}
export default createMentorHtml;