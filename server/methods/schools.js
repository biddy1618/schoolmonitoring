/**
 * Created by dauletkaliuly on 11/17/14.
 */
Meteor.methods({
    addSchool: function (schoolAttributes) {
        var schoolWithSameId = Schools.findOne({id: schoolAttributes.id});

        // Удостоверимся что пользователь залогинен
        if (!Meteor.user())
            throw new Meteor.Error(401, "You need to login to add new school");

        // Проверим что у школы есть название
        if (schoolAttributes.full_kz_name === "")
            throw new Meteor.Error(422, 'Please fill in name of the school');
        if (schoolAttributes.short_kz_name === "")
            throw new Meteor.Error(422, 'Please fill in the short name of the school');
        if (schoolAttributes.eng_name === "")
            throw new Meteor.Error(422, 'Please fill in the english name of the school');
        if (schoolAttributes.email === "")
            throw new Meteor.Error(422, 'Please fill in the email field')
        // Проверим что у школы  есть ID
        if (schoolAttributes.id === "")
            throw new Meteor.Error(422, 'Please fill in id');

        // Проверим что нет других школ с таким же ID
        if (schoolAttributes.id && schoolWithSameId) {
            throw new Meteor.Error(302,
                'This school has already been posted',
                schoolWithSameId.id);
        }

        // Выберем поля разрешенные для публикации
        if (Meteor.user().profile.userType == 'admin') {

            var userAttributes = {};
            userAttributes.username = 'katev' + schoolAttributes.id;
            userAttributes.email = schoolAttributes.email;
            userAttributes.password = 'katev' + schoolAttributes.id;
            userAttributes.profile = {
                userType: 'moderator'
            }
            schoolAttributes.userId = Accounts.createUser(userAttributes);
            var school = _.extend(_.pick(schoolAttributes, 'full_kz_name', 'short_kz_name', 'eng_name', 'email', 'id','userId'));
            schoolId = Schools.insert(school);

            return schoolId;
        } else
            throw new Meteor.Error(401, 'You need to login as administrator')
    },
    updateSchool: function (schoolAttributes,currentSchoolId) {
        var schoolWithSameId = Schools.findOne({id: schoolAttributes.id});
        // Удостоверимся что пользователь залогинен
        if (!Meteor.user())
            throw new Meteor.Error(401, "You need to login to add new school");

        // Проверим что у школы есть название
        if (schoolAttributes.full_kz_name === "")
            throw new Meteor.Error(422, 'Please fill in name of the school');
        if (schoolAttributes.short_kz_name === "")
            throw new Meteor.Error(422, 'Please fill in the short name of the school');
        if (schoolAttributes.eng_name === "")
            throw new Meteor.Error(422, 'Please fill in the english name of the school');
        if (schoolAttributes.email === "")
            throw new Meteor.Error(422, 'Please fill in the email field')
        // Проверим что у школы  есть ID
        if (schoolAttributes.id === "")
            throw new Meteor.Error(422, 'Please fill in id');

        // Проверим что нет других школ с таким же ID
        // if (schoolAttributes.id && schoolWithSameId) {
        //   throw new Meteor.Error(302,
        //     'This school has already been posted',
        //     schoolWithSameId.id);
        // }
        if (Meteor.user().profile.userType === 'moderator' || Meteor.user().profile.userType === 'admin') {
            var school = _.extend(_.pick(schoolAttributes,'full_kz_name','short_kz_name','eng_name','email'));
            Schools.update(currentSchoolId, {$set: school}, function (error) {
                if (error) {
                    // display the error to the user
                    alert(error.reason);
                } else {

                }
            });
        } else
            throw new Meteor.Error(301, "You need to login as admin to edit school")
    },
    removeSchool: function(schoolId) {
        var school = Schools.findOne({_id:schoolId});
        Meteor.users.remove(school.userId)
        Schools.remove(schoolId)
    },
    resetSchoolPassword: function(currentSchoolId) {
      if (!Meteor.user()||Meteor.user().profile.userType!='admin')
        throw new Meteor.Error(401,'Please log in to the system')
      if (Meteor.user().profile.userType==="admin") {
          var userId = Schools.findOne({_id:currentSchoolId}).userId,
              newPassword = 'katev'+Schools.findOne({_id:currentSchoolId}).id;
          Accounts.setPassword(userId, newPassword);
          console.log('success')

        }
    }
});
