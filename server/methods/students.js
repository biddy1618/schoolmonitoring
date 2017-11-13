Meteor.methods({
  addStudent: function(studentAttributes) {

    var calculateGraduationYear = function(grade) {
        var currentDate = new Date();
        if (currentDate.getMonth()>7 && currentDate.getMonth()<=11)
           var grad = (11 - grade) + currentDate.getFullYear();
        else
          var grad = (11 - grade) + currentDate.getFullYear();
        return grad
      }
      //Создаем учителья от имени администратора
      // Удостоверимся что пользователь залогинен
    if (!Meteor.user())
      throw new Meteor.Error(401, "You need to login to add new student");

    if (studentAttributes.kz_name === "")
      throw new Meteor.Error(422, 'Please fill in name of the teacher');
    if (studentAttributes.kz_surname === "")
      throw new Meteor.Error(422, 'Please fill in surname');
    if (studentAttributes.en_name === "")
      throw new Meteor.Error(422, 'Please fill in name of the teacher');
    if (studentAttributes.en_surname === "")
      throw new Meteor.Error(422, 'Please fill in surname');
    if (studentAttributes.birthDate == "")
      throw new Meteor.Error(422, 'Please fill in birth date');
    if (studentAttributes.gender == "")
      throw new Meteor.Error(422, 'Please fill in the gender');
    if (studentAttributes.fathersName == "")
      throw new Meteor.Error(422, 'Please fill in the fathers name');
    if (studentAttributes.mothersName == "")
      throw new Meteor.Error(422, 'Please fill in the mothers name');
    if (studentAttributes.phoneNumber == "")
      throw new Meteor.Error(422, 'Please fill in the phone number')
    if (studentAttributes.grade == "")
      throw new Meteor.Error(422, 'Please fill in the grade');
    if (studentAttributes.lang_group == "")
      throw new Meteor.Error(422, 'Please choose language group');
    if (studentAttributes.division == '')
      throw new Meteor.Error(422, 'Please fill in the division');
    if (studentAttributes.address == "")
      throw new Meteor.Error(422, 'Please fill in the address')


    function getNextSequence(name) {
      var ret = Counters.findOne({_id:name});
      Counters.update(name,{ $inc: { seq: 1 } })
      return ret.seq;
    }

    studentAttributes._id = getNextSequence('studentId').toString();
    studentAttributes.password = 'student' + studentAttributes._id;
    studentAttributes.graduationYear = calculateGraduationYear(studentAttributes.grade);

    var studentWithSameId = Students.findOne({
      _id: studentAttributes._id
    });

    // Проверим что нет других учителей с таким же ID
    if (studentAttributes._id && studentWithSameId) {
      throw new Meteor.Error(302,
        'This teacher has already been posted',
        studentWithSameId._id);
    }

    if (Meteor.user().profile.userType == "moderator") {
      // Проверим что у учителья достаточно даных для создания
      studentAttributes.schoolId = Schools.findOne({
        userId: Meteor.userId()
      }).id;
      var userAttributes = {};
      userAttributes.username = 'student' + studentAttributes._id;
      userAttributes.password = 'student' + studentAttributes._id;
      userAttributes.profile = {
        name: studentAttributes.en_name,
        surname: studentAttributes.en_surname,
        userType: 'student'
      }

      var userWithSameId = Meteor.users.findOne({
        username:userAttributes.username
      })

      if (userAttributes.username&&userWithSameId) {
        throw new Meteor.Error(302,
        'User already exists',userWithSameId.username)
      }
      studentAttributes.userId = Accounts.createUser(userAttributes);
      // Выберем поля разрешенные для публикации
      var student = _.extend(_.pick(studentAttributes, '_id', 'userId', 'schoolId', 'kz_name', 'kz_surname', 'en_name', 'en_surname', 'birthDate', 'gender', 'fathersName', 'mothersName', 'grade', 'division', 'lang_group', 'graduationYear', 'password', 'address', 'phoneNumber', 'olympiadLesson'));

      var student_Id = Students.insert(student);
      Accounts.createUser({
        username: 'parent' + studentAttributes._id,
        password: 'parent' + studentAttributes._id,
        profile: {
          _id: studentAttributes._id,
          name: studentAttributes.en_name,
          surname: studentAttributes.en_surname,
          userType: 'parent'
        }
      });
      return student_Id
    } else
      throw new Meteor.Error(401, "You need to login to as administrator to add new student");

  },

  updateStudent: function(studentAttributes, currentStudentId) {
    // Удостоверимся что пользователь залогинен
    if (!Meteor.user())
      throw new Meteor.Error(401, "You need to login to add new school");
    var currentStudent = Students.findOne({
      _id: currentStudentId
    });
    var currentUser = Meteor.users.findOne({
      username: 'ktl' + currentStudent._id
    });
    if (studentAttributes.kz_name === "")
      throw new Meteor.Error(422, 'Please fill in name');
    if (studentAttributes.kz_surname === "")
      throw new Meteor.Error(422, 'Please fill in surname');
      if (studentAttributes.en_name === "")
        throw new Meteor.Error(422, 'Please fill in name');
        if (studentAttributes.en_surname === "")
          throw new Meteor.Error(422, 'Please fill in surname');

    if (studentAttributes.birthDate == "")
      throw new Meteor.Error(422, 'Please fill in birth date');
    if (studentAttributes.gender == "")
      throw new Meteor.Error(422, 'Please fill in the gender');
    if (studentAttributes.fathersName == "")
      throw new Meteor.Error(422, 'Please fill in the name of parents');
    if (studentAttributes.mothersName == "")
      throw new Meteor.Error(422, 'Please fill in the name of parent');
    if (studentAttributes.address == "")
      throw new Meteor.Error(422, 'Please fill in the address');
    if (studentAttributes.phoneNumber == '')
      throw new Meteor.Error(422, 'Please fill in the phoneNumber');

    if (Meteor.user().profile.userType == "moderator") {
      Students.update(currentStudentId, {
        $set: studentAttributes
      }, function(error) {
        if (error) {
          // display the error to the user
          alert(error.reason);
        } else {

        }
      });
    } else
      throw new Meteor.Error(401, "You need to login to as administrator to update student");
  },

  updateOlympiadLesson: function(currentStudentId, lessonId) {
    var currentLesson = Students.findOne({
      _id: currentStudentId
    }).olympiadLesson
    if (Meteor.user().profile.userType == "moderator") {
      if (lessonId != currentLesson) {
        var object = {};
        object.olympiadLesson = lessonId;

        Students.update(currentStudentId, {
          $set: object
        }, function(error) {
          if (error) {
            console.log(error.reason)
          }
        });
        console.log('olympiad lesson updated')
      }
    }
  },

  resetStudentPassword: function(currentStudentId) {
    if (!Meteor.user() || Meteor.user().profile.userType != 'moderator')
      throw new Meteor.Error(401, 'Please log in to the system')
    if (Meteor.user().profile.userType === "moderator") {
      var userId = Students.findOne({
          _id: currentStudentId
        }).userId,
        newPassword = 'student' + Students.findOne({
          _id: currentStudentId
        }).studentId;
      Accounts.setPassword(userId, newPassword);
      console.log('success')

    }
  },
  uploadStudents: function(data) {

    var calculateGraduationYear = function(grade) {
      var currentDate = new Date();
      if (currentDate.getMonth()>7 && currentDate.getMonth()<=11)
        var grad = (11 - grade) + currentDate.getFullYear();
      else
        var grad = (11 - grade) + currentDate.getFullYear();
      return grad
    };

    var XLSX = Meteor.npmRequire('xlsx');
    var workbook = XLSX.read(data, {
      type: 'binary'
    });
    var sheet_name_list = workbook.SheetNames;
	sheet_name_list.forEach(function(y) {
      var worksheet = workbook.Sheets[y];
	  var students = [];
	   for (z in worksheet) {
		   if (z[0] === '!') continue;
		   if (z[1]==='1') continue;
		   if (z[0]==='M'){
			   students.push({
				   kz_name: worksheet['A'+z.slice(1)].w,
				   kz_surname: worksheet['B'+z.slice(1)].w,
				   en_name: worksheet['C'+z.slice(1)].w,
				   en_surname: worksheet['D'+z.slice(1)].w,
				   birthDate: worksheet['E'+z.slice(1)].w,
				   gender: worksheet['F'+z.slice(1)].w,
				   fathersName: worksheet['G'+z.slice(1)].w,
				   mothersName: worksheet['H'+z.slice(1)].w,
				   address: worksheet['I'+z.slice(1)].w,
				   phoneNumber: worksheet['J'+z.slice(1)].w,
				   grade: worksheet['K'+z.slice(1)].w,
				   division: worksheet['L'+z.slice(1)].w,
				   lang_group: worksheet['M'+z.slice(1)].w	 
			   })
		   } 
       }

	 students.forEach(function(studentAttributes){
       function getNextSequence(name) {
         var ret = Counters.findOne({_id:name});
         Counters.update(name,{ $inc: { seq: 1 } })
         return ret.seq;
       }
       studentAttributes._id = getNextSequence('studentId').toString();
       studentAttributes.password = 'student' + studentAttributes._id;
       studentAttributes.graduationYear = calculateGraduationYear(studentAttributes.grade);
       studentAttributes.olympiadLesson = '-1';

       var studentWithSameId = Students.findOne({
         _id: studentAttributes._id
       });
       // Проверим что нет других учителей с таким же ID
       if (studentAttributes._id && studentWithSameId) {
         throw new Meteor.Error(302,
             'This teacher has already been posted',
             studentWithSameId._id);
       }

       if (Meteor.user().profile.userType == "moderator") {
         // Проверим что у учителья достаточно даных для создания
         studentAttributes.schoolId = Schools.findOne({
           userId: Meteor.userId()
         }).id;
         var userAttributes = {};
         userAttributes.username = 'student' + studentAttributes._id;
         userAttributes.password = 'student' + studentAttributes._id;
         userAttributes.profile = {
           name: studentAttributes.en_name,
           surname: studentAttributes.en_surname,
           userType: 'student'
         }

         var userWithSameId = Meteor.users.findOne({
           username:userAttributes.username
         })

         if (userAttributes.username&&userWithSameId) {
           throw new Meteor.Error(302,
               'User already exists',userWithSameId.username)
         }

         studentAttributes.userId = Accounts.createUser(userAttributes);

         var student_Id = Students.insert(studentAttributes);
         Accounts.createUser({
           username: 'parent' + studentAttributes._id,
           password: 'parent' + studentAttributes._id,
           profile: {
             _id: studentAttributes._id,
             name: studentAttributes.en_name,
             surname: studentAttributes.en_surname,
             userType: 'parent'
           }
         });

       } else
         throw new Meteor.Error(401, "You need to login to as administrator to add new student");
     });
    });
  }
});
