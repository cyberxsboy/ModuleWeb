/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AudioEngineClass {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: any = null;
  private currentTheme: string = 'silent';

  // Chords & Melodies
  private birthdayNotes = [
    { note: 261.63, duration: 0.3, delay: 0 },   // C4
    { note: 261.63, duration: 0.15, delay: 0.3 }, // C4
    { note: 293.66, duration: 0.4, delay: 0.45 }, // D4
    { note: 261.63, duration: 0.4, delay: 0.9 },  // C4
    { note: 349.23, duration: 0.4, delay: 1.35 }, // F4
    { note: 329.63, duration: 0.8, delay: 1.8 },  // E4
    
    { note: 261.63, duration: 0.3, delay: 2.7 },   // C4
    { note: 261.63, duration: 0.15, delay: 3.0 }, // C4
    { note: 293.66, duration: 0.4, delay: 3.15 }, // D4
    { note: 261.63, duration: 0.4, delay: 3.6 },  // C4
    { note: 392.00, duration: 0.4, delay: 4.05 }, // G4
    { note: 349.23, duration: 0.8, delay: 4.5 }   // F4
  ];

  private christmasNotes = [
    { note: 329.63, duration: 0.3, delay: 0 },   // E4
    { note: 329.63, duration: 0.3, delay: 0.45 }, // E4
    { note: 329.63, duration: 0.6, delay: 0.9 },  // E4 (Longer)
    
    { note: 329.63, duration: 0.3, delay: 1.6 },   // E4
    { note: 329.63, duration: 0.3, delay: 2.05 }, // E4
    { note: 329.63, duration: 0.6, delay: 2.5 },  // E4
    
    { note: 329.63, duration: 0.3, delay: 3.2 },   // E4
    { note: 392.00, duration: 0.3, delay: 3.65 }, // G4
    { note: 261.63, duration: 0.4, delay: 4.1 },  // C4
    { note: 293.66, duration: 0.4, delay: 4.55 }, // D4
    { note: 329.63, duration: 0.8, delay: 5.0 }   // E4
  ];

  private romanticChords = [
    { note: 261.63, duration: 1.2, delay: 0 },   // C4
    { note: 329.63, duration: 1.2, delay: 0.2 }, // E4
    { note: 392.00, duration: 1.2, delay: 0.4 }, // G4
    { note: 493.88, duration: 1.2, delay: 0.6 }, // B4
    
    { note: 349.23, duration: 1.2, delay: 1.4 }, // F4
    { note: 440.00, duration: 1.2, delay: 1.6 }, // A4
    { note: 523.25, duration: 1.2, delay: 1.8 }, // C5
    { note: 587.33, duration: 1.2, delay: 2.0 }  // D5
  ];

  private ambientWaves = [
    { note: 196.00, duration: 2.0, delay: 0 },   // G3
    { note: 293.66, duration: 2.0, delay: 0.5 }, // D4
    { note: 392.00, duration: 2.0, delay: 1.0 }, // G4
    { note: 440.00, duration: 2.0, delay: 1.5 }  // A4
  ];

  public start(theme: string) {
    this.stop();
    this.currentTheme = theme;
    if (theme === 'silent') return;

    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('AudioContext not supported in this environment.');
      return;
    }

    this.isPlaying = true;
    
    // Play immediately, and loop using setInterval
    this.playThemeLoop();
    
    const loopDuration = theme === 'birthday' ? 6000 : theme === 'christmas' ? 6500 : theme === 'romantic' ? 4000 : 3500;
    
    this.intervalId = setInterval(() => {
      this.playThemeLoop();
    }, loopDuration);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  private playThemeLoop() {
    if (!this.isPlaying || !this.ctx) return;
    
    // Handle state issues
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    let notesArr: typeof this.birthdayNotes = [];
    let isChime = true;

    switch (this.currentTheme) {
      case 'birthday':
        notesArr = this.birthdayNotes;
        break;
      case 'christmas':
        notesArr = this.christmasNotes;
        break;
      case 'romantic':
        notesArr = this.romanticChords;
        isChime = false; // softer harp
        break;
      case 'ambient':
        notesArr = this.ambientWaves;
        isChime = false;
        break;
      default:
        return;
    }

    const now = this.ctx.currentTime;

    notesArr.forEach(noteItem => {
      this.triggerSynthBell(
        noteItem.note, 
        now + noteItem.delay, 
        noteItem.duration,
        isChime
      );
    });
  }

  private triggerSynthBell(freq: number, startTime: number, duration: number, isChime: boolean) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    // Instrument voicing
    if (isChime) {
      // Crystal chime sound box (Jingle / Christmas / Birth chimes)
      osc.type = 'triangle';
      
      // Dual-frequency sparkling high harmonic for crystal clarity
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();
      overtone.frequency.setValueAtTime(freq * 2.01, startTime);
      overtone.type = 'sine';
      overtone.connect(overtoneGain);
      overtoneGain.connect(this.ctx.destination);
      
      overtoneGain.gain.setValueAtTime(0, startTime);
      overtoneGain.gain.linearRampToValueAtTime(0.04, startTime + 0.02);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.4);
      
      overtone.start(startTime);
      overtone.stop(startTime + duration);
    } else {
      // Soft ambient Rhodes piano / healing strings wave
      osc.type = 'sine';
    }

    osc.frequency.setValueAtTime(freq, startTime);

    // Envelope setting
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.04); // subtle entry volume
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }
}

export const AudioEngine = new AudioEngineClass();
