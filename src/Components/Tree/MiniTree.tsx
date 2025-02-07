import React from "react";
import { Tree } from "antd";
import { NodeType } from "../../types";
import { findNodeByKey } from "../../core/functions/functions";

interface Props {
  node: NodeType;
  tree: NodeType[];
  fullTree: NodeType[];
}

const MiniTree: React.FC<Props> = ({ node, tree, fullTree }) => {
  const generateTreeData = (node: NodeType): NodeType[] => {
    const treeData: NodeType[] = [];
    node.hierarchy.forEach((key) => {
      const parentNode = findNodeByKey(fullTree, key);
      if (parentNode) {
        treeData.push(parentNode);
      }
    });
    return treeData;
  };

  const treeData = generateTreeData(node);

  return (
    <Tree
      treeData={treeData.map((n) => ({
        title: n.title,
        key: n.key,
        children: [] as NodeType[],
      }))}
      defaultExpandAll
    />
  );
};
export default MiniTree;
