import React, { useState, useEffect } from 'react'

// Import icons as simple SVGs
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
)

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8A9.8 9.8 0 0 1 12 4a10 10 0 0 1 10 10a10 10 0 0 1-10 10 9.8 9.8 0 0 1-5.2-1.46L3 21z"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm6 3a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1zM9.5 9c-.14.24-.26.5-.38.74a7.92 7.92 0 0 0 5.64 5.64c.24-.12.5-.24.74-.38a.5.5 0 0 0 0 .14c-.03.42-.09.84-.19 1.25a.5.5 0 0 1 .4.24A9 9 0 0 1 11.5 21a1.5 1.5 0 0 1 1.25-.5c-.1.38-.2.75-.31 1.12a.5.5 0 0 1-.36.35c.18.52.4 1.02.66 1.49a.5.5 0 0 1 .1-.46 9 9 0 0 1 6.84-6.84c.3-.06.61-.1 1.25-.19a.5.5 0 0 0-.14 0z"></path></svg>
)

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
)

const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>
)

function App() {
  const [profile, setProfile] = useState({
    name: 'Joaquin Sumalla',
    role: 'CEO',
    phone: '04242544045',
    email: 'emprintelab@gmail.com',
  });

  useEffect(() => {
    const parseParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      let name = urlParams.get('n') || urlParams.get('name');
      let role = urlParams.get('r') || urlParams.get('role');
      let phone = urlParams.get('p') || urlParams.get('phone');

      // Si no hay parámetros query, buscar en el Hash (Modo Ultra Compacto)
      if (!name && window.location.hash) {
        try {
          // Extraemos a partir del '#'
          const hashContent = window.location.hash.substring(1);
          console.log("Detectado Hash:", hashContent);
          
          const decodedHash = decodeURIComponent(hashContent);
          const parts = decodedHash.split('|');
          
          if (parts.length >= 3) {
            name = parts[0].replace(/\+/g, ' ');
            role = parts[1].replace(/\+/g, ' ');
            phone = parts[2];
            console.log("Datos extraídos del Hash:", { name, role, phone });
          }
        } catch (e) {
          console.error("Error al procesar el hash:", e);
        }
      }

      if (name || role || phone) {
        setProfile(prev => ({
          name: name || prev.name,
          role: role || prev.role,
          phone: phone || prev.phone,
          email: 'emprintelab@gmail.com',
        }));
      }
    };

    // Ejecutar al cargar la página
    parseParams();

    // Escuchar cambios en el hash sin recargar la página (para pruebas rápidas)
    window.addEventListener('hashchange', parseParams);
    return () => window.removeEventListener('hashchange', parseParams);
  }, []);

  const handleSaveContact = () => {
    // vCard format string
    const vcfData = `BEGIN:VCARD
VERSION:3.0
N:${profile.name};;;;
FN:${profile.name}
TITLE:${profile.role}
ORG:Emprinte Lab
TEL;TYPE=CELL:${profile.phone}
EMAIL:${profile.email}
URL:https://www.instagram.com/emprintelab
END:VCARD`;

    // Create a blob and trigger download
    const blob = new Blob([vcfData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, '_')}_EmprinteLab.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const whatsappNumber = profile.phone.startsWith('0')
    ? `58${profile.phone.substring(1)}`
    : profile.phone;

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="card-container">
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>

      <div className="content-wrapper">
        <img
          src="/logo.webp"
          alt="Emprinte Lab Logo"
          className="logo-stamp"
        />

        <h1 className="slogan">Imprime sin limites,<br />emprende sin fronteras</h1>

        <div className="profile-card">
          <h2 className="profile-name">{profile.name}</h2>
          <span className="profile-role">{profile.role}</span>

          <a href={`tel:${profile.phone}`} className="contact-row">
            <div className="contact-icon icon-cyan">
              <PhoneIcon />
            </div>
            <div className="contact-text">
              <div className="contact-label">Teléfono</div>
              <div className="contact-value">{profile.phone}</div>
            </div>
          </a>

          <a href={`mailto:${profile.email}`} className="contact-row">
            <div className="contact-icon icon-yellow">
              <EmailIcon />
            </div>
            <div className="contact-text">
              <div className="contact-label">Correo electrónico</div>
              <div className="contact-value">{profile.email}</div>
            </div>
          </a>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-row">
            <div className="contact-icon" style={{ backgroundColor: 'rgba(37, 211, 102, 0.1)', color: '#25D366' }}>
              <WhatsAppIcon />
            </div>
            <div className="contact-text">
              <div className="contact-label">Mensaje</div>
              <div className="contact-value">WhatsApp</div>
            </div>
          </a>

          <a href="https://www.instagram.com/emprintelab?igsh=bHM0M3BnaDg3a240" target="_blank" rel="noopener noreferrer" className="contact-row">
            <div className="contact-icon icon-magenta">
              <InstagramIcon />
            </div>
            <div className="contact-text">
              <div className="contact-label">Síguenos</div>
              <div className="contact-value">@emprintelab</div>
            </div>
          </a>

          <button className="save-btn" onClick={handleSaveContact}>
            <DownloadIcon />
            <span>Guardar Contacto</span>
          </button>
        </div>

        <div className="footer">
          <a href="#" className="services-link" onClick={(e) => e.preventDefault()}>
            <LayersIcon />
            Nuestros Servicios de Impresión UV
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
