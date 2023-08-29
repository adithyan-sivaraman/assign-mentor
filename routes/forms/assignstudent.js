const createStudentHtml = (studentData, callback) => {
  let tbody = "";
  let length = studentData.length;
  if (length === 0) {
    tbody = `
    <tr>
    <td colspan="3"><p>There are no Students left for assigning</p></td>
    </tr>`
  }
  else {
    tbody = ''
    studentData.forEach((student, index) => {
      const fullName = student.fname + " " + student.lname;
      const id = student.id;
      tbody += `
  <tr>
  <td><input type="checkbox" id="${id}" /></td>
  <td>${id}</td>
  <td>${fullName}</td>
  </tr>`;

    });

  }

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assign Student to Mentor</title>
    <style>
      input{
       margin-right:10px !important; 
      }
     table{
      border-collapse:collapse;
     }
     th,td{
      border:1px solid blue;
      padding:5px 10px 5px 10px;
      font-size:18px;
     }
     td:not(:last-child){
      text-align:center;
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
    <h1>Assign Student to Mentor</h1>

    <form>
      <table>
        <thead>
          <tr>
            <th>X</th>
            <th>Student ID</th>
            <th>Student Name</th>
          </tr>
        </thead>
        <tbody>
          ${tbody}
        </tbody>
    </table>
      ${length !== 0 ? '<button type="submit">Submit</button>' : ''}   
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
    const studentIDs = Array.from(document.querySelectorAll('input[type=checkbox')).filter(element=>element.checked).map(e=>e.id)
    if(studentIDs.length===0){
      alert('Please select atleast one student');
    }
    else {
      const data = {
        mentorID:id,
        studentIDs:studentIDs
      }
      fetch('/mentor/assign/submit', {
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
  }
  </script>
  </html>`

  callback(html)
}
export default createStudentHtml;