"use client";

import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";

type Vector = [number, number];

type Boid = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
};

export default function Boids() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [boids, setBoids] = useState<Boid[]>([]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "currentColor";

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      boids.forEach(boid => {
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

    setBoids(boids => [...boids, { position: [x, y], velocity: [0, 0], acceleration: [0, 0] }]);
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

    draw(ctx);
  }, [canvasRef, dimensions, draw]);

  return <canvas ref={canvasRef} onClick={addBoid}></canvas>;
}
