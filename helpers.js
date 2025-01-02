function toTime(seconds) {
    seconds = seconds > 0? seconds: 0;
  var date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

function shuffleObject (obj) {
    var keys = Object.keys(obj).sort(function (a, b) {return Math.random() - 0.5;});
    const shuffledObj = {};
    for(let i in keys){
        let key = keys[i];
        shuffledObj[key] = obj[key];
    }
    return shuffledObj;
};

function arrayToObject(arr, def_value = ''){
    return arr.reduce(function(current, next){
      return Object.assign({}, current, {[next]: def_value});
    }, {});
}

let xhr = new XMLHttpRequest()
function ajax(url, method = 'GET', data = {}, success = new Function, error = new Function){
    xhr.open(method, url, true)
    xhr.onerror = error;
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(data));
    xhr.onload = function (e) {
        if(xhr.status === 200 && xhr.readyState === 4) {
            success(xhr.responseText);
        }else{
            error()
        }
    }
}

function _$(type, inner_html, attrs){
    let target = document.createElement(type || 'div');
    target.innerHTML = inner_html || "";
    for(let key in attrs){
        let value = attrs[key];
        target.setAttribute(key, value);
    }
    return target;
}

function rawHtml(html, ...elements){

    const ID = '_ID';

    html = html.replaceAll(/\$(\w+)/g, function(m, g1){
        if(elements[g1])
            return `<div id="${ID}-${g1}"></div>`;
        else
            return '';
    });

    let target = new _$;
    target.innerHTML = html;

    for(let i in elements){
        let _target = elements[i];
        let find_target = target.querySelector(`#${ID}-${i}`);
        if(find_target){
            find_target.parentNode.insertBefore(_target, find_target)
            find_target.remove();
        }else{
            // throw `Not found key $${i}`
        }
    }

    return target.children;
}

function _rawHtml(uri, ...elements){

    let then = function(res){
        fetch(uri)
        .then(res=>res.text())
        .then(text=>{
            let element = rawHtml(text, ...elements);
            res(element)
        })
        .catch((e) => console.log(e));
    }

    return {
        then
    };
}