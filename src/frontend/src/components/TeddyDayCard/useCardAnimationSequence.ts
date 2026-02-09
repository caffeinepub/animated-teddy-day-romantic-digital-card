import { useEffect, useState, useCallback } from 'react';

export type AnimationPhase = 'idle' | 'walk-in' | 'hug' | 'open-letter' | 'complete';

interface UseCardAnimationSequenceReturn {
  phase: AnimationPhase;
  replay: () => void;
  progress: number;
}

export function useCardAnimationSequence(reducedMotion: boolean): UseCardAnimationSequenceReturn {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [progress, setProgress] = useState(0);

  const replay = useCallback(() => {
    setPhase('idle');
    setProgress(0);
    setTimeout(() => setPhase('walk-in'), 100);
  }, []);

  useEffect(() => {
    if (phase === 'idle') {
      const timer = setTimeout(() => setPhase('walk-in'), 500);
      return () => clearTimeout(timer);
    }

    const durations = reducedMotion
      ? { 'walk-in': 800, 'hug': 800, 'open-letter': 800 }
      : { 'walk-in': 2000, 'hug': 2500, 'open-letter': 2000 };

    if (phase === 'walk-in') {
      const timer = setTimeout(() => {
        setPhase('hug');
        setProgress(33);
      }, durations['walk-in']);
      return () => clearTimeout(timer);
    }

    if (phase === 'hug') {
      const timer = setTimeout(() => {
        setPhase('open-letter');
        setProgress(66);
      }, durations['hug']);
      return () => clearTimeout(timer);
    }

    if (phase === 'open-letter') {
      const timer = setTimeout(() => {
        setPhase('complete');
        setProgress(100);
      }, durations['open-letter']);
      return () => clearTimeout(timer);
    }
  }, [phase, reducedMotion]);

  return { phase, replay, progress };
}
