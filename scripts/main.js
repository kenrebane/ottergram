/*
  1. Get all the thumbnails
  2. Listen for a click on each one
  3. If a click occurs, update the DETAIL image with info from the thumbnail
    3.1. Get the image URL from the thumbnails data attribute
    3.2. Get the title text from the thumbnails data attribute
    3.3. Set the image and title on the detail image
*/

var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";
var DETAIL_FRAME_SELECTOR = "[data-image-role='frame']";
var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = "is-tiny";
var ESC_KEY = 27;


function setDetails(imageURL, titleText) {
  'use strict'; //Tells browser that this function uses the recent standard version of JS
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageURL);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';

  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  'use strict';

  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  'use strict'

  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumbnail) {
  'use strict';

  thumbnail.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumbnail);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';

  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  'use strict'

  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict'


  document.body.classList.remove(HIDDEN_DETAIL_CLASS);

  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

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

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();
