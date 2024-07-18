import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../styles/CompanyProjectManagementPage.css';

const CompanyProjectManagementPage = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['token', 'user_id']);
    const [userInfo, setUserInfo] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 获取用户信息
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                console.log('Fetching user info with ID:', cookies.user_id);
                const res = await axios.get('http://localhost:5050/userInfo/findUser', {
                    headers: {
                        'Authorization': `Bearer ${cookies.token}`
                    },
                    params: {
                        _id: cookies.user_id
                    }
                });
                console.log('User info response:', res.data);
                setUserInfo(res.data);
            } catch (err) {
                console.error('Error fetching user info:', err);
                setLoading(false);
            }
        };
        if (cookies.token && cookies.user_id) {
            fetchUserInfo();
        } else {
            console.log('No token or user_id found in cookies');
            setLoading(false);
        }
    }, [cookies]);

    // 获取项目列表
    useEffect(() => {
        const fetchProjects = async () => {
            if (!userInfo) {
                console.log('No userInfo found');
                setLoading(false);
                return;
            }
            try {
                console.log('Fetching projects for user:', userInfo);
                const res = await axios.get('http://localhost:5050/projects/all', {
                    params: {
                        userId: userInfo._id
                    }
                });
                console.log('Projects fetched:', res.data);
                setProjects(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError(err);
                setLoading(false);
            }
        };

        if (userInfo) {
            fetchProjects();
        }
    }, [userInfo]);

    const updateProjectStatus = async (projectId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5050/projects/${projectId}`, {
                project_status: newStatus,
                userId: userInfo._id
            });
            setProjects(projects.map(project => project._id === projectId ? { ...project, project_status: newStatus } : project));
        } catch (error) {
            alert('Error updating project status');
        }
    };

    const handleComplete = (projectId) => {
        updateProjectStatus(projectId, 5);
    };

    const handleSeeMore = (projectId) => {
        navigate(`/project/${projectId}`);
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
                    <img src={userInfo?.avatar} alt="Profile" onClick={() => navigate(`/user/${userInfo._id}`)} />
                    <div className="notifications">
                        <span role="img" aria-label="notification">🔔</span>
                    </div>
                </div>
            </header>
            <main>
                <div className="toolbar">
                    <button className="post-new-project" onClick={() => alert('Post new project')}>Post New Project</button>
                    <button className="view-gantt-chart" onClick={() => navigate('/gantt-chart')}>Gantt Chart</button>
                </div>
                <div className="projects-grid">
                    <div className="project-section open">
                        <h2>Open</h2>
                        <div className="project-list">
                            {projects.filter(project => project.project_status === 1).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="applications-received">Applications received: {project.applicants ? project.applicants.length : 0}</span>
                                    <span className="close-at">Close at: {new Date(project.project_deadline).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project._id)}>See More</button>
                                    <button className="delete" onClick={() => alert('Delete project')}>Delete</button>
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
                                    <button className="see-more" onClick={() => handleSeeMore(project._id)}>See More</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="project-section in-progress">
                        <h2>In Progress</h2>
                        <div className="project-list">
                            {projects.filter(project => project.project_status === 3).map(project => (
                                <div className="project" key={project._id}>
                                    <h3>{project.project_name}</h3>
                                    <span className="developer">Developer: {project.chosen_applicants || 'Unknown'}</span>
                                    <span className="complete-before">Complete before: {new Date(project.project_deadline).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project._id)}>See More</button>
                                    <button className="complete" onClick={() => handleComplete(project._id)}>Complete</button>
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
                                    <span className="completed-at">Completed at: {new Date(project.project_deadline).toLocaleDateString()}</span>
                                    <button className="see-more" onClick={() => handleSeeMore(project._id)}>See More</button>
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
