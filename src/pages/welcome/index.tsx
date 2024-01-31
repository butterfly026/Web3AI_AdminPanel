import { PageContainer, StatisticCard } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useEffect, useState } from 'react';
import ColumnChart from './components/ColumnChart';
import Trend from './components/Trend';
import { request } from 'umi';
import { IReportAll, IReportData, IReportToday } from './types';
import { capitalizeStr } from '@/common/utils/textHelper';

const styles = {
  imgStyle: { display: 'block', width: 42, height: 42 },
};

export default function index() {
  const [responsive, setResponsive] = useState(false);
  const [reportData, setReportData] = useState<IReportData>();
  useEffect(() => {
    request('auth/report', {
      method: 'POST',
    }).then((res) => {
      setReportData(res.data);
    });
  }, []);
  return (
    <PageContainer
      title='Welcome'
      content={
        <>
          <Card title='总计'>
            <RcResizeObserver
              key='resize-observer'
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <StatisticCard.Group
                direction={responsive ? 'column' : 'row'}
                wrap
              >
                {(
                  Object.keys(reportData?.all || {}) as Array<keyof IReportAll>
                ).map((key: keyof IReportAll, index: number) => {
                  return (
                    <StatisticCard
                      colSpan={6}
                      key={`StatisticCard_${key}`}
                      statistic={{
                        title: capitalizeStr(key),
                        value: reportData?.all[key],
                      }}
                    />
                  );
                })}
              </StatisticCard.Group>
            </RcResizeObserver>
          </Card>
          <Card title='今日' style={{ marginTop: 16 }}>
            <RcResizeObserver
              key='resize-observer'
              onResize={(offset) => {
                setResponsive(offset.width < 596);
              }}
            >
              <StatisticCard.Group
                direction={responsive ? 'column' : 'row'}
                wrap
              >
                {(
                  Object.keys(reportData?.today || {}) as Array<
                    keyof IReportToday
                  >
                ).map((key: keyof IReportToday, index: number) => {
                  return (
                    <StatisticCard
                      colSpan={6}
                      key={`StatisticCard_${key}`}
                      statistic={{
                        title: capitalizeStr(key),
                        value: reportData?.today[key],
                      }}
                    />
                  );
                })}
              </StatisticCard.Group>
            </RcResizeObserver>
          </Card>
          {/* <Row gutter={20} style={{ paddingTop: '1.2rem' }}>
            <Col span={7}>
              <Trend />
            </Col>
            <Col span={17}>
              <Card title='统计'>
                <ColumnChart />
              </Card>
            </Col>
          </Row> */}
        </>
      }
    />
  );
}
