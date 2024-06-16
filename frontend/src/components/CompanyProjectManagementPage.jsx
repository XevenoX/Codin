import React from 'react';
import '../styles/CompanyProjectManagementPage.css';

const CompanyProjectManagementPage = () => {
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

    return (
        <div>
            <header>
                <div className="logo">Codin.</div>
                <nav>
                    <a href="#">Project Management</a>
                    <a href="#">Marketplace</a>
                </nav>
                <div className="profile">
                    <img src="profile-pic.png" alt="Profile Picture" />
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
                <div className="projects-grid">
                    <div className="project-section in-progress">
                        <h2>In Progress</h2>
                        <div className="project">
                            <h3>Website Compliance Specialist (Privacy Law)</h3>
                            <span className="company">Developer: Taylor Moreno</span>
                            <span className="complete-before">Complete before: 20.06.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Website Compliance Specialist (Privacy Law)')}>See More</button>
                            <button className="confirm" onClick={() => handleConfirm('Website Compliance Specialist (Privacy Law)')}>Confirm</button>
                        </div>
                    </div>
                    <div className="project-section applications-received">
                        <h2>Applications Received</h2>
                        <div className="project">
                            <h3>Framer Design Mobile Responsiveness Specialist</h3>
                            <span className="applications-received">Applications received: 4</span>
                            <span className="close-at">Close at: 17.05.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Framer Design Mobile Responsiveness Specialist')}>See More</button>
                        </div>
                        <div className="project">
                            <h3>Front-End WordPress Designer</h3>
                            <span className="applications-received">Applications received: 2</span>
                            <span className="close-at">Close at: 19.05.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Front-End WordPress Designer')}>See More</button>
                        </div>
                    </div>
                    <div className="project-section completed">
                        <h2>Completed</h2>
                        <div className="project">
                            <h3>Edit Existing Custom Kajabi Theme</h3>
                            <span className="developer">Developer: Jordan Sinclair</span>
                            <span className="completed-at">Completed at: 09.05.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Edit Existing Custom Kajabi Theme')}>See More</button>
                            <button className="delete" onClick={() => handleDelete('Edit Existing Custom Kajabi Theme')}>Delete</button>
                        </div>
                        <div className="project">
                            <h3>AstroJS Consultant</h3>
                            <span className="developer">Developer: Mia Thornton</span>
                            <span className="completed-at">Completed at: 17.04.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('AstroJS Consultant')}>See More</button>
                            <button className="delete" onClick={() => handleDelete('AstroJS Consultant')}>Delete</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CompanyProjectManagementPage;
