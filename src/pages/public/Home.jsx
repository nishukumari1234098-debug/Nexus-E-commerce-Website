import { Link } from "react-router-dom";
import styles from "./Pages.module.css";

function Home() {
  // Static Data for Premium Visuals
  const features = [
    {
      icon: "🚀",
      title: "Express Delivery",
      desc: "Get your tech items within 24-48 hours seamlessly.",
    },
    {
      icon: "🛡️",
      title: "Secure Payment",
      desc: "100% protected checkout with multi-layer encryption.",
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      desc: "Not satisfied? Return or exchange within 7 days easily.",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      desc: "Our dedicated team is ready to assist you anytime.",
    },
  ];

  const categories = [
    {
      title: "Premium Electronics",
      bg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      link: "/products",
    },
    {
      title: "Smart Wearables",
      bg: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      link: "/products",
    },
    {
      title: "Modern Accessories",
      bg: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
      link: "/products",
    },
  ];

  return (
    <div className={styles.container}>
      {/* 1. Premium Hero Section */}
      <header className={styles.hero}>
        <h1>
          The Next Generation of <br />
          Digital Commerce is Here.
        </h1>
        <p>
          Explore an elite curation of top-tier gadgets, accessories, and
          electronics designed to elevate your workflow and lifestyle.
        </p>
        <div className={styles.heroActions}>
          <Link
            to="/products"
            className={styles.primaryBtn}
            style={{ maxWidth: "200px" }}
          >
            Shop Collection 🛒
          </Link>
          <Link to="/login" className={styles.secondaryBtn}>
            Admin Console Panel
          </Link>
        </div>
      </header>

      {/* 2. Core Value Features Grid */}
      <section className={styles.featuresGrid}>
        {features.map((item, index) => (
          <div key={index} className={styles.featureCard}>
            <span className={styles.featureIcon}>{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 3. Visual Categories Section */}
      <section>
        <h2 className={styles.sectionTitle}>Browse Featured Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.link}
              className={styles.categoryCard}
              style={{ backgroundImage: `url(${cat.bg})` }}
            >
              <h3>{cat.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
