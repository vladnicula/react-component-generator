// now a OOP approach
import * as t from "@babel/types";
import generator from "@babel/generator";

import JSXTag from "./JSXTag";

const spanTag = new JSXTag({
  jsxIdentifierName: "span"
});

spanTag.addAttributes([
  { name: "className", value: "test" },
  { name: "ana", value: "are mere" }
]);

const JSXExpressionStatement2 = t.expressionStatement(spanTag.node);

const ast2 = {
  type: "Program",
  body: [JSXExpressionStatement2]
};

console.log(ast2);

console.log(generator(ast2).code);
