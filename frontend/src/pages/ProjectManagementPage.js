import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Chart } from 'react-google-charts';
import '../styles/ProjectManagementPage.css';
import RatingDialog from '../components/RatingDialog';

const ProjectManagementPage = () => {
  const navigate = useNavigate();
  const [cookie] = useCookies(['user']);
  const currentUser = cookie.user;
  const [userInfo, setUserInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!currentUser) {
        console.log('No token or user_id found in cookies');
        setLoading(false);
        return;
      }
      try {
        console.log('Fetching user info with ID:', currentUser.id);
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

    fetchUserInfo();
  }, [currentUser]);

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

  const handleAccept = async (projectId, project_publisher) => {
    //accept the project
    try {
      const response = await axios.patch(
        `http://localhost:5050/projects/${projectId}`,
        {
          project_status: 3,
          userId: userInfo._id,
        }
      );
      console.log(`Project ${projectId} accepted:`, response.data);
      alert(`Project ${projectId} accepted`);
      setProjects(
        projects.map((project) =>
          project._id === projectId
            ? { ...project, project_status: 3 }
            : project
        )
      );
    } catch (error) {
      console.error('Error accepting project:', error);
      alert('Error accepting project');
    }
    // add message
    try {
      const postResponse = await axios.post('/message/addNewMessage', {
        project_id: projectId,
        message_to: project_publisher,
        message_type: 3,
        unread: 1,
      });
      console.log('Add message successful:', postResponse.data);
    } catch (error) {
      console.error('Error adding message:', error);
      alert('Error adding message');
    }
  };

  const handleReject = async (projectId, project_publisher) => {
    //reject the project
    try {
      const response = await axios.patch(
        `http://localhost:5050/projects/${projectId}`,
        {
          project_status: 1,
          userId: userInfo._id,
        }
      );
      console.log(`Project ${projectId} rejected:`, response.data);
      alert(`Project ${projectId} rejected`);
      setProjects(
        projects.map((project) =>
          project._id === projectId
            ? { ...project, project_status: 1 }
            : project
        )
      );
    } catch (error) {
      console.error('Error rejecting project:', error);
      alert('Error rejecting project');
    }
    // add message
    try {
      const postResponse = await axios.post('/message/addNewMessage', {
        project_id: projectId,
        message_to: project_publisher,
        message_type: 2,
        unread: 1,
      });
      console.log('Add message successful:', postResponse.data);
    } catch (error) {
      console.error('Error adding message:', error);
      alert('Error adding message');
    }
  };

  const handleWithdraw = async (projectId) => {
    try {
      const response = await axios.patch(`/projects/withdraw/${projectId}`, {
        applicantId: currentUser.id,
      });
      alert('Withdraw successfully');
      console.log('Updated Project:', response.data);
    } catch (error) {
      console.error('Error withdrawing applicant:', error);
      alert('Failed to withdraw applicant');
    }
  };

  const handleComplete = async (projectId, project_publisher) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/projects/${projectId}`,
        {
          project_status: 5,
          userId: userInfo._id,
        }
      );
      console.log(`Project ${projectId} completed:`, response.data);
      alert(`Project ${projectId} completed`);
      setProjects(
        projects.map((project) =>
          project._id === projectId
            ? { ...project, project_status: 5 }
            : project
        )
      );
      setSelectedProjectId(projectId); // Set the selected project ID
      setRatingDialogOpen(true); // Open the rating dialog
    } catch (error) {
      console.error('Error completing project:', error);
      alert('Error completing project');
    }

    // add message
    try {
      const postResponse = await axios.post('/message/addNewMessage', {
        project_id: projectId,
        message_to: project_publisher,
        message_type: 4,
        unread: 1,
      });
      console.log('Add message successful:', postResponse.data);
    } catch (error) {
      console.error('Error adding message:', error);
      alert('Error adding message');
    }
  };

  const handleSeeMore = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleRatingSubmit = async (rating, comment) => {
    try {
      await axios.post('http://localhost:5050/projects/rate', {
        projectId: selectedProjectId,
        rating,
        comment,
        rated_by: userInfo._id, // the one who comments
        // rated_for:
        //   projects.find((p) => p._id === selectedProjectId)
        //     ?.chosen_applicants || 'Unknown', // the one being commented
      });
      alert('Rating submitted');
      setProjects(
        projects.map((project) =>
          project._id === selectedProjectId
            ? { ...project, project_status: 5 }
            : project
        )
      );
      setRatingDialogOpen(false); // close the pop up
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

  const totalIncome = projects.reduce((sum, project) => {
    const income = parseFloat(project.project_budget);
    return sum + (isNaN(income) ? 0 : income);
  }, 0);
  const amountAchieved = projects
    .filter((project) => project.project_status === 5)
    .reduce((sum, project) => sum + parseFloat(project.project_budget), 0);

  const moneyOnTheWay = projects
    .filter((project) => project.project_status === 3)
    .reduce((sum, project) => sum + parseFloat(project.project_budget), 0);
  const chartData = [
    ['Date', 'Income'],
    ...projects.map((project) => [
      new Date(project.project_posttime),
      parseFloat(project.project_budget),
    ]),
  ];

  console.log('Chart data:', chartData);

  const chartOptions = {
    title: '',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { title: 'Date', format: 'MMM yyyy' },
    vAxis: { title: 'Income', minValue: 0 },
  };

  return (
    <div>
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
              <span className="amount">${amountAchieved.toLocaleString()}</span>
            </div>
            <div className="stat on-the-way">
              <span className="label">Money on the way</span>
              <span className="amount">
                ${(totalIncome - amountAchieved).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="projects-grid">
          <div className="project-section in-progress">
            <h2>In Progress</h2>
            <div className="project-list">
              {projects
                .filter((project) => project.project_status === 3)
                .map((project) => (
                  <div className="project" key={project._id}>
                    <h3>{project.project_name}</h3>
                    <span className="company">
                      Company: {project.project_publisher || 'Unknown'}
                    </span>
                    <span className="complete-before">
                      Complete before:{' '}
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
                    <button
                      className="complete"
                      onClick={() =>
                        handleComplete(project._id, project.project_publisher)
                      }
                    >
                      Complete
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="project-section offers-received">
            <h2>Offers Received</h2>
            <div className="project-list">
              {projects
                .filter((project) => project.project_status === 2)
                .map((project) => (
                  <div className="project" key={project._id}>
                    <h3>{project.project_name}</h3>
                    <span className="company">
                      Company: {project.project_publisher || 'Unknown'}
                    </span>
                    <span className="response-before">
                      Response before:{' '}
                      {new Date(project.project_deadline).toLocaleDateString()}
                    </span>
                    <button
                      className="accept"
                      onClick={() =>
                        handleAccept(project._id, project.project_publisher)
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="reject"
                      onClick={() =>
                        handleReject(project._id, project.project_publisher)
                      }
                    >
                      Reject
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="project-section applied">
            <h2>Applied</h2>
            <div className="project-list">
              {projects
                .filter((project) => project.project_status === 1)
                .map((project) => (
                  <div className="project" key={project._id}>
                    <h3>{project.project_name}</h3>
                    <span className="company">
                      Company: {project.project_publisher || 'Unknown'}
                    </span>
                    <span className="complete-before">
                      Complete before:{' '}
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
                    <button
                      className="withdraw"
                      onClick={() => handleWithdraw(project._id)}
                    >
                      Withdraw
                    </button>
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
                    <span className="company">
                      Company: {project.project_publisher || 'Unknown'}
                    </span>
                    <span className="completed-at">
                      Completed at:{' '}
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

export default ProjectManagementPage;
