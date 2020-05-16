/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%options flex case-insensitive
%%

\s+                     /* skip whitespace */
"//"([^\n])*            /* Comentario de Linea */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]       /* Comentario Multi Linea */
[0-9]+("."[0-9]+)\b     return 'DECIMAL'
[0-9]+\b                return 'ENTERO'
\"([^\"]+|[\r\n])*\"    return 'CADENA'
\'([^\'']+|[\r\n])*\'                 return 'CARACTER'
"*"                     return '*'
"/"                     return '/'
"--"                    return '--'
"++"                    return '++'
"-"                     return '-'
"+"                     return '+'
'^^'                    return '^^'
'^'                     return '^'
"==="                   return '==='
"=="                    return '=='
"!="                    return '!='
"<="                    return '<='
">="                    return '>='
"<"                     return '<'
">"                     return '>'
"("                     return '('
")"                     return ')'
"[]"                    return '[]'
"["                     return '['
"]"                     return ']'
"{"                     return '{'
"}"                     return '}'
"="                     return '='
":="                    return ':='
":"                     return ':'
"$"                     return '$'
";"                     return 'PTCOMA'
"!"                     return '!'
"%"                     return '%'
"'"                     return 'COMILLA'
","                     return ','
"."                     return '.'
"||"                    return '||'
"&&"                    return '&&'
"true"                  return 'VERDADERO'
"false"                 return 'FALSO'
"null"                  return 'NULO'
"if"                    return 'SI'
"else"                  return 'SINO'
"while"                 return 'WHILE'
"do"                    return 'DO'
"break"                 return 'BREAK'
"continue"              return 'CONTINUE'
"print"                 return 'PRINT'
"for"                   return 'FOR'
"integer"               return 'INT'
"double"                return 'DOUBLE'
"boolean"               return 'BOOLEAN'
"char"                  return 'CHAR'
"var"                   return 'VAR'
"const"                 return 'CONST'
"global"                return 'GLOBAL'
"return"                return 'RETORNO'
"void"                  return 'VOID'
"strc"                  return 'STRC'
"define"                return 'DEFINE'
"as"                    return 'AS'
"switch"                return 'SWITCH'
"case"                  return 'CASE'
"default"               return 'DEFAULT'
"try"                   return 'TRY'
"catch"                 return 'CATCH'
"throw"                 return 'THROW'
"arithmeticException"   return 'ARITHMETICEXCEPTION'
"indexoutofboundException" return 'INDEXOUTOFBOUNDEXCEPTION'
"uncaughtException"     return 'UNCAUGHTEXCEPTION'
"nullpointerException"  return 'NULLPOINTEREXCEPTION'
"invalidCastingException" return 'INVALIDCASTINGEXCEPTION'
"heapoverflowError"     return 'HEAPOVERFLOWERROR'
"stackoverflowError"    return 'STACKOVERFLOWERROR'
"import"                return 'IMPORTAR'
[a-zA-Z_][_a-zA-Z0-9ñÑ]*  return 'ID'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */
%right '$'
%left '++' '--'

%left '^'
%left '||'
%left '&&'
%left '==' '!=' '==='
%left '<' '>' '<=' '>='
%left '+' '-'
%left '*' '/' '%'
%right '^^'
%nonassoc ')'

%right UMINUS '!'

%start INICIO

%% /* language grammar */

INICIO:
    CUERPOS EOF         { return new AstAlto($1); }
;

CUERPOS:
    CUERPOS CUERPO      { $$ = $1; $$.push($2); }
    | CUERPO            { $$ = [$1]; }
;

CUERPO:
    SENTECIA_DECLARACION            { $$ = $1; }
    | DECLARAR_ARREGLO              { $$ = $1; }
    | SENTECIA_DECLARACION PTCOMA   { $$ = $1; }
    | DECLARAR_ARREGLO PTCOMA       { $$ = $1; }
    | DECLARAR_FUNCION              { $$ = $1; }
    | SENTECIA_IMPORTAR             { $$ = $1; }
    | DEFINIR_ESTRUCTURA PTCOMA     { $$ = $1; }
    | DEFINIR_ESTRUCTURA            { $$ = $1; }
;

SENTECIA_IMPORTAR:
    IMPORTAR LISTA_ID      { $$ = new ImportarAlto($2, @1.first_line, @1.first_column); }
;

DECLARAR_FUNCION:
    TIPO ID '(' ')' '{' SENTENCIAS '}'                      { $$ = new FuncionAlto([$1], $2, [], $6, @1.first_line, @1.first_column); }
    | TIPO ID '(' PARAMETROS ')' '{' SENTENCIAS '}'         { $$ = new FuncionAlto([$1], $2, $4, $7, @1.first_line, @1.first_column); }
    | TIPO '[]' ID '(' ')' '{' SENTENCIAS '}'               { $$ = new FuncionAlto(["Tarry", $1], $3, [], $7, @1.first_line, @1.first_column); }
    | TIPO '[]' ID '(' PARAMETROS ')' '{' SENTENCIAS '}'    { $$ = new FuncionAlto(["Tarry", $1], $3, $5, $8, @1.first_line, @1.first_column); }
    | VOID ID '(' ')' '{' SENTENCIAS '}'                    { $$ = new FuncionAlto(["void"], $2, [], $6, @1.first_line, @1.first_column); }
    | VOID ID '(' PARAMETROS ')' '{' SENTENCIAS '}'         { $$ = new FuncionAlto(["void"], $2, $4, $7, @1.first_line, @1.first_column); }
;

PARAMETROS:
    PARAMETROS ',' PARAMETRO        { $$ = $1; $$.push($3); }
    | PARAMETRO                     { $$ = [$1]; }
;

PARAMETRO:
    TIPO ID         { $$ = [[$1], $2.toLocaleLowerCase()]; }
    | TIPO '[]' ID  { $$ = [["Tarry",$1], $3.toLocaleLowerCase()]; }
;


SENTENCIAS:
    SENTENCIAS SENTECIA         { $$ = $1; $$.push($2); }
    | SENTECIA                  { $$ = [$1]; }
;

SENTECIA:
    SENTECIA_DECLARACION PTCOMA     { $$ = $1; }
    | SENTECIA_ASIGNACION  PTCOMA   { $$ = $1; }
    | SENTECIA_IMPRIMIR   PTCOMA    { $$ = $1; }
    | SENTENCIA_SI                  { $$ = $1; }
    | SENTECIA_WHILE                { $$ = $1; }
    | SENTECIA_DO_WHILE PTCOMA      { $$ = $1; }
    | SENTECIA_BREAK    PTCOMA      { $$ = $1; }
    | SENTECIA_CONTINUE PTCOMA      { $$ = $1; }
    | SENTECIA_RETURN   PTCOMA      { $$ = $1; }
    | SENTECIA_LLAMADA  PTCOMA      { $$ = $1; }
    | DECLARAR_ARREGLO  PTCOMA      { $$ = $1; }
    | DEFINIR_ESTRUCTURA  PTCOMA    { $$ = $1; }
    | SENTECIA_FOR                  { $$ = $1; }
    | SENTECIA_SWITCH               { $$ = $1; }
    | SENTENCIA_TRY                 { $$ = $1; }
    | SENTENCIA_THROW   PTCOMA      { $$ = $1; }
    | ASIGNACION_ACCESOS  PTCOMA    { $$ = $1; }
    | ASIGNACION_LLAMADA  PTCOMA    { $$ = $1; }
    | EXPRESION_AUMENTO   PTCOMA    { $$ = $1; }
    | EXPRESION_DECREMENTO PTCOMA   { $$ = $1; }
    | SENTECIA_DECLARACION          { $$ = $1; }
    | SENTECIA_ASIGNACION           { $$ = $1; }
    | SENTECIA_IMPRIMIR             { $$ = $1; }
    | SENTECIA_DO_WHILE             { $$ = $1; }
    | SENTECIA_BREAK                { $$ = $1; }
    | SENTECIA_CONTINUE             { $$ = $1; }
    | SENTECIA_LLAMADA              { $$ = $1; }
    | DECLARAR_ARREGLO              { $$ = $1; }
    | DEFINIR_ESTRUCTURA            { $$ = $1; }
    | SENTENCIA_THROW               { $$ = $1; }
    | ASIGNACION_ACCESOS            { $$ = $1; }
    | ASIGNACION_LLAMADA            { $$ = $1; }
    | EXPRESION_AUMENTO             { $$ = $1; }
    | EXPRESION_DECREMENTO          { $$ = $1; }
;

SENTECIA_IMPRIMIR:
    PRINT '(' EXPRESION ')'     { $$ = new ImprimirAlto($3, @1.first_line, @1.first_column); }
;

SENTENCIA_SI:
    SI '(' EXPRESION ')' '{' SENTENCIAS '}'                         { $$ = new SiAlto($3, $6, null, @1.first_line, @1.first_column); }
    | SI '(' EXPRESION ')' '{' SENTENCIAS '}' SENTENCIA_SINO        { $$ = new SiAlto($3, $6, $8, @1.first_line, @1.first_column); }
;

SENTENCIA_SINO:
    SINO '{' SENTENCIAS '}'         { $$ = $3; }
    | SINO SENTENCIA_SI             { $$ = [$2]; }
;

SENTECIA_WHILE:
    WHILE '(' EXPRESION ')' '{' SENTENCIAS '}'         { $$ = new WhileAlto($3, $6, @1.first_line, @1.first_column); }
;

SENTECIA_DO_WHILE:
    DO '{' SENTENCIAS '}' WHILE '(' EXPRESION ')'      { $$ = new DoWhileAlto($7, $3, @1.first_line, @1.first_column); } 
;

SENTECIA_BREAK:
    BREAK           { $$ = new BreakAlto(@1.first_line, @1.first_column); }
;

SENTECIA_CONTINUE:
    CONTINUE        { $$ = new ContinueAlto(@1.first_line, @1.first_column); }
;

SENTECIA_RETURN:
    RETORNO                     { $$ = new ReturnAlto(null, @1.first_line, @1.first_column); }
    | RETORNO EXPRESION         { $$ = new ReturnAlto($2, @1.first_line, @1.first_column); }
;

SENTECIA_DECLARACION:
    TIPO LISTA_ID                       { $$ = new DeclaracionAlto([$1], $2, null, @1.first_line, @1.first_column); }
    | TIPO LISTA_ID '=' EXPRESION       { $$ = new DeclaracionAlto([$1], $2, $4, @1.first_line, @1.first_column); }
    | TIPO_DEC ID ':=' EXPRESION        { $$ = new DeclaracionSinTipoAlto([$1], $2, $4, @1.first_line, @1.first_column); }
;

LISTA_ID:
    LISTA_ID ',' ID             { $$ = $1, $$.push($3); }
    | ID                        { $$ = [$1]; }
;

TIPO_DEC:
    VAR         { $$ = "var"; }
    | CONST     { $$ = "const"; }
    | GLOBAL    { $$ = "global"; }
;

SENTECIA_ASIGNACION:
    ID '=' EXPRESION            { $$ = new AsignacionAlto($1, $3, @1.first_line, @1.first_column); }
;

SENTECIA_LLAMADA:
    ID '(' LISTA_EXPRESION ')'      { $$ = new LLamadaAlto($1, $3, @1.first_line, @1.first_column); }
    | ID '(' ')'                    { $$ = new LLamadaAlto($1, [], @1.first_line, @1.first_column); }
    | ID '(' NOMBRES ')'            { $$ = new LlamadaTipo2Alto($1, $3, @1.first_line, @1.first_column); }
;

LISTA_EXPRESION:
    LISTA_EXPRESION ',' EXPRESION       { $$ = $1; $$.push($3); }
    | EXPRESION                         { $$ = [$1]; }
;

NOMBRES:
    NOMBRES ',' NOMBRE      { $$ = $1; $$.push($3); }
    | NOMBRE                { $$ = [$1]; }
;

NOMBRE:
    ID '=' EXPRESION        { $$ = [$1.toLocaleLowerCase()]; $$.push($3); }
;

TIPO:
    INT             { $$ = 'integer'; }
    | DOUBLE        { $$ = 'double'; }
    | BOOLEAN       { $$ = 'boolean'; }
    | CHAR          { $$ = 'char'; }
    | ID            { $$ = $1.toLocaleLowerCase(); }
;

DECLARAR_ARREGLO:
    TIPO '[]' ID '=' EXPRESION       { $$ = new DeclararArregloAlto([$1], $3, $5, @1.first_line, @1.first_column); }
    | TIPO '[]' ID                     { $$ = new DeclararArregloAlto([$1], $3, null, @1.first_line, @1.first_column); }
;


DEFINIR_ESTRUCTURA:
    DEFINE ID AS '[' LISTA_ATRIBUTOS ']'    { $$ = new DefinirEstructura($2, $5, @1.first_line, @1.first_column); }
;

LISTA_ATRIBUTOS:
    LISTA_ATRIBUTOS ',' ATRIBUTO    { $$ = $1; $$.push($3); }
    | ATRIBUTO                      { $$ = [$1]; }
;

ATRIBUTO:
    TIPO ID                         { $$ = new Atributo([$1], $2, null); }
    | TIPO ID '=' EXPRESION         { $$ = new Atributo([$1], $2, $4); }
    | TIPO '[]' ID                  { $$ = new Atributo(["Tarry", $1], $3, null); }
    | TIPO '[]' ID '=' EXPRESION    { $$ = new Atributo(["Tarry", $1], $3, $5); }
;


SENTECIA_FOR:
    FOR '(' INICIO_FOR PTCOMA EXPRESION PTCOMA FIN_FOR ')' '{' SENTENCIAS '}'   { $$ =  new ForAlto($3, $5, $7, $10, @1.first_line, @1.first_column); }
    | FOR '(' PTCOMA EXPRESION PTCOMA FIN_FOR ')' '{' SENTENCIAS '}'            { $$ =  new ForAlto(null, $4, $6, $9, @1.first_line, @1.first_column); }
    | FOR '(' PTCOMA PTCOMA FIN_FOR ')' '{' SENTENCIAS '}'                      { $$ =  new ForAlto(null, null, $5, $8, @1.first_line, @1.first_column); }
    | FOR '(' PTCOMA PTCOMA ')' '{' SENTENCIAS '}'                              { $$ =  new ForAlto(null, null, null, $7, @1.first_line, @1.first_column); }
    | FOR '(' INICIO_FOR PTCOMA PTCOMA FIN_FOR ')' '{' SENTENCIAS '}'           { $$ =  new ForAlto($3, null, $6, $9, @1.first_line, @1.first_column); }
    | FOR '(' INICIO_FOR PTCOMA PTCOMA ')' '{' SENTENCIAS '}'                   { $$ =  new ForAlto($3, null, null, $8, @1.first_line, @1.first_column); }
    | FOR '(' INICIO_FOR PTCOMA EXPRESION PTCOMA ')' '{' SENTENCIAS '}'         { $$ =  new ForAlto($3, $5, null, $9, @1.first_line, @1.first_column); }
    | FOR '(' PTCOMA EXPRESION PTCOMA ')' '{' SENTENCIAS '}'                    { $$ =  new ForAlto(null, $4, null, $8, @1.first_line, @1.first_column); }
;

SENTECIA_SWITCH:
    SWITCH '(' EXPRESION ')' '{' LISTA_CASOS DEFECTO '}'    { $$ = new SeleccionarAlto($3, $6, $7, @1.first_line, @1.first_column); }
    | SWITCH '(' EXPRESION ')' '{' LISTA_CASOS '}'          { $$ = new SeleccionarAlto($3, $6, null, @1.first_line, @1.first_column); }
;

LISTA_CASOS:
    LISTA_CASOS CASO        { $$ = $1; $$.push($2); }
    | CASO                  { $$ = [$1]; }
;

CASO:
    CASE EXPRESION ':' SENTENCIAS       { $$ = new CasoAlto($2, $4, @1.first_line, @1.first_column); }
;

DEFECTO:
    DEFAULT ':' SENTENCIAS              { $$ = new CasoAlto(null, $3, @1.first_line, @1.first_column); }
;

INICIO_FOR:
    SENTECIA_DECLARACION            { $$ = $1; }
    | SENTECIA_ASIGNACION           { $$ = $1; }
;

FIN_FOR:
    SENTECIA_ASIGNACION             { $$ = $1; }
    | EXPRESION                     { $$ = $1; }
;

SENTENCIA_TRY:
    TRY '{' SENTENCIAS '}' CATCH '(' TIPO_EXCEPCION ID ')' '{' SENTENCIAS '}'   { $$ = new TryCatchAlto($3, $7, $8, $11, @1.first_line, @1.first_column); }
;

TIPO_EXCEPCION:
    ARITHMETICEXCEPTION              { $$ = "arit"; }
    | INDEXOUTOFBOUNDEXCEPTION      { $$ = "index"; }
    | UNCAUGHTEXCEPTION             { $$ = "unc"; }
    | NULLPOINTEREXCEPTION          { $$ = "null"; }
    | INVALIDCASTINGEXCEPTION       { $$ = "inval"; }
    | HEAPOVERFLOWERROR             { $$ = "heap"; }
    | STACKOVERFLOWERROR            { $$ = "stack"; }
;

SENTENCIA_THROW:
    THROW STRC TIPO_EXCEPCION '('')'        { $$ = new ThrowAlto($3, @1.first_line, @1.first_column); }
;

ASIGNACION_ACCESOS:
    ID LISTA_ACCESOS '=' EXPRESION      { $$ = new AsignacionAccesos($1, $2, $4, @1.first_line, @1.first_column); }
;

ASIGNACION_LLAMADA:
    SENTECIA_LLAMADA LISTA_ACCESOS '=' EXPRESION      { $$ = new AsignacionLlamadaAccesos($1, $2, $4, @1.first_line, @1.first_column); }
;

EXPRESION:
    EXPRESION_ARITMETICA            { $$ = $1; }
    | EXPRESION_LOGICA              { $$ = $1; }
    | EXPRESION_RELACIONAL          { $$ = $1; }
    | PRIMITIVO                     { $$ = $1; }
    | SENTECIA_LLAMADA              { $$ = $1; }
    | EXPRESION_ARREGLO             { $$ = $1; }
    | EXPRESION_ESTRUCTURA          { $$ = $1; }
    | EXPRESION_ACCESO              { $$ = $1; }
    | EXPRESION_LLAMADA_ACCESO      { $$ = $1; }
    | EXPRESION_AUMENTO             { $$ = $1; }
    | EXPRESION_DECREMENTO          { $$ = $1; }
    | EXPRESION_CASTEO              { $$ = $1; }
    | '(' EXPRESION ')'             { $$ = $2; }
    | EXPRESION_POR_VALOR           { $$ = $1; }
;

EXPRESION_ARREGLO:
    STRC TIPO '[' EXPRESION ']'     { $$ = new ArregloConTipoAlto([$2], $4, @1.first_line, @1.first_column); }
    | '{' LISTA_EXPRESION '}'       { $$ = new ArregloSinTipoAlto($2, @1.first_line, @1.first_column); }
;

EXPRESION_ESTRUCTURA:
    STRC TIPO '('')'                { $$ = new CrearEstructuraAlto($2, @1.first_line, @1.first_column); }
;

EXPRESION_ACCESO:
    ID LISTA_ACCESOS            { $$ = new AccesoAlto($1, $2, @1.first_line, @1.first_column); }
;

LISTA_ACCESOS:
    LISTA_ACCESOS ACCESO        { $$ = $1; $$.push($2); }
    | ACCESO                    { $$ = [$1]; }
;

ACCESO:
    '[' EXPRESION ']'                   {  $$ = new Acceso("arreglo", "", $2, [], @1.first_line, @1.first_column);  }
    | '.' ID                            {  $$ = new Acceso("atributo", $2, null, [], @1.first_line, @1.first_column);  }
    | '.' ID '(' ')'                        {  $$ = new Acceso("funcion", $2, null, [], @1.first_line, @1.first_column);  }
    | '.' ID '(' LISTA_EXPRESION ')'        {  $$ = new Acceso("funcion", $2, null, $4, @1.first_line, @1.first_column);  }
;

EXPRESION_LLAMADA_ACCESO:
    SENTECIA_LLAMADA LISTA_ACCESOS      { $$ = new LlamadaAccesoAlto($1, $2, @1.first_line, @1.first_column); }
;

EXPRESION_AUMENTO:
    ID '++'             { $$ = new AumentoAlto($1, @1.first_line, @1.first_column); }
;

EXPRESION_DECREMENTO:
    ID '--'             { $$ = new DecrementoAlto($1, @1.first_line, @1.first_column); }
;

EXPRESION_CASTEO:
    '(' TIPO_CASTEO ')' EXPRESION  %prec CAST   { $$ = new CasteoAlto($2, $4, @1.first_line, @1.first_column); }
;

TIPO_CASTEO:
    INT             { $$ = 'integer'; }
    | DOUBLE        { $$ = 'double'; }
    | BOOLEAN       { $$ = 'boolean'; }
    | CHAR          { $$ = 'char'; }
;

EXPRESION_POR_VALOR:
    '$' EXPRESION           { $$ = new PorValorAlto($2, @1.first_line, @1.first_column); }
;

EXPRESION_ARITMETICA:
    '-' EXPRESION %prec UMINUS      { $$ = new OperacionAlto(null, null, $2, 'U', @1.first_line, @1.first_column); }
    | EXPRESION '+' EXPRESION       { $$ = new OperacionAlto($1, $3, null, '+', @2.first_line, @2.first_column); }
    | EXPRESION '-' EXPRESION       { $$ = new OperacionAlto($1, $3, null, '-', @2.first_line, @2.first_column); }
    | EXPRESION '*' EXPRESION       { $$ = new OperacionAlto($1, $3, null, '*', @2.first_line, @2.first_column); }
    | EXPRESION '/' EXPRESION       { $$ = new OperacionAlto($1, $3, null, '/', @2.first_line, @2.first_column); }
    | EXPRESION '^^' EXPRESION      { $$ = new OperacionAlto($1, $3, null, '^^', @2.first_line, @2.first_column); }
    | EXPRESION '%' EXPRESION       { $$ = new OperacionAlto($1, $3, null, '%', @2.first_line, @2.first_column); }
;

EXPRESION_LOGICA:
    EXPRESION '||' EXPRESION        { $$ = new OperacionAlto($1, $3, null, '||', @2.first_line, @2.first_column); }
    | EXPRESION '&&' EXPRESION      { $$ = new OperacionAlto($1, $3, null, '&&', @2.first_line, @2.first_column); }
    | EXPRESION '^' EXPRESION       { $$ = new OperacionAlto($1, $3, null, '^', @2.first_line, @2.first_column); }
    | '!' EXPRESION                 { $$ = new OperacionAlto(null, null, $2, '!', @2.first_line, @2.first_column); }
;

EXPRESION_RELACIONAL:
    EXPRESION '>' EXPRESION         { $$ = new OperacionAlto($1, $3, null, '>', @2.first_line, @2.first_column); }
    | EXPRESION '<' EXPRESION       { $$ = new OperacionAlto($1, $3, null, '<', @2.first_line, @2.first_column); }
    | EXPRESION '==' EXPRESION      { $$ = new OperacionAlto($1, $3, null, '==', @2.first_line, @2.first_column); }
    | EXPRESION '===' EXPRESION     { $$ = new OperacionAlto($1, $3, null, '===', @2.first_line, @2.first_column); }
    | EXPRESION '!=' EXPRESION      { $$ = new OperacionAlto($1, $3, null, '!=', @2.first_line, @2.first_column); }
    | EXPRESION '>=' EXPRESION      { $$ = new OperacionAlto($1, $3, null, '>=', @2.first_line, @2.first_column); }
    | EXPRESION '<=' EXPRESION      { $$ = new OperacionAlto($1, $3, null, '<=', @2.first_line, @2.first_column); }
;

PRIMITIVO:
    ENTERO              { $$ = new PrimitivoAlto('integer', Number(yytext), @1.first_line, @1.first_column); }
    | DECIMAL           { $$ = new PrimitivoAlto('double', Number(yytext), @1.first_line, @1.first_column); }
    | VERDADERO         { $$ = new PrimitivoAlto('boolean', true, @1.first_line, @1.first_column); }
    | FALSO             { $$ = new PrimitivoAlto('boolean', false, @1.first_line, @1.first_column); }
    | NULO              { $$ = new PrimitivoAlto('null', 'null', @1.first_line, @1.first_column); }
    | CARACTER          {   let a = yytext;
                            if(a.length>2){
                                a = a.substr(1);
                                a = a.substr(-a.length, a.length-1);
                                a = a.replace("\\'", "\'");
                                a = a.replace("\\\"", "\"");
                                a = a.replace("\\\\", "\\");
                                a = a.replace("\\n", "\n");
                                a = a.replace("\\t", "\t");
                                a = a.replace("\\r", "\r");
                            }else
                            {
                                a = '\0';
                            }
                            
                            
                            $$ = new PrimitivoAlto('char', a, @1.first_line, @1.first_column); }
    | CADENA            {   let a2 = yytext;
                            a2 = a2.substr(1);
                            a2 = a2.substr(-a2.length, a2.length-1);
                            a2 = a2.replace("\\'", "\'");
                            a2 = a2.replace("\\\"", "\"");
                            a2 = a2.replace("\\\\", "\\");
                            a2 = a2.replace("\\n", "\n");
                            a2 = a2.replace("\\t", "\t");
                            a2 = a2.replace("\\r", "\r");
                            $$ = new PrimitivoAlto('string', a2, @1.first_line, @1.first_column); }
    | ID                { $$ = new IdentificadorAlto($1, @1.first_line, @1.first_column); }
;

