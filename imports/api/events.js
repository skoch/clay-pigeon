import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';

export const Events = new Mongo.Collection( 'events' );

if( Meteor.isServer )
{
  // This code only runs on the server
  Meteor.publish( 'events', function eventsPublication() {
    return Events.find();
    // return Wine.find({
    //   $or: [
    //     { private: { $ne: true } },
    //     { owner: this.userId },
    //   ],
    // });
  });
}

Meteor.methods({
  'events.insert'( data )
  {
    console.log( "events.insert", data );
    // check( text, String );

    // Make sure the user is logged in before inserting a user
    // if( ! Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    return Events.insert({
      name: data[0].value,
      date: data[1].value,
      description: data[2].value,
      createdAt: new Date(),
      owner: Meteor.userId(),
    });
  },

  'events.update'( eventId, eventData )
  {
    console.log( "eventId, eventData", eventId, eventData );
    // check( taskId, String );
    // check( setToPrivate, Boolean );

    // const event = Events.findOne( eventId );

    // Make sure the user is logged in before inserting a user
    // if( ! Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Events.update( eventId, {
      $set: {
        name: wineData[0],
        vintage: wineData[1],
        style: wineData[2],
        bottlePrice: wineData[3],
        updatedAt: new Date(),
      }
    });
  },

  'events.remove'( eventId )
  {
    console.log( "attempting to remove", eventId );
    // check( eventId, String );

    // extra security
    // const event = Events.findOne( eventId );
    // if( user.private && user.owner !== Meteor.userId() )
    // {
    //   // If the user is private, make sure only the owner can delete it
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Events.remove( eventId );
  },

});
