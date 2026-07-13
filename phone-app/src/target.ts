// A stream target = the RTMP server base URL + a stream key (the camera id).
// The director publishes each phone to  rtmp://<ip>:1935/live/<camId>, so:
//   server = "rtmp://<ip>:1935/live"   key = "<camId>"
export type Target = { server: string; key: string; label: string };

// Accepts either a full rtmp URL (from a scanned QR code) e.g.
//   rtmp://10.0.0.248:1935/live/cam1
// or a homerun:// pairing URL with the same shape. Returns null if unparseable.
export function parseTarget(raw: string): Target | null {
  const text = raw.trim();
  const m = text.match(/^(rtmp|homerun):\/\/([^/]+)\/(.+)$/i);
  if (!m) return null;

  const host = m[2]; // ip:port
  const path = m[3].replace(/^\/+|\/+$/g, ""); // e.g. "live/cam1"
  const parts = path.split("/");
  if (parts.length < 2) return null;

  const key = parts.pop() as string; // "cam1"
  const app = parts.join("/"); // "live"
  const server = `rtmp://${host}/${app}`;
  return { server, key, label: `${host} · ${key}` };
}

// Build a target from manual entry: an IP and a camera number (1..4).
export function targetFromManual(ip: string, camNumber: number): Target | null {
  const clean = ip.trim();
  if (!clean) return null;
  const key = `cam${camNumber}`;
  return {
    server: `rtmp://${clean}:1935/live`,
    key,
    label: `${clean} · ${key}`,
  };
}
