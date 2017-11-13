Meteor.methods({
  'transferStudent': function(obj) {
    if (!Meteor.user())
      throw new Meteor.Error(401, "You need to login to add lesson");

    schoolId = Schools.findOne({userId:Meteor.userId()}).id

    if (Meteor.user().profile.userType == 'moderator'&& schoolId===obj.previousSchool) {
        transferId = StudentTransfer.insert(obj)
        if (transferId)
          Students.remove(obj._id)
        return transferId
    }
  },
//////////////////////
  'acceptStudent': function(_id) {
      student = StudentTransfer.findOne({_id:_id});
      student.schoolId = student.newSchool;
      delete student.newSchool;
      delete student.previousSchool;
      student_id = Students.insert(student);

      if (student_id){
        StudentTransfer.remove(_id)
        return student_id
        }

  },
//////////////////////
  'declineStudent': function(_id) {
      student = StudentTransfer.findOne({_id:_id});
      student.schoolId = student.previousSchool;
      delete student.newSchool;
      delete student.previousSchool;
      student_id = Students.insert(student)

      if (student_id) {
        StudentTransfer.remove(_id)
        return student_id
      }
  },
/////////////////////
  'transferTeacher': function(obj) {
    if (!Meteor.user())
      throw new Meteor.Error(401, "You need to login to transfer teacher");

      schoolId = Schools.findOne({userId:Meteor.userId()}).id

      if (Meteor.user().profile.userType == 'moderator'&& schoolId===obj.previousSchool) {
        transferId = TeacherTransfer.insert(obj)
        if (transferId)
          Teachers.remove(obj._id)
          return transferId
        }
      },
///////////////////
      'acceptTeacher': function(_id) {
        teacher = TeacherTransfer.findOne({_id:_id});
        teacher.schoolId = teacher.newSchool;
        delete teacher.newSchool;
        delete teacher.previousSchool;
        teacher_id = Teachers.insert(teacher);

        if (teacher_id){
          TeacherTransfer.remove(_id)
          return teacher_id
        }

      },
/////////////////////
      'declineTeacher': function(_id) {
        teacher = TeacherTransfer.findOne({_id:_id});
        teacher.schoolId = teacher.previousSchool;
        delete teacher.newSchool;
        delete teacher.previousSchool;
        teacher_id = Teachers.insert(teacher)

        if (teacher_id) {
          TeacherTransfer.remove(_id)
          return teacher_id
        }
      },
})
