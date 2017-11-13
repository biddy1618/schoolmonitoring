Template.editStudent.helpers({
  schools: function() {
        return Schools.find()
    },
    school: function() {
        return Schools.findOne({id:this.schoolId})
    }
});

Template.editStudent.events({
    'submit form': function(event,template) {
        event.preventDefault();
        var currentStudentId = this._id;
        var kz_name = $(event.target).find('[name=kz_name]').val(),
            kz_surname = $(event.target).find('[name=kz_surname]').val(),
            en_name = $(event.target).find('[name=en_name]').val(),
            en_surname = $(event.target).find('[name=en_surname]').val(),
            birthDate = $(event.target).find('[name=birthDate]').val(),
            gender = $(event.target).find('[name=gender]').val(),
            fathersName = $(event.target).find('[name=fathersName]').val(),
            mothersName = $(event.target).find('[name=mothersName]').val(),
            address = $(event.target).find('[name=address]').val(),
            phoneNumber = $(event.target).find('[name=phoneNum]').val(),
            grade = $(event.target).find('[name=grade]').val(),
            division = $(event.target).find('[name=division]').val(),
            lang_group = $(event.target).find('[name=lang_group]').val()

        var student = {
            kz_name: kz_name,
            kz_surname: kz_surname,
            en_name: en_name,
            en_surname: en_surname,
            birthDate: birthDate,
            gender: gender,
            mothersName: mothersName,
            fathersName: fathersName,
            address: address,
            phoneNumber: phoneNumber,
            grade:grade,
            division:division,
            lang_group: lang_group
        }

        Meteor.call('updateStudent',student,currentStudentId, function(error,id) {
            if (error)
                alert(error.reason)
            else
            { Router.go('moderatorStudentsList');}
        });

    },
    'click #resetPassword': function() {
      var currentStudentId = this._id
      if (confirm('are you sure you want to reset students password?'))
      Meteor.call('resetStudentPassword',currentStudentId,function(error,id) {
        if (error)
          alert(error.reason)
        else
          alert('password reset is successfull')
      });
    },

    'click #transfer': function(event,template) {
      event.preventDefault();
      student = Students.findOne({_id:this._id})
      student.previousSchool = student.schoolId
      student.newSchool = template.find('[name=school]').value
      delete student.schoolId;
      console.log(student)
      Meteor.call('transferStudent',student,function(error){
        if (error)
          alert(error.reason)
          else
            Router.go('moderatorStudentsList')
          });
    }
});
