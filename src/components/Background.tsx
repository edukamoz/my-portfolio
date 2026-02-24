import { useEffect, useRef } from "react";

export function Background() {
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

    // Stars
    class Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      driftX: number;
      driftY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random();
        this.twinkleSpeed = (Math.random() - 0.5) * 0.02;
        this.driftX = (Math.random() - 0.5) * 0.1;
        this.driftY = (Math.random() - 0.5) * 0.1;
      }

      update() {
        this.alpha += this.twinkleSpeed;
        if (this.alpha <= 0 || this.alpha >= 1) {
          this.twinkleSpeed *= -1;
        }

        this.x += this.driftX;
        this.y += this.driftY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, this.alpha))})`;
        ctx.fill();
      }
    }

    // Comets
    class Comet {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;

      constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.length = 0;
        this.speed = 0;
        this.angle = 0;
        this.opacity = 0;
      }

      spawn() {
        this.active = true;
        this.x = Math.random() * width;
        this.y = -50;
        this.length = Math.random() * 100 + 50;
        this.speed = Math.random() * 10 + 5;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // roughly 45 degrees
        this.opacity = 1;
      }

      update() {
        if (!this.active) return;

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.01;

        if (
          this.opacity <= 0 ||
          this.x > width + this.length ||
          this.y > height + this.length
        ) {
          this.active = false;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length,
        );

        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length,
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    // Planets
    class Planet {
      centerX: number;
      centerY: number;
      orbitRadius: number;
      radius: number;
      angle: number;
      orbitSpeed: number;
      image: HTMLImageElement;
      loaded: boolean;

      constructor(
        orbitRadius: number,
        radius: number,
        speed: number,
        imageUrl: string,
      ) {
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.orbitRadius = orbitRadius;
        this.radius = radius;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitSpeed = speed;
        this.loaded = false;
        this.image = new Image();
        this.image.crossOrigin = "anonymous";
        this.image.src = imageUrl;
        this.image.onload = () => {
          this.loaded = true;
        };
      }

      update() {
        this.angle += this.orbitSpeed;
        this.centerX = width / 2;
        this.centerY = height / 2;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
        const y = this.centerY + Math.sin(this.angle) * this.orbitRadius;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.clip();

        if (this.loaded) {
          ctx.drawImage(
            this.image,
            x - this.radius,
            y - this.radius,
            this.radius * 2,
            this.radius * 2,
          );
        } else {
          ctx.fillStyle = "#333";
          ctx.fill();
        }

        // Add shadow for spherical effect
        const gradient = ctx.createRadialGradient(
          x - this.radius * 0.3,
          y - this.radius * 0.3,
          this.radius * 0.1,
          x,
          y,
          this.radius,
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
        gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.4)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    const stars: Star[] = Array.from({ length: 200 }, () => new Star());
    const comets: Comet[] = Array.from({ length: 3 }, () => new Comet());
    const planets: Planet[] = [
      new Planet(
        Math.min(width, height) * 0.3,
        30,
        0.0015,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/480px-Venus-real_color.jpg",
      ), // Venus
      new Planet(
        Math.min(width, height) * 0.45,
        40,
        0.001,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/480px-Blue_Marble_2002.png",
      ), // Earth
      new Planet(
        Math.min(width, height) * 0.6,
        25,
        0.0008,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/480px-OSIRIS_Mars_true_color.jpg",
      ), // Mars
      new Planet(
        Math.min(width, height) * 0.8,
        60,
        0.0004,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter.jpg/480px-Jupiter.jpg",
      ), // Jupiter
    ];

    let mouse = { x: width / 2, y: height / 2 };
    let targetMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow for parallax
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      const parallaxX = (mouse.x - width / 2) * 0.02;
      const parallaxY = (mouse.y - height / 2) * 0.02;

      ctx.save();
      ctx.translate(parallaxX, parallaxY);

      // Draw stars
      stars.forEach((star) => {
        star.update();
        star.draw(ctx);
      });

      // Draw planets
      planets.forEach((planet) => {
        planet.update();
        planet.draw(ctx);
      });

      ctx.restore();

      // Draw comets (no parallax for comets to make them feel closer/faster)
      comets.forEach((comet) => {
        if (!comet.active && Math.random() < 0.005) {
          comet.spawn();
        }
        comet.update();
        comet.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-[#0b0f19] via-[#130f23] to-[#1a1025]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
    </div>
  );
}
