import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MainMenu from '../components/MainMenu';

const MainMenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSelectMatching = () => {
    navigate('/context');
  };

  const handleSelectQuickInterview = () => {
    navigate('/quick-interview-setup');
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MainMenu
      onSelectMatching={handleSelectMatching}
      onSelectQuickInterview={handleSelectQuickInterview}
      onViewHistory={handleViewHistory}
      onLogout={handleLogout}
    />
  );
};

export default MainMenuPage;
