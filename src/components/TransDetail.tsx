import { MyDescriptions } from "@/common";
import { Web3TransactionDetail } from "@/pages/assets/pendings/types";
import { Descriptions } from "antd";

const TransactionDetail = (record: Web3TransactionDetail): JSX.Element => {
  return (
    <Descriptions bordered column={2}>
      <Descriptions.Item label="User">
        <MyDescriptions.user
          avatar={record.user.avatar}
          nickname={record.user.nickname}
          vips_id={record.user.vips_id}
        ></MyDescriptions.user>
      </Descriptions.Item>
      <Descriptions.Item label="Coin">
        <MyDescriptions.symbolImg
          src={record.coin.icon}
          name={record.coin.name}
          coin_network={record.coin.network}
        ></MyDescriptions.symbolImg>
      </Descriptions.Item>
      <Descriptions.Item label="Type">
        <MyDescriptions.transType
          value={record.type}
        ></MyDescriptions.transType>
      </Descriptions.Item>
      <Descriptions.Item label="Block Number">
        <MyDescriptions.address
          address={record.block_number}
        ></MyDescriptions.address>
      </Descriptions.Item>
      <Descriptions.Item label="Status">
        <MyDescriptions.status value={record.status}></MyDescriptions.status>
      </Descriptions.Item>
      <Descriptions.Item label="Hash">
        <MyDescriptions.address address={record.hash}></MyDescriptions.address>
      </Descriptions.Item>
      <Descriptions.Item label="Amount">
        <MyDescriptions.coin value={record.coin_amount}></MyDescriptions.coin>
      </Descriptions.Item>
      <Descriptions.Item label="Amount (USD)">
        <MyDescriptions.amount
          value={+record.coin_amount * +record.usd_price}
          symbol="$"
        ></MyDescriptions.amount>
      </Descriptions.Item>
      <Descriptions.Item label="Contract Address">
        <MyDescriptions.address
          address={record.coin.address}
        ></MyDescriptions.address>
      </Descriptions.Item>
      <Descriptions.Item label="From Address">
        <MyDescriptions.address
          address={record.from_address}
        ></MyDescriptions.address>
      </Descriptions.Item>
      <Descriptions.Item label="To Address">
        <MyDescriptions.address
          address={record.to_address}
        ></MyDescriptions.address>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default TransactionDetail;
