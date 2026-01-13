"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ShootingStarsProps {
    minSpeed?: number;
    maxSpeed?: number;
    minDelay?: number;
    maxDelay?: number;
    starColor?: string;
    trailColor?: string;
    className?: string;
}

export const ShootingStars = ({
    minSpeed = 10,
    maxSpeed = 30,
    minDelay = 1200,
    maxDelay = 4200,
    starColor = "#9E00FF",
    trailColor = "#2EB9DF",
    className,
}: ShootingStarsProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: {
            x: number;
            y: number;
            speed: number;
            distance: number;
            angle: number;
            radius: number;
        }[] = [];

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", handleResize);

        const createStar = () => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            const angle = Math.floor(Math.random() * 360);
            const radius = Math.random() * 2 + 1; // Size of the star head
            const distance = 0; // Initial distance traveled

            stars.push({ x, y, speed, distance, angle, radius });

            // Schedule next star
            const delay = Math.random() * (maxDelay - minDelay) + minDelay;
            setTimeout(createStar, delay);
        };

        // Start creation loop
        createStar();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];

                // Move star
                const rad = (star.angle * Math.PI) / 180;
                const vx = Math.cos(rad) * star.speed;
                const vy = Math.sin(rad) * star.speed;

                star.x += vx;
                star.y += vy;
                star.distance += star.speed;

                // Draw trail
                const trailLength = 100; // Length of the trail
                const tx = star.x - Math.cos(rad) * trailLength;
                const ty = star.y - Math.sin(rad) * trailLength;

                const gradient = ctx.createLinearGradient(star.x, star.y, tx, ty);
                gradient.addColorStop(0, starColor);
                gradient.addColorStop(1, "transparent");

                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw head
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = starColor;
                ctx.fill();

                // Remove if out of bounds
                if (
                    star.x < -100 ||
                    star.x > width + 100 ||
                    star.y < -100 ||
                    star.y > height + 100
                ) {
                    stars.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [minSpeed, maxSpeed, minDelay, maxDelay, starColor, trailColor]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("fixed inset-0 z-0 pointer-events-none", className)}
        />
    );
};

export default ShootingStars;
