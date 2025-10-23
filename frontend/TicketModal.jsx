import React, { useRef } from "react";
import QRCode from "react-qr-code";
import "./TicketModal.css";

const TicketModal = ({ open, onClose, data, formData }) => {
  const ticketRef = useRef();

  if (!open || !data) return null;

  const cantidadPasajeros = data.pasajeros?.length || 0;
  const total = cantidadPasajeros * parseInt(data.price);
  const qrValue = `VUELO-${data.id}-${data.from}-${data.to}-${data.departure}-${data.arrival}`;

 const handlePrint = () => {
  const printContent = ticketRef.current.cloneNode(true); // clonar el modal
  // Eliminar los botones de impresión y cerrar
  const buttons = printContent.querySelector(".ticket-buttons");
  if (buttons) buttons.remove();

  const WinPrint = window.open("", "", "width=800,height=600");
  WinPrint.document.write('<html><head><title>Ticket</title>');

  // Inyecta los estilos actuales
  const styles = Array.from(document.querySelectorAll("style, link[rel='stylesheet']"))
    .map((node) => node.outerHTML)
    .join("");
  WinPrint.document.write(styles);
  WinPrint.document.write("</head><body>");
  WinPrint.document.write(printContent.innerHTML);
  WinPrint.document.write("</body></html>");
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
};

  return (
    <div className="ticket-overlay" onClick={onClose}>
      <div className="ticket-modal" onClick={(e) => e.stopPropagation()} ref={ticketRef}>
        {/* CABECERA */}

        {/* CUERPO */}
        <div className="ticket-body">
        <div className="ticket-header">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h2>AirSkill</h2> <span className="star">★</span>
          </div>
          <p style={{ paddingTop: 20 }}>
            <strong style={{ color: "white" }}>VUELO {data.id}</strong>
          </p>
        </div>
          <div className="ticket-route">
            <div className="city">
              <h1>{data.from}</h1>
              <p>Salida: {data.departure}</p>
            </div>
            <div className="plane-icon">✈️</div>
            <div className="city">
              <h1>{data.to}</h1>
              <p>Llegada: {data.arrival}</p>
            </div>
          </div>

          <hr className="dotted" />

          {formData && (
            <div style={{ paddingLeft: "10px" }}>
              <h4 className="section-title">DATOS DEL PAGADOR</h4>
              <div className="info-grid">
                <p style={{ marginRight: "10px", fontSize: "14px" }}>
                  <strong style={{ color: "black", fontSize: "14px" }}>Nombre:</strong> {formData.nombreCompleto}
                </p>
                <p style={{ color: "black", fontSize: "14px" }}>
                  <strong style={{ color: "black", fontSize: "14px" }}>Documento:</strong> {formData.tipoDoc}{" "}
                  {formData.numeroDoc}
                </p>
                <p style={{ marginRight: "10px", fontSize: "14px" }}>
                  <strong style={{ color: "black", fontSize: "14px" }}>Correo:</strong> {formData.correo}
                </p>
                <p style={{ marginRight: "10px", fontSize: "14px" }}>
                  <strong style={{ color: "black", fontSize: "14px" }}>Teléfono:</strong> {formData.telefono}
                </p>
              </div>
            </div>
          )}

          <hr className="dotted" />

          {data.pasajeros && data.pasajeros.length > 0 && (
            <div style={{ paddingLeft: "10px" }}>
              <h4 className="section-title">PASAJEROS</h4>
              <div className="passenger-list">
                {data.pasajeros.map((p, i) => (
                  <div key={i} className="info-grid">
                    <p style={{ marginRight: "5px", fontSize: "14px" }}>
                      <strong style={{ color: "black" }}>Nombre:</strong> {p.nombreCompleto}
                    </p>
                    <p style={{ marginRight: "10px", fontSize: "14px" }}>
                      <strong style={{ color: "black" }}>Asiento:</strong> {p.asiento || "14C"}
                      <strong style={{ color: "black", marginLeft: "20px" }}>Precio:</strong> ${data.price || "0"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <hr className="dotted" />

          <div className="total-info">
            <p>
              <strong>Total Pagado:</strong> ${total.toLocaleString("es-CO")}
            </p>
          </div>

          <hr className="dotted" />

          <div className="ticket-qr">
            <QRCode value={qrValue} size={100} />
            <p className="qr-code-text">{qrValue}</p>
          </div>
        </div>

        {/* BOTONES */}
        <div className="ticket-buttons" style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
          <button style={{ backgroundColor: "#d80404", color: "white", border: "none", padding: "10px 20px", cursor: "pointer" }} onClick={onClose}>Cerrar</button>
          <button style={{ backgroundColor: "#01c559", color: "white", border: "none", padding: "10px 20px", cursor: "pointer" }} onClick={handlePrint}>Imprimir</button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
