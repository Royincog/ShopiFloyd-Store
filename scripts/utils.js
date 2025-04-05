function setCacheWithTTL(key, data, ttlMs) {
  const now = Date.now();
  const payload = {
    data,
    expiry: now + ttlMs,
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

function getCacheWithTTL(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  try {
    const { data, expiry } = JSON.parse(cached);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch (e) {
    localStorage.removeItem(key);
    return null;
  }
}

export { getCacheWithTTL, setCacheWithTTL };
