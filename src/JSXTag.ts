import * as t from "@babel/types";

const defaultProps = {
  tagName: "div"
};

const makeASTDefinitionForJSXTag = (t, instanceOptions) => {
  const jsxIdentifier = t.jsxIdentifier(instanceOptions.tagName);
  const openingDiv = t.jsxOpeningElement(jsxIdentifier, [], false);
  const closingDiv = t.jsxClosingElement(jsxIdentifier);

  const tag = t.jsxElement(openingDiv, closingDiv, [], false);

  return tag;
};

const addAttributeToJSXNode = (node, t, attribute) => {
  const nameOfAttribute = t.jsxIdentifier(attribute.name);
  const classNameAtrribute = t.jsxAttribute(
    nameOfAttribute,
    t.stringLiteral(attribute.value)
  );
  node.openingElement.attributes.push(classNameAtrribute);
};

export default class JSXTag {
  node = null;

  constructor(params) {
    const instanceOptions = {
      ...defaultProps,
      ...params
    };
    this.node = makeASTDefinitionForJSXTag(t, instanceOptions);
  }

  addAttribute = attr => {
    addAttributeToJSXNode(this.node, t, attr);
  };

  addAttributes(attrs) {
    attrs.forEach(this.addAttribute);
  }
}
