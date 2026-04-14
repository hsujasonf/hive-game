'use client';

export const TreeStumpHomeBg = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1920 1080"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A90C4"/>
        <stop offset="40%" stopColor="#72B5E0"/>
        <stop offset="70%" stopColor="#A0D4F0"/>
        <stop offset="100%" stopColor="#C8E8F8"/>
      </linearGradient>
      <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5A8A35"/>
        <stop offset="30%" stopColor="#4A7A2E"/>
        <stop offset="100%" stopColor="#3B6324"/>
      </linearGradient>
      <linearGradient id="bark" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4A2E1A"/>
        <stop offset="15%" stopColor="#5C3A22"/>
        <stop offset="35%" stopColor="#6B4226"/>
        <stop offset="50%" stopColor="#7A4E2E"/>
        <stop offset="65%" stopColor="#6B4226"/>
        <stop offset="85%" stopColor="#5C3A22"/>
        <stop offset="100%" stopColor="#4A2E1A"/>
      </linearGradient>
      <radialGradient id="topWood" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D4A85C"/>
        <stop offset="40%" stopColor="#C89B50"/>
        <stop offset="80%" stopColor="#B08040"/>
        <stop offset="100%" stopColor="#8B6530"/>
      </radialGradient>
      <linearGradient id="hLeafA" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5CAD3A"/>
        <stop offset="100%" stopColor="#3D8B20"/>
      </linearGradient>
      <linearGradient id="hLeafB" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6BC04A"/>
        <stop offset="100%" stopColor="#4A9E30"/>
      </linearGradient>
      <linearGradient id="hLeafC" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#78D050"/>
        <stop offset="100%" stopColor="#50A830"/>
      </linearGradient>
      <linearGradient id="hLeafD" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8ADA60"/>
        <stop offset="100%" stopColor="#5CB840"/>
      </linearGradient>
      <linearGradient id="treeTrunk" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4A3020"/>
        <stop offset="50%" stopColor="#5C3E28"/>
        <stop offset="100%" stopColor="#3E2818"/>
      </linearGradient>
      <radialGradient id="foliageA" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor="#4A9030"/>
        <stop offset="60%" stopColor="#3A7825"/>
        <stop offset="100%" stopColor="#2D601C"/>
      </radialGradient>
      <radialGradient id="foliageB" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor="#508E35"/>
        <stop offset="60%" stopColor="#3E7A28"/>
        <stop offset="100%" stopColor="#2C5C1A"/>
      </radialGradient>
      <filter id="hShadow">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#00000035"/>
      </filter>
      <filter id="hSoftShadow">
        <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#00000025"/>
      </filter>
      <filter id="hTreeShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00000020"/>
      </filter>
      <radialGradient id="hVignette" cx="50%" cy="50%" r="70%">
        <stop offset="55%" stopColor="transparent"/>
        <stop offset="100%" stopColor="#00000015"/>
      </radialGradient>
    </defs>

    {/* Sky */}
    <rect width="1920" height="1080" fill="url(#sky)"/>

    {/* Clouds */}
    <g opacity="0.65">
      <ellipse cx="250" cy="130" rx="130" ry="50" fill="white"/>
      <ellipse cx="340" cy="110" rx="95" ry="48" fill="white"/>
      <ellipse cx="190" cy="120" rx="80" ry="38" fill="white"/>
      <ellipse cx="900" cy="170" rx="150" ry="55" fill="white"/>
      <ellipse cx="1010" cy="150" rx="110" ry="50" fill="white"/>
      <ellipse cx="820" cy="160" rx="90" ry="42" fill="white"/>
      <ellipse cx="550" cy="80" rx="110" ry="42" fill="white"/>
      <ellipse cx="620" cy="65" rx="75" ry="36" fill="white"/>
      <ellipse cx="1600" cy="100" rx="80" ry="30" fill="white" opacity="0.5"/>
    </g>

    {/* Distant hills */}
    <path d="M0,520 Q200,440 400,480 Q600,430 800,460 Q1000,410 1200,450 Q1400,420 1600,460 Q1800,430 1920,470 L1920,620 L0,620Z" fill="#6A9E48" opacity="0.4"/>
    <path d="M0,540 Q300,490 500,510 Q700,480 960,500 Q1200,470 1400,500 Q1650,480 1920,510 L1920,620 L0,620Z" fill="#5A8E3A" opacity="0.5"/>

    {/* Background trees */}
    <g filter="url(#hTreeShadow)" opacity="0.7">
      <rect x="120" y="380" width="30" height="200" fill="url(#treeTrunk)"/>
      <ellipse cx="135" cy="340" rx="70" ry="90" fill="url(#foliageA)"/>
      <ellipse cx="115" cy="360" rx="50" ry="65" fill="#3E7A28" opacity="0.6"/>
      <rect x="350" y="400" width="26" height="180" fill="url(#treeTrunk)"/>
      <ellipse cx="363" cy="360" rx="60" ry="80" fill="url(#foliageB)"/>
      <rect x="680" y="390" width="28" height="190" fill="url(#treeTrunk)"/>
      <ellipse cx="694" cy="345" rx="65" ry="85" fill="url(#foliageA)"/>
      <rect x="1100" y="370" width="32" height="210" fill="url(#treeTrunk)"/>
      <ellipse cx="1116" cy="325" rx="75" ry="95" fill="url(#foliageB)"/>
      <rect x="1750" y="395" width="26" height="185" fill="url(#treeTrunk)"/>
      <ellipse cx="1763" cy="355" rx="60" ry="78" fill="url(#foliageA)"/>
    </g>

    {/* Ground */}
    <path d="M0,580 Q480,560 960,570 Q1440,560 1920,580 L1920,1080 L0,1080Z" fill="url(#ground)"/>

    {/* Ground texture */}
    <ellipse cx="200" cy="700" rx="90" ry="25" fill="#6B5230" opacity="0.12"/>
    <ellipse cx="700" cy="750" rx="80" ry="22" fill="#6B5230" opacity="0.1"/>
    <ellipse cx="400" cy="850" rx="120" ry="30" fill="#6B5230" opacity="0.08"/>

    {/* Ground grass */}
    <g stroke="#3D7520" strokeWidth="1.5" fill="none" opacity="0.25">
      <path d="M100,620 Q103,608 106,620"/><path d="M250,640 Q253,628 256,640"/>
      <path d="M400,625 Q403,612 406,625"/><path d="M550,635 Q553,622 556,635"/>
      <path d="M700,620 Q703,608 706,620"/><path d="M850,630 Q853,618 856,630"/>
      <path d="M1050,625 Q1053,612 1056,625"/><path d="M1200,635 Q1203,622 1206,635"/>
      <path d="M1500,630 Q1503,618 1506,630"/><path d="M1800,635 Q1803,622 1806,635"/>
    </g>

    {/* Stump shadow */}
    <ellipse cx="1380" cy="740" rx="260" ry="50" fill="#1a1a1a" opacity="0.18"/>

    {/* Tree stump */}
    <g filter="url(#hShadow)">
      {/* Roots */}
      <path d="M1120,730 Q1070,740 1030,760 Q1060,745 1100,735Z" fill="#5C3A22"/>
      <path d="M1140,740 Q1080,755 1040,780 Q1070,760 1120,745Z" fill="#4A2E1A"/>
      <path d="M1600,730 Q1650,740 1690,760 Q1660,745 1620,735Z" fill="#5C3A22"/>
      <path d="M1580,740 Q1640,755 1680,780 Q1650,760 1600,745Z" fill="#4A2E1A"/>
      <ellipse cx="1200" cy="735" rx="40" ry="12" fill="#5C3A22"/>
      <ellipse cx="1520" cy="735" rx="35" ry="10" fill="#5C3A22"/>
      <ellipse cx="1360" cy="742" rx="50" ry="14" fill="#4A2E1A"/>

      {/* Trunk */}
      <path d="M1160,510 Q1155,560 1150,620 Q1145,680 1148,730 Q1250,750 1360,752 Q1470,750 1572,730 Q1575,680 1570,620 Q1565,560 1560,510 Z" fill="url(#bark)"/>

      {/* Bark texture */}
      <g stroke="#3D2515" strokeWidth="1.8" opacity="0.3" fill="none">
        <path d="M1200,520 Q1205,600 1200,680 Q1198,720 1202,745"/>
        <path d="M1260,515 Q1258,590 1262,670 Q1265,710 1260,748"/>
        <path d="M1320,512 Q1322,600 1318,680 Q1320,720 1322,750"/>
        <path d="M1380,512 Q1378,590 1382,670 Q1380,715 1378,750"/>
        <path d="M1440,514 Q1442,600 1438,680 Q1440,718 1442,748"/>
        <path d="M1500,518 Q1498,595 1502,675 Q1500,715 1498,742"/>
      </g>

      {/* Bark knots */}
      <ellipse cx="1280" cy="630" rx="18" ry="25" fill="#3D2515" opacity="0.45"/>
      <ellipse cx="1280" cy="630" rx="10" ry="15" fill="#2A1A0E" opacity="0.35"/>
      <ellipse cx="1460" cy="570" rx="14" ry="20" fill="#3D2515" opacity="0.4"/>

      {/* Cut top */}
      <ellipse cx="1360" cy="510" rx="205" ry="55" fill="url(#topWood)"/>

      {/* Tree rings */}
      <g fill="none" strokeWidth="1.8" opacity="0.35">
        <ellipse cx="1360" cy="510" rx="8" ry="4" stroke="#8B6530"/>
        <ellipse cx="1359" cy="509" rx="25" ry="10" stroke="#A07034"/>
        <ellipse cx="1361" cy="511" rx="48" ry="16" stroke="#B08040"/>
        <ellipse cx="1359" cy="509" rx="72" ry="22" stroke="#A07034"/>
        <ellipse cx="1361" cy="511" rx="96" ry="28" stroke="#B58845"/>
        <ellipse cx="1359" cy="509" rx="120" ry="34" stroke="#A07034"/>
        <ellipse cx="1361" cy="511" rx="145" ry="40" stroke="#B08040"/>
        <ellipse cx="1359" cy="509" rx="168" ry="45" stroke="#A57838"/>
        <ellipse cx="1361" cy="510" rx="190" ry="50" stroke="#9A6E30"/>
      </g>

      {/* Center pith */}
      <ellipse cx="1360" cy="510" rx="4" ry="2.5" fill="#7A5A28" opacity="0.6"/>

      {/* Cracks */}
      <g stroke="#8B6B3D" strokeWidth="1.5" fill="none" opacity="0.45">
        <path d="M1360,510 Q1345,495 1330,480"/>
        <path d="M1360,510 Q1390,500 1430,490"/>
        <path d="M1360,510 Q1350,525 1335,535"/>
        <path d="M1360,510 Q1385,520 1410,530"/>
      </g>

      <ellipse cx="1360" cy="510" rx="205" ry="55" fill="none" stroke="#8B7040" strokeWidth="2" opacity="0.3"/>
    </g>

    {/* Grass tufts */}
    <g fill="#4CAF30">
      <path d="M1220,760 Q1215,720 1210,760 Q1205,700 1200,760 Q1195,730 1190,760Z"/>
      <path d="M1320,770 Q1317,730 1314,770 Q1309,710 1304,770Z"/>
      <path d="M1420,765 Q1425,725 1430,765 Q1435,705 1440,765Z"/>
      <path d="M1530,758 Q1535,720 1540,758 Q1545,700 1550,758Z"/>
    </g>
    <g fill="#5CB840">
      <path d="M100,600 Q95,560 90,600 Q85,540 80,600 Q75,570 70,600Z"/>
      <path d="M200,610 Q197,575 194,610 Q189,555 184,610Z"/>
      <path d="M500,600 Q505,560 510,600 Q515,545 520,600Z"/>
      <path d="M800,600 Q805,560 810,600 Q815,545 820,600Z"/>
      <path d="M1150,755 Q1145,720 1140,755 Q1135,700 1130,755Z"/>
      <path d="M1570,755 Q1575,720 1580,755 Q1585,700 1590,755Z"/>
    </g>

    {/* Leaves */}
    <g filter="url(#hSoftShadow)">
      <g transform="translate(1080,730) rotate(40)">
        <path d="M0,0 Q16,-32 0,-56 Q-16,-32 0,0Z" fill="url(#hLeafA)"/>
        <line x1="0" y1="0" x2="0" y2="-52" stroke="#2D6B15" strokeWidth="1.3"/>
      </g>
      <g transform="translate(1640,725) rotate(-30)">
        <path d="M0,0 Q14,-28 0,-50 Q-14,-28 0,0Z" fill="url(#hLeafB)"/>
        <line x1="0" y1="0" x2="0" y2="-46" stroke="#2D6B15" strokeWidth="1.3"/>
      </g>
      <g transform="translate(300,380) rotate(55)" opacity="0.75">
        <path d="M0,0 Q14,-28 0,-48 Q-14,-28 0,0Z" fill="#6BC04A"/>
        <line x1="0" y1="0" x2="0" y2="-44" stroke="#2D6B15" strokeWidth="1"/>
      </g>
      <g transform="translate(150,650) rotate(60)" opacity="0.7">
        <path d="M0,0 Q16,-32 0,-56 Q-16,-32 0,0Z" fill="url(#hLeafA)"/>
        <line x1="0" y1="0" x2="0" y2="-52" stroke="#2D6B15" strokeWidth="1.3"/>
      </g>
      <g transform="translate(600,680) rotate(-45)" opacity="0.7">
        <path d="M0,0 Q16,-32 0,-56 Q-16,-32 0,0Z" fill="url(#hLeafB)"/>
        <line x1="0" y1="0" x2="0" y2="-52" stroke="#2D6B15" strokeWidth="1.3"/>
      </g>
    </g>

    {/* Flowers */}
    <g>
      <circle cx="200" cy="700" r="5" fill="#FFE066"/><circle cx="200" cy="700" r="2.5" fill="#FFCC00"/>
      <circle cx="750" cy="710" r="4" fill="white"/><circle cx="750" cy="710" r="2" fill="#FFE066"/>
      <circle cx="380" cy="680" r="4" fill="#FF9EAA"/><circle cx="380" cy="680" r="2" fill="#FF6B7A"/>
      <circle cx="550" cy="690" r="5" fill="#C9AAFF"/><circle cx="550" cy="690" r="2.5" fill="#A080DD"/>
      <circle cx="450" cy="850" r="5" fill="#FF9EAA"/><circle cx="450" cy="850" r="2.5" fill="#FF6B7A"/>
      <circle cx="1780" cy="700" r="4" fill="#FFE066"/><circle cx="1780" cy="700" r="2" fill="#FFCC00"/>
    </g>

    {/* Mushrooms */}
    <g>
      <rect x="1118" y="725" width="5" height="10" rx="2" fill="#E8D8C0"/>
      <ellipse cx="1120.5" cy="725" rx="9" ry="6" fill="#C05040"/>
      <circle cx="1117" cy="723" r="1.5" fill="white" opacity="0.7"/>
      <circle cx="1124" cy="722" r="1.5" fill="white" opacity="0.7"/>
    </g>

    {/* Pebbles */}
    <g fill="#8B8070" opacity="0.3">
      <ellipse cx="300" cy="720" rx="8" ry="5" transform="rotate(10,300,720)"/>
      <ellipse cx="700" cy="730" rx="7" ry="4" transform="rotate(-15,700,730)"/>
      <ellipse cx="1800" cy="770" rx="9" ry="5" transform="rotate(20,1800,770)"/>
    </g>

    {/* Light rays */}
    <g opacity="0.05">
      <polygon points="1360,0 1200,1080 1250,1080" fill="white"/>
      <polygon points="1360,0 1470,1080 1520,1080" fill="white"/>
    </g>

    {/* Vignette */}
    <rect width="1920" height="1080" fill="url(#hVignette)"/>
  </svg>
);
