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

// TODO: Replace with your actual LiveKit Cloud URL
const SERVER_URL = 'wss://your-project-id.livekit.cloud'; 

const InterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>('');
  const [url, setUrl] = useState<string>(SERVER_URL);
  const [inputToken, setInputToken] = useState<string>('');

  useEffect(() => {
    // Keep the fetch logic, but maybe don't auto-set if it fails
    const fetchToken = async () => {
      try {
        console.log('Fetching token... (Implement API call here)');
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);

  const handleDisconnect = () => {
    navigate('/review');
  };

  if (token === '') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Connect to Interview Room</h2>
        <p className="mb-8 text-slate-500">Enter your LiveKit Server URL and Token to start the session.</p>
        
        <div className="flex flex-col gap-4 w-full max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Server URL</label>
            <input 
              type="text" 
              placeholder="wss://..." 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Access Token</label>
            <input 
              type="text" 
              placeholder="ey..." 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
            />
          </div>

          <button 
            onClick={() => setToken(inputToken)}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors shadow-md"
          >
            Join Interview
          </button>
        </div>
        
        <p className="mt-8 text-sm text-slate-400">
          Need credentials? Visit <a href="https://cloud.livekit.io" target="_blank" className="underline hover:text-blue-600">LiveKit Dashboard</a>
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
      <LiveKitRoom
        video={false}
        audio={true}
        token={token}
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
