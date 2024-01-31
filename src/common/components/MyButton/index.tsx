import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  HighlightOutlined,
  PlusSquareOutlined,
  QuestionCircleOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Button,
  ButtonProps,
  Dropdown,
  Menu,
  message,
  Popconfirm,
  Tag,
} from "antd";
import { request } from "umi";

export const MyButtons = {
  CreateButton: ({ title, onClick, ...rest }: ButtonProps) => {
    return (
      <Button
        key="CreateButton"
        type="primary"
        icon={<PlusSquareOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e as any);
        }}
        {...rest}
      >
        {title}
      </Button>
    );
  },
  ShowButton: ({ title, onClick, ...rest }: ButtonProps) => {
    return (
      <Button
        key="ShowButton"
        type="primary"
        size="small"
        icon={<EyeOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e as any);
        }}
        {...rest}
      >
        {title || "Detail"}
      </Button>
    );
  },
  EditButton: ({ title, onClick, ...rest }: ButtonProps) => {
    return (
      <Button
        type="primary"
        size="small"
        ghost
        icon={<EditOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e as any);
        }}
        {...rest}
      >
        {title || "Edit"}
      </Button>
    );
  },
  RecoveryButton: ({ title, onClick, ...rest }: ButtonProps) => {
    return (
      <Button
        type="primary"
        size="small"
        icon={<HighlightOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e as any);
        }}
        {...rest}
      >
        {title || "Restore"}
      </Button>
    );
  },
  DeleteButton: ({
    title,
    onConfirm,
    ...rest
  }: ButtonProps & {
    onConfirm: (
      e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
    ) => void;
  }) => {
    return (
      <Popconfirm
        title={`Sure want to${title || "Delete"}?`}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        onConfirm={() => onConfirm()}
      >
        <Button icon={<DeleteOutlined />} danger size="small" {...rest}>
          {title || "Delete"}
        </Button>
      </Popconfirm>
    );
  },
  SoftDelete: ({
    deleted_at,
    onConfirm,
  }: {
    deleted_at: string | undefined;
    onConfirm: (
      e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
    ) => void;
  }) => {
    return (
      <Popconfirm
        title={deleted_at ? "sure want to restore?" : "Sure want to disable?"}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        onConfirm={onConfirm}
      >
        <Tag
          color={deleted_at ? "gray" : "green"}
          style={{ cursor: "pointer" }}
        >
          {deleted_at ? (
            <>
              <CloseCircleOutlined />
              Disabled
            </>
          ) : (
            <>
              <CheckCircleOutlined />
              Activated
            </>
          )}
        </Tag>
      </Popconfirm>
    );
  },
  ToggleDisableNotify: ({
    active,
    onConfirm,
  }: {
    active: number | undefined;
    onConfirm: (
      e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
    ) => void;
  }) => {
    return (
      <Popconfirm
        title={active ? "Sure want to Disable?" : "Sure want to Enable?"}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        onConfirm={onConfirm}
      >
        <Button type={active ? "primary" : "dashed"} size="small">
          {active ? "Disable" : "Enable"}
        </Button>
      </Popconfirm>
    );
  },
  ToggleCanSay: ({
    can_say,
    onConfirm,
  }: {
    can_say: number | undefined;
    onConfirm: (
      e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
    ) => void;
  }) => {
    return (
      <Popconfirm
        title={can_say ? "Sure want to Mute?" : "Sure want to Unban?"}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        onConfirm={onConfirm}
      >
        <Button type={can_say ? "primary" : "dashed"} size="small">
          {can_say ? "Mute" : "Muted"}
        </Button>
      </Popconfirm>
    );
  },

  DownloadButton: ({ title, onClick, ...rest }: ButtonProps) => {
    return (
      <Button
        key="DownloadButton"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e as any);
        }}
        {...rest}
      >
        {title}
      </Button>
    );
  },
  ExportButton: (props: any) => {
    const handleMenuClick = (v: any) => {
      const params: any = { download_type: v.key, ...props?.params?.s };
      console.log(params, "Download");
      props.actions?.download(params);
    };

    const menu = (
      <Menu
        onClick={handleMenuClick}
        items={[
          {
            label: "Export filter",
            key: "2",
          },
          {
            label: "Export all",
            key: "3",
          },
        ]}
      />
    );
    return (
      <Dropdown overlay={menu}>
        <Button key="ExportButton">
          Export
          <DownOutlined />
        </Button>
      </Dropdown>
    );
  },
  MoveButton: ({
    direction,
    onClick,
    disabled,
    ...rest
  }: {
    direction: "up" | "down";
  } & ButtonProps) => {
    return (
      <Button
        size="small"
        icon={direction === "up" ? <UpOutlined /> : <DownOutlined />}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e as any);
        }}
        {...rest}
      />
    );
  },
  BatchImportBtn: ({ title, onClick, ...rest }: ButtonProps) => {
    return (
      <Button
        key="BatchImportBtn"
        type="primary"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e as any);
        }}
        {...rest}
      >
        {title}
      </Button>
    );
  },
  ApiExportButton: (props: any) => {
    const handleMenuClick = (v: any) => {
      const params: any = { download_type: v.key, ...props.params.data };
      request(props.api, {
        data: params,
        responseType: "blob",
      }).then(() => {
        message.success("Export succeeded!");
      });
    };

    const menu = (
      <Menu
        onClick={handleMenuClick}
        items={[
          // {
          //   label: '导出本页',
          //   key: '1',
          // },
          {
            label: "Export filter",
            key: "2",
          },
          {
            label: "Export all",
            key: "3",
          },
        ]}
      />
    );

    return (
      <Dropdown overlay={menu}>
        <Button key="ExportButton">
          Export
          <DownOutlined />
        </Button>
      </Dropdown>
    );
  },
};
