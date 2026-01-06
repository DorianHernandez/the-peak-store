import { useEffect, useState } from 'react';
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
  const [isProcessing, setIsProcessing] = useState(false); 

  // --- VARIABLES DE PRODUCTO ---
  const product = products.find((p) => p.id === Number(id));
  const destinationUrl = product ? `/buy/${product.id}` : null;
  const waitTime = 3000;

  useEffect(() => {
    if (isProcessing && destinationUrl) {
      const timerId = setTimeout(() => {
        navigate(destinationUrl);
      }, waitTime);
      return () => clearTimeout(timerId);
    }
  }, [navigate, destinationUrl, isProcessing]);

  const handleConfirm = (e) => {
    e.preventDefault();
    let newErrors = {};

    // 1. Validación de longitud (sin espacios para la tarjeta)
    const cardDigits = formData.card.replace(/\s/g, '');
    
    if (cardDigits.length !== 16) {
      newErrors.card = "Número de tarjeta incompleto (16 dígitos)";
    }

    if (formData.cvv.length !== 3) {
      newErrors.cvv = "El CVV debe tener 3 dígitos";
    }

    // 2. Validación de Fecha Vencimiento > Fecha Actual 
    if (!formData.expiry) {
      newErrors.expiry = "Falta fecha de vencimiento";
    } else {
      const [year, month] = formData.expiry.split('-').map(Number);
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = "La tarjeta está vencida";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsProcessing(true); 
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
        <button onClick={() => navigate('/')} className="back-button">Volver al inicio</button>
      </div>
    );
  }

  // --- VISTA DE PROCESANDO ---
  if (isProcessing) {
    return (
      <div className="buy_page__charge">
        <p>¡Pago validado con éxito!</p>
        <p>Por favor espera un momento, estamos procesando tu compra...</p>
        <p className="buy_page__product">{product.name}</p>
        {/* Mejora: Botón por si el proceso tarda demasiado */}
        <button onClick={() => navigate('/')} className="back-button">
          Volver al catálogo
        </button>
      </div>
    );
  }

  // --- VISTA DEL FORMULARIO ---
  return (
    <div className="buy_page__charge">
      <p>Información de pago para:</p>
      <p className="buy_page__product">{product.name}</p>
      
      <form onSubmit={handleConfirm} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Número de Tarjeta:</label>
          <input 
            type="text" 
            placeholder="xxxx xxxx xxxx xxxx" 
            maxLength="19" // 16 dígitos + 3 espacios
            value={formData.card}
            onChange={(e) => {
              // Formateo dinámico de 4 en 4 
              const val = e.target.value.replace(/\D/g, '');
              const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
              setFormData({...formData, card: formatted});
            }}
            style={{ padding: '8px', width: '250px', display: 'block' }}
          />
          {errors.card && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>{errors.card}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Vencimiento (Mes/Año):</label>
          <input 
            type="month" 
            onChange={(e) => setFormData({...formData, expiry: e.target.value})}
            style={{ padding: '8px', width: '250px', display: 'block' }}
          />
          {errors.expiry && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>{errors.expiry}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>CVV:</label>
          <input 
            type="text" 
            placeholder="3 dígitos" 
            maxLength="3"
            value={formData.cvv}
            onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
            style={{ padding: '8px', width: '250px', display: 'block' }}
          />
          {errors.cvv && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>{errors.cvv}</p>}
        </div>

        <button type="submit" className="buy_page__button" style={{ cursor: 'pointer', padding: '10px 20px', marginTop: '10px' }}>
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