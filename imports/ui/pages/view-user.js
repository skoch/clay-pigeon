import { Users } from '../../api/users.js';

import './view-user.html';

Template.viewUser.onCreated(function viewUserOnCreated() {
  console.log( "viewUser onCreated" );
});

Template.viewUser.onRendered(function viewUserOnRendered() {
  console.log( "viewUser onRendered" );
  // Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );
});

Template.viewUser.helpers({

});

Template.viewUser.events({
  'submit form'( event )
  {
    var isError = false;
    event.preventDefault();

    const instance = Template.instance();

    var userData = [];
    $( 'input[type=text]' ).each(function() {

      let input = $( this );
      let inputDiv = input.parent( '.input' );
      inputDiv.removeClass( 'error' );

      if( input.val() == '')
      {
        console.log( "error at", input );
        inputDiv.addClass( 'error' );

        isError = true;
      }else
      {
        userData.push( input.val() );
      }
    });

    if( ! isError )
    {
      // Update user
      var userId = $( 'input[type=hidden]' ).val();
      Meteor.call( 'wineclub-users.update', userId, userData );
    }

  },

});
