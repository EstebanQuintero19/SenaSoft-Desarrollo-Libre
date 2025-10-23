import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaCheck } from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';
import { BsCreditCard2Front } from 'react-icons/bs';

function PaymentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [cardType, setCardType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Detectar tipo de tarjeta basado en los primeros dígitos
  const detectCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    
    // Visa: empieza con 4
    if (/^4/.test(cleanNumber)) {
      return 'visa';
    }
    // Mastercard: empieza con 51-55 o 2221-2720
    if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
      return 'mastercard';
    }
    // American Express: empieza con 34 o 37
    if (/^3[47]/.test(cleanNumber)) {
      return 'amex';
    }
    
    return '';
  };

  // Formatear número de tarjeta con espacios cada 4 dígitos
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  // Formatear fecha de vencimiento MM/YY
  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      const formatted = formatCardNumber(value);
      setFormData({ ...formData, cardNumber: formatted });
      setCardType(detectCardType(value));
    }
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      const formatted = formatExpiryDate(value);
      setFormData({ ...formData, expiryDate: formatted });
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setFormData({ ...formData, cvv: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular procesamiento de pago (5 segundos)
    await new Promise(resolve => setTimeout(resolve, 5000));

    setIsProcessing(false);
    setPaymentSuccess(true);

    // Cerrar modal después de 2 segundos adicionales
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setFormData({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
    setCardType('');
    setIsProcessing(false);
    setPaymentSuccess(false);
    onClose();
  };

  const getCardIcon = () => {
    switch (cardType) {
      case 'visa':
        return <SiVisa className="card-icon visa" />;
      case 'mastercard':
        return <SiMastercard className="card-icon mastercard" />;
      case 'amex':
        return <BsCreditCard2Front className="card-icon amex" />;
      default:
        return <FaCreditCard className="card-icon default" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
        {!paymentSuccess ? (
          <>
            <div className="modal-header">
              <h2>Pago de Tickets</h2>
              <button className="close-btn" onClick={handleClose}>&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
              {/* Número de tarjeta */}
              <div className="form-group">
                <label htmlFor="cardNumber">Número de Tarjeta</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    disabled={isProcessing}
                  />
                  <div className="card-type-icon">
                    {getCardIcon()}
                  </div>
                </div>
                {cardType && (
                  <span className="card-type-label">
                    {cardType === 'visa' && 'Visa'}
                    {cardType === 'mastercard' && 'Mastercard'}
                    {cardType === 'amex' && 'American Express'}
                  </span>
                )}
              </div>

              {/* Nombre del titular */}
              <div className="form-group">
                <label htmlFor="cardHolder">Nombre del Titular</label>
                <input
                  type="text"
                  id="cardHolder"
                  value={formData.cardHolder}
                  onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value.toUpperCase() })}
                  placeholder="JUAN PEREZ"
                  required
                  disabled={isProcessing}
                />
              </div>

              {/* Fecha de vencimiento y CVV */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Fecha de Vencimiento</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={formData.cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>

              {/* Botón de pago */}
              <button 
                type="submit" 
                className="btn-payment"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner"></span>
                    Realizando Pago...
                  </>
                ) : (
                  'Realizar Pago'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="payment-success">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h2>¡Pago Realizado!</h2>
            <p>Tu transacción se ha completado exitosamente</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;
