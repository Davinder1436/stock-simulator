# Dhaniverse Market Simulator - Frontend

An interactive stock market simulation platform designed to teach trading principles through gamified, real-world scenarios.

## Features

### 🎮 Interactive Simulation
- **Real-time Market Data**: Live price updates with authentic market behavior
- **8-Minute Trading Day**: Compressed time simulation of a full trading session
- **Dynamic Order Book**: See AI bot transactions in real-time
- **News Feed**: Market-moving news events that affect prices

### 📊 Market View
- **Live Price Chart**: Real-time visualization of price movements
- **Market Statistics**: Track high, low, volume, and sentiment
- **Trend Analysis**: Identify market trends and dominant actors
- **Sentiment Index**: Monitor market psychology

### 💼 Portfolio Management
- **Starting Capital**: ₹1,00,000 initial cash
- **Buy/Sell Interface**: Easy-to-use trading controls
- **Position Tracking**: Real-time P&L and portfolio value
- **Trade History**: Complete record of all your transactions

### 📰 News & Events
- **Timestamped News**: Market news that appears at specific times
- **Sentiment Analysis**: Positive, negative, or neutral news classification
- **Impact Strength**: Visual indicators of news importance
- **Sector Context**: Understanding broader market implications

### 🎓 Learning Module
- **Pre-Simulation Briefing**: Context and key concepts before you start
- **Post-Simulation Analysis**: Detailed breakdown of what happened
- **Key Lessons**: Educational insights tied to real market behavior
- **Knowledge Quiz**: Test your understanding with interactive questions
- **Real-World Connections**: Links to actual historical market events
- **Performance Grading**: Get scored on trading and quiz performance

### 🏆 Gamification
- **Performance Score**: Combination of trading success and knowledge
- **Letter Grades**: A+ to D grading system
- **Achievement Tracking**: Monitor your progress
- **Instant Feedback**: Visual cues for successful/failed trades

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Interactive data visualization
- **Lucide React**: Beautiful icon system
- **Framer Motion**: Smooth animations

## Getting Started

### Installation

```bash
cd server/stocks-simulator/web
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
web/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main page with tabs and layout
├── components/
│   ├── MarketView.tsx       # Price chart and market stats
│   ├── OrderBook.tsx        # Bot transaction history
│   ├── Portfolio.tsx        # User portfolio and trading
│   ├── NewsFeed.tsx         # Market news display
│   ├── Timer.tsx            # Simulation timer control
│   └── LearningModule.tsx   # Post-simulation education
├── context/
│   └── SimulationContext.tsx # Global state management
├── types/
│   └── simulation.ts        # TypeScript interfaces
└── public/
    └── chapter1-data.json   # Simulation data
```

## How It Works

### State Management
The `SimulationContext` manages:
- Loading simulation data from JSON
- Timer progression (1 second = 1 simulation second)
- Portfolio state (cash, shares, trades)
- Current market data (price, volume, sentiment)
- Visible news and orders based on current time

### Data Structure
Each chapter has:
- **Simulation Metadata**: Config, difficulty, duration
- **Price Series**: Time-series price data
- **Bot Orders**: AI actor transactions with reasoning
- **Market News**: Timestamped news events
- **Learning Module**: Educational content and quizzes

### Trading Mechanics
- Buy/sell stocks at current market price
- Real-time P&L calculation
- Position tracking with average buy price
- Trade history with timestamps

### Scoring System
- **Trading Score (60%)**: Based on portfolio performance
- **Quiz Score (40%)**: Based on correct answers
- **Final Grade**: A+ to D based on total score

## Chapter Configuration

Each chapter is defined by:
- **Difficulty**: Easy (10s ticks), Medium (5s ticks), Hard (2s ticks)
- **Real Case Study**: Historical market event reference
- **Learning Objectives**: Specific skills to master
- **Actor Types**: Mix of retail, institutional, momentum traders, etc.

## Customization

### Adding New Chapters
1. Create new JSON file in format of `chapter1-data.json`
2. Place in `public/` folder
3. Update data loading in `SimulationContext.tsx`

### Modifying Difficulty
Adjust in simulation metadata:
- `tick_interval_sec`: Update frequency
- `total_ticks`: Number of data points
- `duration_minutes`: Simulation length

### Styling
- Edit `tailwind.config.ts` for theme colors
- Modify `globals.css` for custom styles
- Update component classes for UI changes

## Educational Design

The simulator teaches through:
1. **Experiential Learning**: Actually trade in simulated market
2. **Contextual Education**: News and events explain price moves
3. **Reflective Analysis**: Post-simulation breakdown of what happened
4. **Knowledge Reinforcement**: Quiz questions with explanations
5. **Real-World Connection**: Links to actual historical events

## Performance Tips

- Simulation runs at 1:1 real-time speed
- Data is pre-loaded for smooth playback
- Use pause/resume to study specific moments
- Reset to try different strategies

## Future Enhancements

- [ ] Multiple chapter selection
- [ ] Difficulty level selector
- [ ] Leaderboard and social features
- [ ] Advanced order types (limit, stop-loss)
- [ ] Multi-stock portfolios
- [ ] Options and derivatives
- [ ] Peer comparison analytics

## Support

For issues or questions, refer to the main Dhaniverse documentation.

## License

Part of the Dhaniverse project.
