"use client";

import { useEffect, useRef } from "react";

interface Footstep {
  x: number;
  y: number;
  angle: number;
  isLeft: boolean;
  opacity: number;
  maxOpacity: number;
  decay: number;
}

interface Walker {
  name: string;
  role: string;
  path: { x: number; y: number }[];
  currentPointIndex: number;
  t: number; // 0 to 1 along current segment
  speed: number;
  isLeftFoot: boolean;
  stepTimer: number;
  color: string;
}

export default function MarauderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Footsteps pool
    const footsteps: Footstep[] = [];

    // Walkers patrolling the map in the corridor gutters (safely away from central cards)
    const walkers: Walker[] = [
      {
        name: "Manthan Mehta",
        role: "Full-Stack & AI Engineer",
        path: [
          { x: 0.05, y: 0.22 },
          { x: 0.09, y: 0.42 },
          { x: 0.05, y: 0.65 },
          { x: 0.08, y: 0.85 },
          { x: 0.04, y: 0.5 },
        ],
        currentPointIndex: 0,
        t: 0,
        speed: 0.0016,
        isLeftFoot: false,
        stepTimer: 0,
        color: "#2C1810",
      },
      {
        name: "Technical Recruiter",
        role: "Evaluating Portfolio",
        path: [
          { x: 0.95, y: 0.25 },
          { x: 0.91, y: 0.48 },
          { x: 0.96, y: 0.7 },
          { x: 0.92, y: 0.88 },
          { x: 0.95, y: 0.55 },
        ],
        currentPointIndex: 0,
        t: 0,
        speed: 0.0018,
        isLeftFoot: true,
        stepTimer: 0,
        color: "#3F2516",
      },
      {
        name: "Albus Dumbledore",
        role: "Headmaster",
        path: [
          { x: 0.25, y: 0.95 },
          { x: 0.5, y: 0.96 },
          { x: 0.75, y: 0.95 },
          { x: 0.5, y: 0.94 },
        ],
        currentPointIndex: 0,
        t: 0,
        speed: 0.0011,
        isLeftFoot: false,
        stepTimer: 0,
        color: "#4A2E1C",
      },
    ];

    // Helper to draw a single footprint in radiant golden magical ink
    const drawFootprint = (x: number, y: number, angle: number, isLeft: boolean, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;

      // Magical luminescence glow on dark background
      ctx.shadowColor = "rgba(245, 212, 122, 0.8)";
      ctx.shadowBlur = 7;
      ctx.fillStyle = "#F5D47A";

      const sideOffset = isLeft ? -7 : 7;

      // Sole (distinct human shoe/foot contour)
      ctx.beginPath();
      ctx.ellipse(sideOffset, -6, 4.2, 9.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Heel
      ctx.beginPath();
      ctx.ellipse(sideOffset, 8, 3.4, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Arched toe impressions (authentic Marauder's Map print style)
      ctx.beginPath();
      ctx.arc(sideOffset - 3, -17, 1.2, 0, Math.PI * 2);
      ctx.arc(sideOffset - 1, -18.5, 1.3, 0, Math.PI * 2);
      ctx.arc(sideOffset + 1.2, -18, 1.2, 0, Math.PI * 2);
      ctx.arc(sideOffset + 3, -16.5, 1.0, 0, Math.PI * 2);
      ctx.fill();

      // Golden core highlight
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#FFF2C2";
      ctx.beginPath();
      ctx.ellipse(sideOffset, -6, 2, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw architectural Hogwarts floorplan blueprints in radiant golden ink
    const drawCastleArchitecture = () => {
      ctx.save();
      ctx.strokeStyle = "rgba(218, 180, 100, 0.18)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      // Grid / corridor guidelines
      const cols = 6;
      const rows = 6;
      for (let i = 1; i < cols; i++) {
        const x = (width / cols) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let j = 1; j < rows; j++) {
        const y = (height / rows) * j;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.setLineDash([]);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = "rgba(244, 211, 122, 0.28)";

      // Medieval Turret blueprint circles
      const turrets = [
        { x: width * 0.15, y: height * 0.18, r: 40 },
        { x: width * 0.85, y: height * 0.18, r: 40 },
        { x: width * 0.12, y: height * 0.75, r: 48 },
        { x: width * 0.88, y: height * 0.75, r: 48 },
        { x: width * 0.5, y: height * 0.08, r: 52 },
      ];

      turrets.forEach((turret) => {
        ctx.beginPath();
        ctx.arc(turret.x, turret.y, turret.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(turret.x, turret.y, turret.r - 8, 0, Math.PI * 2);
        ctx.stroke();

        // Cross-hatching
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          ctx.beginPath();
          ctx.moveTo(turret.x + Math.cos(a) * (turret.r - 8), turret.y + Math.sin(a) * (turret.r - 8));
          ctx.lineTo(turret.x + Math.cos(a) * turret.r, turret.y + Math.sin(a) * turret.r);
          ctx.stroke();
        }
      });

      // Compass Rose in background
      const cx = width * 0.5;
      const cy = height * 0.88;
      const cr = 45;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = "rgba(244, 211, 122, 0.35)";
      ctx.beginPath();
      ctx.arc(0, 0, cr, 0, Math.PI * 2);
      ctx.arc(0, 0, cr - 8, 0, Math.PI * 2);
      ctx.stroke();

      // Cardinal points
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -cr);
        ctx.lineTo(6, -cr + 16);
        ctx.lineTo(0, 0);
        ctx.lineTo(-6, -cr + 16);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? "rgba(244, 211, 122, 0.3)" : "rgba(195, 150, 75, 0.2)";
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      ctx.restore();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background architectural lines
      drawCastleArchitecture();

      // Update & draw footsteps
      for (let i = footsteps.length - 1; i >= 0; i--) {
        const step = footsteps[i];
        step.opacity -= step.decay;
        if (step.opacity <= 0) {
          footsteps.splice(i, 1);
        } else {
          drawFootprint(step.x, step.y, step.angle, step.isLeft, step.opacity);
        }
      }

      // Update walkers & spawn steps
      walkers.forEach((walker) => {
        const p1 = walker.path[walker.currentPointIndex];
        const nextIndex = (walker.currentPointIndex + 1) % walker.path.length;
        const p2 = walker.path[nextIndex];

        const startX = p1.x * width;
        const startY = p1.y * height;
        const endX = p2.x * width;
        const endY = p2.y * height;

        const currentX = startX + (endX - startX) * walker.t;
        const currentY = startY + (endY - startY) * walker.t;

        const angle = Math.atan2(endY - startY, endX - startX) + Math.PI / 2;

        walker.stepTimer++;
        if (walker.stepTimer > 20) {
          walker.stepTimer = 0;
          walker.isLeftFoot = !walker.isLeftFoot;

          footsteps.push({
            x: currentX,
            y: currentY,
            angle,
            isLeft: walker.isLeftFoot,
            opacity: 1.0,
            maxOpacity: 1.0,
            decay: 0.003, // Stays visible for ~330 frames (5.5s) to leave a prominent walking trail
          });
        }

        // Draw floating parchment banner with name tag (when side gutters exist)
        if (width >= 1000) {
          ctx.save();
          ctx.translate(currentX, currentY);

          const bannerWidth = 145;
          const bannerHeight = 28;
          // Keep banner on screen and out of the top nav
          const bx = currentX > width * 0.5 ? -bannerWidth - 14 : 14;
          const by = Math.max(85 - currentY, -36);

          // Atmospheric drop shadow
          ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 4;

          // Banner parchment background
          ctx.fillStyle = "#FAF3E0";
          ctx.strokeStyle = "#C5A55A";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(bx, by, bannerWidth, bannerHeight, 4);
          ctx.fill();
          ctx.stroke();

          // Reset shadow for text & pins
          ctx.shadowColor = "transparent";

          // Decorative pointer pin pointing to footsteps in radiant gold
          ctx.strokeStyle = "#F5D47A";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          if (bx > 0) {
            ctx.moveTo(bx, by + 14);
            ctx.lineTo(bx - 10, by + 14);
          } else {
            ctx.moveTo(bx + bannerWidth, by + 14);
            ctx.lineTo(bx + bannerWidth + 10, by + 14);
          }
          ctx.stroke();

          // Character Name
          ctx.fillStyle = "#24140D";
          ctx.font = "bold 11px serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(walker.name, bx + bannerWidth / 2, by + 10);

          // Character Role
          ctx.fillStyle = "#7A4B26";
          ctx.font = "italic 9px serif";
          ctx.fillText(walker.role, bx + bannerWidth / 2, by + 21);

          ctx.restore();
        }

        // Advance walker along segment
        walker.t += walker.speed;
        if (walker.t >= 1) {
          walker.t = 0;
          walker.currentPointIndex = nextIndex;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
