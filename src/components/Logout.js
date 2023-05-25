import { useNavigate } from "react-router-dom";

export default function Logout({ isLoggedIn }) {
  const navigate = useNavigate();
  const handlePageRefresh = () => {
    window.location.reload();
  };

  if (isLoggedIn) {
    localStorage.removeItem("jwtToken");
    navigate("/");
    handlePageRefresh();
  }

  return <p>Logged out successfully.</p>;
}
