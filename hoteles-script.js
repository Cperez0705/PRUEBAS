document.addEventListener("DOMContentLoaded", function () {
  // FUNCIONALIDAD PARA LAS PESTAÑAS .tab
  
    // Obtenemos todos los elementos con la clase "tab"
  var tabLinks = document.querySelectorAll(".tab");
  
  // Recorremos los enlaces y añadimos un evento "click" a cada uno
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener("click", function (e) {
      e.preventDefault();
      
	// Obtenemos el valor del atributo "data-tab" del enlace clicado	
      var tabId = this.getAttribute("data-tab");

      // Ocultar todos los tab-content (contenidos principales)
      var tabContents = document.querySelectorAll(".tab-content");
      tabContents.forEach(function (el) {
        el.style.display = "none";
      });

      // Mostrar solo el contenido principal correspondiente
      var tabContent = document.getElementById(tabId);
      tabContent.style.display = "block";

      // ✅ Aquí NO ocultamos tab-content2 (subpestañas),
      // por eso no hacemos nada con tab-content2 aquí

      // Actualizar pestaña activa
      document.querySelectorAll(".tab.active").forEach(function (el) {
        el.classList.remove("active");
      });
      this.classList.add("active");
    });
  }

  // FUNCIONALIDAD PARA LAS SUBPESTAÑAS .tab2
  var tabLinks2 = document.querySelectorAll(".tab2");

  for (var i = 0; i < tabLinks2.length; i++) {
    tabLinks2[i].addEventListener("click", function (e) {
      e.preventDefault();

      var tabId2 = this.getAttribute("data-tab2");

      // Ocultar todos los contenidos de subpestañas dentro del mismo tab-content
      var container = this.closest(".tab-content");
      var tabContents2 = container.querySelectorAll(".tab-content2");
      tabContents2.forEach(function (el) {
        el.style.display = "none";
      });

      // Mostrar el contenido correspondiente a la subpestaña
      var tabContent2 = document.getElementById(tabId2);
      tabContent2.style.display = "block";

      // Actualizar subpestaña activa
      container.querySelectorAll(".tab2.active").forEach(function (el) {
        el.classList.remove("active");
      });
      this.classList.add("active");
    });
  }
  
    // FUNCIONALIDAD PARA LAS SUBPESTAÑAS .tab3
  var tabLinks3 = document.querySelectorAll(".tab3");

  for (var i = 0; i < tabLinks3.length; i++) {
    tabLinks3[i].addEventListener("click", function (e) {
      e.preventDefault();

      var tabId3 = this.getAttribute("data-tab3");

      // Ocultar todos los contenidos de subpestañas dentro del mismo tab-content
      var container = this.closest(".tab-content");
      var tabContents3 = container.querySelectorAll(".tab-content3");
      tabContents3.forEach(function (el) {
        el.style.display = "none";
      });

      // Mostrar el contenido correspondiente a la subpestaña
      var tabContent3 = document.getElementById(tabId3);
      tabContent3.style.display = "block";

      // Actualizar subpestaña activa
      container.querySelectorAll(".tab3.active").forEach(function (el) {
        el.classList.remove("active");
      });
      this.classList.add("active");
    });
  }

 });

//VIGENCIA POR UBICACIÓN
// Reemplaza al viejo sistema .activar/.ocultar/.tab-hidden (ya no se
// usan). Cada BOTÓN de ubicación (.tab, data-tab="tab-XX") puede traer
// data-vence="AAAA-MM-DDTHH:MM:SS-05:00" con su fecha límite. Al cargar
// la página, se oculta el botón cuya fecha ya pasó, y junto con él su
// contenido correspondiente (el div cuyo id es igual al data-tab del
// botón). data-vence vive SOLO en el botón -- no hace falta repetirlo en
// el contenido.
document.addEventListener('DOMContentLoaded', function () {
    var ahora = new Date();

    document.querySelectorAll('.tab[data-vence]').forEach(function (boton) {
        var vence = new Date(boton.getAttribute('data-vence'));
        if (isNaN(vence.getTime()) || ahora <= vence) return;

        boton.style.display = 'none';
        var idContenido = boton.getAttribute('data-tab');
        var contenido = idContenido && document.getElementById(idContenido);
        if (contenido) contenido.style.display = 'none';
    });

    document.querySelectorAll('.tab-container').forEach(function (container) {
        var activa = container.querySelector('.tab.active');
        var sigueVigente = activa && activa.style.display !== 'none';
        if (!sigueVigente) {
            var visibles = Array.prototype.filter.call(
                container.querySelectorAll('.tab'),
                function (t) { return t.style.display !== 'none'; }
            );
            if (visibles.length > 0) visibles[0].click();
        }
    });
});
