export class Helper {
  static get = function (obj: any, key: any) {
    return key.split(".").reduce(function (o, x) {
      return (typeof o == "undefined" || o === null) ? o : o[x];
    },
      obj);
  }
  static isEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  static isBlank(str: any) {
    if ((!str || /^\s*$/.test(str))) {
      return true;
    }
    else {
      if (str !== '0') {
        return false;
      }
      else {
        return true;
      }
    }

  }
  static removeWhiteSpace(str: string) {
    return str = str.trim();
  }

  static checkisNumber(str: any) {
    if (isNaN(str)) {
      return false;
    } else {
      return true;
    }
  }
  static removeDuplicatesFromArrayObject(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }


  static getCurrentDateTime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    return dateTime;
  }

  static getCurrentDateTimeISO() {
    let today = new Date();
    return today.toISOString();
  }
}