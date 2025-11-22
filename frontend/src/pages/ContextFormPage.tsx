import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { useAuth } from '../hooks/useAuth';
import { analyzeCvAndJd } from '../../services/geminiService';
import type { UserInput } from '../types';

const ContextFormPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: UserInput) => {
    setIsSubmitting(true);
    try {
      const result = await analyzeCvAndJd(data.cv, data.jd);
      navigate('/review', { state: { analysis: result } });
    } catch (error) {
      console.error("Analysis failed:", error);
      // Ideally show an error toast here
      alert("Analysis failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <InputForm onSubmit={handleSubmit} isSubmitting={isSubmitting} onLogout={logout} />;
};

export default ContextFormPage;
