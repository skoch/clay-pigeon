import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';

export const Wine = new Mongo.Collection( 'wine' );

if( Meteor.isServer )
{
  // This code only runs on the server
  Meteor.publish( 'wine', function winePublication() {
    return Wine.find();
    // return Wine.find({
    //   $or: [
    //     { private: { $ne: true } },
    //     { owner: this.userId },
    //   ],
    // });
  });
}

Meteor.methods({
  'wine.insert'( data )
  {
    console.log( "wine.insert", data );
    // check( text, String );

    // Make sure the user is logged in before inserting a user
    // if( ! Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Wine.insert({
      name: data[0].value,
      vintage: data[1].value,
      style: data[2].value,
      bottlePrice: data[3].value,
      createdAt: new Date(),
      owner: Meteor.userId(),
    });
  },

  'wine.update'( wineId, wineData )
  {
    console.log( "wineId, wineData", wineId, wineData );
    // check( taskId, String );
    // check( setToPrivate, Boolean );

    // const user = Users.findOne( wineId );

    // Make sure the user is logged in before inserting a user
    // if( ! Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Wine.update( wineId, {
      $set: {
        name: wineData[0],
        vintage: wineData[1],
        style: wineData[2],
        bottlePrice: wineData[3],
        updatedAt: new Date(),
      }
    });
  },

  'wine.remove'( wineId )
  {
    console.log( "attempting to remove", wineId );
    // check( wineId, String );

    // extra security
    // const user = Wine.findOne( wineId );
    // if( user.private && user.owner !== Meteor.userId() )
    // {
    //   // If the user is private, make sure only the owner can delete it
    //   throw new Meteor.Error( 'not-authorized' );
    // }

    Wine.remove( wineId );
  },

});
