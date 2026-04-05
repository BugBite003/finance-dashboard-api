const Transaction = require('../models/Transaction.js');

const getDashboard = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort('date');

    const summary = transactions.reduce((acc, trans) => {
      if (trans.type === 'income') {
        acc.totalIncome += trans.amount;
      } else {
        acc.totalExpense += trans.amount;
      }
      acc.totalTransactions += 1;
      acc.netBalance = acc.totalIncome - acc.totalExpense;
      return acc;
    }, { totalIncome: 0, totalExpense: 0, netBalance: 0, totalTransactions: 0 });

    // Category breakdown
    const categories = {};
    transactions.forEach(trans => {
      categories[trans.category] = (categories[trans.category] || 0) + trans.amount;
    });
    const categoryList = Object.entries(categories)
      .map(([category, amount]) => ({ category, amount: Math.round(amount * 100) / 100, count: transactions.filter(t => t.category === category).length, type: transactions.find(t => t.category === category).type }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    // Monthly trends (simple group by year-month)
    const monthly = {};
    transactions.forEach(trans => {
      const yearMonth = trans.date.toISOString().slice(0, 7);
      if (!monthly[yearMonth]) monthly[yearMonth] = { income: 0, expense: 0 };
      if (trans.type === 'income') monthly[yearMonth].income += trans.amount;
      else monthly[yearMonth].expense += trans.amount;
    });
    const monthlyTrends = Object.entries(monthly)
      .map(([yearMonth, data]) => ({
        yearMonth,
        income: Math.round(data.income * 100) / 100,
        expense: Math.round(data.expense * 100) / 100,
        net: Math.round((data.income - data.expense) * 100) / 100
      }))
      .sort((a, b) => b.yearMonth.localeCompare(a.yearMonth))
      .slice(0, 12);

    res.json({
      success: true,
      summary,
      categories: categoryList,
      monthlyTrends,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };
