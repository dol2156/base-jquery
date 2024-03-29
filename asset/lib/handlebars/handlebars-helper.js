/* 2024-02-08 :: START :: Handlebars */
Handlebars.logger.level = 'debug';

/**
 * n 회 반복
 * ex)
 * {{#LOOP 10}}
 *   {{index}} {{number}} {{digit}}
 * {{/LOOP}}
 */
Handlebars.registerHelper('LOOP', function (n, block) {
  var accum = '';
  for (var i = 0; i < n; ++i)
    accum += block.fn({
      index: i,
      number: i + 1,
      digit: (i + 1).toString().padStart(2, '0'),
    });
  return accum;
});

/**
 * 루프
 * {{#EACH array}} OR {{#EACH (ARR '🍎|🍍|🥝|🍇|🍈')}}
 *   <div>
 *     {{obj}}
 *   </div>
 * {{/EACH}}
 */
Handlebars.registerHelper('EACH', function (data_list, options) {
  let accum = '';
  if (arguments.length > 1 && data_list) {
    data_list.forEach((obj, idx) => {
      const obj_result = {
        obj: obj,
        index: idx,
        number: idx + 1,
        digit: (idx + 1).toString().padStart(2, '0'),
      };

      accum += options.fn(obj_result);
    });
  }
  return accum;
});

/**
 * String to Array
 * EACH 와 같이 쓰임
 * {{#EACH (ARR '🍎|🍍|🥝|🍇|🍈')}}
 */
Handlebars.registerHelper('ARR', function (array_str, options) {
  let arr;
  if (array_str) {
    arr = array_str.split('|');
  } else {
    arr = false;
  }
  return arr;
});

/**
 * active_index 에 해당되면 문자열 반환
 * {{ON 0}}
 * 또는
 * {{ON 0 '_on'}}
 */
Handlebars.registerHelper('ON', function (active_index, custom_str, options) {
  const { index } = this;
  if (typeof custom_str != 'string') custom_str = 'On';
  const result = active_index === index ? custom_str : '';
  return result;
});

/**
 * 데이터에 \n 이 들어있을때 <br/> 로 치환
 * ex) {{BR string}}
 */
Handlebars.registerHelper('BR', function (text, options) {
  text = Handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br/>');
  text = text.replace(/\\n/g, '<br>');

  return new Handlebars.SafeString(text);
});

/**
 * 랜덤 난수
 * 1~10 중에서 랜덤 수
 * ex) {{RANDOM 1 10 }}
 */
Handlebars.registerHelper('RANDOM', function (MIN, MAX) {
  const k = Math.random() * (MAX - MIN) + MIN;
  return k;
});

/**
 * 랜덤 정수
 * 1~10 중에서 랜덤 뽑기
 * ex) {{INT 1 10 }}
 */
Handlebars.registerHelper('INT', function (MIN, MAX) {
  const k = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

  return k;
});

/**
 * 수식과 숫자 x 를 받아서 반환
 * ex) {{MATH 'x+1' index}}
 * ex) {{MATH '(x%2===1)?1:(x%6===0)?1:2' number}}
 */
Handlebars.registerHelper('MATH', function (mathematics, x) {
  const result = eval(mathematics);
  return result;
});

/**
 * Object 에 노드 추가
 * {{VAR this 'NAME' 'ksm'}}
 */
Handlebars.registerHelper('VAR', function (object, node_name, value, options) {
  object[node_name] = value;
});

/**
 * 값 합치기
 * ex) {{ADD this 'NAME' (ADD 'ksm_' @key) }}
 */
Handlebars.registerHelper('ADD', function (v1, v2, options) {
  return v1 + v2;
});

/**
 * Partial 사용시에 경로를 동적으로 넣어야하는 경우가 있을때 사용
 * {{> (PATH obj.partial_path) }}
 */
Handlebars.registerHelper('PATH', function (path, options) {
  if (typeof path !== 'string') {
    return '';
  } else {
    return path;
  }
});

/**
 * 조건문 받아서 Boolean 반환
 * {{#if (IF this '==' true)}}
 *   <div>TRUE</div>
 * {{else}}
 *   <div>FALSE</div>
 * {{/if}}
 */
Handlebars.registerHelper('IF', function (v1, condition, v2, options) {
  if (
    eval(`v1
    ${condition}
    v2`)
  ) {
    // return options.fn(this);
    return true;
  } else {
    // return options.inverse(this);
    return false;
  }
});

/**
 * if 문과 함께 사용하고 , condition에 배열 스트링 받아서 포함여부 Boolean 으로 반환
 * {{#if (CONATIN BTN1 '할인률순,인기순')}}
 */
Handlebars.registerHelper('CONATIN', function (p1, condition, options) {
  let is_contain = false;
  const arr = condition.split(',');

  let i = 0;
  let len_i = arr.length;
  while (i < len_i) {
    const obj = arr[i].trim();
    if (obj == p1) {
      is_contain = true;
      break;
    }
    ++i;
  }
  return is_contain;
});

/**
 * 기본값 할당
 * {{DF 'array' '1|2|3'}}
 */
Handlebars.registerHelper('DF', function (node_name, value, options) {
  const object = this;

  if (value.name !== 'DF') {
    if (typeof object === 'object') {
      if (typeof object[node_name] === 'undefined') {
        console.warn(`Handlebars : DF : ${node_name} : ${value}`);
        object[node_name] = value;
      } else {
        // console.warn(`Handlebars : DF : ${node_name}에 이미 값이 할당 되어 있습니다.`);
        // console.log(`${node_name} == `, object[node_name]);
      }
    }
  } else {
    // value 가 할당 되지 않았을 경우 경고
    console.error('Handlebars : DF : value 가 필요합니다.');
  }
});

/**
 * node_에 값이 있나 체크 후 경고
 * {{NULL_CHECK 'id'}}
 */
Handlebars.registerHelper(
  'NULL_CHECK',
  function (node_name, location_info, options) {
    const data = this[node_name];
    if (typeof data === 'undefined') {
      console.error(
        `${location_info} : ${node_name} 의 값이 지정되어 있지 않습니다.`,
      );
    }
  },
);

/**
 * root 데이터 있나 없나 체크
 */
Handlebars.registerHelper('DV', function (options) {
  const root = this;

  const len = Object.keys(root).length;

  if (len == 1 && Object.keys(root)[0] == 'window') {
    return options.fn(this);
    // return true;
  } else {
    return options.inverse(this);
    // return false;
  }
});

/**
 * root 에 데이터 있나 확인 하고 없으면 node_name 할당
 * {{SAFE 'array' '1|2|3'}}
 */
Handlebars.registerHelper('SAFE', function (node_name, value, options) {
  if (typeof this[node_name] === 'undefined') {
    if (arguments.length == 2) {
      this[node_name] = node_name;
    }

    if (arguments.length == 3) {
      this[node_name] = value;
    }
  }
});

/**
 * 조건 중 하나라도 true 이면 true 반환
 * {{#if (OR (IF index '==' 0) (IF index '==' 1))}}
 */
Handlebars.registerHelper('OR', function (options) {
  let reslut = false;
  let boolean_arr = [];

  let i = 0;
  let len_i = arguments.length - 1;
  while (i < len_i) {
    boolean_arr.push(arguments[i]);
    ++i;
  }

  boolean_arr.forEach((obj, idx) => {
    if (obj == true) reslut = true;
  });

  return reslut;
});

/**
 * var_list_str (변수 리스트) 받아서 모두 true 이면 true 반환
 * {{#AND 'txt1|txt2'}}
 *   TRUE
 * {{else}}
 *   FALSE
 * {{/AND}}
 */
Handlebars.registerHelper('AND', function (var_list_str, options) {
  if (arguments.length != 2) return false;

  let reslut = true;
  const var_list = var_list_str.split('|');

  let i = 0;
  let len_i = var_list.length;
  while (i < len_i) {
    const node_name = var_list[i];
    const v = this[node_name];
    if (typeof v === 'undefined') {
      reslut = false;
      break;
    }
    ++i;
  }
  console.log(`reslut == `, reslut);

  if (reslut) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

/**
 * Handlebars.xlsxToHTML('Sample', 'Tpl_sample');
 * @param xlsx_file_name
 * @param template_file_name
 */
Handlebars.xlsxToHTML = (xlsx_file_name, template_file_name) => {
  const xlsx_path = `/assets/xlsx/${xlsx_file_name}.xlsx`;

  Handlebars.xlsxToJSON(xlsx_path, (res) => {
    Handlebars.templateToHTML(template_file_name, res);
  });
};

/**
 * 비동기 xlsx 로드 후 JSON 반환
 * Handlebars.xlsxToJSON('/assets/xlsx/Sample.xlsx', (res) => {
 *   console.log(`res == `, res);
 * });
 * @param fileUrl
 * @param callback
 */
Handlebars.xlsxToJSON = function (fileUrl, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', fileUrl, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = function (e) {
    var arraybuffer = xhr.response;
    var data = new Uint8Array(arraybuffer);
    var workbook = XLSX.read(data, { type: 'array' });
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    var json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // json 가공
    // 첫번째 row 를 기준으로 비어있는 값에 null 값을 넣어준다.
    var first_row_data = json[0];
    var col_len = first_row_data.length;

    json.forEach((obj, idx) => {
      let i = 0;
      while (i < col_len) {
        if (obj[i]) {
          // console.log(obj[i]);
        } else {
          obj[i] = null;
        }
        ++i;
      }
    });

    let result_array = [];
    // index 값 기반을 첫번째 row 의 값 기준 데이터로 변환
    json.forEach((obj, idx) => {
      const new_obj = {};
      if (idx != 0) {
        // console.log(first_row_data);
        obj.forEach((obj2, idx2) => {
          new_obj[first_row_data[idx2]] = obj2;
          //console.log(obj2);
        });

        result_array.push(new_obj);
      }
    });

    callback(result_array);
  };

  xhr.send();
};

/**
 *
 * @param json_file_name
 * @param callback
 */
Handlebars.loadJson = (json_file_name, callback) => {
  const json_path = `assets/json/${json_file_name}.json`;

  $.ajax({
    url: json_path,
    method: 'GET',
    dataType: 'json',
    cache: false,
    async: true,
    timeout: 60 * 1000,
    success: function (response, status, xhr) {
      //console.log("AJAX success : " + json_path);
      if (callback) callback(response);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('AJAX error : ' + json_path);
      console.log('status : ' + jqXHR.status);
      console.log('textStatus : ' + textStatus);
    },
    complete: function (jqXHR, textStatus) {
      //console.log("AJAX complete : " + json_path);
    },
  });
};

/**
 * Handlebars.jsonToHTML(`news_list`, `Tpl_11101448`);
 * @param json_file_name
 * @param template_file_name
 */
Handlebars.jsonToHTML = (json_file_name, template_file_name, callback) => {
  Handlebars.loadJson(json_file_name, (res) => {
    Handlebars.templateToHTML(template_file_name, res);
    if (callback) callback(res);
  });
};

/**
 * 동기 방식 /assets/template 폴더의 템플릿 로드하여 컴파일 후 렌더링
 * Handlebars.xlsxToJSON(xlsx_path, (res) => {
 *   Handlebars.templateToHTML(template_file_name, res);
 * });
 * @param template_file_name
 * @param render_data
 */
Handlebars.templateToHTML = (template_file_name, render_data) => {
  const template_path = `/assets/template/${template_file_name}.hbs`;

  $.ajax({
    url: template_path,
    method: 'GET',
    dataType: 'html',
    cache: false,
    async: false,
    timeout: 60 * 1000,
    success: function (response, status, xhr) {
      //console.log("AJAX success : " + url);

      //Compile the template
      const compiled_template = Handlebars.compile(response);

      //Render the data into the template
      let rendered = compiled_template(render_data);
      rendered =
        `<!-- ${template_file_name} :: START ::  -->` +
        rendered +
        `<!-- // ${template_file_name} :: END ::  -->`;

      $(`#${template_file_name}`).replaceWith(rendered);
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
};

/**
 * template_str + render_data 반환
 * @param tpl_id
 * @param render_data
 * ex)
 * <script type="text/x-handlebars-template">
 *   {{#EACH this}}
 *     <div>
 *       {{obj.name}}
 *     </div>
 *   {{/EACH}}
 * </script>
 * <script>
 *   const json = Ajax.getSync('https://jsonplaceholder.typicode.com/users');
 *   Handlebars.write(json);
 * </script>
 */
Handlebars.write = (render_data = {}, $tpl = null) => {
  const current_script = document.currentScript;

  let $template;
  if ($tpl) {
    $template = $tpl;
  } else {
    $template = $(current_script).prev(
      'script[type="text/x-handlebars-template"]',
    );
  }

  if ($template.length == 0) {
    Console.error('Target is Null', 'Handlebars.write');
    return;
  }

  const tpl_string = $template.html();

  //Compile the template
  const compiled_template = Handlebars.compile(tpl_string);

  // inject render_data
  let rendered = compiled_template(render_data);
  $(rendered).insertAfter($template);

  $template.remove();
  $(current_script).remove();
};

/* // 2024-02-08 :: END :: Handlebars */


