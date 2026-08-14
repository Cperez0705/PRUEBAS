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
// Cada BOTÓN de ubicación (.tab, data-tab="tab-XX") puede traer
// data-vence="AAAA-MM-DDTHH:MM:SS-05:00" con su fecha límite -- esta es
// la forma OFICIAL de marcar algo como vencido de aquí en adelante
// (12/08/2026: se dejó de escribir/editar 'tab-hidden' a propósito, tanto
// para lo vencido como para paneles de respaldo tipo 'tab-100' -- todo se
// resuelve con una fecha, sin excepciones ni clases especiales).
//
// 'tab-hidden' se sigue RESPETANDO acá como red de seguridad mientras se
// termina de migrar cada marca -- si una pestaña vieja todavía la trae
// (de antes de este sistema) sigue ocultándose igual, para no exponer
// contenido vencido por accidente. Pero ya no se le escribe a nada nuevo,
// y no hace falta quitarla a mano: ambas señales (tab-hidden o
// data-vence vencido) se tratan igual, sin prioridad entre ellas.
document.addEventListener('DOMContentLoaded', function () {
    var ahora = new Date();

    document.querySelectorAll('.tab').forEach(function (boton) {
        var vencidoPorFecha = false;
        if (boton.hasAttribute('data-vence')) {
            var vence = new Date(boton.getAttribute('data-vence'));
            vencidoPorFecha = !isNaN(vence.getTime()) && ahora > vence;
        }
        var vencidoPorClaseVieja = boton.classList.contains('tab-hidden');
        if (!vencidoPorFecha && !vencidoPorClaseVieja) return;

        boton.style.display = 'none';
        boton.dataset.vencido = 'true';
        var idContenido = boton.getAttribute('data-tab');
        var contenido = idContenido && document.getElementById(idContenido);
        if (contenido) contenido.style.display = 'none';
    });

    document.querySelectorAll('.tab-container').forEach(function (container) {
        var visibles = Array.prototype.filter.call(
            container.querySelectorAll('.tab'),
            function (t) { return t.style.display !== 'none'; }
        );
        if (visibles.length === 0) return;
        // Siempre debe estar activa la PRIMERA pestaña visible, sin
        // importar cuál venía marcada 'active' en el HTML -- antes solo se
        // reasignaba si la activa actual se ocultaba, pero eso dejaba
        // activa una pestaña más adelante en la lista aunque una anterior
        // (y también vigente) debiera tener prioridad (11/08/2026).
        if (visibles[0] !== container.querySelector('.tab.active')) {
            visibles[0].click();

        }
    });
});

//SELECTOR DE AÑO (agregado 12/08/2026)
// Si un ítem tiene más de un grupo "<div class="title"><h3>TARIFAS
// <AÑO></h3></div>" (ej. 2026 y 2027 al mismo tiempo, caso real:
// Catalonia), agrega una barra arriba de los botones para mostrar solo
// un año a la vez -- evita que se acumulen demasiados botones juntos
// cuando conviven varios años. Si solo hay un grupo (el caso normal de
// hoy en el resto de las marcas), no hace nada -- se ve exactamente
// igual que siempre, cero cambio visual.
//
// Corre DESPUÉS del bloque de vigencia (arriba) a propósito -- así ya
// sabe qué botones quedaron ocultos por fecha vencida (marcados con
// dataset.vencido) y nunca los vuelve a mostrar al cambiar de año; y ya
// sabe cuál quedó 'active' por vigencia, para elegir ese año por
// defecto en vez de adivinar.
//
// CORREGIDO 14/08/2026 -- caso real: VIVA WEEK, donde TODAS las pestañas
// de 2026 vencieron a la vez. Antes se armaba un botón "TARIFAS 2026"
// igual, aunque llevara a una pantalla vacía (nada visible adentro).
// Ahora un grupo cuyos botones están TODOS vencidos ni siquiera entra al
// selector -- ni su botón ni su título "TARIFAS <año>" se muestran.
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.tab-container').forEach(function (container) {
        var titulos = Array.prototype.filter.call(
            container.querySelectorAll('.title'),
            function (t) {
                var h3 = t.querySelector('h3');
                return h3 && /TARIFAS\s+\d{4}/i.test(h3.textContent);
            }
        );
        if (titulos.length === 0) return;

        var todosLosGrupos = titulos.map(function (titleDiv) {
            var anio = titleDiv.querySelector('h3').textContent.match(/\d{4}/)[0];
            var botones = [];
            var el = titleDiv.nextElementSibling;
            while (el && !(el.classList.contains('title'))) {
                if (el.classList.contains('tab')) botones.push(el);
                el = el.nextElementSibling;
            }
            return { anio: anio, titleDiv: titleDiv, botones: botones };
        });

        // Un grupo cuenta como "con contenido" si tiene al menos un botón
        // que NO quedó marcado vencido por el bloque de vigencia de arriba.
        var grupos = todosLosGrupos.filter(function (g) {
            return g.botones.some(function (b) { return b.dataset.vencido !== 'true'; });
        });

        // Los grupos totalmente vencidos (ninguno vigente adentro) se
        // ocultan del todo -- ni título ni selector, no llevan a nada.
        todosLosGrupos.forEach(function (g) {
            if (grupos.indexOf(g) === -1) g.titleDiv.style.display = 'none';
        });

        if (grupos.length < 2) {
            // 0 o 1 grupo con contenido real: no hace falta selector.
            // Si queda exactamente 1, se asegura que su título esté visible
            // (por si algún filtro previo lo hubiera ocultado).
            if (grupos.length === 1) grupos[0].titleDiv.style.display = '';
            return;
        }

        var grupoActivo = grupos.find(function (g) {
            return g.botones.some(function (b) { return b.classList.contains('active'); });
        }) || grupos[0];

        function mostrarGrupo(grupoElegido) {
            grupos.forEach(function (g) {
                var mostrar = g === grupoElegido;
                g.titleDiv.style.display = mostrar ? '' : 'none';
                g.botones.forEach(function (b) {
                    if (b.dataset.vencido === 'true') return;
                    b.style.display = mostrar ? '' : 'none';
                });
            });
        }

        var selector = document.createElement('div');
        selector.className = 'year-selector';
        grupos.forEach(function (g) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'year-btn' + (g === grupoActivo ? ' active' : '');
            btn.textContent = 'TARIFAS ' + g.anio;
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                selector.querySelectorAll('.year-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                mostrarGrupo(g);
                var primerVisible = g.botones.find(function (b) { return b.style.display !== 'none'; });
                if (primerVisible) primerVisible.click();
            });
            selector.appendChild(btn);
        });

        grupos[0].titleDiv.parentNode.insertBefore(selector, grupos[0].titleDiv);
        mostrarGrupo(grupoActivo);
    });
});
