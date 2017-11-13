/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.republicOlympiadResults.helpers({
    students: function() {
        return RepublicOlympiad.find()
    }
});