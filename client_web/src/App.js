import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/private/Home";
import Course from "./pages/private/Course";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import PublicHome from "./pages/public/PublicHome";
import Login from "./pages/public/Login";
import { useAuth } from "./hooks/useAuth";
import { history } from "./hooks/useHistory";
import { auth } from "./hooks/useAuthConst";
import Footer from "./components/Footer";
import Register from "./pages/public/Register";

function App() {
    const location = useLocation();
    history.navigate = useNavigate();
    history.location = useLocation();
    const user = useAuth();
    auth.id = user?.id;
    auth.token = user?.token;

    const isAuth = () => {
        const url = location.pathname;
        return url !== "/login" && url !== "/register" && url !== "/";
    };

    return (
        <div className="d-flex flex-nowrap">
            {isAuth() && <Sidebar />}
            <main style={{ paddingLeft: isAuth() ? "280px" : "0px", flex: 1 }}>
                <Routes>
                    <Route path="/" element={<PublicHome />} />
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <Home />
                                <Footer />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/course/:id"
                        element={
                            <PrivateRoute>
                                <Course />
                                <Footer />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
