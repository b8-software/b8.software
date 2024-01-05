"use client";

import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";

type Vector2 = [number, number];
type Vector3 = [number, number, number];
type Vector4 = [number, number, number, number];

type Boid = {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  randomDirection: Vector2;
  randomDirectionTimer: number;
  size: number;
};

const animalIcons = [
  "🐦",
  "🦅",
  "🦉",
  "🦆",
  "🦢",
  "🦜",
  "🦚",
  "🦩",
  "🦤",
  "🦥",
  "🐸",
  "🐊",
  "🐢",
  "🐲",
  "🐉",
  "🦕",
  "🦖",
  "🐳",
  "🐋",
  "🐬",
  "🐟",
  "🐠",
  "🐡",
  "🐙",
  "🦋",
  "🐝",
  "🐞",
  "🦀",
  "🦞",
  "🦐",
  "🦑",
];

const unicodeIcons = [
  "❅",
  "❈",
  "★",
  "✯",
  "✭",
  "✩",
  "✫",
  "✬",
  "✭",
  "✮",
  "✢",
  "✣",
  "✤",
  "✥",
  "❖",
  "✦",
  "✧",
  "✵",
  "❊",
  "✱",
  "✲",
  "✻",
  "✼",
  "❃",
  "❉",
  "✺",
  "✪",
  "❂",
];

type ColorTheme<T extends string> = {
  dark: Record<T, string>;
  light: Record<T, string>;
};

const colorTheme: ColorTheme<"boid" | "velocity" | "accelleration" | "center"> = {
  dark: {
    boid: "rgb(228, 228, 231)",
    velocity: "rgb(228, 228, 231)",
    accelleration: "#2bfda5",
    center: "#ff000088",
  },
  light: {
    boid: "#000000",
    velocity: "#000000",
    accelleration: "#009657",
    center: "#000000",
  },
};

const baseSpeedMultiplier = 5;
const centerSpeedMultiplier = 0.1;
const alignmentSpeedMultiplier = 0.1;
const randomSpeedMultiplier = 0.4;

const friction = 0.002;

const headLen = 10; // length of head in pixels
const globalArrowScale = 10 / baseSpeedMultiplier;
const accelerationArrowScale = 100 / baseSpeedMultiplier;
const arrowAngle = Math.PI / 6;

function getRandomSize() {
  // min: 20, max: 60

  return Math.floor(Math.random() * 40 + 20);
}

function drawArrow(context: CanvasRenderingContext2D, origin: Vector2, direction: Vector2) {
  const [fromX, fromY] = origin;
  const [dX, dY] = direction.map(v => v * globalArrowScale);

  const toX = fromX + dX;
  const toY = fromY + dY;

  const angle = Math.atan2(dY, dX);
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.lineTo(
    toX - headLen * Math.cos(angle - arrowAngle),
    toY - headLen * Math.sin(angle - arrowAngle)
  );
  context.moveTo(toX, toY);
  context.lineTo(
    toX - headLen * Math.cos(angle + arrowAngle),
    toY - headLen * Math.sin(angle + arrowAngle)
  );
}

function convert2dToWrapped4d(v: Vector2, width: number, height: number): Vector4 {
  const [x, y] = v;

  const s = x / width;
  const t = y / height;

  // 4D coordinates on a 4D sphere (coordinates from https://en.wikipedia.org/wiki/N-sphere#Spherical_coordinates)
  const nx = Math.cos(s * 2 * Math.PI) / (2 * Math.PI);
  const ny = Math.cos(t * 2 * Math.PI) / (2 * Math.PI);
  const nz = Math.sin(s * 2 * Math.PI) / (2 * Math.PI);
  const nw = Math.sin(t * 2 * Math.PI) / (2 * Math.PI);

  return [nx, ny, nz, nw];
}

function convertWrapped4dTo2d(v: Vector4, width: number, height: number): Vector2 {
  const [x, y, z, w] = v;

  const s = convertWrapped2dTo1d([x, z]);
  const t = convertWrapped2dTo1d([y, w]);

  return [s * width, t * height];
}

const convertWrapped2dTo1d = (v: Vector2): number => {
  const [x, y] = v;

  const len = Math.hypot(x, y);

  // to length 1
  const nx = x / len || 0;
  const ny = y / len || 0;

  const cosZ = Math.acos(nx) / (2 * Math.PI);
  const sinZ = Math.asin(ny) / (2 * Math.PI);

  const possibleCosZ = [cosZ, 1 - cosZ];
  const possibleSinZ = sinZ < 0 ? [1 + sinZ, 0.5 - sinZ] : [sinZ, 0.5 - sinZ];

  const result = possibleCosZ
    .map(cosZ => possibleSinZ.map(sinZ => [cosZ, sinZ]))
    .flat() // all possible combinations
    .map(([cosZ, sinZ]) => [Math.abs(cosZ - sinZ), (cosZ + sinZ) / 2])
    .sort((a, b) => a[0] - b[0])[0];

  return result?.[1] ?? 0;
};

function getCenterOfBoids(boids: Boid[], width: number, height: number): Vector2 {
  const center4d = boids
    .map(boid => convert2dToWrapped4d(boid.position, width, height))
    .reduce(
      (acc, v) => {
        acc[0] += v[0];
        acc[1] += v[1];
        acc[2] += v[2];
        acc[3] += v[3];
        return acc;
      },
      [0, 0, 0, 0]
    )
    .map(v => v / boids.length || 0) as Vector4;

  return convertWrapped4dTo2d(center4d, width, height);
}

function getAverageVelocityNormalizend(boids: Boid[]): Vector2 {
  const avg = boids
    .map(boid => boid.velocity)
    .reduce(
      (acc, v) => {
        acc[0] += v[0];
        acc[1] += v[1];
        return acc;
      },
      [0, 0]
    )
    .map(v => v / boids.length) as Vector2;

  const len = Math.hypot(...avg);

  return avg.map(v => v / len || 0) as Vector2;
}

function deltaWrapped(v1: Vector2, v2: Vector2, width: number, height: number): Vector2 {
  const [x1, y1] = v1;
  const [x2, y2] = v2;

  let dx = x2 - x1;
  let dy = y2 - y1;

  if (Math.abs(dx) > width / 2) dx -= Math.sign(dx) * width;
  if (Math.abs(dy) > height / 2) dy -= Math.sign(dy) * height;

  return [dx, dy];
}

function createBoid(
  position:
    | {
        width: number;
        height: number;
      }
    | {
        x: number;
        y: number;
      }
): Boid {
  const positionVector: Vector2 =
    "width" in position
      ? [Math.random() * position.width, Math.random() * position.height]
      : [position.x, position.y];

  return {
    position: positionVector,
    velocity: [0, 0],
    acceleration: [0, 0],
    randomDirection: [0, 0],
    randomDirectionTimer: 0,
    size: getRandomSize(),
  };
}

export default function Boids() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lastTime = useRef<number>(-1);

  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  const [boids, setBoids] = useState<Boid[]>(
    Array.from({ length: 15 }, () => createBoid(dimensions))
  );

  const [isDebug, setIsDebug] = useState(false);
  const [isEmojis, setIsEmojis] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTrailEnabled, setIsTrailEnabled] = useState(false);

  const [colors, setColors] = useState<(typeof colorTheme)["dark" | "light"]>(colorTheme.dark);

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateColor = (query: MediaQueryListEvent | MediaQueryList) => {
      console.log(query);
      setColors(query.matches ? colorTheme.dark : colorTheme.light);
    };

    darkQuery.addEventListener("change", updateColor);
    return () => darkQuery.removeEventListener("change", updateColor);
  }, []);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number, noMovement: boolean = false) => {
      let delta = 0;
      if (!noMovement) {
        delta = (lastTime.current !== -1 ? time - lastTime.current : 0) / 60;
        delta = Math.min(delta, 5); // prevent large delta when tab is inactive
        lastTime.current = time;
      }

      if (boids.length === 0) return;
      // else console.log(boids);

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const [cx, cy] = getCenterOfBoids(boids, dimensions.width, dimensions.height);
      const avgVelocity = getAverageVelocityNormalizend(boids);

      if (isDebug) {
        ctx.fillStyle = colors.center;
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, 2 * Math.PI);
        ctx.fill();
      }

      // accelerate
      boids.forEach(boid => {
        boid.acceleration[0] = 0;
        boid.acceleration[1] = 0;

        // steer towards center
        const [dx, dy] = deltaWrapped(boid.position, [cx, cy], dimensions.width, dimensions.height);

        const distToCenter = Math.max(Math.hypot(dx, dy), 0.1);

        boid.acceleration[0] +=
          (dx / distToCenter) * (distToCenter < 40 ? -1 : 1) * centerSpeedMultiplier;
        boid.acceleration[1] +=
          (dy / distToCenter) * (distToCenter < 40 ? -1 : 1) * centerSpeedMultiplier;

        // align with average velocity

        const [avgX, avgY] = avgVelocity;

        boid.acceleration[0] += avgX * alignmentSpeedMultiplier;
        boid.acceleration[1] += avgY * alignmentSpeedMultiplier;

        // a little bit of random movement

        boid.randomDirectionTimer -= delta;
        if (boid.randomDirectionTimer < 0) {
          boid.randomDirection[0] = Math.random() - 0.5;
          boid.randomDirection[1] = Math.random() - 0.5;
          boid.randomDirectionTimer = Math.random() * 30;
        }

        boid.acceleration[0] += boid.randomDirection[0] * randomSpeedMultiplier;
        boid.acceleration[1] += boid.randomDirection[1] * randomSpeedMultiplier;

        boid.acceleration[0] *= baseSpeedMultiplier;
        boid.acceleration[1] *= baseSpeedMultiplier;

        // accelerate
        const speed = Math.hypot(...boid.velocity);

        // limit velocity with friction
        boid.velocity[0] +=
          (boid.acceleration[0] - boid.velocity[0] * speed * friction * (boid.size / 40)) * delta;
        boid.velocity[1] +=
          (boid.acceleration[1] - boid.velocity[1] * speed * friction * (boid.size / 40)) * delta;

        // move
        boid.position[0] += boid.velocity[0] * delta;
        boid.position[1] += boid.velocity[1] * delta;

        // wrap around
        boid.position[0] = (boid.position[0] + dimensions.width) % dimensions.width;
        boid.position[1] = (boid.position[1] + dimensions.height) % dimensions.height;
      });

      // draw!
      boids.forEach((boid, icon) => {
        ctx.fillStyle = colors.boid;
        ctx.strokeStyle = colors.boid;
        ctx.lineWidth = 2;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${boid.size}px twemoji serif`;

        const icons = isEmojis ? animalIcons : unicodeIcons;
        ctx.fillText(icons[icon % icons.length], boid.position[0], boid.position[1], boid.size * 2);

        if (isDebug) {
          ctx.strokeStyle = colors.velocity;
          ctx.beginPath();
          drawArrow(ctx, boid.position, boid.velocity);
          ctx.stroke();

          ctx.strokeStyle = colors.accelleration;
          ctx.beginPath();
          drawArrow(
            ctx,
            boid.position,
            boid.acceleration.map(v => v * accelerationArrowScale) as Vector2
          );
          ctx.stroke();
        }
      });
    },
    [
      boids,
      colors.accelleration,
      colors.boid,
      colors.center,
      colors.velocity,
      dimensions.height,
      dimensions.width,
      isDebug,
      isEmojis,
    ]
  );

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.parentElement!.getBoundingClientRect();
    setDimensions({ width, height });
  };

  const addBoid: MouseEventHandler<HTMLCanvasElement> = e => {
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setBoids(boids => [
      ...boids,
      createBoid({
        x,
        y,
      }),
    ]);
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    draw(ctx, 0, true);
  }, [boids, draw]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    lastTime.current = -1;

    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    let animationId = 0;

    const drawWithCtx: FrameRequestCallback = time => {
      draw(ctx, time);
      animationId = requestAnimationFrame(drawWithCtx);
    };
    animationId = requestAnimationFrame(drawWithCtx);

    return () => cancelAnimationFrame(animationId);
  }, [canvasRef, dimensions, draw, isPaused]);

  return (
    <>
      <canvas ref={canvasRef} onClick={addBoid}></canvas>
      <div className="absolute top-6 left-6 gap-2 flex flex-col w-max">
        <button
          aria-pressed={isDebug}
          className="w-12 p-2 h-max rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-colors shrink-0 aria-pressed:bg-red-500/40 aria-pressed:text-red-500"
          onClick={() => setIsDebug(isDebug => !isDebug)}
          title="toggle debug info"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <line x1="9" y1="1" x2="9" y2="4"></line>
            <line x1="15" y1="1" x2="15" y2="4"></line>
            <line x1="9" y1="20" x2="9" y2="23"></line>
            <line x1="15" y1="20" x2="15" y2="23"></line>
            <line x1="20" y1="9" x2="23" y2="9"></line>
            <line x1="20" y1="14" x2="23" y2="14"></line>
            <line x1="1" y1="9" x2="4" y2="9"></line>
            <line x1="1" y1="14" x2="4" y2="14"></line>
          </svg>
        </button>
        <button
          aria-pressed={isEmojis}
          className="w-12 p-2 h-max rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-colors shrink-0 aria-pressed:bg-blue-500/40 aria-pressed:text-blue-500"
          onClick={() => setIsEmojis(isEmojis => !isEmojis)}
          title="toggle emojis"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        </button>
        <button
          aria-pressed={isPaused}
          className="w-12 p-2 h-max rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-colors shrink-0 aria-pressed:bg-orange-500/40 aria-pressed:text-orange-500"
          onClick={() => setIsPaused(isPaused => !isPaused)}
          title="pause"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="10" y1="15" x2="10" y2="9"></line>
            <line x1="14" y1="15" x2="14" y2="9"></line>
          </svg>
        </button>
        <button
          className="w-12 p-2 h-max rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-colors shrink-0 aria-checked:bg-greenest-500/40"
          onClick={() => setBoids(boids => boids.slice(0, Math.ceil(boids.length / 2)))}
          title="remove half of the boids"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </>
  );
}
