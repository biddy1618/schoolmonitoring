/**
 * Created by dauletkaliuly on 12/10/14.
 */
Template.gdsMenu.events({
    'click #keys': function() {

    }
});

Template.gdsMenu.helpers({
    no: function() {
        return Router.current().params.no
    },
    gdsNo: function() {
        return Router.current().params.no
    },
    keys: function() {
        if (Router.current().url.slice(-4)=='keys'||Router.current().url.slice(-8,-4)=="keys")
            return 'active'
        else
            return ''
    },
    gds: function() {
        if (Router.current().url.slice(-5,-2)=='gds')
            return 'active'
        else
            return ''
    },
    order: function() {
        if (Router.current().url.slice(-7)=='lessons')
            return 'active'
        else
            return ''
    }
});