let allImages = [];

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

  // fill the p with the description
  $newSection.find('p').text(this.description);

  // make a new p for number of horns
  $newSection.find('p').text(this.horns);

  // append to the DOM
  $('main').append($newSection);
}

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then( data => {

    data.forEach((value) => {
        new ImagePool(value.title, value.image_url, value.description, value.keyword, value.horns).render();
    })
})

