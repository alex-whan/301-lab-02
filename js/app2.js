let allImages = [];
let allFilteredImages = [];

function ImagePool(obj) { // "obj" is placeholder pass-through value
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  allImages.push(this);
}

const addingValuesToImages = (item) => { 
  let template = $('#photo-template').html(); // grab all the HTML of the #photo-template script (id should match script)
  let target = $('#main'); // render it all in #main
  target.append(Mustache.render(template, item)); // wherever your info is going (target), append it with the template (all the values) and item (the pass-through "key" - basically "this")
  // template = entirety of what Mustache is doing (including .html())
  // target = what you're rendering it to - targeted main with an id of #main
}

// Callback sort function for Titles
const sortTitles = () => {
  allImages.sort((a, b) => {
  return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
  })

  allImages.forEach(value => { // for each value/image you have, render it to page with render function - but AFTER your original forEach

    addingValuesToImages(value); // adds Images to Mustache template
  })

  // In your normal sort functions, right here is where you'd return the original array (allImages)

}

// Callback sort function Number of Horns
const sortHorns = () => {
  allImages.sort((a, b) => {
  return a.horns > b.horns ? 1 : -1;
  })

  allImages.forEach(value => { // for each value/image you have, render it to page with render function - but AFTER your original forEach

    addingValuesToImages(value); // adds Images to Mustache template
  })
}

// Checks to make sure image keywords are not repeated in dropdown menu
const myDropdown = (arr) => {
    allImages.forEach((value) => {
      if(!allFilteredImages.includes(value.keyword)){ // if filtered array does NOT include the keyword, add it to filtered array
        allFilteredImages.push(value.keyword);
      } 
    });
    
    allFilteredImages.forEach((value) => {
    $('select').append(`<option value="${value}">${value}</option>`);
    }) // Value doesn't need "keyword" as the allFilteredImages array ONLY has the "keyword" value
  };

// Ajax section - gets data from JSON
$.ajax('data/page-2.json')
  .then( data => {

    data.forEach((obj) => { // pass in object - make as many instances as there are objects
        new ImagePool(obj); // take object and run it back through constructor and take whatever values are there
    })
    allImages.forEach(value => { // for each value/image you have, render it to page with render function - but AFTER your original forEach
      addingValuesToImages(value); // adds Images to Mustache template
    })      
  myDropdown(); // Create dropdown menu here so you don't have multiple instances
 })

function clickHandler(event) {
  event.preventDefault(); // prevents page from re-setting on click instead of on selection - have to select something first
  $('.start').hide(); // entire Mustache in this class - given class of .start
  let imageToHide = `.${event.target.value}`; // event is what we pass through in clickHandler, target is what we clicked on, value is whatever is "in" the target (title, url, description, etc) - whatever was clicked on
  $(imageToHide).show(); // take whatever was clicked on (imageToHide), and show it

}

// Event handler to sort images/animals by title alphabetically
function sortByTitleHandler(event) {
  event.preventDefault();
  $('.start').hide(2000);
  sortTitles();
}

// Event handler to sort images/animals by number of horns
function sortByHornHandler(event) {
  event.preventDefault();
  $('.start').hide(2000);
  sortHorns();
}

// Event listeners
$('select').on('change', clickHandler) // event listener for keyword selection in dropdown
$('#title-radio').on('click', sortByTitleHandler) // event listener for "sort by title" click
$('#horn-radio').on('click', sortByHornHandler) // event listener for "sort by number of horns" click