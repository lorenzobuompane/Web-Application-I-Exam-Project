'use strict';

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const session = require('express-session');

const studentsDAO = require('./studentsDAO');
const coursesDAO = require('./coursesDAO');

// init express
const app = new express();
const port = 3001;

const LOG_PREFIX = '/api';
const PREFIX = '/api/v1';

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(session({
  secret: 'must be secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.authenticate('session'));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});

passport.use(new LocalStrategy(
  function verify(email, password, callback) {
    studentsDAO.getUser(email, password)
      .then((user) => {
        if (user) {
          return callback(null, user);
        }
        return callback(false, { error: 'Email or password incorrect' });
      })
      .catch();
  }
));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(400).json({ message: 'Not authenticated' });
}

//Login and Logout API
app.post(LOG_PREFIX + '/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json(req.user);
});

app.post(LOG_PREFIX + '/logout', isLoggedIn, (req, res) => {
  req.logout(() => {
    return res.status(200).end();
  });
});


//API calls
/* ------------------ GET ------------------ */
/* 
  Return the list of all courses
*/
app.get(PREFIX + '/', async (req, res) => {
  try {
    let courses = await coursesDAO.getCourses();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).end();
  }
})

/* 
  Return study plan of logged in user
*/
app.get(PREFIX + '/studyplan', isLoggedIn, async (req, res) => {
  try {
    let studyPlan = await coursesDAO.getStudyPlan(req.user.id);
    return res.status(200).json(studyPlan);
  } catch (error) {
    return res.status(500).end();
  }
})

/* 
  Return list of available study plan type
*/
app.get(PREFIX + '/range', async (req, res) => {
  try {
    let range = await coursesDAO.getRange();
    return res.status(200).json(range);
  } catch (error) {
    return res.status(500).end();
  }
})

/* 
  Return number of students enrolled on the selected course
*/
app.get(PREFIX + '/course/:course/studentEnrolled', async (req, res) => {
  try {
    let studs = await coursesDAO.getNumberOfStudentsEnrolled(req.params.course);
    return res.status(200).json(studs);
  } catch (error) {
    return res.status(500).end();
  }
})

/* 
  Return logged in user information
*/
app.get(PREFIX + '/user', isLoggedIn, async (req, res) => {
  try {
    let user = await studentsDAO.getUserInfo(req.user.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).end();
  }
})

/* 
  Create (if valid) a new study plan of logged in user
*/
app.post(PREFIX + '/studyplan', isLoggedIn, async (req, res) => {
  try {
    let newStudyPlan = req.body.studyplan;
    let type = req.body.type;
    let user = req.user.id;
    let courses = await coursesDAO.getCourses();
    let range = await coursesDAO.getRange();

    let valid = await coursesDAO.checkValid(newStudyPlan, courses, range[type].min, range[type].max, newStudyPlan);

    if (valid) {
      for (let c = 0; c < newStudyPlan.length; c++) {
        await coursesDAO.postCourseInStudyPlan(newStudyPlan[c], user);
        let se = await coursesDAO.getNumberOfStudentsEnrolled(newStudyPlan[c]);
        await coursesDAO.putStudentEnrolled(newStudyPlan[c], se.studEnr);
      }
      await coursesDAO.putType(user, type);

      return res.status(201).json(valid);
    }

    return res.status(422).json(valid);

  } catch (error) {
    return res.status(500).end();
  }
})

/* ------------------ PUT ------------------ */
/* 
  Update study plan type of logged in user
*/
app.put(PREFIX + '/type', isLoggedIn, async (req, res) => {
  try {
    await coursesDAO.putType(req.user.id, req.body.type);
    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
})

/* 
  Update number of students enrolled on the selected course
*/
app.put(PREFIX + '/course/:course/studentEnrolled', async (req, res) => {
  try {
    await coursesDAO.putStudentEnrolled(req.params.course, req.body.studEnr);
    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
})

/* 
  Update (if valid) an existing study plan of logged in user
*/
app.put(PREFIX + '/studyplan', isLoggedIn, async (req, res) => {
  try {
    let newStudyPlan = req.body.studyplan;
    let type = req.body.type;
    let user = req.user.id;
    let studyPlanOnDB = await coursesDAO.getStudyPlan(user);
    let courses = await coursesDAO.getCourses();
    let range = await coursesDAO.getRange();

    let toDel = studyPlanOnDB.filter((x) => !newStudyPlan.includes(x));
    let toIns = newStudyPlan.filter((x) => !studyPlanOnDB.includes(x));

    let valid = coursesDAO.checkValid(newStudyPlan, courses, range[type].min, range[type].max, toIns);

    if (valid) {
      for (let c = 0; c < toDel.length; c++) {
        await coursesDAO.deleteCourseInStudyPlan(toDel[c], user);
        let se = await coursesDAO.getNumberOfStudentsEnrolled(toDel[c]);
        await coursesDAO.putStudentEnrolled(toDel[c], se.studEnr);
      }
      for (let c = 0; c < toIns.length; c++) {
        await coursesDAO.postCourseInStudyPlan(toIns[c], user);
        let se = await coursesDAO.getNumberOfStudentsEnrolled(toIns[c]);
        await coursesDAO.putStudentEnrolled(toIns[c], se.studEnr);
      }
      await coursesDAO.putType(user, type);

      return res.status(200).json(valid);
    }

    return res.status(422).json(valid);

  } catch (error) {
    return res.status(500).end();
  }
})
/* ------------------ DELETE ------------------ */
/* 
  Delete persistency study plan of logged in user
*/
app.delete(PREFIX + '/studyplan', isLoggedIn, async (req, res) => {
  try {
    await coursesDAO.deleteStudyPlan(req.user.id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
})


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


