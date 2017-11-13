/**
 * Created by dauletkaliuly on 12/11/14.
 */
Template.adminGdsKeys.helpers({
    no: function() {
        return Router.current().params.no
    },
    variants: function() {
      return GDSKeys.find({academicYear:Session.get('academicYear')})
    }
});
