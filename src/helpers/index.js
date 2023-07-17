export const formatearFecha = fecha => {
  const nuevaFecha = new Date(fecha);
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  fechaFormateada = nuevaFecha.toLocaleDateString('es-ES', opciones);

  return fechaFormateada;
};
