/**
 * Created by dauletkaliuly on 11/26/14.
 */
Template.republicProjectResults.helpers({
    students: function() {
        return RepublicProject.find()
    }
});