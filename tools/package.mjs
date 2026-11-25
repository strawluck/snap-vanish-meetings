// Builds snap-vanish-meetings.zip containing just the extension/ folder (ready for
// "Load unpacked" after unzipping, or for a GitHub Release asset).
import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';

rmSync('snap-vanish-meetings.zip', { force: true });
execFileSync('zip', ['-r', '-X', '../snap-vanish-meetings.zip', '.', '-x', '.*', '-x', '*/.*'], {
  cwd: 'extension',
  stdio: 'inherit',
});
console.log('Wrote snap-vanish-meetings.zip');
