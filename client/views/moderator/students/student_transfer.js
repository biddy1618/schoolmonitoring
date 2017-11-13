Template.studentsIn.helpers({
  students: function() {
    return StudentTransfer.find()
  },
  student_set: function() {
    students = (StudentTransfer.find().count()!==0) ? true:false;
  return students
  }
})

Template.studentsOut.helpers({
  students: function() {
    return StudentTransfer.find()
  },
  student_set: function() {
    students = (StudentTransfer.find().count()!==0) ? true:false;
    return students
  }
})

Template.studentsIn.events({
  'click #accept': function() {
    Meteor.call('acceptStudent',this._id, function(err) {
      if (err)
        alert(err.reason)
    });
  },
  'click #decline': function() {
    Meteor.call('declineStudent',this._id,function(err) {
      if (err)
        alert(err.reason)
    })
  }
})

Template.studentsOut.events({
  'click #cancel': function() {
    Meteor.call('declineStudent', this._id, function(err) {
      if (err)
        alert(err.reason)
    })
  }
})
