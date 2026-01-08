import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProducts from "../hooks/useProducts";
import "../styles/buyCharge.css";

export default function StaticRedirectPage() {
  const { id } = useParams();
  const products = useProducts();
  const navigate = useNavigate();

  // --- ESTADOS PARA VALIDACIÓN ---
  const [formData, setFormData] = useState({ card: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  // --- VARIABLES DE PRODUCTO ---
  const product = products.find((p) => p.id === Number(id));

  const handleConfirm = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validación de tarjeta (16 dígitos sin espacios)
    const cardDigits = formData.card.replace(/\s/g, '');
    if (cardDigits.length !== 16) {
      newErrors.card = "Número de tarjeta incompleto (16 dígitos)";
    }

    // Validación de CVV (3 dígitos)
    if (formData.cvv.length !== 3) {
      newErrors.cvv = "El CVV debe tener 3 dígitos";
    }

    // Validación de fecha de vencimiento (MM/YY)
    if (!formData.expiry) {
      newErrors.expiry = "Falta fecha de vencimiento";
    } else {
      const [month, year] = formData.expiry.split('/').map(Number);
      const today = new Date();
      const currentYear = today.getFullYear() % 100; // últimos 2 dígitos
      const currentMonth = today.getMonth() + 1;

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = "La tarjeta está vencida";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("¡Pago validado con éxito!");
      navigate(`/buy/${product.id}`);
    }
  };

  if (products.length === 0) {
    return (
      <div className="buy_page__charge">
        <p>Cargando información del producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="buy_page__charge">
        <p>Producto no encontrado</p>
        <button onClick={() => navigate('/')} className="back-button">
          Volver al inicio
        </button>
      </div>
    );
  }

  // --- SOLO VISTA DEL FORMULARIO ---
  return (
    <div className="buy_page__charge">
      <p>Información de pago para:</p>
      <p className="buy_page__product">{product.name}</p>
      
      <form onSubmit={handleConfirm} style={{ marginTop: '20px' }}>
        {/* Número de tarjeta */}
        <div style={{ marginBottom: '10px' }}>
          <label>Número de Tarjeta:</label>
          <input 
            type="text" 
            placeholder="xxxx xxxx xxxx xxxx" 
            maxLength="19" // 16 dígitos + 3 espacios
            value={formData.card}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
              setFormData({...formData, card: formatted});
            }}
            style={{ padding: '8px', width: '250px', display: 'block' }}
          />
          {errors.card && <p style={{ color: 'red', fontSize: '12px' }}>{errors.card}</p>}
        </div>

        {/* Vencimiento MM/YY */}
        <div style={{ marginBottom: '10px' }}>
          <label>Vencimiento (MM/YY):</label>
          <input 
            type="text"
            placeholder="MM/YY"
            maxLength="5"
            value={formData.expiry}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, '');
              if (val.length >= 3) {
                val = val.slice(0,2) + '/' + val.slice(2,4);
              }
              setFormData({ ...formData, expiry: val });
            }}
            style={{ padding: '8px', width: '100px', display: 'block' }}
          />
          {errors.expiry && <p style={{ color: 'red', fontSize: '12px' }}>{errors.expiry}</p>}
        </div>

        {/* CVV */}
        <div style={{ marginBottom: '10px' }}>
          <label>CVV:</label>
          <input 
            type="password" 
            placeholder="3 dígitos" 
            maxLength="3"
            value={formData.cvv}
            onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
            style={{ padding: '8px', width: '100px', display: 'block' }}
          />
          {errors.cvv && <p style={{ color: 'red', fontSize: '12px' }}>{errors.cvv}</p>}
        </div>

        {/* Botones */}
        <button type="submit" className="buy_page__button" style={{ cursor: 'pointer', padding: '10px 20px' }}>
          Confirmar Compra
        </button>
        
        <button 
          type="button" 
          onClick={() => navigate(-1)} 
          className="back-button"
          style={{ display: 'block', marginTop: '15px' }}
        >
          Cancelar y volver
        </button>
      </form>
    </div>
  );
}