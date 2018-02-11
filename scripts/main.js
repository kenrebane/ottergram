/*
  1. Get all the thumbnails
  2. Listen for a click on each one
  3. If a click occurs, update the DETAIL image with info from the thumbnail
    3.1. Get the image URL from the thumbnails data attribute
    3.2. Get the title text from the thumbnails data attribute
    3.3. Set the image and title on the detail image
*/

//Variable definitions
var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";
var DETAIL_FRAME_SELECTOR = "[data-image-role='frame']";
var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = "is-tiny";
var ESC_KEY = 27;

//Returns the url thats assigned for the anchor item in the UL
function imageFromThumb(thumbnail) {
  'use strict';

  return thumbnail.getAttribute("data-image-url");
}

//Returns the title thats assigned for the anchor item in the UL
function titleFromThumb(thumbnail) {
  'use strict';

  return thumbnail.getAttribute("data-image-title");
}

//Sets the variables detailImage and detailTitle equal to
//the corresponding values
function setDetails(imageURL, titleText) {
  'use strict'; //Tells browser that this function uses the recent standard version of JS
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageURL);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

//Calls setDetails() for getting the right url and title
function setDetailsFromThumb(thumbnail) {
  'use strict'

  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

//Upon clicking any of the thumnails prevents the default behaviour
//and calls setDetailsFromThumb for the thumbnail that was clicked
//Also calls showDetails() for displaying the clicked thumbnail in
//the detailed item container
function addThumbClickHandler(thumbnail) {
  'use strict';

  thumbnail.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumbnail);
    showDetails();
  });
}

//Gets ancors nodeList, converts it to an array and returns
//the array
function getThumbnailsArray() {
  'use strict';

  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

//Adds hidden-detail class to body element
function hideDetails() {
  'use strict'

  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

//Removes hidden-detail class from body element to show
// the detailed image in the center
//Adds is-tiny class and propmtly removes it from the
//detail frame element to create the zoom in effect
function showDetails() {
  'use strict'


  document.body.classList.remove(HIDDEN_DETAIL_CLASS);

  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

//Hides the details image when pressing ESC
function addKeyPressHandler() {
  'use strict'

  document.body.addEventListener("keyup", function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if ( event.keyCode === ESC_KEY ) {
      hideDetails();
    }
  });
}

//adds click handlers to all of the anchors(thumbnails)
function initializeEvents() {
  'use strict';

  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();
