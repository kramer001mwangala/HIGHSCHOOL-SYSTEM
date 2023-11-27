const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/highschool');

// Create a mongoose model 
const Student_School_Fees = mongoose.model('StudentFees', {
  STUDENT_ID: Number,
  STUDENTS_NAME: String,
  FORM: String,
  DATE_OF_PAYMENT: Date,
  AMOUNT_PAID: Number,
});

// Create a mongoose model for Parent
const Parent = mongoose.model('Parent', {
  ID_NUMBER: Number,
  NAME: String,
  PHONE_NUMBER: Number,
  Email: String,
});

const teacherSchema = new mongoose.Schema({
  idNumber: { type: Number, required: true },
  employeeId: { type: String, required: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  gender: { type: String, enum: ['MALE', 'FEMALE'], required: true },
  department: { type: String, required: true },
  subjectsTaught: { type: String, required: true },
});
const supportStaffSchema = new mongoose.Schema({
  ID_NUMBER: { type: Number, required: true },
  EMPLOYEE_ID: { type: Number, required: true },
  gender: { type: String, enum: ['MALE', 'FEMALE'], required: true },
  Employee_Name: { type: String, required: true },
  occupation: { type: String, required: true },

});

const registrationSchema = new mongoose.Schema({
  STUDENT_ID: { type: Number, required: true },
  REGISTRATION_DATE: { type: Date, required: true },
  STUDENT_NAME: { type: String, required: true },
  PARENTS_NAME: { type: String, required: true },

});
const studentSchema = new mongoose.Schema({
  STUDENT_ID: { type: Number, required: true },
  STUDENT_NAME: { type: String, required: true },
  gender: { type: String, enum: ['MALE', 'FEMALE'], required: true },
  REGISTRATION_DATE: { type: Date, required: true },
  CLASS: { type: Number, required: true },
  DORM: { type: String, required: true },
  PHONE: { type: Number, required: true },
  SUBJECTS: { type: String, required: true },

})

//  models
const Teacher = mongoose.model('Teacher', teacherSchema);
const SupportStaff = mongoose.model('SupportStaff', supportStaffSchema);
const Registration = mongoose.model('Registration', registrationSchema);
const Student = mongoose.model('Student', studentSchema);
// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up your routes
app.get('/', (req, res) => {
  res.render('Ytterbium High');
});

app.get('/feespayment', (req, res) => {
  res.render('feespayment');
});

app.post('/feespayment', (req, res) => {
  const { STUDENT_ID, STUDENTS_NAME, FORM, DATE_OF_PAYMENT, AMOUNT_PAID } = req.body;

  // Create a new student instance
  const StudentFees = new Student_School_Fees({
    STUDENT_ID,
    STUDENTS_NAME,
    FORM,
    DATE_OF_PAYMENT,
    AMOUNT_PAID,
  });

  // Save the student record
  StudentFees.save()
    .then(() => {
      console.log('Student record saved.');
      res.send('Student record saved.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/teachers', (req, res) => {
  res.render('teachers');
});


app.post('/teachers', async (req, res) => {
  try {
    
    const newTeacher = new Teacher({
      idNumber: req.body.idNumber,
      employeeId: req.body.employeeId,
      firstName: req.body.firstName,
      surname: req.body.surname,
      gender: req.body.gender,
      department: req.body.department,
      subjectsTaught: req.body.subjectsTaught,
    });

    // Save the new teacher to the database
    const savedTeacher = await newTeacher.save();

    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/supportstaff', (req, res) => {
  res.render('supportstaff');
});

app.post('/supportStaff', async (req, res) => {
  try {
    
    const newSupportStaff = new SupportStaff({
      idNumber: req.body.idNumber,
      employeeId: req.body.employeeId,
      employeeName: req.body.employeeName,
      gender: req.body.gender,
      occupation: req.body.occupation,
    });

    // Saving  the new support staff to the database
    const savedSupportStaff = await newSupportStaff.save();

    res.status(201).json(savedSupportStaff);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/students', (req, res) => {
  res.render('student');
});


app.post("/students", async (req, res) => {
  try {
    const {
      STUDENT_ID,
      STUDENT_NAME,
      gender,
      REGISTRATION_DATE,
      CLASS,
      DORM,
      PHONE,
      SUBJECTS
    } = req.body;

    // Check if required fields are present
    if (!STUDENT_ID || !STUDENT_NAME || !gender || !REGISTRATION_DATE || !CLASS || !DORM || !PHONE || !SUBJECTS) {
      return res.status(400).send('All required fields must be provided.');
    }

    const student = new Student({
      STUDENT_ID,
      STUDENT_NAME,
      gender,
      REGISTRATION_DATE,
      CLASS,
      DORM,
      PHONE,
      SUBJECTS,
    });

    await student.save();
    console.log('Student record saved.');
    res.send('Student record saved.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/registration', (req, res) => {
  res.render('registration');
});
app.post('/registration', (req, res) => {
  const { STUDENT_ID, REGISTRATION_DATE, STUDENT_NAME, PARENTS_NAME } = req.body;
  const registration = new Registration({
    STUDENT_ID,
    REGISTRATION_DATE,
    STUDENT_NAME,
    PARENTS_NAME,
  })
    
     registration.save()
    .then(() => {
      console.log('Parent record saved.');
      res.send('Parent record saved.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
  
});

app.get('/parents', (req, res) => {
  res.render('parents');
});

app.post('/parents', (req, res) => {
  const { ID_NUMBER, NAME, PHONE_NUMBER, Email } = req.body;

  // Create a new parent instance
  const parent = new Parent({
    ID_NUMBER,
    NAME,
    PHONE_NUMBER,
    Email,
  });

  // Save the parent record
  parent.save()
    .then(() => {
      console.log('Parent record saved.');
      res.send('Parent record saved.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
