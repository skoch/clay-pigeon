import { Users } from '../../api/users.js';

import './view-event.html';

var eventId = '--------------';

Template.viewEvent.onCreated(function viewEventOnCreated() {
  console.log( "viewEvent onCreated" );
});

Template.viewEvent.onRendered(function viewEventOnRendered() {
  console.log( "viewEvent onRendered" );
  Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );

  eventId = FlowRouter.current().params._id;

});

Template.viewEvent.helpers({
  usersIndex: () => UsersIndex,
  eventId()
  {
    return eventId;
  },
  attendees()
  {
    return Users.find( { events: eventId } );
  }
});

Template.viewEvent.events({
  'click .add-attendee'( event )
  {
    event.preventDefault();

    const target = event.target;
    const userId = target.dataset.id;
    console.log( "userId", userId );
  },

  'submit form'( event )
  {
    var isError = false;
    event.preventDefault();

    const instance = Template.instance();

    var eventData = [];
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
        eventData.push( input.val() );
      }
    });

    if( ! isError )
    {
      // Update event
      var eventId = $( 'input[type=hidden]' ).val();
      Meteor.call( 'events.update', eventId, eventData );
    }

  },

});
