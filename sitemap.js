$(function () {
  const url =
    'https://script.google.com/macros/s/AKfycbxAl_1ZIcLkt9x0CNmPgx9sGpdNtmEpvoxqDM0_kMyNQsjv5O1QqdiO8kLnX9OQo1sA/exec';
  let MENU_DATA;
  $.getJSON(url, (res) => {
    MENU_DATA = res;
    init();
    $(`#Loading`).fadeOut();
  });

  function init() {
    $(`#Hbs-2e300913`).hbs($(`#Tpl-2e300913`), {
      MENU_DATA,
    });
  }
});
