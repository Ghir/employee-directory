!async function () {
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  let childNumber = 0;

  const getEmployees = new Promise((resolve) => {
    $.ajax({
      url: 'https://randomuser.me/api/?results=12&nat=gb,au,dk,es,fi,fr,nl,nz,us',
      dataType: 'json',
      success: data => resolve(data)
    });
  });

  const data = await getEmployees;

  data.results.forEach((el, i) => {
    $('li:nth-of-type(' + (i + 1) + ') img').attr('src', data.results[i].picture.large);
    $('li:nth-of-type(' + (i + 1) + ') .name').html(capitalizeFirstLetter(data.results[i].name.first) + ' ' + capitalizeFirstLetter(data.results[i].name.last));
    $('li:nth-of-type(' + (i + 1) + ') .email').html(data.results[i].email);
    $('li:nth-of-type(' + (i + 1) + ') .city').html(capitalizeFirstLetter(data.results[i].location.city));
    $('li:nth-of-type(' + (i + 1) + ') .username').html(data.results[i].login.username);
  });

  const $overlay = $('.overlay');

  // show modal window on click
  $('li').click(function () {
    $overlay.show();
    // basic details in modal window
    $('.thumbnail2').attr('src', $('.thumbnail', this).attr('src'));
    $('.name2').html($('.name', this).text());
    $('.email2').html($('.email', this).text());
    $('.city2').html($('.city', this).text());

    childNumber = this.id;
    // hide and show buttons when needed
    if (childNumber == 0) {
      $('#previous').hide()
    } else if (childNumber == 11) {
      $('#next').hide();
    } else {
      $('#previous').show()
      $('#next').show();
    }
    // provide additional details in modal window
    $('.cell').html(data.results[childNumber].cell);
    $('.address').html(data.results[childNumber].location.street + data.results[childNumber].location.city + ', ' + data.results[childNumber].location.state + ', ' + data.results[childNumber].location.postcode);
    $('.birthday').html('Birthday: ' + data.results[childNumber].dob.date.slice(0, 11));
    $('.username2').html('Username: ' + data.results[childNumber].login.username)
  })

  // exit modal window
  $overlay.click((event) => {
    if (event.target.className === 'overlay') {
      $overlay.hide();
    }
  })

  // arrow buttons
  $('#next').click(() => {
    $overlay.hide();
    $('li')[parseInt(childNumber) + 1].click();
  })
  $('#previous').click(() => {
    $overlay.hide();
    $('li')[parseInt(childNumber) - 1].click();
  })

  const $employees = $('li');
  const $message = $('<p>Not found...</p>');
  const $input = $('input');

  const search = () => {
    matchedEmployees = [];
    $employees.hide();
    $message.remove();
    $employees.each(function () {
      if ($(this).text().includes($input.val().toLowerCase())) {
        matchedEmployees.push(this);
      }
    })
    matchedEmployees.forEach(employee => employee.style.display = '')
    if (matchedEmployees.length === 0) {
      $('.wrapper').append($message);
    }
  }

  $('#search').click(search);
  $('#reset').click(() => {
    $input.val('');
    $message.remove();
    $employees.show();
  })
  $(window).keydown(e => {
    if (e.keyCode === 13 && $(document.activeElement).is("input")) {
      search();
    }
  })
}();
