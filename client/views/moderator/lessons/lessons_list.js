Template.moderator_lessons_list.helpers({
	lessons: function() {
		return Branches.find();
	}
})
