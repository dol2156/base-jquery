$.ksmconsole = function () {
  console.log(this);
};
//call : $.ksmconsole();

$.fn.extend({
  ksmalert: function () {
    console.log(this);
  },
});
//call : $('body').ksmalert();
