import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';

export const Users = new Mongo.Collection( 'wineclub-users' );

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

    // Make sure the user is logged in before inserting a task
    if( ! Meteor.userId() )
    {
      throw new Meteor.Error( 'not-authorized' );
    }

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

  // 'wineclub-users.remove'( userId )
  // {
  //   console.log( "attempting to remove", userId );
  //   // check( userId, String );

  //   // extra security
  //   // const user = Users.findOne( userId );
  //   // if( user.private && user.owner !== Meteor.userId() )
  //   // {
  //   //   // If the user is private, make sure only the owner can delete it
  //   //   throw new Meteor.Error( 'not-authorized' );
  //   // }

  //   Users.remove( userId );
  // },

});
