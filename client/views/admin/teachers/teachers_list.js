Template.teachersList.helpers({
	teachers: function() {
		return Teachers.find()
	}
})