import React, { useState, useEffect } from 'react';
import './SalesHistory.css';

const SalesHistory = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch sales history when component mounts or when salesHistory changes
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/sales');
            if (!response.ok) {
                throw new Error('Failed to fetch sales data');
            }
            const data = await response.json();
            console.log('Fetched sales data:', data); // Debug log
            setSales(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching sales:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    // Add a refreshSales function that can be called after a checkout
    const refreshSales = () => {
        fetchSales();
    };

    if (loading) return <div className="loading">Loading sales history...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="sales-history">
            <h2>Sales History</h2>
            {sales.length === 0 ? (
                <div className="no-sales">No sales records found</div>
            ) : (
                <>
                    <div className="summary-section">
                        <div className="summary-card">
                            <h3>Total Sales</h3>
                            <p>LKR {sales.reduce((sum, sale) => sum + (sale.total || 0), 0).toFixed(2)}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Total Transactions</h3>
                            <p>{sales.length}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Average Sale</h3>
                            <p>LKR {(sales.reduce((sum, sale) => sum + (sale.total || 0), 0) / sales.length).toFixed(2)}</p>
                        </div>
                    </div>
                    
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