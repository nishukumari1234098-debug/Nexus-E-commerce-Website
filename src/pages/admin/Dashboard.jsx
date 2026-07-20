import { Link } from 'react-router-dom';
import styles from './Admin.module.css';

function AdminDashboard() {
  // 1. Dynamic Greeting System based on Real Time
  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good Morning, Boss 🌅';
    if (hrs < 18) return 'Good Afternoon, Leader ☀️';
    return 'Good Evening, Admin 🌙';
  };

  // Mock Data for Professional Presentation
  const metrics = [
    { label: 'Total Sales Revenue', value: '$1,249.50', icon: '💰', color: '#10b981' },
    { label: 'Active Catalog Items', value: '20 Products', icon: '📦', color: '#3182ce' },
    { label: 'Pending Store Orders', value: '4 Inbound', icon: '🛒', color: '#f59e0b' },
    { label: 'Store Conversion Rate', value: '3.42%', icon: '📈', color: '#8b5cf6' },
  ];

  const recentActivities = [
    { text: 'New Product "Premium Headphones" listed', time: '10 mins ago', type: 'Success', color: '#dcfce7', textColor: '#15803d' },
    { text: 'Stock Alert: "Tactile Keyboard" falling below 5 items', time: '1 hour ago', type: 'Warning', color: '#fef3c7', textColor: '#b45309' },
    { text: 'Admin configuration updated by system logs', time: '4 hours ago', type: 'Info', color: '#e0f2fe', textColor: '#0369a1' },
    { text: 'Database refresh and cache sync completed', time: '1 day ago', type: 'System', color: '#f1f5f9', textColor: '#475569' },
  ];

  return (
    <div>
      {/* Upper Control Bar */}
      <div className={styles.adminHeader}>
        <div>
          <h1>{getGreeting()}</h1>
          <p>Here is what is happening across your commercial ecosystem today.</p>
        </div>
        <div className={styles.timeBadge}>
          System Status: 🟢 Operational
        </div>
      </div>

      {/* Modern 4-Column Stats Dashboard Grid */}
      <div className={styles.statsGrid}>
        {metrics.map((metric, idx) => (
          <div key={idx} className={styles.statCard} style={{ borderLeft: `4px solid ${metric.color}` }}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{metric.label}</span>
              <span className={styles.statValue}>{metric.value}</span>
            </div>
            <span className={styles.statIcon}>{metric.icon}</span>
          </div>
        ))}
      </div>

      {/* Bottom Split Layout System */}
      <div className={styles.dashboardGrid}>
        
        {/* Left Side: Recent Activity Stream */}
        <div className={styles.panelBox}>
          <h3>Real-time Activity Log</h3>
          <div className={styles.activityList}>
            {recentActivities.map((act, idx) => (
              <div key={idx} className={styles.activityItem} style={{ borderLeftColor: act.textColor }}>
                <div className={styles.activityMeta}>
                  <h5>{act.text}</h5>
                  <p>{act.time}</p>
                </div>
                <span className={styles.statusBadge} style={{ backgroundColor: act.color, color: act.textColor }}>
                  {act.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Shortcuts Controller */}
        <div className={styles.panelBox}>
          <h3>System Shortcuts</h3>
          <div className={styles.actionList}>
            <Link to="/admin/products" className={styles.actionBtn}>
              ⚙️ Manage Product Table
            </Link>
            <Link to="/" className={styles.actionBtn}>
              🌐 View Live Storefront
            </Link>
            <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer" className={styles.actionBtn}>
              📂 Inspect Raw API Docs
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;