/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.republicOlympiadStudentItem.events({
    'click #add': function(event,template) {
        var resultAttributes = {
            academicYear: Session.get('academicYear'),
            studentId: this.studentId,
            schoolId: this.schoolId,
            name:this.name,
            surname: this.surname,
            branch: this.branch,
            grade: this.grade,
            attendedFor: this.attendedFor,
            prize: template.find('[name=prize]').value,
            absolutePlace: template.find('[name=absolute]').value,
            teacherId: this.teacherId
        };
        console.log(resultAttributes)
        Meteor.call('addRepublicOlympiadResult',resultAttributes, function(error) {
            if (error)
                alert(error.reason)
            else
            {
                alert('result posted')
            }
        })
    }
});

Template.republicOlympiadStudentItem.helpers({
    posted: function() {
        republicResults = RepublicOlympiad.find().fetch();
        republicResults = republicResults.map(function(obj) {return obj.studentId});

        if (republicResults.indexOf(this.studentId)!=-1)
            return true
        else
            return false
    },
    teacher: function() {
        return Teachers.findOne({teacherId:parseInt(this.teacherId)});
    }
});