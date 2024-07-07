import React from 'react';
import { Chart } from 'react-google-charts';
import '../styles/GanttChartPage.css';

const convertToGermanDate = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
};

const GanttChartPage = () => {
    const data = [
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
        ],
        [
            '1',
            'Framer Design Mobile Responsiveness Specialist',
            'Open',
            convertToGermanDate('2024-03-01T00:00:00Z'),
            convertToGermanDate('2024-03-05T00:00:00Z'),
            null,
            0,
            null,
            '<div><img src="/profile-pic1.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Framer Design Mobile Responsiveness Specialist</span></div>',
        ],
        [
            '2',
            'Front-End WordPress Designer',
            'Open',
            convertToGermanDate('2024-03-06T00:00:00Z'),
            convertToGermanDate('2024-03-10T00:00:00Z'),
            null,
            0,
            '1',
            '<div><img src="/profile-pic2.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Front-End WordPress Designer</span></div>',
        ],
        [
            '3',
            'Part-time Website Product Assistant (PM Assistant)',
            'Awaiting Acceptance',
            convertToGermanDate('2024-03-11T00:00:00Z'),
            convertToGermanDate('2024-03-15T00:00:00Z'),
            null,
            0,
            '2',
            '<div><img src="/profile-pic3.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Part-time Website Product Assistant (PM Assistant)</span></div>',
        ],
        [
            '4',
            'Redesign Frontend UI for Website',
            'Awaiting Acceptance',
            convertToGermanDate('2024-03-16T00:00:00Z'),
            convertToGermanDate('2024-03-20T00:00:00Z'),
            null,
            0,
            '3',
            '<div><img src="/profile-pic4.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Redesign Frontend UI for Website</span></div>',
        ],
        [
            '5',
            'Website Compliance Specialist (Privacy Law)',
            'In Progress',
            convertToGermanDate('2024-03-21T00:00:00Z'),
            convertToGermanDate('2024-03-25T00:00:00Z'),
            null,
            50,
            '4',
            '<div><img src="/profile-pic5.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Website Compliance Specialist (Privacy Law)</span></div>',
        ],
        [
            '6',
            'Website Compliance Specialist (Cookie)',
            'In Progress',
            convertToGermanDate('2024-03-26T00:00:00Z'),
            convertToGermanDate('2024-03-30T00:00:00Z'),
            null,
            50,
            '5',
            '<div><img src="/profile-pic6.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Website Compliance Specialist (Cookie)</span></div>',
        ],
        [
            '7',
            'Edit Existing Custom Kajabi Theme',
            'Complete',
            convertToGermanDate('2024-04-01T00:00:00Z'),
            convertToGermanDate('2024-04-05T00:00:00Z'),
            null,
            100,
            '6',
            '<div><img src="/profile-pic7.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Edit Existing Custom Kajabi Theme</span></div>',
        ],
        [
            '8',
            'AstroJS Consultant',
            'Complete',
            convertToGermanDate('2024-04-06T00:00:00Z'),
            convertToGermanDate('2024-04-10T00:00:00Z'),
            null,
            100,
            '7',
            '<div><img src="/profile-pic8.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>AstroJS Consultant</span></div>',
        ],
    ];

    const options = {
        height: 400,
        gantt: {
            trackHeight: 30,
            palette: [
                { "color": "#FF6347", "dark": "#FF4500", "light": "#FFA07A" }, // Open
                { "color": "#FF8C00", "dark": "#FF7F50", "light": "#FFA07A" }, // Awaiting Acceptance (更深的橙色)
                { "color": "#228B22", "dark": "#006400", "light": "#32CD32" }, // In Progress (更深的绿色)
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
                        <span>🔔</span>
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
