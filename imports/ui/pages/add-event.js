import { Events } from '../../api/events.js';

import '../labeled-input.js';
import './add-event.html';

const eventFields = [
  { id: "event-name", label: "Event Name" },
  { id: "date", label: "Date" },
  { id: "description", label: "Description" },
];

Template.addEvent.onCreated(function addEventOnCreated() {
  console.log( "addEvent onCreated" );
});

Template.addEvent.onRendered(function addEventOnRendered() {
  console.log( "addEvent onRendered" );
  Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );
});

Template.addEvent.helpers({
  fields() {
    // const instance = Template.instance();
    // return Tasks.find({}, { sort: { createdAt: -1 } });

    return eventFields;
  },

  usersIndex: () => UsersIndex
});

Template.addEvent.events({
  'click .add-attendee'( event )
  {
    event.preventDefault();

    const target = event.target;
    const userId = target.dataset.id;

    if( $( target ).hasClass( 'button-red' ) )
    {
      console.log( "ADD" );
      $( target ).removeClass( 'button-red' ).addClass( 'button-green' );
      Meteor.call( 'wineclub-users.addToEvent', userId, '123' );
    }else if( $( target ).hasClass( 'button-green' ) )
    {
      console.log( "REMOVE" );
      $( target ).removeClass( 'button-green' ).addClass( 'button-red' );
    }
  },

  'submit form'( event )
  {
    var isError = false;
    event.preventDefault();

    $.each( eventFields, function( index, val )
    {
      let input = $( '#' + val.id );
      let inputDiv = input.parent( '.input' );
      inputDiv.removeClass( 'error' );

      if( input.val() == '' )
      {
        console.log( "error at", input );
        inputDiv.addClass( 'error' );

        isError = true;
      }else
      {
        eventFields[index].value = input.val();
      }
    });

    if( ! isError )
    {
      // Insert a user into the collection
      Meteor.call( 'events.insert', eventFields );

      // Clear form
      $.each( eventFields, function( index, val )
      {
        let input = $( '#' + val.id );
        input.val( '' );
      });
    }

  },

});
