import { NodeType, UserType } from "../../types";

function isLeaf(node: NodeType): boolean {
  return !node.children || node.children.length === 0;
}

function findNodeByKey(
  tree: NodeType[],
  nodeKey: NodeType["key"]
): NodeType | null {
  for (const node of tree) {
    if (node.key === nodeKey) {
      return node;
    }
    if (node.children) {
      const res = findNodeByKey(node.children, nodeKey);
      if (res) {
        return res;
      }
    }
  }
  return null;
}

function deleteLeaf(tree: NodeType[], node: NodeType): void {
  if (!isLeaf(node)) {
    return;
  }
  const parent = findNodeByKey(tree, node.parentKey);
  if (!parent) {
    tree = tree.filter((child) => child.key !== node.key);
    return;
  }
  parent.children = parent.children.filter(
    (child: NodeType) => child.key !== node.key
  );
  return;
}

function pasteNode(
  tree: NodeType[],
  node: NodeType,
  targetNode: NodeType
): boolean {
  let destinationNodeKey = targetNode.key;
  let destinationNodehierarchy = targetNode.hierarchy;
  const destinationNode = findNodeByKey(tree, destinationNodeKey);
  if (!destinationNode) {
    return false;
  }

  if (!destinationNode.children) {
    destinationNode.children = [];
  }

  node.key = String(findMaxKey(tree) + 1);
  node.parentKey = destinationNodeKey;
  node.hierarchy = ["1", ...destinationNodehierarchy, node.key];

  destinationNode.children.push(node);
  return true;
}

function findMaxKey(nodes: NodeType[]): number {
  let maxKey = -Infinity;

  const traverse = (nodeList: NodeType[]) => {
    for (const node of nodeList) {
      if (+node.key > maxKey) {
        maxKey = +node.key;
      }
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  };

  traverse(nodes);
  return maxKey;
}

function searchTree(tree: NodeType[], searchTerm: string): NodeType[] {
  const result: NodeType[] = [];

  function search(tree: NodeType[]) {
    for (const node of tree) {
      if (node.title.includes(searchTerm)) {
        result.push(node);
      }
      if (node.children) {
        search(node.children);
      }
    }
  }

  search(tree);
  return result;
}

function arrayFlatter(
  treeData: NodeType[],
  array: NodeType[] | string[],
  returnKeys: boolean = false
): void {
  treeData.forEach((node) => {
    if (returnKeys) {
      (array as string[]).push(node.key);
    } else {
      (array as NodeType[]).push(node);
    }
    if (node.children && node.children.length > 0) {
      arrayFlatter(node.children, array, returnKeys);
    }
  });
}

export {
  isLeaf,
  findNodeByKey,
  deleteLeaf,
  pasteNode,
  findMaxKey,
  searchTree,
  arrayFlatter,
};
