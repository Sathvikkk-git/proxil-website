import React from 'react';
import { GloveColor, WeightLevel } from '../types';

interface GloveVisualizerProps {
  color?: GloveColor;
  weight?: WeightLevel;
  view?: 'dorsal' | 'palmar' | 'lateral' | 'knuckle_macro' | 'worn';
  className?: string;
}

export const GloveVisualizer: React.FC<GloveVisualizerProps> = ({
  color = 'navy',
  weight = 'medium',
  view = 'dorsal',
  className = '',
}) => {

  // Color theme definitions
  const colorThemes = {
    navy: {
      primary: '#0F2540',
      primaryDark: '#081728',
      primaryLight: '#1B3B60',
      meshBase: '#153152',
      meshLines: '#2A5080',
      trim: '#0B1C30',
      accentStrap: '#1565D8',
      strapVelcro: '#0A1829',
      weightPouch: '#122C4C',
      weightMetal: '#64748B',
      weightHighlight: '#94A3B8',
      stitching: '#3B82F6',
    },
    black: {
      primary: '#1A1E24',
      primaryDark: '#0F1216',
      primaryLight: '#2C323B',
      meshBase: '#222830',
      meshLines: '#38414D',
      trim: '#111418',
      accentStrap: '#3B82F6',
      strapVelcro: '#14181E',
      weightPouch: '#1F242B',
      weightMetal: '#475569',
      weightHighlight: '#64748B',
      stitching: '#4B5563',
    },
    white: {
      primary: '#E2E8F0',
      primaryDark: '#CBD5E1',
      primaryLight: '#F1F5F9',
      meshBase: '#E2E8F0',
      meshLines: '#94A3B8',
      trim: '#94A3B8',
      accentStrap: '#1565D8',
      strapVelcro: '#CBD5E1',
      weightPouch: '#E2E8F0',
      weightMetal: '#64748B',
      weightHighlight: '#CBD5E1',
      stitching: '#1565D8',
    },
  };

  const theme = colorThemes[color] || colorThemes.navy;

  const weightProfiles = {
    light: { label: 'Light Configuration (~100g)', count: 4, thickness: 12, opacity: 0.85, tag: '4 × 25g Modules' },
    medium: { label: 'Medium Configuration (~180g)', count: 4, thickness: 16, opacity: 1, tag: '4 × 45g Modules' },
    heavy: { label: 'Heavy Configuration (~260g)', count: 4, thickness: 20, opacity: 1, tag: '4 × 65g Modules' },
  };

  const weightInfo = weightProfiles[weight];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* SVG Container */}
      <svg
        viewBox="0 0 600 650"
        className="w-full h-auto"
        aria-label="PROXIL Anti-Tremor Glove Visualizer"
      >
        <defs>
          {/* Subtle Ambient Drop Shadow */}
          <filter id="glove-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#0B2A4A" floodOpacity="0.16" />
          </filter>

          {/* Weight Pod Shadow */}
          <filter id="weight-depth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.45" />
          </filter>

          {/* Metallic Weight Gradient */}
          <linearGradient id="metal-weight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#64748B" />
            <stop offset="70%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Metallic Highlight Gradient */}
          <linearGradient id="metal-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#64748B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.9" />
          </linearGradient>

          {/* Fabric Mesh Pattern */}
          <pattern id="mesh-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M0 4 L4 0 L8 4 L4 8 Z"
              fill="none"
              stroke={theme.meshLines}
              strokeWidth="0.8"
              strokeOpacity="0.28"
            />
            <circle cx="4" cy="4" r="0.75" fill={theme.meshLines} fillOpacity="0.3" />
          </pattern>

          {/* Glove Primary Gradient */}
          <linearGradient id="glove-gradient" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={theme.primaryLight} />
            <stop offset="50%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.primaryDark} />
          </linearGradient>

          {/* Strap Texture */}
          <pattern id="strap-texture" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="4" stroke="#000000" strokeWidth="0.5" strokeOpacity="0.2" />
          </pattern>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="300" cy="590" rx="190" ry="24" fill="#0B2A4A" fillOpacity="0.08" filter="blur(14px)" />

        {/* ========================================================
            VIEW MODE RENDERING
           ======================================================== */}

        {/* DORSAL VIEW (PRIMARY REFERENCE: Back of hand / Knuckles) */}
        {(view === 'dorsal' || view === 'worn') && (
          <g id="dorsal-glove" filter="url(#glove-shadow)">
            {/* Skin Tone Underlay for Fingerless Openings (Natural Hand) */}
            <g id="exposed-fingers" className="transition-all duration-300">
              {/* Thumb distal segment */}
              <path
                d="M 172 320 C 158 290 148 245 156 220 C 162 205 178 205 186 225 C 196 248 198 285 204 315 Z"
                fill="#F4D3C2"
                stroke="#D9A88F"
                strokeWidth="1.5"
              />
              {/* Thumb nail */}
              <path d="M 162 225 C 164 218 174 218 178 225 C 176 235 164 235 162 225 Z" fill="#FDEEE6" />

              {/* Index distal phalanx */}
              <path
                d="M 235 190 C 235 155 240 120 252 110 C 262 102 274 105 277 125 C 280 148 277 175 275 190 Z"
                fill="#F4D3C2"
                stroke="#D9A88F"
                strokeWidth="1.5"
              />
              <path d="M 248 126 C 252 118 266 118 269 126 C 267 135 249 135 248 126 Z" fill="#FDEEE6" />

              {/* Middle distal phalanx (longest) */}
              <path
                d="M 292 180 C 292 140 298 95 312 85 C 324 77 337 80 340 102 C 344 130 338 165 336 180 Z"
                fill="#F4D3C2"
                stroke="#D9A88F"
                strokeWidth="1.5"
              />
              <path d="M 307 100 C 312 90 327 90 331 100 C 328 110 309 110 307 100 Z" fill="#FDEEE6" />

              {/* Ring distal phalanx */}
              <path
                d="M 353 190 C 354 150 360 115 372 108 C 383 100 395 104 397 126 C 399 150 395 178 392 195 Z"
                fill="#F4D3C2"
                stroke="#D9A88F"
                strokeWidth="1.5"
              />
              <path d="M 368 124 C 372 115 385 115 389 124 C 386 133 370 133 368 124 Z" fill="#FDEEE6" />

              {/* Little (pinky) distal phalanx */}
              <path
                d="M 410 220 C 412 185 418 155 429 150 C 438 145 448 150 449 168 C 451 190 445 215 440 230 Z"
                fill="#F4D3C2"
                stroke="#D9A88F"
                strokeWidth="1.5"
              />
              <path d="M 423 165 C 427 158 438 158 441 165 C 439 173 425 173 423 165 Z" fill="#FDEEE6" />
            </g>

            {/* MAIN GLOVE BODY (Fabric Chassis) */}
            <path
              d="M 215 540 
                 C 210 460 200 400 185 360 
                 C 170 335 155 315 168 285 
                 C 175 270 195 275 210 300 
                 C 220 280 225 210 232 188 
                 C 238 180 274 180 278 188 
                 C 283 200 288 200 290 180 
                 C 294 170 334 170 338 180 
                 C 342 198 348 198 350 188 
                 C 354 178 392 178 395 188 
                 C 399 205 405 210 408 215 
                 C 412 210 442 220 445 230 
                 C 448 245 446 290 442 335 
                 C 438 385 432 450 425 540 
                 Z"
              fill="url(#glove-gradient)"
              stroke={theme.trim}
              strokeWidth="2.5"
            />

            {/* Breathable Spacer Mesh Overlay across Dorsal Area */}
            <path
              d="M 225 450 
                 C 215 375 220 310 225 260 
                 C 240 255 385 255 405 265 
                 C 415 320 415 380 410 450 
                 C 350 460 280 460 225 450 Z"
              fill="url(#mesh-pattern)"
            />

            {/* Finger Opening Reinforced Elastic Cuffs (Hems) */}
            {/* Thumb cuff */}
            <ellipse cx="188" cy="290" rx="20" ry="8" fill={theme.trim} stroke={theme.stitching} strokeWidth="1.5" />
            {/* Index cuff */}
            <ellipse cx="255" cy="188" rx="22" ry="7" fill={theme.trim} stroke={theme.stitching} strokeWidth="1.5" />
            {/* Middle cuff */}
            <ellipse cx="314" cy="180" rx="23" ry="7" fill={theme.trim} stroke={theme.stitching} strokeWidth="1.5" />
            {/* Ring cuff */}
            <ellipse cx="373" cy="188" rx="21" ry="7" fill={theme.trim} stroke={theme.stitching} strokeWidth="1.5" />
            {/* Pinky cuff */}
            <ellipse cx="426" cy="225" rx="18" ry="6" fill={theme.trim} stroke={theme.stitching} strokeWidth="1.5" />

            {/* Anatomical Dorsal Contour Stitching Lines */}
            <path d="M 255 195 C 260 240 262 290 260 340" fill="none" stroke={theme.stitching} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.65" />
            <path d="M 314 187 C 314 240 316 290 316 340" fill="none" stroke={theme.stitching} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.65" />
            <path d="M 373 195 C 370 240 368 290 365 340" fill="none" stroke={theme.stitching} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.65" />

            {/* ========================================================
                KNUCKLE / BACK-OF-HAND WEIGHTED COMPARTMENT (CRITICAL)
               ======================================================== */}
            {/* Reinforced Metacarpal Knuckle Anchor Bridge */}
            <g id="knuckle-weight-assembly">
              {/* Foundation Bay / Pocket Base */}
              <path
                d="M 220 245 
                   C 265 240 355 240 405 248 
                   C 408 275 405 300 402 312 
                   C 355 305 270 305 224 310 
                   C 220 295 218 270 220 245 Z"
                fill={theme.weightPouch}
                stroke={theme.trim}
                strokeWidth="2"
                filter="url(#weight-depth)"
              />

              {/* Weight Bay Perimeter Stitching */}
              <path
                d="M 223 248 C 265 243 355 243 402 251 C 405 274 402 297 399 309 C 355 302 270 302 227 307 Z"
                fill="none"
                stroke={theme.stitching}
                strokeWidth="1.4"
                strokeDasharray="4 2"
              />

              {/* 4 Removable Contoured Stabilizing Weights Aligned at Knuckles */}
              {/* Weight 1: Index Knuckle Position */}
              <g id="weight-pod-1" filter="url(#weight-depth)">
                <rect
                  x="232"
                  y="252"
                  width="34"
                  height={weightInfo.thickness + 24}
                  rx="6"
                  fill="url(#metal-weight)"
                  stroke={theme.weightHighlight}
                  strokeWidth="1.2"
                />
                <rect x="235" y="255" width="28" height="6" rx="2" fill="url(#metal-shine)" />
                {/* Weight mark */}
                <circle cx="249" cy={268} r="3" fill="#1565D8" />
              </g>

              {/* Weight 2: Middle Knuckle Position */}
              <g id="weight-pod-2" filter="url(#weight-depth)">
                <rect
                  x="276"
                  y="250"
                  width="36"
                  height={weightInfo.thickness + 26}
                  rx="6"
                  fill="url(#metal-weight)"
                  stroke={theme.weightHighlight}
                  strokeWidth="1.2"
                />
                <rect x="279" y="253" width="30" height="6" rx="2" fill="url(#metal-shine)" />
                <circle cx="294" cy={267} r="3" fill="#1565D8" />
              </g>

              {/* Weight 3: Ring Knuckle Position */}
              <g id="weight-pod-3" filter="url(#weight-depth)">
                <rect
                  x="322"
                  y="250"
                  width="36"
                  height={weightInfo.thickness + 26}
                  rx="6"
                  fill="url(#metal-weight)"
                  stroke={theme.weightHighlight}
                  strokeWidth="1.2"
                />
                <rect x="325" y="253" width="30" height="6" rx="2" fill="url(#metal-shine)" />
                <circle cx="340" cy={267} r="3" fill="#1565D8" />
              </g>

              {/* Weight 4: Little Finger Knuckle Position */}
              <g id="weight-pod-4" filter="url(#weight-depth)">
                <rect
                  x="368"
                  y="254"
                  width="30"
                  height={weightInfo.thickness + 22}
                  rx="6"
                  fill="url(#metal-weight)"
                  stroke={theme.weightHighlight}
                  strokeWidth="1.2"
                />
                <rect x="370" y="257" width="26" height="5" rx="2" fill="url(#metal-shine)" />
                <circle cx="383" cy={269} r="3" fill="#1565D8" />
              </g>

              {/* Knuckle Labeling / Protective Security Flap Ribbon */}
              <path
                d="M 226 295 L 400 295 L 400 305 L 226 305 Z"
                fill={theme.accentStrap}
                fillOpacity="0.85"
              />
              <text
                x="313"
                y="302"
                fill="#FFFFFF"
                fontSize="7"
                fontWeight="700"
                letterSpacing="1"
                textAnchor="middle"
              >
                PROXIL KNUCKLE MODULES
              </text>
            </g>

            {/* ========================================================
                TRANSVERSE MID-HAND ADJUSTABLE STRAP
               ======================================================== */}
            <g id="mid-hand-strap">
              {/* Strap Body */}
              <path
                d="M 205 365 
                   C 260 360 360 360 422 368 
                   C 426 395 422 405 418 410 
                   C 360 402 260 402 208 406 
                   Z"
                fill={theme.strapVelcro}
                stroke={theme.trim}
                strokeWidth="1.8"
                filter="url(#weight-depth)"
              />
              {/* Grip Tab at end of hand strap */}
              <rect x="382" y="367" width="36" height="38" rx="4" fill={theme.accentStrap} stroke="#FFFFFF" strokeWidth="0.8" />
              {/* Textured Grip Ridges on pull-tab */}
              <line x1="390" y1="373" x2="390" y2="399" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="395" y1="373" x2="395" y2="399" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="400" y1="373" x2="400" y2="399" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
              {/* Hand Strap Label */}
              <text x="290" y="389" fill="#94A3B8" fontSize="8" fontWeight="600" letterSpacing="0.8" textAnchor="middle">
                ADJUSTABLE FIT
              </text>
            </g>

            {/* ========================================================
                ADJUSTABLE COMPRESSION WRIST STRAP (DUAL STRAP SYSTEM)
               ======================================================== */}
            <g id="wrist-strap-assembly">
              {/* Base Wrist Cuff Foundation */}
              <path
                d="M 215 470 
                   C 270 465 370 465 425 470 
                   L 428 555 
                   C 370 560 270 560 213 555 
                   Z"
                fill={theme.primaryDark}
                stroke={theme.trim}
                strokeWidth="2"
              />

              {/* Neoprene Cushion Lining under Wrist */}
              <path
                d="M 216 478 C 275 474 365 474 422 478 L 424 548 C 365 552 275 552 214 548 Z"
                fill="none"
                stroke={theme.stitching}
                strokeWidth="1.4"
                strokeDasharray="4 2"
              />

              {/* Wide Hook-and-Loop Overwrap Compression Strap */}
              <path
                d="M 205 485 
                   L 415 485 
                   C 425 485 432 492 432 505 
                   L 432 535 
                   C 432 546 425 552 415 552 
                   L 205 552 
                   Z"
                fill={theme.strapVelcro}
                stroke={theme.accentStrap}
                strokeWidth="1.8"
                filter="url(#weight-depth)"
              />

              {/* Durable Metal D-Ring Tension Pass-Through Loop */}
              <rect
                x="202"
                y="488"
                width="12"
                height="60"
                rx="3"
                fill="#475569"
                stroke="#94A3B8"
                strokeWidth="1.5"
              />
              <rect x="205" y="493" width="6" height="50" rx="1.5" fill="#0F172A" />

              {/* PROXIL Embossed Wordmark & Icon on Wrist Strap */}
              <g transform="translate(245, 502)">
                {/* Brand icon mini crest */}
                <rect x="0" y="3" width="16" height="16" rx="4" fill="#1565D8" />
                <path d="M 4 11 L 8 7 L 12 11" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="14" r="1.5" fill="#FFFFFF" />

                {/* PROXIL Typography */}
                <text x="24" y="16" fill="#FFFFFF" fontSize="13" fontWeight="800" letterSpacing="2">
                  PROXIL
                </text>
                <text x="24" y="28" fill="#93C5FD" fontSize="7" fontWeight="500" letterSpacing="0.8">
                  STABILITY IN EVERY MOVEMENT
                </text>
              </g>

              {/* Pull-tab on Wrist Strap */}
              <path
                d="M 415 488 L 434 496 L 434 540 L 415 548 Z"
                fill={theme.accentStrap}
                stroke="#60A5FA"
                strokeWidth="1.2"
              />
              {/* Tactile Grip Lines on Pull-tab */}
              <line x1="422" y1="499" x2="422" y2="538" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="427" y1="503" x2="427" y2="534" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
            </g>
          </g>
        )}

        {/* PALMAR VIEW (Alternative View: Palm & Grip) */}
        {view === 'palmar' && (
          <g id="palmar-glove" filter="url(#glove-shadow)">
            {/* Exposed Distal Finger Pads */}
            <g id="exposed-finger-pads">
              <path d="M 235 190 C 235 155 240 120 252 110 C 262 102 274 105 277 125 C 280 148 277 175 275 190 Z" fill="#F4D3C2" stroke="#D9A88F" strokeWidth="1.5" />
              <path d="M 292 180 C 292 140 298 95 312 85 C 324 77 337 80 340 102 C 344 130 338 165 336 180 Z" fill="#F4D3C2" stroke="#D9A88F" strokeWidth="1.5" />
              <path d="M 353 190 C 354 150 360 115 372 108 C 383 100 395 104 397 126 C 399 150 395 178 392 195 Z" fill="#F4D3C2" stroke="#D9A88F" strokeWidth="1.5" />
              <path d="M 410 220 C 412 185 418 155 429 150 C 438 145 448 150 449 168 C 451 190 445 215 440 230 Z" fill="#F4D3C2" stroke="#D9A88F" strokeWidth="1.5" />
              {/* Thumb pad on right when looking at palm */}
              <path d="M 435 320 C 448 290 458 245 450 220 C 444 205 428 205 420 225 C 410 248 408 285 402 315 Z" fill="#F4D3C2" stroke="#D9A88F" strokeWidth="1.5" />
            </g>

            {/* Palm Main Chassis */}
            <path
              d="M 215 540 C 210 450 200 400 185 350 C 180 310 215 280 230 190 C 235 180 270 180 275 190 C 280 200 288 200 292 180 C 298 170 335 170 340 180 C 344 195 350 195 355 188 C 360 178 395 178 400 190 C 405 230 440 270 445 320 C 450 360 435 440 425 540 Z"
              fill="url(#glove-gradient)"
              stroke={theme.trim}
              strokeWidth="2.5"
            />

            {/* Textured Non-Slip Silicone Hex Grip Pads on Thenar & Hypothenar Eminence */}
            <g id="silicone-grip-pads" fill="#0B1A2C" stroke="#1565D8" strokeWidth="1">
              {/* Palm Center Flex Channel */}
              <path d="M 240 250 C 280 260 350 260 380 250 C 390 320 380 380 370 420 C 320 440 280 430 250 400 C 235 350 235 290 240 250 Z" fill="#132B47" stroke={theme.stitching} strokeWidth="1.5" />
              {/* Grip Micro-dots */}
              {[...Array(6)].map((_, r) => (
                [...Array(6)].map((_, c) => (
                  <circle key={`${r}-${c}`} cx={260 + c * 20} cy={275 + r * 22} r="2.5" fill="#3B82F6" fillOpacity="0.7" />
                ))
              ))}
            </g>

            {/* Palmar Wrist Wrap Closure */}
            <rect x="210" y="475" width="220" height="70" rx="8" fill={theme.strapVelcro} stroke={theme.accentStrap} strokeWidth="2" />
            <text x="320" y="515" fill="#FFFFFF" fontSize="12" fontWeight="700" letterSpacing="1" textAnchor="middle">
              OPEN PALM
            </text>
            <text x="320" y="530" fill="#93C5FD" fontSize="8" textAnchor="middle">
              Clear palm, free finger movement
            </text>
          </g>
        )}

        {/* LATERAL VIEW (Side Profile: Knuckle Module & Wrist Mechanism) */}
        {view === 'lateral' && (
          <g id="lateral-glove" filter="url(#glove-shadow)">
            {/* Side Silhouette */}
            <path
              d="M 220 540 L 220 380 C 230 330 250 270 280 210 C 290 190 320 185 330 200 C 340 220 345 270 350 330 C 355 390 360 460 360 540 Z"
              fill="url(#glove-gradient)"
              stroke={theme.trim}
              strokeWidth="2.5"
            />
            {/* Exposed Distal Finger Profile */}
            <path d="M 295 190 C 295 150 305 110 320 105 C 330 100 340 115 335 150 C 332 180 325 195 320 200 Z" fill="#F4D3C2" stroke="#D9A88F" strokeWidth="1.5" />
            {/* Knuckle Modular Weight Profile (Side Elevation) */}
            <rect x="250" y="245" width="30" height="55" rx="6" fill="url(#metal-weight)" stroke="#94A3B8" strokeWidth="1.5" filter="url(#weight-depth)" />
            <rect x="253" y="248" width="8" height="49" rx="2" fill="url(#metal-shine)" />
            {/* Tension Strap Wrap Profile */}
            <rect x="215" y="470" width="150" height="70" rx="8" fill={theme.strapVelcro} stroke={theme.accentStrap} strokeWidth="2" />
            {/* Strap Ring */}
            <rect x="210" y="480" width="10" height="50" rx="3" fill="#64748B" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="290" y="512" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">
              SIDE PROFILE
            </text>
            <text x="290" y="528" fill="#93C5FD" fontSize="8" textAnchor="middle">
              Low-profile knuckle modules
            </text>
          </g>
        )}

        {/* KNUCKLE MACRO VIEW (Detailed Close-up of Knuckle Weights) */}
        {view === 'knuckle_macro' && (
          <g id="macro-knuckle" transform="translate(40, 60) scale(0.85)" filter="url(#glove-shadow)">
            {/* Large Knuckle Pad Base */}
            <rect x="100" y="160" width="420" height="280" rx="24" fill={theme.primaryDark} stroke={theme.trim} strokeWidth="3" />
            <rect x="110" y="170" width="400" height="260" rx="18" fill="url(#mesh-pattern)" />
            {/* Knuckle Weights Exploded Details */}
            {[0, 1, 2, 3].map((idx) => {
              const weightsData = [
                { name: 'Pod #1 (Index)', weight: '45g' },
                { name: 'Pod #2 (Middle)', weight: '45g' },
                { name: 'Pod #3 (Ring)', weight: '45g' },
                { name: 'Pod #4 (Little)', weight: '45g' },
              ];
              const xPos = 140 + idx * 88;
              return (
                <g key={idx} filter="url(#weight-depth)">
                  <rect x={xPos} y="220" width="72" height="130" rx="12" fill="url(#metal-weight)" stroke="#94A3B8" strokeWidth="2" />
                  <rect x={xPos + 6} y="226" width="60" height="16" rx="4" fill="url(#metal-shine)" />
                  <circle cx={xPos + 36} cy="275" r="8" fill="#1565D8" />
                  <text x={xPos + 36} cy="278" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle">
                    {idx + 1}
                  </text>
                  <text x={xPos + 36} y="318" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">
                    {weightsData[idx].weight}
                  </text>
                  <text x={xPos + 36} y="334" fill="#94A3B8" fontSize="8" textAnchor="middle">
                    module
                  </text>
                </g>
              );
            })}
            <text x="310" y="405" fill="#FFFFFF" fontSize="14" fontWeight="800" letterSpacing="1" textAnchor="middle">
              MODULAR WEIGHT SYSTEM
            </text>
          </g>
        )}

        {/* ========================================================
            INTERACTIVE HOTSPOTS & ANNOTATIONS
           ======================================================== */}
      </svg>

    </div>
  );
};
