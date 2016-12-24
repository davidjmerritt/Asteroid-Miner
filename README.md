# Asteroid Miner


Forked early after initial project commit from CodingRainbow/Asteroids project from Coding Challenge 45.

[HTML Preview](http://davidjmerritt.github.io/Asteroids/)


### Instructions
    ASTEROID MINER

    SPACEBAR = FIRE/START
    ARROW-UP,W = BOOST
    ARROW-DOWN,V = PAUSE
    ARROW-LEFT = ROTATE LEFT
    ARROW-RIGHT = ROTATE RIGHT

    BREAK ASTEROID = 1 POINT
    COLLECT COAL = 5 POINTS
    COLLECT IRON = 10 POINTS
    COLLECT GOLD = 20 POINTS
    COLLECT E/e = INCREASE/DECREASE SHIELDS
    COLLECT T/t = CHANGE/REMOVE RANDOM LASER TYPE (NORMAL, BACK-FIRE, SPREAD)
    COLLECT R/r = TEMPORARILY INCREASE/DECREASE LASER RANGE
    COLLECT P/p = INCREASE/DECREASE LASER SIZE


### Features
- Instructions
- Levels - Add 1 new asteroid per level
- Score Counter
- Hit Counter - Decrease size of ship on collision with asteroid hit - 3 hits Game over man!!!
- Power-Up - 20% chance spawn per level
- Energy - 50% chance spawn per level
- Changed color of ship
- Decrease range of laser
- Added "R" Increase range of laser
- Added "r" Decrease range of laser
- Added "e" Decrease range of laser
- Added "Pause" feature
- Added overlay controller for usage on mobile (works best on iPad mini)
- Fixed Double-tap on iOS zooms on buttons
- Improved collision detection
- Added spin to asteroids
- Add dust to asteroids explosion
- Added "T" changes laser random type
- Added "t" removes laser type
- Added spread laser type
- Added back gun laser type
- Add shields to ship
- Added ores: coal, iron, gold

### Future Changes
- Power-ups spawn out of breaking up asteroids
- Redesign shield break up animation
- Running into asteroid with ship breaks asteroid
- Create more power-ups: rapid fire, temporary invincibility, grenade, faster boost, clear all
- Add purchase options: after 5 levels get store level where you can trade points for power-ups
- Leaderboard - 3 character - Top 10 saved to DB on Firebase...
- On game over ability to post to Twitter
- Expand mobile support
- Cleanup powerups method

### Bugs
