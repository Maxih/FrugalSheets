import {merge} from 'lodash';

export class Formula {
  constructor(formulaString = "") {
    this.formulaString = formulaString;
    this.funcs = {
      DIVIDE: (a, b) => {return parseInt(a) / parseInt(b)},
      ADD: (a, b) => {return parseInt(a) + parseInt(b)},
      MULT: (a, b) => {return parseInt(a) * parseInt(b)},
      MINUS: (a, b) => {return parseInt(a) - parseInt(b)},
      CONCAT: (a, b) => {return `${a}${b}`},
    }

    this.vars = this.findVars();
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

    try {
      parsed = this.parseFormula(this.formulaString);
    }
    catch(err) {
      parsed = false;
    }

    return parsed;
  }

  findVars() {
    const matcher = /([A-Z]+)([0-9]+)/g;
    let vars = this.formulaString.match(matcher);

    if(vars === null)
      return []

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

    return this.execFunc(matched[1], evaledArgs);
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
