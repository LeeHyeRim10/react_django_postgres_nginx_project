import React from 'react';
import { useDashboard } from '../../store/hooks/useDashboard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { kpi, userRanking, productRanking } = useDashboard();

  const userChartData = {
    labels: userRanking.map(item => item.username),
    datasets: [
      {
        label: '구매 건수',
        data: userRanking.map(item => item.count),
        backgroundColor: '#3b82f6',
        borderRadius: 8,
      },
    ],
  };

  const productChartData = {
    labels: productRanking.map(item => item.name),
    datasets: [
      {
        label: '판매 수량',
        data: productRanking.map(item => item.quantity),
        backgroundColor: '#10b981',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div
      style={{
        padding: '30px',
        background: '#f1f5f9',
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '30px',
        }}
      >
        📊 매출 대시보드
      </h1>

      {/* KPI */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        {[
          ['총 매출액', `${(kpi.totalSalesAmount ?? 0) .toLocaleString()}원`],
          ['총 판매수량', `${(kpi.totalQuantity ?? 0).toLocaleString()}개`],
          ['총 주문건수', `${(kpi.totalOrderCount ?? 0).toLocaleString()}건`],
          ['고객 수', `${(kpi.customerCount ?? 0).toLocaleString()}명`],
          ['상품 수', `${(kpi.productCount ?? 0).toLocaleString()}개`],
        ].map(([title, value]) => (
          <div
            key={title}
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            <div
              style={{
                color: '#64748b',
                fontSize: '14px',
                marginBottom: '10px',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#0f172a',
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <h2
            style={{
              marginBottom: '20px',
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            고객 구매 랭킹 TOP 10
          </h2>

          <div style={{ height: '400px' }}>
            <Bar
              data={userChartData}
              options={chartOptions}
            />
          </div>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <h2
            style={{
              marginBottom: '20px',
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            상품 판매 랭킹 TOP 10
          </h2>

          <div style={{ height: '400px' }}>
            <Bar
              data={productChartData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;