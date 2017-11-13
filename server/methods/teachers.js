/**
 * Created by dauletkaliuly on 11/14/14.
 */
Meteor.methods({
    addTeacher: function(teacherAttributes) {

        var generatePassword = function() {
            var password = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 6; i++)
                password += possible.charAt(Math.floor(Math.random() * possible.length));

            return password;
        };
        //Создаем учителья от имени администратора
        // Удостоверимся что пользователь залогинен
        if (!Meteor.user())
            throw new Meteor.Error(401, "You need to login to add new teacher");
        //проверяем хватает ли данных для создания юзера
        if (teacherAttributes.name === "")
            throw new Meteor.Error(422, 'Please fill in name of the teacher');
        if (teacherAttributes.surname === "")
            throw new Meteor.Error(422, 'Please fill in surname');
        if (teacherAttributes.birthDate == "")
            throw new Meteor.Error(422, 'Please fill in birth date');
        if (teacherAttributes.gender == "")
            throw new Meteor.Error(422, 'Please fill in the gender');
        if (teacherAttributes.graduateOf == "")
            throw new Meteor.Error(422, 'Please fill in the graduation school');
        if (teacherAttributes.branch == "")
            throw new Meteor.Error(422, 'Please fill in the branch');
        if (teacherAttributes.lessonTime == "")
            throw new Meteor.Error(422, 'Please fill in the lesson time');
        if (teacherAttributes.email == '')
            throw new Meteor.Error(422, 'Please fill in the email');

        function getNextSequence(name) {
            var ret = Counters.findOne({_id:name});
            Counters.update(name,{ $inc: { seq: 1 } })
            return ret.seq;
        }
        //вытаскиваем ID из базы
        teacherAttributes._id = getNextSequence('teacherId').toString();

        var teacherWithSameId = Teachers.findOne({_id: teacherAttributes._id});
        // Проверим что нет других учителей с таким же ID
        if (teacherAttributes._id && teacherWithSameId) {
            throw new Meteor.Error(302,
                'This teacher has already been posted',
                teacherWithSameId._id);
        }

        if (Meteor.user().profile.userType=="moderator") {
            teacherAttributes.schoolId=Schools.findOne({userId:Meteor.userId()}).id;
            var userAttributes = {};
            userAttributes.username = 'ktl' + teacherAttributes._id;
            userAttributes.email = teacherAttributes.email;
            userAttributes.password = teacherAttributes.password;
            userAttributes.profile = {
                name: teacherAttributes.name,
                surname: teacherAttributes.surname,
                userType: 'teacher'
            }

            teacherAttributes.userId = Accounts.createUser(userAttributes);
            // Выберем поля разрешенные для публикации
            var teacher = _.extend(_.pick(teacherAttributes, '_id', 'userId', 'name', 'surname', 'birthDate', 'gender', 'graduateOf', 'branch', 'lessonTime', 'schoolId', 'email', 'moderator', 'gorev', 'password'));

            var teacher_Id = Teachers.insert(teacher);
            if (teacher_Id) {
                console.log('teacher added:' + teacherAttributes.email);
                return teacher_Id;
            }
        } else
            throw new Meteor.Error(401, "You need to login to as administrator to add new teacher");

    },

    updateTeacher: function(teacherAttributes, currentTeacherId) {
        // Удостоверимся что пользователь залогинен
        if (!Meteor.user())
            throw new Meteor.Error(401, "You need to login to add new teacher");
        var currentTeacher = Teachers.findOne({_id:currentTeacherId});
        var currentUser = Meteor.users.findOne({username:'ktl'+currentTeacher.teacherId});
        if (teacherAttributes.name === "")
            throw new Meteor.Error(422, 'Please fill in name of the teacher');
        if (teacherAttributes.surname === "")
            throw new Meteor.Error(422, 'Please fill in surname');
        if (teacherAttributes.birthDate == "")
            throw new Meteor.Error(422, 'Please fill in birth date');
        if (teacherAttributes.gender == "")
            throw new Meteor.Error(422, 'Please fill in the gender');
        if (teacherAttributes.graduateOf == "")
            throw new Meteor.Error(422, 'Please fill in the graduation school');
        if (teacherAttributes.branch == "")
            throw new Meteor.Error(422, 'Please fill in the branch');
        if (teacherAttributes.lessonTime == "")
            throw new Meteor.Error(422, 'Please fill in the lesson time');
        if (teacherAttributes.schoolId == '')
            throw new Meteor.Error(422, 'Please fill in the school');
        if (teacherAttributes.email == '')
            throw new Meteor.Error(422, 'Please fill in the email');

        if (Meteor.user().profile.userType=='moderator')
            Teachers.update(currentTeacherId, {
                $set: teacherAttributes
            }, function(error) {
                if (error) {
                    // display the error to the user
                    alert(error.reason);
                } else {


                }
            });
        else
            throw new Meteor.Error(401, "You need to login to as administrator to update teacher");
    }
});
