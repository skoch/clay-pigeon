import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';

export const Users = new Mongo.Collection( 'wineclub-users' );

UsersIndex = new EasySearch.Index({
  collection: Users,
  fields: ['firstName', 'lastName'],
  engine: new EasySearch.Minimongo()
});

if( Meteor.isServer )
{
  // This code only runs on the server
  // Only publish users that are public or belong to the current user
  Meteor.publish( 'wineclub-users', function usersPublication() {
    return Users.find();
    // return Users.find({
    //   $or: [
    //     { private: { $ne: true } },
    //     { owner: this.userId },
    //   ],
    // });
  });
}

Meteor.methods({
  'wineclub-users.insert'( data )
  {
    console.log( "wineclub-users.insert", data );
    // check( text, String );

    // Make sure the user is logged in before inserting a user
    // if( ! Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Users.insert({
      firstName: data[0].value,
      lastName: data[1].value,
      address: data[2].value,
      city: data[3].value,
      state: data[4].value,
      zip: data[5].value,
      phone: data[6].value,
      email: data[7].value,
      createdAt: new Date(),
      owner: Meteor.userId(),
    });
  },

  'wineclub-users.update'( userId, userData )
  {
    console.log( "userId, userData", userId, userData );
    // check( taskId, String );
    // check( setToPrivate, Boolean );

    // const user = Users.findOne( userId );

    // Make sure the user is logged in before inserting a user
    // if( ! Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Users.update( userId, {
      $set: {
        firstName: userData[0],
        lastName: userData[1],
        address: userData[2],
        city: userData[3],
        state: userData[4],
        zip: userData[5],
        phone: userData[6],
        email: userData[7],
        updatedAt: new Date(),
      }
    });
  },

  'wineclub-users.remove'( userId )
  {
    console.log( "attempting to remove", userId );
    // check( userId, String );

    // extra security
    // const user = Users.findOne( userId );
    // if( user.private && user.owner !== Meteor.userId() )
    // {
    //   // If the user is private, make sure only the owner can delete it
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Users.remove( userId );
  },

  'wineclub-users.addToEvent'( userId, eventId )
  {
    // console.log( "wineclub-users.addToEvent", userId, eventId );
    // check( taskId, String );
    // check( setToPrivate, Boolean );

    // const user = Users.findOne( userId );

    // // Make sure only the task owner can make a task private
    // if( user.owner !== Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Users.update( userId, { $addToSet: { events: eventId } } );
  },

  'wineclub-users.removeFromEvent'( userId, eventId )
  {
    // check( taskId, String );
    // check( setToPrivate, Boolean );

    // const user = Users.findOne( userId );

    // // Make sure only the task owner can make a task private
    // if( user.owner !== Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Users.update( userId, { $pull: { events: eventId } } );
  },

});
