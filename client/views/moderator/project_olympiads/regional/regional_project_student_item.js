/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.regionalProjectStudentItem.events({
    'click #add': function(event,template) {
        var resultAttributes = {
            academicYear: Session.get('academicYear'),
            studentId: this.studentId,
            schoolId: this.schoolId,
            name:this.name,
            surname: this.surname,
            branch: template.find('[name=branch]').value,
            grade:this.grade,
            attendedFor: template.find('[name=class]').value,
            prize: template.find('[name=prize]').value,
            absolutePlace: template.find('[name=absolute]').value,
            teacherId: template.find('[name=teacherId]').value
        };

        Meteor.call('addRegionalProjectResult',resultAttributes, function(error) {
            if (error)
                alert(error.reason)
            else
            {
                alert('result posted')
            }
        })
    }
});

Template.regionalProjectStudentItem.helpers({
    posted: function() {
        oblusResults = RegionalProject.find().fetch();
        oblusResults = oblusResults.map(function(obj) {return obj.studentId});
        if (oblusResults.indexOf(this.studentId)!=-1)
            return true
        else
            return false
    },
    teachers: function() {
        return Teachers.find()
    },
    lessons: function() {
        return Branches.find()
    },
    grades: function() {
        Array.prototype.move = function (old_index, new_index) {
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            return this; // for testing purposes
        };

        var l = [{grade:7},{grade:8},{grade:9},{grade:10},{grade:11}]
        cl = Students.findOne({_id:this._id}).grade;
        if (cl!='-1'){
            x=l.filter(function(grade){return grade.grade==cl});
            l.move(l.indexOf(x[0]),0)
        }
        return l
    }
});