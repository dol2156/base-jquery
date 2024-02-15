/* 2024-02-08 :: START :: Console */
const Console = {};
Console.log = (msg, label = 'NoLabel') => {
  const label_style =
    'border:1px solid black; background:#333; color:yellow; padding:0.25em 0.5em; font-size:12px; font-weight:bold; font-size:16px;';
  const value_style =
    'border:1px solid black; background:#ffffd4; color:#333; padding:0.25em 0.5em; font-size:12px; border-left:none; font-size:16px;';
  console.log(`%c${label}%c${msg}`, label_style, value_style);
};

Console.error = (msg, label = 'NoLabel') => {
  const label_style =
    'border:1px dashed black; background:red; color:white; padding:0.25em 0.5em; font-size:12px; font-weight:bold; font-size:16px;';
  const value_style =
    'border:1px dashed black; background:#ffffd4; color:#333; padding:0.25em 0.5em; font-size:12px; border-left:none; font-size:16px;';
  console.log(`%c${label}%c${msg}`, label_style, value_style);
};

/* // 2024-02-08 :: END :: Console */

/* 2024-02-16 :: START :: Ajax */
const Ajax = {};
Ajax.getSync = (url, param = {}) => {
  let result = null;
  $.ajax({
    url: url,
    method: 'GET',
    data: param,
    dataType: 'json',
    cache: false,
    async: false,
    timeout: 60 * 1000,
    success: function (response, status, xhr) {
      //console.log("AJAX success : " + url);
      result = response;
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
  return result;
};
/* // 2024-02-16 :: END :: Ajax */
