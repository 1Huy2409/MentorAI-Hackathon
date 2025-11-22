import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  BarVisualizer,
  useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

// TODO: Replace with your actual LiveKit Cloud URL
const SERVER_URL = import.meta.env.VITE_LIVEKIT_URL || 'wss://your-project-id.livekit.cloud';

const InterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { token: authToken } = useAuth();
  const [livekitToken, setLivekitToken] = useState<string>('');
  const [url] = useState<string>(SERVER_URL);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchToken = async () => {
      if (!authToken) {
        setError('You must be logged in to join the interview.');
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.post(
          'http://localhost:3000/getToken',
          {
            roomName: 'interview-room',
            participantName: 'user-1',
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setLivekitToken(response.data.token);
        setError('');
      } catch (error: any) {
        console.error('Error fetching token:', error);
        if (error.response?.status === 401) {
          setError('Authentication failed. Please log in again.');
          navigate('/login');
        } else {
          setError('Failed to fetch LiveKit token. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
  }, [authToken, navigate]);

  const handleDisconnect = () => {
    navigate('/review');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Connecting to Interview Room</h2>
        <p className="mb-8 text-slate-500">Please wait while we set up your session...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Connection Error</h2>
        <p className="mb-8 text-slate-500">{error}</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors shadow-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (livekitToken === '') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Preparing Interview Room</h2>
        <p className="mb-8 text-slate-500">Setting up your session...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
      <LiveKitRoom
        video={false}
        audio={true}
        token={livekitToken}
        serverUrl={url}
        data-lk-theme="default"
        style={{ height: '100%' }}
        connect={true}
        onDisconnected={handleDisconnect}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex-1 flex items-center justify-center w-full">
            <AudioVisualizer />
          </div>
          <div className="pb-8">
            <ControlBar />
          </div>
        </div>
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
};

function AudioVisualizer() {
  const tracks = useTracks([Track.Source.Microphone, Track.Source.Unknown]);
  const trackRef = tracks.find(t => t.publication.kind === Track.Kind.Audio);

  if (!trackRef) {
    return (
      <div className="flex flex-col items-center text-slate-400 animate-pulse">
        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-slate-700"></div>
        </div>
        <p>Waiting for audio...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg h-64 flex items-center justify-center px-8">
      <BarVisualizer
        barCount={20}
        trackRef={trackRef}
        options={{ minHeight: 40 }}
        className="h-full w-full"
      />
    </div>
  );
}

export default InterviewPage;
