import { Input, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AppContext from "../../appContext";
import { NodeType } from "../../types";
import Node from "./node";
import SearchResult from "./searchResult";
import { arrayFlatter } from "../../core/functions/functions";

const { Search } = Input;

interface Props {
  handleContextMenuClick: (actionKey: any, node: NodeType) => () => void;
  clipboard: NodeType | null;
  onClick: (node: NodeType) => void;
}

const TreeExtended: React.FC<Props> = ({
  handleContextMenuClick,
  clipboard,
  onClick,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [text, setText] = useState("");
  const [FlatTreeDate, setFlatTreeDate] = useState<NodeType[]>([]);
  const { treeData, updateTreeData } = useContext(AppContext);

  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const titleRenderer = (node: NodeType) => {
    return (
      <Node
        clipboard={clipboard}
        node={node}
        handleContextMenuClick={handleContextMenuClick}
        onClick={onClick}
      />
    );
  };

  const arr: NodeType[] = [];
  arrayFlatter(treeData, arr);

  return (
    <div className="tree-wrap">
      <Search
        value={text}
        style={{ marginBottom: 8 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
        onSelect={(e, { selectedNodes }) => updateTreeData(selectedNodes)}
      />
      {text.length !== 0 && (
        <SearchResult
          fullTree={treeData}
          items={arr.filter((i) => i.title.includes(text))}
        />
      )}
    </div>
  );
};

export default TreeExtended;
