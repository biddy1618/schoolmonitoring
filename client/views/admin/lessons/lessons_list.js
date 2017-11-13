Template.lessonsList.helpers({
	lessons: function() {
		return Branches.find();
	}
})