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



%start INICIO

%% /* language grammar */

INICIO:
    CUERPOS EOF         { return new ArbolOp($1); }
;

CUERPOS:
    CUERPOS CUERPO      { $$ = $1; $$.push($2); }
    | CUERPO            { $$ = [$1]; }
;

CUERPO:
    DECLARAR_TEMPORALES ';'        { $$ = $1; }
    | DECLARAR_ESTRUCTURA ';'      { $$ = $1; }
    | ASIGNAR_OPERACION ';'        { $$ = $1; }
    | ASIGNAR_SIMPLE ';'           { $$ = $1; }
    | ASIGNAR_ESTRUCTURA ';'       { $$ = $1; }
    | ASIGNAR_EN_ESTRUCTURA ';'    { $$ = $1; }
    | DESTINO                      { $$ = $1; }
    | SALTO_INCONDICIONAL ';'      { $$ = $1; }
    | SALTO_CONDICIONAL ';'        { $$ = $1; }
    | INICIO_PROCEDIMIENTO         { $$ = $1; }
    | FIN_PROCEDIMIENTO            { $$ = $1; }
    | LLAMADA ';'                  { $$ = $1; }
    | IMPRIMIR ';'                 { $$ = $1; }
;

DECLARAR_TEMPORALES:
    'var' LISTA_TEMPORALES    { $$ = new DeclararTempOp($2, @1.first_line, @1.first_column); }
;

LISTA_TEMPORALES:
    LISTA_TEMPORALES ',' TEMPORAL       { $$ = $1; $$.push($3); }
    | TEMPORAL                          { $$ = [$1]; }
;

TEMPORAL:
    tmp             { $$ = $1; }
    | ID            { $$ = $1; }
;

DECLARAR_ESTRUCTURA:
    'var' heap '[' ']'            { $$ = new DeclararEstruOp("Heap", @1.first_line, @1.first_column); }
    | 'var' stack '[' ']'         { $$ = new DeclararEstruOp("Stack", @1.first_line, @1.first_column); }
;

ASIGNAR_OPERACION:
    TEMPORAL '=' VALOR TIPO_OPERACION VALOR  { $$ = new AsignarOperacionOp($1, $3, $4, $5, @1.first_line, @1.first_column); }
;

TIPO_OPERACION:
    '+'         { $$ = '+'; }
    | '-'       { $$ = '-'; }
    | '*'       { $$ = '*'; }
    | '/'       { $$ = '/'; }
    | '%'       { $$ = '%'; }
;

VALOR:
    NUMBER              { $$ = $1; }
    | TEMPORAL          { $$ = $1; }
    | '-' NUMBER        { $$ = "-" + $2; }
    | '-' TEMPORAL      { $$ = '-' + $2; }
;

ASIGNAR_SIMPLE:
    TEMPORAL '=' VALOR      { $$ = new AsignarSimpleOp($1, $3, @1.first_line, @1.first_column); }
;

ASIGNAR_ESTRUCTURA:
    TEMPORAL '=' heap '[' VALOR ']'         { $$ = new AsignarEstruOp($1, "Heap", $5, @1.first_line, @1.first_column); }
    | TEMPORAL '=' stack '[' VALOR ']'      { $$ = new AsignarEstruOp($1, "Stack", $5, @1.first_line, @1.first_column); }
;

ASIGNAR_EN_ESTRUCTURA:
    heap '[' VALOR ']' '=' VALOR            { $$ = new AsignarEnEstruOp("Heap", $3, $6, @1.first_line, @1.first_column); }
    | stack '[' VALOR ']' '=' VALOR         { $$ = new AsignarEnEstruOp("Stack", $3, $6, @1.first_line, @1.first_column); }
;

DESTINO:
    etiqueta ":"            { $$ = new EtiquetaOp($1, @1.first_line, @1.first_column); }
;

SALTO_INCONDICIONAL:
    goto etiqueta           { $$ = new SaltoIncondicionalOp($2, @1.first_line, @1.first_column); }
;

SALTO_CONDICIONAL:
    if '(' VALOR TIPO_SALTO VALOR ')' goto etiqueta     { $$ = new SaltoCondicionalOp($3, $4, $5, $8, @1.first_line, @1.first_column); }
;

TIPO_SALTO:
    '=='        { $$ = $1; }
    | '<>'      { $$ = $1; }
    | '<'       { $$ = $1; }
    | '>'       { $$ = $1; }
    | '<='      { $$ = $1; }
    | '>='      { $$ = $1; }
;

INICIO_PROCEDIMIENTO:
    proc ID begin           { $$ = new InicioProcOp($2, @1.first_line, @1.first_column); }
;

FIN_PROCEDIMIENTO:
    end                     { $$ = new FinProcOp(@1.first_line, @1.first_column); }
;

LLAMADA:
    call ID             { $$ = new LlamadaOp($2, @1.first_line, @1.first_column); }
;

IMPRIMIR:
    'print' '(' COMILLA TIPO_PRINT COMILLA ',' VALOR ')'        { $$ = new PrintOp($4, $7, @1.first_line, @1.first_column); }
;

TIPO_PRINT: 
    printchar       { $$ = $1; }
    | printdeci     { $$ = $1; }
    | printent      { $$ = $1; }
;
