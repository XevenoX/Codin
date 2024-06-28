import React from 'react';
import { Chart } from 'react-google-charts';
import '../styles/GanttChartPage.css';

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
            new Date(2024, 2, 12),
            new Date(2024, 2, 17),
            null,
            0,
            null,
            '<div><img src="/profile-pic1.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Framer Design Mobile Responsiveness Specialist</span></div>',
        ],
        [
            '2',
            'Front-End WordPress Designer',
            'Open',
            new Date(2024, 2, 12),
            new Date(2024, 2, 19),
            null,
            0,
            null,
            '<div><img src="/profile-pic2.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Front-End WordPress Designer</span></div>',
        ],
        [
            '3',
            'Part-time Website Product Assistant (PM Assistant)',
            'Awaiting Acceptance',
            new Date(2024, 2, 12),
            new Date(2024, 2, 20),
            null,
            0,
            null,
            '<div><img src="/profile-pic3.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Part-time Website Product Assistant (PM Assistant)</span></div>',
        ],
        [
            '4',
            'Redesign Frontend UI for Website',
            'Awaiting Acceptance',
            new Date(2024, 2, 13),
            new Date(2024, 2, 21),
            null,
            0,
            null,
            '<div><img src="/profile-pic4.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Redesign Frontend UI for Website</span></div>',
        ],
        [
            '5',
            'Website Compliance Specialist (Privacy Law)',
            'In Progress',
            new Date(2024, 2, 12),
            new Date(2024, 2, 17),
            null,
            50,
            null,
            '<div><img src="/profile-pic5.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Website Compliance Specialist (Privacy Law)</span></div>',
        ],
        [
            '6',
            'Website Compliance Specialist (Cookie)',
            'In Progress',
            new Date(2024, 2, 12),
            new Date(2024, 2, 17),
            null,
            50,
            null,
            '<div><img src="/profile-pic6.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Website Compliance Specialist (Cookie)</span></div>',
        ],
        [
            '7',
            'Edit Existing Custom Kajabi Theme',
            'Complete',
            new Date(2024, 2, 12),
            new Date(2024, 2, 17),
            null,
            100,
            null,
            '<div><img src="/profile-pic7.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>Edit Existing Custom Kajabi Theme</span></div>',
        ],
        [
            '8',
            'AstroJS Consultant',
            'Complete',
            new Date(2024, 2, 12),
            new Date(2024, 2, 17),
            null,
            100,
            null,
            '<div><img src="/profile-pic8.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>AstroJS Consultant</span></div>',
        ],
    ];

    const options = {
        height: 400,
        gantt: {
            trackHeight: 30,
            palette: [
                { "color": "#FF6347", "dark": "#FF4500", "light": "#FFA07A" }, // Open
                { "color": "#FFA500", "dark": "#FF8C00", "light": "#FFD700" }, // Awaiting Acceptance
                { "color": "#00FF7F", "dark": "#00FA9A", "light": "#98FB98" }, // In Progress
                { "color": "#4682B4", "dark": "#4169E1", "light": "#87CEFA" }  // Complete
            ],
        },
        tooltip: { isHtml: true },
    };

    const taskStates = [
        { label: 'Open', color: '#FF6347' },
        { label: 'Awaiting Acceptance', color: '#FFA500' },
        { label: 'In Progress', color: '#00FF7F' },
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
