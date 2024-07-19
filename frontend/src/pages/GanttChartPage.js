import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../styles/GanttChartPage.css';

const convertToGermanDate = (dateString) => {
  const date = new Date(dateString);
  return new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
};

const GanttChartPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookie] = useCookies(['user']);
  const currentUser = cookie.user;
  const [userInfo, setUserInfo] = useState(null);

  // 获取用户信息
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
            userId: userInfo._id,
          },
        });
        const projects = res.data;
        const chartData = [
          [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Resource' },
            { type: 'date', label: 'Start Date' },
            { type: 'date', label: 'End Date' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
            { type: 'string', role: 'tooltip', p: { html: true } },
          ],
        ];

        projects.forEach((project) => {
          chartData.push([
            project._id.toString(),
            project.project_name,
            project.project_status === 1
              ? 'Open'
              : project.project_status === 2
                ? 'Awaiting Acceptance'
                : project.project_status === 3
                  ? 'In Progress'
                  : project.project_status === 5
                    ? 'Complete'
                    : '',
            convertToGermanDate(project.project_posttime),
            convertToGermanDate(project.project_deadline),
            null,
            0,
            null,
            `<div><img src="/profile-pic.png" alt="Profile" style="width:32px;height:32px;border-radius:50%;margin-right:8px;vertical-align:middle;"><span>${project.project_name}</span></div>`,
          ]);
        });

        setData(chartData);
        setLoading(false);
        console.log('Fetched projects for Gantt chart:', projects);
      } catch (err) {
        console.error('Error fetching projects for Gantt chart:', err);
        setError(err);
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchProjects();
    }
  }, [userInfo]);

  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
      labelStyle: {
        width: 300,
        fontSize: 0
      },
      palette: [
        { color: '#FF6347', dark: '#FF4500', light: '#FFA07A' }, // Open
        { color: '#FF8C00', dark: '#FF7F50', light: '#FFA07A' }, // Awaiting Acceptance
        { color: '#228B22', dark: '#006400', light: '#32CD32' }, // In Progress
        { color: '#4682B4', dark: '#4169E1', light: '#87CEFA' }, // Complete
      ],
    },
    tooltip: { isHtml: true },
    hAxis: {
      viewWindow: {
        min: new Date(), // Start date of the view window
        max: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // End date of the view window
      },
    },
  };

  const taskStates = [
    { label: 'Open', color: '#FF6347' },
    { label: 'Awaiting Acceptance', color: '#FF8C00' },
    { label: 'In Progress', color: '#228B22' },
    { label: 'Complete', color: '#4682B4' },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <main className="main-content">
        <div className="sidebar">
          <button className="post-new-project">Post New Project</button>
          {taskStates.map((state, index) => (
            <div key={index} className="task-state">
              <span
                className="task-state-color"
                style={{ backgroundColor: state.color }}
              ></span>
              {state.label}
            </div>
          ))}
        </div>
        <div className="chart-content">
          <button className="grid-view" onClick={() => window.history.back()}>
            Grid View
          </button>
          <div className="gantt-chart">
            <Chart
              chartType="Gantt"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GanttChartPage;
