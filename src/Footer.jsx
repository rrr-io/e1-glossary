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
            <svg width="16" height="16" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
              <path d="M3 0h5v5H7V1H3zM5 1h2v1H5zM4 2h2v1H4zM3 3h2v1H3zM2 4h2v1H2zM1 5h2v1H1zM0 6h2v1H0zM0 7h1v1H0z" />
            </svg>
          </a>
          <a className="footer-link" href="#top">Back to the Grid ↑</a>
        </div>
      </div>
      <p className="wrap footer-note">Fan-made. Not affiliated with HYBE, BELIFT LAB or Formula 1.</p>
    </footer>
  )
}
