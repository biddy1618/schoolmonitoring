Counters = new Meteor.Collection('counters');
//
//Meteor.methods({
//updateIdStorage: function(counter,options) {
//    // Удостоверимся что пользователь залогинен
//    if (!Meteor.user())
//    	throw new Meteor.Error(401, "You need to login to add new school");
//    else
//    	if (Meteor.user().profile.userType!=='admin')
//	    	throw new Meteor.Error(401, "You don't have enough privileges to edit this page");
//
//    Counters.update(counter,options);
//  },
//
//});

Counters.allow({
    update: function(userId, doc){
        if (Meteor.user())
           if ((Meteor.user().profile.userType=="admin")||Meteor.user().profile.userType=="moderator")
            return true
    }
});