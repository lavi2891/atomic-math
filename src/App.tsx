import { he } from "@copy/he";
import { styles } from "@ui/styles";

export default function App() {
  return (
    <div className="page" style={styles.page} dir="rtl">
      <div className="phone" style={styles.phone}>
        <header style={styles.header}>
          <h1 style={styles.title}>{he.appName}</h1>
          <p style={styles.subtitle}>{he.tagline}</p>
        </header>

        <main style={styles.content}>
          <button style={styles.button}>{he.startTraining}</button>
        </main>

        <footer style={styles.footer}>{/*  */}</footer>
      </div>
    </div>
  );
}
