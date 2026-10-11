export default function Footer() {
  return (
    <footer className="footer">
      <div className="stripe" aria-hidden="true">
        <span className="stripe-line" />
        <span className="stripe-block" />
        <span className="stripe-block" />
        <span className="stripe-block" />
      </div>
      <div className="wrap footer-body">
        <div className="footer-brand">
          <p className="footer-title">E1 Glossary</p>
          <p>Made for the Enhypen MAMA Grand Prix. E1 meanings come from EMGP's official race terminology.</p>
        </div>
        <div className="footer-actions">
          <a className="e1-button" href="https://e1.ensite.org" aria-label="Go to E1, the Enhypen MAMA Grand Prix">
            E1
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2"
                 strokeLinecap="round" aria-hidden="true"><path d="M4 12L12 4M5 4h7v7" /></svg>
          </a>
          <a className="footer-link" href="#top">Back to the Grid ↑</a>
        </div>
      </div>
      <p className="wrap footer-note">Fan-made. Not affiliated with HYBE, BELIFT LAB, CJ ENM or Formula 1.</p>
    </footer>
  )
}
