document.getElementById('reporteForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    // Captura de datos del formulario
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const latitud = document.getElementById('latitud').value;
    const longitud = document.getElementById('longitud').value;
    const categoriaId = document.getElementById('categoriaId').value;
    const usuarioId = document.getElementById('usuarioId').value;
    const audioFile = document.getElementById('audio').files[0];
    const imagenFile = document.getElementById('imagen').files[0];
  
    // Construir el objeto reporteDTO
    const reporteDTO = {
      titulo: titulo,
      descripcion: descripcion,
      latitud: latitud,
      longitud: longitud,
      categoriaId: Number(categoriaId),
      usuarioId: Number(usuarioId)
    };
  
    // Crear FormData y agregar archivos y reporteDTO serializado
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('imagen', imagenFile);
    // Se añade el reporte como un Blob JSON
    formData.append('reporte', new Blob([JSON.stringify(reporteDTO)], { type: 'application/json' }));
  
    try {
    const response = await fetch('https://urbia-back.onrender.com/api/reporte/combinado', { 
        //const response = await fetch('http://localhost:8080/api/reporte/combinado', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        document.getElementById('message').textContent = 'Reporte enviado exitosamente.';
        console.log('Reporte creado:', data);
      } else {
        document.getElementById('message').textContent = 'Error al enviar el reporte.';
        console.error('Error al enviar reporte:', response.statusText);
      }
    } catch (error) {
      document.getElementById('message').textContent = 'Error de conexión o servidor.';
      console.error('Error:', error);
    }
  });
  