function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}


function darkMode() {
  var darkMode = $('#dark-mode-button').text();
  if (darkMode === "Disable Dark Mode") {
    $("body").removeClass();
    $("#dark-mode-button").html("Enable Dark Mode");
    $(".tabcontent").removeClass('tab-dark-mode');
    $("table").removeClass("table-dark");
  } else {
    $("body").addClass("body-dark-mode");
    $("#dark-mode-button").html("Disable Dark Mode");
    $(".tabcontent").addClass("tab-dark-mode");
    $("table").addClass("table-dark");
  }

}