import { Users } from '../../api/users.js';

import './view-event.html';

// var eventId = '--------------';

Template.viewEvent.onCreated(function viewEventOnCreated() {
  console.log( "viewEvent onCreated" );

  this.attendeeIds = new ReactiveVar();
  // Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );
  this.eventId = FlowRouter.current().params._id;
});

Template.viewEvent.onRendered(function viewEventOnRendered() {
  console.log( "viewEvent onRendered" );

  // $( '#user-list' ).chosen( { width: '100%' } );
});

Template.viewEvent.helpers({
  usersIndex: () => UsersIndex,
  eventId()
  {
    return Template.instance().eventId;
  },
  attendees()
  {
    return Users.find( { events: { $in: [Template.instance().eventId] } } );
  },
  users()
  {
    return Users.find( { events: { $nin: [Template.instance().eventId] } } );
  }
});

Template.viewEvent.events({
  // 'change #user-list'( event )
  'click .add-attendee'( event )
  {
    event.preventDefault();

    const target = event.target;
    const userId = target.dataset.id;
    // const firstname = target.dataset.firstname;
    // const lastName = target.dataset.lastname;
    // var selected = $( event.target ).find( 'option:selected' );
    // const userId = selected.data( 'id' );
    // const firstName = selected.data( 'firstname' );
    // const lastName = selected.data( 'lastname' );

    Meteor.call( 'wineclub-users.addToEvent', userId, Template.instance().eventId );

    // Meteor.call( 'wineclub-users.addToEvent', userId, Template.instance().eventId, ( error, result ) => {
    //   console.log( "error, result", error, result );
    //   if( ! error )
    //   {
    //     // we do not have to add this here because the change occurs as a result of our addition
    //     // $( '.attendees' ).append( '<button type="button" class="remove-attendee btn btn-success btn-sm" data-id="'+userId+'">'+firstName+' '+lastName+'</button>' );

    //     $( '#user-list' ).trigger( 'chosen:updated' );
    //   }
    // });


  },
  'click .remove-attendee'( event )
  {
    event.preventDefault();

    const target = event.target;
    const userId = target.dataset.id;
    // console.log( "remove >>", userId, Template.instance().eventId );

    Meteor.call( 'wineclub-users.removeFromEvent', userId, Template.instance().eventId );

    // likewise, we don't have to remove this because the db call takes care of this
    // $( target ).remove();
    // $( '#user-list' ).trigger( 'chosen:updated' );
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
