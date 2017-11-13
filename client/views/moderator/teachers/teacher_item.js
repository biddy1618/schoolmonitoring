Template.moderatorTeacherItem.helpers({
    school: function () {
        return Schools.findOne({id: this.schoolId})
    },
    branch: function () {
        return Branches.findOne({id: this.branch})
    }
});

Template.moderatorTeacherItem.events({

})
