/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.regionalOlympiadStudentItem.events({
    'click #add': function(event,template) {
        var resultAttributes = {
            academicYear: Session.get('academicYear'),
            studentId: this.studentId,
            schoolId: this.schoolId,
            name:this.name,
            surname: this.surname,
            branch: this.olympiadLesson,
            grade:this.grade,
            attendedFor: template.find('[name=class]').value,
            prize: template.find('[name=prize]').value,
            absolutePlace: template.find('[name=absolute]').value,
            teacherId: template.find('[name=teacherId]').value
        };

        Meteor.call('addRegionalOlympiadResult',resultAttributes, function(error) {
            if (error)
                alert(error.reason)
            else
            {
                alert('result posted')
            }
        })
    }
});

Template.regionalOlympiadStudentItem.helpers({
    posted: function() {
        oblusResults = RegionalOlympiad.find().fetch();
        oblusResults = oblusResults.map(function(obj) {return obj.studentId});
        if (oblusResults.indexOf(this.studentId)!=-1)
            return true
        else
            return false
    },
    teachers: function() {
        return Teachers.find({branch:this.olympiadLesson})
    },
    lesson: function() {
        return Branches.findOne({id:this.olympiadLesson}).name
    }
});