"use client";

import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";

type Vector = [number, number];

type Boid = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
};

const maxVel = 2;
const eFactor = -(Math.log(0.1) / maxVel);

export default function Boids() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastTime = useRef<number>(-1);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [boids, setBoids] = useState<Boid[]>([]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      const delta = lastTime.current !== -1 ? time - lastTime.current : 0;
      lastTime.current = time;

      ctx.fillStyle = "currentColor";

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      boids.forEach(boid => {
        // accelerate

        // limit acceleration
        const speed = Math.hypot(...boid.velocity);
        const factor = Math.max(Math.exp(-eFactor * speed) - 0.1, 0);

        console.log(speed, factor);

        boid.velocity[0] += boid.acceleration[0] * delta * factor;
        boid.velocity[1] += boid.acceleration[1] * delta * factor;

        // move

        boid.position[0] += boid.velocity[0] * delta;
        boid.position[1] += boid.velocity[1] * delta;

        // wrap around

        boid.position[0] = (boid.position[0] + dimensions.width) % dimensions.width;
        boid.position[1] = (boid.position[1] + dimensions.height) % dimensions.height;

        // draw
        ctx.beginPath();
        ctx.arc(boid.position[0], boid.position[1], 5, 0, 2 * Math.PI);
        ctx.fill();
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
        acceleration: [0.0002, 0],
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
