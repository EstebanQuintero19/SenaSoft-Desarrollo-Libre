import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Discover.css';
import lupaIcon from '../../assets/lupa.png';

const weekdayLabels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

const formatMonthTitle = (date) => {
  const formatted = date.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric',
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const isSameDay = (dateA, dateB) =>
  Boolean(
    dateA &&
      dateB &&
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate(),
  );

const renderCalendarDays = ({
  monthDate,
  selectedDates = [],
  onSelectDay,
  isDisabled = false,
  minDate,
}) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const startOffset = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const [rangeStart, rangeEnd] = selectedDates;

  const cells = [];

  for (let i = 0; i < startOffset; i += 1) {
    cells.push({ type: 'empty', key: `empty-start-${year}-${month}-${i}` });
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const currentDate = new Date(year, month, day);
    const isBeforeMinDate = Boolean(minDate && currentDate < minDate);
    const dayDisabled = isDisabled || isBeforeMinDate;
    const isRangeStart = Boolean(rangeStart && isSameDay(currentDate, rangeStart));
    const isRangeEnd = Boolean(rangeEnd && isSameDay(currentDate, rangeEnd));
    const hasRangeEnd = Boolean(rangeEnd);
    const isSelected = isRangeStart || isRangeEnd || (!hasRangeEnd && isRangeStart);
    const isInRange = Boolean(
      rangeStart && rangeEnd && currentDate > rangeStart && currentDate < rangeEnd,
    );

    cells.push({
      type: 'day',
      key: `day-${year}-${month}-${day}`,
      value: day,
      date: currentDate,
      isSelected,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isDisabled: dayDisabled,
    });
  }

  while (cells.length % 7 !== 0) {
    const index = cells.length;
    cells.push({ type: 'empty', key: `empty-end-${year}-${month}-${index}` });
  }

  return cells.map((cell) => {
    if (cell.type === 'empty') {
      return <span key={cell.key} className={`calendar-day empty${isDisabled ? ' disabled' : ''}`} />;
    }

    const classNames = ['calendar-day'];

    if (cell.isInRange) {
      classNames.push('in-range');
    }

    if (cell.isSelected) {
      classNames.push('selected');
    }

    if (cell.isRangeStart) {
      classNames.push('range-start');
    }

    if (cell.isRangeEnd) {
      classNames.push('range-end');
    }

    const dayDisabled = Boolean(cell.isDisabled);

    if (dayDisabled) {
      classNames.push('disabled');
    }

    const handleKeyDown = (event) => {
      if (!onSelectDay) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelectDay(cell.date);
      }
    };

    return (
      <span
        key={cell.key}
        className={classNames.join(' ')}
        role={dayDisabled ? undefined : 'button'}
        tabIndex={dayDisabled ? -1 : 0}
        aria-disabled={dayDisabled}
        onClick={dayDisabled || !onSelectDay ? undefined : () => onSelectDay(cell.date)}
        onKeyDown={dayDisabled ? undefined : handleKeyDown}
      >
        {cell.value}
      </span>
    );
  });
};

const Discover = () => {
  const today = useMemo(() => new Date(), []);
  const minSelectableDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    [today],
  );
  const [tripType, setTripType] = useState('oneway');
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDates, setSelectedDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage]);

  const nextMonth = useMemo(
    () => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    [currentMonth],
  );

  const handleTripTypeChange = (type) => {
    setTripType(type);
    setErrorMessage('');

    if (type === 'oneway') {
      setSelectedDates((prev) => (prev.length ? [prev[0]] : []));
    }
  };

  const handleMonthChange = (offset) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  const handleDateSelect = (date) => {
    const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (normalized < minSelectableDate) {
      return;
    }

    setSelectedDates((prev) => {
      if (tripType === 'oneway') {
        setErrorMessage('');
        return [normalized];
      }

      if (prev.length === 0) {
        setErrorMessage('');
        return [normalized];
      }

      if (prev.length === 1) {
        const [start] = prev;

        if (normalized < start) {
          setErrorMessage('Selecciona primero la fecha de ida. La selección se reinició.');
          return [];
        }

        setErrorMessage('');
        return [start, normalized];
      }

      setErrorMessage('');
      return [normalized];
    });
  };

  return (
    <div className="discover-page">
      <Navbar />
      <main className="discover">
        <div className="discover-container">
          <header className="discover-header">
            <h1 className="discover-title">Que lugar quieres conocer</h1>
            <p className="discover-subtitle">
              Busca vuelos y encuentra tu próximo destino con nosotros.
            </p>
          </header>

          <section className="discover-card">
            <div className="travel-tabs">
              <button
                type="button"
                className={`tab-button ${tripType === 'oneway' ? 'active' : ''}`}
                onClick={() => handleTripTypeChange('oneway')}
              >
                Solo Ida
              </button>
              <button
                type="button"
                className={`tab-button ${tripType === 'roundtrip' ? 'active' : ''}`}
                onClick={() => handleTripTypeChange('roundtrip')}
              >
                Ida y Vuelta
              </button>
            </div>

            <div className="travel-content">
              <form className="travel-form">
                <div className="travel-grid">
                  <div className="travel-field">
                    <label htmlFor="origen">Origen</label>
                    <input
                      type="text"
                      id="origen"
                      name="origen"
                      placeholder="Bogotá (COL)"
                    />
                  </div>

                  <div className="travel-field">
                    <label htmlFor="destino">Destino</label>
                    <input
                      type="text"
                      id="destino"
                      name="destino"
                      placeholder="Medellín (COL)"
                    />
                  </div>

                  <div className="travel-calendar">
                    <header className="calendar-header">
                      <button
                        type="button"
                        aria-label="Mes anterior"
                        onClick={() => handleMonthChange(-1)}
                      >
                        ‹
                      </button>
                      <h3>{formatMonthTitle(currentMonth)}</h3>
                      <button
                        type="button"
                        aria-label="Mes siguiente"
                        onClick={() => handleMonthChange(1)}
                      >
                        ›
                      </button>
                    </header>
                    <div className="calendar-weekdays">
                      {weekdayLabels.map((label, index) => (
                        <span key={`weekday-current-${index}`} className="calendar-weekday">
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="calendar-grid">
                      {renderCalendarDays({
                        monthDate: currentMonth,
                        selectedDates,
                        onSelectDay: handleDateSelect,
                        minDate: minSelectableDate,
                      })}
                    </div>
                  </div>

                  <div
                    className={`travel-calendar ${tripType === 'oneway' ? 'disabled' : ''}`}
                    aria-disabled={tripType === 'oneway'}
                  >
                    <header className="calendar-header">
                      <button
                        type="button"
                        aria-label="Mes anterior"
                        onClick={tripType === 'oneway' ? undefined : () => handleMonthChange(-1)}
                        disabled={tripType === 'oneway'}
                      >
                        ‹
                      </button>
                      <h3>{formatMonthTitle(nextMonth)}</h3>
                      <button
                        type="button"
                        aria-label="Mes siguiente"
                        onClick={tripType === 'oneway' ? undefined : () => handleMonthChange(1)}
                        disabled={tripType === 'oneway'}
                      >
                        ›
                      </button>
                    </header>
                    <div className={`calendar-weekdays ${tripType === 'oneway' ? 'disabled' : ''}`}>
                      {weekdayLabels.map((label, index) => (
                        <span key={`weekday-next-${index}`} className="calendar-weekday">
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className={`calendar-grid ${tripType === 'oneway' ? 'disabled' : ''}`}>
                      {renderCalendarDays({
                        monthDate: nextMonth,
                        selectedDates,
                        onSelectDay: tripType === 'oneway' ? undefined : handleDateSelect,
                        isDisabled: tripType === 'oneway',
                        minDate:
                          tripType === 'roundtrip' && selectedDates.length > 0
                            ? selectedDates[0]
                            : minSelectableDate,
                      })}
                    </div>
                  </div>

                  {errorMessage ? (
                    <div className="travel-error" role="alert">
                      {errorMessage}
                    </div>
                  ) : null}

                  <div className="travel-field">
                    <label htmlFor="pasajeros">Pasajeros</label>
                    <div className="select-wrapper">
                      <select id="pasajeros" name="pasajeros" defaultValue="1">
                        <option value="1">1 Pasajero</option>
                        <option value="2">2 Pasajeros</option>
                        <option value="3">3 Pasajeros</option>
                        <option value="4">4 Pasajeros</option>
                        <option value="5">5 Pasajeros</option>
                      </select>
                    </div>
                  </div>

                  <div className="travel-action">
                    <button type="submit" className="travel-button">
                      <img src={lupaIcon} alt="Ícono de búsqueda" />
                      Buscar Vuelos
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
