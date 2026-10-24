class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.6;

  private initCtx() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playDiceRoll() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    // Rattle sequence of quick random pitch clicks
    const now = this.audioCtx.currentTime;
    for (let i = 0; i < 5; i++) {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 + Math.random() * 260, now + i * 0.04);

      gain.gain.setValueAtTime(0.2 * this.volume, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.03);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.04);
    }
  }

  public playMoveStep() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);

    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  public playLadderClimb() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    // Ascending celebratory arpeggio: C4, E4, G4, C5
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
    notes.forEach((freq, idx) => {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.3 * this.volume, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.16);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.18);
    });
  }

  public playSnakeDrop() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    // Descending slithering slide
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.4);

    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
    notes.forEach((freq, idx) => {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.28 * this.volume, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.28);
    });
  }

  public playFailure() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.setValueAtTime(140, now + 0.12);

    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  public playStageComplete() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    // Victorious fanfare: G4, C5, E5, G5
    const fanfare = [392.00, 523.25, 659.25, 783.99, 1046.50];
    fanfare.forEach((f, i) => {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.1);

      gain.gain.setValueAtTime(0.35 * this.volume, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.38);
    });
  }
}

export const sound = new SoundEngine();
