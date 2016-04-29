import { Wine } from '../../api/wine.js';

import './view-wine.html';

Template.viewWine.onCreated(function viewWineOnCreated() {
  console.log( "viewWine onCreated" );
});

Template.viewWine.onRendered(function viewWineOnRendered() {
  console.log( "viewWine onRendered" );
  Blaze._globalHelpers.updateNav( FlowRouter.getRouteName() );
});

Template.viewWine.helpers({

});

Template.viewWine.events({
  'submit form'( event )
  {
    var isError = false;
    event.preventDefault();

    const instance = Template.instance();

    var wineData = [];
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
        wineData.push( input.val() );
      }
    });

    if( ! isError )
    {
      // Update user
      var wineId = $( 'input[type=hidden]' ).val();
      Meteor.call( 'wine.update', wineId, wineData );
    }

  },

});
