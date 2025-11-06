// src/components/AdminDashboard.jsx
import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(stored);
  }, []);

  const saveProjects = (updatedProjects) => {
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleAssign = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      title,
      desc,
      deadline,
      submissions: [],
    };
    const updated = [...projects, newProject];
    saveProjects(updated);
    setTitle("");
    setDesc("");
    setDeadline("");
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const updated = projects.filter((p) => p.id !== id);
    saveProjects(updated);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentStudentEmail");
      navigate("/");
    }
  };

  return (
    <>
      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #ffffff;
          border-bottom: 2px solid #ccc;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .dashboard-title {
          font-size: 1.5rem;
          color: #222;
          font-weight: 600;
        }

        .logout-box {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid red;
          background-color: #3692b4ff;
          border-radius: 8px;
          padding: 6px 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-box:hover {
          background-color:#cf4242ff;
          transform: scale(1.05);
        }

        .btn-logout {
          background: none;
          border: none;
          color: red;
          font-weight: bold;
          font-size: 1rem;
          letter-spacing: 0.5px;
          cursor: pointer;
        }

        .container {
          padding: 2rem;
        }

        .section-title {
          margin-bottom: 1rem;
          color: #444444ff;
        }

        .form-inline {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .form-inline input {
          padding: 0.5rem;
          border: 1px solid #ccccccff;
          border-radius: 4px;
          flex: 1;
          min-width: 180px;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .btn-primary:hover {
          background-color: #0056b3;
          transform: scale(1.05);
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
      `}</style>

      <header className="navbar">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="logout-box" onClick={handleLogout}>
          <button className="btn-logout">LOGOUT</button>
        </div>
      </header>

      <main className="container">
        <section>
          <h2 className="section-title">Assign a Project</h2>
          <form className="form-inline" onSubmit={handleAssign}>
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Project Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">
              Assign
            </button>
          </form>
        </section>

        <section>
          <h2 className="section-title">Project Submissions</h2>
          <div className="grid-container">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                isAdmin={true}
                onDelete={() => handleDelete(p.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
