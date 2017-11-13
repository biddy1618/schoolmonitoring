/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.addRepublicProjectResult.helpers({
    students: function() {
        return RegionalProject.find()
    }
});

Template.addRepublicProjectResult.events({

})