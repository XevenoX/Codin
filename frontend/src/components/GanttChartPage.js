import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import '../styles/GanttChartPage.css';

const convertToGermanDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
};

const GanttChartPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.defaults.baseURL =
            process.env.REACT_APP_API_BASE_URL || 'http://localhost:5050';
        const getProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                const projects = res.data;
                const chartData = [
                    [
                        { type: 'string', label: 'Task ID' },
                        { type: 'string', label: 'Task Name' },
                        { type: 'string', label: 'Resource' },
                        { type: 'date', label: 'Start Date' },
                        { type: 'date', label: 'End Date' },
                        { type: 'number', label: 'Duration' },
                        { type: 'number', label: 'Percent Complete' },
                        { type: 'string', label: 'Dependencies' },
                        { type: 'string', role: 'tooltip', 'p': { 'html': true } },
                    ]
                ];

                projects.forEach((project, index) => {
                    chartData.push([
                        project._id.toString(),
                        project.project_name,
                        project.project_status === 1 ? 'Open' : 
                            project.project_status === 2 ? 'Awaiting Acceptance' : 
                            project.project_status === 3 ? 'In Progress' : 
                            project.project_status === 5 ? 'Complete' : '',
                        convertToGermanDate(project.project_posttime),
                        convertToGermanDate(project.project_deadline),
                        null,
                        0,
                        null,
                        `<div><img src="/profile-pic.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>${project.project_name}</span></div>`,
                    ]);
                });

                setData(chartData);
                setLoading(false);
                console.log('Fetched projects for Gantt chart:', projects);
            } catch (err) {
                console.error('Error fetching projects for Gantt chart:', err);
                setError(err);
                setLoading(false);
            }
        };
        getProjects();
    }, []);

    const options = {
        height: 400,
        gantt: {
            trackHeight: 30,
            palette: [
                { "color": "#FF6347", "dark": "#FF4500", "light": "#FFA07A" }, // Open
                { "color": "#FF8C00", "dark": "#FF7F50", "light": "#FFA07A" }, // Awaiting Acceptance
                { "color": "#228B22", "dark": "#006400", "light": "#32CD32" }, // In Progress
                { "color": "#4682B4", "dark": "#4169E1", "light": "#87CEFA" }  // Complete
            ],
        },
        tooltip: { isHtml: true },
    };

    const taskStates = [
        { label: 'Open', color: '#FF6347' },
        { label: 'Awaiting Acceptance', color: '#FF8C00' },
        { label: 'In Progress', color: '#228B22' },
        { label: 'Complete', color: '#4682B4' },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <header>
                <div className="logo">Codin.</div>
                <nav>
                    <button onClick={() => window.history.back()}>Back</button>
                </nav>
                <div className="profile">
                    <img src="/profile-pic.png" alt="Profile" />
                    <div className="notifications">
                        <span role="img" aria-label="notification">🔔</span>
                    </div>
                </div>
            </header>
            <main className="main-content">
                <div className="sidebar">
                    <button className="post-new-project">Post New Project</button>
                    {taskStates.map((state, index) => (
                        <div key={index} className="task-state">
                            <span className="task-state-color" style={{ backgroundColor: state.color }}></span>
                            {state.label}
                        </div>
                    ))}
                </div>
                <div className="chart-content">
                    <button className="grid-view" onClick={() => window.history.back()}>Grid View</button>
                    <div className="gantt-chart">
                        <Chart
                            chartType="Gantt"
                            width="100%"
                            height="400px"
                            data={data}
                            options={options}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GanttChartPage;
