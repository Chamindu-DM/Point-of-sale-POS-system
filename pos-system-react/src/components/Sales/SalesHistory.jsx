import React, { useState, useEffect } from 'react';
import './SalesHistory.css';

const SalesHistory = ({ refreshTrigger }) => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState('all'); // 'today', 'week', 'month', 'all'

    useEffect(() => {
        fetchSales();
    }, [refreshTrigger, dateRange]);

    const fetchSales = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/sales`);
            if (!response.ok) {
                throw new Error(`Failed to fetch sales data: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Fetched sales data:', data);
            
            // Filter data based on date range if needed
            let filteredData = data;
            if (dateRange !== 'all') {
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                
                filteredData = data.filter(sale => {
                    const saleDate = new Date(sale.date);
                    if (dateRange === 'today') {
                        return saleDate >= today;
                    } else if (dateRange === 'week') {
                        const weekAgo = new Date(today);
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return saleDate >= weekAgo;
                    } else if (dateRange === 'month') {
                        const monthAgo = new Date(today);
                        monthAgo.setMonth(monthAgo.getMonth() - 1);
                        return saleDate >= monthAgo;
                    }
                    return true;
                });
            }
            
            setSales(Array.isArray(filteredData) ? filteredData : []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching sales:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    // Calculate business metrics
    const calculateMetrics = () => {
        if (!sales.length) return { 
            totalSales: 0, 
            totalTransactions: 0, 
            averageSale: 0,
            totalItems: 0,
            topSellingItem: 'N/A',
            topSellingItemCount: 0,
            totalProfit: 0,
            conversionRate: 0
        };

        // Total number of items sold
        const totalItems = sales.reduce((sum, sale) => {
            return sum + (sale.items?.reduce((itemSum, item) => itemSum + item.quantity, 0) || 0);
        }, 0);

        // Find top selling item
        const itemCounts = {};
        sales.forEach(sale => {
            sale.items?.forEach(item => {
                if (!itemCounts[item.name]) itemCounts[item.name] = 0;
                itemCounts[item.name] += item.quantity;
            });
        });

        let topSellingItem = 'N/A';
        let topSellingItemCount = 0;
        
        Object.entries(itemCounts).forEach(([name, count]) => {
            if (count > topSellingItemCount) {
                topSellingItem = name;
                topSellingItemCount = count;
            }
        });

        // Calculate total sales amount
        const totalSalesAmount = sales.reduce((sum, sale) => sum + (sale.total || 0), 0);
        
        // Calculate average sale
        const averageSale = sales.length > 0 ? totalSalesAmount / sales.length : 0;

        return {
            totalSales: totalSalesAmount,
            totalTransactions: sales.length,
            averageSale: averageSale,
            totalItems: totalItems,
            topSellingItem: topSellingItem,
            topSellingItemCount: topSellingItemCount
        };
    };

    const metrics = calculateMetrics();

    if (loading) return <div className="loading">Loading sales history...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="sales-history">
            <div className="sales-history-header">
                <h2>Sales History</h2>
                <div className="sales-controls">
                    <select 
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="date-filter"
                    >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                    <button 
                        className="refresh-button" 
                        onClick={fetchSales}
                        disabled={loading}
                    >
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>
            
            {sales.length === 0 ? (
                <div className="no-sales">No sales records found</div>
            ) : (
                <>
                    <div className="summary-section">
                        <div className="summary-card">
                            <h3>Total Revenue</h3>
                            <p>LKR {metrics.totalSales.toFixed(2)}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Transactions</h3>
                            <p>{metrics.totalTransactions}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Average Sale</h3>
                            <p>LKR {metrics.averageSale.toFixed(2)}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Items Sold</h3>
                            <p>{metrics.totalItems}</p>
                        </div>
                        <div className="summary-card highlight">
                            <h3>Top Product</h3>
                            <p>{metrics.topSellingItem} ({metrics.topSellingItemCount})</p>
                        </div>
                    </div>
                    
                    <h3 className="section-title">Transaction Details</h3>
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>Invoice #</th>
                                <th>Date & Time</th>
                                <th>Items</th>
                                <th>Quantity</th>
                                <th>Total (LKR)</th>
                                <th>Paid (LKR)</th>
                                <th>Balance (LKR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => (
                                <tr key={sale._id || sale.invoiceNumber}>
                                    <td>{sale.invoiceNumber}</td>
                                    <td>{new Date(sale.date).toLocaleString()}</td>
                                    <td>{sale.items?.map(item => item.name).join(', ') || 'N/A'}</td>
                                    <td>
                                        {sale.items?.map(item => item.quantity).reduce((a, b) => a + b, 0) || 0}
                                    </td>
                                    <td>{(sale.total || 0).toFixed(2)}</td>
                                    <td>{(sale.paidAmount || 0).toFixed(2)}</td>
                                    <td>{(sale.balance || 0).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default SalesHistory;