import { Tag } from "antd";
import { commify } from "ethers/lib/utils";

export default {
  address: (address: string, len1: number = 4, len2: number = 4) => {
    if (!address) return "-";
    const match = address.match(
      "^([a-zA-Z0-9]{" + len1 + "})[a-zA-Z0-9]+([a-zA-Z0-9]{" + len2 + "})$"
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  },
  content: (address: string, len1: number = 30, len2: number = 30) => {
    if (!address) return "-";
    if(address.length > len1 + len2){
      const prefix = address.slice(0, len1);
      const suffix = address.slice(-len2);
      return `${prefix} ... ${suffix}`;
    }else{
      return address;
    }
  },
  currency: (
    amount: number | string,
    symbol: string = `$`,
    precision: number = 2
  ) => {
    if (typeof amount == "string") amount = parseFloat(amount);
    return ` ${symbol} ${commify(parseFloat(amount.toFixed(precision)))}`;
  },
  coin: (
    amount: number | string,
    symbol: string = `USDT`,
    precision: number = 6
  ) => {
    if (!amount) return "-";
    if (typeof amount == "string") amount = parseFloat(amount);
    return `${commify(parseFloat(amount.toFixed(precision)))} ${symbol}`;
  },
  percent: (num: number | undefined) => {
    if (!num) return "-";
    return parseFloat((num * 100).toFixed(2)) + "%";
  },
};

export const FormatEnum = ({ enums, value }: any) => {
  console.log(enums, value);
  return <Tag color={enums[value][1]}>{enums[value][0]}</Tag>;
};

// YES v = 1   No v = 0
export const processYesOrNo = (v: number | boolean) => (v ? "Yes" : "No");

export const processYesOrNoAgent = (v: number) => (v === 1 ? "Yes" : "No");

export const currentDate = () => {
  let nowdate = new Date();
  let year = nowdate.getFullYear(); //年
  let month = nowdate.getMonth() + 1; //月
  let date = nowdate.getDate(); //天
  let day = nowdate.getDay();
  let h = nowdate.getHours();
  let m = nowdate.getMinutes();
  let s = nowdate.getSeconds();
  return `${year}/${month < 10 ? "0" + month : month}/${
    date < 10 ? "0" + date : date
  }`;
};
