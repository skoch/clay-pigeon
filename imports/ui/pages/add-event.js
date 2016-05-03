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
  // Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );
});

Template.addEvent.helpers({
  attendees() {
    return true;
  },
  fields() {
    // const instance = Template.instance();
    // return Tasks.find({}, { sort: { createdAt: -1 } });

    return eventFields;
  },

});

Template.addEvent.events({
  'submit form'( event )
  {
    var isError = false;
    event.preventDefault();

    $.each( eventFields, function( index, val )
    {
      let input = $( '#' + val.id );
      let formGroup = input.parent( '.form-group' );
      formGroup.removeClass( 'has-error' );

      if( input.val() == '' )
      {
        console.log( "error at", input );
        formGroup.addClass( 'has-error' );

        isError = true;
      }else
      {
        eventFields[index].value = input.val();
      }
    });

    if( ! isError )
    {
      // FlowRouter.go( '/e/oQZ6cj93HjWDHMwWb' );
      // Insert a user into the collection
      Meteor.call( 'events.insert', eventFields, ( error, result ) => {
        var _id = result;
        console.log( "_id", _id );
        FlowRouter.go( '/e/' + _id );
      });

      // Clear form
      $.each( eventFields, function( index, val )
      {
        let input = $( '#' + val.id );
        input.val( '' );
      });

    }
  },

});
