/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.worldOlympiadStudentItem.events({
    'click #add': function(event,template) {
        var resultAttributes = {
            academicYear: Session.get('academicYear'),
            studentId: this.studentId,
            schoolId: this.schoolId,
            name:this.name,
            surname: this.surname,
            branch: this.branch,
            grade: this.grade,
            prize: template.find('[name=prize]').value,
            absolutePlace: template.find('[name=absolute]').value,
            teacherId: this.teacherId
        };
        console.log(resultAttributes)
        Meteor.call('addWorldOlympiadResult',resultAttributes, function(error) {
            if (error)
                alert(error.reason)
            else
            {
                alert('result posted')
            }
        })
    }
});

Template.worldOlympiadStudentItem.helpers({
    posted: function() {
        worldResults = WorldOlympiad.find().fetch();
        worldResults = worldResults.map(function(obj) {return obj.studentId});

        if (worldResults.indexOf(this.studentId)!=-1)
            return true
        else
            return false
    },
    teacher: function() {
        return Teachers.findOne({teacherId:parseInt(this.teacherId)});
    }
});