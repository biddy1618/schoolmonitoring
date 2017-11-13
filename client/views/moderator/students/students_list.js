Template.moderatorStudentsList.rendered = function() {
	Session.set('filter_name','');
	Session.set('filter_surname','');
	Session.set('filter_grade','');
	Session.set('filter_division','');
	Session.set('filter_olympiad','');
}
Template.moderatorStudentsList.helpers({
	students: function() {
		return Students.find({
			en_name: new RegExp(Session.get('filter_name')),
			en_surname: new RegExp(Session.get('filter_surname')),
			grade: new RegExp(Session.get('filter_grade')),
			division: new RegExp(Session.get('filter_division')),
			olympiadLesson: new RegExp(Session.get('filter_olympiad')),
		},{name:1})
	}
});

Template.moderatorStudentsList.events({
	'change #filter_grade':function (event,template) {
		grade = template.find('[name=filter_grade]').value;

		Session.set('filter_grade',grade.slice(0,-1))
		Session.set('filter_division',grade.slice(-1))
	},

	'keyup #filter_name': function(event,template) {
		Session.set('filter_name',template.find('[name=filter_name]').value)
	},

	'keyup #filter_surname': function(event,template) {
		Session.set('filter_surname',template.find('[name=filter_surname]').value)
	},

	'click #student-upload': function(event, template) {
		event.preventDefault()
		var file = template.find('#file').files[0];
		if (file)
			console.log('file uloaded')
			else
				{
					alert('No file was selected')
					//throw new Error("Select file")
				}
				var reader = new FileReader();
				reader.onload = function(e){
					var data = reader.result;



					 Meteor.call('uploadStudents',data, function(error,errors) {
					 	if (error)
					 		alert(error.reason)
					 		else
					 			alert('GDS results are added')
					 			if (errors)
					 				errors.forEach(function(err){
					 					Errors.insert({reason:err})
					 				})
					 			});
							};
							reader.readAsBinaryString(file);
	}
})
