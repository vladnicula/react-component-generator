import * as t from "@babel/types";

import {
  generateASTDefinitionForJSXTag,
  addASTAttributeToJSXTag
} from "./utils";

// jsx attribute can be strings, numbers, booleans, objects.
// TODO they could also be expressions, functions and so on, but those will be implemented later.
export type JSXAttriuteValue = string | number | boolean | object;

export type JSXAttributeNameValuePair = {
  name: string;
  value: JSXAttriuteValue;
};

export type JSXAttributeMap = {
  [key: string]: JSXAttriuteValue;
};

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

  addAttribute = (attr: JSXAttributeNameValuePair) => {
    addASTAttributeToJSXTag(this.node, t, attr);
  };

  addAttributes(attrs: JSXAttributeNameValuePair[]) {
    attrs.forEach(this.addAttribute);
  }

  addAttributesMap(attrs) {
    const attrArray = Object.keys(attrs).reduce((acc, key) => {
      acc.push({
        name: key,
        value: attrs[key]
      });
      return acc;
    }, []);

    this.addAttributes(attrArray);
  }

  addChildJSXTag(jsxTagNode: t.JSXElement) {
    this.node.children.push(jsxTagNode);
  }

  addChildJSXText(jsxTagNode: string) {
    this.node.children.push(t.jsxText(jsxTagNode));
  }
}
