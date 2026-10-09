// Web Audio API Synthesizer for UI & Gamification Sound Effects

class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastSoundTimes: { [sound: string]: number } = {};

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Prevent runaway loops from firing identical sounds multiple times per split-second
  private shouldThrottle(soundKey: string, cooldownMs: number = 80): boolean {
    const now = Date.now();
    const last = this.lastSoundTimes[soundKey] || 0;
    if (now - last < cooldownMs) {
      return true;
    }
    this.lastSoundTimes[soundKey] = now;
    return false;
  }

  public playClick() {
    if (!this.enabled || this.shouldThrottle('click', 50)) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime;
      const stopTime = startTime + 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, startTime);
      osc.frequency.exponentialRampToValueAtTime(800, stopTime);
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stopTime);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(stopTime);

      // Clean up connections safely after playback
      setTimeout(() => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      }, 100);
    } catch {
      // Ignore audio errors
    }
  }

  public playSelectOption() {
    if (!this.enabled || this.shouldThrottle('select', 60)) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime;
      const stopTime = startTime + 0.12;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, startTime);
      osc.frequency.exponentialRampToValueAtTime(660, stopTime);
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stopTime);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(stopTime);

      setTimeout(() => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      }, 200);
    } catch {}
  }

  public playSuccess() {
    if (!this.enabled || this.shouldThrottle('success', 300)) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.08;
        const stopTime = startTime + 0.25;

        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, stopTime);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(stopTime);

        setTimeout(() => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        }, 500);
      });
    } catch {}
  }

  public playBadgeUnlock() {
    if (!this.enabled || this.shouldThrottle('badgeUnlock', 400)) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [440, 554.37, 659.25, 880, 1108.73];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.09;
        const stopTime = startTime + 0.35;

        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, stopTime);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(stopTime);

        setTimeout(() => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        }, 700);
      });
    } catch {}
  }

  public playLevelComplete() {
    this.playBadgeUnlock();
  }

  public playUnlockLevel() {
    this.playBadgeUnlock();
  }

  public playError() {
    if (!this.enabled || this.shouldThrottle('error', 200)) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime;
      const stopTime = startTime + 0.2;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, startTime);
      osc.frequency.setValueAtTime(180, startTime + 0.1);
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stopTime);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(stopTime);

      setTimeout(() => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      }, 300);
    } catch {}
  }
}

export const sounds = new SoundManager();
