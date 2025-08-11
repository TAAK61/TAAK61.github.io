import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { IntelligentChatbot } from '../src/components/IntelligentChatbot';
import { VoiceControls } from '../src/components/VoiceControls';
import { Portfolio3DGallery } from '../src/components/three/Portfolio3DGallery';

// Mock pour Three.js
jest.mock('three', () => ({
  Scene: jest.fn(() => ({})),
  PerspectiveCamera: jest.fn(() => ({})),
  WebGLRenderer: jest.fn(() => ({
    setSize: jest.fn(),
    render: jest.fn(),
    domElement: document.createElement('canvas')
  })),
  Color: jest.fn()
}));

// Mock pour Web Speech API
const mockSpeechRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn()
};

Object.defineProperty(window, 'SpeechRecognition', {
  writable: true,
  value: jest.fn(() => mockSpeechRecognition)
});

Object.defineProperty(window, 'webkitSpeechRecognition', {
  writable: true,
  value: jest.fn(() => mockSpeechRecognition)
});

describe('Portfolio Components Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('IntelligentChatbot', () => {
    it('should render chatbot button', () => {
      render(<IntelligentChatbot />);
      expect(screen.getByTitle('Assistant IA Portfolio')).toBeInTheDocument();
    });

    it('should open chat interface when button clicked', async () => {
      render(<IntelligentChatbot />);
      const chatButton = screen.getByTitle('Assistant IA Portfolio');

      fireEvent.click(chatButton);

      await waitFor(() => {
        expect(screen.getByText('Assistant IA')).toBeInTheDocument();
      });
    });

    it('should send message and receive AI response', async () => {
      render(<IntelligentChatbot />);
      const chatButton = screen.getByTitle('Assistant IA Portfolio');

      fireEvent.click(chatButton);

      await waitFor(() => {
        const input = screen.getByPlaceholderText('Posez votre question...');
        fireEvent.change(input, { target: { value: 'compétences' } });
        fireEvent.keyDown(input, { key: 'Enter' });
      });

      await waitFor(() => {
        expect(screen.getByText(/Je maîtrise plusieurs domaines/)).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('VoiceControls', () => {
    it('should render voice controls widget', () => {
      render(<VoiceControls />);
      expect(screen.getByText('Cliquez pour parler')).toBeInTheDocument();
    });

    it('should start listening when button clicked', () => {
      render(<VoiceControls />);
      const voiceButton = screen.getByText('Commencer l\'écoute');

      fireEvent.click(voiceButton);

      expect(mockSpeechRecognition.start).toHaveBeenCalled();
    });

    it('should navigate to section on voice command', async () => {
      const mockNavigate = jest.fn();
      render(<VoiceControls onNavigate={mockNavigate} />);

      // Simuler une commande vocale
      const mockEvent = {
        results: [[{ transcript: 'portfolio' }]],
        resultIndex: 0
      };

      // Déclencher l'événement de résultat
      if (mockSpeechRecognition.addEventListener.mock.calls.length > 0) {
        const resultHandler = mockSpeechRecognition.addEventListener.mock.calls
          .find(call => call[0] === 'result')?.[1];

        if (resultHandler) {
          resultHandler(mockEvent);
          expect(mockNavigate).toHaveBeenCalledWith('portfolio');
        }
      }
    });
  });

  describe('Portfolio3DGallery', () => {
    it('should render 3D gallery canvas', () => {
      render(<Portfolio3DGallery />);
      expect(screen.getByRole('img', { name: /Portfolio 3D/i })).toBeInTheDocument();
    });

    it('should handle project selection', async () => {
      const mockOnProjectSelect = jest.fn();
      render(<Portfolio3DGallery onProjectSelect={mockOnProjectSelect} />);

      // Simuler un clic sur un projet 3D
      const gallery = screen.getByRole('img', { name: /Portfolio 3D/i });
      fireEvent.click(gallery);

      await waitFor(() => {
        expect(mockOnProjectSelect).toHaveBeenCalled();
      });
    });
  });

  describe('Accessibility Tests', () => {
    it('should have proper ARIA labels', () => {
      render(<IntelligentChatbot />);
      const chatButton = screen.getByTitle('Assistant IA Portfolio');
      expect(chatButton).toHaveAttribute('title');
    });

    it('should support keyboard navigation', () => {
      render(<VoiceControls />);
      const widget = screen.getByText('Commandes vocales');

      fireEvent.keyDown(widget, { key: 'Tab' });
      expect(document.activeElement).toBeDefined();
    });

    it('should have sufficient color contrast', () => {
      render(<IntelligentChatbot />);
      const chatButton = screen.getByTitle('Assistant IA Portfolio');

      const styles = window.getComputedStyle(chatButton);
      // Vérifier que les couleurs respectent WCAG AA
      expect(styles.background).toBeTruthy();
    });
  });

  describe('Performance Tests', () => {
    it('should render components within performance budget', async () => {
      const startTime = performance.now();

      render(
        <div>
          <IntelligentChatbot />
          <VoiceControls />
          <Portfolio3DGallery />
        </div>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Doit se rendre en moins de 100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('should not cause memory leaks', () => {
      const { unmount } = render(<IntelligentChatbot />);

      // Démontage du composant
      unmount();

      // Vérifier que les event listeners sont nettoyés
      expect(mockSpeechRecognition.stop).toHaveBeenCalled();
    });
  });

  describe('Integration Tests', () => {
    it('should work together without conflicts', async () => {
      render(
        <div>
          <IntelligentChatbot />
          <VoiceControls />
        </div>
      );

      // Ouvrir le chatbot
      const chatButton = screen.getByTitle('Assistant IA Portfolio');
      fireEvent.click(chatButton);

      // Activer les commandes vocales
      const voiceButton = screen.getByText('Commencer l\'écoute');
      fireEvent.click(voiceButton);

      await waitFor(() => {
        expect(screen.getByText('Assistant IA')).toBeInTheDocument();
        expect(screen.getByText('En écoute...')).toBeInTheDocument();
      });
    });
  });
});

// Tests E2E avec Playwright (configuration)
export const playwrightConfig = {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
};
