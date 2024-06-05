import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectManagementPage.css';

const ProjectManagementPage = () => {
    const navigate = useNavigate();

    const handleSeeMore = (projectName) => {
        console.log(`See more details for project: ${projectName}`);
        // 导航到项目详情页
        navigate(`/project/${projectName}`);
    };

    const handleComplete = (projectName) => {
        console.log(`Complete project: ${projectName}`);
        // 这里可以添加完成项目的逻辑，例如显示模态对话框
    };

    const handleWithdraw = (projectName) => {
        console.log(`Withdraw application for project: ${projectName}`);
        // 这里可以添加撤回申请的逻辑
    };

    const handleAccept = (projectName) => {
        console.log(`Accept offer for project: ${projectName}`);
        // 这里可以添加接受项目的逻辑
    };

    const handleReject = (projectName) => {
        console.log(`Reject offer for project: ${projectName}`);
        // 这里可以添加拒绝项目的逻辑
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
                <div className="projects">
                    <div className="project-section in-progress">
                        <h2>In Progress</h2>
                        <div className="project">
                            <h3>Website Compliance Specialist (Privacy Law)</h3>
                            <span className="company">Company: Globex Corporation</span>
                            <span className="complete-before">Complete before: 20.06.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Website Compliance Specialist (Privacy Law)')}>See More</button>
                            <button className="complete" onClick={() => handleComplete('Website Compliance Specialist (Privacy Law)')}>Complete</button>
                        </div>
                    </div>
                    <div className="project-section applied">
                        <h2>Applied</h2>
                        <div className="project">
                            <h3>Framer Design Mobile Responsiveness Specialist</h3>
                            <span className="company">Company: Globex Corporation</span>
                            <span className="complete-before">Complete before: 17.06.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Framer Design Mobile Responsiveness Specialist')}>See More</button>
                            <button className="withdraw" onClick={() => handleWithdraw('Framer Design Mobile Responsiveness Specialist')}>Withdraw</button>
                        </div>
                        <div className="project">
                            <h3>Front-End WordPress Designer</h3>
                            <span className="company">Company: Globex Corporation</span>
                            <span className="complete-before">Complete before: 17.06.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Front-End WordPress Designer')}>See More</button>
                            <button className="withdraw" onClick={() => handleWithdraw('Front-End WordPress Designer')}>Withdraw</button>
                        </div>
                    </div>
                    <div className="project-section awaiting-acceptance">
                        <h2>Offers Received</h2>
                        <div className="project">
                            <h3>Part-time Website Product Assistant (PM Assistant)</h3>
                            <span className="company">Company: Globex Corporation</span>
                            <span className="response-before">Response before: 20.05.2024</span>
                            <button className="accept" onClick={() => handleAccept('Part-time Website Product Assistant (PM Assistant)')}>Accept</button>
                            <button className="reject" onClick={() => handleReject('Part-time Website Product Assistant (PM Assistant)')}>Reject</button>
                        </div>
                    </div>
                    <div className="project-section completed">
                        <h2>Complete</h2>
                        <div className="project">
                            <h3>Edit Existing Custom Kajabi Theme</h3>
                            <span className="company">Company: Globex Corporation</span>
                            <span className="completed-at">Completed at: 17.05.2024</span>
                            <button className="see-more" onClick={() => handleSeeMore('Edit Existing Custom Kajabi Theme')}>See More</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProjectManagementPage;
