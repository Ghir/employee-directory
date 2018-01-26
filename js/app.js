
!function () {

function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let childNumber = 0;

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=gb,au,dk,es,fi,fr,nl,nz,us',
  dataType: 'json',
  success: function(data) {
    // create rows
    for (let i = 0; i < data.results.length; i++) {
      $('li:nth-of-type(' + (i+1) + ') img').attr('src', data.results[i].picture.large);
      $('li:nth-of-type(' + (i+1) + ') .name').html(capitalizeFirstLetter(data.results[i].name.first) + ' ' + capitalizeFirstLetter(data.results[i].name.last));
      $('li:nth-of-type(' + (i+1) + ') .email').html(data.results[i].email);
      $('li:nth-of-type(' + (i+1) + ') .city').html(capitalizeFirstLetter(data.results[i].location.city));
      $('li:nth-of-type(' + (i+1) + ') .username').html(data.results[i].login.username);
    }
    // show modal window on click
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
      // basic details in modal window
      $('.thumbnail2').attr('src', $('.thumbnail', this).attr('src'));
      $('.name2').html($('.name', this).text());
      $('.email2').html($('.email', this).text());
      $('.city2').html($('.city', this).text());

      childNumber = this.id;
      // hide and show buttons when needed
      if (parseInt(childNumber) == 0) {
        $('#previous').hide()
      }
      else if (parseInt(childNumber) == 11) {
        $('#next').hide();
      }
      // provide additional details in modal window
      $('.cell').html(data.results[childNumber].cell);
      $('.address').html(data.results[childNumber].location.street + data.results[childNumber].location.city + ', ' + data.results[childNumber].location.state + ', ' +  data.results[childNumber].location.postcode);
      $('.birthday').html('Birthday: ' + data.results[childNumber].dob.slice(0, 11));
      $('.username2').html('Username: ' + data.results[childNumber].login.username)
      // exit modal window when click outside of it
      $overlay.click((event) => {
        if (event.target.className == 'overlay') {
          $overlay.remove();
        }
      })
      // navigation with 'next' and 'previous' buttons
      $('#next').click(function () {
        $overlay.remove();
        $('li')[parseInt(childNumber)+1].click();
      })
      $('#previous').click(function () {
        $overlay.remove();
        $('li')[parseInt(childNumber)-1].click();
      })
    }) // end click
  } // end success function
}); // end Ajax

const $employees = $('li');
const $message = $('<p>Not found...</p>');
const $input = $('input');

// search feature to filter employees
function search () {
  matchedEmployees = [];
  $employees.hide();
  $message.remove();
  // if employee matches the search, add it to a new array
  $employees.each(function () {
    if ($(this).text().includes($input.val().toLowerCase())) {
      matchedEmployees.push(this);
    }
  })
  // show matched employees
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
} // end search

$('#search').click(search)

// reset feature to clear everything
$('#reset').click(() => {
  $input.val('');
  $message.remove();
  $employees.show()
})

// if enter key is pressed and input is active then search employees
$(window).keydown(function(e) {
  if (e.keyCode === 13 && $(document.activeElement).is("input")) {
    search();
  }})

}();
