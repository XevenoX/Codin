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
        ],
        [
            '1',
            'Framer Design Mobile Responsiveness Specialist',
            'Open',
            new Date(2024, 2, 12),
            new Date(2024, 4, 5),
            null,
            75,
            null,
        ],
        [
            '2',
            'Front-End WordPress Designer',
            'Open',
            new Date(2024, 3, 1),
            new Date(2024, 4, 10),
            null,
            50,
            '1',
        ],
        [
            '3',
            'Part-time Website Product Assistant (PM Assistant)',
            'Awaiting Acceptance',
            new Date(2024, 3, 15),
            new Date(2024, 4, 20),
            null,
            20,
            '2',
        ],
        [
            '4',
            'Redesign Frontend UI for Website',
            'Awaiting Acceptance',
            new Date(2024, 3, 22),
            new Date(2024, 4, 25),
            null,
            0,
            '2',
        ],
        [
            '5',
            'Website Compliance Specialist (Privacy Law)',
            'In Progress',
            new Date(2024, 2, 17),
            new Date(2024, 5, 17),
            null,
            40,
            null,
        ],
        [
            '6',
            'Edit Existing Custom Kajabi Theme',
            'Completed',
            new Date(2024, 1, 20),
            new Date(2024, 2, 25),
            null,
            100,
            null,
        ],
        [
            '7',
            'AstroJS Consultant',
            'Completed',
            new Date(2024, 0, 20),
            new Date(2024, 2, 17),
            null,
            100,
            null,
        ],
    ];

    const options = {
        height: 400,
        gantt: {
            trackHeight: 30,
        },
    };

    return (
        <div>
            <header>
                <div className="logo">Codin.</div>
                <nav>
                    <a href="#">Project Management</a>
                    <a href="#">Marketplace</a>
                </nav>
                <div className="profile">
                    <img src="/profile-pic.png" alt="Profile Picture" />
                    <div className="notifications">
                        <span>🔔</span>
                    </div>
                </div>
            </header>
            <main>
                <div className="toolbar">
                    <button className="post-new-project">Post New Project</button>
                    <button className="grid-view">Grid View</button>
                </div>
                <div className="gantt-chart">
                    <Chart
                        chartType="Gantt"
                        width="100%"
                        height="50vh"
                        data={data}
                        options={options}
                    />
                </div>
            </main>
        </div>
    );
};

export default GanttChartPage;
