let allImages = [];
let allFilteredImages = [];

function ImagePool(title, image_url, description, keyword, horns) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allImages.push(this);
}

ImagePool.prototype.render = function() {
  // grab template by its ID
  // select all HTML in template
  const myTemplate = $('#photo-template').html();

  // make a new section and fill it with the template above
  const $newSection = $(`<section>${myTemplate}</section>`);

  // fill h2 of index.html template with the title
  $newSection.find('h2').text(this.title);

  // fill the img src with the image_url
  $newSection.find('img').attr('src', this.image_url);

  // fill the img alt with the keyword
  $newSection.find('img').attr('alt', this.keyword);

  // add class of this.keyword
  $newSection.find('img').attr('class', this.keyword);

  // fill the p with the description
  $newSection.find('p').text(this.description);

  // make a new p for number of horns
  $newSection.find('p').text(this.horns);

  // append to the DOM
  $('main').append($newSection);
}

const myDropdown = (arr) => {
    allImages.forEach((value) => {
      if(!allFilteredImages.includes(value.keyword)){
        allFilteredImages.push(value.keyword);
      } 
    });
    
    allFilteredImages.forEach((value) => {
    $('select').append(`<option value="${value}">${value}</option>`);
    }) // Value doesn't need "keyword" as the allFilteredImages array ONLY has the "keyword" value
  };

// Ajax section

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then( data => {

    data.forEach((value) => {
        new ImagePool(value.title, value.image_url, value.description, value.keyword, value.horns).render();
    })
}).then(() => {
      
  myDropdown(); 

 })

function clickHandler(event) {
  event.preventDefault();
  $('h2').hide();
  $('img').hide();
  $('p').hide();

// Select the "this" that was clicked on
// Selecting something within selecting something

  let correctSelection = $(this).val();
  $(`.${correctSelection}`).show();
  console.log(correctSelection);

  // give all images a class/attribute of their keyword - to only show those elements

}

$('select').on('change', clickHandler)

