/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.worldOlympiadResults.helpers({
    students: function() {
        return WorldOlympiad.find()
    }
});