import { useEffect, useContext, useState, useMemo } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { FormSubmitType, NodeType } from "./types";
import {
  deleteLeaf,
  findMaxKey,
  findNodeByKey,
  pasteNode,
} from "./core/functions/functions";

function App() {
  const [selectedItem, setSelectedItem] = useState<NodeType | null>(null);
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [clipboard, setClipboard] = useState<NodeType | null>(null);

  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const handleClick = (node: NodeType) => {
    setSelectedItem(node);
  };

  const handleContextMenuClick = (actionKey: any, node: NodeType) => {
    const cloneOfTree = structuredClone(treeData);
    if (node) {
      switch (actionKey) {
        case "ACTION1":
          return () => {
            setSelectedItem(node);
          };
        case "ACTION2":
          return () => {
            deleteLeaf(cloneOfTree, node);
            setClipboard(node);
            setTreeData(cloneOfTree);
          };
        case "ACTION3":
          return () => {
            if (clipboard) {
              pasteNode(cloneOfTree, clipboard, node);
              setTreeData(cloneOfTree);
            }
          };
        case "ACTION4":
          return () => {
            console.log("tree", cloneOfTree);
            deleteLeaf(cloneOfTree, node);
            setTreeData(cloneOfTree);
          };
      }
    }
  };

  const handleUpdateTree = (nodes: NodeType[]) => {};
  const handleUpdateNode = (key: string, data: NodeType) => {};

  const handleFormSubmit = (data: FormSubmitType) => {
    const cloneOfTree = structuredClone(treeData);
    const parentNode = findNodeByKey(cloneOfTree, selectedItem.key);
    parentNode.children.push({
      ...data,
      children: [],
      parentKey: parentNode.key,
      key: String(findMaxKey(cloneOfTree) + 1),
      hierarchy: [...parentNode.hierarchy, String(findMaxKey(cloneOfTree) + 1)],
      users: [],
      accesses: [],
    });
    setTreeData(cloneOfTree);
  };

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree,
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree
            clipboard={clipboard}
            handleContextMenuClick={handleContextMenuClick}
            onClick={handleClick}
          />
        </Sidebar>
        {showEdit && (
          <Form
            item={selectedItem ?? []}
            setSelectedItem={setSelectedItem}
            onFormSubmit={handleFormSubmit}
          />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
