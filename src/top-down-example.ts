import * as t from "@babel/types";
import generator from "@babel/generator";

// Programatically define a JSX tag

const jsxIdentifier = t.jsxIdentifier("div");
const openingDiv = t.jsxOpeningElement(jsxIdentifier, [], false);
const closingDiv = t.jsxClosingElement(jsxIdentifier);

const divTag = t.jsxElement(openingDiv, closingDiv, [], false);

// Lets add a className to this div
const nameOfAttribute = t.jsxIdentifier("className");
const classNameAtrribute = t.jsxAttribute(
  nameOfAttribute,
  t.stringLiteral("container")
);
divTag.openingElement.attributes.push(classNameAtrribute);

// Programatically setup a javascript file in AST

const JSXExpressionStatement = t.expressionStatement(divTag);

const ast = {
  type: "Program",
  body: [JSXExpressionStatement]
};

console.log(ast);

console.log(generator(ast).code);
