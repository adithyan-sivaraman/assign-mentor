# Assign Mentor API

    This project provides APIs to Create and Assing mentors and students

## API Documentation

## For Student

### Create a  Student

1. **Endpoint**: `http://localhost:3000/Student/add` to generate form
2. **Endpoint**: `http://localhost:3000/Student/add/submit` to handle form submit
3. **Method**: POST

4. **Request Parameters**

Not required.

5. Example Request for form submit**
    - Note 
        - endpoint url is `http://localhost:3000/Student/add/submit`
        - Please specify the key names exactly as mentioned below

    - request body : {"fname":"deepthi","lname":"K","dob":"1992-02-09","batch":"B49WENG","email":"deepthi@gmail.com"}

6. **Example Response**
Note : Student ID is generated in server side and sent as response

Student with ID 2 Created Successfully

### Assign a mentor or change current mentor

1. **Endpoint**: `http://localhost:3000/student/assign/:studentID` to generate a form
2. **Endpoint**: `http://localhost:3000/student/assign/submit` to handle form submit
3. **Method**: PUT

4. **Request Parameters**

Student Id is required to generate the form

5. **Example Request**

    - Note:  
        - endpoint url is `http://localhost:3000/Student/assign/submit`
        - Please specify the key names exactly as mentioned below

     - request body : {"curid":"2","newid":"4","stuid":"3"}

6. **Example Response**
    - If Student ID is invalid it will create a dialog and display in webpage
    <dialog open>
        <p style="font-size:20px;">Invalid Student ID. student does not exist</p>
    </dialog>

    Note:if you make request from other than a browser it will send 404 error message as below

    <dialog open>
        <p style="font-size:20px;">Error 404! The requested resource does not exist</p>
    </dialog>


    - If Mentor is assigned then will send response as 
    Mentor assigned to student successfully

### List of previously assigned mentors to a student

1. **Endpoint**: `http://localhost:3000/student/show/:studentID`
2. **Method**: GET

Retrieves a list of files from the designated folder.

3. **Request Parameters**

Student Id is required

4. **Example Request**

http://localhost:3000/student/show/1

5. **Example Response**
    - If Student ID is invalid it will create a html dialog with content as "Invalid student ID. student does not exist" and display in webpage

    - If no previously assigned mentors found for the given student, then html content with text as "No Previous mentors assigned to this student" will be displayed

    - If previously assigned mentors found for the given studen, then html content with table of previous mentor id, first and last name will be displayed

## For Mentor

### Create a  Mentor

1. **Endpoint**: `http://localhost:3000/mentor/add` to generate form
2. **Endpoint**: `http://localhost:3000/mentor/add/submit`to handle form submit
3. **Method**: POST


4. **Request Parameters**

Not required.

5. **Example Request for form submit**
    - Note 
        - endpoint url is `http://localhost:3000/mentor/add/submit`
        - Please specify the key names exactly as mentioned below
        - "batch" must be of type array 

    - request body : {"fname":"jason","lname":"john","dob":"1975-09-10","batch":["B4445WETamil","B46WETamil"],"email":"jasonjohn@gmail.com"}

6. **Example Response**
Note : Mentor ID is generated in server side and sent as response
Mentor with ID 6 Created Successfully

### Assign one or multiple students to a mentor

1. **Endpoint**: `http://localhost:3000/mentor/assign/:mentorID` to generate a form 
2. **Endpoint**: `http://localhost:3000/student/assign/submit` to handle form submit
3. **Method**: PUT

4. **Request Parameters**

Mentor Id is required to generate the form

5. **Example Request**

    - Note:  
        - endpoint url is `http://localhost:3000/mentor/assign/submit`
        - Request body contains only array of student IDs
    
    - request body : [   "7","8"]

**Example Response**
    - If Mentor ID is invalid it will create a dialog and display in webpage with content as "Invalid Mentor ID. mentor does not exist"
    - if you make request to  "http://localhost:3000/mentor/assign/:mentorID" from other than browser it will create a dialog and display in webpage with content as "Error 404! The requested resource does not exist"
    - If Mentor is assigned then will send response as "Student assigned to mentor successfully"

### List of students assigned to a mentor

1. **Endpoint**: `http://localhost:3000/mentor/show/:mentorID`
2. **Method**: GET

3. **Request Parameters**

Mentor Id is required

4. **Example Request**

http://localhost:3000/mentor/show/5

5. **Example Response**
    - If Mentor ID is invalid it will create a html dialog with content as "Invalid mentor ID. mentor does not exist" and display in webpage

    - If no students assigned to the given mentor, then html content with text as "No Student Assigned for this mentor" will be displayed

    - If students are assigned to the given mentor, then html content with table of  student id, first and last name will be displayed

## Installation and Setup

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm run start`.
4. In case of Development environment, start the server using `npm run dev'.
5. Create a .env file in root directory and set environment variables
        - In case of local mongo db
                - MONGO_DB={your database name}
                - MONGO_URL={your database url}
        - In case of cloud mongo db
                - MONGO_DB={your database name}
                - MONGO_USER={username}
                - MONGO_PASSWORD={password}
                - MONGO_CLUSTER={cluster name} eg. `cluster.oaqy8cr.mongodb.net`

6. in connection.js set local or cloud url in mongoose.connect function

## Usage

1. This api is meant to be used from a browser as it serves html pages for adding/assigning mentor or student
2. Make API requests using tools like postman inorder to fetch information



