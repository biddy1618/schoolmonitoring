Template.moderatorAddTeacher.helpers({
    lessons: function () {
        return Branches.find()
    },
    schools: function () {
        return Schools.find()
    }
});

Template.moderatorAddTeacher.events({
    'submit form': function (event, template) {
        event.preventDefault();
        var name = $(event.target).find('[name=name]').val();
        var surname = $(event.target).find('[name=surname]').val();
        var birthDate = $(event.target).find('[name=birthDate]').val();
        var gender = $(event.target).find('[name=gender]').val();
        var graduateOf = $(event.target).find('[name=graduateOf]').val();
        var branch = $(event.target).find('[name=branch]').val();
        var lessonTime = $(event.target).find('[name=lessonTime]').val();
        var email = $(event.target).find('[name=email]').val();
        var gorev = $(event.target).find('[name=gorev]').val();

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
        console.log(teacher)
        Meteor.call('addTeacher', teacher, function (error, id) {
            if (error)
                return alert(error.reason);

            Router.go('moderatorTeachersList');
        });
    },
    'click #cancel': function () {
        Router.go('moderatorTeachersList');
    }
});