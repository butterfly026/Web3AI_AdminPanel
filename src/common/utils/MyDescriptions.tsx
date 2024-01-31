import {
  VipLevelEnum,
  Web3TransactionsStatusEnum,
  Web3TransactionsTypeEnum,
} from "@/enums";
import { UserOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { Avatar, Image, Space, Typography } from "antd";
import { MyEnumTag, MyNTag, getImgUrl } from "..";
import formatHelper from "./formatHelper";

type MyColumnsType = {
  title?: string;
  key1?: string;
  key2?: string;
  before?: string;
  after?: string;
  items?: any[];
  tdata?: any;
} & ProColumns;

type UserDescriptionType = {
  avatar?: string;
  nickname?: string;
  vips_id?: number;
};

type UserCoinType = {
  value: string;
  icon?: JSX.Element;
  symbol?: string;
  network?: string;
};

type UserAddressType = {
  address?: string;
};

type BaseType = {
  value?: string;
};

type AmountType = {
  value: number;
  symbol: string;
};

export const MyDescriptions = {
  address: ({ address }: UserAddressType) => {
    return address ? (
      <Typography.Text
        copyable={{
          text: address,
        }}
      >
        {formatHelper.address(address)}
      </Typography.Text>
    ) : (
      <>--</>
    );
  },
  symbolImg: ({ src, name, coin_network }: any) => {
    return (
      <div>
        <Image width="32px" src={src} preview={false} />
        <span style={{ paddingLeft: "1rem" }}>{name}</span>
        <span style={{ paddingLeft: "1rem" }}>{coin_network}</span>
      </div>
    );
  },
  user: ({ avatar, nickname, vips_id }: UserDescriptionType) => (
    // <>
    //     <Avatar
    //         src={getImgUrl(avatar)}
    //         icon={<UserOutlined/>}
    //         style={{marginRight: 12}}
    //     />
    //     {name}
    // </>
    <Space>
      <Avatar src={getImgUrl(avatar)} icon={<UserOutlined />} size={38} />
      <Space direction="vertical" size={1}>
        <div>{nickname}</div>
        <div>
          <MyNTag items={VipLevelEnum} value={vips_id} size="small" />
        </div>
      </Space>
    </Space>
  ),
  amount: ({ value, symbol }: AmountType) => (
    <Typography.Text>{formatHelper.currency(value, symbol)}</Typography.Text>
  ),
  coin: ({ value, icon, symbol = " USDC", network = "" }: UserCoinType) => (
    <>
      <Typography.Text>{formatHelper.coin(value, symbol)}</Typography.Text>
    </>
  ),
  transType: ({ value }: BaseType) => {
    return (
      <MyEnumTag items={Web3TransactionsTypeEnum} value={value}></MyEnumTag>
    );
  },
  status: ({ value }: BaseType) => (
    <MyEnumTag items={Web3TransactionsStatusEnum} value={value}></MyEnumTag>
  ),
};

// export const BtnState = ({ status, type, onChange }: any) => {
//   if (!status) {
//     return <>-</>;
//   }
//   if (status == "ERROR") {
//     return (
//       <>
//         <div>
//           <MyEnumTag items={OrdersStatusEnum} value={status} />
//         </div>
//         {type != "pay" ? (
//           <div style={{ paddingTop: "0.7rem" }}>
//             <Button
//               danger
//               onClick={(e) => onChange?.(`${type}Retry`)}
//               size="small"
//             >
//               Retry
//             </Button>
//           </div>
//         ) : (
//           ""
//         )}
//       </>
//     );
//   } else if (status == "PROCESSING" && type != "web3") {
//     return (
//       <>
//         <div>
//           <MyEnumTag items={OrdersStatusEnum} value={status} />
//         </div>
//         <div style={{ paddingTop: "0.7rem" }}>
//           <Button
//             onClick={() => onChange?.(status)}
//             size="small"
//             type="primary"
//           >
//             手动查询
//           </Button>
//         </div>
//       </>
//     );
//   } else {
//     return <MyEnumTag items={OrdersStatusEnum} value={status} />;
//   }
// };

export const DesTag = ({ status, items }: any) => {
  return <MyEnumTag items={items} value={status} />;
};
