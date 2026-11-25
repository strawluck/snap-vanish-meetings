// Saves the "empty room" photo on this computer (chrome.storage.local), so
// you only have to take it once per room/camera setup. Never uploaded.
const KEY = 'roomPhoto';

export async function saveRoomPhoto(canvas) {
  try {
    if (!canvas) return await chrome.storage.local.remove(KEY);
    await chrome.storage.local.set({
      [KEY]: { w: canvas.width, h: canvas.height, src: canvas.toDataURL('image/jpeg', 0.92) },
    });
  } catch (err) {
    console.warn('[Snap Vanish] could not save room photo', err);
  }
}

/** Returns a decoded image if the saved photo fits this camera's shape. */
export async function loadRoomPhoto(width, height) {
  try {
    const { [KEY]: saved } = await chrome.storage.local.get(KEY);
    if (!saved?.src) return null;
    if (Math.abs(saved.w / saved.h - width / height) > 0.02) return null; // different camera shape
    const img = new Image();
    img.src = saved.src;
    await img.decode();
    return img;
  } catch {
    return null;
  }
}
