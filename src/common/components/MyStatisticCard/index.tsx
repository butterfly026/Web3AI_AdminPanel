import { StatisticCard } from "@ant-design/pro-components";

export default ({ items }: any) => {
  return items ? (
    <StatisticCard.Group>
      {items?.map((item: any) => {
        return (
          <StatisticCard
            key={"sc" + item.title}
            statistic={{
              title: item.title,
              value: item.value,
            }}
          />
        );
      })}
    </StatisticCard.Group>
  ) : (
    <></>
  );
};
