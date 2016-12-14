import {merge} from 'lodash';
import {
  parseCoord,
  numToChar,
  charToNum,
} from '../utils/grid_utils';

import math from 'mathjs';

export class Formula {
  constructor(formulaString = "") {
    this.formulaString = formulaString;
    this.funcs = {
      DIVIDE: (...args) => {return this._DIVIDE(args)},
      ADD: (...args) => {return this._ADD(args)},
      MULT: (...args) => {return this._MULT(args)},
      MINUS: (...args) => {return this._MINUS(args)},
      CONCAT: (...args) => {return this._CONCAT(args)},
      MAX: (...range) => {return this._MAX(range)},
      MIN: (...range) => {return this._MIN(range)},
      SUM: (...range) => {return this._SUM(range)},
      AVG: (...range) => {return this._AVG(range)},
      STD: (norm, ...range) => {return this._STD(norm, range)},
      VAR: (norm, ...range) => {return this._VAR(norm, range)},
      MEDIAN: (...range) => {return this._MEDIAN(range)},
      MEAN: (...range) => {return this._MEAN(range)},
      VLOOKUP: (search, range, index) => {return this._VLOOKUP(search, range, index)}
    }

    this.quoted = this.safeQuotes();
    this.vars = this.findVars();
  }

  prepArgs(args) {
    let newArgs = [];
    args.forEach((arg) => {
      if(typeof this.vars[arg] === 'object') {
        Object.values(this.vars[arg]).forEach((i) => {
          newArgs.push(i);
        });
      } else {
        newArgs.push(arg);
      }
    });
    return newArgs;
  }

  _AVG(args) {
    let newArgs = this.prepArgs(args);
    let finalArgs = [];

    newArgs.forEach((arg) => {
      const num = parseFloat(arg);

      if(!isNaN(num))
        finalArgs.push(num);

    });

    if(finalArgs.length > 0)
      return math.sum(finalArgs) / finalArgs.length;
    else
      return "";
  }

  _STD(norm, args) {
    let newArgs = this.prepArgs(args);
    let finalArgs = [];

    switch(norm) {
      case 'uncorrected':
      case 'biased':
      case 'unbiased':
        break
      default:
        norm = 'unbiased';
    }

    newArgs.forEach((arg) => {
      const num = parseFloat(arg);

      if(!isNaN(num))
        finalArgs.push(num);

    });

    if(finalArgs.length > 0)
      return math.std(finalArgs, norm);
    else
      return "";
  }

  _VAR(norm, args) {
    let newArgs = this.prepArgs(args);
    let finalArgs = [];

    switch(norm) {
      case 'uncorrected':
      case 'biased':
      case 'unbiased':
        break
      default:
        norm = 'unbiased';
    }

    newArgs.forEach((arg) => {
      const num = parseFloat(arg);

      if(!isNaN(num))
        finalArgs.push(num);

    });

    if(finalArgs.length > 0)
      return math.var(finalArgs, norm);
    else
      return "";
  }

  _MEDIAN(args) {
    let newArgs = this.prepArgs(args);
    let finalArgs = [];

    newArgs.forEach((arg) => {
      const num = parseFloat(arg);

      if(!isNaN(num))
        finalArgs.push(num);

    });

    if(finalArgs.length > 0)
      return math.median(finalArgs);
    else
      return "";
  }

  _MEAN(args) {
    let newArgs = this.prepArgs(args);
    let finalArgs = [];

    newArgs.forEach((arg) => {
      const num = parseFloat(arg);

      if(!isNaN(num))
        finalArgs.push(num);

    });

    if(finalArgs.length > 0)
      return math.mean(finalArgs);
    else
      return "";
  }


  _MIN(args) {
    let newArgs = this.prepArgs(args);
    let finalArgs = [];

    newArgs.forEach((arg) => {
      const num = parseFloat(arg);

      if(!isNaN(num))
        finalArgs.push(num);

    });

    if(finalArgs.length > 0)
      return math.min(finalArgs);
    else
      return "";
  }

  _MAX(args) {
    let newArgs = this.prepArgs(args);
    let finalArgs = [];

    newArgs.forEach((arg) => {
      const num = parseFloat(arg);

      if(!isNaN(num))
        finalArgs.push(num);

    });

    if(finalArgs.length > 0)
      return math.max(finalArgs);
    else
      return "";
  }

  _CONCAT(args) {
    let newArgs = this.prepArgs(args);

    newArgs = newArgs.reduce((a, b) => {
      return `${a}${b}`;
    }, "");

    return newArgs ? newArgs : "";
  }

  _SUM(args) {
    let newArgs = this.prepArgs(args);
    newArgs = newArgs.map((str) => (parseFloat(str) ? parseFloat(str) : 0));

    newArgs = newArgs.reduce((a, b) => {
      return a + b;
    }, 0);

    return newArgs ? newArgs : 0;
  }

  _DIVIDE(args) {
    let newArgs = this.prepArgs(args);

    newArgs = newArgs.map((str) => (parseFloat(str) ? parseFloat(str) : 1));

    let firstArg = newArgs[0];

    newArgs = newArgs.slice(1).reduce((a, b) => {
      return a / b;
    }, firstArg);

    return newArgs ? newArgs : 0;
  }

  _MULT(args) {
    let newArgs = this.prepArgs(args);

    newArgs = newArgs.map((str) => (parseFloat(str) ? parseFloat(str) : 1));
    newArgs = newArgs.reduce((a, b) => {
      return a * b;
    }, 1);

    return newArgs ? newArgs : 0;
  }

  _ADD(args) {
    return this._SUM(args);
  }

  _MINUS(args) {
    let newArgs = this.prepArgs(args);

    newArgs = newArgs.map((str) => (parseFloat(str) ? parseFloat(str) : 0));

    let firstArg = newArgs[0];

    newArgs = newArgs.slice(1).reduce((a, b) => {
      return a - b;
    }, firstArg);

    return newArgs ? newArgs : 0;
  }

  _VLOOKUP(search, range, index) {
    index = parseInt(index);

    const searchRange = this.vars[range];

    for(let cellId in searchRange) {
      if(searchRange[cellId] === search) {
        const coord = parseCoord(cellId);
        const newCellId = `${numToChar(coord.start.col + index)}${coord.start.row }`
        return searchRange[newCellId] || "";
      }
    }

    return "";
  }



  execFunc(fn, args) {
    if(this.funcs[fn] === undefined)
      return ""

    return this.funcs[fn](...args);
  }

  parse(vars) {
    let parsed;

    this.vars = merge(this.vars, vars);

    parsed = this.parseFormula(this.formulaString);

    // try {
    //   parsed = this.parseFormula(this.formulaString);
    // }
    // catch(err) {
    //   parsed = false;
    // }

    return parsed;
  }

  findVars() {
    const matcher = /([a-zA-Z0-9]+!)?([a-zA-Z]+)([0-9]+)(:([a-zA-Z]+)([0-9]+))?/g;

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
