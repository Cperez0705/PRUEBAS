/* opcionales-script.js
   Colección `Projects` (COLOMBIA OPCIONALES) — campo `indiceOpcionales`.
   Dos niveles de pestañas en este HTML (a diferencia de Hoteles, que solo
   tiene .tab/.tab2):
     - .tab-link / .tab-content   -> menú de excursiones (izquierda)
     - .tab3 / .tab-content3      -> Regulaciones/Cancelaciones/Documentación (pie)
   Se sirve vía CDN (jsDelivr) en vez de quedar inline en cada ítem.
*/

document.addEventListener("DOMContentLoaded", function () {

  // -------- Pestañas de excursión (.tab-link / .tab-content) --------
  var tabLinks = document.querySelectorAll(".tab-link");
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener("click", function (e) {
      e.preventDefault();

      var tabId = this.getAttribute("data-tab");
      var container = this.closest(".contenido");

      var tabContents = container.querySelectorAll(".tab-content");
      tabContents.forEach(function (el) { el.style.display = "none"; });

      var tabContent = document.getElementById(tabId);
      if (tabContent) tabContent.style.display = "block";

      var activeTab = container.querySelector(".tab-link.active");
      if (activeTab) activeTab.classList.remove("active");
      this.classList.add("active");
    });
  }

  // -------- Pestañas de pie (.tab3 / .tab-content3) --------
  var tabLinks3 = document.querySelectorAll(".tab3");
  for (var j = 0; j < tabLinks3.length; j++) {
    tabLinks3[j].addEventListener("click", function (e) {
      e.preventDefault();

      var tabId3 = this.getAttribute("data-tab3");
      var container3 = this.closest(".detalles");

      var tabContents3 = container3.querySelectorAll(".tab-content3");
      tabContents3.forEach(function (el) { el.style.display = "none"; });

      var tabContent3 = document.getElementById(tabId3);
      if (tabContent3) tabContent3.style.display = "block";

      var activeTab3 = container3.querySelector(".tab3.active");
      if (activeTab3) activeTab3.classList.remove("active");
      this.classList.add("active");
    });
  }

  // -------- Sub-pestañas anidadas (.tab2 / .tab-content2) --------
  // Escuchadas por delegación en document (no en tabLinks/document.querySelectorAll
  // directo) porque .tab2 vive DENTRO de un .tab-content que puede estar oculto
  // al cargar la página -- delegar evita perder el listener en contenido que se
  // muestra/oculta dinámicamente.
  document.addEventListener("click", function (e) {
    var boton = e.target.closest(".tab2");
    if (!boton) return;
    e.preventDefault();

    var subId = boton.getAttribute("data-tab2");
    var contenedorPadre = boton.closest(".tab-content");
    if (!contenedorPadre) return;

    var subContents = contenedorPadre.querySelectorAll(".tab-content2");
    subContents.forEach(function (el) { el.style.display = "none"; });

    var subContent = contenedorPadre.querySelector("#" + CSS.escape(subId));
    if (subContent) subContent.style.display = "block";

    var subActivo = contenedorPadre.querySelector(".tab2.active");
    if (subActivo) subActivo.classList.remove("active");
    boton.classList.add("active");
  });
});

/* -------- Buscador de excursiones --------
   Se llama desde el HTML: <input ... onkeyup="filterTabsOpcionales(this)">
   Recibe el propio <input> (no re-busca por id) para que funcione aunque
   haya más de un buscador en la misma página. */
function filterTabsOpcionales(inputEl) {
  var filtro = inputEl.value.toLowerCase();
  var container = inputEl.closest(".contenido") || document;
  var tabs = container.querySelectorAll(".tab-link");

  tabs.forEach(function (tab) {
    var coincide = tab.textContent.toLowerCase().includes(filtro);
    tab.classList.toggle("hidden", !coincide);
  });
}
