"use client";

import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";

type Vector2 = [number, number];
type Vector3 = [number, number, number];
type Vector4 = [number, number, number, number];

type Boid = {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
};

const friction = 0.002;

const headLen = 10; // length of head in pixels
const globalArrowScale = 5;
const arrowAngle = Math.PI / 6;

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
  const nx = x / len;
  const ny = y / len;

  const cosZ = Math.acos(nx) / (2 * Math.PI);
  const sinZ = Math.asin(ny) / (2 * Math.PI);

  const possibleCosZ = [cosZ, 1 - cosZ];
  const possibleSinZ = [sinZ, 1 + sinZ, 0.5 - sinZ].filter(v => v >= 0 && v <= 1);

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
    .map(v => v / boids.length) as Vector4;

  return convertWrapped4dTo2d(center4d, width, height);
}

function deltaWrapped(v1: Vector2, v2: Vector2, width: number, height: number): Vector2 {
  const [x1, y1] = v1;
  const [x2, y2] = v2;

  const dx = x2 - x1;
  const dy = y2 - y1;

  const wrappedDx = ((dx + width / 2) % width) - width / 2;
  const wrappedDy = ((dy + height / 2) % height) - height / 2;

  return [wrappedDx, wrappedDy];
}

export default function Boids() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastTime = useRef<number>(-1);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [boids, setBoids] = useState<Boid[]>([]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      const delta = (lastTime.current !== -1 ? time - lastTime.current : 0) / 60;
      lastTime.current = time;

      if (delta === 0) return;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const [cx, cy] = getCenterOfBoids(boids, dimensions.width, dimensions.height);

      ctx.fillStyle = "#ff000088";
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, 2 * Math.PI);
      ctx.fill();

      // accelerate
      boids.forEach(boid => {
        const [dx, dy] = deltaWrapped(boid.position, [cx, cy], dimensions.width, dimensions.height);

        const distToCenter = Math.max(Math.hypot(dx, dy), 0.1);

        boid.acceleration[0] = (dx / distToCenter) * 0.1 * (distToCenter < 40 ? -1 : 1);
        boid.acceleration[1] = (dy / distToCenter) * 0.1 * (distToCenter < 40 ? -1 : 1);
      });

      boids.forEach(boid => {
        const speed = Math.hypot(...boid.velocity);

        // limit velocity with friction
        boid.velocity[0] += (boid.acceleration[0] - boid.velocity[0] * speed * friction) * delta;
        boid.velocity[1] += (boid.acceleration[1] - boid.velocity[1] * speed * friction) * delta;

        // move
        boid.position[0] += boid.velocity[0] * delta;
        boid.position[1] += boid.velocity[1] * delta;

        // wrap around
        boid.position[0] = (boid.position[0] + dimensions.width) % dimensions.width;
        boid.position[1] = (boid.position[1] + dimensions.height) % dimensions.height;

        // draw
        ctx.fillStyle = "currentColor";
        ctx.strokeStyle = "currentColor";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(boid.position[0], boid.position[1], 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        drawArrow(ctx, boid.position, boid.velocity);
        ctx.stroke();

        ctx.strokeStyle = "red";
        ctx.beginPath();
        drawArrow(ctx, boid.position, boid.acceleration.map(v => v * 50) as Vector2);
        ctx.stroke();
      });
    },
    [boids, dimensions.height, dimensions.width]
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
      {
        position: [x, y],
        velocity: [0, 0],
        acceleration: [1, 0],
      },
    ]);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    let animationId = 0;

    const drawWithCtx: FrameRequestCallback = time => {
      draw(ctx, time);
      animationId = requestAnimationFrame(drawWithCtx);
    };
    animationId = requestAnimationFrame(drawWithCtx);

    return () => cancelAnimationFrame(animationId);
  }, [canvasRef, dimensions, draw]);

  return <canvas ref={canvasRef} onClick={addBoid}></canvas>;
}
