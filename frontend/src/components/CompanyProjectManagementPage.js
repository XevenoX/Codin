import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CompanyProjectManagementPage.css';

const CompanyProjectManagementPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.defaults.baseURL =
            process.env.REACT_APP_API_BASE_URL || 'http://localhost:5050';
        const getProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                setProjects(res.data);
                setLoading(false);
                console.log('Fetched projects:', res.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError(err);
                setLoading(false);
            }
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
                    <button onClick={() => navigate('/project-management')}>Project Management</button>
                    <button onClick={() => navigate('/marketplace')}>Marketplace</button>
                </nav>
                <div className="profile">
                    <img src="/profile-pic.png" alt="Profile" />
                    <div className="notifications">
                        <span role="img" aria-label="notification">🔔</span>
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
                            {projects.filter(project => project.project_status === 3).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="developer">Developer: {project.chosen_applicants || 'Unknown'}</span>
                                    <span className="complete-before">Complete before: {new Date(project.project_deadline).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project.project_name)}>See More</button>
                                    <button className="confirm" onClick={() => handleConfirm(project.project_name)}>Confirm</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section open">
                        <h2>Open</h2>
                        <div className="project-list">
                            {projects.filter(project => project.project_status === 1).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="applications-received">Applications received: {project.applicants ? project.applicants.length : 0}</span>
                                    <span className="close-at">Close at: {new Date(project.project_deadline).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project.project_name)}>See More</button>
                                    <button className="delete" onClick={() => handleDelete(project.project_name)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section awaiting-acceptance">
                        <h2>Awaiting Acceptance</h2>
                        <div className="project-list">
                            {projects.filter(project => project.project_status === 2).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="developer">Developer: {project.chosen_applicants || 'Unknown'}</span>
                                    <span className="wait-until">Wait until: {new Date(project.project_deadline).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project.project_name)}>See More</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section completed">
                        <h2>Completed</h2>
                        <div className="project-list">
                            {projects.filter(project => project.project_status === 5).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="developer">Developer: {project.chosen_applicants || 'Unknown'}</span>
                                    <span className="completed-at">Completed at: {new Date(project.project_completetime).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project.project_name)}>See More</button>
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
