import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects, createSampleData } from '../api';
import '../styles/CompanyProjectManagementPage.css';

const CompanyProjectManagementPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            const data = await fetchProjects();
            console.log('Fetched projects:', data); // 调试日志
            setProjects(data);
        };

        getProjects();
    }, []);

    const handleSeeMore = (projectName) => {
        console.log(`See more details for project: ${projectName}`);
        alert(`See more details for project: ${projectName}`);
    };

    const handleConfirm = (projectName) => {
        console.log(`Confirm project: ${projectName}`);
        alert(`Confirm project: ${projectName}`);
    };

    const handleDelete = (projectName) => {
        console.log(`Delete project: ${projectName}`);
        alert(`Delete project: ${projectName}`);
    };

    const handlePostNewProject = () => {
        console.log('Post new project');
        alert('Post new project');
    };

    const handleViewGanttChart = () => {
        navigate('/gantt-chart');
    };

    return (
        <div>
            <header>
                <div className="logo">Codin.</div>
                <nav>
                    <button onClick={() => navigate('/project-management')}>Project Management</button>
                    <button onClick={() => navigate('/marketplace')}>Marketplace</button>
                </nav>
                <div className="profile">
                    <img src="/profile-pic.png" alt="Profile" />
                    <div className="notifications">
                        <span>🔔</span>
                    </div>
                </div>
            </header>
            <main>
                <div className="toolbar">
                    <button className="post-new-project" onClick={handlePostNewProject}>Post New Project</button>
                    <button className="view-gantt-chart" onClick={handleViewGanttChart}>Gantt Chart</button>
                </div>
                <div className="projects-grid">
                    <div className="project-section in-progress">
                        <h2>In Progress</h2>
                        <div className="project-list">
                            {projects.filter(project => project.status === 'In Progress').map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <span className="developer">Developer: {project.developer || 'Unknown'}</span>
                                    <span className="complete-before">Complete before: {new Date(project.endDate).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project.name)}>See More</button>
                                    <button className="confirm" onClick={() => handleConfirm(project.name)}>Confirm</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section open">
                        <h2>Open</h2>
                        <div className="project-list">
                            {projects.filter(project => project.status === 'Open').map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <span className="applications-received">Applications received: {project.applications || 0}</span>
                                    <span className="close-at">Close at: {new Date(project.endDate).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project.name)}>See More</button>
                                    <button className="delete" onClick={() => handleDelete(project.name)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section awaiting-acceptance">
                        <h2>Awaiting Acceptance</h2>
                        <div className="project-list">
                            {projects.filter(project => project.status === 'Awaiting Acceptance').map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <span className="developer">Developer: {project.developer || 'Unknown'}</span>
                                    <span className="wait-until">Wait until: {new Date(project.endDate).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project.name)}>See More</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section completed">
                        <h2>Completed</h2>
                        <div className="project-list">
                            {projects.filter(project => project.status === 'Completed').map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <span className="developer">Developer: {project.developer || 'Unknown'}</span>
                                    <span className="completed-at">Completed at: {new Date(project.endDate).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project.name)}>See More</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CompanyProjectManagementPage;
