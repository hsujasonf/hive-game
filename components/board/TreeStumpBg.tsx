'use client';

export const TreeStumpBg = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1920 1080"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="woodBase" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D4A85C"/>
        <stop offset="50%" stopColor="#C89B50"/>
        <stop offset="85%" stopColor="#B08040"/>
        <stop offset="100%" stopColor="#8B6530"/>
      </radialGradient>

      <radialGradient id="rings" cx="50%" cy="50%" r="48%">
        <stop offset="0%" stopColor="#D4A85C"/>
        <stop offset="5%" stopColor="#C8974E"/>
        <stop offset="8%" stopColor="#D4A85C"/>
        <stop offset="12%" stopColor="#BA8A44"/>
        <stop offset="16%" stopColor="#D0A458"/>
        <stop offset="20%" stopColor="#C08E46"/>
        <stop offset="24%" stopColor="#D4A85C"/>
        <stop offset="28%" stopColor="#B88640"/>
        <stop offset="32%" stopColor="#CCAA58"/>
        <stop offset="36%" stopColor="#C0903E"/>
        <stop offset="40%" stopColor="#D2A654"/>
        <stop offset="44%" stopColor="#B4823C"/>
        <stop offset="48%" stopColor="#CEA050"/>
        <stop offset="52%" stopColor="#BC8C42"/>
        <stop offset="56%" stopColor="#D0A456"/>
        <stop offset="60%" stopColor="#B68A3E"/>
        <stop offset="64%" stopColor="#C89848"/>
        <stop offset="68%" stopColor="#B28040"/>
        <stop offset="72%" stopColor="#C49444"/>
        <stop offset="76%" stopColor="#AE7C3A"/>
        <stop offset="80%" stopColor="#C09040"/>
        <stop offset="84%" stopColor="#A87838"/>
        <stop offset="88%" stopColor="#B88C3E"/>
        <stop offset="92%" stopColor="#A07034"/>
        <stop offset="96%" stopColor="#8B6530"/>
        <stop offset="100%" stopColor="#6B4E22"/>
      </radialGradient>

      <radialGradient id="groundGrad" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#4A7A2E"/>
        <stop offset="50%" stopColor="#3F6B28"/>
        <stop offset="100%" stopColor="#2D5418"/>
      </radialGradient>

      <linearGradient id="leafA" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5CAD3A"/>
        <stop offset="100%" stopColor="#3D8B20"/>
      </linearGradient>
      <linearGradient id="leafB" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6BC04A"/>
        <stop offset="100%" stopColor="#4A9E30"/>
      </linearGradient>
      <linearGradient id="leafC" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#78D050"/>
        <stop offset="100%" stopColor="#50A830"/>
      </linearGradient>
      <linearGradient id="leafD" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8ADA60"/>
        <stop offset="100%" stopColor="#5CB840"/>
      </linearGradient>

      <filter id="stumpShadow">
        <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#00000050"/>
      </filter>
      <filter id="leafShadow">
        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#00000030"/>
      </filter>

      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="60%" stopColor="transparent"/>
        <stop offset="100%" stopColor="#00000020"/>
      </radialGradient>
    </defs>

    {/* Grass background */}
    <rect width="1920" height="1080" fill="url(#groundGrad)"/>

    {/* Grass texture */}
    <g opacity="0.3" stroke="#2D5418" strokeWidth="1.5" fill="none">
      <path d="M80,60 Q82,50 84,60"/><path d="M150,90 Q153,78 156,90"/>
      <path d="M50,200 Q53,188 56,200"/><path d="M200,150 Q203,138 206,150"/>
      <path d="M30,400 Q33,388 36,400"/><path d="M120,350 Q124,336 128,350"/>
      <path d="M60,600 Q63,588 66,600"/><path d="M180,550 Q183,536 186,550"/>
      <path d="M100,800 Q103,788 106,800"/><path d="M40,900 Q44,886 48,900"/>
      <path d="M200,950 Q203,938 206,950"/><path d="M160,1020 Q163,1008 166,1020"/>
      <path d="M1750,80 Q1753,68 1756,80"/><path d="M1850,150 Q1853,138 1856,150"/>
      <path d="M1700,300 Q1703,288 1706,300"/><path d="M1820,250 Q1823,238 1826,250"/>
      <path d="M1780,500 Q1783,488 1786,500"/><path d="M1860,450 Q1863,438 1866,450"/>
      <path d="M1720,700 Q1723,688 1726,700"/><path d="M1850,650 Q1853,636 1856,650"/>
      <path d="M1760,900 Q1763,888 1766,900"/><path d="M1880,850 Q1883,838 1886,850"/>
      <path d="M1700,1000 Q1703,988 1706,1000"/>
      <path d="M960,30 Q963,18 966,30"/><path d="M800,50 Q803,38 806,50"/>
      <path d="M1100,40 Q1103,28 1106,40"/>
      <path d="M700,1040 Q703,1028 706,1040"/><path d="M1200,1050 Q1203,1038 1206,1050"/>
      <path d="M960,1060 Q963,1048 966,1060"/>
    </g>

    {/* Dirt patches */}
    <ellipse cx="120" cy="300" rx="60" ry="35" fill="#6B5230" opacity="0.15"/>
    <ellipse cx="1800" cy="700" rx="50" ry="30" fill="#6B5230" opacity="0.12"/>
    <ellipse cx="300" cy="900" rx="70" ry="25" fill="#6B5230" opacity="0.1"/>
    <ellipse cx="1650" cy="200" rx="55" ry="28" fill="#6B5230" opacity="0.12"/>

    {/* Pebbles */}
    <g fill="#8B8070" opacity="0.3">
      <ellipse cx="100" cy="500" rx="8" ry="5"/>
      <ellipse cx="1830" cy="400" rx="6" ry="4"/>
      <ellipse cx="250" cy="1000" rx="7" ry="5"/>
      <ellipse cx="1700" cy="900" rx="9" ry="5"/>
    </g>

    {/* Stump shadow */}
    <ellipse cx="970" cy="550" rx="540" ry="440" fill="#1a1a1a" opacity="0.2" filter="url(#stumpShadow)"/>

    {/* Bark ring */}
    <ellipse cx="960" cy="540" rx="530" ry="430" fill="#4A2E1A"/>
    <ellipse cx="960" cy="540" rx="520" ry="420" fill="#5C3A22"/>
    <ellipse cx="960" cy="540" rx="510" ry="412" fill="#6B4226"/>

    <g fill="none" stroke="#3D2515" strokeWidth="2" opacity="0.4">
      <ellipse cx="960" cy="540" rx="525" ry="425"/>
      <ellipse cx="960" cy="540" rx="518" ry="418"/>
    </g>

    {/* Bark bumps */}
    <g fill="#5C3A22">
      <circle cx="440" cy="480" r="12"/><circle cx="455" cy="380" r="10"/>
      <circle cx="490" cy="280" r="11"/><circle cx="560" cy="200" r="9"/>
      <circle cx="660" cy="145" r="12"/><circle cx="780" cy="118" r="10"/>
      <circle cx="900" cy="110" r="11"/><circle cx="1020" cy="112" r="10"/>
      <circle cx="1140" cy="122" r="12"/><circle cx="1260" cy="148" r="9"/>
      <circle cx="1360" cy="195" r="11"/><circle cx="1430" cy="270" r="10"/>
      <circle cx="1470" cy="370" r="12"/><circle cx="1488" cy="480" r="10"/>
      <circle cx="1485" cy="600" r="11"/><circle cx="1465" cy="710" r="10"/>
      <circle cx="1420" cy="800" r="12"/><circle cx="1350" cy="870" r="9"/>
      <circle cx="1260" cy="920" r="11"/><circle cx="1140" cy="955" r="10"/>
      <circle cx="1020" cy="968" r="12"/><circle cx="900" cy="970" r="10"/>
      <circle cx="780" cy="958" r="11"/><circle cx="660" cy="930" r="10"/>
      <circle cx="560" cy="880" r="12"/><circle cx="490" cy="810" r="9"/>
      <circle cx="452" cy="720" r="11"/><circle cx="438" cy="620" r="10"/>
    </g>

    {/* Cut wood surface */}
    <ellipse cx="960" cy="540" rx="490" ry="395" fill="url(#woodBase)"/>

    {/* Tree rings */}
    <g fill="none" strokeWidth="2.5" opacity="0.35">
      <ellipse cx="960" cy="540" rx="20" ry="16" stroke="#A07034"/>
      <ellipse cx="958" cy="538" rx="45" ry="36" stroke="#B08040"/>
      <ellipse cx="962" cy="542" rx="75" ry="60" stroke="#A07034"/>
      <ellipse cx="957" cy="537" rx="105" ry="85" stroke="#B58845"/>
      <ellipse cx="963" cy="543" rx="140" ry="112" stroke="#A07034"/>
      <ellipse cx="958" cy="538" rx="175" ry="140" stroke="#B08040"/>
      <ellipse cx="962" cy="542" rx="210" ry="168" stroke="#A57838"/>
      <ellipse cx="957" cy="537" rx="245" ry="196" stroke="#B58845"/>
      <ellipse cx="963" cy="543" rx="280" ry="224" stroke="#A07034"/>
      <ellipse cx="958" cy="538" rx="315" ry="252" stroke="#B08040"/>
      <ellipse cx="962" cy="542" rx="350" ry="280" stroke="#A57838"/>
      <ellipse cx="957" cy="537" rx="385" ry="308" stroke="#B58845"/>
      <ellipse cx="963" cy="543" rx="415" ry="332" stroke="#A07034"/>
      <ellipse cx="958" cy="538" rx="445" ry="356" stroke="#B08040"/>
      <ellipse cx="962" cy="540" rx="470" ry="378" stroke="#9A6E30"/>
    </g>

    <g fill="none" strokeWidth="3.5" opacity="0.2">
      <ellipse cx="960" cy="540" rx="140" ry="112" stroke="#8B6530"/>
      <ellipse cx="960" cy="540" rx="280" ry="224" stroke="#8B6530"/>
      <ellipse cx="960" cy="540" rx="415" ry="332" stroke="#8B6530"/>
    </g>

    {/* Center pith */}
    <circle cx="960" cy="540" r="8" fill="#8B6530" opacity="0.7"/>
    <circle cx="960" cy="540" r="4" fill="#6B4E22" opacity="0.5"/>

    {/* Cracks */}
    <g stroke="#8B6B3D" strokeWidth="2.5" fill="none" opacity="0.5">
      <path d="M960,540 Q940,440 920,350 Q910,280 900,200"/>
      <path d="M960,540 Q1050,500 1150,460 Q1250,420 1350,380"/>
      <path d="M960,540 Q980,640 1000,720 Q1010,780 1020,840"/>
      <path d="M960,540 Q870,570 780,600 Q700,630 620,660"/>
      <path d="M960,540 Q1020,480 1080,420"/>
      <path d="M960,540 Q900,600 840,660"/>
    </g>

    {/* Wood grain */}
    <g stroke="#C09848" strokeWidth="1" fill="none" opacity="0.15">
      <path d="M700,300 Q800,350 850,400 Q900,450 960,540"/>
      <path d="M1200,300 Q1100,380 1050,440 Q1000,490 960,540"/>
      <path d="M600,700 Q700,650 800,600 Q880,570 960,540"/>
      <path d="M1300,750 Q1200,680 1100,620 Q1030,580 960,540"/>
    </g>

    {/* Leaves */}
    <g filter="url(#leafShadow)">
      <g transform="translate(100,200) rotate(45)">
        <path d="M0,0 Q20,-40 0,-70 Q-20,-40 0,0Z" fill="url(#leafA)"/>
        <line x1="0" y1="0" x2="0" y2="-65" stroke="#2D6B15" strokeWidth="1.5"/>
      </g>
      <g transform="translate(200,100) rotate(-30)">
        <path d="M0,0 Q18,-36 0,-64 Q-18,-36 0,0Z" fill="url(#leafB)"/>
        <line x1="0" y1="0" x2="0" y2="-60" stroke="#2D6B15" strokeWidth="1.5"/>
      </g>
      <g transform="translate(80,700) rotate(70)">
        <path d="M0,0 Q22,-44 0,-76 Q-22,-44 0,0Z" fill="url(#leafC)"/>
        <line x1="0" y1="0" x2="0" y2="-72" stroke="#2D6B15" strokeWidth="1.5"/>
      </g>
      <g transform="translate(1800,300) rotate(-55)">
        <path d="M0,0 Q20,-40 0,-70 Q-20,-40 0,0Z" fill="url(#leafB)"/>
        <line x1="0" y1="0" x2="0" y2="-65" stroke="#2D6B15" strokeWidth="1.5"/>
      </g>
      <g transform="translate(1700,150) rotate(25)">
        <path d="M0,0 Q18,-36 0,-64 Q-18,-36 0,0Z" fill="url(#leafC)"/>
        <line x1="0" y1="0" x2="0" y2="-60" stroke="#2D6B15" strokeWidth="1.5"/>
      </g>
      <g transform="translate(1850,800) rotate(-80)">
        <path d="M0,0 Q22,-44 0,-76 Q-22,-44 0,0Z" fill="url(#leafA)"/>
        <line x1="0" y1="0" x2="0" y2="-72" stroke="#2D6B15" strokeWidth="1.5"/>
      </g>
      {/* Leaves on stump */}
      <g transform="translate(780,380) rotate(50)" opacity="0.7">
        <path d="M0,0 Q14,-28 0,-48 Q-14,-28 0,0Z" fill="#5CAD3A"/>
        <line x1="0" y1="0" x2="0" y2="-44" stroke="#2D6B15" strokeWidth="1.2"/>
      </g>
      <g transform="translate(1150,700) rotate(-65)" opacity="0.65">
        <path d="M0,0 Q12,-24 0,-42 Q-12,-24 0,0Z" fill="#6BC04A"/>
        <line x1="0" y1="0" x2="0" y2="-38" stroke="#2D6B15" strokeWidth="1.2"/>
      </g>
    </g>

    {/* Grass tufts */}
    <g fill="#4CAF30">
      <path d="M380,350 Q375,310 370,350 Q365,290 360,350 Q355,320 350,350Z"/>
      <path d="M360,500 Q353,450 346,500 Q340,440 334,500Z"/>
      <path d="M370,650 Q363,600 356,650 Q350,590 344,650 Q338,610 332,650Z"/>
      <path d="M1540,350 Q1545,310 1550,350 Q1555,290 1560,350 Q1565,320 1570,350Z"/>
      <path d="M1560,500 Q1567,450 1574,500 Q1580,440 1586,500Z"/>
      <path d="M1550,650 Q1557,600 1564,650 Q1570,590 1576,650 Q1582,610 1588,650Z"/>
      <path d="M700,130 Q695,90 690,130 Q685,70 680,130Z"/>
      <path d="M850,115 Q847,80 844,115 Q839,60 834,115Z"/>
      <path d="M1070,115 Q1073,80 1076,115 Q1081,60 1086,115Z"/>
      <path d="M700,960 Q695,1000 690,960 Q685,1020 680,960Z"/>
      <path d="M1070,970 Q1073,1010 1076,970 Q1081,1030 1086,970Z"/>
    </g>

    {/* Flowers */}
    <g>
      <circle cx="130" cy="350" r="5" fill="#FFE066"/><circle cx="130" cy="350" r="2.5" fill="#FFCC00"/>
      <circle cx="280" cy="900" r="4" fill="white"/><circle cx="280" cy="900" r="2" fill="#FFE066"/>
      <circle cx="1780" cy="250" r="5" fill="#FF9EAA"/><circle cx="1780" cy="250" r="2.5" fill="#FF6B7A"/>
      <circle cx="1650" cy="850" r="4" fill="#FFE066"/><circle cx="1650" cy="850" r="2" fill="#FFCC00"/>
      <circle cx="100" cy="650" r="4" fill="#C9AAFF"/><circle cx="100" cy="650" r="2" fill="#A080DD"/>
      <circle cx="1820" cy="550" r="5" fill="white"/><circle cx="1820" cy="550" r="2.5" fill="#FFE066"/>
    </g>

    {/* Mushrooms */}
    <g>
      <rect x="430" y="680" width="6" height="12" rx="2" fill="#E8D8C0"/>
      <ellipse cx="433" cy="680" rx="10" ry="7" fill="#C05040"/>
      <circle cx="429" cy="678" r="2" fill="white" opacity="0.7"/>
      <circle cx="436" cy="676" r="1.5" fill="white" opacity="0.7"/>
      <rect x="1478" y="420" width="5" height="10" rx="2" fill="#E8D8C0"/>
      <ellipse cx="1480.5" cy="420" rx="9" ry="6" fill="#C05040"/>
      <circle cx="1477" cy="418" r="1.5" fill="white" opacity="0.7"/>
      <circle cx="1484" cy="417" r="1.5" fill="white" opacity="0.7"/>
    </g>

    {/* Vignette */}
    <rect width="1920" height="1080" fill="url(#vignette)"/>
  </svg>
);
