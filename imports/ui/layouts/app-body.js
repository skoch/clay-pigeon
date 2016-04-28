import './app-body.html';

Meteor.startup(() => {
  console.log( "starting up" );
});

Template.appBody.onCreated(function appBodyOnCreated() {
  console.log( "appBody onCreated" );
});

Template.appBody.onRendered(function appBodyOnRendered() {
  console.log( "appBody onRendered" );
});

Template.appBody.helpers({
  isLoggedIn() {
    // return Meteor.userId();
    return !!Meteor.user();
  },

});
