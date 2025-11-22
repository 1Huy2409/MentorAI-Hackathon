import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';

const LandingPage = () => {
  const navigate = useNavigate();
  return <Hero onStart={() => navigate('/login')} />;
};

export default LandingPage;
