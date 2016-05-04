import './header.html';

Template.header.onCreated(function headerOnCreated() {
  console.log( "header onCreated" );
});

Template.header.onRendered(function headerOnRendered() {
  console.log( "header onRendered" );
});

Template.header.helpers({
  pageName() {
    return FlowRouter.getRouteName();
  },

  isAdmin() {
    console.log( "Meteor.user().profile.isAdmin", Meteor.user().profile.isAdmin );
    const user = Meteor.user();
    return user && Meteor.user().profile.isAdmin;
    // return user && Roles.userIsInRole( user, ['admin'], 'default-group' );
  },

});

Template.header.events({
  'click .logout'( event ) {
    event.preventDefault();
    Meteor.logout();
  }
});
