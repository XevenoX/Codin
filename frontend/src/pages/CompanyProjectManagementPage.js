import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../styles/CompanyProjectManagementPage.css';
import RatingDialog from '../components/RatingDialog';

const CompanyProjectManagementPage = () => {
    const navigate = useNavigate();
    const [cookie] = useCookies(['user']);
    const currentUser = cookie.user;
    const [userInfo, setUserInfo] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // get user info
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get('http://localhost:5050/userInfo/findUser', {
                    params: {
                        _id: currentUser.id,
                    },
                });
                console.log('User info response:', res.data);
                setUserInfo(res.data);
            } catch (err) {
                console.error('Error fetching user info:', err);
                setLoading(false);
            }
        };
        if (currentUser.id) {
            fetchUserInfo();
        } else {
            console.log('No token or user_id found in cookies');
            setLoading(false);
        }
    }, []);

    // get project list
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
                        userId: userInfo._id,
                    },
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
                userId: userInfo._id,
            });
            setProjects(
                projects.map((project) =>
                    project._id === projectId
                        ? { ...project, project_status: newStatus }
                        : project
                )
            );
        } catch (error) {
            alert('Error updating project status');
        }
    };

    const handleConfirm = async (projectId, project_publisher) => {
        // add message
        try {
            const postResponse = await axios.post('/message/addNewMessage', {
                project_id: projectId,
                message_to: project_publisher,
                message_type: 5,
                unread: 1,
            });
            console.log('Add message successful:', postResponse.data);
        } catch (error) {
            console.error('Error adding message:', error);
            alert('Error adding message');
        }
        setSelectedProjectId(projectId); // Set the selected project ID
        setRatingDialogOpen(true); // Open the rating dialog
    };

    const handleSeeMore = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    // submit ratting, change the project status to 5 (complete)
    const handleRatingSubmit = async (rating, comment) => {
        try {
            await axios.post('http://localhost:5050/projects/rate', {
                projectId: selectedProjectId,
                rating,
                comment,
                rated_by: userInfo._id, // the one who comments
                rated_for:
                    projects.find((p) => p._id === selectedProjectId)
                        ?.chosen_applicants || 'Unknown', // the one being commented
            });
            alert('Rating submitted');
            updateProjectStatus(selectedProjectId, 5);
            setRatingDialogOpen(false); // close the popup
        } catch (error) {
            alert('Error submitting rating');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{ backgroundColor: 'white' }}>
            <main>
                <div className="toolbar">
                    <button
                        className="post-new-project"
                        onClick={() => navigate('/project')}
                    >
                        Post New Project
                    </button>
                    <button
                        className="view-gantt-chart"
                        onClick={() => navigate('/gantt-chart')}
                    >
                        Gantt Chart
                    </button>
                </div>
                <div className="projects-grid">
                    <div className="project-section open">
                        <h2>Open</h2>
                        <div className="project-list">
                            {projects
                                .filter((project) => project.project_status === 1)
                                .map((project) => (
                                    <div className="project" key={project._id}>
                                        <h3>{project.project_name}</h3>
                                        <span className="applications-received">
                                            Applications received:{' '}
                                            {project.applicants ? project.applicants.length : 0}
                                        </span>
                                        <span className="close-at">
                                            Close at:{' '}
                                            {new Date(project.project_deadline).toLocaleDateString()}
                                        </span>
                                        <button
                                            className="see-more"
                                            onClick={() =>
                                                navigate(`/projectdetail/publisher/${project._id}`)
                                            }
                                        >
                                            See More
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => alert('Delete project')}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="project-section awaiting-acceptance">
                        <h2>Awaiting Acceptance</h2>
                        <div className="project-list">
                            {projects
                                .filter((project) => project.project_status === 2)
                                .map((project) => (
                                    <div className="project" key={project._id}>
                                        <h3>{project.project_name}</h3>
                                        <span className="developer">
                                            Developer: {project.chosen_applicants || 'Unknown'}
                                        </span>
                                        <span className="wait-until">
                                            Wait until:{' '}
                                            {new Date(project.project_deadline).toLocaleDateString()}
                                        </span>
                                        <button
                                            className="see-more"
                                            onClick={() =>
                                                navigate(`/projectdetail/developer/${project._id}`)
                                            }
                                        >
                                            See More
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="project-section in-progress">
                        <h2>In Progress</h2>
                        <div className="project-list">
                            {projects
                                .filter((project) => (project.project_status === 3 || project.project_status === 4))
                                .map((project) => (
                                    <div className="project" key={project._id}>
                                        <h3>{project.project_name}</h3>
                                        <span className="developer">
                                            Developer: {project.chosen_applicants || 'Unknown'}
                                        </span>
                                        <span className="complete-before">
                                            Complete before:{' '}
                                            {new Date(project.project_deadline).toLocaleDateString()}
                                        </span>
                                        <button
                                            className="see-more"
                                            onClick={() =>
                                                navigate(`/projectdetail/publisher/${project._id}`)
                                            }
                                        >
                                            See More
                                        </button>
                                        {/* only display the confirm buttom when the developer complete the project */}
                                        {project.project_status === 4 && (
                                            <button
                                                onClick={() => handleConfirm(project._id, project.project_publisher)}
                                            >
                                                Confirm
                                            </button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="project-section completed">
                        <h2>Completed</h2>
                        <div className="project-list">
                            {projects
                                .filter((project) => project.project_status === 5)
                                .map((project) => (
                                    <div className="project" key={project._id}>
                                        <h3>{project.project_name}</h3>
                                        <span className="developer">
                                            Developer: {project.chosen_applicants || 'Unknown'}
                                        </span>
                                        <span className="completed-at">
                                            Completed at:{' '}
                                            {new Date(project.project_deadline).toLocaleDateString()}
                                        </span>
                                        <button
                                            className="see-more"
                                            onClick={() =>
                                                navigate(`/projectdetail/publisher/${project._id}`)
                                            }
                                        >
                                            See More
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <RatingDialog
                    open={ratingDialogOpen}
                    onClose={() => setRatingDialogOpen(false)}
                    onSubmit={handleRatingSubmit}
                />
            </main>
        </div>
    );
};

export default CompanyProjectManagementPage;
