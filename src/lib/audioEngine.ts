import { Article, HostVoice } from './types';

export class AudioPlaybackEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onTimeUpdateCallback: ((time: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;
  private timer: NodeJS.Timeout | null = null;

  public isPlaying: boolean = false;
  public currentTime: number = 0;
  public duration: number = 0;
  public speed: number = 1.0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public playArticle(
    article: Article,
    host: HostVoice,
    onTimeUpdate: (time: number) => void,
    onEnded: () => void
  ) {
    this.stop();
    this.duration = article.audioDurationSeconds;
    this.onTimeUpdateCallback = onTimeUpdate;
    this.onEndedCallback = onEnded;
    this.currentTime = 0;
    this.isPlaying = true;

    // Build spoken text from title and full transcript
    const fullText = `${article.title}. ${article.subtitle}. ${article.fullTranscript.map(t => t.text).join(' ')}`;

    if (this.synth) {
      this.currentUtterance = new SpeechSynthesisUtterance(fullText);
      this.currentUtterance.rate = this.speed;
      this.currentUtterance.pitch = host.id.includes('alex') ? 0.95 : host.id.includes('elena') ? 1.05 : 1.0;

      // Try selecting matching voice if available
      const voices = this.synth.getVoices();
      if (voices.length > 0) {
        const preferred = voices.find(v => v.lang.startsWith('en') && (
          v.name.toLowerCase().includes(host.name.split(' ')[0].toLowerCase()) ||
          v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('natural')
        )) || voices[0];
        this.currentUtterance.voice = preferred;
      }

      this.currentUtterance.onend = () => {
        this.stop();
        if (this.onEndedCallback) this.onEndedCallback();
      };

      this.synth.speak(this.currentUtterance);
    }

    // Start timer for progress simulation sync
    this.startProgressTimer();
  }

  public pause() {
    this.isPlaying = false;
    if (this.synth) {
      this.synth.pause();
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public resume() {
    this.isPlaying = true;
    if (this.synth) {
      if (this.synth.paused) {
        this.synth.resume();
      }
    }
    this.startProgressTimer();
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.currentTime);
    }
  }

  public setSpeed(rate: number) {
    this.speed = rate;
    if (this.currentUtterance) {
      this.currentUtterance.rate = rate;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private startProgressTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.isPlaying && this.currentTime < this.duration) {
        this.currentTime += 0.5 * this.speed;
        if (this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(this.currentTime);
        }
      } else if (this.currentTime >= this.duration) {
        this.stop();
        if (this.onEndedCallback) this.onEndedCallback();
      }
    }, 500);
  }
}

export const globalAudioEngine = new AudioPlaybackEngine();
