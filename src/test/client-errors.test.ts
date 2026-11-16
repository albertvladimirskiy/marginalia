import { describe, expect, it } from 'vitest';
import { AiError, isStaleChunkError, toAiError } from '../ai/client';

describe('lazy-load failures after a new deploy', () => {
  const browserMessages = [
    'Failed to fetch dynamically imported module: https://albertvladimirskiy.github.io/marginalia/assets/zod-D2b9-ljc.js', // Chrome
    'Importing a module script failed.', // Safari
    'error loading dynamically imported module: https://example.test/assets/sdk-abc.js', // Firefox
  ];

  it('recognizes the stale-chunk error in each major browser', () => {
    for (const m of browserMessages) expect(isStaleChunkError(new TypeError(m)), m).toBe(true);
  });

  it('turns it into a readable "reload" message instead of the raw browser text', () => {
    for (const m of browserMessages) {
      const err = toAiError(new TypeError(m));
      expect(err.kind).toBe('stale');
      expect(err.message).toMatch(/updated while this page was open.*Reload/);
      expect(err.message).not.toMatch(/dynamically|assets\//);
    }
  });

  it('does not mistake an ordinary network failure or other errors for a stale version', () => {
    expect(isStaleChunkError(new TypeError('Failed to fetch'))).toBe(false);
    expect(toAiError(new TypeError('Failed to fetch')).kind).toBe('unknown');
    expect(isStaleChunkError('not an error')).toBe(false);
  });

  it('passes existing AiErrors through unchanged', () => {
    const e = new AiError('offline', 'You are offline.');
    expect(toAiError(e)).toBe(e);
  });
});
