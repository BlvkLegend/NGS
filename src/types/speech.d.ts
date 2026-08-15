export {};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }

  interface SpeechRecognitionInstance extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
    onend: (() => void) | null;
    onerror: ((event: unknown) => void) | null;
  }

  interface SpeechRecognitionResultEvent {
    resultIndex: number;
    results: {
      length: number;
      [index: number]: { 0: { transcript: string }; isFinal: boolean; length: number };
    };
  }
}
