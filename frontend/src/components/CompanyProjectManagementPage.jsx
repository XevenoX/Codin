import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CompanyProjectManagementPage.css';

const CompanyProjectManagementPage = () => {
    const navigate = useNavigate();

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
                    <button className="post-new-project" onClick={handlePostNewProject}>Post New Project</button>
                    <button className="view-gantt-chart" onClick={handleViewGanttChart}>Gantt Chart</button>
                </div>
                <div className="projects-grid">
                    <div className="project-section in-progress">
                        <h2>In Progress</h2>
                        <div className="project">
                            <h3>Website Compliance Specialist (Privacy Law)</h3>
                            <span className="developer">Developer: Taylor Moreno</span>
                            <span className="complete-before">Complete before: 17.06.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Website Compliance Specialist (Privacy Law)')}>See More</button>
                            <button className="confirm" onClick={() => handleConfirm('Website Compliance Specialist (Privacy Law)')}>Confirm</button>
                        </div>
                        <div className="project">
                            <h3>Website Compliance Specialist (Cookie)</h3>
                            <span className="developer">Developer: Taylor Moreno</span>
                            <span className="complete-before">Complete before: 17.06.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Website Compliance Specialist (Cookie)')}>See More</button>
                            <button className="confirm" onClick={() => handleConfirm('Website Compliance Specialist (Cookie)')}>Confirm</button>
                        </div>
                    </div>
                    <div className="project-section open">
                        <h2>Open</h2>
                        <div className="project">
                            <h3>Framer Design Mobile Responsiveness Specialist</h3>
                            <span className="applications-received">Applications received: 4</span>
                            <span className="close-at">Close at: 17.05.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Framer Design Mobile Responsiveness Specialist')}>See More</button>
                            <button className="delete" onClick={() => handleDelete('Framer Design Mobile Responsiveness Specialist')}>Delete</button>
                        </div>
                        <div className="project">
                            <h3>Front-End WordPress Designer</h3>
                            <span className="applications-received">Applications received: 2</span>
                            <span className="close-at">Close at: 19.05.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Front-End WordPress Designer')}>See More</button>
                            <button className="delete" onClick={() => handleDelete('Front-End WordPress Designer')}>Delete</button>
                        </div>
                    </div>
                    <div className="project-section awaiting-acceptance">
                        <h2>Awaiting Acceptance</h2>
                        <div className="project">
                            <h3>Part-time Website Product Assistant (PM Assistant)</h3>
                            <span className="developer">Developer: Jamie Park</span>
                            <span className="wait-until">Wait until: 20.05.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Part-time Website Product Assistant (PM Assistant)')}>See More</button>
                        </div>
                        <div className="project">
                            <h3>Redesign Frontend UI for Website</h3>
                            <span className="developer">Developer: Riley Bennett</span>
                            <span className="wait-until">Wait until: 21.05.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Redesign Frontend UI for Website')}>See More</button>
                        </div>
                    </div>
                    <div className="project-section completed">
                        <h2>Completed</h2>
                        <div className="project">
                            <h3>Edit Existing Custom Kajabi Theme</h3>
                            <span className="developer">Developer: Jordan Sinclair</span>
                            <span className="completed-at">Completed at: 09.05.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Edit Existing Custom Kajabi Theme')}>See More</button>
                        </div>
                        <div className="project">
                            <h3>AstroJS Consultant</h3>
                            <span className="developer">Developer: Mia Thornton</span>
                            <span className="completed-at">Completed at: 17.04.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('AstroJS Consultant')}>See More</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CompanyProjectManagementPage;
