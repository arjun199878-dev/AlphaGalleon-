import { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Stat {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/brain/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-4">
            <span className="text-sm font-medium uppercase tracking-wider">Brain Uptime</span>
            <span className="text-green-500 bg-green-50 px-2 py-1 rounded text-xs">99.9%</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">42h 12m</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-4">
            <span className="text-sm font-medium uppercase tracking-wider">Requests / Hr</span>
            <span className="text-blue-500 bg-blue-50 px-2 py-1 rounded text-xs">+12%</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">1,245</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-4">
            <span className="text-sm font-medium uppercase tracking-wider">Active Sessions</span>
            <span className="text-orange-500 bg-orange-50 px-2 py-1 rounded text-xs">-2</span>
          </div>
          <div className="text-3xl font-bold text-slate-800">8</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 h-96">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance Metrics</h3>
        <AreaChart width={800} height={300} data={[{name: 'A', uv: 4000}, {name: 'B', uv: 3000}]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>
    </div>
  );
};

export default Dashboard;
