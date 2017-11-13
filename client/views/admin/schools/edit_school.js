Template.editSchool.helpers({

});
Template.editSchool.events({
	'submit form': function(event,template) {
      event.preventDefault();
        var  currentSchoolId = this._id
        alert(currentSchoolId)
        var full_kz_name = $(event.target).find('[name=full_kz_name]').val(),
            short_kz_name=$(event.target).find('[name=short_kz_name]').val(),
            eng_name=$(event.target).find('[name=eng_name]').val(),
            email=$(event.target).find('[name=email]').val();

        var school = {
            full_kz_name:full_kz_name,
            short_kz_name: short_kz_name,
            eng_name: eng_name,
            email: email
        };

        Meteor.call('updateSchool',school,currentSchoolId, function(error,id) {
        	if (error)
        		alert(error.reason)
        	else
            { Router.go('schoolsList');}
        });

    },
	'click #confirmDelete': function(e) {

      var currentSchoolId = this._id;
      Schools.remove(currentSchoolId);
      Router.go('schoolsList');

  },
  'click #deleteSchool': function() {
		$('#modal').modal();
	},
	'click #resetPassword': function() {
		var currentSchoolId = this._id
		if (confirm('are you sure you want to reset students password?'))
		Meteor.call('resetSchoolPassword',currentSchoolId,function(error,id) {
			if (error)
				alert(error.reason)
			else
				alert('password reset is successfull')
		});
	}
});
