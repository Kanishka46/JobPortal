import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#0d6efd", // Blue
      color: "white",
      textAlign: "center",
      padding: "15px 10px",
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      fontSize: "0.9rem",
    },
    links: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "5px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
    },
    copy: {
      fontSize: "0.85rem",
      color: "#dbe4ff",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.links}>
        <a href="/about" style={styles.link}>About</a>
        <a href="/contact" style={styles.link}>Contact</a>
        <a href="/privacy" style={styles.link}>Privacy</a>
      </div>
      <p style={styles.copy}>© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
