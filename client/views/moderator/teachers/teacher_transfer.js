Template.teachersIn.helpers({
  teachers: function() {
    return TeacherTransfer.find()
  }
})

Template.teachersOut.helpers({
  teachers: function() {
    return TeacherTransfer.find()
  }
})

Template.teachersIn.events({
  'click #accept': function() {
    Meteor.call('acceptTeacher',this._id, function(err) {
      if (err)
        alert(err.reason)
    });
  },
  'click #decline': function() {
    Meteor.call('declineTeacher',this._id,function(err) {
      if (err)
        alert(err.reason)
    })
  }
})

Template.teachersOut.events({
  'click #cancel': function() {
    Meteor.call('declineTeacher', this._id, function(err) {
      if (err)
        alert(err.reason)
    })
  }
})
