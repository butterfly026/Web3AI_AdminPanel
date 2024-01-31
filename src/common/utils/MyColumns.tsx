import XSelect from "@/components/XSelect";
import { VipLevelEnum } from "@/enums";
import { IPledgesData } from "@/pages/ai_trade/pledges/types";
import { IProfitsList } from "@/pages/ai_trade/profits/types";
import { UserOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { Avatar, Space, Typography, Checkbox } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from "dayjs";
import { Link } from "umi";
import { MyEnumTag, MyNTag, getImgUrl } from "..";
import formatHelper from "./formatHelper";
import { useState } from "react";

type MyColumnsType = {
  title?: string;
  key1?: string;
  key2?: string;
  before?: string;
  after?: string;
  items?: any[];
  symbol?: string;
  precision?: number;
  useCopy?: boolean;
  process?: (v: any) => any;
} & ProColumns;

type MyRelativeDate = {
  relative?: boolean; // use or not
  relativeType?: boolean; // true: dayjs.from false: dayjs.to
};

type DurationSelectType = {
  onChange: (e: any, value: number) => void;
};

type PercentRangeType = {
  rangeKey: string;
  rangeIndex: number;
};

export const MyColumns = {
  checkbox: ({ onChangeEventHandler, checkedId }: { onChangeEventHandler: Function, checkedId: Array<number>}) => {
    return {
      title: "",
      render: (item: any) => {
        return (
          <Space>
            <Checkbox onChange={(e: any) => onChangeEventHandler(e, item['id'])} 
              defaultChecked={ checkedId.indexOf(item['id']) !== -1 ? true : false }
            >
            </Checkbox>
          </Space>
        );
      },
    };
  },
  id: {
    title: "No.",
    key1: "id",
    dataIndex: "id",
  },
  coin_network: ({ title = "Network", key1 = "coin_network" }: any) => {
    return {
      title: title,
      dataIndex: key1,
      render: (_: any, item: any) => {
        return (
          <Space>
            <Avatar
              size={24}
              src={<img src={`/img/network/${item[key1]}.svg`} alt="avatar" />}
            />
            <span>{item[key1]}</span>
          </Space>
        );
      },
    };
  },
  user: ({ title = "User", key1 }: MyColumnsType) => {
    return {
      title: title,
      render: (item: any) => {
        const avatar = key1 ? item?.[key1]?.avatar : item?.avatar;
        const nickname = key1
          ? (item?.[key1]?.nickname ? item?.[key1]?.nickname : "Noname")
          : item?.nickname ?? "Noname";        
        const vips_id = key1 ? item?.[key1]?.vips_id : item?.vips_id;
        const id = key1 ? item?.[key1]?.id : item?.id;

        if (!avatar && !nickname) return <>-</>;

        return (
          <Space>
            <Link to={`/users/users/${id}/details`}>
              <Avatar
                src={getImgUrl(avatar)}
                icon={<UserOutlined />}
                size={38}
              />
            </Link>
            <Space direction="vertical" size={1}>
              <div>{nickname}</div>
              <div>
                <MyNTag items={VipLevelEnum} value={vips_id} size="small" />
              </div>
            </Space>
          </Space>
        );
      },
    };
  },
  common: ({
    title,
    key1,
    key2 = "",
    before = "",
    after = "",
    ...rest
  }: MyColumnsType) => {
    key1 = key1 ?? title;
    return {
      title: title,
      render: (item: any) => {
        const value = rest?.["dataIndex"]
          ? item
          : key2
          ? item[key1 as string]?.[key2] || "-"
          : item[key1 as string] || "-";
        return `${before} ${value} ${after}`;
      },
      ...rest,
    } as ProColumns;
  },
  amount: ({ title, key1 }: any) => {
    return {
      title: title,
      sorter: true,
      dataIndex: key1,
      render: (_: any, item: any) => {
        return <span style={{ color: "blue" }}>{`￥${item[key1]}`}</span>;
      },
    };
  },
  currency: ({
    title,
    key1,
    symbol = " $",
    precision = 2,
    useCopy = false,
    ...rest
  }: MyColumnsType) => {
    key1 = key1 ?? title;
    return {
      title: title,
      dataIndex: key1,
      sorter: true,
      render: (_: any, item: any) => {
        return formatHelper.currency(item[key1 as any], symbol, precision);
      },
      ...rest,
    } as ProColumns;
  },
  coinIcon: ({ title, key1 }: MyColumnsType) => ({
    title,
    dataIndex: key1,
    render: (_: any, record: any) => (
      <>
        <Avatar src={record?.[key1]?.icon} style={{ marginRight: 8 }} />
        <Typography.Text>{record?.[key1]?.symbol}</Typography.Text>
      </>
    ),
  }),
  coin: ({
    title,
    key1,
    key2,
    symbol = " USDC",
    precision = 2,
    ...rest
  }: MyColumnsType) => {
    key1 = key1 ?? title;
    return {
      title: title,
      dataIndex: key1,
      sorter: true,
      align: "right",
      render: (_: any, item: any) => {
        if (rest.useCopy)
          return (
            <Typography.Text
              copyable={{
                text: item[key1 as any],
              }}
            >
              {formatHelper.coin(item[key1 as any], symbol, precision)}
            </Typography.Text>
          );
        return formatHelper.coin(item[key1 as any], symbol, precision);
      },
      ...rest,
    } as ProColumns;
  },
  enumTag: ({ title, key1, key2 = "", items, process }: MyColumnsType) => {
    return {
      title: title,
      render: (item: any) => {
        key1 = key1 ?? title;
        let v = key2 ? item[key1 as any]?.[key2] : item[key1 as any];
        if (process) v = process(v);
        return <MyEnumTag items={items} value={v} />;
      },
    };
  },
  eTag: ({ title, key1, items }: MyColumnsType) => {
    key1 = key1 ?? title;
    return {
      title,
      render: (item: any) => (
        <MyEnumTag items={items} value={item[key1 as any]} />
      ),
    };
  },
  dateTime: ({
    title = "Created",
    key1 = "created_at",
    key2,
    relative = false,
    relativeType,
    ...rest
  }: MyColumnsType & MyRelativeDate) => {
    key1 = key1 ?? title;
    return {
      ...rest,
      title: title,
      dataIndex: key1,
      render: (_: string, record: IPledgesData) => {
        if (relative)
          return relativeType
            ? dayjs(record[key1]).toNow()
            : dayjs().to(dayjs(record[key1]));
        return _;
      },
    };
  },
  percentRange: ({
    title,
    rangeKey,
    rangeIndex,
    key1,
    key2,
  }: MyColumnsType & PercentRangeType) => ({
    title,
    render: (_: string, record: any) => {
      try {
        const source = JSON.parse(record[rangeKey]);
        const id = Object.keys(rangeIndex).find((ele) => ele == record.id);
        const target = rangeIndex[id] || 7;
        return (
          <>
            <Typography.Text>{source[target][key1]}</Typography.Text>~
            <Typography.Text>{source[target][key2]}</Typography.Text>
          </>
        );
      } catch (error) {
        return <>--</>;
      }
    },
  }),
  durationSelect: ({
    title,
    onChange,
  }: MyColumnsType & DurationSelectType) => ({
    title,
    render: (_: string, record: any) => (
      <XSelect.DurationSelect
        label=""
        onChange={(e) => onChange(e, record.id)}
      />
    ),
  }),
  percent: ({ title, key1, key2 }: MyColumnsType) => {
    key1 = key1 ?? title;
    if (key2) {
      return {
        title: title,
        render: (_: any, item: any) => {
          return formatHelper.percent(item[key1 as any]?.[key2 as any]);
        },
      };
    } else {
      return {
        title: title,
        render: (_: any, item: any) => {
          return formatHelper.percent(item[key1 as any]); //(parseFloat(item[key1 as any]) * 100).toFixed(2) + " %";
        },
      };
    }
  },
  time: ({ key1, ...rest }: MyColumnsType) => ({
    ...rest,
    dateIndex: key1,
    render: (_: string, record: IProfitsList) =>
      `${record[key1 as keyof IProfitsList]}x`,
  }),
  content: ({ title, key1, key2 }: MyColumnsType) => {
    key1 = key1 ?? title;
    return {
      title: title,
      render: (_: any, item: any) => {
        return item[key1 as any] ? (
          <>
            <Typography.Text>
              {formatHelper.content(item[key1 as any])}
            </Typography.Text>
            {
            item[key2 as any] ?            
            <img
              src={getImgUrl(item[key2 as any])}
              style={{ width: 38, height: 38 }}
            />
            : <></>
            }
          </>
          
        ) : (
          "-"
        );
      },
    };
  },
  address: ({ title, key1, key2 }: MyColumnsType) => {
    key1 = key1 ?? title;
    return {
      title: title,
      render: (_: any, item: any) => {
        if (key2) {
          return item[key1 as any]?.[key2] ? (
            <Typography.Text
              copyable={{
                text: item[key1 as any][key2],
              }}
            >
              {formatHelper.address(item[key1 as any][key2])}
            </Typography.Text>
          ) : (
            "-"
          );
        } else {
          return item[key1 as any] ? (
            <Typography.Text
              copyable={{
                text: item[key1 as any],
              }}
            >
              {formatHelper.address(item[key1 as any])}
            </Typography.Text>
          ) : (
            "-"
          );
        }
      },
    };
  },
};
