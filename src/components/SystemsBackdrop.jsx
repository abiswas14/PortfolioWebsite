import React, { useEffect, useRef } from "react";

/*
 * The compiler board — one continuous pixel world behind the whole page.
 *
 * Composited from generated sprite assets (public/assets/, see
 * ASSET_SOURCES.md) at a low-res buffer upscaled with pixelated rendering:
 *   - heap skyline of memory-bank towers with twinkling bits
 *   - tiled memory board with copper traces routed between five stations
 *     (PAY router, ML accelerator, compiler CORE, QNT ticker, SYS rack)
 *   - packet sprites travelling the traces in the four channel colors
 *   - a small engineer avatar patrolling the walkway
 *   - a HUD statusline that tracks the section being read (scene:zone)
 *
 * Static scenery is pre-rendered once per resize; each animation frame only
 * redraws dynamic layers (~30fps cap). Reduced motion renders a single
 * still frame. A scroll-driven dimmer darkens the world as content sections
 * approach the viewport center (compositor-only opacity writes).
 */

const ASSETS = {
  tile: "/assets/tile-memory.png",
  towers: "/assets/heap-towers.png",
  cpu: "/assets/module-cpu.png",
  pay: "/assets/module-pay.png",
  ml: "/assets/module-ml.png",
  qnt: "/assets/module-qnt.png",
  sys: "/assets/module-sys.png",
  packets: "/assets/sprite-packet.png",
  avatar: "/assets/sprite-avatar.png"
};

const CHANNEL_COLORS = {
  pay: "#f0a85a",
  ml: "#b7a4ff",
  qnt: "#d5ef73",
  sys: "#78d6c6"
};

const PACKET_FRAME = { w: 12, h: 9 };
const AVATAR_FRAME = { w: 14, h: 18 };

const ZONES = {
  top: "ZONE 00 // BOOT",
  about: "ZONE 01 // PROFILE",
  experience: "ZONE 02 // QUEST LOG",
  projects: "ZONE 03 // CARTRIDGES",
  skills: "ZONE 04 // LOADOUT",
  contact: "ZONE 05 // FINAL GATE"
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function hash(n) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

export default function SystemsBackdrop() {
  const canvasRef = useRef(null);
  const dimmerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dimmer = dimmerRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.imageSmoothingEnabled = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let images = null;
    let disposed = false;
    let raf = 0;
    let running = false;
    let lastFrame = 0;
    let zoneLabel = ZONES.top;

    const world = {
      w: 384,
      h: 240,
      horizon: 100,
      stations: [],
      routes: [],
      twinkles: [],
      staticLayer: null,
      qntSeries: [],
      qntTick: 0,
      avatar: { x: 60, dir: 1, mode: "walk", until: 0, frame: 0, frameAt: 0 }
    };

    // ---- layout + static scenery -----------------------------------------
    function layout() {
      const ratio = window.innerWidth / Math.max(window.innerHeight, 1);
      world.h = 240;
      world.w = Math.max(320, Math.min(560, Math.round(world.h * ratio)));
      canvas.width = world.w;
      canvas.height = world.h;
      ctx.imageSmoothingEnabled = false;
      world.horizon = Math.round(world.h * 0.42);

      const { w, horizon, h } = world;
      const boardH = h - horizon;
      const defs = [
        { key: "pay", fx: 0.1, dy: 0.46 },
        { key: "ml", fx: 0.3, dy: 0.3 },
        { key: "cpu", fx: 0.52, dy: 0.34 },
        { key: "qnt", fx: 0.73, dy: 0.28 },
        { key: "sys", fx: 0.9, dy: 0.44 }
      ];
      world.stations = defs.map((def) => {
        const img = images[def.key];
        const x = Math.round(def.fx * w - img.width / 2);
        const y = Math.round(horizon + boardH * def.dy - img.height / 2);
        return { ...def, img, x, y, cx: x + Math.floor(img.width / 2), bottom: y + img.height };
      });

      const cpu = world.stations.find((s) => s.key === "cpu");
      world.routes = world.stations
        .filter((s) => s.key !== "cpu")
        .map((station, index) => {
          const railY = Math.min(h - 34, Math.max(station.bottom, cpu.bottom) + 8 + index * 4);
          const sx = station.cx;
          const tx = cpu.cx + (index - 1.5) * 8;
          const points = [
            [sx, station.bottom - 2],
            [sx, railY],
            [tx, railY],
            [tx, cpu.bottom - 2]
          ];
          let length = 0;
          const segs = [];
          for (let i = 0; i < points.length - 1; i += 1) {
            const [x0, y0] = points[i];
            const [x1, y1] = points[i + 1];
            const len = Math.abs(x1 - x0) + Math.abs(y1 - y0);
            segs.push({ x0, y0, x1, y1, len });
            length += len;
          }
          return { key: station.key, points, segs, length, color: CHANNEL_COLORS[station.key] };
        });

      // deterministic skyline twinkles
      world.twinkles = [];
      for (let i = 0; i < Math.round(w / 9); i += 1) {
        const x = Math.floor(hash(i + 1) * w);
        const y = horizon - 6 - Math.floor(hash(i + 101) * 42);
        world.twinkles.push({ x, y, phase: hash(i + 201) * Math.PI * 2, warm: hash(i + 301) > 0.72 });
      }

      // QNT sparkline seed
      world.qntSeries = Array.from({ length: 26 }, (_, i) => 0.5 + 0.3 * Math.sin(i * 0.7));

      renderStaticLayer();
    }

    function renderStaticLayer() {
      const { w, h, horizon } = world;
      const layer = document.createElement("canvas");
      layer.width = w;
      layer.height = h;
      const lctx = layer.getContext("2d");
      lctx.imageSmoothingEnabled = false;

      // dusk sky
      const sky = lctx.createLinearGradient(0, 0, 0, horizon);
      sky.addColorStop(0, "#181427");
      sky.addColorStop(0.7, "#151122");
      sky.addColorStop(1, "#131019");
      lctx.fillStyle = sky;
      lctx.fillRect(0, 0, w, horizon);

      // static stars
      lctx.fillStyle = "rgba(238, 231, 219, 0.22)";
      for (let i = 0; i < 24; i += 1) {
        const x = Math.floor(hash(i + 41) * w);
        const y = Math.floor(hash(i + 71) * (horizon - 58));
        lctx.fillRect(x, y, 1, 1);
      }

      // heap skyline
      const towers = images.towers;
      for (let x = 0; x < w; x += towers.width) {
        lctx.drawImage(towers, x, horizon - towers.height);
      }

      // memory board
      const pattern = lctx.createPattern(images.tile, "repeat");
      lctx.fillStyle = pattern;
      lctx.fillRect(0, horizon, w, h - horizon);
      lctx.fillStyle = "rgba(240, 168, 90, 0.05)";
      lctx.fillRect(0, horizon, w, 1);

      // walkway
      lctx.fillStyle = "rgba(12, 11, 15, 0.55)";
      lctx.fillRect(0, h - 30, w, 12);
      lctx.fillStyle = "rgba(238, 231, 219, 0.05)";
      for (let x = 4; x < w; x += 12) {
        lctx.fillRect(x, h - 24, 6, 1);
      }

      // copper traces + vias
      world.routes.forEach((route) => {
        lctx.strokeStyle = "rgba(181, 126, 66, 0.5)";
        lctx.lineWidth = 1;
        lctx.beginPath();
        route.points.forEach(([x, y], i) => {
          if (i === 0) lctx.moveTo(x + 0.5, y + 0.5);
          else lctx.lineTo(x + 0.5, y + 0.5);
        });
        lctx.stroke();
        route.points.slice(1, -1).forEach(([x, y]) => {
          lctx.fillStyle = "#6f4e2c";
          lctx.fillRect(x - 1, y - 1, 3, 3);
        });
      });

      // stations + labels
      world.stations.forEach((station) => {
        lctx.drawImage(station.img, station.x, station.y);
        const label = station.key === "cpu" ? "CORE" : station.key.toUpperCase();
        lctx.font = "7px monospace";
        lctx.textBaseline = "top";
        const tw = lctx.measureText(label).width;
        const lx = Math.round(station.cx - tw / 2);
        const ly = station.bottom + 3;
        lctx.fillStyle = "rgba(12, 11, 15, 0.7)";
        lctx.fillRect(lx - 2, ly - 1, tw + 4, 9);
        lctx.fillStyle = station.key === "cpu" ? "#c9bbab" : CHANNEL_COLORS[station.key];
        lctx.fillText(label, lx, ly);
      });

      world.staticLayer = layer;
    }

    // ---- dynamic layers ---------------------------------------------------
    function pointOnRoute(route, t) {
      let dist = t * route.length;
      for (const seg of route.segs) {
        if (dist <= seg.len) {
          const p = seg.len === 0 ? 0 : dist / seg.len;
          return [seg.x0 + (seg.x1 - seg.x0) * p, seg.y0 + (seg.y1 - seg.y0) * p];
        }
        dist -= seg.len;
      }
      const last = route.segs[route.segs.length - 1];
      return [last.x1, last.y1];
    }

    function drawPackets(time) {
      const packetIndex = { pay: 0, ml: 1, qnt: 2, sys: 3 };
      world.routes.forEach((route, ri) => {
        for (let i = 0; i < 2; i += 1) {
          const cycle = (time * 0.000085 * (1 + ri * 0.13) + i * 0.5 + ri * 0.21) % 1;
          const t = cycle < 0.5 ? cycle * 2 : (1 - cycle) * 2; // ping-pong
          const [x, y] = pointOnRoute(route, smoothstep(t));
          ctx.drawImage(
            images.packets,
            packetIndex[route.key] * PACKET_FRAME.w, 0, PACKET_FRAME.w, PACKET_FRAME.h,
            Math.round(x - PACKET_FRAME.w / 2), Math.round(y - PACKET_FRAME.h / 2),
            PACKET_FRAME.w, PACKET_FRAME.h
          );
          if (t < 0.05 || t > 0.95) {
            ctx.globalAlpha = 0.5;
            ctx.strokeStyle = route.color;
            ctx.strokeRect(Math.round(x) - 4.5, Math.round(y) - 4.5, 9, 9);
            ctx.globalAlpha = 1;
          }
        }
      });
    }

    function drawStationOverlays(time) {
      world.stations.forEach((station) => {
        const { x, y, key, img } = station;
        if (key === "cpu") {
          const cx = x + Math.floor(img.width / 2);
          const cy = y + Math.floor(img.height / 2);
          ctx.globalAlpha = 0.35 + 0.35 * Math.sin(time * 0.004);
          ctx.fillStyle = "#78d6c6";
          ctx.fillRect(cx - 3, cy - 3, 6, 6);
          ctx.globalAlpha = 1;
        } else if (key === "pay") {
          const active = Math.floor(time / 180) % 5;
          ctx.fillStyle = "#f0a85a";
          ctx.fillRect(x + 6 + active * 5, y + 24, 2, 2);
          if (Math.floor(time / 420) % 2) {
            ctx.fillStyle = "#78d6c6";
            ctx.fillRect(x + img.width - 10, y + 24, 4, 2);
          }
        } else if (key === "ml") {
          const spin = Math.floor(time / 150) % 2;
          [17, 35].forEach((fx) => {
            const cx = x + fx;
            const cy = y + 20;
            ctx.fillStyle = "#241e24";
            ctx.fillRect(cx - 5, cy - 5, 11, 11);
            ctx.strokeStyle = "rgba(201, 187, 171, 0.8)";
            ctx.beginPath();
            if (spin) {
              ctx.moveTo(cx - 3.5, cy - 3.5); ctx.lineTo(cx + 4.5, cy + 4.5);
              ctx.moveTo(cx + 4.5, cy - 3.5); ctx.lineTo(cx - 3.5, cy + 4.5);
            } else {
              ctx.moveTo(cx - 4.5, cy + 0.5); ctx.lineTo(cx + 5.5, cy + 0.5);
              ctx.moveTo(cx + 0.5, cy - 4.5); ctx.lineTo(cx + 0.5, cy + 5.5);
            }
            ctx.stroke();
            ctx.fillStyle = "#b7a4ff";
            ctx.fillRect(cx - 1, cy - 1, 3, 3);
          });
        } else if (key === "qnt") {
          if (time - world.qntTick > 130) {
            world.qntTick = time;
            const prev = world.qntSeries[world.qntSeries.length - 1];
            const next = Math.min(0.95, Math.max(0.05, prev + (hash(Math.floor(time / 130)) - 0.48) * 0.3));
            world.qntSeries.push(next);
            world.qntSeries.shift();
          }
          const sx = x + 6;
          const sy = y + 11;
          const sw = img.width - 12;
          const sh = 14;
          ctx.fillStyle = "#111014";
          ctx.fillRect(sx, sy, sw, sh);
          ctx.strokeStyle = "#d5ef73";
          ctx.beginPath();
          world.qntSeries.forEach((value, i) => {
            const px = sx + (i / (world.qntSeries.length - 1)) * (sw - 1) + 0.5;
            const py = sy + (1 - value) * (sh - 2) + 1;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          });
          ctx.stroke();
        } else if (key === "sys") {
          for (let i = 0; i < 5; i += 1) {
            const ly = y + 8 + i * 9 + 2;
            const slice = Math.floor(time / 260);
            if (hash(slice * 5 + i) > 0.45) {
              ctx.fillStyle = "#78d6c6";
              ctx.fillRect(x + img.width - 10, ly, 2, 2);
            }
            if (hash(slice * 7 + i + 40) > 0.7) {
              ctx.fillStyle = "#f0a85a";
              ctx.fillRect(x + img.width - 13, ly, 2, 2);
            }
          }
        }
      });
    }

    function updateAvatar(time, dt) {
      const a = world.avatar;
      const minX = Math.round(world.w * 0.06);
      const maxX = Math.round(world.w * 0.94) - AVATAR_FRAME.w;
      if (a.mode === "idle") {
        if (time > a.until) a.mode = "walk";
        return;
      }
      a.x += a.dir * 0.014 * dt;
      if (a.x <= minX) { a.x = minX; a.dir = 1; }
      if (a.x >= maxX) { a.x = maxX; a.dir = -1; }
      if (time - a.frameAt > 150) {
        a.frameAt = time;
        a.frame = (a.frame + 1) % 2;
      }
      // pause near stations occasionally
      const near = world.stations.some((s) => Math.abs(s.cx - (a.x + 7)) < 3);
      if (near && hash(Math.floor(time / 90)) > 0.86) {
        a.mode = "idle";
        a.until = time + 1600 + hash(time) * 2200;
        a.frame = 0;
      }
    }

    function drawAvatar() {
      const a = world.avatar;
      const y = world.h - 30 - AVATAR_FRAME.h + 4;
      const sx = a.frame * AVATAR_FRAME.w;
      if (a.dir === 1) {
        ctx.drawImage(images.avatar, sx, 0, AVATAR_FRAME.w, AVATAR_FRAME.h, Math.round(a.x), y, AVATAR_FRAME.w, AVATAR_FRAME.h);
      } else {
        ctx.save();
        ctx.translate(Math.round(a.x) + AVATAR_FRAME.w, y);
        ctx.scale(-1, 1);
        ctx.drawImage(images.avatar, sx, 0, AVATAR_FRAME.w, AVATAR_FRAME.h, 0, 0, AVATAR_FRAME.w, AVATAR_FRAME.h);
        ctx.restore();
      }
    }

    function drawHud(time, staticFrame) {
      const { w, h } = world;
      // top ticker
      ctx.fillStyle = "rgba(238, 231, 219, 0.16)";
      const shift = staticFrame ? 0 : Math.floor(time * 0.012) % 24;
      for (let x = -24 + shift; x < w; x += 24) {
        ctx.fillRect(x, 2, 10, 2);
      }
      ctx.fillStyle = "rgba(240, 168, 90, 0.4)";
      ctx.fillRect(((staticFrame ? 60 : Math.floor(time * 0.02)) % (w + 40)) - 20, 2, 10, 2);

      // statusline
      ctx.fillStyle = "rgba(14, 12, 17, 0.82)";
      ctx.fillRect(0, h - 13, w, 13);
      ctx.fillStyle = "rgba(238, 231, 219, 0.08)";
      ctx.fillRect(0, h - 13, w, 1);
      ctx.font = "7px monospace";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#c9bbab";
      ctx.fillText(zoneLabel, 6, h - 10);
      const right = "PKT OK";
      const rw = ctx.measureText(right).width;
      ctx.fillStyle = "#78d6c6";
      ctx.fillText(right, w - rw - 12, h - 10);
      if (staticFrame || Math.floor(time / 500) % 2) {
        ctx.fillStyle = "#f0a85a";
        ctx.fillRect(w - 8, h - 9, 3, 5);
      }
    }

    let lastTime = 0;
    function draw(time, staticFrame) {
      const dt = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;
      ctx.drawImage(world.staticLayer, 0, 0);

      // skyline twinkles
      world.twinkles.forEach((tw) => {
        const a = staticFrame ? 0.5 : 0.2 + 0.5 * Math.max(0, Math.sin(time * 0.0011 + tw.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = tw.warm ? "#f0a85a" : "#c9bbab";
        ctx.fillRect(tw.x, tw.y, 1, 1);
      });
      ctx.globalAlpha = 1;

      drawStationOverlays(staticFrame ? 900 : time);
      drawPackets(staticFrame ? 5200 : time);
      if (!staticFrame) updateAvatar(time, dt);
      drawAvatar();
      drawHud(time, staticFrame);
    }

    // ---- loop control -----------------------------------------------------
    const FRAME_MS = 33;
    function frame(time) {
      raf = 0;
      if (!running) return;
      if (time - lastFrame >= FRAME_MS) {
        lastFrame = time;
        draw(time, false);
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (!images || running || reduceMotion.matches || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function still() {
      if (images) draw(6000, true);
    }

    // ---- dimmer (scroll-driven, compositor-only) --------------------------
    let dimRaf = 0;
    function applyDim() {
      dimRaf = 0;
      if (!dimmer) return;
      if (reduceMotion.matches) {
        dimmer.style.opacity = "0.55";
        return;
      }
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.85));
      dimmer.style.opacity = (0.08 + 0.54 * smoothstep(p)).toFixed(3);
    }
    function onScroll() {
      if (!dimRaf) dimRaf = requestAnimationFrame(applyDim);
    }

    // ---- events -----------------------------------------------------------
    const onResize = () => {
      if (!images) return;
      layout();
      if (reduceMotion.matches) still();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onMotionChange = () => {
      if (reduceMotion.matches) {
        stop();
        still();
      } else {
        start();
      }
      applyDim();
    };
    const onZone = (event) => {
      const label = ZONES[event.detail] || ZONES.top;
      if (label !== zoneLabel) {
        zoneLabel = label;
        if (reduceMotion.matches || document.hidden) still();
      }
    };

    Promise.all(
      Object.entries(ASSETS).map(([key, src]) => loadImage(src).then((img) => [key, img]))
    )
      .then((entries) => {
        if (disposed) return;
        images = Object.fromEntries(entries);
        layout();
        world.avatar.x = Math.round(world.w * 0.2);
        still(); // poster frame immediately
        start();
        applyDim();
      })
      .catch(() => {
        /* assets missing: the CSS background color stays — never break the page */
      });

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener?.("change", onMotionChange);
    window.addEventListener("scene:zone", onZone);
    applyDim();

    return () => {
      disposed = true;
      stop();
      if (dimRaf) cancelAnimationFrame(dimRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener?.("change", onMotionChange);
      window.removeEventListener("scene:zone", onZone);
    };
  }, []);

  return (
    <>
      <div className="systems-backdrop" aria-hidden="true">
        <canvas ref={canvasRef} className="systems-backdrop__canvas" />
      </div>
      <div className="systems-dimmer" aria-hidden="true" />
      <div ref={dimmerRef} className="systems-scroll-dimmer" aria-hidden="true" />
    </>
  );
}
