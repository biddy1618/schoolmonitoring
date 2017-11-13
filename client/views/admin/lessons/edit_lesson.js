Template.editLesson.events({
	'click #save': function(event,template) {
      event.preventDefault();
        var currentLessonId = this._id;
        var lesson = {
            name: template.find('#inputLesson').value,
            id: template.find('#inputLessonNumber').value
        }
        
        Meteor.call('updateLesson',lesson,currentLessonId, function(error,id) {
        	if (error)
        		alert(error.reason)
        	else
            { Router.go('lessonsList');}
        });
	  
    },
	'click #confirmDelete': function(e) {
     
      var lessonSchoolId = this._id;
      Branches.remove(currentLessonId);
      Router.go('lessonsList');

  },
  'click #deleteLesson': function() {
		$('#modal').modal();
	}
});