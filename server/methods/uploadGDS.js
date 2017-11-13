/**
 * Created by dauletkaliuly on 12/9/14.
 */
Meteor.methods({
    uploadGDS: function(answerArr,academicYear,gdsNo) {
        function checkGds(answers, keys) {
            result = 0;
            for (var i = 0; i < answers.length; i++) {
                if (answers[i] == keys[i])
                    result += 1
            }
            return result
        }
        /*answerObj.answers.forEach(function(lesson) {
            answerKeys = gdsKeys[lesson.id]
            lesson.results = checkGds(answerKeys,lesson.keys)
        })
         */
        errors=[]
        school = Schools.findOne({userId:Meteor.userId()})
        answerArr.forEach(function(element) {
            answerObj = {
                academicYear: academicYear,
                gdsNo: gdsNo,
                variant: element.slice(8, 12),
                studentId: parseInt(element.slice(3, 8)),
                answers: [],
            };
            student = Students.findOne({studentId:answerObj.studentId});
            gdsKeys = GDSKeys.findOne({
                academicYear: answerObj.academicYear,
                gdsNo: answerObj.gdsNo,
                variant: answerObj.variant
            });

            if (student==undefined)
              { msg = 'Student not found! Check whether students id is correct or not:'+answerObj.studentId
                errors.push(msg)
                return;}
            else if (student.schoolId!=school.id)
              { msg = 'Student not found! Check whether students id is correct or not:'+answerObj.studentId
              errors.push(msg)
              return;}
            else if (gdsKeys==undefined)
              {
                msg = 'Variant of this student is not correct:'+answerObj.studentId
                errors.push(msg);
                return
              }
            answerObj.grade = student.grade;
            answerObj.division = student.division;
            answerObj.schoolId = school.id;
            studentAnswers = element.slice(39)
            console.log('awesooome:'+answerObj.studentId)

            gdsLessons = GdsLessons.find({day:gdsKeys.day}).fetch().sort({from:-1});
            answerObj.day = gdsKeys.day;

                gdsLessons.forEach(function(lesson) {
                    var lessonObj={};
                    lessonObj.lessonId=lesson.lessonId;
                    lessonObj.keys = studentAnswers.slice(lesson.from-1,lesson.to)
                    answerObj.answers.push(lessonObj);
                })
                console.log(answerObj.answers)

                answerObj.answers.forEach(function (lesson) {
                  if (lesson.lessonId=='06' && student.lang_group=='kaz')
                      lesson.result = checkGds(gdsKeys[lesson.lessonId]['kaz'],lesson.keys)
                  else if (lesson.lessonId=='06' && student.lang_group=='rus')
                      lesson.result = checkGds(gdsKeys[lesson.lessonId]['rus'],lesson.keys)
                  else
                    lesson.result = checkGds(gdsKeys[lesson.lessonId], lesson.keys)
                });

                studentAnswers = GDSResults.find({
                  academicYear: answerObj.academicYear,
                  gdsNo: answerObj.gdsNo,
                  day: gdsKeys.day,
                  studentId: answerObj.studentId
                }).count();

                if (studentAnswers == 0)
                    GDSResults.insert(answerObj);
                else {
                    studentAnswerId = GDSResults.findOne({
                      academicYear: answerObj.academicYear,
                      gdsNo: answerObj.gdsNo,
                      day: gdsKeys.day,
                      studentId: answerObj.studentId
                    })._id
                    GDSResults.update(studentAnswerId,answerObj)
                }


        });
        return errors
    }
});
