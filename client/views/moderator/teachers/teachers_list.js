Template.moderatorTeachersList.helpers({
    teachers: function () {
        return Teachers.find()
    }
})