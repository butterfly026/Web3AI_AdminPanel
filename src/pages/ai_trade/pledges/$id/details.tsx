import { useOutletContext } from "umi";
import { Descriptions } from "antd";
// import { formatMoney } from "@/common";
// import { formatPercent } from "../../../common/web3/utils/index";
export default () => {
  const { model } = useOutletContext<any>();

  return (
    <>
      <Descriptions
        bordered
        title="Basic"
        size="small"
        column={3}
        labelStyle={{ width: "200px" }}
      >
        <Descriptions.Item label="staking">
          {/* {formatMoney(model?.staking)} */}
        </Descriptions.Item>
        <Descriptions.Item label="Leverage">
          {model?.leverage} x
        </Descriptions.Item>
        <Descriptions.Item label="Estimate APY">
          {/* {formatPercent(model?.estimate_apy)} */}
        </Descriptions.Item>
        <Descriptions.Item label="Actual APY">
          {/* {formatPercent(model?.apy)} */}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
