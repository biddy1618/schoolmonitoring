/**
 * Created by dauletkaliuly on 12/10/14.
 */
Template.kboMenu.events({
    'click #keys': function() {

    }
});

Template.kboMenu.helpers({
    no: function() {
        return Router.current().params.no
    },
    keys: function() {
        if (Router.current().url.slice(-4)=='keys'||Router.current().url.slice(-8,-4)=="keys")
            return 'active'
        else
            return ''
    },
    kbo: function() {
        if (Router.current().url.slice(-5,-2)=='kbo')
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
