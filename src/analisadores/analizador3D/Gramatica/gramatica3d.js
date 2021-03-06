/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica3d = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,26],$V1=[1,19],$V2=[1,20],$V3=[1,24],$V4=[1,23],$V5=[1,18],$V6=[1,25],$V7=[1,16],$V8=[1,22],$V9=[1,21],$Va=[1,17],$Vb=[5,21,25,26,27,30,31,40,41,46,47,49],$Vc=[5,21,25,26,27,30,31,40,41,43,46,47,49],$Vd=[1,52],$Ve=[1,53],$Vf=[1,57],$Vg=[1,58],$Vh=[1,56],$Vi=[1,64],$Vj=[1,63],$Vk=[1,61],$Vl=[11,23],$Vm=[11,29,36,51,52,53,54,55,56,57,58,59,60,61],$Vn=[1,85],$Vo=[1,84],$Vp=[1,86],$Vq=[1,87],$Vr=[1,88],$Vs=[11,57,58,59,60,61],$Vt=[21,25,26,27,30,31,40,43,46,47,49],$Vu=[25,26,62],$Vv=[11,57,58];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"CUERPOS":4,"EOF":5,"CUERPO":6,"SENTENCIA":7,"METODO":8,"SENTENCIAS":9,"IF":10,";":11,"IMPRIMIR":12,"TEMPORAL":13,"ETIQUETAS":14,"SALTO":15,"STACK_ASIG":16,"HEAP_ASIG":17,"CALL_METODO":18,"DECLARAR_TEMP":19,"DECLARAR_STRUC":20,"var":21,"LISTA_TEMP":22,",":23,"ELEMENTO":24,"tmp":25,"ID":26,"heap":27,"[":28,"]":29,"stack":30,"print":31,"(":32,"COMILLA":33,"TIPO_PRINT":34,"PRIMITIVO":35,")":36,"printchar":37,"printdeci":38,"printent":39,"call":40,"proc":41,"begin":42,"end":43,"=":44,"EXPRESION":45,"goto":46,"etiqueta":47,":":48,"if":49,"SIGNO_SALTO":50,"==":51,"!=":52,"<":53,">":54,"<=":55,">=":56,"-":57,"+":58,"*":59,"/":60,"%":61,"NUMBER":62,"SIGNO":63,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",11:";",21:"var",23:",",25:"tmp",26:"ID",27:"heap",28:"[",29:"]",30:"stack",31:"print",32:"(",33:"COMILLA",36:")",37:"printchar",38:"printdeci",39:"printent",40:"call",41:"proc",42:"begin",43:"end",44:"=",46:"goto",47:"etiqueta",48:":",49:"if",51:"==",52:"!=",53:"<",54:">",55:"<=",56:">=",57:"-",58:"+",59:"*",60:"/",61:"%",62:"NUMBER"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[9,2],[9,1],[7,2],[7,2],[7,2],[7,1],[7,2],[7,2],[7,2],[7,2],[7,2],[7,2],[19,2],[22,3],[22,1],[24,1],[24,1],[20,4],[20,4],[12,8],[34,1],[34,1],[34,1],[18,2],[8,5],[16,6],[17,6],[15,2],[14,2],[10,8],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[13,3],[13,3],[45,2],[45,3],[45,3],[45,3],[45,3],[45,3],[45,1],[45,4],[45,4],[35,1],[35,1],[35,1],[63,1],[63,1],[63,1],[63,1],[63,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return new Ast($$[$0-1]); 
break;
case 2:

        if($$[$0] instanceof Metodo){
            this.$ = $$[$0-1]; this.$ = this.$.concat($$[$0].instruccionesMetodo);
        }else{
            this.$ = $$[$0-1]; this.$.push($$[$0]);
        }
    
break;
case 3:

        if($$[$0] instanceof Metodo){
            this.$ = $$[$0].instruccionesMetodo;;
        }else{
            this.$ = [$$[$0]];
        }
    
break;
case 4: case 21: case 22: case 26: case 27: case 28: case 36: case 37: case 38: case 39: case 40: case 41: case 50: case 56: case 57: case 58: case 59: case 60:
 this.$ = $$[$0]; 
break;
case 6:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 7:
 this.$ = []; this.$.push($$[$0]); 
break;
case 8: case 9: case 10: case 12: case 13: case 14: case 15: case 16: case 17:
 this.$ = $$[$0-1] 
break;
case 11:
 this.$ = $$[$0] 
break;
case 18:
 this.$ = new DeclararTemporales($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 19:
 this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 20:
 this.$ = [$$[$0]]; 
break;
case 23: case 24:
 this.$ = new DeclararEstructura($$[$0-2], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 25:
 this.$ = new Print($$[$0-4], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 29:
 this.$ = new Llamada($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 30:
 this.$ = new Metodo($$[$0-3], $$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 31:
 this.$ = new AsignacionEstructura("stack", $$[$0-3], $$[$0], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 32:
 this.$ = new AsignacionEstructura("heap", $$[$0-3], $$[$0], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 33:
 this.$ = new Goto($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 34:
 this.$ = new Etiqueta($$[$0-1], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 35:
 this.$ = new SaltoCondicional($$[$0-5], $$[$0-4], $$[$0-3], $$[$0], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 42: case 43:
 this.$ = new Asignacion($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 44:
 this.$ = new MenosUnario($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 45: case 46: case 47: case 48: case 49:
 this.$ = new Operacion($$[$0-1], $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 51:
 this.$ = new AccesoEstructura("stack", $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 52:
 this.$ = new AccesoEstructura("heap", $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 53:
 this.$ = new Primitivo(Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 54: case 55:
 this.$ = new Identificador($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,10:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:$V0,25:$V1,26:$V2,27:$V3,30:$V4,31:$V5,40:$V6,41:$V7,46:$V8,47:$V9,49:$Va},{1:[3]},{5:[1,27],6:28,7:4,8:5,10:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:$V0,25:$V1,26:$V2,27:$V3,30:$V4,31:$V5,40:$V6,41:$V7,46:$V8,47:$V9,49:$Va},o($Vb,[2,3]),o($Vb,[2,4]),o($Vb,[2,5]),{11:[1,29]},{11:[1,30]},{11:[1,31]},o($Vc,[2,11]),{11:[1,32]},{11:[1,33]},{11:[1,34]},{11:[1,35]},{11:[1,36]},{11:[1,37]},{26:[1,38]},{32:[1,39]},{32:[1,40]},{44:[1,41]},{44:[1,42]},{48:[1,43]},{47:[1,44]},{28:[1,45]},{28:[1,46]},{26:[1,47]},{22:48,24:51,25:$Vd,26:$Ve,27:[1,49],30:[1,50]},{1:[2,1]},o($Vb,[2,2]),o($Vc,[2,8]),o($Vc,[2,9]),o($Vc,[2,10]),o($Vc,[2,12]),o($Vc,[2,13]),o($Vc,[2,14]),o($Vc,[2,15]),o($Vc,[2,16]),o($Vc,[2,17]),{42:[1,54]},{25:$Vf,26:$Vg,35:55,62:$Vh},{33:[1,59]},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:60,57:$Vk,62:$Vh},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:65,57:$Vk,62:$Vh},o($Vc,[2,34]),{11:[2,33]},{25:$Vf,26:$Vg,35:66,62:$Vh},{25:$Vf,26:$Vg,35:67,62:$Vh},{11:[2,29]},{11:[2,18],23:[1,68]},{28:[1,69]},{28:[1,70]},o($Vl,[2,20]),o($Vl,[2,21]),o($Vl,[2,22]),{7:72,9:71,10:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:$V0,25:$V1,26:$V2,27:$V3,30:$V4,31:$V5,40:$V6,46:$V8,47:$V9,49:$Va},{50:73,51:[1,74],52:[1,75],53:[1,76],54:[1,77],55:[1,78],56:[1,79]},o($Vm,[2,53]),o($Vm,[2,54]),o($Vm,[2,55]),{34:80,37:[1,81],38:[1,82],39:[1,83]},{11:[2,42],57:$Vn,58:$Vo,59:$Vp,60:$Vq,61:$Vr},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:89,57:$Vk,62:$Vh},o($Vs,[2,50]),{28:[1,90]},{28:[1,91]},{11:[2,43],57:$Vn,58:$Vo,59:$Vp,60:$Vq,61:$Vr},{29:[1,92]},{29:[1,93]},{24:94,25:$Vd,26:$Ve},{29:[1,95]},{29:[1,96]},{7:98,10:6,12:7,13:8,14:9,15:10,16:11,17:12,18:13,19:14,20:15,21:$V0,25:$V1,26:$V2,27:$V3,30:$V4,31:$V5,40:$V6,43:[1,97],46:$V8,47:$V9,49:$Va},o($Vt,[2,7]),{25:$Vf,26:$Vg,35:99,62:$Vh},o($Vu,[2,36]),o($Vu,[2,37]),o($Vu,[2,38]),o($Vu,[2,39]),o($Vu,[2,40]),o($Vu,[2,41]),{33:[1,100]},{33:[2,26]},{33:[2,27]},{33:[2,28]},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:101,57:$Vk,62:$Vh},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:102,57:$Vk,62:$Vh},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:103,57:$Vk,62:$Vh},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:104,57:$Vk,62:$Vh},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:105,57:$Vk,62:$Vh},o($Vs,[2,44]),{25:$Vf,26:$Vg,35:106,62:$Vh},{25:$Vf,26:$Vg,35:107,62:$Vh},{44:[1,108]},{44:[1,109]},o($Vl,[2,19]),{11:[2,23]},{11:[2,24]},o($Vb,[2,30]),o($Vt,[2,6]),{36:[1,110]},{23:[1,111]},o($Vv,[2,45],{59:$Vp,60:$Vq,61:$Vr}),o($Vv,[2,46],{59:$Vp,60:$Vq,61:$Vr}),o($Vs,[2,47]),o($Vs,[2,48]),o($Vs,[2,49]),{29:[1,112]},{29:[1,113]},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:114,57:$Vk,62:$Vh},{25:$Vf,26:$Vg,27:$Vi,30:$Vj,35:62,45:115,57:$Vk,62:$Vh},{46:[1,116]},{25:$Vf,26:$Vg,35:117,62:$Vh},o($Vs,[2,51]),o($Vs,[2,52]),{11:[2,31],57:$Vn,58:$Vo,59:$Vp,60:$Vq,61:$Vr},{11:[2,32],57:$Vn,58:$Vo,59:$Vp,60:$Vq,61:$Vr},{47:[1,118]},{36:[1,119]},{11:[2,35]},{11:[2,25]}],
defaultActions: {27:[2,1],44:[2,33],47:[2,29],81:[2,26],82:[2,27],83:[2,28],95:[2,23],96:[2,24],118:[2,35],119:[2,25]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"flex":true,"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* Comentario de Linea */
break;
case 2:/* Comentario Multi Linea */
break;
case 3:return 62
break;
case 4:return 37
break;
case 5:return 38
break;
case 6:return 39
break;
case 7:return 59
break;
case 8:return 60
break;
case 9:return 57
break;
case 10:return 58
break;
case 11:return 51
break;
case 12:return 52
break;
case 13:return 55
break;
case 14:return 56
break;
case 15:return 53
break;
case 16:return 54
break;
case 17:return 32
break;
case 18:return 36
break;
case 19:return 28
break;
case 20:return 29
break;
case 21:return '{'
break;
case 22:return '}'
break;
case 23:return 44
break;
case 24:return 48
break;
case 25:return 11
break;
case 26:return 61
break;
case 27:return 33
break;
case 28:return 23
break;
case 29:return 25
break;
case 30:return 47
break;
case 31:return 49
break;
case 32:return 46
break;
case 33:return 30
break;
case 34:return 27
break;
case 35:return 40
break;
case 36:return 31
break;
case 37:return 41
break;
case 38:return 42
break;
case 39:return 43
break;
case 40:return 21
break;
case 41:return 26
break;
case 42:return 5
break;
case 43:return 'INVALID'
break;
case 44:console.log(yy_.yytext);
break;
}
},
rules: [/^(?:\s+)/i,/^(?:#([^\n])*)/i,/^(?:#\*([^\*])*\*#)/i,/^(?:(-)?[0-9]+(\.[0-9]+)?\b)/i,/^(?:%c)/i,/^(?:%d)/i,/^(?:%i)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:-)/i,/^(?:\+)/i,/^(?:==)/i,/^(?:<>)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\{)/i,/^(?:\})/i,/^(?:=)/i,/^(?::)/i,/^(?:;)/i,/^(?:%)/i,/^(?:")/i,/^(?:,)/i,/^(?:["t"][0-9]+)/i,/^(?:["L"][0-9]+)/i,/^(?:if)/i,/^(?:goto)/i,/^(?:stack)/i,/^(?:heap)/i,/^(?:call)/i,/^(?:print)/i,/^(?:proc)/i,/^(?:begin)/i,/^(?:end)/i,/^(?:var)/i,/^(?:[a-zA-Z_][_a-zA-Z0-9ñÑ]*)/i,/^(?:$)/i,/^(?:.)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica3d;
exports.Parser = gramatica3d.Parser;
exports.parse = function () { return gramatica3d.parse.apply(gramatica3d, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}