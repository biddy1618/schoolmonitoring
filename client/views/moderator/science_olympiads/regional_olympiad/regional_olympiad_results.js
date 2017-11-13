/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.regionalOlympiadResults.helpers({
    students: function() {
        return RegionalOlympiad.find()
    }
});