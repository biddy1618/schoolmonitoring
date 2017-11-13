Template.moderatorLayout.helpers({
  students: function() {
    return Students.find().count()
  }
})
