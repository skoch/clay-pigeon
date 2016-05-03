import { Wine } from '../../api/wine.js';

import './view-wines.html';

Template.viewWines.onCreated(function viewWinesOnCreated() {
  console.log( "viewWines onCreated" );
  Meteor.subscribe( 'wine' );
});

Template.viewWines.onRendered(function viewWinesOnRendered() {
  console.log( "viewWines onRendered" );

  // Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );

});

Template.viewWines.helpers({
  wine()
  {
    // if( ! Meteor.userId() )
    // {
    //   throw new Meteor.Error( 'not-authorized' );
    // }
    return Wine.find({}, { sort: { createdAt: -1 } });
  },

});

Template.viewWines.events({
  'click .delete'( event )
  {
    event.preventDefault();

    const target = event.target;
    const wineId = target.dataset.id;

    console.log( "delete wine", wineId );

    Meteor.call( 'wine.remove', wineId );
  }
});
