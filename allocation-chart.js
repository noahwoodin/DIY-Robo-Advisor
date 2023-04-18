const data = [
    {
        values: [10, 14, 2.5, 20, 26, 10, 1, 16.5],
        labels: [
            'Global equities',
            'Emerging market equities',
            'Gold',
            'International equities',
            'U.S. equities',
            'Canadian equities',
            'Canadian short-term bonds',
            'Government bonds'
        ],
        type: 'pie',
        hole: .4,
        marker: {
            colors: ['#EF5350', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A']
        }
    }
];

const layout = {
    title: 'Asset Allocation',
    height: 400,
    width: 500,
    font: {
        family: 'Helvetica Neue, Arial, sans-serif',
        color: '#3C4858'
    }
};

Plotly.newPlot('donut-chart', data, layout);