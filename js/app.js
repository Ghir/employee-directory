
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=gb,au,dk,es,fi,fr,nl,nz,us',
  dataType: 'json',
  success: function(data) {
    for (let i = 0; i < data.results.length; i++) {
      $('li:nth-of-type(' + (i+1) + ') img').attr('src', data.results[i].picture.large);
      $('li:nth-of-type(' + (i+1) + ') .name').html(capitalizeFirstLetter(data.results[i].name.first) + ' ' + capitalizeFirstLetter(data.results[i].name.last));
      $('li:nth-of-type(' + (i+1) + ') .email').html(data.results[i].email);
      $('li:nth-of-type(' + (i+1) + ') .city').html(capitalizeFirstLetter(data.results[i].location.city));
      $('li:nth-of-type(' + (i+1) + ') .username').html(data.results[i].login.username);
    }

    $('li').click(function(event) {
      const $overlay = $(`
        <div class="overlay">
          <div class="lightbox">
            <button id="previous"><</button>
            <button id="next">></button>
            <div class="main-info">
              <img class="thumbnail2">
              <h4 class="name2"></h4>
              <p class="email2"></p>
              <p class="city2"></p>
            </div>
            <div class="details">
              <p class="username2"></p>
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
      $('.address').html(data.results[childNumber].location.street + data.results[childNumber].location.city + ', ' + data.results[childNumber].location.state + ', ' +  data.results[childNumber].location.postcode);
      $('.birthday').html('Birthday: ' + data.results[childNumber].dob.slice(0, 11));
      $('.username2').html('Username: ' + data.results[childNumber].login.username)

      $overlay.click((event) => {
        if (event.target.className == 'overlay') {
          $overlay.remove();
        }
      })
    }) // end click
  } // end success function
}); // end Ajax


const $employees = $('li');
const $message = $('<p>Not found...</p>');
const $input = $('input');

function search () {
  matchedEmployees = [];
  $employees.hide();
  $message.remove();

  $employees.each(function () {
    if ($(this).text().includes($input.val().toLowerCase())) {
      matchedEmployees.push(this);
    }
  })

  // show matched students
  for (let i=0; i<12; i++) {
    for (let e=0; e<matchedEmployees.length; e++) {
      if ($employees[i] == matchedEmployees[e]) {
        $employees[i].style.display = '';
      }
    }
  }
  // display message if no matches are found
  if (matchedEmployees.length == 0) {
    $('.wrapper').append($message);
  }
} // end Search

$('#search').click(search)

$('#reset').click(() => {
  $input.val('');
  $message.remove();
  $employees.show()
})

$(window).keydown(function(e) {
  // if enter key is pressed and input is active then search employees
  if (e.keyCode === 13 && $(document.activeElement).is("input")) {
    search();
  }})
