import {merge} from 'lodash';

export class Formula {
  constructor(formulaString = "") {
    this.formulaString = formulaString;
    this.funcs = {
      DIVIDE: (a, b) => {return parseInt(a[0][0]) / parseInt(b[0][0])},
      ADD: (a, b) => {return parseInt(a[0][0]) + parseInt(b[0][0])},
      MULT: (a, b) => {return parseInt(a[0][0]) * parseInt(b[0][0])},
      MINUS: (a, b) => {return parseInt(a[0][0]) - parseInt(b[0][0])},
      CONCAT: (a, b) => {return `${a}${b}`},
      MAX: (range) => {return Math.max(...this.flattenRange(range))},
      MIN: (range) => {return Math.min(...this.flattenRange(range))},
      SUM: (range) => {return this._SUM(this.flattenRange(range))},
      VLOOKUP: (search, range, index) => {return this._VLOOKUP(search, range, index)}
    }

    this.quoted = this.safeQuotes();
    this.vars = this.findVars();
  }

  flattenRange(range) {
    let linked = [];

    for(let i = 0; i < range.length; i++) {
      for(let j = 0; j < range[0].length; j++) {
        linked.push(range[i][j]);
      }
    }

    return linked
  }

  _VLOOKUP(search, range, index) {
    index = parseInt(index);

    for(let i = 0; i < range.length; i++) {
      for(let j = 0; j < range[i].length; j++) {
        if(range[i][j] === search && j + index < range[i].length) {
          return range[i][j + index];
        }
      }
    }
    return "";
  }

  _SUM(range) {
    range = range.map((str) => (parseInt(str) ? parseInt(str) : 0));

    range = range.reduce((a, b) => {
      return a + b;
    }, 0);

    return range ? range : 0;
  }

  execFunc(fn, args) {
    args = args.map((arg) => {
      return this.vars[arg] === undefined ? arg : this.vars[arg];
    });

    return this.funcs[fn](...args);
  }

  parse(vars) {
    let parsed;

    this.vars = merge(this.vars, vars);

    //parsed = this.parseFormula(this.formulaString);

    try {
      parsed = this.parseFormula(this.formulaString);
    }
    catch(err) {
      parsed = false;
    }

    return parsed;
  }

  findVars() {
    const matcher = /([A-Z]+)([0-9]+)(:([A-Z]+)([0-9]+))?/g;
    let vars = this.formulaString.match(matcher);

    if(vars === null)
      return [];

    const varObj = {}

    vars.forEach((curVar) => {
      varObj[curVar] = false;
    });

    return varObj;
  }

  parseFormula(string) {
    const matcher = /([a-zA-Z]+)\((.+)\)/g;
    const matched = matcher.exec(string);

    if(matched === null)
      return null;

    let args = splitByComma(matched[2]);

    let evaledArgs = [];
    let replacedString = matched[2];

    for(let i = 0; i < args.length; i++) {
      let evaledArg = this.parseFormula(args[i]);

      if(evaledArg === null) {
        evaledArgs.push(args[i]);
      } else {
        evaledArgs.push(evaledArg);
      }
    }

    evaledArgs = evaledArgs.map((arg) => {
      for(let key in this.quoted) {
        arg = arg.replace(key, this.quoted[key]);
      }
      return arg;
    });

    return this.execFunc(matched[1], evaledArgs);
  }

  safeQuotes() {
    let quoted = this.formulaString.match(/".*?"/g);

    if(quoted === null) {
      return {};
    }
    const quoteMap = {};

    quoted.forEach((quote, idx) => {
      let quoteKey = `%${idx}`;
      quoteMap[quoteKey] = quote.slice(1, quote.length-1);
      this.formulaString = this.formulaString.replace(quote, quoteKey);
    });

    return quoteMap;
  }
}



function splitByComma(string) {
  let args = [];
  let ignoreLevel = 0;
  let lastSlice = 0;

  for(let i = 0; i < string.length; i++) {
    switch(string[i]) {
      case "(":
        ignoreLevel++;
        break;
      case ")":
        ignoreLevel--;
        break;
      case ",":
        if(ignoreLevel === 0) {
          args.push(string.slice(lastSlice, i));
          lastSlice = i+1;
        }
        break;
      default:
    }
  }
  args.push(string.slice(lastSlice));

  return args.map((arg) => arg.trim());
}
