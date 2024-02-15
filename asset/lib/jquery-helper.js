$.fn.extend({
  /**
   * 동기 방식 Handlebars 렌더링
   * @param template
   * @param render_data
   * ex)
   * $(`#Hbs-2088ae21`).hbs($(`#Tpl-2088ae21`));
   * document.currentScript.remove();
   *
   * $(`#Hbs-2e300913`).hbs($(`#Tpl-2e300913`), {
   *   MENU_DATA,
   * });
   */
  hbs: function (template, render_data = {}) {
    if (this.length === 0) {
      Console.error('Target is Null', '$.hbs');
      return;
    }
    const target_element = this;

    let tpl_string = '';
    if (typeof template === 'object') {
      // jQuery Obj
      tpl_string = template.html();
      template.remove();
    } else {
      // hbs file path
      $.ajax({
        url: template,
        method: 'GET',
        dataType: 'html',
        cache: false,
        async: false, // 동기식
        timeout: 60 * 1000,
        success: function (response, status, xhr) {
          //console.log("AJAX success : " + url);
          tpl_string = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log('AJAX error : ' + url);
          console.log('status : ' + jqXHR.status);
          console.log('textStatus : ' + textStatus);
        },
        complete: function (jqXHR, textStatus) {
          //console.log("AJAX complete : " + url);
        },
      });
    }

    Handlebars.render(tpl_string, render_data, target_element);
  },
});
