import { Tree, TreeProps } from "antd";
import type { Key } from "react";
import { useEffect, useState } from "react";

export type MyProFormTreeProps = {
  treeData: any[];
  value?: Key[];
  onChange?: (value: Key[]) => void;
} & TreeProps;

export const MyProFormTree = ({
  treeData,
  value,
  onChange,
  ...rest
}: MyProFormTreeProps) => {
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);

  const onCheck = (checked: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
    setCheckedKeys(checked as Key[]);
    onChange?.(checked as Key[]);
  };

  useEffect(() => {
    if (value) {
      setCheckedKeys(value as Key[]);
    }
  }, [value]);

  return treeData.length === 0 ? null : (
    <Tree
      checkable
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      treeData={treeData}
      defaultExpandAll={true}
      {...rest}
    />
  );
};

// const treeDataAddDisable = (treeData: any[]) => {
//   return treeData.map((item) => {
//     if (item.type == '目录') item.disabled = true;
//     if (item.children.length) item.children = treeDataAddDisable(item.children);
//     return item;
//   });
// };
