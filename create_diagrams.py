"""
Script to generate 8 high-resolution architectural and system diagrams
for the Code & Ladders Academic Project Report using Pillow.
"""

import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = "report_assets/diagrams"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load fonts
try:
    FONT_TITLE = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 26)
    FONT_SUBTITLE = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 18)
    FONT_HEADER = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 18)
    FONT_BODY_BOLD = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 15)
    FONT_BODY = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 14)
    FONT_SMALL = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 12)
    FONT_SMALL_BOLD = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 12)
except Exception:
    FONT_TITLE = ImageFont.load_default()
    FONT_SUBTITLE = ImageFont.load_default()
    FONT_HEADER = ImageFont.load_default()
    FONT_BODY_BOLD = ImageFont.load_default()
    FONT_BODY = ImageFont.load_default()
    FONT_SMALL = ImageFont.load_default()
    FONT_SMALL_BOLD = ImageFont.load_default()

# Color palette
C_BG = (248, 250, 252)          # Slate 50
C_CARD_BG = (255, 255, 255)     # White
C_BORDER = (203, 213, 225)      # Slate 300
C_BORDER_ACTIVE = (99, 102, 241) # Indigo 500
C_TEXT_MAIN = (15, 23, 42)      # Slate 900
C_TEXT_MUTED = (71, 85, 105)    # Slate 600
C_NAVY = (30, 58, 138)          # Blue 900
C_BLUE = (37, 99, 235)          # Blue 600
C_BLUE_LIGHT = (239, 246, 255)  # Blue 50
C_INDIGO_LIGHT = (238, 242, 255)# Indigo 50
C_PURPLE = (126, 34, 206)       # Purple 700
C_PURPLE_LIGHT = (250, 245, 255)# Purple 50
C_GREEN = (16, 185, 129)        # Emerald 500
C_GREEN_LIGHT = (236, 253, 245) # Emerald 50
C_AMBER = (217, 119, 6)         # Amber 600
C_AMBER_LIGHT = (254, 243, 199) # Amber 50
C_RED = (225, 29, 72)           # Rose 600
C_RED_LIGHT = (255, 241, 242)   # Rose 50
C_LINE = (100, 116, 139)        # Slate 500


def draw_arrow(draw, start, end, color=C_LINE, width=2, arrow_size=10):
    """Draw a line with an arrowhead at the end."""
    x1, y1 = start
    x2, y2 = end
    draw.line([x1, y1, x2, y2], fill=color, width=width)
    
    # Calculate arrowhead angle
    import math
    angle = math.atan2(y2 - y1, x2 - x1)
    angle1 = angle + math.pi * 5 / 6
    angle2 = angle - math.pi * 5 / 6
    
    p1 = (x2 + arrow_size * math.cos(angle1), y2 + arrow_size * math.sin(angle1))
    p2 = (x2 + arrow_size * math.cos(angle2), y2 + arrow_size * math.sin(angle2))
    draw.polygon([end, p1, p2], fill=color)


def draw_card(draw, rect, title, items, fill=C_CARD_BG, border=C_BORDER, header_bg=None, text_color=C_TEXT_MAIN):
    """Draw a structured component/card with title and bullet points."""
    x1, y1, x2, y2 = rect
    draw.rounded_rectangle([x1, y1, x2, y2], radius=10, fill=fill, outline=border, width=2)
    
    header_h = 32
    if header_bg:
        draw.rounded_rectangle([x1, y1, x2, y1 + header_h], radius=8, fill=header_bg)
        # square bottom corners of header
        draw.rectangle([x1, y1 + header_h - 8, x2, y1 + header_h], fill=header_bg)
        draw.line([x1, y1 + header_h, x2, y1 + header_h], fill=border, width=1)
        draw.text((x1 + 14, y1 + 6), title, fill=(255, 255, 255), font=FONT_BODY_BOLD)
    else:
        draw.text((x1 + 14, y1 + 8), title, fill=border if border != C_BORDER else C_NAVY, font=FONT_BODY_BOLD)
        draw.line([x1, y1 + header_h, x2, y1 + header_h], fill=border, width=1)
    
    curr_y = y1 + header_h + 8
    for it in items:
        draw.text((x1 + 16, curr_y), "•  " + it, fill=text_color, font=FONT_SMALL)
        curr_y += 18


# ==============================================================================
# DIAGRAM 1: System Architecture Diagram
# ==============================================================================
def create_system_architecture():
    w, h = 1400, 950
    img = Image.new("RGB", (w, h), C_BG)
    draw = ImageDraw.Draw(img)

    # Title
    draw.text((50, 30), "System Architecture: Code & Ladders DSA Adventure", fill=C_NAVY, font=FONT_TITLE)
    draw.text((50, 68), "Multi-Tier Web-Based Architecture (Client-Side Single-Page Application)", fill=C_TEXT_MUTED, font=FONT_SUBTITLE)

    # Layer 1: Presentation Layer
    draw.rounded_rectangle([50, 110, 1350, 240], radius=12, fill=C_CARD_BG, outline=C_BLUE, width=2)
    draw.rounded_rectangle([50, 110, 1350, 145], radius=10, fill=C_BLUE)
    draw.text((70, 118), "1. PRESENTATION LAYER (USER INTERFACE)", fill=(255, 255, 255), font=FONT_HEADER)
    
    draw_card(draw, [70, 155, 340, 225], "Board Viewport", ["100 Responsive Cells", "Smooth Auto-Scroll", "Current Tile Ring"], fill=C_BLUE_LIGHT, border=C_BLUE)
    draw_card(draw, [360, 155, 630, 225], "Controls & Navigation", ["Roll Dice CTA (1-6)", "Speed Slider (0.5x-3x)", "Header Tool Bar"], fill=C_BLUE_LIGHT, border=C_BLUE)
    draw_card(draw, [650, 155, 960, 225], "Interactive Modals", ["Challenge Question Modal", "DSA Mechanic Mini-Games", "Syllabus / Exam Mode"], fill=C_BLUE_LIGHT, border=C_BLUE)
    draw_card(draw, [980, 155, 1330, 225], "Visual & Audio FX", ["SVG Snake & Ladder Overlay", "Canvas-Confetti Particles", "Web Audio Synthesizer"], fill=C_BLUE_LIGHT, border=C_BLUE)

    # Layer 2: Application Controller Layer
    draw.rounded_rectangle([50, 260, 1350, 390], radius=12, fill=C_CARD_BG, outline=C_PURPLE, width=2)
    draw.rounded_rectangle([50, 260, 1350, 295], radius=10, fill=C_PURPLE)
    draw.text((70, 268), "2. APPLICATION & GAME CONTROLLER LAYER (REACT STATE & DISPATCH)", fill=(255, 255, 255), font=FONT_HEADER)

    draw_card(draw, [70, 305, 360, 375], "useGameState Hook", ["Central Game Reducer", "Turn & Step Sequencing", "Deterministic Dispatch"], fill=C_PURPLE_LIGHT, border=C_PURPLE)
    draw_card(draw, [380, 305, 700, 375], "Movement & Dice Controller", ["Bounded RNG Roll Generator", "Step-by-Step Pawn Animation", "Bounce-Back at Tile 100"], fill=C_PURPLE_LIGHT, border=C_PURPLE)
    draw_card(draw, [720, 305, 1020, 375], "Tile Event Dispatcher", ["Checkpoint Mastery Barrier", "Optimization Ladder Climb", "Misconception Snake Drop"], fill=C_PURPLE_LIGHT, border=C_PURPLE)
    draw_card(draw, [1040, 305, 1330, 375], "Theme & Sound Context", ["Dark / Light Mode Toggle", "CSS Semantic Variable Tokens", "Synthesized Audio Triggers"], fill=C_PURPLE_LIGHT, border=C_PURPLE)

    # Layer 3: Domain & Algorithmic Engines
    draw.rounded_rectangle([50, 410, 1350, 560], radius=12, fill=C_CARD_BG, outline=C_GREEN, width=2)
    draw.rounded_rectangle([50, 410, 1350, 445], radius=10, fill=C_GREEN)
    draw.text((70, 418), "3. DOMAIN ENGINES & PEDAGOGICAL SYSTEMS", fill=(255, 255, 255), font=FONT_HEADER)

    draw_card(draw, [70, 455, 350, 545], "Economy Engine", ["XP & Level Calculation", "Streak Multiplier (1.2x-2x)", "Coins for Shop Items"], fill=C_GREEN_LIGHT, border=C_GREEN)
    draw_card(draw, [370, 455, 680, 545], "Energy Abilities", ["Hint (2⚡) / Shield (3⚡)", "Scan (3⚡) / Reroll (4⚡)", "Retry (4⚡) / Boost (5⚡)"], fill=C_GREEN_LIGHT, border=C_GREEN)
    draw_card(draw, [700, 455, 1000, 545], "Adaptive & Spaced Revision", ["SuperMemo-2 (SM-2) Interval", "Difficulty Scaling (Easy-Hard)", "Concept Weakness Tracking"], fill=C_GREEN_LIGHT, border=C_GREEN)
    draw_card(draw, [1020, 455, 1330, 545], "Error DNA Profiler", ["Cognitive Misconception Tagging", "Off-by-One / Inversion Logs", "Tailored Review Scheduling"], fill=C_GREEN_LIGHT, border=C_GREEN)

    # Layer 4: Concrete DSA Curriculum & Algorithms
    draw.rounded_rectangle([50, 580, 1350, 730], radius=12, fill=C_CARD_BG, outline=C_AMBER, width=2)
    draw.rounded_rectangle([50, 580, 1350, 615], radius=10, fill=C_AMBER)
    draw.text((70, 588), "4. DSA CURRICULUM, ALGORITHMS & INTERACTIVE MECHANICS", fill=(255, 255, 255), font=FONT_HEADER)

    draw_card(draw, [70, 625, 360, 715], "Linear DSA Modules", ["Array Bounds & Two Pointers", "Singly / Doubly Linked Lists", "Stack Expressions & Queues"], fill=C_AMBER_LIGHT, border=C_AMBER)
    draw_card(draw, [380, 625, 680, 715], "Searching & Sorting", ["Linear & Binary Search", "Quick / Merge / Bubble Sort", "Recursion & Divide-Conquer"], fill=C_AMBER_LIGHT, border=C_AMBER)
    draw_card(draw, [700, 625, 1000, 715], "Trees & Graph Algorithms", ["BST Insert / Search / Delete", "AVL Balance Tree Rotations", "BFS / DFS & Dijkstra Path"], fill=C_AMBER_LIGHT, border=C_AMBER)
    draw_card(draw, [1020, 625, 1330, 715], "Advanced & Dynamic Prog.", ["Memoization & Tabulation", "Greedy Interval Scheduling", "Backtracking & N-Queens"], fill=C_AMBER_LIGHT, border=C_AMBER)

    # Layer 5: Data & Persistence Layer
    draw.rounded_rectangle([50, 750, 1350, 900], radius=12, fill=C_CARD_BG, outline=C_NAVY, width=2)
    draw.rounded_rectangle([50, 750, 1350, 785], radius=10, fill=C_NAVY)
    draw.text((70, 758), "5. PERSISTENCE LAYER (CLIENT-SIDE WEB STORAGE - NO EXTERNAL DB)", fill=(255, 255, 255), font=FONT_HEADER)

    draw_card(draw, [70, 795, 450, 885], "Runtime React State", ["In-Memory State Machine", "Fast Re-renders via Virtual DOM", "Transient UI Dialog State"], fill=C_BLUE_LIGHT, border=C_NAVY)
    draw_card(draw, [470, 795, 890, 885], "Browser Web Storage API", ["localStorage ('snake_and_ladder_v1')", "Deterministic JSON Serialization", "Offline Game Persistence across sessions"], fill=C_BLUE_LIGHT, border=C_NAVY)
    draw_card(draw, [910, 795, 1330, 885], "Data Contracts & Schemas", ["Strict TypeScript Interfaces", "Schema Migration & Reset Guard", "Safe LocalStorage Deserialization"], fill=C_BLUE_LIGHT, border=C_NAVY)

    # Connective Flow Arrows on Right Side
    draw_arrow(draw, (700, 240), (700, 260), C_BLUE, 3)
    draw_arrow(draw, (700, 390), (700, 410), C_PURPLE, 3)
    draw_arrow(draw, (700, 560), (700, 580), C_GREEN, 3)
    draw_arrow(draw, (700, 730), (700, 750), C_AMBER, 3)

    img.save(os.path.join(OUTPUT_DIR, "system_architecture.png"))
    print("Generated system_architecture.png")


# ==============================================================================
# DIAGRAM 2: Module Architecture Diagram
# ==============================================================================
def create_module_architecture():
    w, h = 1400, 900
    img = Image.new("RGB", (w, h), C_BG)
    draw = ImageDraw.Draw(img)

    draw.text((50, 30), "Module Architecture & Component Hierarchy", fill=C_NAVY, font=FONT_TITLE)
    draw.text((50, 68), "Codebase Organization Across Presentation, Engines, Data Banks, and Algorithm Suites", fill=C_TEXT_MUTED, font=FONT_SUBTITLE)

    # Root Shell
    draw.rounded_rectangle([520, 110, 880, 170], radius=10, fill=C_NAVY, outline=C_BLUE, width=2)
    draw.text((570, 122), "App.tsx (Root Shell Component)", fill=(255, 255, 255), font=FONT_HEADER)
    draw.text((550, 146), "ThemeContext Provider • useGameState Hook", fill=C_BLUE_LIGHT, font=FONT_SMALL)

    # 4 Main Sub-Branches
    # Branch 1: Board & Viewport
    draw_arrow(draw, (600, 170), (220, 220), C_BLUE, 2)
    draw.rounded_rectangle([70, 220, 370, 520], radius=10, fill=C_CARD_BG, outline=C_BLUE, width=2)
    draw.rounded_rectangle([70, 220, 370, 260], radius=8, fill=C_BLUE)
    draw.text((90, 230), "BOARD PRESENTATION", fill=(255, 255, 255), font=FONT_HEADER)
    items_b = [
        "BoardViewport.tsx (Scroll Anchor)",
        "BoardGrid.tsx (10x10 Snake Grid)",
        "BoardCell.tsx (Tile Renderer)",
        "SnakeLadderSvg.tsx (Curved Paths)",
        "PlayerMarker.tsx (Animated Pawn)",
        "TileDetailModal.tsx (Inspect Concept)"
    ]
    cy = 275
    for ib in items_b:
        draw.text((90, cy), "• " + ib, fill=C_TEXT_MAIN, font=FONT_SMALL)
        cy += 38

    # Branch 2: Controls & Sidebars
    draw_arrow(draw, (660, 170), (520, 220), C_PURPLE, 2)
    draw.rounded_rectangle([390, 220, 690, 520], radius=10, fill=C_CARD_BG, outline=C_PURPLE, width=2)
    draw.rounded_rectangle([390, 220, 690, 260], radius=8, fill=C_PURPLE)
    draw.text((410, 230), "CONTROLS & SIDEBARS", fill=(255, 255, 255), font=FONT_HEADER)
    items_c = [
        "Header.tsx (Nav & Stats Bar)",
        "DiceControls.tsx (Roll & Journey)",
        "AutoplayBar.tsx (Auto Speed Slider)",
        "LeftSidebar.tsx (Syllabus Units)",
        "RightSidebar.tsx (Current Tile & KPIs)",
        "MobileDrawer.tsx (Responsive Nav)"
    ]
    cy = 275
    for ic in items_c:
        draw.text((410, cy), "• " + ic, fill=C_TEXT_MAIN, font=FONT_SMALL)
        cy += 38

    # Branch 3: Modals & Mini-Games
    draw_arrow(draw, (740, 170), (840, 220), C_GREEN, 2)
    draw.rounded_rectangle([710, 220, 1010, 520], radius=10, fill=C_CARD_BG, outline=C_GREEN, width=2)
    draw.rounded_rectangle([710, 220, 1010, 260], radius=8, fill=C_GREEN)
    draw.text((730, 230), "INTERACTIVE LABS & MODALS", fill=(255, 255, 255), font=FONT_HEADER)
    items_m = [
        "ChallengeModal.tsx (Questions)",
        "DSALabModal.tsx (Mechanics Hub)",
        "AVLBalanceModal / BSTBuilder",
        "StackTower / CircularQueueModal",
        "SortingRace / GraphRouteModal",
        "MistakeLogModal / ExamModeModal"
    ]
    cy = 275
    for im_item in items_m:
        draw.text((730, cy), "• " + im_item, fill=C_TEXT_MAIN, font=FONT_SMALL)
        cy += 38

    # Branch 4: Engines & State
    draw_arrow(draw, (800, 170), (1180, 220), C_AMBER, 2)
    draw.rounded_rectangle([1030, 220, 1330, 520], radius=10, fill=C_CARD_BG, outline=C_AMBER, width=2)
    draw.rounded_rectangle([1030, 220, 1330, 260], radius=8, fill=C_AMBER)
    draw.text((1050, 230), "ENGINES & LOGIC", fill=(255, 255, 255), font=FONT_HEADER)
    items_e = [
        "gameEngine.ts (Core Movement)",
        "economyEngine.ts (XP, Coins)",
        "energyEngine.ts (Abilities)",
        "adaptiveEngine.ts (Mastery)",
        "errorDnaEngine.ts (Cognitive Log)",
        "storage.ts (LocalStorage API)"
    ]
    cy = 275
    for ie in items_e:
        draw.text((1050, cy), "• " + ie, fill=C_TEXT_MAIN, font=FONT_SMALL)
        cy += 38

    # Bottom Foundation Modules
    # Data Layer Box
    draw.rounded_rectangle([70, 560, 690, 840], radius=10, fill=C_CARD_BG, outline=C_NAVY, width=2)
    draw.rounded_rectangle([70, 560, 690, 600], radius=8, fill=C_NAVY)
    draw.text((90, 570), "DATA BANKS & SYLLABUS REPOSITORIES (src/data/)", fill=(255, 255, 255), font=FONT_HEADER)
    items_data = [
        "curriculum100.ts: 100-Tile Academic Syllabus with Units & Objectives",
        "challenges/ (stage1_10.ts through stage91_100.ts): 100+ Partitioned Challenge Questions",
        "snakesAndLadders.ts, optimizationLadders.ts, intelligentSnakes.ts",
        "bossBattles.ts, bugBotScenarios.ts, boardMutations.ts, shopItems.ts"
    ]
    cy = 615
    for id_item in items_data:
        draw.text((90, cy), "• " + id_item, fill=C_TEXT_MAIN, font=FONT_SMALL)
        cy += 48

    # Concrete Algorithms Box
    draw.rounded_rectangle([710, 560, 1330, 840], radius=10, fill=C_CARD_BG, outline=C_RED, width=2)
    draw.rounded_rectangle([710, 560, 1330, 600], radius=8, fill=C_RED)
    draw.text((730, 570), "STANDALONE ALGORITHM IMPLEMENTATIONS (src/algorithms/)", fill=(255, 255, 255), font=FONT_HEADER)
    items_alg = [
        "searching.ts & sorting.ts: Linear, Binary Search, Bubble, Quick, Merge Sort",
        "trees.ts: BST Insert, Traversal (Inorder, Preorder, Postorder), AVL Balancing",
        "graphs.ts: Adjacency List Graph, BFS, DFS, Dijkstra Shortest Path",
        "stack.ts, queue.ts, circularQueue.ts, linkedList.ts, recurrence.ts"
    ]
    cy = 615
    for ia in items_alg:
        draw.text((730, cy), "• " + ia, fill=C_TEXT_MAIN, font=FONT_SMALL)
        cy += 48

    img.save(os.path.join(OUTPUT_DIR, "module_architecture.png"))
    print("Generated module_architecture.png")


# ==============================================================================
# DIAGRAM 3: Data Flow Diagram (Level 0 - Context Diagram)
# ==============================================================================
def create_dfd_level_0():
    w, h = 1300, 700
    img = Image.new("RGB", (w, h), C_BG)
    draw = ImageDraw.Draw(img)

    draw.text((50, 30), "Data Flow Diagram: Level 0 (Context Level)", fill=C_NAVY, font=FONT_TITLE)
    draw.text((50, 68), "High-Level Data Boundaries and Information Exchange", fill=C_TEXT_MUTED, font=FONT_SUBTITLE)

    # External Entity: Learner / Student
    draw.rounded_rectangle([80, 240, 320, 440], radius=12, fill=C_CARD_BG, outline=C_BLUE, width=3)
    draw.text((140, 270), "STUDENT / LEARNER", fill=C_BLUE, font=FONT_HEADER)
    draw.text((115, 310), "(External User Entity)", fill=C_TEXT_MUTED, font=FONT_BODY)
    draw.text((105, 345), "• Triggers Dice Roll", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((105, 370), "• Submits Quiz Answers", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((105, 395), "• Activates Abilities", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Process 0.0: Central Game System
    draw.ellipse([500, 190, 800, 490], fill=C_INDIGO_LIGHT, outline=C_BORDER_ACTIVE, width=3)
    draw.text((615, 270), "0.0", fill=C_NAVY, font=FONT_TITLE)
    draw.text((560, 320), "CODE & LADDERS", fill=C_NAVY, font=FONT_HEADER)
    draw.text((550, 350), "DSA Game Engine", fill=C_NAVY, font=FONT_HEADER)
    draw.text((545, 385), "(Single-Page App System)", fill=C_TEXT_MUTED, font=FONT_SMALL)

    # Data Store: Local Web Storage
    # Open-ended box representation for DFD store
    draw.line([980, 270, 1220, 270], fill=C_NAVY, width=3)
    draw.line([980, 410, 1220, 410], fill=C_NAVY, width=3)
    draw.line([980, 270, 980, 410], fill=C_NAVY, width=3)
    draw.rectangle([982, 272, 1220, 408], fill=C_BLUE_LIGHT)
    draw.text((1000, 290), "D1", fill=C_NAVY, font=FONT_HEADER)
    draw.text((1040, 290), "Web LocalStorage", fill=C_NAVY, font=FONT_HEADER)
    draw.text((1000, 330), "Key: snake_and_ladder_v1", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((1000, 355), "• Completed Tiles & Level", fill=C_TEXT_MUTED, font=FONT_SMALL)
    draw.text((1000, 375), "• XP, Coins, Energy, Streaks", fill=C_TEXT_MUTED, font=FONT_SMALL)

    # Arrows between Learner and Engine
    # Forward: Inputs
    draw_arrow(draw, (320, 290), (510, 290), C_BLUE, 2)
    draw.text((340, 268), "Dice Roll Command, Quiz Answers, Ability Triggers", fill=C_BLUE, font=FONT_SMALL_BOLD)

    # Backward: Visual & Progress Feedback
    draw_arrow(draw, (510, 390), (320, 390), C_GREEN, 2)
    draw.text((330, 400), "Board Animation, Question Prompts, XP/Score Feedback", fill=C_GREEN, font=FONT_SMALL_BOLD)

    # Arrows between Engine and Data Store
    # Write to store
    draw_arrow(draw, (790, 310), (980, 310), C_PURPLE, 2)
    draw.text((810, 288), "Serialize State Snapshot", fill=C_PURPLE, font=FONT_SMALL_BOLD)

    # Read from store
    draw_arrow(draw, (980, 370), (790, 370), C_AMBER, 2)
    draw.text((810, 380), "Load Saved Progress on Boot", fill=C_AMBER, font=FONT_SMALL_BOLD)

    img.save(os.path.join(OUTPUT_DIR, "dfd_level_0.png"))
    print("Generated dfd_level_0.png")


# ==============================================================================
# DIAGRAM 4: Data Flow Diagram (Level 1 - Functional Level)
# ==============================================================================
def create_dfd_level_1():
    w, h = 1400, 900
    img = Image.new("RGB", (w, h), C_BG)
    draw = ImageDraw.Draw(img)

    draw.text((50, 30), "Data Flow Diagram: Level 1 (Functional Decomposition)", fill=C_NAVY, font=FONT_TITLE)
    draw.text((50, 68), "Detailed Sub-Processes, Flow Pipelines, and Data Stores", fill=C_TEXT_MUTED, font=FONT_SUBTITLE)

    # External Entity: Student
    draw.rounded_rectangle([50, 340, 220, 520], radius=10, fill=C_CARD_BG, outline=C_BLUE, width=3)
    draw.text((70, 360), "STUDENT", fill=C_BLUE, font=FONT_HEADER)
    draw.text((65, 400), "User Actions:", fill=C_TEXT_MUTED, font=FONT_SMALL)
    draw.text((65, 425), "• Roll dice", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((65, 445), "• Select answer", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((65, 465), "• Activate ability", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Process 1.0: Dice & Motion Controller
    draw.rounded_rectangle([320, 160, 560, 280], radius=10, fill=C_BLUE_LIGHT, outline=C_BLUE, width=2)
    draw.text((340, 175), "1.0 Dice & Motion Controller", fill=C_BLUE, font=FONT_BODY_BOLD)
    draw.text((340, 205), "• Generate roll [1-6]", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((340, 225), "• Compute next tile index", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((340, 245), "• Animate pawn movement", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Process 2.0: Tile Evaluation & Event Dispatcher
    draw.rounded_rectangle([680, 160, 940, 280], radius=10, fill=C_PURPLE_LIGHT, outline=C_PURPLE, width=2)
    draw.text((700, 175), "2.0 Tile Event Evaluator", fill=C_PURPLE, font=FONT_BODY_BOLD)
    draw.text((700, 205), "• Inspect tile characteristics", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((700, 225), "• Checkpoint lock check", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((700, 245), "• Ladder / Snake routing", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Process 3.0: Challenge & Mini-Game Evaluator
    draw.rounded_rectangle([680, 360, 940, 480], radius=10, fill=C_GREEN_LIGHT, outline=C_GREEN, width=2)
    draw.text((700, 375), "3.0 Challenge Evaluator", fill=C_GREEN, font=FONT_BODY_BOLD)
    draw.text((700, 405), "• Retrieve syllabus question", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((700, 425), "• Verify submitted answer", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((700, 445), "• Score accuracy & speed", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Process 4.0: Progression & Economy Engine
    draw.rounded_rectangle([1060, 360, 1340, 480], radius=10, fill=C_AMBER_LIGHT, outline=C_AMBER, width=2)
    draw.text((1080, 375), "4.0 Progression Engine", fill=C_AMBER, font=FONT_BODY_BOLD)
    draw.text((1080, 405), "• Award XP & Level Up", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((1080, 425), "• Streak multiplier logic", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((1080, 445), "• Energy regen & Coin grant", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Process 5.0: Error DNA & Spaced Revision
    draw.rounded_rectangle([680, 560, 940, 680], radius=10, fill=C_RED_LIGHT, outline=C_RED, width=2)
    draw.text((700, 575), "5.0 Diagnostic & Revision", fill=C_RED, font=FONT_BODY_BOLD)
    draw.text((700, 605), "• Log cognitive mistake pattern", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((700, 625), "• Schedule SM-2 flashcard", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((700, 645), "• Adaptive difficulty scale", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Process 6.0: State Serializer & Persistence
    draw.rounded_rectangle([1060, 560, 1340, 680], radius=10, fill=C_BLUE_LIGHT, outline=C_NAVY, width=2)
    draw.text((1080, 575), "6.0 State Serializer", fill=C_NAVY, font=FONT_BODY_BOLD)
    draw.text((1080, 605), "• Validate state structure", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((1080, 625), "• Write to LocalStorage", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((1080, 645), "• Hydrate state on boot", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Data Store D1: Curriculum Bank
    draw.line([320, 590, 560, 590], fill=C_NAVY, width=2)
    draw.line([320, 670, 560, 670], fill=C_NAVY, width=2)
    draw.line([320, 590, 320, 670], fill=C_NAVY, width=2)
    draw.text((330, 600), "D1", fill=C_NAVY, font=FONT_BODY_BOLD)
    draw.text((360, 600), "Curriculum & Challenges", fill=C_NAVY, font=FONT_BODY_BOLD)
    draw.text((340, 630), "100 Tiles, Questions, Ladders, Snakes", fill=C_TEXT_MUTED, font=FONT_SMALL)

    # Data Store D2: Web LocalStorage
    draw.line([1060, 750, 1340, 750], fill=C_NAVY, width=2)
    draw.line([1060, 830, 1340, 830], fill=C_NAVY, width=2)
    draw.line([1060, 750, 1060, 830], fill=C_NAVY, width=2)
    draw.text((1070, 760), "D2", fill=C_NAVY, font=FONT_BODY_BOLD)
    draw.text((1100, 760), "Web LocalStorage", fill=C_NAVY, font=FONT_BODY_BOLD)
    draw.text((1080, 790), "Active Player State & Progress", fill=C_TEXT_MUTED, font=FONT_SMALL)

    # Connectors
    # Student to 1.0
    draw_arrow(draw, (220, 380), (320, 240), C_BLUE, 2)
    # 1.0 to 2.0
    draw_arrow(draw, (560, 220), (680, 220), C_BLUE, 2)
    # 2.0 to 3.0
    draw_arrow(draw, (810, 280), (810, 360), C_PURPLE, 2)
    # D1 to 3.0
    draw_arrow(draw, (560, 610), (680, 440), C_LINE, 2)
    # 3.0 to Student (prompt)
    draw_arrow(draw, (680, 410), (220, 430), C_GREEN, 2)
    # 3.0 to 4.0
    draw_arrow(draw, (940, 420), (1060, 420), C_GREEN, 2)
    # 3.0 to 5.0 (on error)
    draw_arrow(draw, (810, 480), (810, 560), C_RED, 2)
    # 4.0 to 6.0
    draw_arrow(draw, (1200, 480), (1200, 560), C_AMBER, 2)
    # 5.0 to 6.0
    draw_arrow(draw, (940, 620), (1060, 620), C_RED, 2)
    # 6.0 to D2
    draw_arrow(draw, (1200, 680), (1200, 750), C_NAVY, 2)

    img.save(os.path.join(OUTPUT_DIR, "dfd_level_1.png"))
    print("Generated dfd_level_1.png")


# ==============================================================================
# DIAGRAM 5: Complete Game Execution Flowchart
# ==============================================================================
def create_game_flowchart():
    w, h = 1200, 1100
    img = Image.new("RGB", (w, h), C_BG)
    draw = ImageDraw.Draw(img)

    draw.text((50, 30), "Complete Game Execution Flowchart", fill=C_NAVY, font=FONT_TITLE)
    draw.text((50, 68), "Logic Flow from Initialization to Turn Evaluation and Victory Condition", fill=C_TEXT_MUTED, font=FONT_SUBTITLE)

    cx = 600

    # Start Node
    draw.rounded_rectangle([cx - 100, 110, cx + 100, 160], radius=25, fill=C_NAVY, outline=C_BLUE, width=2)
    draw.text((cx - 35, 124), "START", fill=(255, 255, 255), font=FONT_BODY_BOLD)

    draw_arrow(draw, (cx, 160), (cx, 190), C_LINE, 2)

    # Initialize State
    draw.rectangle([cx - 160, 190, cx + 160, 250], fill=C_CARD_BG, outline=C_BORDER, width=2)
    draw.text((cx - 140, 202), "Initialize / Hydrate Game State", fill=C_TEXT_MAIN, font=FONT_BODY_BOLD)
    draw.text((cx - 140, 224), "Load LocalStorage: Position, XP, Coins", fill=C_TEXT_MUTED, font=FONT_SMALL)

    draw_arrow(draw, (cx, 250), (cx, 280), C_LINE, 2)

    # Render Board
    draw.rectangle([cx - 160, 280, cx + 160, 340], fill=C_CARD_BG, outline=C_BORDER, width=2)
    draw.text((cx - 145, 292), "Render 100-Tile Board Viewport", fill=C_TEXT_MAIN, font=FONT_BODY_BOLD)
    draw.text((cx - 135, 314), "Place Player Avatar at Current Tile", fill=C_TEXT_MUTED, font=FONT_SMALL)

    draw_arrow(draw, (cx, 340), (cx, 370), C_LINE, 2)

    # Await User Action (Dice Roll)
    draw.rectangle([cx - 160, 370, cx + 160, 430], fill=C_BLUE_LIGHT, outline=C_BLUE, width=2)
    draw.text((cx - 135, 382), "Await Input: 'Roll Dice' or Autoplay", fill=C_BLUE, font=FONT_BODY_BOLD)
    draw.text((cx - 110, 404), "Generate Random Roll: [1, 6]", fill=C_TEXT_MUTED, font=FONT_SMALL)

    draw_arrow(draw, (cx, 430), (cx, 460), C_LINE, 2)

    # Animate Movement
    draw.rectangle([cx - 160, 460, cx + 160, 510], fill=C_CARD_BG, outline=C_BORDER, width=2)
    draw.text((cx - 145, 476), "Animate Pawn Step-by-Step", fill=C_TEXT_MAIN, font=FONT_BODY_BOLD)

    draw_arrow(draw, (cx, 510), (cx, 540), C_LINE, 2)

    # Decision Diamond 1: Target > 100?
    diamond1 = [(cx, 540), (cx + 140, 580), (cx, 620), (cx - 140, 580)]
    draw.polygon(diamond1, fill=C_AMBER_LIGHT, outline=C_AMBER)
    draw.text((cx - 55, 570), "Target > 100?", fill=C_AMBER, font=FONT_BODY_BOLD)

    # Yes branch: Bounce back
    draw_arrow(draw, (cx + 140, 580), (cx + 250, 580), C_AMBER, 2)
    draw.text((cx + 155, 560), "Yes", fill=C_AMBER, font=FONT_SMALL_BOLD)
    draw.rectangle([cx + 250, 550, cx + 460, 610], fill=C_CARD_BG, outline=C_AMBER, width=2)
    draw.text((cx + 265, 564), "Bounce Back from 100", fill=C_TEXT_MAIN, font=FONT_BODY_BOLD)
    draw.text((cx + 265, 584), "New pos = 100 - (Target - 100)", fill=C_TEXT_MUTED, font=FONT_SMALL)
    draw_arrow(draw, (cx + 355, 610), (cx + 355, 660), C_LINE, 2)
    draw.line([cx + 355, 660, cx, 660], fill=C_LINE, width=2)

    # No branch
    draw_arrow(draw, (cx, 620), (cx, 660), C_LINE, 2)
    draw.text((cx + 10, 625), "No", fill=C_GREEN, font=FONT_SMALL_BOLD)

    # Decision Diamond 2: Tile Type?
    draw_arrow(draw, (cx, 660), (cx, 690), C_LINE, 2)
    draw.rectangle([cx - 170, 690, cx + 170, 750], fill=C_PURPLE_LIGHT, outline=C_PURPLE, width=2)
    draw.text((cx - 130, 702), "Evaluate Destination Tile Type", fill=C_PURPLE, font=FONT_BODY_BOLD)
    draw.text((cx - 150, 724), "Checkpoint / Ladder / Snake / Standard", fill=C_TEXT_MUTED, font=FONT_SMALL)

    # Branches for tile events
    # Left: Snake
    draw_arrow(draw, (cx - 170, 720), (180, 720), C_RED, 2)
    draw_arrow(draw, (180, 720), (180, 770), C_RED, 2)
    draw.rectangle([80, 770, 280, 840], fill=C_RED_LIGHT, outline=C_RED, width=2)
    draw.text((115, 782), "SNAKE (Misconception)", fill=C_RED, font=FONT_SMALL_BOLD)
    draw.text((95, 804), "• Slide down to snake tail", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((95, 820), "• Log error to Error DNA", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Center-Left: Standard / Checkpoint Challenge
    draw_arrow(draw, (cx - 50, 750), (cx - 50, 770), C_GREEN, 2)
    draw.rectangle([cx - 180, 770, cx + 80, 840], fill=C_GREEN_LIGHT, outline=C_GREEN, width=2)
    draw.text((cx - 150, 782), "CHECKPOINT / CHALLENGE", fill=C_GREEN, font=FONT_SMALL_BOLD)
    draw.text((cx - 170, 804), "• Present Concept Challenge", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((cx - 170, 820), "• Correct: Advance & Pass", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Right: Ladder
    draw_arrow(draw, (cx + 170, 720), (1020, 720), C_BLUE, 2)
    draw_arrow(draw, (1020, 720), (1020, 770), C_BLUE, 2)
    draw.rectangle([920, 770, 1120, 840], fill=C_BLUE_LIGHT, outline=C_BLUE, width=2)
    draw.text((950, 782), "LADDER (Optimization)", fill=C_BLUE, font=FONT_SMALL_BOLD)
    draw.text((935, 804), "• Optimal choice: Climb up", fill=C_TEXT_MAIN, font=FONT_SMALL)
    draw.text((935, 820), "• Suboptimal: Stay at base", fill=C_TEXT_MAIN, font=FONT_SMALL)

    # Rejoin lines
    draw.line([180, 840, 180, 870], fill=C_LINE, width=2)
    draw.line([cx - 50, 840, cx - 50, 870], fill=C_LINE, width=2)
    draw.line([1020, 840, 1020, 870], fill=C_LINE, width=2)
    draw.line([180, 870, 1020, 870], fill=C_LINE, width=2)
    draw_arrow(draw, (cx, 870), (cx, 900), C_LINE, 2)

    # Decision: Reached Tile 100?
    diamond2 = [(cx, 900), (cx + 130, 935), (cx, 970), (cx - 130, 935)]
    draw.polygon(diamond2, fill=C_GREEN_LIGHT, outline=C_GREEN)
    draw.text((cx - 55, 925), "Position == 100?", fill=C_GREEN, font=FONT_BODY_BOLD)

    # Yes: Victory Modal & Boss Battle
    draw_arrow(draw, (cx + 130, 935), (cx + 250, 935), C_GREEN, 2)
    draw.text((cx + 145, 915), "Yes", fill=C_GREEN, font=FONT_SMALL_BOLD)
    draw.rectangle([cx + 250, 910, cx + 460, 960], fill=C_GREEN_LIGHT, outline=C_GREEN, width=2)
    draw.text((cx + 265, 922), "VICTORY & FINAL BOSS", fill=C_GREEN, font=FONT_BODY_BOLD)
    draw.text((cx + 265, 942), "Confetti FX • Mastery Badge", fill=C_TEXT_MUTED, font=FONT_SMALL)

    # No: Update State & Save
    draw_arrow(draw, (cx, 970), (cx, 1000), C_LINE, 2)
    draw.text((cx + 10, 975), "No", fill=C_TEXT_MUTED, font=FONT_SMALL_BOLD)
    draw.rectangle([cx - 160, 1000, cx + 160, 1050], fill=C_CARD_BG, outline=C_NAVY, width=2)
    draw.text((cx - 145, 1010), "Update XP, Coins & Save to LocalStorage", fill=C_NAVY, font=FONT_BODY_BOLD)
    draw.text((cx - 110, 1030), "Loop to Next Turn / Await Input", fill=C_TEXT_MUTED, font=FONT_SMALL)

    # Loopback arrow to Await Input
    draw.line([cx - 160, 1025, 40, 1025], fill=C_LINE, width=2)
    draw.line([40, 1025, 40, 400], fill=C_LINE, width=2)
    draw_arrow(draw, (40, 400), (cx - 160, 400), C_LINE, 2)

    img.save(os.path.join(OUTPUT_DIR, "game_flowchart.png"))
    print("Generated game_flowchart.png")


# ==============================================================================
# DIAGRAM 6: Use Case Diagram
# ==============================================================================
def create_use_case_diagram():
    w, h = 1300, 900
    img = Image.new("RGB", (w, h), C_BG)
    draw = ImageDraw.Draw(img)

    draw.text((50, 30), "Use Case Diagram: Student & Code & Ladders System", fill=C_NAVY, font=FONT_TITLE)
    draw.text((50, 68), "Interactions Between Learner Actor and Implemented Game System Capabilities", fill=C_TEXT_MUTED, font=FONT_SUBTITLE)

    # Actor: Student (Left)
    ax, ay = 120, 420
    # Head
    draw.ellipse([ax - 20, ay - 90, ax + 20, ay - 50], outline=C_NAVY, width=3)
    # Body
    draw.line([ax, ay - 50, ax, ay], fill=C_NAVY, width=3)
    # Arms
    draw.line([ax - 35, ay - 30, ax + 35, ay - 30], fill=C_NAVY, width=3)
    # Legs
    draw.line([ax, ay, ax - 25, ay + 45], fill=C_NAVY, width=3)
    draw.line([ax, ay, ax + 25, ay + 45], fill=C_NAVY, width=3)
    draw.text((ax - 30, ay + 55), "STUDENT", fill=C_NAVY, font=FONT_HEADER)
    draw.text((ax - 35, ay + 80), "(Learner Actor)", fill=C_TEXT_MUTED, font=FONT_SMALL)

    # System Boundary Box
    draw.rounded_rectangle([270, 110, 1250, 860], radius=16, fill=C_CARD_BG, outline=C_BLUE, width=3)
    draw.text((300, 125), "System Boundary: Code & Ladders Educational Platform", fill=C_BLUE, font=FONT_HEADER)

    # Use Case Ellipses (Left column and Right column)
    use_cases_left = [
        ("UC-01: Roll Dice & Move Avatar", 180),
        ("UC-02: Inspect Tile Curriculum Concept", 255),
        ("UC-03: Solve Concept Challenge Question", 330),
        ("UC-04: Climb Optimization Ladder", 405),
        ("UC-05: Recover from Snake Misconception", 480),
        ("UC-06: Activate Energy Abilities (Hint, Shield, Boost)", 555),
    ]

    use_cases_right = [
        ("UC-07: Engage in DSA Mini-Games (BST, AVL, Sort)", 180),
        ("UC-08: Review Spaced Flashcards & Error DNA", 255),
        ("UC-09: Explore 100-Tile Curriculum Syllabus", 330),
        ("UC-10: Take Timed Exam Mode Assessment", 405),
        ("UC-11: Purchase Store Items & Unlock Avatars", 480),
        ("UC-12: Toggle Visual Theme (Dark / Light)", 555),
        ("UC-13: Reset Progress & View Analytics", 630),
    ]

    for title, y in use_cases_left:
        draw.ellipse([320, y, 680, y + 55], fill=C_BLUE_LIGHT, outline=C_BLUE, width=2)
        draw.text((345, y + 17), title, fill=C_NAVY, font=FONT_SMALL_BOLD)
        # Connector line from actor to use case
        draw.line([ax + 35, ay - 30, 320, y + 27], fill=C_BORDER, width=1)

    for title, y in use_cases_right:
        draw.ellipse([800, y, 1200, y + 55], fill=C_PURPLE_LIGHT, outline=C_PURPLE, width=2)
        draw.text((825, y + 17), title, fill=C_PURPLE, font=FONT_SMALL_BOLD)
        # Connector line from actor to use case
        draw.line([ax + 35, ay - 30, 800, y + 27], fill=C_BORDER, width=1)

    # Include relationship example
    draw_arrow(draw, (500, 235), (500, 330), C_LINE, 1)
    draw.text((505, 280), "<<include>>", fill=C_TEXT_MUTED, font=FONT_SMALL)

    img.save(os.path.join(OUTPUT_DIR, "use_case_diagram.png"))
    print("Generated use_case_diagram.png")


# ==============================================================================
# DIAGRAM 7: Class & State Architecture Diagram
# ==============================================================================
def create_class_state_diagram():
    w, h = 1400, 900
    img = Image.new("RGB", (w, h), C_BG)
    draw = ImageDraw.Draw(img)

    draw.text((50, 30), "TypeScript Domain Model & State Architecture", fill=C_NAVY, font=FONT_TITLE)
    draw.text((50, 68), "Key Data Structures, Interfaces, and Engine Controller Methods", fill=C_TEXT_MUTED, font=FONT_SUBTITLE)

    def draw_uml_class(draw, rect, title, attributes, methods, color=C_BLUE):
        x1, y1, x2, y2 = rect
        draw.rounded_rectangle([x1, y1, x2, y2], radius=8, fill=C_CARD_BG, outline=color, width=2)
        # Title bar
        draw.rounded_rectangle([x1, y1, x2, y1 + 32], radius=6, fill=color)
        draw.rectangle([x1, y1 + 24, x2, y1 + 32], fill=color)
        draw.text((x1 + 12, y1 + 6), title, fill=(255, 255, 255), font=FONT_BODY_BOLD)
        
        # Attributes
        cy = y1 + 38
        for attr in attributes:
            draw.text((x1 + 12, cy), "+ " + attr, fill=C_TEXT_MAIN, font=FONT_SMALL)
            cy += 18
            
        draw.line([x1, cy + 4, x2, cy + 4], fill=C_BORDER, width=1)
        cy += 8
        
        # Methods
        for m in methods:
            draw.text((x1 + 12, cy), "+ " + m, fill=C_TEXT_MUTED, font=FONT_SMALL)
            cy += 18

    # 1. GameState Interface
    attrs_gs = [
        "currentSquare: number (1-100)",
        "score: number",
        "xp: number",
        "level: number",
        "coins: number",
        "streak: number",
        "energy: number (0-10)",
        "completedSquares: number[]",
        "status: 'idle'|'rolling'|'challenge'|'won'",
        "diceValue: number (1-6)"
    ]
    methods_gs = [
        "useGameState(): GameHookState",
        "persistState(state): void",
        "hydrateState(): GameState"
    ]
    draw_uml_class(draw, [50, 120, 360, 440], "GameState (Interface)", attrs_gs, methods_gs, C_NAVY)

    # 2. CurriculumSquare Interface
    attrs_cs = [
        "id: number (1-100)",
        "topic: string",
        "unit: string",
        "description: string",
        "difficulty: 'Easy'|'Medium'|'Hard'",
        "type: 'standard'|'checkpoint'|'ladder'|'snake'",
        "ladderTarget?: number",
        "snakeTarget?: number",
        "timeComplexity?: string",
        "spaceComplexity?: string"
    ]
    methods_cs = [
        "getSquareById(id): CurriculumSquare",
        "isCheckpoint(id): boolean"
    ]
    draw_uml_class(draw, [400, 120, 720, 440], "CurriculumSquare (Interface)", attrs_cs, methods_cs, C_BLUE)

    # 3. Challenge Interface
    attrs_ch = [
        "id: string",
        "squareId: number",
        "question: string",
        "options: string[]",
        "correctIndex: number",
        "explanation: string",
        "type: 'concept'|'code'|'complexity'",
        "timeLimitSeconds: number",
        "xpReward: number",
        "coinReward: number"
    ]
    methods_ch = [
        "getChallengesForSquare(id): Challenge[]",
        "evaluateAnswer(index): boolean"
    ]
    draw_uml_class(draw, [760, 120, 1070, 440], "Challenge (Interface)", attrs_ch, methods_ch, C_PURPLE)

    # 4. LearnerProfile & ErrorDNA
    attrs_lp = [
        "masteryScores: Record<string, number>",
        "errorDna: ErrorDnaProfile",
        "spacedRevisionQueue: RevisionCard[]",
        "mistakeHistory: MistakeRecord[]",
        "achievementsUnlocked: string[]"
    ]
    methods_lp = [
        "recordMistake(tag, square): void",
        "calculateReadiness(): number",
        "getNextDueCard(): RevisionCard"
    ]
    draw_uml_class(draw, [1100, 120, 1370, 440], "LearnerProfile (Interface)", attrs_lp, methods_lp, C_RED)

    # 5. GameEngine Controller (Bottom)
    attrs_ge = [
        "MAX_SQUARES: 100",
        "ENERGY_CAP: 10",
        "STREAK_TIERS: [3, 5, 10]",
        "CHECKPOINTS: [20, 40, 60, 80]"
    ]
    methods_ge = [
        "rollDice(): Promise<number>",
        "movePlayer(steps): Promise<void>",
        "handleTileLanding(targetSquare): void",
        "submitChallengeAnswer(selectedIdx): ChallengeResult",
        "triggerEnergyAbility(abilityType): boolean",
        "checkWinningCondition(position): boolean",
        "resetGameProgress(): void"
    ]
    draw_uml_class(draw, [50, 490, 720, 850], "GameEngine (Module Controller)", attrs_ge, methods_ge, C_GREEN)

    # 6. Algorithms Suite Interface
    attrs_alg = [
        "BinarySearchTree: root, size",
        "AVLTree: root, balanceFactor",
        "Graph: adjacencyList, isDirected",
        "Stack: items, topPointer",
        "Queue: items, front, rear, capacity"
    ]
    methods_algs = [
        "binarySearch(arr, target): number",
        "quickSort(arr): number[]",
        "mergeSort(arr): number[]",
        "dijkstra(graph, start): ShortestPaths",
        "avlRotateLeft(node) / RotateRight(node)"
    ]
    draw_uml_class(draw, [760, 490, 1370, 850], "DSA Algorithmic Implementations", attrs_alg, methods_algs, C_AMBER)

    # Association lines
    draw_arrow(draw, (360, 250), (400, 250), C_BORDER, 2)
    draw_arrow(draw, (720, 250), (760, 250), C_BORDER, 2)
    draw_arrow(draw, (1070, 250), (1100, 250), C_BORDER, 2)
    draw_arrow(draw, (200, 440), (200, 490), C_NAVY, 2)
    draw_arrow(draw, (915, 440), (915, 490), C_AMBER, 2)

    img.save(os.path.join(OUTPUT_DIR, "class_state_diagram.png"))
    print("Generated class_state_diagram.png")


# ==============================================================================
# DIAGRAM 8: Deployment Architecture Diagram
# ==============================================================================
def create_deployment_diagram():
    w, h = 1300, 750
    img = Image.new("RGB", (w, h), C_BG)
    draw = ImageDraw.Draw(img)

    draw.text((50, 30), "Deployment Architecture Diagram", fill=C_NAVY, font=FONT_TITLE)
    draw.text((50, 68), "Physical & Execution Nodes: Client Browser Runtime and Static Web Hosting", fill=C_TEXT_MUTED, font=FONT_SUBTITLE)

    # Node 1: Client Device (Desktop, Laptop, Tablet, Smartphone)
    draw.rounded_rectangle([60, 140, 660, 680], radius=16, fill=C_CARD_BG, outline=C_BLUE, width=3)
    draw.rounded_rectangle([60, 140, 660, 185], radius=14, fill=C_BLUE)
    draw.text((80, 150), "<<device>> Client Hardware Node", fill=(255, 255, 255), font=FONT_HEADER)

    # Inside Client Node: Operating System & Web Browser
    draw.rounded_rectangle([90, 205, 630, 655], radius=10, fill=C_BLUE_LIGHT, outline=C_BORDER, width=2)
    draw.text((110, 220), "<<execution environment>> Modern Web Browser", fill=C_NAVY, font=FONT_BODY_BOLD)
    draw.text((110, 245), "Google Chrome • Mozilla Firefox • Microsoft Edge • Apple Safari", fill=C_TEXT_MUTED, font=FONT_SMALL)

    # Artifacts inside Browser
    draw_card(draw, [110, 275, 610, 385], "<<artifact>> React 19 Client SPA", [
        "Vite Compiled Bundle (assets/index-*.js)",
        "Tailwind CSS v4 Stylesheet (assets/index-*.css)",
        "Client-Side State Engine (Virtual DOM)"
    ], fill=C_CARD_BG, border=C_BLUE)

    draw_card(draw, [110, 405, 610, 505], "<<subsystem>> Web Audio API Synthesizer", [
        "Tone and Frequency Oscillator Generation",
        "Procedural Dice Roll Sound Effects",
        "Victory and Misconception Audio Signals"
    ], fill=C_CARD_BG, border=C_PURPLE)

    draw_card(draw, [110, 525, 610, 635], "<<database / storage>> LocalStorage API", [
        "Key-Value Document Store ('snake_and_ladder_v1')",
        "Deterministic JSON State Serialization",
        "Offline Session Recovery (Zero Network Required)"
    ], fill=C_CARD_BG, border=C_NAVY)

    # Node 2: Static Web Hosting Server / Local Dev Server
    draw.rounded_rectangle([780, 140, 1240, 680], radius=16, fill=C_CARD_BG, outline=C_GREEN, width=3)
    draw.rounded_rectangle([780, 140, 1240, 185], radius=14, fill=C_GREEN)
    draw.text((800, 150), "<<server>> Web Distribution Node", fill=(255, 255, 255), font=FONT_HEADER)

    # Inside Server Node
    draw.rounded_rectangle([810, 205, 1210, 655], radius=10, fill=C_GREEN_LIGHT, outline=C_BORDER, width=2)
    draw.text((830, 220), "<<runtime>> Local Vite Server / Static CDN Host", fill=C_NAVY, font=FONT_BODY_BOLD)
    draw.text((830, 245), "Port 5173 (Development) or Static HTTP Web Server", fill=C_TEXT_MUTED, font=FONT_SMALL)

    draw_card(draw, [830, 275, 1190, 420], "<<artifact>> Static Assets Distribution", [
        "index.html (Document Entry Point)",
        "Compiled JavaScript ES Modules",
        "Bundled CSS Assets & Icon SVGs",
        "Pawn Avatars (hero.png)"
    ], fill=C_CARD_BG, border=C_GREEN)

    draw_card(draw, [830, 440, 1190, 635], "<<architecture note>> Serverless Architecture", [
        "100% Client-Side Execution Engine",
        "No Remote Database (MySQL / Mongo NOT present)",
        "No External Authentication Server Needed",
        "Instant Offline Availability after initial load"
    ], fill=C_CARD_BG, border=C_AMBER)

    # Network Connection Pipe between Browser and Server
    draw_arrow(draw, (660, 320), (780, 320), C_BLUE, 3)
    draw_arrow(draw, (780, 360), (660, 360), C_GREEN, 3)
    draw.text((675, 290), "HTTP GET", fill=C_BLUE, font=FONT_SMALL_BOLD)
    draw.text((675, 375), "HTML/JS/CSS", fill=C_GREEN, font=FONT_SMALL_BOLD)

    img.save(os.path.join(OUTPUT_DIR, "deployment_diagram.png"))
    print("Generated deployment_diagram.png")


if __name__ == "__main__":
    create_system_architecture()
    create_module_architecture()
    create_dfd_level_0()
    create_dfd_level_1()
    create_game_flowchart()
    create_use_case_diagram()
    create_class_state_diagram()
    create_deployment_diagram()
    print("All 8 diagrams successfully created!")
