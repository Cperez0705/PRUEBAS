// 1️⃣ Cargar el archivo JSON
fetch('destinos.json')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById('contenedor');

    // 2️⃣ Recorrer cada país
    data.forEach(pais => {
      // Crear el contenedor del país
      const divPais = document.createElement('div');
      divPais.classList.add('pais');

      // Título del país
      const tituloPais = document.createElement('h2');
      tituloPais.textContent = pais.PAIS;
      tituloPais.style.cursor = 'pointer';

      // Sección que contendrá las ciudades (oculta al inicio)
      const sectionItems = document.createElement('section');
      sectionItems.classList.add('items');
      sectionItems.style.display = 'none'; // oculto por defecto

      // 3️⃣ Recorrer las ciudades del país
      pais.CIUDADES.forEach(ciudad => {
        const item = document.createElement('div');
        item.classList.add('item');

        item.innerHTML = `
          <h3>${ciudad.NOMBRE}</h3>
          <img src="${ciudad.IMG}" alt="${ciudad.NOMBRE}">
          <div class="desc">
            <div class="dias">${ciudad.DIAS}</div>
            <div class="desde">Desde: ${ciudad.PRECIO}</div>
            <div class="but"><a href="#">Ver más</a></div>
          </div>
        `;

        sectionItems.appendChild(item);
      });

      // 4️⃣ Evento para mostrar/ocultar ciudades al hacer clic
      tituloPais.addEventListener('click', () => {
        if (sectionItems.style.display === 'none') {
          sectionItems.style.display = 'flex';
        } else {
          sectionItems.style.display = 'none';
        }
      });

      // 5️⃣ Insertar todo al contenedor
      divPais.appendChild(tituloPais);
      divPais.appendChild(sectionItems);
      contenedor.appendChild(divPais);
    });
  })
  .catch(err => console.error('Error al cargar el JSON:', err));
