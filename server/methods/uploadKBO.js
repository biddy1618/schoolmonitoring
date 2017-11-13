/**
 * Created by dauletkaliuly on 12/9/14.
 */
Meteor.methods({
  uploadKBO: function(answerArr, academicYear, kboNo) {
    function checkKbo(answers, keys) {
        result = 0;
        for (var i = 0; i < answers.length; i++) {
          if (answers[i] == keys[i])
            result += 1
        }
        return result
      }

    errors = []
    school = Schools.findOne({
      userId: Meteor.userId()
    })
    answerArr.forEach(function(element) {
      answerObj = {
        academicYear: academicYear,
        kboNo: kboNo,
        variant: element.slice(8, 12),
        studentId: parseInt(element.slice(3, 8)),
        answers: element.slice(39),
      };
      student = Students.findOne({
        studentId: answerObj.studentId
      });
      kboKeys = KBOKeys.findOne({
        academicYear: answerObj.academicYear,
        kboNo: answerObj.kboNo,
        variant: answerObj.variant
      });

      if (student == undefined) {
        msg = 'Student not found! Check whether students id is correct or not:' + answerObj.studentId
        errors.push(msg)
        return;
      } else if (student.schoolId != school.id) {
        msg = 'Student not found! Check whether students id is correct or not:' + answerObj.studentId
        errors.push(msg)
        return;
      } else if (kboKeys == undefined) {
        msg = 'Variant of this student is not correct:' + answerObj.studentId
        errors.push(msg);
        return
      }
      answerObj.grade = student.grade;
      answerObj.division = student.division;
      answerObj.schoolId = school.id;
      answerObj.branch = kboKeys.lesson

      answerObj.result = checkKbo(answerObj.answers,kboKeys.keys)

      studentAnswers = KBOResults.find({
        academicYear: answerObj.academicYear,
        kboNo: answerObj.kboNo,
        studentId: answerObj.studentId
      }).count();

      if (studentAnswers == 0)
        KBOResults.insert(answerObj);
      else {
        studentAnswerId = GDSResults.findOne({
          academicYear: answerObj.academicYear,
          kboNo: answerObj.kboNo,
          studentId: answerObj.studentId
        })._id
        KBOResults.update(studentAnswerId, answerObj)
      }


    });
    return errors
  }
});
