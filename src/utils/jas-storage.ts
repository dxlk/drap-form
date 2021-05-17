let pollute = function (_str = '') {
  let _strLength = _str.length;
  let _strTarget = '';
  for (let i = 0; i < _strLength; i++) {
    _strTarget += String.fromCharCode(_str.charCodeAt(i) + (_strLength - i));
  }
  return escape(_strTarget);
};

let cleanString = function (str?: any) {
  if (!str) return '';
  let _str = unescape(str);
  let _strLength = _str.length;
  let _strTarget = '';
  for (let i = 0; i < _strLength; i++) {
    _strTarget += String.fromCharCode(_str.charCodeAt(i) - (_strLength - i));
  }
  return _strTarget;
};

let set = (key: any, value: any) => {
  if (!value) return;
  let curTime = new Date().getTime();
  localStorage.setItem(key, JSON.stringify({
    data: pollute(JSON.stringify(value)),
    time: curTime
  }));
};
let baseset = (key: any, value: any) => {
  localStorage.setItem(key, value);
};
let baseget = (key: any) => {
  let data = localStorage.getItem(key);
  return data
};

let get = (key: any, exp: any) => {
  let data = localStorage.getItem(key);
  if (!data) return;

  let dataObj = JSON.parse(data);
  if (!dataObj) return;
  if (exp && new Date().getTime() - dataObj.time > exp) {
    localStorage.removeItem(key);
    return;
  }
  if (!cleanString(dataObj.data)) return;
  return JSON.parse(cleanString(dataObj.data));
};

let remove = (key: any) => {
  localStorage.removeItem(key);
};
const jasStorage = {
  get: baseget,
  set: baseset,
  timeget: get,
  timeset: set,
  remove
}
export default jasStorage