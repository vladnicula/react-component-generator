import * as t from "@babel/types";

import {
  generateASTDefinitionForJSXTag,
  addASTAttributeToJSXTag
} from "./utils";

export interface JSXTagParams {
  tagName?: string;
}

const defaultProps = {
  tagName: "div"
};

export default class JSXTag {
  node = null;

  constructor(tagName: string = "div", params?: JSXTagParams) {
    const instanceOptions = {
      ...defaultProps,
      ...params,
      tagName
    };
    this.node = generateASTDefinitionForJSXTag(t, instanceOptions);
  }

  addAttribute = attr => {
    addASTAttributeToJSXTag(this.node, t, attr);
  };

  addAttributes(attrs) {
    attrs.forEach(this.addAttribute);
  }

  addChildJSXTag(jsxTagNode: t.JSXElement) {
    this.node.children.push(jsxTagNode);
  }
}
