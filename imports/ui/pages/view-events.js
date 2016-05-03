import { Events } from '../../api/events.js';

import './view-events.html';

Template.viewEvents.onCreated(function viewEventsOnCreated() {
  console.log( "viewEvents onCreated" );
});

Template.viewEvents.onRendered(function viewEventsOnRendered() {
  console.log( "viewEvents onRendered" );

  // Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );

});

Template.viewEvents.helpers({
  events()
  {
    // if( ! Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }
    return Events.find({}, { sort: { createdAt: -1 } });
  },

});

Template.viewEvents.events({
  'click .delete'( event )
  {
    event.preventDefault();

    const target = event.target;
    const eventId = target.dataset.id;

    console.log( "delete event", eventId );

    Meteor.call( 'events.remove', eventId );
  }
});
