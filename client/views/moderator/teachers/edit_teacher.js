Template.editTeacher.helpers({
    lessons: function () {
        return Branches.find()
    },
    branchName: function() {
      return Branches.findOne({id:this.branch})
    },

    schools: function() {
      return Schools.find()
    }

});

Template.editTeacher.events({
    'submit form': function (event, template) {
        event.preventDefault();
        var currentTeacherId = this._id;
        var name = $(event.target).find('[name=name]').val(),
            surname = $(event.target).find('[name=surname]').val(),
            birthDate = $(event.target).find('[name=birthDate]').val(),
            gender = $(event.target).find('[name=gender]').val(),
            graduateOf = $(event.target).find('[name=graduateOf]').val(),
            branch = $(event.target).find('[name=branch]').val(),
            lessonTime = $(event.target).find('[name=lessonTime]').val(),
            email = $(event.target).find('[name=email]').val(),
            gorev = $(event.target).find('[name=gorev]').val();

        var teacher = {
            name: name,
            surname: surname,
            birthDate: birthDate,
            gender: gender,
            email: email,
            graduateOf: graduateOf,
            branch: branch,
            lessonTime: lessonTime,
            gorev: gorev,
        }

        Meteor.call('updateTeacher', teacher, currentTeacherId, function (error, id) {
            if (error)
                alert(error.reason)
            else {
                Router.go('moderatorTeachersList');
            }
        });

    },
    'click #confirmDelete': function (e) {

        var currentTeacherId = this._id;
        Teachers.remove(currentTeacherId);
        Router.go('teachersList');

    },

    'click #transfer': function(event,template) {
      event.preventDefault();
      teacher = Teachers.findOne({_id:this._id})
      teacher.previousSchool = teacher.schoolId
      teacher.newSchool = template.find('[name=school]').value
      delete teacher.schoolId;
      console.log(teacher)
      Meteor.call('transferTeacher',teacher,function(error){
        if (error)
          alert(error.reason)
          else
            Router.go('moderatorTeachersList')
          });
        }
});
