// now a OOP approach
import * as t from "@babel/types";
import generator from "@babel/generator";

import JSXTag from "./JSXTag";

const parentTag = new JSXTag(); //default to div

const childTag = new JSXTag("span");

parentTag.addAttributes([
  { name: "className", value: "container" },
  { name: "enabled", value: "true" }
]);

parentTag.addChildJSXTag(childTag.node);

const JSXExpressionStatement2 = t.expressionStatement(parentTag.node);

const ast2 = {
  type: "Program",
  body: [JSXExpressionStatement2]
};

console.log(ast2);

console.log(generator(ast2).code);
