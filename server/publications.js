Meteor.publish('schools', function(options) {
  return Schools.find({}, options);
});

Meteor.publish('branches', function(options) {
  return Branches.find({}, options);
});

//subscribe collection of all teachers administrator
Meteor.publish('teachers', function(options) {
  return Teachers.find(options);
});

//subscribe collection of all students administrator
Meteor.publish('students', function(options) {
  return Students.find(options);
})

Meteor.publish('counters', function() {
  return Counters.find();
})


//subscribe to students collection of specific school
Meteor.publish('moderatorStudentsList', function() {
  if (this.userId) {
    return Students.find({
      schoolId: Schools.findOne({
        userId: this.userId
      }).id
    });
  } else
    this.ready()
});

//subscribe to teachers collection of specific school
Meteor.publish('moderatorTeachersList', function() {
  if (this.userId)
    return Teachers.find({
      schoolId: Schools.findOne({
        userId: this.userId
      }).id
    })
  else
    this.ready()
});

Meteor.publish('olympiadStudentsList', function() {
  if (this.userId) {
    return Students.find({
      schoolId: Schools.findOne({
        userId: this.userId
      }).id,
      olympiadLesson: {
        $ne: '-1'
      }
    })
  } else
    this.ready()
});

Meteor.publish('regionalOlympiadResults', function(options) {
  if (this.userId) {
    options.schoolId = Schools.findOne({
      userId: this.userId
    }).id;
    return RegionalOlympiad.find(options)
  } else
    this.ready();
});

Meteor.publish('republicOlympiadResults', function(options) {
  if (this.userId) {
    options.schoolId = Schools.findOne({
      userId: this.userId
    }).id;
    return RepublicOlympiad.find(options)
  } else
    this.ready();
});

Meteor.publish('worldOlympiadResults', function(options) {
  if (this.userId) {
    options.schoolId = Schools.findOne({
      userId: this.userId
    }).id;
    return WorldOlympiad.find(options)
  } else
    return this.ready()
});

Meteor.publish('regionalProjectResults', function(options) {
  if (this.userId) {
    options.schoolId = Schools.findOne({
      userId: this.userId
    }).id;
    return RegionalProject.find(options);
  } else
    return this.ready();
});

Meteor.publish('republicProjectResults', function(options) {
  if (this.userId) {
    options.schoolId = Schools.findOne({
      userId: this.userId
    }).id;
    return RepublicProject.find(options)
  } else
    return this.ready();
});

Meteor.publish('gdsKeys', function(obj) {
  return GDSKeys.find(obj)
});

Meteor.publish('gdsLessons', function() {
  return GdsLessons.find();
});

Meteor.publish('gdsResults', function(options) {
  if (this.userId) {
    options.schoolId = Schools.findOne({
      userId: this.userId
    }).id;
    return GDSResults.find(options);
  } else
    return this.ready();
});

Meteor.publish('kboKeys', function(options) {
  if (this.userId) {
    return KBOKeys.find(options);
  } else
    return this.ready();
});

Meteor.publish('studentsIn', function() {
  if (this.userId) {
    schoolId = Schools.findOne({
      userId: this.userId
    }).id
    return StudentTransfer.find({
      newSchool: schoolId
    })
  } else
    return this.ready();
})

Meteor.publish('studentsOut', function() {
  if (this.userId) {
    schoolId = Schools.findOne({
      userId: this.userId
    }).id
    return StudentTransfer.find({
      previousSchool: schoolId
    })
  } else
    return this.ready();
});

Meteor.publish('teachersIn', function() {
  if (this.userId) {
    schoolId = Schools.findOne({
      userId: this.userId
    }).id
    return TeacherTransfer.find({
      newSchool: schoolId
    })
  } else
    return this.ready();
});

Meteor.publish('teachersOut', function() {
  if (this.userId) {
    schoolId = Schools.findOne({
      userId: this.userId
    }).id
    return TeacherTransfer.find({
      previousSchool: schoolId
    })
  } else
    return this.ready();
});
