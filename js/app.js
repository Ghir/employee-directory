
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    for (let i = 0; i < data.results.length; i++) {
      $('li:nth-of-type(' + (i+1) + ') img').attr('src', data.results[i].picture.large);
      $('li:nth-of-type(' + (i+1) + ') .name').html(capitalizeFirstLetter(data.results[i].name.first) + ' ' + capitalizeFirstLetter(data.results[i].name.last));
      $('li:nth-of-type(' + (i+1) + ') .email').html(data.results[i].email);
      $('li:nth-of-type(' + (i+1) + ') .city').html(capitalizeFirstLetter(data.results[i].location.city));
    }

    $('li').click(function(event) {
      const $overlay = $(`
        <div class="overlay">
          <div class="lightbox">
            <div class="main-info">
              <img class="thumbnail2">
              <h4 class="name2"></h4>
              <p class="email2"></p>
              <p class="city2"></p>
            </div>
            <div class="details">
              <p class="cell"></p>
              <p class="address"></p>
              <p class="birthday"></p>
            </div>
          </div>
        </div>
        `);

      $('.container').append($overlay);
      $('.thumbnail2').attr('src', $('.thumbnail', this).attr('src'));
      $('.name2').html($('.name', this).text());
      $('.email2').html($('.email', this).text());
      $('.city2').html($('.city', this).text());

      const childNumber = this.id;
      $('.cell').html(data.results[childNumber].cell);
      $('.address').html(data.results[childNumber].location.street + ', ' + data.results[childNumber].location.postcode);
      $('.birthday').html('Birthday: ' + data.results[childNumber].dob.slice(0, 11));

      $overlay.click((event) => {
        if (event.target.className == 'overlay') {
          $overlay.remove();
        }
      })

    })
  }
});
