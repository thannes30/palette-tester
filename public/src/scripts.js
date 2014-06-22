
function setEventHandlers(){

   var button = $('.random-palettes')[0];
   $(button).click(function(){ //on click
      $('.palettes').remove(); //remove all palettes
      $.ajax({
         url: '/palettes.json', //get new random palettes
         success: displayPalettes //display palettes
      });
      return this; //return the palettes
   });
}

function displayColorBox(e){
   var colorBox = $('<div>').addClass('color-box').css('border', 'solid 8px lightgrey');
   $('.container').append(colorBox);


   var colorBoxArray = $(this).data().colors;
   var numColumns = $(this).data().colors.length; //get number of colors
   console.log(numColumns);
   var stripWidth = ((900/$(this).data().colors.length)/900)*100;
   // console.log(((900/$(this).data().colors.length)/900)*100);

   for (var i = 0; i < numColumns; i++) {
      var colorStrip = $('<div>').addClass('color-strip')
      colorStrip.css('width', stripWidth + '%');
      $(colorBox).append(colorStrip);
      colorStrip.css('background-color', '#' + colorBoxArray[i]);

   };





   $(document).mouseup(function(e){ //remove colorBox
      if (!colorBox.is(e.target) && colorBox.has(e.target).length === 0){
         $(colorBox).remove();
      };

   });
}

function displayPalettes(data){
   var containerDiv = $('.container');

   for (var i in data){

      var palettesDiv = $('<div>').addClass('palettes');
      $(containerDiv).append(palettesDiv);

      var colorsDiv = $('<div>').addClass('colors');
      colorsDiv.data('colors', data[i].colors);

      $(palettesDiv).append(colorsDiv);


      var colorArray = data[i].colors;

      for (var j in colorArray){
         var hueDiv = $('<div>').addClass('hue');
         $(hueDiv).css('background-color', '#' + colorArray[j] );
         $(colorsDiv).append(hueDiv);
      };

      colorsDiv.click(displayColorBox)

      var title = data[i].title;
      var titleDiv = $('<div>').addClass('title').html(title);
      $(palettesDiv).append(titleDiv);

   };

}

$(function(){
  setEventHandlers();
});
