Template.studentsList.rendered = function() {
	Session.set('filter_name','');
	Session.set('filter_surname','');
	Session.set('filter_grade','');
	Session.set('filter_schoolId','');
}
Template.studentsList.helpers({
	students: function() {
		return Students.find({
			name: new RegExp(Session.get('filter_name')),
			surname: new RegExp(Session.get('filter_surname')),
			grade: new RegExp(Session.get('filter_grade')),
			schoolId: new RegExp(Session.get('filter_schoolId')),
			})
	}
});
