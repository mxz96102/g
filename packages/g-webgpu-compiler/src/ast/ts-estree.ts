/**
 * borrow from https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/typescript-estree/src/ts-estree/ts-estree.ts
 */
import { AST_NODE_TYPES, AST_TOKEN_TYPES } from './ts-ast-node-types';

export interface LineAndColumnData {
  /**
   * Line number (1-indexed)
   */
  line: number;
  /**
   * Column number on the line (0-indexed)
   */
  column: number;
}
export interface SourceLocation {
  /**
   * The position of the first character of the parsed source region
   */
  start: LineAndColumnData;
  /**
   * The position of the first character after the parsed source region
   */
  end: LineAndColumnData;
}
export type Range = [number, number];

export interface BaseNode {
  /**
   * The source location information of the node.
   */
  loc: SourceLocation;
  /**
   * An array of two numbers.
   * Both numbers are a 0-based index which is the position in the array of source code characters.
   * The first is the start position of the node, the second is the end position of the node.
   */
  range: Range;
  /**
   * The parent node of the current node
   */
  parent?: Node;

  // every node *will* have a type, but let the nodes define their own exact string
  // type: string;

  // we don't ever set this from within ts-estree
  // source?: string | null;
}

/*
 * Token and Comment are pseudo-nodes to represent pieces of source code
 *
 * NOTE:
 * They are not included in the `Node` union below on purpose because they
 * are not ever included as part of the standard AST tree.
 */
interface BaseToken extends BaseNode {
  value: string;
}

export interface BooleanToken extends BaseToken {
  type: AST_TOKEN_TYPES.Boolean;
}

export interface IdentifierToken extends BaseToken {
  type: AST_TOKEN_TYPES.Identifier;
}

export interface JSXIdentifierToken extends BaseToken {
  type: AST_TOKEN_TYPES.JSXIdentifier;
}

export interface JSXTextToken extends BaseToken {
  type: AST_TOKEN_TYPES.JSXText;
}

export interface KeywordToken extends BaseToken {
  type: AST_TOKEN_TYPES.Keyword;
}

export interface NullToken extends BaseToken {
  type: AST_TOKEN_TYPES.Null;
}

export interface NumericToken extends BaseToken {
  type: AST_TOKEN_TYPES.Numeric;
}

export interface PunctuatorToken extends BaseToken {
  type: AST_TOKEN_TYPES.Punctuator;
}

export interface RegularExpressionToken extends BaseToken {
  type: AST_TOKEN_TYPES.RegularExpression;
  regex: {
    pattern: string;
    flags: string;
  };
}

export interface StringToken extends BaseToken {
  type: AST_TOKEN_TYPES.String;
}

export interface TemplateToken extends BaseToken {
  type: AST_TOKEN_TYPES.Template;
}

export interface BlockComment extends BaseToken {
  type: AST_TOKEN_TYPES.Block;
}

export interface LineComment extends BaseToken {
  type: AST_TOKEN_TYPES.Line;
}

export type Comment = BlockComment | LineComment;
export type Token =
  | BooleanToken
  | Comment
  | IdentifierToken
  | JSXIdentifierToken
  | JSXTextToken
  | KeywordToken
  | NullToken
  | NumericToken
  | PunctuatorToken
  | RegularExpressionToken
  | StringToken
  | TemplateToken;

export type OptionalRangeAndLoc<T> = Pick<T, Exclude<keyof T, 'range' | 'loc'>> & {
  range?: Range;
  loc?: SourceLocation;
};

// Every single valid AST Node
// Please keep it sorted alphabetically.
export type Node =
  | ArrayExpression
  | ArrayPattern
  | ArrowFunctionExpression
  | AssignmentExpression
  | AssignmentPattern
  | AwaitExpression
  | BigIntLiteral
  | BinaryExpression
  | BlockStatement
  | BreakStatement
  | CallExpression
  | CatchClause
  | ClassBody
  | ClassDeclaration
  | ClassExpression
  | ClassProperty
  | ConditionalExpression
  | ContinueStatement
  | DebuggerStatement
  | Decorator
  | DoWhileStatement
  | EmptyStatement
  | ExportAllDeclaration
  | ExportDefaultDeclaration
  | ExportNamedDeclaration
  | ExportSpecifier
  | ExpressionStatement
  | ForInStatement
  | ForOfStatement
  | ForStatement
  | FunctionDeclaration
  | FunctionExpression
  | Identifier
  | IfStatement
  | Import
  | ImportDeclaration
  | ImportDefaultSpecifier
  | ImportNamespaceSpecifier
  | ImportSpecifier
  | JSXAttribute
  | JSXClosingElement
  | JSXClosingFragment
  | JSXElement
  | JSXEmptyExpression
  | JSXExpressionContainer
  | JSXFragment
  | JSXIdentifier
  | JSXOpeningElement
  | JSXOpeningFragment
  | JSXSpreadAttribute
  | JSXSpreadChild
  | JSXMemberExpression
  | JSXText
  | LabeledStatement
  | Literal
  | LogicalExpression
  | MemberExpression
  | MetaProperty
  | MethodDefinition
  | NewExpression
  | ObjectExpression
  | ObjectPattern
  | OptionalCallExpression
  | OptionalMemberExpression
  | Program
  | Property
  | RestElement
  | ReturnStatement
  | SequenceExpression
  | SpreadElement
  | Super
  | SwitchCase
  | SwitchStatement
  | TaggedTemplateExpression
  | TemplateElement
  | TemplateLiteral
  | ThisExpression
  | ThrowStatement
  | TryStatement
  | TSAbstractClassProperty
  | TSAbstractKeyword
  | TSAbstractMethodDefinition
  | TSAnyKeyword
  | TSArrayType
  | TSAsExpression
  | TSAsyncKeyword
  | TSBigIntKeyword
  | TSBooleanKeyword
  | TSCallSignatureDeclaration
  | TSClassImplements
  | TSConditionalType
  | TSConstructorType
  | TSConstructSignatureDeclaration
  | TSDeclareFunction
  | TSDeclareKeyword
  | TSEmptyBodyFunctionExpression
  | TSEnumDeclaration
  | TSEnumMember
  | TSExportAssignment
  | TSExportKeyword
  | TSExternalModuleReference
  | TSFunctionType
  | TSImportEqualsDeclaration
  | TSImportType
  | TSIndexedAccessType
  | TSIndexSignature
  | TSInferType
  | TSInterfaceDeclaration
  | TSInterfaceBody
  | TSInterfaceHeritage
  | TSIntersectionType
  | TSLiteralType
  | TSMappedType
  | TSMethodSignature
  | TSModuleBlock
  | TSModuleDeclaration
  | TSNamespaceExportDeclaration
  | TSNeverKeyword
  | TSNonNullExpression
  | TSNullKeyword
  | TSNumberKeyword
  | TSObjectKeyword
  | TSOptionalType
  | TSParameterProperty
  | TSParenthesizedType
  | TSPropertySignature
  | TSPublicKeyword
  | TSPrivateKeyword
  | TSProtectedKeyword
  | TSQualifiedName
  | TSReadonlyKeyword
  | TSRestType
  | TSStaticKeyword
  | TSStringKeyword
  | TSSymbolKeyword
  | TSThisType
  | TSTupleType
  | TSTypeAliasDeclaration
  | string
  | TSTypeAssertion
  | TSTypeLiteral
  | TSTypeOperator
  | TSTypeParameter
  | TSTypeParameterDeclaration
  | TSTypeParameterInstantiation
  | TSTypePredicate
  | TSTypeQuery
  | TSTypeReference
  | TSUndefinedKeyword
  | TSUnionType
  | TSUnknownKeyword
  | TSVoidKeyword
  | UpdateExpression
  | UnaryExpression
  | VariableDeclaration
  | VariableDeclarator
  | WhileStatement
  | WithStatement
  | YieldExpression;

//////////
// Reusable Unions
//  These are based off of types used in the Typescript AST definitions
//  **Ensure you sort the union members alphabetically**
//////////

export type Accessibility = 'public' | 'protected' | 'private';
export type BindingPattern = ArrayPattern | ObjectPattern;
export type BindingName = BindingPattern | Identifier;
export type ClassElement =
  | ClassProperty
  | MethodDefinition
  | TSAbstractClassProperty
  | TSAbstractMethodDefinition
  | TSIndexSignature;
export type ClassProperty = ClassPropertyComputedName | ClassPropertyNonComputedName;
export type DeclarationStatement =
  | ClassDeclaration
  | ClassExpression
  | ExportDefaultDeclaration
  | ExportAllDeclaration
  | ExportNamedDeclaration
  | FunctionDeclaration
  | TSDeclareFunction
  | TSImportEqualsDeclaration
  | TSInterfaceDeclaration
  | TSModuleDeclaration
  | TSNamespaceExportDeclaration
  | TSTypeAliasDeclaration
  | TSEnumDeclaration;
export type EntityName = Identifier | TSQualifiedName;
export type ExportDeclaration =
  | ClassDeclaration
  | ClassExpression
  | FunctionDeclaration
  | TSDeclareFunction
  | TSEnumDeclaration
  | TSInterfaceDeclaration
  | TSModuleDeclaration
  | TSTypeAliasDeclaration
  | VariableDeclaration;
export type Expression =
  | ArrowFunctionExpression
  | AssignmentExpression
  | BinaryExpression
  | ConditionalExpression
  | JSXClosingElement
  | JSXClosingFragment
  | JSXExpressionContainer
  | JSXOpeningElement
  | JSXOpeningFragment
  | JSXSpreadChild
  | LogicalExpression
  | NewExpression
  | RestElement
  | SequenceExpression
  | SpreadElement
  | TSAsExpression
  | TSUnaryExpression
  | YieldExpression;
export type ExpressionWithTypeArguments = TSClassImplements | TSInterfaceHeritage;
export type ForInitialiser = Expression | VariableDeclaration;
export type ImportClause = ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier;
export type IterationStatement =
  | DoWhileStatement
  | ForInStatement
  | ForOfStatement
  | ForStatement
  | WhileStatement;
export type JSXChild = JSXElement | JSXExpression | JSXFragment | JSXText;
export type JSXExpression = JSXEmptyExpression | JSXSpreadChild | JSXExpressionContainer;
export type JSXTagNameExpression = JSXIdentifier | JSXMemberExpression;
export type LeftHandSideExpression =
  | CallExpression
  | ClassExpression
  | ClassDeclaration
  | FunctionExpression
  | LiteralExpression
  | MemberExpression
  | OptionalCallExpression
  | OptionalMemberExpression
  | PrimaryExpression
  | TaggedTemplateExpression
  | TSNonNullExpression
  | TSAsExpression
  | ArrowFunctionExpression;
export type Literal = BooleanLiteral | NumberLiteral | NullLiteral | RegExpLiteral | StringLiteral;
export type LiteralExpression = BigIntLiteral | Literal | TemplateLiteral;
export type MemberExpression = MemberExpressionComputedName | MemberExpressionNonComputedName;
export type MethodDefinition = MethodDefinitionComputedName | MethodDefinitionNonComputedName;
export type Modifier =
  | TSAbstractKeyword
  | TSAsyncKeyword
  | TSDeclareKeyword
  | TSExportKeyword
  | TSPublicKeyword
  | TSPrivateKeyword
  | TSProtectedKeyword
  | TSReadonlyKeyword
  | TSStaticKeyword;
export type ObjectLiteralElementLike =
  | MethodDefinition
  | Property
  | SpreadElement
  | TSAbstractMethodDefinition;
export type OptionalMemberExpression =
  | OptionalMemberExpressionComputedName
  | OptionalMemberExpressionNonComputedName;
export type Parameter =
  | AssignmentPattern
  | RestElement
  | ArrayPattern
  | ObjectPattern
  | Identifier
  | TSParameterProperty;
export type DestructuringPattern =
  | Identifier
  | ObjectPattern
  | ArrayPattern
  | RestElement
  | AssignmentPattern
  | MemberExpression;
export type PrimaryExpression =
  | ArrayExpression
  | ArrayPattern
  | ClassExpression
  | FunctionExpression
  | Identifier
  | Import
  | JSXElement
  | JSXFragment
  | JSXOpeningElement
  | Literal
  | LiteralExpression
  | MetaProperty
  | ObjectExpression
  | ObjectPattern
  | Super
  | TemplateLiteral
  | ThisExpression
  | TSNullKeyword;
export type Property = PropertyComputedName | PropertyNonComputedName;
export type PropertyName = PropertyNameComputed | PropertyNameNonComputed;
export type PropertyNameComputed = Expression;
export type PropertyNameNonComputed = Identifier | StringLiteral | NumberLiteral;
export type Statement =
  | BlockStatement
  | BreakStatement
  | ContinueStatement
  | DebuggerStatement
  | DeclarationStatement
  | EmptyStatement
  | ExpressionStatement
  | IfStatement
  | IterationStatement
  | ImportDeclaration
  | LabeledStatement
  | TSModuleBlock
  | ReturnStatement
  | SwitchStatement
  | ThrowStatement
  | TryStatement
  | VariableDeclaration
  | WithStatement;
export type TSAbstractClassProperty =
  | TSAbstractClassPropertyComputedName
  | TSAbstractClassPropertyNonComputedName;
export type TSAbstractMethodDefinition =
  | TSAbstractMethodDefinitionComputedName
  | TSAbstractMethodDefinitionNonComputedName;
export type TSMethodSignature = TSMethodSignatureComputedName | TSMethodSignatureNonComputedName;
export type TSPropertySignature =
  | TSPropertySignatureComputedName
  | TSPropertySignatureNonComputedName;
export type TSEnumMember = TSEnumMemberComputedName | TSEnumMemberNonComputedName;
export type TSUnaryExpression =
  | AwaitExpression
  | LeftHandSideExpression
  | TSTypeAssertion
  | UnaryExpression
  | UpdateExpression;
export type TypeElement =
  | TSCallSignatureDeclaration
  | TSConstructSignatureDeclaration
  | TSIndexSignature
  | TSMethodSignature
  | TSPropertySignature;
export type TypeNode =
  | ThisExpression
  | TSAnyKeyword
  | TSArrayType
  | TSBigIntKeyword
  | TSBooleanKeyword
  | TSClassImplements
  | TSConditionalType
  | TSConstructorType
  | TSFunctionType
  | TSImportType
  | TSIndexedAccessType
  | TSInferType
  | TSInterfaceHeritage
  | TSIntersectionType
  | TSLiteralType
  | TSMappedType
  | TSNeverKeyword
  | TSNullKeyword
  | TSNumberKeyword
  | TSObjectKeyword
  | TSOptionalType
  | TSParenthesizedType
  | TSRestType
  | TSStringKeyword
  | TSSymbolKeyword
  | TSThisType
  | TSTupleType
  | TSTypeLiteral
  | TSTypeOperator
  | TSTypePredicate
  | TSTypeReference
  | TSTypeQuery
  | TSUndefinedKeyword
  | TSUnionType
  | TSUnknownKeyword
  | TSVoidKeyword;

///////////////
// Base, common types
//  **Ensure you sort the interfaces alphabetically**
///////////////

interface BinaryExpressionBase extends BaseNode {
  operator: string;
  left: Expression;
  right: Expression;
}

interface CallExpressionBase extends BaseNode {
  callee: LeftHandSideExpression;
  arguments: Expression[];
  typeParameters?: TSTypeParameterInstantiation;
  optional: boolean;
}

interface ClassDeclarationBase extends BaseNode {
  typeParameters?: TSTypeParameterDeclaration;
  superTypeParameters?: TSTypeParameterInstantiation;
  id: Identifier | null;
  body: ClassBody;
  superClass: LeftHandSideExpression | null;
  implements?: ExpressionWithTypeArguments[];
  abstract?: boolean;
  declare?: boolean;
  decorators?: Decorator[];
}

/** this should not be directly used - instead use ClassPropertyComputedNameBase or ClassPropertyNonComputedNameBase */
interface ClassPropertyBase extends BaseNode {
  key: PropertyName;
  value: Expression | null;
  computed: boolean;
  static: boolean;
  declare: boolean;
  readonly?: boolean;
  decorators?: Decorator[];
  accessibility?: Accessibility;
  optional?: boolean;
  definite?: boolean;
  typeAnnotation?: string;
}

interface ClassPropertyComputedNameBase extends ClassPropertyBase {
  key: PropertyNameComputed;
  computed: true;
}

interface ClassPropertyNonComputedNameBase extends ClassPropertyBase {
  key: PropertyNameNonComputed;
  computed: false;
}

interface FunctionDeclarationBase extends BaseNode {
  id: Identifier | null;
  generator: boolean;
  expression: boolean;
  async: boolean;
  params: Parameter[];
  body?: BlockStatement | null;
  returnType?: string;
  typeParameters?: TSTypeParameterDeclaration;
  declare?: boolean;
}

interface FunctionSignatureBase extends BaseNode {
  params: Parameter[];
  returnType?: string;
  typeParameters?: TSTypeParameterDeclaration;
}

interface LiteralBase extends BaseNode {
  raw: string;
  value: boolean | number | RegExp | string | null;
  regex?: {
    pattern: string;
    flags: string;
  };
}

/** this should not be directly used - instead use MemberExpressionComputedNameBase or MemberExpressionNonComputedNameBase */
interface MemberExpressionBase extends BaseNode {
  object: LeftHandSideExpression;
  property: Expression | Identifier;
  computed: boolean;
  optional: boolean;
}

interface MemberExpressionComputedNameBase extends MemberExpressionBase {
  property: Expression;
  computed: true;
}

interface MemberExpressionNonComputedNameBase extends MemberExpressionBase {
  property: Identifier;
  computed: false;
}

/** this should not be directly used - instead use MethodDefinitionComputedNameBase or MethodDefinitionNonComputedNameBase */
interface MethodDefinitionBase extends BaseNode {
  key: PropertyName;
  value: FunctionExpression | TSEmptyBodyFunctionExpression;
  computed: boolean;
  static: boolean;
  kind: 'method' | 'get' | 'set' | 'constructor';
  decorators?: Decorator[];
  accessibility?: Accessibility;
  typeParameters?: TSTypeParameterDeclaration;
}

interface MethodDefinitionComputedNameBase extends MethodDefinitionBase {
  key: PropertyNameComputed;
  computed: true;
}

interface MethodDefinitionNonComputedNameBase extends MethodDefinitionBase {
  key: PropertyNameNonComputed;
  computed: false;
}

interface PropertyBase extends BaseNode {
  type: AST_NODE_TYPES.Property;
  key: PropertyName;
  value: Expression | AssignmentPattern | BindingName;
  computed: boolean;
  method: boolean;
  shorthand: boolean;
  kind: 'init' | 'get' | 'set';
}

interface TSEnumMemberBase extends BaseNode {
  type: AST_NODE_TYPES.TSEnumMember;
  id:
    | PropertyNameNonComputed
    // this should only happen in semantically invalid code (ts error 1164)
    | PropertyNameComputed;
  initializer?: Expression;
  computed?: boolean;
}

interface TSHeritageBase extends BaseNode {
  expression: Expression;
  typeParameters?: TSTypeParameterInstantiation;
}

interface TSMethodSignatureBase extends BaseNode {
  type: AST_NODE_TYPES.TSMethodSignature;
  key: PropertyName;
  computed: boolean;
  params: Parameter[];
  optional?: boolean;
  returnType?: string;
  readonly?: boolean;
  typeParameters?: TSTypeParameterDeclaration;
  accessibility?: Accessibility;
  export?: boolean;
  static?: boolean;
}

interface TSPropertySignatureBase extends BaseNode {
  type: AST_NODE_TYPES.TSPropertySignature;
  key: PropertyName;
  optional?: boolean;
  computed: boolean;
  typeAnnotation?: string;
  initializer?: Expression;
  readonly?: boolean;
  static?: boolean;
  export?: boolean;
  accessibility?: Accessibility;
}

interface UnaryExpressionBase extends BaseNode {
  operator: string;
  prefix: boolean;
  argument: LeftHandSideExpression | Literal | UnaryExpression;
}

///////////////
// Typescript ESTree Nodes
//  **Ensure you sort the interfaces alphabetically**
///////////////

export interface ArrayExpression extends BaseNode {
  type: AST_NODE_TYPES.ArrayExpression;
  elements: Expression[];
}

export interface ArrayPattern extends BaseNode {
  type: AST_NODE_TYPES.ArrayPattern;
  elements: Array<DestructuringPattern | null>;
  typeAnnotation?: string;
  optional?: boolean;
  decorators?: Decorator[];
}

export interface ArrowFunctionExpression extends BaseNode {
  type: AST_NODE_TYPES.ArrowFunctionExpression;
  generator: boolean;
  id: null;
  params: Parameter[];
  body: Expression | BlockStatement;
  async: boolean;
  expression: boolean;
  returnType?: string;
  typeParameters?: TSTypeParameterDeclaration;
}

export interface AssignmentExpression extends BinaryExpressionBase {
  type: AST_NODE_TYPES.AssignmentExpression;
}

export interface AssignmentPattern extends BaseNode {
  type: AST_NODE_TYPES.AssignmentPattern;
  left: BindingName;
  right: Expression;
  typeAnnotation?: string;
  optional?: boolean;
  decorators?: Decorator[];
}

export interface AwaitExpression extends BaseNode {
  type: AST_NODE_TYPES.AwaitExpression;
  argument: TSUnaryExpression;
}

export interface BigIntLiteral extends LiteralBase {
  type: AST_NODE_TYPES.BigIntLiteral;
}

export interface BinaryExpression extends BinaryExpressionBase {
  type: AST_NODE_TYPES.BinaryExpression;
}

export interface BlockStatement extends BaseNode {
  type: AST_NODE_TYPES.BlockStatement;
  body: Statement[];
}

export interface BooleanLiteral extends LiteralBase {
  type: AST_NODE_TYPES.Literal;
  value: boolean;
}

export interface BreakStatement extends BaseNode {
  type: AST_NODE_TYPES.BreakStatement;
  label: Identifier | null;
}

export interface CallExpression extends CallExpressionBase {
  type: AST_NODE_TYPES.CallExpression;
  optional: false;
}

export interface CatchClause extends BaseNode {
  type: AST_NODE_TYPES.CatchClause;
  param: BindingName | null;
  body: BlockStatement;
}

export interface ClassBody extends BaseNode {
  type: AST_NODE_TYPES.ClassBody;
  body: ClassElement[];
}

export interface ClassDeclaration extends ClassDeclarationBase {
  type: AST_NODE_TYPES.ClassDeclaration;
}

export interface ClassExpression extends ClassDeclarationBase {
  type: AST_NODE_TYPES.ClassExpression;
}

export interface ClassPropertyComputedName extends ClassPropertyComputedNameBase {
  type: AST_NODE_TYPES.ClassProperty;
}

export interface ClassPropertyNonComputedName extends ClassPropertyNonComputedNameBase {
  type: AST_NODE_TYPES.ClassProperty;
}

export interface ConditionalExpression extends BaseNode {
  type: AST_NODE_TYPES.ConditionalExpression;
  test: Expression;
  consequent: Expression;
  alternate: Expression;
}

export interface ContinueStatement extends BaseNode {
  type: AST_NODE_TYPES.ContinueStatement;
  label: Identifier | null;
}

export interface DebuggerStatement extends BaseNode {
  type: AST_NODE_TYPES.DebuggerStatement;
}

export interface Decorator extends BaseNode {
  type: AST_NODE_TYPES.Decorator;
  expression: LeftHandSideExpression;
}

export interface DoWhileStatement extends BaseNode {
  type: AST_NODE_TYPES.DoWhileStatement;
  test: Expression;
  body: Statement;
}

export interface EmptyStatement extends BaseNode {
  type: AST_NODE_TYPES.EmptyStatement;
}

export interface ExportAllDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ExportAllDeclaration;
  source: Expression | null;
  exportKind: 'type' | 'value';
  exported: Identifier | null;
}

export interface ExportDefaultDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ExportDefaultDeclaration;
  declaration: ExportDeclaration | Expression;
}

export interface ExportNamedDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ExportNamedDeclaration;
  declaration: ExportDeclaration | null;
  specifiers: ExportSpecifier[];
  source: Expression | null;
  exportKind: 'type' | 'value';
}

export interface ExportSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ExportSpecifier;
  local: Identifier;
  exported: Identifier;
}

export interface ExpressionStatement extends BaseNode {
  type: AST_NODE_TYPES.ExpressionStatement;
  expression: Expression;
  directive?: string;
}

export interface ForInStatement extends BaseNode {
  type: AST_NODE_TYPES.ForInStatement;
  left: ForInitialiser;
  right: Expression;
  body: Statement;
}

export interface ForOfStatement extends BaseNode {
  type: AST_NODE_TYPES.ForOfStatement;
  left: ForInitialiser;
  right: Expression;
  body: Statement;
  await: boolean;
}

export interface ForStatement extends BaseNode {
  type: AST_NODE_TYPES.ForStatement;
  init: Expression | ForInitialiser | null;
  test: Expression | null;
  update: Expression | null;
  body: Statement;
}

export interface FunctionDeclaration extends FunctionDeclarationBase {
  type: AST_NODE_TYPES.FunctionDeclaration;
  body: BlockStatement;
}

export interface FunctionExpression extends FunctionDeclarationBase {
  type: AST_NODE_TYPES.FunctionExpression;
}

export interface Identifier extends BaseNode {
  type: AST_NODE_TYPES.Identifier;
  name: string;
  typeAnnotation?: string;
  optional?: boolean;
  decorators?: Decorator[];
}

export interface IfStatement extends BaseNode {
  type: AST_NODE_TYPES.IfStatement;
  test: Expression;
  consequent: Statement;
  alternate: Statement | null;
}

export interface Import extends BaseNode {
  type: AST_NODE_TYPES.Import;
}

export interface ImportDeclaration extends BaseNode {
  type: AST_NODE_TYPES.ImportDeclaration;
  source: Literal;
  specifiers: ImportClause[];
  importKind: 'type' | 'value';
}

export interface ImportDefaultSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ImportDefaultSpecifier;
  local: Identifier;
}

export interface ImportNamespaceSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ImportNamespaceSpecifier;
  local: Identifier;
}

export interface ImportSpecifier extends BaseNode {
  type: AST_NODE_TYPES.ImportSpecifier;
  local: Identifier;
  imported: Identifier;
}

export interface JSXAttribute extends BaseNode {
  type: AST_NODE_TYPES.JSXAttribute;
  name: JSXIdentifier;
  value: Literal | JSXExpression | null;
}

export interface JSXClosingElement extends BaseNode {
  type: AST_NODE_TYPES.JSXClosingElement;
  name: JSXTagNameExpression;
}

export interface JSXClosingFragment extends BaseNode {
  type: AST_NODE_TYPES.JSXClosingFragment;
}

export interface JSXElement extends BaseNode {
  type: AST_NODE_TYPES.JSXElement;
  openingElement: JSXOpeningElement;
  closingElement: JSXClosingElement | null;
  children: JSXChild[];
}

export interface JSXEmptyExpression extends BaseNode {
  type: AST_NODE_TYPES.JSXEmptyExpression;
}

export interface JSXExpressionContainer extends BaseNode {
  type: AST_NODE_TYPES.JSXExpressionContainer;
  expression: Expression | JSXEmptyExpression;
}

export interface JSXFragment extends BaseNode {
  type: AST_NODE_TYPES.JSXFragment;
  openingFragment: JSXOpeningFragment;
  closingFragment: JSXClosingFragment;
  children: JSXChild[];
}

export interface JSXIdentifier extends BaseNode {
  type: AST_NODE_TYPES.JSXIdentifier;
  name: string;
}

export interface JSXMemberExpression extends BaseNode {
  type: AST_NODE_TYPES.JSXMemberExpression;
  object: JSXTagNameExpression;
  property: JSXIdentifier;
}

export interface JSXOpeningElement extends BaseNode {
  type: AST_NODE_TYPES.JSXOpeningElement;
  typeParameters?: TSTypeParameterInstantiation;
  selfClosing: boolean;
  name: JSXTagNameExpression;
  attributes: JSXAttribute[];
}

export interface JSXOpeningFragment extends BaseNode {
  type: AST_NODE_TYPES.JSXOpeningFragment;
}

export interface JSXSpreadAttribute extends BaseNode {
  type: AST_NODE_TYPES.JSXSpreadAttribute;
  argument: Expression;
}

export interface JSXSpreadChild extends BaseNode {
  type: AST_NODE_TYPES.JSXSpreadChild;
  expression: Expression | JSXEmptyExpression;
}

export interface JSXText extends BaseNode {
  type: AST_NODE_TYPES.JSXText;
  value: string;
  raw: string;
}

export interface LabeledStatement extends BaseNode {
  type: AST_NODE_TYPES.LabeledStatement;
  label: Identifier;
  body: Statement;
}

export interface LogicalExpression extends BinaryExpressionBase {
  type: AST_NODE_TYPES.LogicalExpression;
}

export interface MemberExpressionComputedName extends MemberExpressionComputedNameBase {
  type: AST_NODE_TYPES.MemberExpression;
  optional: false;
}

export interface MemberExpressionNonComputedName extends MemberExpressionNonComputedNameBase {
  type: AST_NODE_TYPES.MemberExpression;
  optional: false;
}

export interface MetaProperty extends BaseNode {
  type: AST_NODE_TYPES.MetaProperty;
  meta: Identifier;
  property: Identifier;
}

export interface MethodDefinitionComputedName extends MethodDefinitionComputedNameBase {
  type: AST_NODE_TYPES.MethodDefinition;
}

export interface MethodDefinitionNonComputedName extends MethodDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.MethodDefinition;
}

export interface NewExpression extends BaseNode {
  type: AST_NODE_TYPES.NewExpression;
  callee: LeftHandSideExpression;
  arguments: Expression[];
  typeParameters?: TSTypeParameterInstantiation;
}

export interface NumberLiteral extends LiteralBase {
  type: AST_NODE_TYPES.Literal;
  value: number;
}

export interface NullLiteral extends LiteralBase {
  type: AST_NODE_TYPES.Literal;
  value: null;
}

export interface ObjectExpression extends BaseNode {
  type: AST_NODE_TYPES.ObjectExpression;
  properties: ObjectLiteralElementLike[];
}

export interface ObjectPattern extends BaseNode {
  type: AST_NODE_TYPES.ObjectPattern;
  properties: Array<Property | RestElement>;
  typeAnnotation?: string;
  optional?: boolean;
  decorators?: Decorator[];
}

export interface OptionalCallExpression extends CallExpressionBase {
  type: AST_NODE_TYPES.OptionalCallExpression;
  optional: boolean;
}

export interface OptionalMemberExpressionComputedName extends MemberExpressionComputedNameBase {
  type: AST_NODE_TYPES.OptionalMemberExpression;
  optional: boolean;
}

export interface OptionalMemberExpressionNonComputedName
  extends MemberExpressionNonComputedNameBase {
  type: AST_NODE_TYPES.OptionalMemberExpression;
  optional: boolean;
}

export interface Program extends BaseNode {
  type: AST_NODE_TYPES.Program;
  body: Statement[];
  sourceType: 'module' | 'script';
  comments?: Comment[];
  tokens?: Token[];
}

export interface PropertyComputedName extends PropertyBase {
  key: PropertyNameComputed;
  computed: true;
}

export interface PropertyNonComputedName extends PropertyBase {
  key: PropertyNameNonComputed;
  computed: false;
}

export interface RegExpLiteral extends LiteralBase {
  type: AST_NODE_TYPES.Literal;
  value: RegExp;
}

export interface RestElement extends BaseNode {
  type: AST_NODE_TYPES.RestElement;
  argument: DestructuringPattern;
  typeAnnotation?: string;
  optional?: boolean;
  value?: AssignmentPattern;
  decorators?: Decorator[];
}

export interface ReturnStatement extends BaseNode {
  type: AST_NODE_TYPES.ReturnStatement;
  argument: Expression | null;
}

export interface SequenceExpression extends BaseNode {
  type: AST_NODE_TYPES.SequenceExpression;
  expressions: Expression[];
}

export interface SpreadElement extends BaseNode {
  type: AST_NODE_TYPES.SpreadElement;
  argument: Expression;
}

export interface StringLiteral extends LiteralBase {
  type: AST_NODE_TYPES.Literal;
  value: string;
}

export interface Super extends BaseNode {
  type: AST_NODE_TYPES.Super;
}

export interface SwitchCase extends BaseNode {
  type: AST_NODE_TYPES.SwitchCase;
  test: Expression | null;
  consequent: Statement[];
}

export interface SwitchStatement extends BaseNode {
  type: AST_NODE_TYPES.SwitchStatement;
  discriminant: Expression;
  cases: SwitchCase[];
}

export interface TaggedTemplateExpression extends BaseNode {
  type: AST_NODE_TYPES.TaggedTemplateExpression;
  typeParameters?: TSTypeParameterInstantiation;
  tag: LeftHandSideExpression;
  quasi: TemplateLiteral;
}

export interface TemplateElement extends BaseNode {
  type: AST_NODE_TYPES.TemplateElement;
  value: {
    raw: string;
    cooked: string;
  };
  tail: boolean;
}

export interface TemplateLiteral extends BaseNode {
  type: AST_NODE_TYPES.TemplateLiteral;
  quasis: TemplateElement[];
  expressions: Expression[];
}

export interface ThisExpression extends BaseNode {
  type: AST_NODE_TYPES.ThisExpression;
}

export interface ThrowStatement extends BaseNode {
  type: AST_NODE_TYPES.ThrowStatement;
  argument: Statement | TSAsExpression | null;
}

export interface TryStatement extends BaseNode {
  type: AST_NODE_TYPES.TryStatement;
  block: BlockStatement;
  handler: CatchClause | null;
  finalizer: BlockStatement;
}

export interface TSAbstractClassPropertyComputedName extends ClassPropertyComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractClassProperty;
}

export interface TSAbstractClassPropertyNonComputedName extends ClassPropertyNonComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractClassProperty;
}

export interface TSAbstractKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSAbstractKeyword;
}

export interface TSAbstractMethodDefinitionComputedName extends MethodDefinitionComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractMethodDefinition;
}

export interface TSAbstractMethodDefinitionNonComputedName
  extends MethodDefinitionNonComputedNameBase {
  type: AST_NODE_TYPES.TSAbstractMethodDefinition;
}

export interface TSAnyKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSAnyKeyword;
}

export interface TSArrayType extends BaseNode {
  type: AST_NODE_TYPES.TSArrayType;
  elementType: TypeNode;
}

export interface TSAsExpression extends BaseNode {
  type: AST_NODE_TYPES.TSAsExpression;
  expression: Expression;
  typeAnnotation: TypeNode;
}

export interface TSAsyncKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSAsyncKeyword;
}

export interface TSBigIntKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSBigIntKeyword;
}

export interface TSBooleanKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSBooleanKeyword;
}

export interface TSCallSignatureDeclaration extends FunctionSignatureBase {
  type: AST_NODE_TYPES.TSCallSignatureDeclaration;
}

export interface TSClassImplements extends TSHeritageBase {
  type: AST_NODE_TYPES.TSClassImplements;
}

export interface TSConditionalType extends BaseNode {
  type: AST_NODE_TYPES.TSConditionalType;
  checkType: TypeNode;
  extendsType: TypeNode;
  trueType: TypeNode;
  falseType: TypeNode;
}

export interface TSConstructorType extends FunctionSignatureBase {
  type: AST_NODE_TYPES.TSConstructorType;
}

export interface TSConstructSignatureDeclaration extends FunctionSignatureBase {
  type: AST_NODE_TYPES.TSConstructSignatureDeclaration;
}

export interface TSDeclareFunction extends FunctionDeclarationBase {
  type: AST_NODE_TYPES.TSDeclareFunction;
}

export interface TSDeclareKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSDeclareKeyword;
}

export interface TSEmptyBodyFunctionExpression extends FunctionDeclarationBase {
  type: AST_NODE_TYPES.TSEmptyBodyFunctionExpression;
  body: null;
}

export interface TSEnumDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSEnumDeclaration;
  id: Identifier;
  members: TSEnumMember[];
  const?: boolean;
  declare?: boolean;
  modifiers?: Modifier[];
  decorators?: Decorator[];
}

/**
 * this should only really happen in semantically invalid code (errors 1164 and 2452)
 *
 * VALID:
 * enum Foo { ['a'] }
 *
 * INVALID:
 * const x = 'a';
 * enum Foo { [x] }
 * enum Bar { ['a' + 'b'] }
 */
export interface TSEnumMemberComputedName extends TSEnumMemberBase {
  id: PropertyNameComputed;
  computed: true;
}

export interface TSEnumMemberNonComputedName extends TSEnumMemberBase {
  id: PropertyNameNonComputed;
  computed?: false;
}

export interface TSExportAssignment extends BaseNode {
  type: AST_NODE_TYPES.TSExportAssignment;
  expression: Expression;
}

export interface TSExportKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSExportKeyword;
}

export interface TSExternalModuleReference extends BaseNode {
  type: AST_NODE_TYPES.TSExternalModuleReference;
  expression: Expression;
}

export interface TSFunctionType extends FunctionSignatureBase {
  type: AST_NODE_TYPES.TSFunctionType;
}

export interface TSImportEqualsDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSImportEqualsDeclaration;
  id: Identifier;
  moduleReference: EntityName | TSExternalModuleReference;
  isExport: boolean;
}

export interface TSImportType extends BaseNode {
  type: AST_NODE_TYPES.TSImportType;
  isTypeOf: boolean;
  parameter: TypeNode;
  qualifier: EntityName | null;
  typeParameters: TSTypeParameterInstantiation | null;
}

export interface TSIndexedAccessType extends BaseNode {
  type: AST_NODE_TYPES.TSIndexedAccessType;
  objectType: TypeNode;
  indexType: TypeNode;
}

export interface TSIndexSignature extends BaseNode {
  type: AST_NODE_TYPES.TSIndexSignature;
  parameters: Parameter[];
  typeAnnotation?: string;
  readonly?: boolean;
  accessibility?: Accessibility;
  export?: boolean;
  static?: boolean;
}

export interface TSInferType extends BaseNode {
  type: AST_NODE_TYPES.TSInferType;
  typeParameter: TSTypeParameterDeclaration;
}

export interface TSInterfaceDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSInterfaceDeclaration;
  body: TSInterfaceBody;
  id: Identifier;
  typeParameters?: TSTypeParameterDeclaration;
  extends?: ExpressionWithTypeArguments[];
  implements?: ExpressionWithTypeArguments[];
  decorators?: Decorator[];
  abstract?: boolean;
  declare?: boolean;
}

export interface TSInterfaceBody extends BaseNode {
  type: AST_NODE_TYPES.TSInterfaceBody;
  body: TypeElement[];
}

export interface TSInterfaceHeritage extends TSHeritageBase {
  type: AST_NODE_TYPES.TSInterfaceHeritage;
}

export interface TSIntersectionType extends BaseNode {
  type: AST_NODE_TYPES.TSIntersectionType;
  types: TypeNode[];
}

export interface TSLiteralType extends BaseNode {
  type: AST_NODE_TYPES.TSLiteralType;
  literal: LiteralExpression | UnaryExpression | UpdateExpression;
}

export interface TSMappedType extends BaseNode {
  type: AST_NODE_TYPES.TSMappedType;
  typeParameter: TSTypeParameterDeclaration;
  readonly?: boolean | '-' | '+';
  optional?: boolean | '-' | '+';
  typeAnnotation?: TypeNode;
}

export interface TSMethodSignatureComputedName extends TSMethodSignatureBase {
  key: PropertyNameComputed;
  computed: true;
}

export interface TSMethodSignatureNonComputedName extends TSMethodSignatureBase {
  key: PropertyNameNonComputed;
  computed: false;
}

export interface TSModuleBlock extends BaseNode {
  type: AST_NODE_TYPES.TSModuleBlock;
  body: Statement[];
}

export interface TSModuleDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSModuleDeclaration;
  id: Identifier | Literal;
  body?: TSModuleBlock | TSModuleDeclaration;
  global?: boolean;
  declare?: boolean;
  modifiers?: Modifier[];
}

export interface TSNamespaceExportDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSNamespaceExportDeclaration;
  id: Identifier;
}

export interface TSNeverKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSNeverKeyword;
}

export interface TSNonNullExpression extends BaseNode {
  type: AST_NODE_TYPES.TSNonNullExpression;
  expression: Expression;
}

export interface TSNullKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSNullKeyword;
}

export interface TSNumberKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSNumberKeyword;
}

export interface TSObjectKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSObjectKeyword;
}

export interface TSOptionalType extends BaseNode {
  type: AST_NODE_TYPES.TSOptionalType;
  typeAnnotation: TypeNode;
}

export interface TSParameterProperty extends BaseNode {
  type: AST_NODE_TYPES.TSParameterProperty;
  accessibility?: Accessibility;
  readonly?: boolean;
  static?: boolean;
  export?: boolean;
  parameter: AssignmentPattern | BindingName | RestElement;
  decorators?: Decorator[];
}

export interface TSParenthesizedType extends BaseNode {
  type: AST_NODE_TYPES.TSParenthesizedType;
  typeAnnotation: TypeNode;
}

export interface TSPropertySignatureComputedName extends TSPropertySignatureBase {
  key: PropertyNameComputed;
  computed: true;
}

export interface TSPropertySignatureNonComputedName extends TSPropertySignatureBase {
  key: PropertyNameNonComputed;
  computed: false;
}

export interface TSPublicKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSPublicKeyword;
}

export interface TSPrivateKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSPrivateKeyword;
}

export interface TSProtectedKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSProtectedKeyword;
}

export interface TSQualifiedName extends BaseNode {
  type: AST_NODE_TYPES.TSQualifiedName;
  left: EntityName;
  right: Identifier;
}

export interface TSReadonlyKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSReadonlyKeyword;
}

export interface TSRestType extends BaseNode {
  type: AST_NODE_TYPES.TSRestType;
  typeAnnotation: TypeNode;
}

export interface TSStaticKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSStaticKeyword;
}

export interface TSStringKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSStringKeyword;
}

export interface TSSymbolKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSSymbolKeyword;
}

export interface TSThisType extends BaseNode {
  type: AST_NODE_TYPES.TSThisType;
}

export interface TSTupleType extends BaseNode {
  type: AST_NODE_TYPES.TSTupleType;
  elementTypes: TypeNode[];
}

export interface TSTypeAliasDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSTypeAliasDeclaration;
  id: Identifier;
  typeAnnotation: TypeNode;
  declare?: boolean;
  typeParameters?: TSTypeParameterDeclaration;
}

export interface TSTypeAssertion extends BaseNode {
  type: AST_NODE_TYPES.TSTypeAssertion;
  typeAnnotation: TypeNode;
  expression: Expression;
}

export interface TSTypeLiteral extends BaseNode {
  type: AST_NODE_TYPES.TSTypeLiteral;
  members: TypeElement[];
}

export interface TSTypeOperator extends BaseNode {
  type: AST_NODE_TYPES.TSTypeOperator;
  operator: 'keyof' | 'unique' | 'readonly';
  typeAnnotation?: TypeNode;
}

export interface TSTypeParameter extends BaseNode {
  type: AST_NODE_TYPES.TSTypeParameter;
  name: Identifier;
  constraint?: TypeNode;
  default?: TypeNode;
}

export interface TSTypeParameterDeclaration extends BaseNode {
  type: AST_NODE_TYPES.TSTypeParameterDeclaration;
  params: TSTypeParameter[];
}

export interface TSTypeParameterInstantiation extends BaseNode {
  type: AST_NODE_TYPES.TSTypeParameterInstantiation;
  params: TypeNode[];
}

export interface TSTypePredicate extends BaseNode {
  type: AST_NODE_TYPES.TSTypePredicate;
  asserts: boolean;
  parameterName: Identifier | TSThisType;
  typeAnnotation: string | null;
}

export interface TSTypeQuery extends BaseNode {
  type: AST_NODE_TYPES.TSTypeQuery;
  exprName: EntityName;
}

export interface TSTypeReference extends BaseNode {
  type: AST_NODE_TYPES.TSTypeReference;
  typeName: EntityName;
  typeParameters?: TSTypeParameterInstantiation;
}

export interface TSUndefinedKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSUndefinedKeyword;
}

export interface TSUnionType extends BaseNode {
  type: AST_NODE_TYPES.TSUnionType;
  types: TypeNode[];
}

export interface TSUnknownKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSUnknownKeyword;
}

export interface TSVoidKeyword extends BaseNode {
  type: AST_NODE_TYPES.TSVoidKeyword;
}

export interface UpdateExpression extends UnaryExpressionBase {
  type: AST_NODE_TYPES.UpdateExpression;
  operator: '++' | '--';
}

export interface UnaryExpression extends UnaryExpressionBase {
  type: AST_NODE_TYPES.UnaryExpression;
  operator: '+' | '-' | '!' | '~' | 'delete' | 'void' | 'typeof';
}

export interface VariableDeclaration extends BaseNode {
  type: AST_NODE_TYPES.VariableDeclaration;
  // NOTE - this is not guaranteed to have any elements in it. i.e. `const;`
  declarations: VariableDeclarator[];
  kind: 'let' | 'const' | 'var';
  declare?: boolean;
}

export interface VariableDeclarator extends BaseNode {
  type: AST_NODE_TYPES.VariableDeclarator;
  id: BindingName;
  init: Expression | null;
  definite?: boolean;
}

export interface WhileStatement extends BaseNode {
  type: AST_NODE_TYPES.WhileStatement;
  test: Expression;
  body: Statement;
}

export interface WithStatement extends BaseNode {
  type: AST_NODE_TYPES.WithStatement;
  object: Expression;
  body: Statement;
}

export interface YieldExpression extends BaseNode {
  type: AST_NODE_TYPES.YieldExpression;
  delegate: boolean;
  argument?: Expression;
}
