import { useEffect, useRef } from 'react';

// Frequencies for notes
const NOTE_FREQS: Record<string, number> = {
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23,
  'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46,
  'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
};

// Cute 8-bit sweet happy birthday melody
const HBD_MELODY = [
  { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.15 }, { note: 'D4', dur: 0.45 }, { note: 'C4', dur: 0.45 }, { note: 'F4', dur: 0.45 }, { note: 'E4', dur: 0.9 },
  { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.15 }, { note: 'D4', dur: 0.45 }, { note: 'C4', dur: 0.45 }, { note: 'G4', dur: 0.45 }, { note: 'F4', dur: 0.9 },
  { note: 'C4', dur: 0.3 }, { note: 'C4', dur: 0.15 }, { note: 'C5', dur: 0.45 }, { note: 'A4', dur: 0.45 }, { note: 'F4', dur: 0.45 }, { note: 'E4', dur: 0.45 }, { note: 'D4', dur: 0.9 },
  { note: 'A#4', dur: 0.3 }, { note: 'A#4', dur: 0.15 }, { note: 'A4', dur: 0.45 }, { note: 'F4', dur: 0.45 }, { note: 'G4', dur: 0.45 }, { note: 'F4', dur: 0.9 },
];

// Romantic sweet melody (Canon in D inspired lofi feel)
const ROMANCE_MELODY = [
  { note: 'F4', dur: 0.6 }, { note: 'C4', dur: 0.6 }, { note: 'D4', dur: 0.6 }, { note: 'A4', dur: 0.6 },
  { note: 'A#4', dur: 0.6 }, { note: 'F4', dur: 0.6 }, { note: 'A#4', dur: 0.6 }, { note: 'C5', dur: 0.6 },
  { note: 'A4', dur: 0.6 }, { note: 'E4', dur: 0.6 }, { note: 'F4', dur: 0.6 }, { note: 'C4', dur: 0.6 },
  { note: 'D4', dur: 0.6 }, { note: 'A4', dur: 0.6 }, { note: 'A#4', dur: 0.6 }, { note: 'F5', dur: 0.6 },
];

export function useAudioSynthesizer() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscillatorsRef = useRef<any[]>([]);
  const isPlayingRef = useRef<boolean>(false);
  const currentMelodyIndexRef = useRef<number>(0);
  const timeoutIdRef = useRef<any>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playNote = (freq: number, duration: number, onsetTime: number) => {
    if (!audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    
    // Create oscillator and gain node for sweet chiptune sound
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Triangle wave gives a soft, warm, woodwind-like romantic retro feel
    osc.type = 'triangle';
    osc.frequency.value = freq;

    // Volume envelope to prevent popping and feel gentle
    gainNode.gain.setValueAtTime(0, onsetTime);
    gainNode.gain.linearRampToValueAtTime(0.12, onsetTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, onsetTime + duration - 0.02);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(onsetTime);
    osc.stop(onsetTime + duration);

    activeOscillatorsRef.current.push({ osc, gainNode });
  };

  const stopAllNotes = () => {
    clearTimeout(timeoutIdRef.current);
    activeOscillatorsRef.current.forEach((item) => {
      try {
        item.osc.stop();
      } catch (e) {}
    });
    activeOscillatorsRef.current = [];
    isPlayingRef.current = false;
  };

  const playMelodyLoop = (melody: { note: string; dur: number }[]) => {
    if (!audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    let accumulatedTime = 0.05;

    // Schedule 1 loop cycle
    melody.forEach((noteObj) => {
      const freq = NOTE_FREQS[noteObj.note] || 440;
      const duration = noteObj.dur * 1.5; // slow down slightly for romantic aesthetic
      playNote(freq, duration, now + accumulatedTime);
      accumulatedTime += duration;
    });

    // Schedule next loop
    timeoutIdRef.current = setTimeout(() => {
      if (isPlayingRef.current) {
        playMelodyLoop(melody);
      }
    }, accumulatedTime * 1000);
  };

  const startMusic = (type: 'hbd' | 'romance' | 'calm') => {
    stopAllNotes();
    initAudio();
    isPlayingRef.current = true;
    
    const melody = type === 'hbd' ? HBD_MELODY : ROMANCE_MELODY;
    playMelodyLoop(melody);
  };

  useEffect(() => {
    return () => {
      stopAllNotes();
    };
  }, []);

  return {
    startMusic,
    stopMusic: stopAllNotes,
    initAudio,
  };
}
