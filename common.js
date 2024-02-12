/* 2024-02-12 :: START :: Header */
const Header = {};
Header.init = () => {
  $(`#Header .HamburgerBtn`).on(`click`, (evt) => {
    const $ct = $(evt.currentTarget);
    $ct.toggleClass('On');
  });
};
/* // 2024-02-12 :: END :: Header */

$(function () {
  Header.init();
});
