import "./TopBar.css";

// Barra superior pequeña con información de contacto o avisos.
function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <div className="topbar-content">
          Asesoramiento 100% gratuito a:<span className="emoji"><a href="http://wa.me/573170557573"> 3170557573 💸</a></span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
