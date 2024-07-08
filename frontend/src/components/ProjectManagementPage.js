import React from 'react';
import '../styles/ProjectManagementPage.css';

const ProjectManagementPage = () => {
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
                        <div className="project-list">
                            <div className="project">
                                <h3>Website Compliance Specialist (Privacy Law)</h3>
                                <span className="company">Company: Globex Corporation</span>
                                <span className="complete-before">Complete before: 20.06.2024</span>
                                <button className="see-more">See More</button>
                                <button className="complete">Complete</button>
                            </div>
                            {/* Add more projects here */}
                        </div>
                    </div>
                    <div className="project-section applied">
                        <h2>Applied</h2>
                        <div className="project-list">
                            <div className="project">
                                <h3>Framer Design Mobile Responsiveness Specialist</h3>
                                <span className="company">Company: Globex Corporation</span>
                                <span className="complete-before">Complete before: 17.06.2024</span>
                                <button className="see-more">See More</button>
                                <button className="withdraw">Withdraw</button>
                            </div>
                            <div className="project">
                                <h3>Front-End WordPress Designer</h3>
                                <span className="company">Company: Globex Corporation</span>
                                <span className="complete-before">Complete before: 17.06.2024</span>
                                <button className="see-more">See More</button>
                                <button className="withdraw">Withdraw</button>
                            </div>
                            {/* Add more projects here */}
                        </div>
                    </div>
                    <div className="project-section awaiting-acceptance">
                        <h2>Offers Received</h2>
                        <div className="project-list">
                            <div className="project">
                                <h3>Part-time Website Product Assistant (PM Assistant)</h3>
                                <span className="company">Company: Globex Corporation</span>
                                <span className="response-before">Response before: 20.05.2024</span>
                                <button className="accept">Accept</button>
                                <button className="reject">Reject</button>
                            </div>
                            {/* Add more projects here */}
                        </div>
                    </div>
                    <div className="project-section completed">
                        <h2>Complete</h2>
                        <div className="project-list">
                            <div className="project">
                                <h3>Edit Existing Custom Kajabi Theme</h3>
                                <span className="company">Company: Globex Corporation</span>
                                <span className="completed-at">Completed at: 17.05.2024</span>
                                <button className="see-more">See More</button>
                            </div>
                            {/* Add more projects here */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProjectManagementPage;
