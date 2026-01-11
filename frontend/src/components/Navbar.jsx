import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    // ✅ Safe JSON parsing (prevents white screen crash)
    let user = null;
    const storedUser = localStorage.getItem("user");

    try {
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch {
        user = storedUser; // fallback if plain string (like "Archi")
    }

    // ✅ Logout handler
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold text-primary" to="/">
                    Eventopia
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-dark">
                                        👋 Hi,{" "}
                                        {typeof user === "string"
                                            ? user
                                            : user.name || "User"}
                                    </span>
                                </li>

                                {user.role === "admin" && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">
                                            Admin
                                        </Link>
                                    </li>
                                )}

                                <li className="nav-item">
                                    <button
                                        className="btn btn-sm btn-outline-danger ms-2"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
