// now a OOP approach
import * as t from "@babel/types";
import generator from "@babel/generator";
import * as prettier from "prettier";

import jsonDoc from "../in/test.json";

import JSXTag from "./JSXTag";

const generateTreeStructure = (content): JSXTag => {
  const { type, children } = content;
  const mappedType = type === "Text" ? "span" : "div";
  const mainTag = new JSXTag(mappedType);

  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        mainTag.addChildJSXTag(generateTreeStructure(child).node);
      });
    } else {
      mainTag.addChildJSXText(children.toString());
    }
  }

  return mainTag;
};

const parentTag = generateTreeStructure(jsonDoc.content);

const JSXExpressionStatement2 = t.expressionStatement(parentTag.node);

const ast2 = {
  type: "Program",
  body: [JSXExpressionStatement2]
};

const oneLinerCode = generator(ast2).code;

console.log("raw", oneLinerCode);
console.log(
  "with prettier",
  prettier.format(oneLinerCode, { semi: false, parser: "babylon" })
);
