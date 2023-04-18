document.addEventListener('DOMContentLoaded', function () {
   /* const exponentialGrowthFunction = (x, a, b) => {
        return a * Math.pow(b, x);
    };*/
    const initialValue = 10000;
    const expectedAnnualReturn = 0.07;
    const wsAnnualFees = 0.0063;
    const diyAnnualFees = 0.0013;
    const exponentialGrowthFunction = (initialValue, expectedAnnualReturn, annualFees, numYears) => {
        return initialValue * Math.pow(1 + expectedAnnualReturn - annualFees, numYears);
    };

    const xValues = Array.from({length: 201}, (_, i) => i * 0.1);
    const wsYValues = xValues.map(x => exponentialGrowthFunction(initialValue, expectedAnnualReturn, wsAnnualFees, x));
    const diyYValues = xValues.map(x => exponentialGrowthFunction(initialValue, expectedAnnualReturn, diyAnnualFees, x));

    const wsTrace = {
        x: xValues,
        y: wsYValues,
        mode: 'lines',
        name: '0.5% Annual Fee',
        line: {shape: 'spline'}
    };

    const wsLayout = {
        title: 'Portfolio Growth with Wealthsimples 0.5% Management Fee',
        xaxis: {title: 'Years'},
        yaxis: {title: 'Portfolio Value'},
        showlegend: false
    };

    const diyTrace = {
        x: xValues,
        y: diyYValues,
        mode: 'lines',
        name: '0.13% Annual Fee',
        line: {shape: 'spline'}
    };

    const diyLayout = {
        title: 'Portfolio Growth with Self Managed 0.13% MER Fee',
        xaxis: {title: 'Years'},
        yaxis: {title: 'Portfolio Value'},
        showlegend: false
    };

    Plotly.newPlot('ws', [wsTrace], wsLayout);
    Plotly.newPlot('diy', [diyTrace], diyLayout);


    const initialValueInput = document.getElementById('initial-value');
    const annualReturnInput = document.getElementById('annual-return');
    const numYearsInput = document.getElementById('num-years');

    const updateCharts = () => {
        const newInitialValue = parseFloat(initialValueInput.value);
        const newExpectedAnnualReturn = parseFloat(annualReturnInput.value) / 100;
        const newXValues = Array.from({length: parseFloat(numYearsInput.value) * 10 + 1}, (_, i) => i * 0.1);

        const newWsYValues = newXValues.map(x => exponentialGrowthFunction(newInitialValue, newExpectedAnnualReturn, wsAnnualFees, x));
        const newDiyYValues = newXValues.map(x => exponentialGrowthFunction(newInitialValue, newExpectedAnnualReturn, diyAnnualFees, x));

        wsTrace.x = newXValues;
        wsTrace.y = newWsYValues;
        diyTrace.x = newXValues;
        diyTrace.y = newDiyYValues;

        Plotly.update('ws', {x: [newXValues], y: [newWsYValues]});
        Plotly.update('diy', {x: [newXValues], y: [newDiyYValues]});
    };

    initialValueInput.addEventListener('input', updateCharts);
    annualReturnInput.addEventListener('input', updateCharts);
    numYearsInput.addEventListener('input', updateCharts);

    updateCharts();
});

