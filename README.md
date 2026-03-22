<div align="center">
  <img src="https://img.shields.io/badge/Code-Arena-ffa116?style=for-the-badge&logoColor=white" alt="CodeArena" />
  <h1>CodeArena ⚔️</h1>
  <p><strong>Master Your Coding Skills & Ace Technical Interviews</strong></p>
  <p>A modern, high-performance web platform modeled after top tier competitive programming and interview preparation websites.</p>
</div>

---

## 🚀 Features

CodeArena is packed with powerful features designed for developers to practice, track their progress, and prepare for real-world interviews:

### 🎮 Core Learning Experience
- **Interactive Problem Workspace**: A robust code editor environment featuring resizable panels, problem descriptions, test case running, and solution submission.
- **Comprehensive Problem Library**: Filterable list of algorithm and data structure problems mapped by difficulty (Easy, Medium, Hard), topic tags, and company popularity.
- **Daily Challenges & Study Plans**: Curated lists of foundational problems (e.g., "Top 150 Interview Questions", "Dynamic Programming Mastery") to guide daily learning.

### 📊 Powerful Dashboard & Analytics
- **GitHub-Style Activity Heatmap**: Visually track your daily consistency over the past 365 days.
- **Progress Tracking**: Dedicated charts displaying completed problems categorized by difficulty and global rank.
- **Dynamic Streaks**: Calculates your daily active streak based on recent acceptable submissions.

### 🏢 Specialized Preparation Let
- **Companies Page**: Filter problems by top-tier tech companies (FAANG, Big N), view trending company-specific problems, and see company leaderboards.
- **Contests Platform**: Participate in dynamic Weekly and Biweekly coding contests complete with real-time countdown banners and registration systems.
- **Global Leaderboard**: Compete with others and track your ELO rating changes and global rank.

### ✨ Premium "Quality of Life" Tools
- **ArenaBot Chatbot 🤖**: An omnipresent, smart floating assistant that provides quick answers to common queries, explains platform features, and gives beginners a place to start.
- **Focus Timer (Pomodoro) 🍅**: A built-in, floating focus timer widget featuring customizable Focus, Short Break, and Long Break intervals to manage your coding sessions.
- **Global Keyboard Shortcuts ⌨️**: Navigate the platform like a pro! Press `?` anywhere to bring up a master list of shortcuts. (e.g., `R` to pick a random problem instantly, `G`+`H` to go home, etc.)
- **"Pick Random" Engine 🎲**: Eliminate decision fatigue with one-click random problem generation.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Custom modern CSS (Glassmorphism, Dark Mode defaults, high-contrast accents)

---

## 💻 Running Locally

To get a local copy up and running, follow these simple steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your-username/codearena.git
   cd codearena
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. Configure Environment Variables
   Create a `.env` file in the root directory and set your API URL (if running a backend):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   *(Note: The app includes a robust mock-fallback system, allowing the frontend to be fully navigable even without the backend running!)*

4. Start the development server
   ```sh
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

---

## 🎨 Design Philosophy

CodeArena is designed with a **Dark Theme First** approach:
- **Vibrant Accents**: Highlighting critical actions (Submit, Premium) with signature orange `#ffa116`.
- **Difficulty Colors**: Universal mental mappings: Easy (Teal `#00b8a3`), Medium (Yellow `#ffc01e`), Hard (Crimson `#ff375f`).
- **Smooth Animations**: Minimalist micro-interactions, springy slide-ins, and typing indicators make the interface feel alive and highly responsive.

---

## 🔒 Authentication Flow
CodeArena features a robust JWT-based authentication flow with:
- Secure login and registration with live password strength meters and real-time validation.
- An offline mock-fallback capability ensuring the app is always accessible during development or server outages.

---

*Happy Coding! 💻 🚀*