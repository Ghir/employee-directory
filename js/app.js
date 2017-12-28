
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    const li = $('li');
    for (let i = 0; i < data.results.length; i++) {
      $('li:nth-of-type(' + (i+1) + ') img').attr('src', data.results[i].picture.large);
      $('li:nth-of-type(' + (i+1) + ') .name').html(capitalizeFirstLetter(data.results[i].name.first) + ' ' + capitalizeFirstLetter(data.results[i].name.last));
      $('li:nth-of-type(' + (i+1) + ') .email').html(data.results[i].email);
      $('li:nth-of-type(' + (i+1) + ') .city').html(capitalizeFirstLetter(data.results[i].location.city));
    }
  }
});
