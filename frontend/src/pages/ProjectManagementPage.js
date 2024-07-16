import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import '../styles/ProjectManagementPage.css';

const ProjectManagementPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5050';
        const getProjects = async () => {
            try {
                const res = await axios.get('/projectpage');
                console.log('Fetched projects:', res.data); // 打印获取的数据
                setProjects(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError(err);
                setLoading(false);
            }
        };
        getProjects();
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // 计算项目所有收入的总和，确保项目预算是有效的数字
    const totalIncome = projects.reduce((sum, project) => {
        const income = Number(project.project_budget);
        return sum + (isNaN(income) ? 0 : income);
    }, 0);

    // Prepare data for the chart
    const chartData = [
        ['Date', 'Income'],
        ...projects.map(project => [
            new Date(project.project_posttime).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' }),
            project.project_budget
        ])
    ];

    const chartOptions = {
        title: '',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: 'Date', format: 'MMM yyyy' },
        vAxis: { title: 'Income', minValue: 0 },
    };

    return (
        <div>
            <header>
                <div className="logo">Codin.</div>
                <nav>
                    <button onClick={() => handleNavigation('/project-management')}>Project Management</button>
                    <button onClick={() => handleNavigation('/marketplace')}>Marketplace</button>
                </nav>
                <div className="profile">
                    <img src="profile-pic.png" alt="Profile" />
                    <div className="notifications">
                        <span role="img" aria-label="notification">🔔</span>
                    </div>
                </div>
            </header>
            <main>
                <div className="dashboard">
                    <div className="graph">
                        <Chart
                            chartType="LineChart"
                            width="800px"
                            height="400px"
                            data={chartData}
                            options={chartOptions}
                        />
                    </div>
                    <div className="graph-info">
                        <span className="value">Total Income</span>
                        <span className="amount">${totalIncome.toLocaleString()}</span>
                    </div>
                    <div className="stats">
                        <div className="stat achieved">
                            <span className="label">Amount Achieved</span>
                            <span className="date">Date: 05.05.2024</span>
                            <span className="amount">$1000</span>
                        </div>
                        <div className="stat on-the-way">
                            <span className="label">Money on the way</span>
                            <span className="amount">$1000</span>
                        </div>
                    </div>
                </div>
                <div className="projects-grid">
                    <div className="project-section in-progress">
                        <h2>In Progress</h2>
                        <div className="project-list">
                            {projects.filter(project => project.project_status === 3).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="company">Company: {project.project_publisher || 'Unknown'}</span>
                                    <span className="complete-before">Complete before: {new Date(project.project_deadline).toLocaleDateString()}</span>
                                    <button className="see-more">See More</button>
                                    <button className="complete">Complete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section applied">
                        <h2>Applied</h2>
                        <div className="project-list">
                            {projects.filter(project => project.project_status === 2).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="company">Company: {project.project_publisher || 'Unknown'}</span>
                                    <span className="complete-before">Complete before: {new Date(project.project_deadline).toLocaleDateString()}</span>
                                    <button className="see-more">See More</button>
                                    <button className="withdraw">Withdraw</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section awaiting-acceptance">
                        <h2>Offers Received</h2>
                        <div className="project-list">
                            {projects.filter(project => project.project_status === 1).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="company">Company: {project.project_publisher || 'Unknown'}</span>
                                    <span className="response-before">Response before: {new Date(project.project_deadline).toLocaleDateString()}</span>
                                    <button className="accept">Accept</button>
                                    <button className="reject">Reject</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section completed">
                        <h2>Complete</h2>
                        <div className="project-list">
                            {projects.filter(project => project.project_status === 5).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="company">Company: {project.project_publisher || 'Unknown'}</span>
                                    <span className="completed-at">Completed at: {new Date(project.project_completetime).toLocaleDateString()}</span>
                                    <button className="see-more">See More</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectManagementPage;
