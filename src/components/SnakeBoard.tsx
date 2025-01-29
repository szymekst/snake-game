"use client";

import { useEffect, useRef, useState } from "react";
import { clearInterval } from "timers";

const SnakeBoard = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const snakeSpeed = 10;
    const [snake, setSnake] = useState([
        { x: 100, y: 50 },
        { x: 125, y: 50 },
    ]);
    const [food, setFood] = useState({ x: 100, y: 100 });
    const [direction, setDirection] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const drawSnake = () => {
            snake.forEach((snakeSegment) => {
                if (!ctx) return;
                ctx.beginPath();
                ctx.rect(snakeSegment.x, snakeSegment.y, 25, 25);
                ctx.fillStyle = "#90EE90";
                ctx.fill();
                ctx.closePath();
            });
        };

        const drawApple = () => {
            if (!ctx) return;
            ctx.beginPath();
            ctx.rect(food.x, food.y, 25, 25);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();
        };

        const moveSnake = () => {
            if (direction) {
                setSnake((prevSnake) => {
                    const newSnake = [...prevSnake];
                    const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };
                });
            }
        };

        const interval = setInterval(() => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSnake();
            drawApple();
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [snake, direction, food]);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="bg-gray-300"
        />
    );
};

export default SnakeBoard;
