Template.kboResults.helpers({
  academicYear: function() {
    return Session.get('academicYear')
  },
  day1: function() {
    lessons = GdsLessons.find({day:1}).fetch().sort({lessonId:1})
    lessons.forEach(function(element) {
      element.name = Branches.findOne({id:element.lessonId}).name
    })
    return lessons
  },
  day2: function() {
    lessons = GdsLessons.find({day:2}).fetch().sort({lessonId:1})
    lessons.forEach(function(element) {
      element.name = Branches.findOne({id:element.lessonId}).name
    })
    return lessons
  },

  day1results: function() {
    day1 = GDSResults.find({day:1}).fetch()
    day1.forEach(function(result) {
      student = Students.findOne({studentId:result.studentId})||{}
      result.name=student.name
      result.surname=student.surname
      day2 = GDSResults.findOne({day:2,studentId:result.studentId});
      day2.answers.forEach(function(res) {
        result.answers.push(res)
      })
    })

    //day2.forEach(function(result) {
    //  student = Students.findOne({studentId:result.studentId})||{}
    //  result.name=student.name
    //  result.surname=result.surname
    //})
    return day1
  }
});

Template.kboResults.events({
  'click #previous': function(event,template) {

  },
  'click #next': function(event,template) {

  }
})
