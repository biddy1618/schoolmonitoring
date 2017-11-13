Meteor.methods({
    addRegionalProjectResult: function(resultAttributes) {
        if (!Meteor.user())
            throw new Meteor.Error(401, "You need to login to add new school");

        if (resultAttributes.schoolId==="")
            throw new Meteor.Error(422,'School id cannot be empty');
        if (resultAttributes.studentId==="")
            throw new Meteor.Error(422,'Student id cannot be string');
        if (resultAttributes.name==="")
            throw new Meteor.Error(422,'Name cannot be empty');
        if (resultAttributes.surname==="")
            throw new Meteor.Error(422,'Surname cannot be empty');
        if (resultAttributes.branch==="")
            throw new Meteor.Error(422,'Branch cannot be empty');
        if (resultAttributes.attendedFor==="")
            throw new Meteor.Error(422,'Class cannot be empty');
        if (resultAttributes.teacherId==="")
            throw new Meteor.Error(422,'Select olympiad teacher');

        var recordWithSameResult = RegionalProject.findOne({studentId:resultAttributes.studentId,academicYear:resultAttributes.academicYear});
        if (recordWithSameResult!=undefined)
            throw new Meteor.Error(302,'This result has already been posted')
        if (Meteor.user().profile.userType==="moderator")
        {
            resultId = RegionalProject.insert(resultAttributes);
            return resultId;
        }
        else
            throw new Meteor.Error(402,'You need to login as administrator')
    }
});