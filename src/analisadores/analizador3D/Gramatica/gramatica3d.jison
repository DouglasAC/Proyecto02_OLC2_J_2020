/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%options flex case-insensitive
%%

\s+                     /* skip whitespace */
"#"([^\n])*            /* Comentario de Linea */
"#*"([^\*])*"*#"        /* Comentario Multi Linea */
("-")?[0-9]+("."[0-9]+)?\b    return 'NUMBER'
'%c'                    return 'printchar'
'%d'                    return 'printdeci'
'%i'                    return 'printent'
"*"                     return '*'
"/"                     return '/'
"-"                     return '-'
"+"                     return '+'
"=="                    return '=='
"<>"                    return '<>'
"<="                    return '<='
">="                    return '>='
"<"                     return '<'
">"                     return '>'
"("                     return '('
")"                     return ')'
"["                     return '['
"]"                     return ']'
"{"                     return '{'
"}"                     return '}'
"="                     return '='
":"                     return ':'
";"                     return ';'
"%"                     return '%'
"\""                    return 'COMILLA'
","                     return ','
["t"][0-9]+             return 'tmp'
["L"][0-9]+             return 'etiqueta'

"if"                    return 'if'
"goto"                  return 'goto'
"stack"                 return 'stack'
"heap"                  return 'heap'
"call"                  return 'call'
"print"                 return 'print'

"proc"                  return 'proc'
"begin"                 return 'begin'
"end"                   return 'end'

"var"                   return 'var'


[a-zA-Z_][_a-zA-Z0-9ñÑ]*  return 'ID'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '==' '!='
%left '<' '>' '<=' '>='
%left '+' '-'
%left '*' '/' '%'
%left '^'
%left UMINUS

%start INICIO

%% /* language grammar */

INICIO:
    CUERPOS EOF         { return new Ast($1); }
;

CUERPOS:
    CUERPOS CUERPO
    {
        if($2 instanceof Metodo){
            $$ = $1; $$ = $$.concat($2.instruccionesMetodo);
        }else{
            $$ = $1; $$.push($2);
        }
    }
    | CUERPO
    {
        if($1 instanceof Metodo){
            $$ = $1.instruccionesMetodo;;
        }else{
            $$ = [$1];
        }
    }
;

CUERPO:
    SENTENCIA           { $$ = $1; }
    | METODO
;

SENTENCIAS:
    SENTENCIAS SENTENCIA        { $$ = $1; $$.push($2); }
    | SENTENCIA                 { $$ = []; $$.push($1); }
;

SENTENCIA:
    IF             ';'          { $$ = $1 }
    | IMPRIMIR     ';'          { $$ = $1 }
    | TEMPORAL     ';'          { $$ = $1 }
    | ETIQUETAS                 { $$ = $1 }
    | SALTO        ';'          { $$ = $1 }
    | STACK_ASIG   ';'          { $$ = $1 }
    | HEAP_ASIG    ';'          { $$ = $1 }
    | CALL_METODO  ';'          { $$ = $1 }
    | DECLARAR_TEMP ';'         { $$ = $1 }
    | DECLARAR_STRUC ';'         { $$ = $1 }
;

DECLARAR_TEMP:
    'var' LISTA_TEMP        { $$ = new DeclararTemporales($2, @1.first_line, @1.first_column); }
;

LISTA_TEMP:
    LISTA_TEMP ',' ELEMENTO     { $$ = $1; $$.push($3); }
    | ELEMENTO              { $$ = [$1]; }
;

ELEMENTO:
    tmp         { $$ = $1; }
    | ID        { $$ = $1; }
;

DECLARAR_STRUC:
    'var' 'heap' '[' ']'        { $$ = new DeclararEstructura($2, @1.first_line, @1.first_column); }
    | 'var' 'stack' '[' ']'        { $$ = new DeclararEstructura($2, @1.first_line, @1.first_column); }
;

IMPRIMIR:
    'print' '(' COMILLA TIPO_PRINT COMILLA ',' PRIMITIVO ')'        { $$ = new Print($4, $7, @1.first_line, @1.first_column); }
;

TIPO_PRINT: 
    printchar       { $$ = $1; }
    | printdeci     { $$ = $1; }
    | printent      { $$ = $1; }
;

CALL_METODO:
    'call' ID       { $$ = new Llamada($2, @1.first_line, @1.first_column); }
;

METODO:
    proc ID 'begin' SENTENCIAS end      { $$ = new Metodo($2, $4, @1.first_line, @1.first_column); }
;

STACK_ASIG:
    'stack' '[' PRIMITIVO ']' '=' EXPRESION     { $$ = new AsignacionEstructura("stack", $3, $6, @1.first_line, @1.first_column); }
;

HEAP_ASIG:
    'heap' '[' PRIMITIVO ']' '=' EXPRESION      { $$ = new AsignacionEstructura("heap", $3, $6, @1.first_line, @1.first_column); }
;

SALTO: 
    'goto' etiqueta     { $$ = new Goto($2, @1.first_line, @1.first_column); }
;

ETIQUETAS: 
    etiqueta ':'    { $$ = new Etiqueta($1, @1.first_line, @1.first_column); }
;

IF:
    'if' '(' PRIMITIVO SIGNO_SALTO PRIMITIVO ')' 'goto' etiqueta
    { $$ = new SaltoCondicional($3, $4, $5, $8, @1.first_line, @1.first_column); }
;

SIGNO_SALTO:
    '=='        { $$ = $1; }
    | '<>'      { $$ = $1; }
    | '<'       { $$ = $1; }
    | '>'       { $$ = $1; }
    | '<='      { $$ = $1; }
    | '>='      { $$ = $1; }
;

TEMPORAL:
    tmp '=' EXPRESION               { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); }
    | ID  '=' EXPRESION             { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); }
;

EXPRESION:
    '-' EXPRESION %prec UMINUS        { $$ = new MenosUnario($2, @1.first_line, @1.first_column); }
    | EXPRESION "+" EXPRESION           { $$ = new Operacion($2, $1, $3, @1.first_line, @1.first_column); }
    | EXPRESION "-" EXPRESION           { $$ = new Operacion($2, $1, $3, @1.first_line, @1.first_column); }
    | EXPRESION "*" EXPRESION           { $$ = new Operacion($2, $1, $3, @1.first_line, @1.first_column); }
    | EXPRESION "/" EXPRESION           { $$ = new Operacion($2, $1, $3, @1.first_line, @1.first_column); }
    | EXPRESION "%" EXPRESION           { $$ = new Operacion($2, $1, $3, @1.first_line, @1.first_column); }
    | PRIMITIVO                         { $$ = $1; }
    | 'stack' '[' PRIMITIVO ']'         { $$ = new AccesoEstructura("stack", $3, @1.first_line, @1.first_column); }
    | 'heap' '[' PRIMITIVO ']'          { $$ = new AccesoEstructura("heap", $3, @1.first_line, @1.first_column); }
   
;



PRIMITIVO:
    NUMBER      { $$ = new Primitivo(Number($1), @1.first_line, @1.first_column); }
    | tmp       { $$ = new Identificador($1, @1.first_line, @1.first_column); }
    | ID        { $$ = new Identificador($1, @1.first_line, @1.first_column); }
;

SIGNO:
    '+'         { $$ = $1; }
    | '-'       { $$ = $1; }
    | '*'       { $$ = $1; }
    | '/'       { $$ = $1; }
    | '%'       { $$ = $1; }
;
