/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.internationalProjectResults.helpers({
    students: function() {
        return RegionalProject.find()
    }
});