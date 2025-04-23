import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Activity, FileText, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import { Button } from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Finance: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track revenue, expenses, and financial performance
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button leftIcon={<FileText className="h-4 w-4" />} variant="outline">
            Export Report
          </Button>
          <Button leftIcon={<DollarSign className="h-4 w-4" />} variant="primary">
            New Transaction
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="$1,234,567"
          trend="up"
          trendValue="12% ↑"
          icon={<DollarSign className="h-5 w-5" />}
          description="vs last month"
        />
        <StatCard
          title="Operating Expenses"
          value="$567,890"
          trend="down"
          trendValue="5% ↓"
          icon={<TrendingDown className="h-5 w-5" />}
          description="vs last month"
        />
        <StatCard
          title="Net Profit"
          value="$666,677"
          trend="up"
          trendValue="8% ↑"
          icon={<TrendingUp className="h-5 w-5" />}
          description="vs last month"
        />
        <StatCard
          title="Profit Margin"
          value="54%"
          trend="up"
          trendValue="2% ↑"
          icon={<Activity className="h-5 w-5" />}
          description="vs last month"
        />
      </div>

      {/* Accounts Receivable & Payable Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accounts Receivable */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Accounts Receivable</CardTitle>
              <ArrowUpRight className="h-5 w-5 text-success-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Total Receivables</p>
                  <p className="text-lg font-semibold mt-1">$789,450</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-warning-500 mr-1" />
                    <p className="text-xs text-warning-600">30 days average</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Overdue</p>
                  <p className="text-lg font-semibold mt-1">$123,450</p>
                  <div className="flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 text-error-500 mr-1" />
                    <p className="text-xs text-error-600">15% of total</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Recent Invoices</h4>
                {[
                  {
                    id: 'INV001',
                    customer: 'Ocean Shipping Co.',
                    amount: 45000,
                    dueDate: '2025-07-01',
                    status: 'pending'
                  },
                  {
                    id: 'INV002',
                    customer: 'Global Logistics Ltd.',
                    amount: 32500,
                    dueDate: '2025-06-28',
                    status: 'overdue'
                  },
                  {
                    id: 'INV003',
                    customer: 'Maritime Services Inc.',
                    amount: 28750,
                    dueDate: '2025-07-05',
                    status: 'paid'
                  }
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{invoice.customer}</p>
                      <p className="text-xs text-gray-500">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${invoice.amount.toLocaleString()}</p>
                      <Badge
                        variant={
                          invoice.status === 'paid'
                            ? 'success'
                            : invoice.status === 'overdue'
                            ? 'error'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accounts Payable */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Accounts Payable</CardTitle>
              <ArrowDownRight className="h-5 w-5 text-error-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Total Payables</p>
                  <p className="text-lg font-semibold mt-1">$456,780</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-warning-500 mr-1" />
                    <p className="text-xs text-warning-600">15 days average</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Due This Week</p>
                  <p className="text-lg font-semibold mt-1">$89,650</p>
                  <div className="flex items-center mt-1">
                    <CheckCircle2 className="h-4 w-4 text-success-500 mr-1" />
                    <p className="text-xs text-success-600">On schedule</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Upcoming Payments</h4>
                {[
                  {
                    id: 'PAY001',
                    vendor: 'Port Equipment Ltd.',
                    amount: 34500,
                    dueDate: '2025-06-25',
                    status: 'scheduled'
                  },
                  {
                    id: 'PAY002',
                    vendor: 'Maintenance Services Co.',
                    amount: 12800,
                    dueDate: '2025-06-28',
                    status: 'pending'
                  },
                  {
                    id: 'PAY003',
                    vendor: 'Energy Solutions Inc.',
                    amount: 23450,
                    dueDate: '2025-07-01',
                    status: 'processing'
                  }
                ].map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{payment.vendor}</p>
                      <p className="text-xs text-gray-500">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${payment.amount.toLocaleString()}</p>
                      <Badge
                        variant={
                          payment.status === 'scheduled'
                            ? 'success'
                            : payment.status === 'processing'
                            ? 'warning'
                            : 'primary'
                        }
                        size="sm"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add revenue breakdown chart here */}
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                Revenue Chart Placeholder
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Port Charges</p>
                  <p className="text-lg font-semibold mt-1">$456,789</p>
                  <p className="text-xs text-success-600">+8% vs last month</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Storage Fees</p>
                  <p className="text-lg font-semibold mt-1">$234,567</p>
                  <p className="text-xs text-success-600">+12% vs last month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Add expense analysis chart here */}
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                Expense Chart Placeholder
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Operating Costs</p>
                  <p className="text-lg font-semibold mt-1">$345,678</p>
                  <p className="text-xs text-error-600">-5% vs last month</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Maintenance</p>
                  <p className="text-lg font-semibold mt-1">$123,456</p>
                  <p className="text-xs text-warning-600">+2% vs last month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      id: 'TRX001',
                      description: 'Port Charges - MV STAR PHOENIX',
                      date: '2025-06-15',
                      amount: 12500,
                      status: 'completed'
                    },
                    {
                      id: 'TRX002',
                      description: 'Storage Fees - Container Yard A',
                      date: '2025-06-14',
                      amount: 8750,
                      status: 'pending'
                    },
                    {
                      id: 'TRX003',
                      description: 'Maintenance - Crane 2',
                      date: '2025-06-14',
                      amount: -4500,
                      status: 'completed'
                    },
                    {
                      id: 'TRX004',
                      description: 'Pilotage Services',
                      date: '2025-06-13',
                      amount: 3200,
                      status: 'completed'
                    }
                  ].map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        transaction.amount >= 0 ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'completed'
                            ? 'bg-success-100 text-success-800'
                            : 'bg-warning-100 text-warning-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Finance;