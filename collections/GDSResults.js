/**
 * Created by dauletkaliuly on 12/8/14.
 */
GDSResults = new Meteor.Collection('gdsResults');
GDSResults.allow({
    insert: function() {
        return true
    }
});
