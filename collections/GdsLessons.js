/**
 * Created by dauletkaliuly on 12/13/14.
 */
GdsLessons = new Meteor.Collection('gdsLessons');

GdsLessons.allow({
    insert: function() {
        return true
    },
    update: function() {
        return true
    },
    remove: function() {
        return true
    }
})
