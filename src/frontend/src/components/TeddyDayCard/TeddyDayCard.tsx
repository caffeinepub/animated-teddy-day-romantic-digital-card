import { RotateCcw } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useCardAnimationSequence } from './useCardAnimationSequence';
import { useBackgroundAudio } from './useBackgroundAudio';
import AudioControls from './AudioControls';
import LoveLetterMessage from './LoveLetterMessage';
import './teddyDayCard.css';
import './controls.css';

export default function TeddyDayCard() {
  const reducedMotion = usePrefersReducedMotion();
  const { phase, replay } = useCardAnimationSequence(reducedMotion);
  const { isMuted, volume, toggleMute, setVolume } = useBackgroundAudio(
    '/assets/audio/teddy-day-bg-music.mp3'
  );

  const isLetterOpen = phase === 'open-letter' || phase === 'complete';

  return (
    <div className="teddy-card-container">
      {/* Background layer */}
      <div className="background-layer">
        <img
          src="/assets/generated/pastel-bokeh-bg.dim_1920x1080.png"
          alt=""
          className="bokeh-bg"
        />
      </div>

      {/* Floating hearts layer */}
      <div className={`floating-hearts-layer ${reducedMotion ? 'reduced-motion' : ''}`}>
        <img
          src="/assets/generated/floating-hearts-set.dim_512x512.png"
          alt=""
          className="floating-hearts floating-hearts-1"
        />
        <img
          src="/assets/generated/floating-hearts-set.dim_512x512.png"
          alt=""
          className="floating-hearts floating-hearts-2"
        />
        <img
          src="/assets/generated/floating-hearts-set.dim_512x512.png"
          alt=""
          className="floating-hearts floating-hearts-3"
        />
      </div>

      {/* Sparkles layer */}
      <div className={`sparkles-layer ${reducedMotion ? 'reduced-motion' : ''}`}>
        <img
          src="/assets/generated/sparkles-overlay.dim_1024x1024.png"
          alt=""
          className="sparkles sparkles-1"
        />
        <img
          src="/assets/generated/sparkles-overlay.dim_1024x1024.png"
          alt=""
          className="sparkles sparkles-2"
        />
      </div>

      {/* Main scene */}
      <div className="scene-container">
        {/* Glowing heart */}
        <div
          className={`heart-container ${phase === 'hug' || phase === 'open-letter' || phase === 'complete' ? 'hugged' : ''} ${reducedMotion ? 'reduced-motion' : ''}`}
        >
          <img
            src="/assets/generated/glowing-heart.dim_512x512.png"
            alt="Glowing heart"
            className="glowing-heart"
          />
        </div>

        {/* Teddy bear */}
        <div
          className={`teddy-container phase-${phase} ${reducedMotion ? 'reduced-motion' : ''}`}
        >
          <img
            src="/assets/generated/teddy.dim_1024x1024.png"
            alt="Cute teddy bear"
            className="teddy-bear"
          />
        </div>

        {/* Love letter */}
        <div
          className={`letter-container ${isLetterOpen ? 'open' : ''} ${reducedMotion ? 'reduced-motion' : ''}`}
        >
          <img
            src="/assets/generated/love-letter.dim_768x512.png"
            alt="Love letter"
            className="love-letter"
          />
          <LoveLetterMessage visible={isLetterOpen} />
        </div>
      </div>

      {/* Controls */}
      <div className="controls-container">
        <button
          onClick={replay}
          className="replay-button"
          aria-label="Replay animation"
          type="button"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Replay</span>
        </button>

        <AudioControls
          isMuted={isMuted}
          volume={volume}
          onToggleMute={toggleMute}
          onVolumeChange={setVolume}
        />
      </div>

      {/* Footer */}
      <footer className="card-footer">
        <p>
          Built with <span className="love-icon">♥</span> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            caffeine.ai
          </a>
        </p>
        <p className="footer-year">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
