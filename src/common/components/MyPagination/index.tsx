/* eslint-disable react/jsx-key */
import { Pagination, Select } from "antd";
import { CSSProperties } from "react";

export type ResDataMetaProps = {
  /**
   * 当前页
   * @default 1
   */
  current_page: number;
  /**
   * 最后一页
   */
  last_page: number;
  /**
   * 每页记录数
   * @default 20
   */
  per_page: number;
  /**
   * 总记录数
   * @default 0
   */
  total: number;
};

export type MyPaginationProps = {
  /**
   * 后端直接返回的meta信息
   */
  meta?: ResDataMetaProps;
  /**
   * 当分页变更的时候触发事件
   */
  onChange: (page: number, pageSize: number) => void;

  notFixedPos?: boolean,
};

export const MyPagination = ({ meta, onChange, notFixedPos }: MyPaginationProps) => {
  const MiniSelect: any = (props: any) => (
    <Select {...props} size="small" placement="topLeft" />
  );
  let styleSheet: CSSProperties = {
    padding: "10px 0",
  }
  if(notFixedPos === true){
    styleSheet = {
      position: 'fixed',
      bottom: 0,
      right: 0,
      zIndex: 99,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      paddingInline: '24px',
      paddingBlock: 0,
      padding: '15px',
      boxSizing: 'border-box',
      lineHeight: '64px',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderBlockStart: '1px solid rgba(5, 5, 5, 0.06)',      
      backdropFilter: 'blur(8px)',
      color: 'rgba(0, 0, 0, 0.88)',
      transition: 'all 0.2s ease 0s'
    }
  }
  MiniSelect.Option = Select.Option;

  return meta ? (
    <div style={styleSheet}>
      <div style={{ flex: 1 }}></div>
      <Pagination
        current={meta?.current_page || 1}
        total={meta?.total || 0}
        pageSize={meta?.per_page || 20}
        onChange={onChange}
        size="small"
        showTotal={(total) => `总共${total}条`}
        showSizeChanger
        showQuickJumper
        selectComponentClass={MiniSelect}
      />
    </div>
  ) : null;
};
