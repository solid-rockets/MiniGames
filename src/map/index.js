$.ajax({
  url: './assets/japan_map.html',
  type: 'get',
  async: true,
  success: function(html) {
    $('#pic').html(html);
    $('#Gifu').children().attr('fill','#FF0000');
    $('#Aichi').children().attr('fill','#00FF00');
  }
})
