Template.schoolItem.events({
  'click #deleteSchool': function(event) {
    if (confirm('are you sure you want to delete this school?'))
      Meteor.call('removeSchool',this._id,function(error,id){
        if (error)
          alert(error.reason)

      });
  }
})
