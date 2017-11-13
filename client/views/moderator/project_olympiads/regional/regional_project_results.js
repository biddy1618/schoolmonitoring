/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.regionalProjectResults.helpers({
    students: function() {
        return RegionalProject.find()
    }
});