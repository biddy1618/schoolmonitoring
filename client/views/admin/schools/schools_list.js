Template.schoolsList.helpers({
	schools: function() {
		return Schools.find({});
	}
})