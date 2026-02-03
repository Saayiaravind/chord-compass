import { getUserRole, getUserEmail } from "./utils/jwtUtils";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import StudentList from "./components/StudentList";
import CourseList from "./components/CourseList";
import EnrollmentList from "./components/EnrollmentList";
import Schedule from "./components/Schedule";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
    // Extract role and email from token
    const role = getUserRole(jwtToken);
    const email = getUserEmail(jwtToken);
    setUserRole(role);
    setUserEmail(email);
    console.log("User logged in:", { email, role });
  };

  const handleLogout = () => {
    setToken(null);
    setUserRole(null);
    setUserEmail(null);
  };

  // If not logged in, show login page
  if (!token) {
    return (
      <div className="App">
        <h1>Chord Compass</h1>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Role-based navigation visibility
  const isAdmin = userRole === "ADMIN";
  const isInstructor = userRole === "INSTRUCTOR";
  const isStudent = userRole === "STUDENT";
  // If logged in, show navigation and routes
  return (
    <Router>
      <div className="App">
        <header
          style={{
            backgroundColor: "#4CAF50",
            padding: "15px 20px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div>
              <h1 style={{ color: "white", margin: 0 }}>Chord Compass</h1>
              <p
                style={{
                  color: "white",
                  margin: "5px 0 0 0",
                  fontSize: "14px",
                }}
              >
                {userEmail} ({userRole})
              </p>
            </div>

            <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              {isAdmin && (
                <Link
                  to="/students"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Students
                </Link>
              )}
              <Link
                to="/courses"
                style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Courses
              </Link>

              {(isAdmin || isInstructor) && (
                <Link
                  to="/enrollments"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Enrollments
                </Link>
              )}

              <Link
                to="/schedule"
                style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Schedule
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                Logout
              </button>
            </nav>
          </div>
        </header>

        <main
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <Routes>
            {/* Default route based on role */}
            <Route
              path="/"
              element={
                <Navigate to={isAdmin ? "/students" : "/courses"} replace />
              }
            />

            {/* Admin-only route */}
            {isAdmin && (
              <Route path="/students" element={<StudentList token={token} />} />
            )}

            {/* All roles */}
            <Route path="/courses" element={<CourseList token={token} />} />

            {/* Admin and Instructor only */}
            {(isAdmin || isInstructor) && (
              <Route
                path="/enrollments"
                element={<EnrollmentList token={token} />}
              />
            )}

            {/* All roles */}
            <Route path="/schedule" element={<Schedule token={token} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
