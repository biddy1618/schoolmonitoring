/**
 * Created by dauletkaliuly on 11/27/14.
 */
Template.internationalProjectResultItem.helpers({
    lesson: function() {
        return Branches.findOne({id:this.branch}).name
    },
    teacher: function() {
        return Teachers.findOne({teacherId:parseInt(this.teacherId)});

    }
});