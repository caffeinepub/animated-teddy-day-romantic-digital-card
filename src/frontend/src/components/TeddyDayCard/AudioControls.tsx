import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlsProps {
  isMuted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

export default function AudioControls({
  isMuted,
  volume,
  onToggleMute,
  onVolumeChange,
}: AudioControlsProps) {
  return (
    <div className="audio-controls">
      <button
        onClick={onToggleMute}
        className="audio-button"
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        type="button"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="volume-slider"
        aria-label="Volume control"
        disabled={isMuted}
      />
    </div>
  );
}
