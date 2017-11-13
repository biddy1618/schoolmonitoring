/**
 * Created by dauletkaliuly on 12/8/14.
 */
GDSKeys = new Meteor.Collection('gdsKeys');

GDSKeys.allow({
    insert: function() {
        return true
    }
})

/*answerKey={
    academicYear:'2014-2015',
    gdsNo:'1',
    day:'1',
    variant:'1212',
    '01':'ACBADBADBCBCADBDBCAB',
    '02':'DBCADABCDABDCBC',

}
studentAnswer ={
    academicYear:'2014-2015',
    studentId:10000,
    gdsNo:1,
    variant:'1212',
    answers:[{id:'01',keys:'ACDBABBDCAABD',correct:12},{id:'02',keys:'ACDBABBDCAABD',correct:22},{id:'03',keys:'ACDBABBDCAABD',correct:22},{id:'04',keys:'ACDBABBDCAABD',correct:22}
}

lesson_order = {
    day: 1
    lessonId:'01',
    order: 3,
    quiestions: 20
}

*/

