
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';
import RecentTransactions from '../components/RecentTransactions';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Balance />
            <Users />
          </div>
          <div className="md:col-span-1">
            <RecentTransactions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;