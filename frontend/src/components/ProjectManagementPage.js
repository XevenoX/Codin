import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects, createSampleData } from '../api';
import '../styles/ProjectManagementPage.css';

const ProjectManagementPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            const data = await fetchProjects();
            setProjects(data);
        };

        getProjects();
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleCreateSampleData = async () => {
        await createSampleData();
        const data = await fetchProjects();
        setProjects(data);
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
                        <span>🔔</span>
                    </div>
                </div>
            </header>
            <main>
                <div className="dashboard">
                    <div className="graph">
                        <div className="graph-info">
                            <span className="value">Value</span>
                            <span className="amount">$2,987</span>
                        </div>
                        <img src="graph-placeholder.png" alt="Graph" />
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
                <div className="toolbar">
                    <button className="post-new-project" onClick={handleCreateSampleData}>Post New Project</button>
                </div>
                <div className="projects-grid">
                    <div className="project-section in-progress">
                        <h2>In Progress</h2>
                        <div className="project-list">
                            {projects.filter(project => project.status === 'In Progress').map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <span className="company">Company: {project.company || 'Unknown'}</span>
                                    <span className="complete-before">Complete before: {new Date(project.endDate).toLocaleDateString()}</span>
                                    <button className="see-more">See More</button>
                                    <button className="complete">Complete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section applied">
                        <h2>Applied</h2>
                        <div className="project-list">
                            {projects.filter(project => project.status === 'Applied').map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <span className="company">Company: {project.company || 'Unknown'}</span>
                                    <span className="complete-before">Complete before: {new Date(project.endDate).toLocaleDateString()}</span>
                                    <button className="see-more">See More</button>
                                    <button className="withdraw">Withdraw</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section awaiting-acceptance">
                        <h2>Offers Received</h2>
                        <div className="project-list">
                            {projects.filter(project => project.status === 'Awaiting Acceptance').map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <span className="company">Company: {project.company || 'Unknown'}</span>
                                    <span className="response-before">Response before: {new Date(project.endDate).toLocaleDateString()}</span>
                                    <button className="accept">Accept</button>
                                    <button className="reject">Reject</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section completed">
                        <h2>Complete</h2>
                        <div className="project-list">
                            {projects.filter(project => project.status === 'Complete').map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.name}</h3>
                                    <span className="company">Company: {project.company || 'Unknown'}</span>
                                    <span className="completed-at">Completed at: {new Date(project.endDate).toLocaleDateString()}</span>
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
