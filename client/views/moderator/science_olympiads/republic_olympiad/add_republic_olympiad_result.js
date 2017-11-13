/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.addRepublicOlympiadResult.helpers({
    students: function() {
        return RegionalOlympiad.find()
    }
});

Template.addRepublicOlympiadResult.events({

})