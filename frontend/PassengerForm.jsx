import React, { useEffect, useState } from "react";
import "./PassengerForm.css";
import { FaTrashAlt } from "react-icons/fa";
import AssignSeatModal from "./AssignSeatModal";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const PassengerForm = () => {
 //este es el id del vuelo
  const { id } = useParams();
 const location = useLocation();
  const data = location.state;
  console.log(id);
  console.log(data);
  //

  const [pasajeros, setPasajeros] = useState([]);
  const [showAssignSeat, setShowAssignSeat] = useState(false);
  const [formData, setFormData] = useState({
    primerApellido: "",
    segundoApellido: "",
    nombreCompleto: "",
    genero: "",
    tipoDoc: "",
    numeroDoc: "",
    fechaNacimiento: "",
    correo: "",
    telefono: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

   
    const camposCompletos = Object.values(formData).every(
      (val) => val.trim() !== ""
    );
    if (!camposCompletos) {
      alert("Por favor completa todos los campos antes de asignar el asiento.");
      return;
    }

    setShowAssignSeat(true);
  };


  const handleAssignSeat = (seat) => {
    const nuevoPasajero = {
      ...formData,
      asiento: seat,
    };

    setPasajeros((prev) => [...prev, nuevoPasajero]);
    setFormData({
      primerApellido: "",
      segundoApellido: "",
      nombreCompleto: "",
      genero: "",
      tipoDoc: "",
      numeroDoc: "",
      fechaNacimiento: "",
      correo: "",
      telefono: "",
    });
    setShowAssignSeat(false);

  
    const alerta = document.getElementById("alerta");
    alerta.style.display = "block";
    setTimeout(() => (alerta.style.display = "none"), 2000);
  };

  const handleDelete = (index) => {
    setPasajeros(pasajeros.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(pasajeros);
  }, [pasajeros]);

  function handleClick() {
    const datos = {
      pasajeros,
      id,
      from: data.from,
      to: data.to,
      departure: data.departure,
      arrival: data.arrival,
      price: data.price,
    };
   navigate("/payment", { state: datos });
  }

  return (
    <div className="container">
      <h1>Información de Pasajeros</h1>
      <p>Completa los campos requeridos.</p>

      <div className="alert" id="alerta">
        Pasajero agregado
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Primer Apellido</label>
            <input
              type="text"
              name="primerApellido"
              value={formData.primerApellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Segundo Apellido</label>
            <input
              type="text"
              name="segundoApellido"
              value={formData.segundoApellido}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Género</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tipo de Documento</label>
            <select
              name="tipoDoc"
              value={formData.tipoDoc}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="CC">Cédula</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>
          <div className="form-group">
            <label>Número de Documento</label>
            <input
              type="text"
              name="numeroDoc"
              value={formData.numeroDoc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-bton">
          <button type="submit" className="btn-agregar">
            Agregar Pasajero
          </button>
        </div>
      </form>

      {/* Modal de asignar asiento */}
      <AssignSeatModal
        show={showAssignSeat}
        onClose={() => setShowAssignSeat(false)}
        handleAssignSeat={handleAssignSeat}
        asientos={pasajeros.map((p) => p.asiento)}
      />

      {pasajeros.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Primer Apellido</th>
              <th>Segundo Apellido</th>
              <th>Nombre</th>
              <th>Tipo Doc</th>
              <th>N° Documento</th>
              <th>Asiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pasajeros.map((p, i) => (
              <tr key={i}>
                <td>{p.primerApellido}</td>
                <td>{p.segundoApellido}</td>
                <td>{p.nombreCompleto}</td>
                <td>{p.tipoDoc}</td>
                <td>{p.numeroDoc}</td>
                <td>{p.asiento}</td>
                <td>
                  <FaTrashAlt
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {pasajeros.length > 0 && (
        <div className="form-bton">
          <button
            type="button"
            className="btn-siguiente"
            onClick={() => handleClick()}
          >
            <span>
              <FaArrowCircleRight style={{ marginRight: "10px" }} />
              Siguiente
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PassengerForm;
