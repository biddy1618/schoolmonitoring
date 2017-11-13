Template.teacherItem.helpers({
	school:function() {
	return Schools.findOne({id:this.schoolId}).short_kz_name
	},
	branch: function() {
		return Branches.findOne({id:this.branch})
	},
    notverified: function() {
    	if (!this.verified)
    		return true
    }
});

Template.teacherItem.events({
	'click #acceptTeacher': function(){
		var currentTeacherId=this._id;
		if (confirm("Are you sure you wanna add this user to database!") == true) {
			Meteor.call('verifyTeacher',currentTeacherId, function(error){
				if (error)
					alert(error.reason)
			} );
		} else {
		}

	},
	'click #denyTeacher':function(){
            alert('denied')
	}
})
