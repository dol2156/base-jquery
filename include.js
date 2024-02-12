/**
 *
 * @param path
 * @constructor
 */
const Include = function (path) {
  const el_self_script_tag = document.currentScript;

  let html_str;

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    /*
    readyState
    0	UNSENT	Client has been created. open() not called yet.
    1	OPENED	open() has been called.
    2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
    3	LOADING	Downloading; responseText holds partial data.
    4	DONE	The operation is complete.
    */
    if (this.readyState == 4) {
      if (this.status == 200) {
        // success
        html_str = this.responseText;
      } else {
        // error
        const msg = '404 Not Found';
        console.log('path : ', path);
        console.log(
          `%c${msg}%c${path}`,
          'font-family:D2Coding; border:1px solid black; background:red; color:white; padding:10px; font-size:14px;',
          'font-family:D2Coding; background-color:black; border:1px solid black; border-left:none; padding:10px; color:yellow; font-size:14px;',
        );
        html_str = path;
      }
    }
  };
  xhttp.open('GET', path, false);
  xhttp.send();
  /*
  console.log("=============================================");
  console.log(`🍒 include path : ${path} 🍒`);
  console.log(html_str);
  console.log("=============================================");
   */
  if (html_str) document.write(html_str);

  el_self_script_tag.remove();
};
