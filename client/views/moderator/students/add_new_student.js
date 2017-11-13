Template.addStudent.helpers({
    lessons: function() {
        return Branches.find()
    }
});

Template.addStudent.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var kz_name = $(event.target).find('[name=kz_name]').val();
        var kz_surname = $(event.target).find('[name=kz_surname]').val();
        var en_name = $(event.target).find('[name=en_name]').val();
        var en_surname = $(event.target).find('[name=en_surname]').val();
        var birthDate = $(event.target).find('[name=birthDate]').val();
        var birthMonth = $(event.target).find('[name=birthMonth]').val();
        var birthYear = $(event.target).find('[name=birthYear]').val();
        var gender = $(event.target).find('[name=gender]').val();
        var fathersName = $(event.target).find('[name=fathersName]').val();
        var mothersName = $(event.target).find('[name=mothersName]').val();
        var address = $(event.target).find('[name=address]').val();
        var phoneNumber = $(event.target).find('[name=phoneNum]').val();
        var grade = $(event.target).find('[name=grade]').val();
        var lang_group = $(event.target).find('[name=lang_group]').val();
        var division = $(event.target).find('[name=division]').val();
        var olympiadLesson = $(event.target).find('[name=olympiadLesson]').val();


        var student = {
            kz_name: kz_name,
            kz_surname: kz_surname,
            en_name: en_name,
            en_surname: en_surname,
            birthDate: birthDate+'.'+birthMonth+'.'+birthYear,
            gender: gender,
            fathersName: fathersName,
            mothersName: mothersName,
            address: address,
            phoneNumber: phoneNumber,
            grade: grade,
            lang_group: lang_group,
            division: division,
            olympiadLesson:olympiadLesson
        }
       console.log(student)
       Meteor.call('addStudent', student, function(error, id) {
           if (error)
               return alert(error.reason);

            Router.go('moderatorStudentsList');
        });
    },
    'click #cancel': function() {
        Router.go('moderatorStudentsList');
    }
});
