//Meteor.subscribe('schools');
Meteor.subscribe('branches');
Meteor.subscribe('counters');
Meteor.subscribe('schools');

var currentDate = new Date();
if (currentDate.getMonth()<8)
   var academicYear = (currentDate.getFullYear()-1).toString()+'-'+currentDate.getFullYear().toString();
else
   var academicYear = currentDate.getFullYear().toString()+'-'+(currentDate.getFullYear()+1).toString();
Session.setDefault('academicYear',academicYear)