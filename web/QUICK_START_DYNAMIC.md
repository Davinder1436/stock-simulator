# Quick Start Guide - Dynamic Long-Term Simulator

## 🚀 How to Use the New Simulator

### Step 1: Start the Development Server
```bash
cd /Users/dave/Work/test/stock-simulator/web
npm run dev
```

### Step 2: Navigate to the Simulator
Open your browser and go to: `http://localhost:3000/longterm`

### Step 3: Select Chapter 1
Click on "Chapter 1: Basic SIP in Index Fund" card

### Step 4: Set Your Investment Strategy

1. **Go to the "Invest" Tab**
2. **Allocate Your ₹20,000 Monthly Budget:**
   - Use sliders to distribute across assets
   - Example allocation:
     - Nifty 50 Index: ₹10,000 (50%)
     - Gold: ₹5,000 (25%)
     - Government Bonds: ₹5,000 (25%)
   
3. **Click "Apply Strategy"** to activate

### Step 5: Start the Simulation
- Click the **Play** button in the Timeline Control
- Watch as months progress (1 real minute = 1 simulated month)
- Observe your portfolio grow and respond to market changes

### Step 6: React to Market Events
- Read news in the "Events & News" tab
- See how market movements affect your holdings
- Adjust your strategy if needed

### Step 7: Manage Fixed Deposits (Optional)
- Go to "Invest" tab
- Scroll to "Fixed Deposits" section
- Enter amount (minimum ₹10,000)
- Click "Create FD"
- Watch it mature over 12 months
- Break early if needed (with penalty)

## 📊 What to Watch For

### Portfolio Overview Tab
- **Net Worth**: Your total wealth
- **Total Invested**: How much you've put in
- **Portfolio Value**: Current value of investments
- **Returns**: Gains or losses (₹ and %)
- **Asset Allocation**: Pie chart showing distribution
- **Market Indicators**: Live prices and changes

### Investment Tab
- **Distribution Sliders**: Your monthly allocation
- **Current Holdings**: Real-time position details
- **Risk Indicators**: Volatility levels per asset
- **FD Management**: Create/break fixed deposits

### Events & News Tab
- **Market News**: Headlines with asset impacts
- **Teaching Moments**: Educational insights
- **Performance Summary**: Monthly returns grid

### Stats & Tax Tab
- Performance metrics
- Tax calculations (if implemented)
- Goal tracking

## 🎯 Try These Strategies

### Conservative (Low Risk)
```
Government Bonds: ₹10,000 (50%)
Fixed Deposits: ₹8,000 (40%)
Gold: ₹2,000 (10%)
```

### Balanced (Moderate Risk)
```
Nifty 50 Index: ₹10,000 (50%)
Gold: ₹5,000 (25%)
Government Bonds: ₹5,000 (25%)
```

### Aggressive (High Risk)
```
Nifty 50 Index: ₹18,000 (90%)
Gold: ₹2,000 (10%)
```

## 💡 Key Features to Experience

1. **Rupee Cost Averaging**
   - Watch how investing during market dips gets you more units
   - See the benefit over time

2. **Market Volatility**
   - Month 3: COVID crash (-5% on Nifty)
   - Month 42: Major correction (-8% on Nifty)
   - See how diversification helps

3. **FD Mechanics**
   - Create FD → locked for 12 months
   - Try breaking early → see 50% penalty
   - Wait for maturity → get full returns

4. **News Impact**
   - News appears → specific % impact shown
   - Affected assets highlighted
   - See cause and effect in real-time

5. **Compounding**
   - Returns earning returns
   - Grows exponentially over 60 months

## 🐛 Testing Scenarios

### Test 1: Basic SIP
1. Set 100% Nifty 50 (₹20,000)
2. Run simulation
3. Check if portfolio value matches market returns

### Test 2: Diversification
1. Split across all 3 assets
2. Watch during market correction (month 3)
3. Notice how gold/bonds cushion the fall

### Test 3: FD Management
1. Create ₹30,000 FD in month 1
2. Wait 12 months
3. See it mature with returns
4. OR break it early and see penalty

### Test 4: Strategy Changes
1. Start with aggressive (90% Nifty)
2. After month 3 crash, switch to balanced
3. See how portfolio adjusts

### Test 5: Full Journey
1. Run complete 60 months
2. Track final net worth
3. Compare against goal (₹15L)

## 📈 Expected Outcomes

### With Balanced Strategy (50% Nifty, 25% Gold, 25% Bonds):
- **Month 12**: ~₹2.5-2.8L net worth
- **Month 24**: ~₹5.5-6L net worth
- **Month 36**: ~₹9-10L net worth
- **Month 60**: ~₹15-17L net worth (depends on strategy adjustments)

### During Market Events:
- **Month 3 (Correction)**: Portfolio may dip -2% to -3%
- **Month 4 (Recovery)**: Bounce back +1% to +2%
- **Month 42 (Major Correction)**: -4% to -6% depending on allocation
- **Month 48 (Recovery)**: Strong bounce +3% to +5%

## 🔍 What to Check

### In Console (F12 Developer Tools):
- No errors in console
- State updates logging correctly
- Portfolio calculations accurate

### In UI:
- ✅ Portfolio values update each month
- ✅ Asset holdings show correct units and values
- ✅ News impacts match the percentages
- ✅ FDs track maturity correctly
- ✅ Distribution changes apply immediately
- ✅ Cash balance decreases when investing

## 🎓 Learning Outcomes

By the end of 60 months, you should understand:
1. **SIP Discipline**: Regular investing builds wealth
2. **Volatility Management**: Market dips are buying opportunities
3. **Diversification**: Don't put all eggs in one basket
4. **Opportunity Cost**: FDs safe but lower returns
5. **Compounding**: Time in market > timing the market

## 🛠️ Troubleshooting

### Issue: Portfolio not updating
**Fix**: Check if you clicked "Apply Strategy" after setting distribution

### Issue: Can't create FD
**Fix**: Ensure you have minimum ₹10,000 cash available

### Issue: Negative returns showing
**Fix**: This is expected during market corrections (month 3, 42)

### Issue: Distribution total exceeds ₹20k
**Fix**: Adjust sliders - system prevents saving if over 100%

## 📝 Notes

- **Simulation Speed**: Adjustable from 0.5x to 5x (default 1x)
- **Pause/Resume**: Available anytime
- **Reset**: Starts fresh from month 0
- **Skip to End**: Jump to month 60 instantly

## 🎮 Advanced Features to Try

1. **Zero Investment Month**: Set all to ₹0, watch cash accumulate
2. **All-in FD**: Create multiple FDs, see locked capital effect
3. **Market Timing**: Try changing allocation before known events
4. **Rebalancing**: Periodically adjust to maintain target allocation

## 📚 Next Steps

After mastering Chapter 1:
- Chapter 2 will add more asset classes
- Chapter 3 introduces active management
- Chapter 4 focuses on tax optimization
- Chapter 5 handles life events
- Chapter 6 covers advanced strategies

---

**Ready to start building wealth? Let's go! 🚀**
