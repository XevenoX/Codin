const processChartData = (projects) => {
    const monthlyIncome = {};

    projects.forEach((project) => {
      const postDate = new Date(project.project_posttime);
      const monthYear = `${postDate.getFullYear()}-${postDate.getMonth() + 1}`;

      const income = parseFloat(project.project_budget);
      if (!isNaN(income)) {
        if (monthlyIncome[monthYear]) {
          monthlyIncome[monthYear] += income;
        } else {
          monthlyIncome[monthYear] = income;
        }
      }
    });

    const chartData = [['Date', 'Income']];
    Object.keys(monthlyIncome).sort().forEach((key) => {
      const [year, month] = key.split('-');
      chartData.push([new Date(year, month - 1), monthlyIncome[key]]);
    });

    return chartData;
  };

  const chartData = processChartData(projects);

  const chartOptions = {
    title: 'Monthly Income',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { title: 'Date', format: 'MMM yyyy' },
    vAxis: { title: 'Income', minValue: 0 },
  };