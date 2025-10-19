# Learning Module System - Visual UI Guide

## 🎨 User Interface Overview

This document provides a visual description of the UI components and user flow.

---

## 1. Landing Page (`/learn`)

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ Dhaniverse Learning                    🏆 0 badges       │ │
│ │ Master finance from fundamentals       🎯 0% complete    │ │
│ └───────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ HERO SECTION (Blue Gradient)                                   │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ Start Your Financial Education Journey                    │ │
│ │ Learn everything from how money works to trading...       │ │
│ │                                                             │ │
│ │ [▶ Start Learning]        ┌──────┬──────┬──────┬──────┐  │ │
│ │                           │  6   │  35  │ 240+ │ 100+ │  │ │
│ │                           │Levels│Mods  │Lessons│Hours│  │ │
│ │                           └──────┴──────┴──────┴──────┘  │ │
│ └───────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ LEVEL 1: FOUNDATION                                             │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ [1] Understanding Money                    [Beginner] [Start]││
│ │     Grasp what money is, its evolution...                   ││
│ │     📖 6 lessons  ⏱ 45 min  🏆 Badge                        ││
│ └─────────────────────────────────────────────────────────────┘│
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ [🔒] Banking System Fundamentals           [Beginner] [🔒]  ││
│ │      Understand how banks operate...                        ││
│ │      📖 7 lessons  ⏱ 55 min  🏆 Badge                       ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ [More modules...]                                               │
│                                                                 │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │              🚀 More Levels Coming Soon                   │ │
│ │   Complete Level 1 to unlock Level 2:                    │ │
│ │   Corporate & Investment Fundamentals                     │ │
│ └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Module Viewer - Lesson Mode (`/learn/1`)

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (White, Sticky)                                          │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ [←] Level 1  Beginner                     ⏱ 45 min       │ │
│ │     Understanding Money                   🎯 3/6 lessons  │ │
│ │     ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░  50%                          │ │
│ └───────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ SIDEBAR (25%)          │  MAIN CONTENT (75%)                    │
│ ┌──────────────────┐  │ ┌───────────────────────────────────┐ │
│ │ 📖 Lessons       │  │ │ LESSON HEADER (Blue Gradient)      │ │
│ │                  │  │ │ Lesson 1 • 6 minutes               │ │
│ │ [✓] 1. What is   │  │ │ What is Money?                     │ │
│ │     Money?       │  │ │ The Foundation of Economic Exchange│ │
│ │                  │  │ └───────────────────────────────────┘ │
│ │ [•] 2. Three     │  │                                        │
│ │     Functions    │  │ ┌─────────────────────────────────┐ │
│ │                  │  │ │ [TEXT BLOCK]                    │ │
│ │ [•] 3. Evolution │  │ │ Money is anything that is...    │ │
│ │                  │  │ └─────────────────────────────────┘ │
│ │ [•] 4. Properties│  │                                        │
│ │                  │  │ ┌─────────────────────────────────┐ │
│ │ [•] 5. Value     │  │ │ 📘 DEFINITION (Blue Box)        │ │
│ │                  │  │ │ Money: A medium of exchange...  │ │
│ │ [•] 6. Creation  │  │ └─────────────────────────────────┘ │
│ │                  │  │                                        │
│ │ ─────────────────│  │ ┌─────────────────────────────────┐ │
│ │                  │  │ │ 💡 EXAMPLE (Green Box)          │ │
│ │ [🏆] Take Quiz   │  │ │ The Barter Problem              │ │
│ │ (Complete all)   │  │ │ A fisherman catches fish...     │ │
│ │                  │  │ └─────────────────────────────────┘ │
│ │ Previous:        │  │                                        │
│ │ None             │  │ [More content blocks...]            │
│ └──────────────────┘  │                                        │
│                       │ ┌───────────────────────────────────┐ │
│                       │ │ QUICK CHECK (Purple Box)          │ │
│                       │ │ 🏆 What is the main problem?      │ │
│                       │ │ ○ A. Making things expensive      │ │
│                       │ │ ● B. Double coincidence of wants  │ │
│                       │ │ ○ C. Creating wealth              │ │
│                       │ │ ○ D. Printing paper notes         │ │
│                       │ │ [✓ Correct! Explanation shown]    │ │
│                       │ └───────────────────────────────────┘ │
│                       │                                        │
│                       │ ┌───────────────────────────────────┐ │
│                       │ │ [← Previous]  3/6  [Next →]       │ │
│                       │ └───────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Content Block Examples

### Timeline Block
```
┌─────────────────────────────────────────────────┐
│ TIMELINE                                        │
│                                                 │
│  [1] ──── 10,000 BCE - 3,000 BCE               │
│   │       Barter System                        │
│   │       Direct exchange of goods...          │
│   │       Example: Trading 5 chickens...       │
│   │                                            │
│  [2] ──── 3,000 BCE - 600 BCE                 │
│   │       Commodity Money                      │
│   │       Objects with intrinsic value...      │
│   │       Example: Cowrie shells...            │
│   │                                            │
│  [3] ──── 600 BCE - 1,000 CE                  │
│         Metal Coins                            │
│         Standardized coins...                  │
│         Example: First coins in Lydia...       │
└─────────────────────────────────────────────────┘
```

### Comparison Table
```
┌─────────────────────────────────────────────────────────┐
│ Testing Different Items as Money                       │
├──────────┬──────────┬──────────┬──────────┬───────────┤
│ Item     │ Medium   │ Unit     │ Store    │ Overall   │
├──────────┼──────────┼──────────┼──────────┼───────────┤
│ Rupee    │ ✓ Exc.   │ ✓ Exc.   │ ⚠ Good   │ Strong    │
│ Gold     │ ✗ Poor   │ ⚠ Mod.   │ ✓ Exc.   │ Store>Med │
│ Veggies  │ ⚠ Local  │ ✗ Poor   │ ✗ Bad    │ Not good  │
└──────────┴──────────┴──────────┴──────────┴───────────┘
```

### Property Grid
```
┌──────────────────────┬──────────────────────┐
│ DURABILITY           │ PORTABILITY          │
│ Must last over time  │ Easy to carry        │
│ ✓ Metal coins last   │ ✓ Paper in wallet    │
│ ✗ Vegetables rot     │ ✗ Gold bars heavy    │
├──────────────────────┼──────────────────────┤
│ DIVISIBILITY         │ UNIFORMITY           │
│ Break into smaller   │ Each unit identical  │
│ ✓ ₹1000 = 100×₹10   │ ✓ All ₹500 equal     │
│ ✗ Can't divide cow   │ ✗ Diamonds vary      │
└──────────────────────┴──────────────────────┘
```

### Formula Block
```
┌─────────────────────────────────────────────┐
│ 🧮 Money Multiplier Formula                │
│                                             │
│ ┌─────────────────────────────────────────┐│
│ │ Money Multiplier = 1 / Reserve Ratio    ││
│ └─────────────────────────────────────────┘│
│                                             │
│ Example:                                    │
│ With 4% reserve requirement:                │
│ Multiplier = 1 / 0.04 = 25                  │
│                                             │
│ ₹10,000 deposit → ₹2,50,000 money supply   │
│                                             │
│ Note: Theoretical maximum; real-world lower │
└─────────────────────────────────────────────┘
```

---

## 4. Quiz Start Screen

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              ┌───────────┐                             │
│              │    🏆     │                             │
│              └───────────┘                             │
│                                                         │
│           🎉 Congratulations!                          │
│      You've completed all lessons                      │
│                                                         │
│       Understanding Money - Final Assessment           │
│       Test your knowledge of money fundamentals        │
│                                                         │
│   ┌────────┐  ┌────────┐  ┌────────┐                 │
│   │   10   │  │   15   │  │   70%  │                 │
│   │Questions│ │ Minutes│  │To Pass │                 │
│   └────────┘  └────────┘  └────────┘                 │
│                                                         │
│   ┌─────────────────────────────────────────────┐    │
│   │ ⚠ Before You Start                          │    │
│   │ • You have 15 minutes to complete           │    │
│   │ • You need 70% to pass this module          │    │
│   │ • You can review your answers               │    │
│   │ • Timer auto-submits when it runs out       │    │
│   │ • You can retake the quiz if needed         │    │
│   └─────────────────────────────────────────────┘    │
│                                                         │
│            [      Start Quiz      ]                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Quiz In Progress

```
┌─────────────────────────────────────────────────────────┐
│ QUIZ HEADER (Purple Gradient)                           │
│ Understanding Money - Final Assessment    ⏱ 12:34      │
│ 7 of 10 answered                          Time remaining│
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░  70%                              │
└─────────────────────────────────────────────────────────┘
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ [1] Which of the following is NOT a function?       ││
│ │     10 points                                  [✓]  ││
│ │                                                      ││
│ │     [A] Medium of exchange                          ││
│ │     [B] Store of value                              ││
│ │     [●] Source of government revenue                ││
│ │     [D] Unit of account                             ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ [2] The main problem money solves is:               ││
│ │     10 points                                        ││
│ │                                                      ││
│ │     [A] High transportation costs                   ││
│ │     [●] Double coincidence of wants                 ││
│ │     [C] Lack of government regulation               ││
│ │     [D] Unequal distribution of goods               ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ [More questions...]                                     │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ⚠ 3 question(s) remaining    [Submit Quiz ✓]       ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## 6. Quiz Results - Pass

```
┌─────────────────────────────────────────────────────────┐
│ RESULTS HEADER (Green Gradient)                         │
│                                                         │
│              ┌───────────┐                             │
│              │    🏆     │                             │
│              └───────────┘                             │
│                                                         │
│              🎉 Congratulations!                       │
│       You've successfully completed this module!       │
│                                                         │
│              ┌───────────┐                             │
│              │    80%    │                             │
│              │ Your Score│                             │
│              │    [B]    │                             │
│              └───────────┘                             │
└─────────────────────────────────────────────────────────┘
│                                                         │
│ ┌─────────┬──────────┬──────────┬────────────┐        │
│ │   8/10  │   12.5   │    70%   │     2      │        │
│ │ Correct │ Minutes  │  To Pass │  Attempts  │        │
│ └─────────┴──────────┴──────────┴────────────┘        │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ 🏆 Question Review                                  ││
│ │                                                      ││
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ [✓] Question 1                                  │││
│ │ │     Which is NOT a function of money?           │││
│ │ │     [A] Medium of exchange                      │││
│ │ │     [B] Store of value                          │││
│ │ │     [●✓] Source of government revenue           │││
│ │ │     [D] Unit of account                         │││
│ │ │                                                  │││
│ │ │     ℹ Explanation: The three functions are...   │││
│ │ └─────────────────────────────────────────────────┘││
│ │                                                      ││
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ [✗] Question 2                                  │││
│ │ │     What problem does money solve?              │││
│ │ │     [A] Transportation costs                    │││
│ │ │     [●✗] Lack of regulation (Your answer)       │││
│ │ │     [✓] Double coincidence of wants (Correct)   │││
│ │ │     [D] Unequal distribution                    │││
│ │ │                                                  │││
│ │ │     ℹ Explanation: Money primarily solves...    │││
│ │ └─────────────────────────────────────────────────┘││
│ │                                                      ││
│ │ [More questions...]                                 ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │        [Review Lessons]      [Next Module →]       ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │                      🏅                              ││
│ │         Badge Earned: Money Master                  ││
│ │    Completed Understanding Money module             ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## 7. Quiz Results - Fail

```
┌─────────────────────────────────────────────────────────┐
│ RESULTS HEADER (Orange/Red Gradient)                    │
│                                                         │
│              ┌───────────┐                             │
│              │    🔄     │                             │
│              └───────────┘                             │
│                                                         │
│              📚 Keep Learning!                         │
│        You're almost there! Review and try again.      │
│                                                         │
│              ┌───────────┐                             │
│              │    60%    │                             │
│              │ Your Score│                             │
│              │    [C]    │                             │
│              └───────────┘                             │
└─────────────────────────────────────────────────────────┘
│                                                         │
│ ┌─────────┬──────────┬──────────┬────────────┐        │
│ │   6/10  │   10.2   │    70%   │     1      │        │
│ │ Correct │ Minutes  │  Needed  │  Attempt   │        │
│ └─────────┴──────────┴──────────┴────────────┘        │
│                                                         │
│ [Question Review shown...]                              │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │        [🔄 Retake Quiz]                             ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## 8. Mobile View

```
┌───────────────────────┐
│ HEADER (Compact)      │
│ [←] Understanding Mon.│
│ Lvl 1 • Beginner      │
│ ▓▓▓▓▓░░░░ 50%         │
├───────────────────────┤
│ LESSON HEADER         │
│ Lesson 1 • 6 min      │
│ What is Money?        │
├───────────────────────┤
│                       │
│ [Content scrolls]     │
│                       │
│ Text blocks...        │
│                       │
│ Definition boxes...   │
│                       │
│ Examples...           │
│                       │
│ Timeline (vertical)   │
│                       │
│ Quick check...        │
│                       │
├───────────────────────┤
│ [← Prev] 1/6 [Next →]│
└───────────────────────┘
```

---

## 9. Color Palette

### Primary Colors
- **Blue**: `#2563EB` (blue-600)
- **Indigo**: `#4F46E5` (indigo-600)
- **Purple**: `#9333EA` (purple-600)

### Content Block Colors
- **Text**: Gray-700 on white
- **Definition**: Blue-50 bg, Blue-500 border
- **Example**: Green-50 bg, Green-500 border
- **Key Points**: Yellow-50 bg, Yellow-300 border
- **Insight**: Purple-to-Indigo gradient
- **Warning**: Orange-50 bg, Orange-300 border
- **Formula**: Teal-50 bg, Teal-300 border

### Status Colors
- **Success**: Green-500, Green-600
- **Error**: Red-500, Red-600
- **Warning**: Orange-500, Yellow-500
- **Info**: Blue-500, Purple-500

---

## 10. Typography Scale

```
Heading 1 (Module Title):  text-4xl font-bold
Heading 2 (Lesson Title):  text-3xl font-bold
Heading 3 (Section):       text-2xl font-bold
Heading 4 (Subsection):    text-xl font-bold
Heading 5 (Card Title):    text-lg font-bold

Body Text:                 text-base leading-relaxed
Small Text:                text-sm
Tiny Text:                 text-xs

Labels:                    text-sm font-semibold
Buttons:                   text-base font-semibold
```

---

## 11. Spacing & Layout

### Container Widths
- Landing: `max-w-7xl` (1280px)
- Module Viewer: `max-w-7xl`
- Lesson Content: `max-w-4xl` (inside main area)

### Padding/Margins
- Section spacing: `py-12` (48px vertical)
- Card padding: `p-8` (32px all around)
- Content blocks: `mb-6` (24px bottom margin)
- Small elements: `p-4` (16px)

### Grid Layouts
- Landing modules: 1 column (full width)
- Property grid: 2 columns
- Stats grid: 3-4 columns
- Sidebar: 25% | Content: 75%

---

## 12. Interactive States

### Buttons
```
Default:    bg-blue-600 text-white
Hover:      bg-blue-700 (darker)
Active:     bg-blue-800
Disabled:   bg-gray-300 text-gray-500 cursor-not-allowed
```

### Cards
```
Default:    bg-white border-2 border-gray-200
Hover:      border-blue-300 shadow-lg transform -translate-y-1
Active:     border-blue-500
Locked:     opacity-60 cursor-not-allowed
```

### Quiz Options
```
Unselected: border-gray-300 bg-white
Selected:   border-purple-500 bg-purple-50
Correct:    border-green-500 bg-green-100
Incorrect:  border-red-500 bg-red-100
```

---

This visual guide shows the complete UI structure and how users navigate through the learning system!
