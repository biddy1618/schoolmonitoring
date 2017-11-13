Template.moderatorStudentItem.helpers({
	branch: function() {
		return Branches.findOne({id:this.branch})
	},
	school: function() {
		return Schools.findOne({id:this.schoolId})
	},
	notOlympiad: function() {
		return Students.findOne({_id:this._id}).olympiadLesson==='-1'
	},
	lessons: function() {
		Array.prototype.move = function (old_index, new_index) {
			if (new_index >= this.length) {
				var k = new_index - this.length;
				while ((k--) + 1) {
					this.push(undefined);
				}
			}
			this.splice(new_index, 0, this.splice(old_index, 1)[0]);
			return this; // for testing purposes
		};

		var l = Branches.find().fetch();
			cl = Students.findOne({_id:this._id}).olympiadLesson;
	if (cl!='-1'){
		    x=l.filter(function(lesson){return lesson.id==cl});
			l.move(l.indexOf(x[0]),0)
		}
		return l
	}
});

Template.moderatorStudentItem.events({
	'click #delete': function(){
		var currentTeacherId=this._id;
		if (confirm("Are you sure you wanna add this user to database!") == true) {
			Meteor.call('verifyTeacher',currentTeacherId, function(error){
				if (error)
					alert(error.reason)
			} );
		} else {
		}

	},
	'change #olympiadLesson': function(event,template) {
		var lesson = template.find('[name=lesson]').value
		console.log(this._id)
		Meteor.call('updateOlympiadLesson', this._id, lesson, function(error) {
			if (error) {
				alert(error.reason)
			}
		})
		console.log(lesson)

	}
});
