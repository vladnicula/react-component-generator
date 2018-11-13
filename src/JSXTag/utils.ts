/**
 * Generates the AST definiton (without start/end position) for a JSX tag
 * with an opening and closing tag.
 *
 * t is the babel-types api which generates the JSON structure representing the AST.
 * This is set as a parameter to allow us to remove babel-types at some point if we
 * decide to, and to allow easier unit testing of the utils.
 *
 * Requires the tagName, which is a string that will be used to generate the
 * tag.
 *
 * Example:
 * generateASTDefinitionForJSXTag(t, { tagName: "div" }) will generate the AST
 * equivalent of <div></div>
 */
export const generateASTDefinitionForJSXTag = (
  t,
  instanceOptions: { tagName: string }
) => {
  const jsxIdentifier = t.jsxIdentifier(instanceOptions.tagName);
  const openingDiv = t.jsxOpeningElement(jsxIdentifier, [], false);
  const closingDiv = t.jsxClosingElement(jsxIdentifier);

  const tag = t.jsxElement(openingDiv, closingDiv, [], false);

  return tag;
};

/**
 * node must be a AST node element of type JSXElement (babel-types) or
 * equivalent
 */
export const addASTAttributeToJSXTag = (node, t, attribute) => {
  const nameOfAttribute = t.jsxIdentifier(attribute.name);
  const attributeDefinition = t.jsxAttribute(
    nameOfAttribute,
    t.stringLiteral(attribute.value)
  );
  node.openingElement.attributes.push(attributeDefinition);
};
