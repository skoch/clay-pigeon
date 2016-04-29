import { Users } from '../../api/users.js';

import './view-users.html';

Template.viewUsers.onCreated(function viewUsersOnCreated() {
  console.log( "viewUsers onCreated" );
});

Template.viewUsers.onRendered(function viewUsersOnRendered() {
  console.log( "viewUsers onRendered" );

  Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );

});

Template.viewUsers.helpers({
  users()
  {
    // if( ! Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }
    return Users.find({}, { sort: { createdAt: -1 } });
  },

});

Template.viewUsers.events({
  'click .delete'( event )
  {
    event.preventDefault();

    const target = event.target;
    const userId = target.dataset.id;

    console.log( "delete user", userId );

    Meteor.call( 'wineclub-users.remove', userId );
  }
});
