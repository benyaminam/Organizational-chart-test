import React from "react";
import { NodeType } from "../../types";
import {
  ContextMenuTriggerEx,
  ContextMenuItemEx,
  ContextMenuEx,
} from "../ContextMenu";
import { isLeaf } from "../../core/functions/functions";

interface Props {
  node: NodeType;
  handleContextMenuClick: (actionKey: string, node: NodeType) => void;
  expandedKeys?: React.Key[];
  clipboard: NodeType | null;
  onClick: (node: NodeType) => void;
}

function Node({ node, handleContextMenuClick, clipboard, onClick }: Props) {
  return (
    <div onClick={() => onClick(node)}>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
      <ContextMenuTriggerEx id={node.key} title={node.title} />

      <ContextMenuEx id={node.key}>
        <ContextMenuItemEx
          handleClick={handleContextMenuClick("ACTION1", node)}
          title={"افزودن زیرشاخه"}
        />
        {isLeaf(node) ? (
          <ContextMenuItemEx
            handleClick={handleContextMenuClick("ACTION2", node)}
            title={"برش"}
          />
        ) : (
          <ContextMenuItemEx
            disabled
            handleClick={handleContextMenuClick("ACTION2", node)}
            title={"برش"}
          />
        )}
        {clipboard ? (
          <ContextMenuItemEx
            handleClick={handleContextMenuClick("ACTION3", node)}
            title={"چسباندن"}
          />
        ) : (
          <ContextMenuItemEx
            disabled
            handleClick={handleContextMenuClick("ACTION3", node)}
            title={"چسباندن"}
          />
        )}

        {isLeaf(node) ? (
          <ContextMenuItemEx
            handleClick={handleContextMenuClick("ACTION4", node)}
            title={"حذف"}
          />
        ) : (
          <ContextMenuItemEx
            disabled
            handleClick={handleContextMenuClick("ACTION4", node)}
            title={"حذف"}
          />
        )}
      </ContextMenuEx>
    </div>
  );
}
export default Node;
