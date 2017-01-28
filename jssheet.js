$(document).ready(function() {
  $("#searchThis").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {'action': "opensearch", 'format': "json", 'search': request.term },
        success: function(data) {
            response(data[1]);
        }
      });
    },
    minLength: 2,
    select: function(event, ui) {
      $("#searchThis").val(ui.item.value);
    }
  });
  $("#searchThis").keypress(function(e){
    if (!e) e = window.event;
    if (e.keyCode == "13") {
      $("#searchThis").autocomplete("close");
      return false;
    }
  });
  $("#searchButton").on("click", function search() {
    $(".resultsList").empty();
    $(".title").addClass("titleUp");
    $(".searchbar").addClass("searchbarUp");
    var searchTerm = $("#searchThis").val();
    var i;
    var results;
    var resultTerm;
    var resultUrl;
    $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    data: { 'action': 'opensearch', 'search': searchTerm, 'limit': '10' },
    dataType: 'jsonp',
    success: function (x) {
      results = x;
      console.log(results[1].length);
      if (results[1].length == 1) {
        $(".resultsList").css({
        "-webkit-column-count": "1",
        "-webkit-column-gap": "normal",
        "-moz-column-count": "1",
        "-moz-column-gap": "normal",
        "column-count": "1",
        "column-gap": "normal"
        });
      } else if (results[1].length >= 2) {
        $(".resultsList").css({
        "-webkit-column-count": "2",
        "-webkit-column-gap": "normal",
        "-moz-column-count": "2",
        "-moz-column-gap": "normal",
        "column-count": "2",
        "column-gap": "normal"
        });
      }
      for (i = 0; i < results[1].length; i++) {
        resultUrl = results[3][i];
        resultTerm = "<div class='resultItem'><a target='_blank' href='" + resultUrl + "'>" + "<p class='resultTerm'>" + results[1][i] + "</p>" + "<p class='resultDef'>" + results[2][i] + "</p></a></div>";
        $(resultTerm).appendTo(".resultsList");

      }
    }
    });
  });
});
