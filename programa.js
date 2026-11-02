'use strict';
/* ============ CONFIGURACIÓN ============ */
const DB_KEY = 'retrobyte_db_v1';
const SESSION_KEY = 'retrobyte_session';
const PREFS_KEY = 'retrobyte_prefs';
const LOCK_KEY = 'retrobyte_lock';
const PASS_GRADE = 70;
const DEFAULT_VALIDITY = 365;   // días de vigencia del diploma (editable por el admin)
const DEFAULT_COOLDOWN = 2;     // minutos de espera tras reprobar (editable por el admin)
const EXAM_SIZE = 7;            // preguntas por intento (se sacan al azar del banco de 15)
const EXAM_SECONDS = 600;       // 10 minutos
const PAGE_SIZE = 10;           // filas por página en las tablas
const MAX_FAILS = 5;            // intentos de login fallidos antes del bloqueo
const LOCK_SECONDS = 60;        // duración del bloqueo
const PEPPER = 'RB-2026-integridad';

/* ============ CURSOS ============ */
/* video: ID de YouTube (lo que va después de "v=" en la URL). Si está vacío, se muestra un enlace de búsqueda.
   Para probar un ID abre: https://www.youtube.com/embed/EL_ID  — si reproduce, sirve. */
const COURSES = [
  /* ---------- 1) NETBEANS ---------- */
  { id: 'nb', title: 'NetBeans: tu primer IDE', short: 'NetBeans', icon: '☕',
    desc: 'Instala NetBeans, crea proyectos en Java, escribe tus primeros programas y diseña ventanas con Swing.',
    modules: [
      { id: 'nb-m1', title: 'Conociendo NetBeans', icon: '🧭',
        img: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Apache_NetBeans_Logo.svg', video: 'L1oMLsiMusQ', vq: 'NetBeans tutorial español principiantes',
        links: [['Sitio oficial de Apache NetBeans', 'https://netbeans.apache.org/']],
        lessons: [
          { id: 'nb-1', title: '¿Qué es NetBeans?', mins: 3,
            read: ['Un <b>IDE</b> (Integrated Development Environment, entorno de desarrollo integrado) es un programa que reúne en un solo lugar el editor de código, el compilador y el depurador.',
                   '<b>Apache NetBeans</b> es un IDE gratuito y de código abierto. Se usa sobre todo para programar en <b>Java</b>, aunque también soporta HTML5, PHP, C/C++ y otros lenguajes.',
                   'Sus ventajas: autocompletado de código, marcado de errores mientras escribes, creación de proyectos con un clic y un diseñador visual de ventanas.'],
            tip: 'Para programar en Java necesitas instalar un <b>JDK</b> (Java Development Kit). NetBeans es el editor; el JDK es lo que compila y ejecuta tu código.',
            lang: 'Java', sample: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("¡Hola desde NetBeans!");\n    }\n}`,
            check: { q: '¿Qué es NetBeans?', opts: ['Un entorno de desarrollo integrado (IDE)', 'Un lenguaje de programación', 'Un sistema operativo'], ans: 0 } },
          { id: 'nb-2', title: 'Instalación y primer proyecto', mins: 4,
            read: ['Paso 1: instala el <b>JDK</b>. Paso 2: descarga e instala <b>Apache NetBeans</b> desde su sitio oficial.',
                   'Para crear un proyecto usa el menú <code>File → New Project</code>, elige la categoría <b>Java</b> y el tipo <b>Java Application</b>, ponle nombre y pulsa <b>Finish</b>.',
                   'NetBeans crea una clase con el método principal <code>public static void main(String[] args)</code>, que es el punto donde empieza tu programa.'],
            tip: 'El nombre de la clase pública debe ser igual al del archivo: la clase <code>Main</code> va en <code>Main.java</code>.',
            lang: 'Estructura', sample: `MiProyecto\n └─ Source Packages\n     └─ miproyecto\n         └─ Main.java   ← aquí está el método main`,
            check: { q: 'Menú para crear un proyecto nuevo:', opts: ['File → New Project', 'Tools → Options', 'Run → Debug'], ans: 0 } },
          { id: 'nb-3', title: 'La interfaz de NetBeans', mins: 4,
            read: ['La pantalla se divide en zonas. La ventana <b>Projects</b> muestra el árbol de tus proyectos y archivos. El <b>Editor</b> es donde escribes el código.',
                   'La ventana <b>Output</b> muestra lo que imprime tu programa y los errores. El <b>Navigator</b> lista los métodos de la clase, y la <b>Palette</b> aparece al diseñar ventanas con botones, etiquetas y cajas de texto para arrastrar.',
                   'Atajos útiles: <code>Ctrl+Espacio</code> abre el autocompletado y <code>Alt+Shift+F</code> da formato al código.'],
            fig: `<div class="fig"><div class="a">📁 <b>Projects</b><br><small>árbol de tus proyectos</small></div><div class="b">✏️ <b>Editor</b><br><small>aquí escribes el código</small></div><div>🧰 <b>Palette / Navigator</b></div><div class="c">🖥 <b>Output</b> — lo que imprime tu programa</div></div>`,
            check: { q: '¿En qué ventana aparece lo que imprime tu programa?', opts: ['Output', 'Projects', 'Palette'], ans: 0 } }
        ] },
      { id: 'nb-m2', title: 'Programando en Java', icon: '☕',
        img: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Apache_NetBeans_Logo.svg', video: '' /* PEGA AQUÍ EL ID DEL VIDEO */, vq: 'Java Swing NetBeans interfaz gráfica tutorial',
        links: [['Tutoriales oficiales de Java', 'https://docs.oracle.com/javase/tutorial/']],
        lessons: [
          { id: 'nb-4', title: 'Hola Mundo, ejecutar y depurar', mins: 5,
            read: ['Para imprimir texto en la consola se usa <code>System.out.println("texto");</code>. Java distingue mayúsculas y minúsculas: <code>System</code> no es lo mismo que <code>system</code>.',
                   'Atajos de plantilla: escribe <code>sout</code> y pulsa <b>Tab</b> para generar <code>System.out.println()</code>; escribe <code>psvm</code> y <b>Tab</b> para crear el método <code>main</code>.',
                   'Para ejecutar el proyecto pulsa <b>F6</b> (<i>Run Project</i>). Para compilar todo desde cero usa <b>Shift+F11</b> (<i>Clean and Build</i>).',
                   'Para depurar, haz clic en el número de una línea para poner un <b>breakpoint</b> (punto de parada) y ejecuta con <b>Ctrl+F5</b>. El programa se detiene ahí y con <b>F8</b> avanzas línea por línea.'],
            lang: 'Java', sample: `public static void main(String[] args) {\n    System.out.println("Hola, mundo");\n    int suma = 2 + 3;          // pon aquí un breakpoint\n    System.out.println("2 + 3 = " + suma);\n}`,
            check: { q: 'Tecla para ejecutar el proyecto en NetBeans:', opts: ['F6', 'F1', 'Esc'], ans: 0 } },
          { id: 'nb-5', title: 'Variables y decisiones', mins: 5,
            read: ['Las variables guardan datos y en Java debes indicar su <b>tipo</b>: <code>int</code> (enteros), <code>double</code> (decimales), <code>String</code> (texto) y <code>boolean</code> (verdadero o falso).',
                   'Las decisiones usan <code>if</code> / <code>else</code>. Para leer datos del teclado se usa <code>Scanner</code>, y cada instrucción termina con punto y coma <code>;</code>.'],
            lang: 'Java', sample: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Escribe tu nota: ");\n        int nota = sc.nextInt();\n        if (nota >= 70) {\n            System.out.println("¡Aprobado!");\n        } else {\n            System.out.println("A repasar...");\n        }\n    }\n}`,
            check: { q: 'Tipo de dato para números enteros:', opts: ['int', 'String', 'boolean'], ans: 0 } },
          { id: 'nb-6', title: 'Ventanas con Swing', mins: 5,
            read: ['Con NetBeans puedes diseñar ventanas arrastrando componentes. Crea un archivo con <code>New File → Swing GUI Forms → JFrame Form</code>.',
                   'En la <b>Palette</b> arrastra un <b>JLabel</b> (texto), un <b>JTextField</b> (caja de texto) y un <b>JButton</b> (botón). Con doble clic en el botón, NetBeans crea el método del evento <code>ActionPerformed</code>, donde escribes lo que sucede al pulsarlo.',
                   'Para mostrar un mensaje emergente se usa <code>JOptionPane.showMessageDialog</code>.'],
            lang: 'Java', sample: `private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {\n    String nombre = jTextField1.getText();\n    jLabel1.setText("Hola, " + nombre);\n    JOptionPane.showMessageDialog(this, "¡Bienvenido!");\n}`,
            check: { q: 'Clase de Swing para mostrar un mensaje emergente:', opts: ['JOptionPane', 'JLabel', 'JTextField'], ans: 0 } }
        ] }
    ],
    bank: [
      { id: 'n1', type: 'radio', topic: 'Entorno', q: '¿Qué es NetBeans?', opts: ['Un entorno de desarrollo integrado (IDE)', 'Un lenguaje de programación', 'Un navegador web', 'Un sistema operativo'], ans: 0 },
      { id: 'n2', type: 'radio', topic: 'Entorno', q: '¿Qué debes instalar para poder programar en Java con NetBeans?', opts: ['El JDK', 'Photoshop', 'Un antivirus', 'El JDK no hace falta'], ans: 0 },
      { id: 'n3', type: 'checkbox', topic: 'Entorno', q: 'Marca TODOS los elementos que son parte de la interfaz de NetBeans:', opts: ['Projects', 'Editor', 'Output', 'Capas de Photoshop'], ans: [0, 1, 2] },
      { id: 'n4', type: 'checkbox', topic: 'Java', q: 'Marca TODOS los tipos de dato válidos en Java:', opts: ['int', 'String', 'double', 'texto'], ans: [0, 1, 2] },
      { id: 'n5', type: 'select', topic: 'Java', q: '¿Qué escribes y pulsas Tab para generar System.out.println()?', opts: ['sout', 'print', 'echo', 'out'], ans: 0 },
      { id: 'n6', type: 'select', topic: 'Java', q: '¿Qué clase de Swing muestra un mensaje emergente?', opts: ['JOptionPane', 'JMessage', 'Popup', 'Alert'], ans: 0 },
      { id: 'n7', type: 'list', topic: 'Java', q: 'Elige la firma correcta del método principal:', opts: ['public static void main(String[] args)', 'public void start()', 'static int main()', 'void run(String args)'], ans: 0 },
      { id: 'n8', type: 'list', topic: 'Entorno', q: 'Elige la ventana donde aparece lo que imprime tu programa:', opts: ['Projects', 'Output', 'Palette', 'Navigator'], ans: 1 },
      { id: 'n9', type: 'text', topic: 'Java', q: 'Escribe el tipo de dato de Java para números enteros:', ans: ['int'] },
      { id: 'n10', type: 'tf', topic: 'Java', q: 'En Java, System y system se consideran lo mismo.', opts: ['Verdadero', 'Falso'], ans: 1 },
      { id: 'n11', type: 'tf', topic: 'Entorno', q: 'Un breakpoint sirve para pausar la ejecución en una línea y depurar.', opts: ['Verdadero', 'Falso'], ans: 0 },
      { id: 'n12', type: 'range', topic: 'Entorno', q: '¿Qué tecla de función (F?) ejecuta el proyecto? Usa el deslizador.', min: 1, max: 12, ans: 6 },
      { id: 'n13', type: 'radio', topic: 'Java', q: 'Después de escribir psvm, ¿qué tecla genera el método main?', opts: ['Tab', 'Esc', 'Supr', 'Alt'], ans: 0 },
      { id: 'n14', type: 'tf', topic: 'Java', q: 'En Java, cada instrucción termina con punto y coma (;).', opts: ['Verdadero', 'Falso'], ans: 0 },
      { id: 'n15', type: 'text', topic: 'Java', q: 'Escribe el nombre de la clase de Java que se usa para leer datos del teclado:', ans: ['scanner'] }
    ] },

  /* ---------- 2) FUNDAMENTOS DE LA WEB ---------- */
  { id: 'web', title: 'Fundamentos de la Web', short: 'Web', icon: '🕹️',
    desc: 'HTML, CSS y JavaScript desde cero. 9 lecciones con laboratorio en vivo, videos y examen final.',
    modules: [
      { id: 'html', title: 'HTML', icon: '📄',
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg', video: 'UB1O30fR-EE', vq: 'HTML curso básico',
        links: [['Guía HTML en MDN', 'https://developer.mozilla.org/es/docs/Web/HTML']],
        lessons: [
          { id: 'html-1', title: '¿Qué es HTML?', mins: 3,
            read: ['<b>HTML</b> (HyperText Markup Language) es el lenguaje que da <b>estructura</b> a una página: dice qué es un título, qué es un párrafo y qué es una imagen.',
                   'Funciona con <b>etiquetas</b>. Casi siempre se abren y se cierran, como <code>&lt;p&gt;texto&lt;/p&gt;</code>. Lo que va en medio es el contenido.',
                   'Toda página tiene un esqueleto: <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> (datos invisibles) y <code>&lt;body&gt;</code> (lo que se ve).'],
            tip: 'Los títulos van de <code>&lt;h1&gt;</code> (el más importante) a <code>&lt;h6&gt;</code>: son 6 niveles.',
            code: `<h1>¡Hola, mundo!</h1>\n<p>Esta es mi <b>primera</b> página.</p>\n<h2>Un subtítulo</h2>`,
            check: { q: '¿Qué significan las siglas HTML?', opts: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Level'], ans: 0 } },
          { id: 'html-2', title: 'Enlaces e imágenes', mins: 4,
            read: ['Los <b>hipervínculos</b> usan <code>&lt;a href="destino"&gt;texto&lt;/a&gt;</code>. El atributo <code>href</code> indica a dónde lleva el enlace.',
                   'Las imágenes usan <code>&lt;img src="ruta" alt="descripción"&gt;</code>. El <code>alt</code> ayuda a personas con lector de pantalla y se muestra si la imagen falla.'],
            tip: 'En este recuadro de práctica los enlaces externos no abren; en tu página real sí funcionan.',
            code: `<a href="https://developer.mozilla.org/es/">Ir a MDN</a>\n<br><br>\n<img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="Logo HTML5" width="120">`,
            check: { q: '¿Qué atributo indica el destino de un enlace?', opts: ['src', 'href', 'alt'], ans: 1 } },
          { id: 'html-3', title: 'Listas y formularios', mins: 4,
            read: ['Las listas se hacen con <code>&lt;ul&gt;</code> (viñetas) o <code>&lt;ol&gt;</code> (numeradas). Cada elemento va en <code>&lt;li&gt;</code>.',
                   'Los <b>formularios</b>, como el de registro de este curso, usan <code>&lt;form&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code> y <code>&lt;button&gt;</code>.'],
            code: `<ol>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ol>\n<input placeholder="Tu nombre">\n<select><option>Guatemala</option><option>México</option></select>\n<button>Enviar</button>`,
            check: { q: 'Etiqueta para una lista NUMERADA:', opts: ['<ul>', '<ol>', '<li>'], ans: 1 } }
        ] },
      { id: 'css', title: 'CSS', icon: '🎨',
        img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg', video: 'yfoY53QXEnI', vq: 'CSS curso básico',
        links: [['Guía CSS en MDN', 'https://developer.mozilla.org/es/docs/Web/CSS']],
        lessons: [
          { id: 'css-1', title: 'Selectores y colores', mins: 4,
            read: ['<b>CSS</b> controla el aspecto: colores, tamaños y fuentes. Una regla tiene un <b>selector</b> y unas <b>declaraciones</b>: <code>p { color: red; }</code>.',
                   'Se selecciona por etiqueta (<code>p</code>), por clase (<code>.clase</code>) o por id (<code>#id</code>).'],
            tip: 'Cambia <code>hotpink</code> por <code>orange</code> y mira cómo se actualiza solo.',
            code: `<style>\n  body { font-family: sans-serif; }\n  h1 { color: hotpink; }\n  .caja { background: #222; color: lime; padding: 10px; }\n</style>\n<h1>Hola CSS</h1>\n<p class="caja">Soy una caja con clase.</p>`,
            check: { q: 'Símbolo que selecciona una CLASE en CSS:', opts: ['# (numeral)', '. (punto)', '@ (arroba)'], ans: 1 } },
          { id: 'css-2', title: 'El modelo de caja', mins: 4,
            read: ['Todo elemento es una caja con capas: <b>contenido</b>, <b>padding</b> (espacio interno), <b>border</b> (borde) y <b>margin</b> (espacio externo).',
                   'Para acomodar cajas en filas y columnas existen <b>flexbox</b> y <b>grid</b>.'],
            code: `<style>\n  .caja { background: gold; padding: 20px; border: 5px solid purple; margin: 30px; }\n</style>\n<div class="caja">Cambia padding y margin</div>`,
            check: { q: 'Espacio ENTRE el contenido y el borde:', opts: ['margin', 'padding', 'display'], ans: 1 } },
          { id: 'css-3', title: 'Animaciones', mins: 5,
            read: ['Una animación tiene dos partes: la regla <code>@keyframes</code>, que define los pasos, y la propiedad <code>animation</code>, que la aplica.',
                   'Así está hecho este sitio: botones que se hunden, cursor que parpadea, confeti…'],
            code: `<style>\n  .bola { width:50px; height:50px; background:deeppink; border-radius:50%;\n          animation: saltar 1s infinite alternate; }\n  @keyframes saltar { from { transform: translateY(0); } to { transform: translateY(100px); } }\n</style>\n<div class="bola"></div>`,
            check: { q: 'Regla que define los pasos de una animación:', opts: ['@keyframes', '@media', '@import'], ans: 0 } }
        ] },
      { id: 'js', title: 'JavaScript', icon: '⚡',
        img: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg', video: 'hdI2bqOjy3c', vq: 'JavaScript curso básico',
        links: [['Guía JavaScript en MDN', 'https://developer.mozilla.org/es/docs/Web/JavaScript']],
        lessons: [
          { id: 'js-1', title: 'Variables y tipos', mins: 4,
            read: ['<b>JavaScript</b> agrega comportamiento: reacciona a clics, calcula y cambia la página. ¡No es lo mismo que Java!',
                   'Las variables guardan datos: <code>const</code> para valores que no cambian y <code>let</code> para los que sí. Tipos comunes: texto, número y booleano.'],
            code: `<p id="salida"></p>\n<script>\n  const nombre = "Ana";\n  let edad = 20;\n  edad = edad + 1;\n  document.getElementById("salida").textContent = nombre + " tiene " + edad + " años";\n</script>`,
            check: { q: 'Palabra clave para declarar una CONSTANTE:', opts: ['let', 'const', 'int'], ans: 1 } },
          { id: 'js-2', title: 'Funciones y eventos', mins: 5,
            read: ['Una <b>función</b> es un bloque reutilizable: <code>function saludar() { ... }</code>.',
                   'Un <b>evento</b> es algo que hace el usuario (clic, teclear). Con <code>addEventListener</code> conectas el evento con tu función.'],
            code: `<button id="btn">Púlsame</button>\n<p id="msg"></p>\n<script>\n  let clics = 0;\n  document.getElementById("btn").addEventListener("click", function () {\n    clics++;\n    document.getElementById("msg").textContent = "Clics: " + clics;\n  });\n</script>`,
            check: { q: 'Método para escuchar un clic:', opts: ['addEventListener', 'listenClick', 'onPress'], ans: 0 } },
          { id: 'js-3', title: 'Manipular el DOM', mins: 5,
            read: ['El <b>DOM</b> es la página convertida en objetos que JavaScript puede leer y modificar.',
                   'Con <code>getElementById</code> o <code>querySelector</code> buscas un elemento, y con <code>textContent</code>, <code>style</code> o <code>classList</code> lo cambias. Así funciona este mismo curso.'],
            tip: 'Para depurar, escribe en la consola con <code>console.log()</code> (F12 en el navegador).',
            code: `<h1 id="t">Título</h1>\n<button onclick="cambiar()">Cambiar color</button>\n<script>\n  function cambiar() {\n    const t = document.getElementById("t");\n    t.style.color = "tomato";\n    t.textContent = "¡Cambiado con JS!";\n  }\n</script>`,
            check: { q: 'Para mostrar algo en la consola se usa:', opts: ['print()', 'console.log()', 'echo()'], ans: 1 } }
        ] }
    ],
    bank: [
      { id: 'w1', type: 'radio', topic: 'HTML', q: '¿Qué etiqueta HTML inserta una imagen?', opts: ['<img>', '<image>', '<src>', '<pic>'], ans: 0 },
      { id: 'w2', type: 'radio', topic: 'HTML', q: '¿Qué atributo indica el destino de un enlace?', opts: ['href', 'src', 'alt', 'link'], ans: 0 },
      { id: 'w3', type: 'checkbox', topic: 'CSS', q: 'Marca TODAS las propiedades CSS válidas:', opts: ['color', 'font-size', 'margin', 'text-style'], ans: [0, 1, 2] },
      { id: 'w4', type: 'checkbox', topic: 'HTML', q: 'Marca TODAS las etiquetas relacionadas con listas:', opts: ['<ul>', '<ol>', '<li>', '<table>'], ans: [0, 1, 2] },
      { id: 'w5', type: 'select', topic: 'CSS', q: '¿Qué símbolo selecciona una CLASE en CSS?', opts: ['# (numeral)', '. (punto)', '* (asterisco)', '@ (arroba)'], ans: 1 },
      { id: 'w6', type: 'select', topic: 'CSS', q: '¿Qué regla define los pasos de una animación?', opts: ['@media', '@import', '@keyframes', '@font'], ans: 2 },
      { id: 'w7', type: 'list', topic: 'JavaScript', q: 'Elige el método que escribe en la consola del navegador:', opts: ['print()', 'echo()', 'console.log()', 'write()'], ans: 2 },
      { id: 'w8', type: 'list', topic: 'JavaScript', q: 'Elige el método para escuchar un clic:', opts: ['listenClick', 'addEventListener', 'onPress', 'watch'], ans: 1 },
      { id: 'w9', type: 'text', topic: 'JavaScript', q: 'Escribe la palabra clave de JS para declarar una constante:', ans: ['const'] },
      { id: 'w10', type: 'tf', topic: 'JavaScript', q: 'Java y JavaScript son exactamente el mismo lenguaje.', opts: ['Verdadero', 'Falso'], ans: 1 },
      { id: 'w11', type: 'tf', topic: 'CSS', q: 'En el modelo de caja, el padding es el espacio EXTERNO entre una caja y otras.', opts: ['Verdadero', 'Falso'], ans: 1 },
      { id: 'w12', type: 'range', topic: 'HTML', q: '¿Cuántos niveles de encabezado existen (h1 hasta h?)? Usa el deslizador.', min: 1, max: 10, ans: 6 },
      { id: 'w13', type: 'radio', topic: 'HTML', q: '¿Qué etiqueta crea el encabezado MÁS importante de la página?', opts: ['<h1>', '<h6>', '<head>', '<title>'], ans: 0 },
      { id: 'w14', type: 'tf', topic: 'HTML', q: 'La etiqueta <body> contiene lo que se ve en la página.', opts: ['Verdadero', 'Falso'], ans: 0 },
      { id: 'w15', type: 'text', topic: 'CSS', q: 'Escribe la propiedad CSS que cambia el color del texto:', ans: ['color'] }
    ] },

  /* ---------- 3) PYTHON ARCADE ---------- */
  { id: 'py', title: 'Python Arcade', short: 'Python', icon: '🐍',
    desc: 'Aprende Python desde cero y termina creando tu primer videojuego con código.',
    modules: [
      { id: 'py-m1', title: 'Primeros pasos', icon: '🐍',
        img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', video: 'rfscVS0vtbw', vq: 'Python curso para principiantes',
        links: [['Documentación de Python en español', 'https://docs.python.org/es/3/tutorial/']],
        lessons: [
          { id: 'py-1', title: '¿Qué es Python?', mins: 3,
            read: ['<b>Python</b> es un lenguaje de programación sencillo de leer, muy usado en ciencia de datos, automatización, inteligencia artificial y videojuegos.',
                   'Es un lenguaje <b>interpretado</b>: ejecutas el archivo <code>.py</code> y Python lo lee línea por línea. Para mostrar texto se usa <code>print()</code>, y los comentarios empiezan con <code>#</code>.'],
            tip: 'Python usa la <b>indentación</b> (sangría) para definir bloques. Lo normal son <b>4 espacios</b>, y es obligatoria: si la olvidas, el programa da error.',
            lang: 'Python', sample: `# Mi primer programa\nprint("¡Hola, jugador 1!")`,
            check: { q: 'Función para mostrar texto en pantalla:', opts: ['print()', 'echo()', 'show()'], ans: 0 } },
          { id: 'py-2', title: 'Variables y tipos', mins: 4,
            read: ['Una variable se crea al asignarle un valor, sin declarar tipo: <code>vidas = 3</code>. Tipos básicos: <code>int</code> (enteros), <code>float</code> (decimales), <code>str</code> (texto) y <code>bool</code> (<code>True</code> o <code>False</code>).',
                   'La función <code>input()</code> lee lo que escribe el usuario (siempre como texto) y <code>type()</code> te dice el tipo de un valor. Para convertir usa <code>int()</code> o <code>float()</code>.'],
            lang: 'Python', sample: `nombre = input("¿Cómo te llamas? ")\nvidas = 3\nprint("Hola", nombre, "tienes", vidas, "vidas")\nprint(type(vidas))   # <class 'int'>`,
            check: { q: 'Función que lee datos del teclado:', opts: ['input()', 'read()', 'scan()'], ans: 0 } },
          { id: 'py-3', title: 'Decisiones y bucles', mins: 5,
            read: ['Las decisiones usan <code>if</code>, <code>elif</code> y <code>else</code>. Los bucles repiten código: <code>for</code> recorre una secuencia y <code>while</code> repite mientras una condición sea verdadera.',
                   '<code>range(3)</code> genera los números 0, 1 y 2. Recuerda los dos puntos <code>:</code> al final de cada línea de control.'],
            lang: 'Python', sample: `puntos = 80\nif puntos >= 70:\n    print("¡Nivel superado!")\nelse:\n    print("Intenta otra vez")\n\nfor i in range(3):\n    print("Vuelta", i)\n\nvidas = 3\nwhile vidas > 0:\n    vidas -= 1`,
            check: { q: 'Bucle que repite mientras una condición sea verdadera:', opts: ['while', 'for', 'if'], ans: 0 } }
        ] },
      { id: 'py-m2', title: 'Arcade: tu primer juego', icon: '🎮',
        img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', video: '' /* PEGA AQUÍ EL ID DEL VIDEO */, vq: 'pygame tutorial español primer juego',
        links: [['Sitio oficial de Pygame', 'https://www.pygame.org/']],
        lessons: [
          { id: 'py-4', title: 'Listas y funciones', mins: 5,
            read: ['Una <b>lista</b> guarda varios valores: <code>items = ["espada", "escudo"]</code>. Agregas con <code>append()</code> y cuentas con <code>len()</code>.',
                   'Una <b>función</b> es un bloque reutilizable que se define con <code>def</code>. Puede recibir datos y devolver un resultado con <code>return</code>.'],
            lang: 'Python', sample: `items = ["espada", "escudo"]\nitems.append("poción")\nprint(len(items))        # 3\n\ndef saludar(nombre):\n    return "Hola, " + nombre\n\nprint(saludar("Ana"))`,
            check: { q: 'Palabra clave para definir una función:', opts: ['def', 'function', 'fun'], ans: 0 } },
          { id: 'py-5', title: 'Módulos y el juego de adivinar', mins: 5,
            read: ['Un <b>módulo</b> es código ya hecho que traes con <code>import</code>. El módulo <code>random</code> genera números al azar: <code>random.randint(1, 10)</code> devuelve un entero entre 1 y 10, <b>incluyendo ambos extremos</b>.',
                   'Con todo lo anterior ya puedes crear un juego: la computadora piensa un número y tú lo adivinas.'],
            lang: 'Python', sample: `import random\n\nsecreto = random.randint(1, 10)\nintentos = 3\n\nwhile intentos > 0:\n    n = int(input("Adivina (1-10): "))\n    if n == secreto:\n        print("¡Ganaste!")\n        break\n    intentos -= 1\n    print("Fallaste. Te quedan", intentos)\nelse:\n    print("Perdiste, era", secreto)`,
            check: { q: '¿random.randint(1, 10) puede devolver el número 10?', opts: ['Sí', 'No'], ans: 0 } },
          { id: 'py-6', title: 'Pygame: tu primer videojuego', mins: 6,
            read: ['<b>Pygame</b> es una librería para crear videojuegos en Python. Se instala con <code>pip install pygame</code>.',
                   'Todo juego tiene un <b>bucle principal</b> (game loop): en cada vuelta lee eventos, actualiza el juego y dibuja la pantalla, normalmente 60 veces por segundo.'],
            tip: 'Este ejemplo no corre dentro de la página: cópialo y ejecútalo en tu computadora con IDLE o cualquier editor de Python.',
            lang: 'Python + Pygame', sample: `import pygame\npygame.init()\npantalla = pygame.display.set_mode((640, 480))\nreloj = pygame.time.Clock()\nx = 0\ncorriendo = True\n\nwhile corriendo:\n    for evento in pygame.event.get():\n        if evento.type == pygame.QUIT:\n            corriendo = False\n    x += 3\n    pantalla.fill((26, 16, 51))\n    pygame.draw.rect(pantalla, (255, 62, 157), (x % 640, 200, 50, 50))\n    pygame.display.flip()\n    reloj.tick(60)\n\npygame.quit()`,
            check: { q: 'Librería de Python para crear videojuegos:', opts: ['pygame', 'django', 'numpy'], ans: 0 } }
        ] }
    ],
    bank: [
      { id: 'p1', type: 'radio', topic: 'Básico', q: '¿Qué función muestra texto en pantalla en Python?', opts: ['print()', 'echo()', 'console.log()', 'write()'], ans: 0 },
      { id: 'p2', type: 'radio', topic: 'Básico', q: '¿Con qué símbolo empieza un comentario en Python?', opts: ['#', '//', '<!--', '--'], ans: 0 },
      { id: 'p3', type: 'checkbox', topic: 'Básico', q: 'Marca TODOS los tipos de dato básicos de Python:', opts: ['int', 'float', 'str', 'char'], ans: [0, 1, 2] },
      { id: 'p4', type: 'checkbox', topic: 'Control', q: 'Marca TODAS las estructuras válidas en Python:', opts: ['for', 'while', 'if', 'repeat'], ans: [0, 1, 2] },
      { id: 'p5', type: 'select', topic: 'Funciones', q: '¿Qué palabra clave define una función?', opts: ['def', 'function', 'func', 'fn'], ans: 0 },
      { id: 'p6', type: 'select', topic: 'Básico', q: '¿Qué función lee datos del teclado?', opts: ['scan()', 'input()', 'read()', 'get()'], ans: 1 },
      { id: 'p7', type: 'list', topic: 'Funciones', q: 'Elige la función que devuelve cuántos elementos tiene una lista:', opts: ['count()', 'size()', 'len()', 'total()'], ans: 2 },
      { id: 'p8', type: 'list', topic: 'Juegos', q: 'Elige la librería para crear videojuegos vista en el curso:', opts: ['numpy', 'pygame', 'django', 'pandas'], ans: 1 },
      { id: 'p9', type: 'text', topic: 'Funciones', q: 'Escribe la palabra clave de Python para traer un módulo a tu programa:', ans: ['import'] },
      { id: 'p10', type: 'tf', topic: 'Básico', q: 'En Python la indentación (sangría) es obligatoria para definir bloques de código.', opts: ['Verdadero', 'Falso'], ans: 0 },
      { id: 'p11', type: 'tf', topic: 'Juegos', q: 'random.randint(1, 10) puede devolver el número 10.', opts: ['Verdadero', 'Falso'], ans: 0 },
      { id: 'p12', type: 'range', topic: 'Básico', q: '¿Cuántos espacios de indentación se usan normalmente? Usa el deslizador.', min: 1, max: 10, ans: 4 },
      { id: 'p13', type: 'radio', topic: 'Control', q: '¿Qué instrucción genera los números 0, 1 y 2?', opts: ['range(3)', 'list(3)', 'count(3)', 'numbers(3)'], ans: 0 },
      { id: 'p14', type: 'tf', topic: 'Juegos', q: 'Pygame se instala con el comando pip install pygame.', opts: ['Verdadero', 'Falso'], ans: 0 },
      { id: 'p15', type: 'text', topic: 'Funciones', q: 'Escribe la palabra clave de Python para devolver un resultado desde una función:', ans: ['return'] }
    ] }
];

COURSES.forEach(c => { c.lessons = c.modules.flatMap(m => m.lessons.map((l, k) => ({ ...l, mod: m, first: k === 0 }))); });
const COURSE_BY = Object.fromEntries(COURSES.map(c => [c.id, c]));
const QBANK = Object.fromEntries(COURSES.flatMap(c => c.bank.map(q => [q.id, { ...q, courseId: c.id }])));

/* Objetivo y requisitos por curso (se muestran arriba del curso) */
const GOALS = {
  nb:  { goal: 'Instalar y usar NetBeans para crear, ejecutar y depurar tus primeros programas en Java, incluyendo ventanas con Swing.', req: 'Ninguno. Solo ganas de aprender y una computadora.' },
  web: { goal: 'Construir una página web básica con HTML (estructura), CSS (diseño) y JavaScript (interactividad).', req: 'Ninguno. Manejo básico de la computadora.' },
  py:  { goal: 'Dominar los fundamentos de Python y crear tu primer videojuego con Pygame.', req: 'Ninguno. Si ya viste NetBeans o Web, mejor.' }
};
const COUNTRIES = ['Guatemala', 'México', 'El Salvador', 'Honduras', 'Costa Rica', 'Otro'];
const REQ_TYPES = { password: 'Cambiar contraseña', name: 'Cambiar nombre', email: 'Cambiar correo', other: 'Otro dato' };
const REQ_STATE = { pending: '⏳ Pendiente', approved: '✅ Aprobada', rejected: '❌ Rechazada', done: '✔ Completada' };

/* ============ UTILIDADES ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtDate = d => new Date(d).toLocaleDateString('es-GT', { dateStyle: 'long' });
const fmtDateTime = d => new Date(d).toLocaleString('es-GT');
const fmtClock = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const norm = s => String(s).trim().toLowerCase().replace(/\s+/g, ' ');
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

// Descarga genérica de archivos
function download(blob, name) {
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: name });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}

// Firma rápida (cyrb53) para detectar manipulación manual de los datos guardados
function sig(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) { const ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

/* ============ PAGINACIÓN ============ */
const pages = {};   // página actual de cada tabla: { list, users, req, audit, hist }
function pageSlice(key, arr, pagerSel) {
  const total = Math.max(1, Math.ceil(arr.length / PAGE_SIZE));
  const p = Math.min(Math.max(1, pages[key] || 1), total);
  pages[key] = p;
  $(pagerSel).innerHTML = arr.length > PAGE_SIZE
    ? `<button class="mini" data-pg="${key}" data-to="${p - 1}" ${p <= 1 ? 'disabled' : ''} aria-label="Página anterior">◀</button>
       <span>Página ${p} de ${total} · ${arr.length} registros</span>
       <button class="mini" data-pg="${key}" data-to="${p + 1}" ${p >= total ? 'disabled' : ''} aria-label="Página siguiente">▶</button>`
    : '';
  return arr.slice((p - 1) * PAGE_SIZE, p * PAGE_SIZE);
}

/* ============ PREFERENCIAS (tema y tamaño de letra) ============ */
const Prefs = {
  d: { theme: 'dark', fs: 100 },
  load() {
    try { Object.assign(this.d, JSON.parse(localStorage.getItem(PREFS_KEY) || '{}')); } catch { /* se usan los valores por defecto */ }
    this.apply();
  },
  apply() {
    document.body.classList.toggle('light', this.d.theme === 'light');
    document.documentElement.style.fontSize = this.d.fs + '%';
    $('#themeBtn').textContent = this.d.theme === 'light' ? '🌙' : '☀️';
  },
  save() { try { localStorage.setItem(PREFS_KEY, JSON.stringify(this.d)); } catch { /* sin almacenamiento */ } }
};
$('#themeBtn').addEventListener('click', () => { Prefs.d.theme = Prefs.d.theme === 'light' ? 'dark' : 'light'; Prefs.apply(); Prefs.save(); });
$('#fsDown').addEventListener('click', () => { Prefs.d.fs = Math.max(80, Prefs.d.fs - 10); Prefs.apply(); Prefs.save(); });
$('#fsUp').addEventListener('click', () => { Prefs.d.fs = Math.min(140, Prefs.d.fs + 10); Prefs.apply(); Prefs.save(); });

/* ============ CONTRASEÑAS (PBKDF2 con sal) ============ */
const enc = s => new TextEncoder().encode(s);
const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
const randSalt = () => hex(crypto.getRandomValues(new Uint8Array(16)));
async function hashPw(pw, salt) {
  if (!crypto.subtle) return 'f' + sig(salt + pw + PEPPER);          // respaldo si no hay HTTPS
  const k = await crypto.subtle.importKey('raw', enc(pw), 'PBKDF2', false, ['deriveBits']);
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc(salt), iterations: 100000, hash: 'SHA-256' }, k, 256));
}
async function legacyHash(t) {                                          // formato de la versión anterior
  if (!crypto.subtle) return btoa(t);
  return hex(await crypto.subtle.digest('SHA-256', enc(t)));
}
async function checkPw(u, pw) {
  if (u.salt) return u.pass === await hashPw(pw, u.salt);
  if (u.pass === await legacyHash(pw)) { u.salt = randSalt(); u.pass = await hashPw(pw, u.salt); DB.save(); return true; }  // migra a formato nuevo
  return false;
}

/* ============ BLOQUEO DE LOGIN (5 fallos = 60 s) ============ */
const Lock = {
  all() { try { return JSON.parse(localStorage.getItem(LOCK_KEY) || '{}'); } catch { return {}; } },
  put(o) { try { localStorage.setItem(LOCK_KEY, JSON.stringify(o)); } catch { /* sin almacenamiento */ } },
  key: u => 'u:' + String(u).toLowerCase(),
  left(u) {   // segundos de bloqueo que quedan
    const e = this.all()[this.key(u)];
    return e && e.until ? Math.max(0, Math.ceil((e.until - Date.now()) / 1000)) : 0;
  },
  tries(u) { const e = this.all()[this.key(u)]; return MAX_FAILS - (e?.fails || 0); },
  fail(u) {   // registra un fallo; devuelve true si el usuario quedó bloqueado
    const k = this.key(u), o = this.all();
    let e = o[k] || { fails: 0, until: 0 };
    if (e.until && e.until <= Date.now()) e = { fails: 0, until: 0 };
    e.fails++;
    if (e.fails >= MAX_FAILS) { e.until = Date.now() + LOCK_SECONDS * 1000; e.fails = 0; }
    o[k] = e; this.put(o);
    return e.until > Date.now();
  },
  clear(u) { const o = this.all(); delete o[this.key(u)]; this.put(o); }
};

function typeWriter(el, text, speed = 40) {
  el.textContent = ''; let i = 0;
  (function t() { if (i <= text.length) { el.textContent = text.slice(0, i++); setTimeout(t, speed); } })();
}

/* ============ "BASE DE DATOS" (localStorage + firma + copia segura) ============ */
const DB = {
  data: null, notice: '',
  async fresh() {
    const salt = randSalt();
    return { users: [{ username: 'admin', name: 'Administrador', lastname: 'Retro', email: 'admin@retrobyte.edu', age: 30, country: 'Guatemala', role: 'admin', salt, pass: await hashPw('2026', salt) }],
      results: [], progress: {}, requests: [], audit: [], settings: { validityDays: DEFAULT_VALIDITY, cooldownMin: DEFAULT_COOLDOWN } };
  },
  async seed() {   // base inicial publicada junto al sitio (datos-iniciales.json). Si no existe, devuelve null.
    try {
      const r = await fetch('datos-iniciales.json', { cache: 'no-store' });
      if (!r.ok) return null;
      const d = await r.json();
      if (d && Array.isArray(d.users) && Array.isArray(d.results) && d.users.some(u => u.role === 'admin')) return d;
    } catch { /* sin archivo o sin conexión: se usa la base vacía */ }
    return null;
  },
  normalize() {   // completa datos faltantes (versiones anteriores o respaldos importados)
    const d = this.data;
    d.users ||= []; d.results ||= []; d.progress ||= {}; d.settings ||= {}; d.requests ||= []; d.audit ||= [];
    d.settings.validityDays ??= DEFAULT_VALIDITY; d.settings.cooldownMin ??= DEFAULT_COOLDOWN;
    d.results.forEach(r => { r.courseId ||= 'web'; });                  // resultados anteriores eran del curso Web
  },
  async init() {
    const K = DB_KEY, raw = localStorage.getItem(K), s = localStorage.getItem(K + '_sig'), bak = localStorage.getItem(K + '_bak');
    const v2 = localStorage.getItem(K + '_ver') === '2';
    const ok = t => t && s && sig(t + PEPPER) === s;
    let txt = null;
    if (raw && ok(raw)) txt = raw;
    else if (raw && !s && !v2) txt = raw;                                // datos de la versión anterior: se migran
    else if (ok(bak)) { txt = bak; this.notice = 'Se detectó una modificación manual de los datos guardados. Se restauró la copia segura.'; }
    else if (raw || bak) this.notice = 'Se detectó una modificación manual de los datos guardados. Se reiniciaron a sus valores iniciales.';
    try { this.data = txt ? JSON.parse(txt) : null; } catch { this.data = null; }
    if (!this.data) this.data = await this.seed() || await this.fresh();
    this.normalize();
    this.save();
  },
  save() {
    try {
      const t = JSON.stringify(this.data);
      localStorage.setItem(DB_KEY, t); localStorage.setItem(DB_KEY + '_sig', sig(t + PEPPER));
      localStorage.setItem(DB_KEY + '_bak', t); localStorage.setItem(DB_KEY + '_ver', '2');
    } catch { alert('No se pudo guardar: el almacenamiento del navegador está lleno o bloqueado.'); }
  },
  findUser(u) { return this.data.users.find(x => x.username.toLowerCase() === String(u).toLowerCase()); },
  emailTaken(email, exceptUser) {   // ¿ya hay otro usuario con ese correo?
    const e = String(email).trim().toLowerCase(), ex = String(exceptUser || '').toLowerCase();
    return this.data.users.some(u => u.username.toLowerCase() !== ex && String(u.email).trim().toLowerCase() === e);
  },
  addResult(r) { this.data.results.push(r); this.save(); },
  deleteResult(id) { this.data.results = this.data.results.filter(r => r.id !== id); this.save(); }
};

/* Bitácora de auditoría: quién hizo qué y cuándo (máx. 300 movimientos) */
function logAudit(action, detail = '', who) {
  const a = (DB.data.audit ||= []);
  a.push({ date: new Date().toISOString(), by: who || Session.user?.username || 'sistema', action, detail });
  if (a.length > 300) a.splice(0, a.length - 300);
}

/* ============ VIGENCIA DEL DIPLOMA ============ */
const validityDays = () => DB.data.settings.validityDays;
const expiryOf = r => new Date(new Date(r.date).getTime() + validityDays() * 86400000);
const isValid = r => Date.now() <= expiryOf(r).getTime();
function bestDiploma(username, courseId) {
  const m = DB.data.results.filter(r => r.username === username && r.courseId === courseId && r.passed);
  return m.length ? m[m.length - 1] : null;
}

/* ============ SESIÓN (firmada) ============ */
const Session = {
  get user() {
    const v = sessionStorage.getItem(SESSION_KEY); if (!v) return null;
    const i = v.lastIndexOf('|'), u = v.slice(0, i), s = v.slice(i + 1);
    if (s !== sig(u + PEPPER + 's')) { this.clear(); return null; }
    return DB.findUser(u) || null;
  },
  set(u) { sessionStorage.setItem(SESSION_KEY, u + '|' + sig(u + PEPPER + 's')); },
  clear() { sessionStorage.removeItem(SESSION_KEY); }
};

/* ============ ESTADO ============ */
let currentCourse = 'nb', currentLesson = 0, exam = null, timer = null, lastResult = null, lastExam = null, adminTab = 'summary';
const course = () => COURSE_BY[currentCourse];
const progressArr = () => { const p = DB.data.progress, u = Session.user.username; if (!Object.hasOwn(p, u)) p[u] = []; return p[u]; };
const doneIn = c => { const all = progressArr(); return c.lessons.map(l => l.id).filter(id => all.includes(id)); };
const stopTimer = () => { clearInterval(timer); timer = null; };
const studentsOf = () => DB.data.users.filter(u => u.role !== 'admin');

/* ============ NAVEGACIÓN ============ */
function renderNav() {
  const u = Session.user, nav = $('#nav'), b = (g, t) => `<button data-go="${g}">${t}</button>`, out = `<button data-act="logout">Salir</button>`;
  if (!u) nav.innerHTML = b('home', 'Inicio') + b('register', 'Registro') + b('login', 'Ingresar') + b('verify', '🔎 Verificar');
  else if (u.role === 'admin') nav.innerHTML = b('admin', 'Panel') + b('verify', '🔎 Verificar') + out;
  else nav.innerHTML = b('home', 'Inicio') + b('profile', 'Mi ficha') + b('catalog', 'Mis cursos') + b('history', '📜 Historial') + b('mydiploma', '🏅 Diplomas') + b('ranking', '🏆 Ranking') + b('verify', '🔎 Verificar') + out;
}

function go(id) {
  const u = Session.user;
  stopTimer();
  $('#nav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false'); $('#menuBtn').textContent = '☰';
  const student = ['profile', 'catalog', 'course', 'quiz', 'result', 'mydiploma', 'history', 'ranking'];
  if (student.includes(id) && !u) id = 'login';
  if (u?.role === 'admin' && student.includes(id)) id = 'admin';
  if (id === 'admin' && u?.role !== 'admin') id = 'login';
  if (id === 'result' && !lastResult) id = 'catalog';
  if (id === 'quiz' && u && doneIn(course()).length < course().lessons.length) id = 'course';
  $$('.screen').forEach(s => s.classList.remove('active'));
  $('#' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'home') { renderHome(); typeWriter($('#heroTitle'), '¡BIENVENIDO AL INSTITUTO RETRO BYTE!'); }
  if (id === 'profile') renderProfile();
  if (id === 'catalog') renderCatalog();
  if (id === 'course') renderCourse();
  if (id === 'quiz') renderQuiz();
  if (id === 'mydiploma') renderMyDiploma();
  if (id === 'history') renderHistory();
  if (id === 'ranking') renderRanking();
  if (id === 'admin') renderAdmin();
  revealCards();
}

document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]');
  if (g && !g.disabled) go(g.dataset.go);
  const c = e.target.closest('[data-course]'); if (c) openCourse(c.dataset.course);
  const q = e.target.closest('[data-quiz]'); if (q) { currentCourse = q.dataset.quiz; go('quiz'); }
  if (e.target.closest('[data-act="logout"]')) { Session.clear(); currentLesson = 0; exam = null; lastResult = null; renderNav(); go('home'); }
  const p = e.target.closest('[data-act="print"]');
  if (p) {
    const dip = (p.closest('.dipwrap') || $('.screen.active')).querySelector('.diploma');
    if (!dip || dip.classList.contains('expired')) { alert('No hay un diploma vigente para imprimir.'); return; }
    dip.classList.add('printing'); window.print();
  }
  const eye = e.target.closest('[data-eye]');
  if (eye) {
    const inp = eye.parentElement.querySelector('input'), show = inp.type === 'password';
    inp.type = show ? 'text' : 'password'; eye.textContent = show ? '🙈' : '👁';
    eye.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
  }
  const pg = e.target.closest('[data-pg]');   // botones de paginación
  if (pg && !pg.disabled) { pages[pg.dataset.pg] = +pg.dataset.to; if (pg.dataset.pg === 'hist') renderHistory(); else renderAdmin(); }
});
window.addEventListener('afterprint', () => $$('.printing').forEach(x => x.classList.remove('printing')));
$('#menuBtn').addEventListener('click', () => {
  const open = $('#nav').classList.toggle('open');
  $('#menuBtn').setAttribute('aria-expanded', open); $('#menuBtn').textContent = open ? '✕' : '☰';
});

function revealCards() {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); } }), { threshold: .2 });
  $$('.reveal:not(.show)').forEach((c, i) => { c.style.transitionDelay = i * 120 + 'ms'; io.observe(c); });
}

/* ============ INICIO Y CATÁLOGO ============ */
function renderHome() {
  const u = Session.user, target = u ? (u.role === 'admin' ? 'admin' : 'catalog') : 'register';
  $('#homeCards').innerHTML = COURSES.map((c, i) => `
    <article class="card reveal" data-go="${target}">
      <div class="sprite">${c.icon}</div>
      <h3>${i + 1}. ${esc(c.title)}</h3>
      <p>${esc(c.desc)}</p>
      <p class="hint">${c.modules.length} módulos · ${c.lessons.length} lecciones · examen y diploma</p>
      <span class="tag ok">DISPONIBLE</span>
    </article>`).join('');
}

function renderCatalog() {
  const u = Session.user;
  $('#catalogCards').innerHTML = COURSES.map(c => {
    const n = doneIn(c).length, t = c.lessons.length, pct = Math.round(n / t * 100), dip = bestDiploma(u.username, c.id);
    return `<article class="card">
      <div class="sprite">${c.icon}</div><h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p>
      <div class="progress mini"><div style="width:${pct}%"></div></div>
      <p class="hint">${n}/${t} lecciones · ${dip ? (isValid(dip) ? '🏅 Diploma vigente' : '⌛ Diploma vencido') : 'Sin diploma'}</p>
      <button class="btn pink" data-course="${c.id}">${n ? '▶ Continuar' : '▶ Comenzar'}</button></article>`;
  }).join('');
}

function openCourse(id) {
  currentCourse = id;
  const c = course(), d = progressArr(), i = c.lessons.findIndex(l => !d.includes(l.id));
  currentLesson = i < 0 ? 0 : i;
  go('course');
}

/* ============ REGISTRO, LOGIN Y RECUPERACIÓN ============ */
$('#registerForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, msg = $('#registerMsg'); msg.className = 'msg';
  let ok = true;
  $$('input,select', f).forEach(i => { const bad = !i.checkValidity(); i.classList.toggle('bad', bad); if (bad) ok = false; });
  if (!ok) { msg.textContent = '⚠ Revisa los campos marcados en rojo.'; return; }
  const { password, ...d } = Object.fromEntries(new FormData(f));
  d.username = d.username.trim(); d.email = d.email.trim();
  if (DB.findUser(d.username)) { msg.textContent = '⚠ Ese usuario ya existe.'; return; }
  if (DB.emailTaken(d.email)) { msg.textContent = '⚠ Ese correo ya está registrado.'; return; }
  const salt = randSalt();
  DB.data.users.push({ ...d, role: 'student', salt, pass: await hashPw(password, salt), createdAt: new Date().toISOString() });
  logAudit('Nuevo registro', `${d.name} ${d.lastname}`, d.username);
  DB.save(); Session.set(d.username); f.reset(); msg.textContent = ''; renderNav(); go('profile');
});

let lockTimer = null;
function showLock(name) {   // mensaje de bloqueo con cuenta regresiva
  clearInterval(lockTimer);
  const msg = $('#loginMsg');
  const paint = () => {
    const s = Lock.left(name);
    if (s <= 0) { clearInterval(lockTimer); msg.textContent = ''; return; }
    msg.textContent = `🔒 Demasiados intentos fallidos. Espera ${s} s para volver a intentar.`;
  };
  paint(); lockTimer = setInterval(paint, 1000);
}

$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  clearInterval(lockTimer);
  const form = e.target, d = Object.fromEntries(new FormData(form)), msg = $('#loginMsg'), name = d.username.trim();
  if (Lock.left(name) > 0) { showLock(name); return; }          // bloqueado: ni siquiera se revisa la contraseña
  const u = DB.findUser(name);
  if (!u || !(await checkPw(u, d.password))) {
    if (Lock.fail(name)) {
      if (u) { logAudit('Usuario bloqueado por intentos fallidos', `${u.username} (${LOCK_SECONDS} s)`, 'sistema'); DB.save(); }
      showLock(name);
    } else msg.textContent = `⚠ Usuario o contraseña incorrectos. Te quedan ${Lock.tries(name)} intento(s).`;
    return;
  }
  Lock.clear(name);
  msg.textContent = ''; Session.set(u.username); form.reset(); renderNav();
  go(u.role === 'admin' ? 'admin' : 'profile');
});

$('#forgotBtn').addEventListener('click', () => $('#forgotForm').classList.toggle('hidden'));
$('#forgotForm').addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target)), msg = $('#forgotMsg'), u = DB.findUser(d.username.trim());
  if (u && u.role !== 'admin' && String(u.email).toLowerCase() === d.email.trim().toLowerCase()
      && !DB.data.requests.some(r => r.username === u.username && r.status === 'pending')) {
    DB.data.requests.push({ id: Date.now(), username: u.username, type: 'password', recover: true, note: 'Olvidó su contraseña', status: 'pending', date: new Date().toISOString() });
    logAudit('Solicitud de recuperación de contraseña', u.username, u.username);
    DB.save();
  }
  // mismo mensaje siempre, para no revelar qué usuarios existen
  msg.className = 'msg ok';
  msg.textContent = '✔ Si los datos coinciden, el administrador recibirá tu solicitud y te entregará una contraseña temporal.';
  e.target.reset();
});

/* ============ FICHA ============ */
function renderProfile() {
  const u = Session.user;
  const dips = COURSES.filter(c => { const d = bestDiploma(u.username, c.id); return d && isValid(d); }).length;
  const rows = [['Nombre', `${u.name} ${u.lastname}`], ['Usuario', u.username], ['Correo', u.email], ['Edad', u.age], ['País', u.country],
    ['Cursos disponibles', COURSES.length], ['Diplomas vigentes', `${dips} de ${COURSES.length}`]];
  $('#profileData').innerHTML = rows.map(([k, v]) => `<div class="row"><b>${k}</b><span>${esc(v)}</span></div>`).join('');
  renderBadges(u);
  renderProfileEdit(u);
}

/* ============ LOGROS E INSIGNIAS ============ */
function badgesOf(u) {
  const rs = DB.data.results.filter(r => r.username === u.username), ok = rs.filter(r => r.passed);
  const full = COURSES.filter(c => doneIn(c).length === c.lessons.length).length;
  return [
    ['🥇', 'Primer diploma', 'Aprueba tu primera evaluación', ok.length > 0],
    ['💯', 'Nota perfecta', 'Obtén 100/100 en una evaluación', rs.some(r => r.grade === 100)],
    ['⚡', 'Velocista', 'Aprueba en menos de 3 minutos', ok.some(r => r.secs != null && r.secs < 180)],
    ['📚', 'Estudioso', 'Completa todas las lecciones de un curso', full > 0],
    ['🔥', 'Constante', 'Presenta 3 evaluaciones', rs.length >= 3],
    ['🎓', 'Triple corona', 'Diplomas vigentes en los 3 cursos', COURSES.every(c => { const d = bestDiploma(u.username, c.id); return d && isValid(d); })]
  ];
}
function renderBadges(u) {
  const b = badgesOf(u), n = b.filter(x => x[3]).length;
  $('#badges').innerHTML = `<h3>🏅 Mis logros (${n}/${b.length})</h3><div class="badges">` +
    b.map(([i, t, d, on]) => `<div class="badge ${on ? 'on' : ''}" title="${esc(d)}"><span>${i}</span><small>${esc(t)}</small><small class="hint">${esc(d)}</small></div>`).join('') + '</div>';
}

/* ============ EDITAR DATOS / SOLICITUDES (estudiante) ============ */
function userFormHTML(u, id, btn, cancel) {
  return `<form id="${id}" class="userform" novalidate>
    <div class="grid">
      <label>Nombre<input name="name" value="${esc(u.name)}" required></label>
      <label>Apellido<input name="lastname" value="${esc(u.lastname)}" required></label>
      <label>Correo<input name="email" type="email" value="${esc(u.email)}" required></label>
      <label>Edad<input name="age" type="number" min="10" max="99" value="${esc(u.age)}" required></label>
      <label>País<select name="country">${COUNTRIES.map(c => `<option ${c === u.country ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
      <label>Nueva contraseña (vacío = no cambiar)
        <span class="pw"><input name="password" type="password" autocomplete="new-password">
        <button type="button" class="eye" data-eye aria-label="Mostrar contraseña">👁</button></span>
      </label>
    </div>
    <p class="msg" aria-live="polite"></p>
    <button class="btn pink" type="submit">${btn}</button>
    ${cancel ? '<button class="btn yellow" type="button" data-cancel>Cancelar</button>' : ''}
  </form>`;
}

async function saveUserForm(form, u) {
  const d = Object.fromEntries(new FormData(form)), msg = $('.msg', form), age = +d.age;
  msg.className = 'msg';
  if (d.name.trim().length < 2 || d.lastname.trim().length < 2) { msg.textContent = '⚠ Nombre y apellido: mínimo 2 letras.'; return false; }
  if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) { msg.textContent = '⚠ Correo no válido.'; return false; }
  if (DB.emailTaken(d.email, u.username)) { msg.textContent = '⚠ Ese correo ya lo usa otro usuario.'; return false; }
  if (!(age >= 10 && age <= 99)) { msg.textContent = '⚠ Edad entre 10 y 99.'; return false; }
  if (d.password && d.password.length < 4) { msg.textContent = '⚠ La contraseña debe tener al menos 4 caracteres.'; return false; }
  Object.assign(u, { name: d.name.trim(), lastname: d.lastname.trim(), email: d.email.trim(), age, country: d.country });
  // mantener el nombre actualizado en los resultados (aparece en el diploma)
  DB.data.results.filter(r => r.username === u.username).forEach(r => r.fullname = `${u.name} ${u.lastname}`);
  if (d.password) { u.salt = randSalt(); u.pass = await hashPw(d.password, u.salt); }
  logAudit('Datos de usuario actualizados', u.username + (d.password ? ' (incluye contraseña)' : ''));
  DB.save();
  return true;
}

function renderProfileEdit(u) {
  const mine = DB.data.requests.filter(r => r.username === u.username).reverse();
  const pending = mine.some(r => r.status === 'pending');
  let h = '<h3>🛠 Actualizar mis datos</h3>';
  if (u.canEdit) h += '<p class="hint">✅ El administrador aprobó tu solicitud. Puedes actualizar tus datos una vez.</p>' + userFormHTML(u, 'editSelf', 'Guardar mis datos', false);
  else if (pending) h += '<p class="hint">⏳ Tu solicitud está pendiente. El administrador la revisará pronto.</p>';
  else h += `<form id="reqForm"><div class="grid">
      <label>¿Qué quieres cambiar?<select name="type">${Object.entries(REQ_TYPES).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></label>
      <label>Motivo<input name="note" required maxlength="120" placeholder="ej: me equivoqué al escribir mi correo"></label></div>
      <button class="btn cyan" type="submit">📨 Solicitar cambio</button></form>`;
  if (mine.length) h += '<h4>Mis solicitudes</h4>' + mine.map(r => `<div class="row"><span>${fmtDateTime(r.date)} · ${REQ_TYPES[r.type]}</span><b>${REQ_STATE[r.status]}</b></div>`).join('');
  $('#profileEdit').innerHTML = h;
}

$('#profileEdit').addEventListener('submit', async e => {
  e.preventDefault();
  const u = Session.user; if (!u) return;
  if (e.target.id === 'reqForm') {
    const d = Object.fromEntries(new FormData(e.target));
    DB.data.requests.push({ id: Date.now(), username: u.username, type: d.type, note: d.note.trim(), status: 'pending', date: new Date().toISOString() });
    logAudit('Solicitud de cambio', REQ_TYPES[d.type]);
    DB.save(); renderProfile();
  }
  if (e.target.id === 'editSelf' && await saveUserForm(e.target, u)) {
    delete u.canEdit;
    DB.data.requests.filter(r => r.username === u.username && r.status === 'approved').forEach(r => r.status = 'done');
    DB.save(); renderProfile();
    $('#profileEdit').insertAdjacentHTML('afterbegin', '<p class="msg ok">✔ Datos actualizados correctamente.</p>');
  }
});

/* ============ CURSO (lecciones) ============ */
function renderCourse() {
  const c = course(), g = GOALS[c.id];
  $('#courseTitle').textContent = `${c.icon} ${c.title}`;
  $('#courseGoal').innerHTML = g
    ? `<div class="goal"><p>🎯 <b>Objetivo:</b> ${esc(g.goal)}</p><p>📋 <b>Requisitos:</b> ${esc(g.req)}</p><p>🏅 <b>Aprobación:</b> nota mínima ${PASS_GRADE}/100 · Diploma con vigencia de ${validityDays()} días.</p></div>`
    : '';
  showLesson(currentLesson);
}

function renderSidebar() {
  const c = course(), d = progressArr();
  $('#moduleTabs').innerHTML = c.modules.map(m => {
    const ls = c.lessons.filter(l => l.mod === m), n = ls.filter(l => d.includes(l.id)).length, open = c.lessons[currentLesson].mod === m;
    return `<details class="mod" ${open ? 'open' : ''}><summary>${m.icon} ${esc(m.title)} <small>${n}/${ls.length}</small></summary>
      ${ls.map(l => { const i = c.lessons.indexOf(l);
        return `<button data-les="${i}" class="${i === currentLesson ? 'active' : ''} ${d.includes(l.id) ? 'done' : ''}">${esc(l.title)}</button>`; }).join('')}</details>`;
  }).join('');
}

function updateProgress() {
  const c = course(), n = doneIn(c).length, t = c.lessons.length, pct = Math.round(n / t * 100);
  $('#courseBar').style.width = pct + '%';
  $('#courseStats').textContent = `⭐ ${n * 50} XP · ${n}/${t} lecciones (${pct}%)`;
  const btn = $('#toQuiz'), ready = n === t;
  btn.disabled = !ready;
  btn.textContent = ready ? '▶ Ir a la evaluación' : 'Ir a la evaluación 🔒 (completa todas las lecciones)';
}

function showLesson(i) {
  const c = course(), L = c.lessons; currentLesson = i;
  const l = L[i], m = l.mod, isDone = progressArr().includes(l.id), box = $('#moduleContent');
  const video = m.video
    ? `<div class="video"><iframe src="https://www.youtube.com/embed/${m.video}" title="Video ${esc(m.title)}" allowfullscreen loading="lazy"></iframe></div>
       <p>¿No carga el video? <a href="https://www.youtube.com/watch?v=${m.video}" target="_blank" rel="noopener">Ábrelo directamente en YouTube</a></p>`
    : `<p>🎬 <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(m.vq || m.title)}" target="_blank" rel="noopener">Ver videos recomendados sobre «${esc(m.title)}» en YouTube</a></p>`;
  box.innerHTML = `
    <p class="crumb">${m.icon} ${esc(m.title)} › Lección ${i + 1} de ${L.length} · ⏱ ${l.mins} min</p>
    <h3>${esc(l.title)}</h3>
    ${l.first && m.img ? `<img src="${m.img}" alt="Logo de ${esc(m.title)}">` : ''}
    ${l.read.map(p => `<p>${p}</p>`).join('')}
    ${l.fig || ''}
    ${l.tip ? `<div class="tip">💡 ${l.tip}</div>` : ''}
    ${l.sample ? `<h4>📜 Código de ejemplo (${esc(l.lang)})</h4><pre class="sample">${esc(l.sample)}</pre>` : ''}
    ${l.code ? `<h4>🧪 Pruébalo tú mismo</h4>
      <div class="lab"><textarea id="labCode" spellcheck="false">${esc(l.code)}</textarea>
      <iframe id="labOut" sandbox="allow-scripts" title="Resultado"></iframe></div>` : ''}
    ${l.first ? `<h4>🎬 Video</h4>${video}` : ''}
    <p>${m.links.map(([t, u]) => `📎 <a href="${u}" target="_blank" rel="noopener">${esc(t)}</a>`).join('<br>')}</p>
    <div class="check">
      <h4>✅ Mini-reto</h4>
      <p>${esc(l.check.q)}</p>
      ${l.check.opts.map((o, k) => `<button class="opt-btn" data-ans="${k}">${esc(o)}</button>`).join('')}
      <p class="msg ${isDone ? 'ok' : ''}" id="checkMsg">${isDone ? 'Lección ya completada ✔' : ''}</p>
    </div>
    <div class="lesson-nav">
      <button class="btn cyan" data-lnav="-1" ${i === 0 ? 'disabled' : ''}>◀ Anterior</button>
      <button class="btn pink" id="btnComplete" disabled>${isDone ? 'Completada ✔' : 'Completar lección (+50 XP) 🔒'}</button>
      <button class="btn cyan" data-lnav="1" ${i === L.length - 1 ? 'disabled' : ''}>Siguiente ▶</button>
    </div>`;

  $('#moduleContent img')?.addEventListener('error', ev => ev.target.remove());   // si el logo no carga, se quita

  const ta = $('#labCode');   // laboratorio en vivo (solo curso Web)
  if (ta) {
    const run = () => { $('#labOut').srcdoc = ta.value; };
    let t; run();
    ta.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 400); });
  }
  box.classList.remove('flip'); void box.offsetWidth; box.classList.add('flip');
  renderSidebar(); updateProgress();
}

function completeLesson() {
  const c = course(), l = c.lessons[currentLesson], d = progressArr();
  if (!d.includes(l.id)) { d.push(l.id); DB.save(); }
  showLesson(currentLesson);
  if (doneIn(c).length === c.lessons.length) launchConfetti();
}

$('#moduleTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-les]');
  if (b) { showLesson(+b.dataset.les); $('#moduleContent').scrollIntoView({ behavior: 'smooth' }); }
});
$('#moduleContent').addEventListener('click', e => {
  const a = e.target.closest('[data-ans]');
  if (a) {
    const l = course().lessons[currentLesson], ok = +a.dataset.ans === l.check.ans, msg = $('#checkMsg');
    a.classList.add(ok ? 'right' : 'wrong');
    msg.className = 'msg' + (ok ? ' ok' : '');
    msg.textContent = ok ? '¡Correcto! Ya puedes completar la lección.' : 'Casi... inténtalo otra vez.';
    if (ok && !progressArr().includes(l.id)) { const c = $('#btnComplete'); c.disabled = false; c.textContent = 'Completar lección (+50 XP)'; }
  }
  const n = e.target.closest('[data-lnav]');
  if (n) { showLesson(currentLesson + +n.dataset.lnav); $('#moduleContent').scrollIntoView({ behavior: 'smooth' }); }
  if (e.target.closest('#btnComplete')) completeLesson();
});

/* ============ EVALUACIÓN ============ */
// 7 preguntas al azar del banco, con al menos 5 tipos de interfaz distintos y opciones mezcladas
function pickExam(c) {
  const bank = shuffle(c.bank), types = shuffle([...new Set(bank.map(q => q.type))]).slice(0, 5);
  const first = types.map(t => bank.find(q => q.type === t));
  const rest = bank.filter(q => !first.includes(q)).slice(0, EXAM_SIZE - first.length);
  return shuffle([...first, ...rest]).map(q => ({ q, order: q.opts ? (q.type === 'tf' ? q.opts.map((_, i) => i) : shuffle(q.opts.map((_, i) => i))) : null }));
}

function waitLeft() {   // segundos de espera tras reprobar
  const mins = DB.data.settings.cooldownMin; if (!mins) return 0;
  const mine = DB.data.results.filter(r => r.username === Session.user.username && r.courseId === currentCourse);
  const last = mine[mine.length - 1]; if (!last || last.passed) return 0;
  return Math.max(0, Math.ceil((new Date(last.date).getTime() + mins * 60000 - Date.now()) / 1000));
}

/* --- Examen a prueba de recargas: el examen en curso se guarda en sessionStorage --- */
const examKey = cid => `retrobyte_exam_${Session.user.username}_${cid}`;
function saveExam() {
  if (!exam || !Session.user) return;
  try {
    sessionStorage.setItem(examKey(exam.courseId), JSON.stringify({
      start: exam.start,
      qs: exam.qs.map(x => ({ id: x.q.id, order: x.order })),
      answers: exam.qs.map(({ q }, i) => readAnswer(q, i))
    }));
  } catch { /* sin almacenamiento: el examen funciona igual, pero no se podrá restaurar */ }
}
function dropExam(cid) { try { sessionStorage.removeItem(examKey(cid)); } catch { /* nada */ } }
function loadExam(cid) {
  try {
    const s = JSON.parse(sessionStorage.getItem(examKey(cid)) || 'null');
    const valid = s && Number.isFinite(s.start) && Array.isArray(s.qs) && s.qs.length && s.qs.every(x => QBANK[x.id] && QBANK[x.id].courseId === cid);
    return valid ? s : null;
  } catch { return null; }
}
function pendingExamCourse() {   // ¿hay un examen sin enviar de este usuario? (para retomarlo al abrir la página)
  const u = Session.user; if (!u || u.role === 'admin') return null;
  const pre = `retrobyte_exam_${u.username}_`;
  for (let i = 0; i < sessionStorage.length; i++) {
    const k = sessionStorage.key(i);
    if (k && k.startsWith(pre)) { const cid = k.slice(pre.length); if (COURSE_BY[cid] && loadExam(cid)) return cid; }
  }
  return null;
}
function restoreAnswers(ans = []) {
  const f = $('#quizForm');
  exam.qs.forEach(({ q }, i) => {
    const a = ans[i], n = `[name=q${i}]`;
    if (a === null || a === undefined) return;
    if (q.type === 'checkbox') $$(n, f).forEach(x => { x.checked = Array.isArray(a) && a.includes(+x.value); });
    else if (q.type === 'radio' || q.type === 'tf') { const x = $$(n, f).find(r => +r.value === a); if (x) x.checked = true; }
    else if (q.type === 'select' || q.type === 'list') $(n, f).value = String(a);
    else if (q.type === 'text') $(n, f).value = a;
    else if (q.type === 'range') { const r = $(n, f); r.value = a; r.dataset.touched = '1'; r.nextElementSibling.textContent = a; }
  });
}

function fieldHTML(q, i, order) {
  const n = `q${i}`, opts = o => order.map(j => [j, q.opts[j]]);
  switch (q.type) {
    case 'radio': case 'tf': return opts().map(([j, o]) => `<label class="opt"><input type="radio" name="${n}" value="${j}"><span>${esc(o)}</span></label>`).join('');
    case 'checkbox': return opts().map(([j, o]) => `<label class="opt"><input type="checkbox" name="${n}" value="${j}"><span>${esc(o)}</span></label>`).join('');
    case 'select': return `<select name="${n}"><option value="">-- elige --</option>${opts().map(([j, o]) => `<option value="${j}">${esc(o)}</option>`).join('')}</select>`;
    case 'list': return `<select name="${n}" size="4">${opts().map(([j, o]) => `<option value="${j}">${esc(o)}</option>`).join('')}</select>`;
    case 'text': return `<input type="text" name="${n}" autocomplete="off" placeholder="escribe aquí...">`;
    case 'range': return `<input type="range" name="${n}" min="${q.min}" max="${q.max}" value="${q.min}"><output>— (mueve el deslizador)</output>`;
  }
}

function renderQuiz() {
  const c = course(), form = $('#quizForm'), sub = $('#submitQuiz'), tb = $('#timerBox');
  $('#quizTitle').textContent = 'Evaluación: ' + c.title;
  $('#quizMsg').textContent = '';
  if (waitLeft() > 0) {
    exam = null; tb.classList.add('hidden'); sub.classList.add('hidden');
    form.innerHTML = `<div class="center"><h3>⏳ Espera para reintentar</h3><p>Repasa el curso mientras tanto. Podrás intentarlo de nuevo en <b id="waitClock"></b>.</p><button class="btn pink" type="button" data-go="course">Repasar curso</button></div>`;
    const paint = () => { const s = waitLeft(); if (s <= 0) { stopTimer(); renderQuiz(); return; } $('#waitClock').textContent = fmtClock(s); };
    paint(); timer = setInterval(paint, 1000);
    return;
  }
  tb.classList.remove('hidden', 'low'); sub.classList.remove('hidden');
  const saved = loadExam(c.id);   // si había un examen a medias, se retoma el mismo (mismas preguntas y mismo reloj)
  exam = saved
    ? { courseId: c.id, start: saved.start, qs: saved.qs.map(x => ({ q: QBANK[x.id], order: x.order })) }
    : { courseId: c.id, qs: pickExam(c), start: Date.now() };
  form.innerHTML = exam.qs.map(({ q, order }, i) =>
    `<fieldset class="q" style="--d:${i * 90}ms"><legend>${i + 1}. ${esc(q.q)}</legend>${fieldHTML(q, i, order)}</fieldset>`).join('');
  if (saved) {
    restoreAnswers(saved.answers);
    $('#quizMsg').textContent = '↩ Retomaste tu examen en curso: mismas preguntas y mismo reloj.';
  }
  saveExam();
  timer = setInterval(tick, 1000); tick();   // si el tiempo ya se acabó estando fuera, tick() lo califica de inmediato
}

function tick() {
  if (!exam) return;
  const left = Math.max(0, EXAM_SECONDS - Math.floor((Date.now() - exam.start) / 1000));
  $('#timerBar').style.width = (left / EXAM_SECONDS * 100) + '%';
  $('#timerTxt').textContent = '⏱ ' + fmtClock(left);
  $('#timerBox').classList.toggle('low', left <= 60);
  if (left <= 0) { stopTimer(); submitQuiz(true); }
}

$('#quizForm').addEventListener('input', e => {
  if (e.target.type === 'range') { e.target.dataset.touched = '1'; e.target.nextElementSibling.textContent = e.target.value; }
  saveExam();   // guarda las respuestas a medida que se contestan
});
$('#quizForm').addEventListener('submit', e => e.preventDefault());

function readAnswer(q, i) {
  const f = $('#quizForm'), n = `[name=q${i}]`;
  switch (q.type) {
    case 'checkbox': return $$(n + ':checked', f).map(x => +x.value);
    case 'radio': case 'tf': { const c = $(n + ':checked', f); return c ? +c.value : null; }
    case 'select': case 'list': { const v = $(n, f).value; return v === '' ? null : +v; }
    case 'text': return norm($(n, f).value) || null;
    case 'range': { const r = $(n, f); return r.dataset.touched ? +r.value : null; }
  }
}
function isCorrect(q, a) {
  if (a === null || a === undefined || (Array.isArray(a) && !a.length)) return false;
  if (q.type === 'checkbox') return JSON.stringify([...a].sort()) === JSON.stringify(q.ans);
  if (q.type === 'text') return q.ans.includes(a);
  return a === q.ans;
}
function fmtAns(q, a) {
  if (a === null || a === undefined || (Array.isArray(a) && !a.length)) return 'Sin respuesta';
  if (q.type === 'text') return Array.isArray(a) ? a.join(' / ') : String(a);
  if (q.type === 'checkbox') return a.map(i => q.opts[i]).join(', ');
  if (q.opts) return q.opts[a];
  return String(a);
}
function ansBlock(q, a, i, who = 'Respondió') {
  const ok = isCorrect(q, a);
  return `<div class="ans ${ok ? 'ok' : 'fail'}"><b>${i + 1}. <span class="topic">[${esc(q.topic)}]</span> ${esc(q.q)}</b><br>
    ${who}: ${esc(fmtAns(q, a))}<br>${ok ? '✔ Correcta' : '✘ Respuesta correcta: ' + esc(fmtAns(q, q.ans))}</div>`;
}

function submitQuiz(timeout = false) {
  if (!exam) return;
  const answers = exam.qs.map(({ q }, i) => readAnswer(q, i));
  if (!timeout) {
    const blank = answers.findIndex(a => a === null || (Array.isArray(a) && !a.length));
    if (blank !== -1) {
      $('#quizMsg').textContent = `⚠ Falta responder la pregunta ${blank + 1}.`;
      $$('fieldset.q')[blank].scrollIntoView({ behavior: 'smooth', block: 'center' }); return;
    }
  }
  stopTimer();
  dropExam(exam.courseId);   // el examen ya se entregó: se borra la copia guardada
  const marks = exam.qs.map(({ q }, i) => isCorrect(q, answers[i]));
  const correct = marks.filter(Boolean).length, total = exam.qs.length, grade = Math.round(correct / total * 100), u = Session.user;
  lastResult = { id: Date.now(), username: u.username, fullname: `${u.name} ${u.lastname}`, courseId: exam.courseId,
    qids: exam.qs.map(x => x.q.id), answers, correct, total, grade, passed: grade >= PASS_GRADE,
    secs: Math.min(EXAM_SECONDS, Math.round((Date.now() - exam.start) / 1000)), date: new Date().toISOString() };
  lastExam = exam; exam = null;
  DB.addResult(lastResult);
  showResult(marks, timeout);
}
$('#submitQuiz').addEventListener('click', () => submitQuiz(false));

/* ============ RESULTADO Y DIPLOMA ============ */
function diplomaHTML(r) {
  const c = COURSE_BY[r.courseId] || COURSE_BY.web;
  const exp = expiryOf(r), valid = isValid(r), left = Math.max(0, Math.ceil((exp - Date.now()) / 86400000));
  return `<div class="diploma ${valid ? '' : 'expired'}"><div class="dip-frame">
    <span class="corner tl">❖</span><span class="corner tr">❖</span><span class="corner bl">❖</span><span class="corner br">❖</span>
    <p class="dip-kicker">★ Instituto Retro Byte ★</p>
    <h2 class="dip-title">Diploma de Aprobación</h2>
    <div class="dip-line"></div>
    <p class="dip-small">Se otorga el presente reconocimiento a</p>
    <div class="name">${esc(r.fullname)}</div>
    <p class="dip-small">por haber aprobado satisfactoriamente el curso</p>
    <p class="dip-course">${esc(c.title)}</p>
    <p class="dip-small">con una calificación de <b>${r.grade}/100</b></p>
    <div class="dip-sign">
      <div class="sg"><div class="sig">Retro Byte</div>Dirección Académica</div>
      <div class="medal">★</div>
      <div class="sg"><div class="sig">J. Pixel</div>Coordinación del curso</div>
    </div>
    <div class="dip-meta">
      <span>Emitido: ${fmtDate(r.date)}</span><span>Vigente hasta: ${fmtDate(exp)}</span><span>Folio: RB-${r.id}</span>
    </div>
    <span class="dip-status ${valid ? 'ok' : 'bad'}">${valid ? `VIGENTE · ${left} día(s) restantes` : 'VENCIDO'}</span>
  </div></div>`;
}

function showResult(marks, timeout) {
  const r = lastResult, weak = [...new Set(lastExam.qs.filter((x, i) => !marks[i]).map(x => x.q.topic))];
  $('#resultBox').innerHTML = `
    ${timeout ? '<p class="msg">⏰ ¡Se acabó el tiempo! Se calificó lo que alcanzaste a responder.</p>' : ''}
    <h2>${r.passed ? '¡NIVEL COMPLETADO!' : 'GAME OVER... ¡INTÉNTALO DE NUEVO!'}</h2>
    <div class="big">${r.grade}/100</div>
    <p>Respuestas correctas: ${r.correct} de ${r.total} · Tiempo: ${fmtClock(r.secs)}</p>
    <p>${r.passed ? '🏆 Aprobaste el curso.' : `Necesitas ${PASS_GRADE} para aprobar. Podrás reintentar tras ${DB.data.settings.cooldownMin} min.`}</p>
    ${weak.length ? `<p class="hint">📚 Temas para repasar: <b>${esc(weak.join(', '))}</b></p>` : ''}`;
  const dip = $('#diploma');
  dip.classList.toggle('hidden', !r.passed); dip.innerHTML = r.passed ? diplomaHTML(r) : '';
  $('#resPrint').classList.toggle('hidden', !r.passed);
  $('#review').innerHTML = '<h3>📖 Revisión de tu examen</h3>' + lastExam.qs.map(({ q }, i) => ansBlock(q, r.answers[i], i, 'Tu respuesta')).join('');
  go('result');
  if (r.passed) launchConfetti();
}

function renderMyDiploma() {
  const u = Session.user;
  $('#dipList').innerHTML = COURSES.map(c => {
    const r = bestDiploma(u.username, c.id), head = `<h3 class="dh">${c.icon} ${esc(c.title)}</h3>`;
    if (!r) return `<div class="panel center">${head}<p>Aún sin diploma. Aprueba la evaluación con ${PASS_GRADE} o más.</p><button class="btn pink" data-course="${c.id}">▶ Ir al curso</button></div>`;
    const valid = isValid(r);
    return `<div class="dipwrap"><div class="panel center">${head}${valid
      ? `<p>¡Vigente! Válido hasta el <b>${fmtDate(expiryOf(r))}</b>. Después deberás volver a presentar la evaluación.</p>`
      : `<p>Venció el <b>${fmtDate(expiryOf(r))}</b>. Para obtener uno nuevo debes volver a aprobar la evaluación.</p>`}</div>
      ${diplomaHTML(r)}
      <div class="actions">${valid
        ? `<button class="btn cyan" data-act="print">🖨 Imprimir / Guardar PDF</button>`
        : `<button class="btn pink" data-course="${c.id}">▶ Repasar curso</button><button class="btn yellow" data-quiz="${c.id}">Presentar evaluación</button>`}</div></div>`;
  }).join('');
}

/* ============ HISTORIAL DE INTENTOS (estudiante) ============ */
function renderHistory() {
  const u = Session.user, mine = DB.data.results.filter(r => r.username === u.username).slice().reverse();
  const best = mine.length ? Math.max(...mine.map(r => r.grade)) : 0;
  const avg = mine.length ? Math.round(mine.reduce((s, r) => s + r.grade, 0) / mine.length) : 0;
  $('#histStats').innerHTML = [[mine.length, 'Intentos'], [best, 'Mejor nota'], [avg, 'Promedio'], [mine.filter(r => r.passed).length, 'Aprobados']]
    .map(([n, t]) => `<div><b>${n}</b>${t}</div>`).join('');
  const rows = pageSlice('hist', mine, '#pagerHist');
  $('#histTable').innerHTML = '<tr><th>FECHA</th><th>CURSO</th><th>NOTA</th><th>ESTADO</th><th>TIEMPO</th><th>REVISIÓN</th></tr>' +
    (rows.length ? rows.map(r => `<tr><td>${fmtDateTime(r.date)}</td><td>${esc(COURSE_BY[r.courseId]?.short || r.courseId)}</td><td>${r.grade}</td>
      <td>${r.passed ? '✅ Aprobado' : '❌ Reprobado'}</td><td>${r.secs != null ? fmtClock(r.secs) : '—'}</td>
      <td><button class="mini" data-hview="${r.id}">Ver respuestas</button></td></tr>`).join('')
      : '<tr><td colspan="6">Aún no has presentado ninguna evaluación.</td></tr>');
  $('#histDetail').classList.add('hidden');
}

$('#histTable').addEventListener('click', e => {
  const b = e.target.closest('[data-hview]'); if (!b) return;
  const u = Session.user, r = DB.data.results.find(x => x.id === +b.dataset.hview && x.username === u.username); if (!r) return;
  const box = $('#histDetail');
  box.classList.remove('hidden');
  box.innerHTML = `<h3>${esc(COURSE_BY[r.courseId]?.title || r.courseId)} · ${r.grade}/100 · ${r.passed ? '✅ Aprobado' : '❌ Reprobado'}</h3><p class="hint">${fmtDateTime(r.date)}</p>` +
    (r.qids ? r.qids.map((id, i) => QBANK[id] ? ansBlock(QBANK[id], r.answers[i], i, 'Tu respuesta') : '').join('')
            : '<p class="hint">Este intento es de una versión anterior y no guarda el detalle.</p>') +
    '<button class="btn yellow" id="closeHist" type="button">Cerrar</button>';
  box.scrollIntoView({ behavior: 'smooth' });
});
$('#histDetail').addEventListener('click', e => { if (e.target.id === 'closeHist') $('#histDetail').classList.add('hidden'); });

/* ============ RANKING ============ */
const secsOf = r => r.secs ?? 9999;
function publicName(full) { const p = String(full).trim().split(/\s+/); return p[0] + (p[1] ? ' ' + p[1][0].toUpperCase() + '.' : ''); }
function renderRanking() {
  const me = Session.user?.username, medals = ['🥇', '🥈', '🥉', '4°', '5°'];
  $('#rankList').innerHTML = COURSES.map(c => {
    const best = {};
    DB.data.results.filter(r => r.courseId === c.id).forEach(r => {
      const b = best[r.username];
      if (!b || r.grade > b.grade || (r.grade === b.grade && secsOf(r) < secsOf(b))) best[r.username] = r;
    });
    const top = Object.values(best).sort((a, b) => b.grade - a.grade || secsOf(a) - secsOf(b)).slice(0, 5);
    return `<div class="panel"><h3>${c.icon} ${esc(c.title)}</h3>` + (top.length
      ? top.map((r, i) => `<div class="row ${r.username === me ? 'me' : ''}"><b>${medals[i]} ${esc(publicName(r.fullname))}${r.username === me ? ' (tú)' : ''}</b><span>${r.grade}/100 · ${r.secs != null ? fmtClock(r.secs) : '—'}</span></div>`).join('')
      : '<p class="hint">Aún nadie ha presentado este examen. ¡Sé el primero!</p>') + '</div>';
  }).join('');
}

/* ============ VERIFICAR DIPLOMA POR FOLIO ============ */
function checkFolio() {
  const raw = $('#vFolio').value.trim().toUpperCase().replace(/^RB-?/, ''), box = $('#verifyOut');
  if (!raw) { box.innerHTML = ''; return; }
  const r = DB.data.results.find(x => String(x.id) === raw && x.passed);
  if (!r) { box.innerHTML = '<div class="panel center"><div class="ans fail">❌ No se encontró ningún diploma con ese folio.</div></div>'; return; }
  const valid = isValid(r);
  box.innerHTML = `<div class="panel"><div class="ans ${valid ? 'ok' : 'fail'}">
    <b>${valid ? '✅ Diploma auténtico y VIGENTE' : '⌛ Diploma auténtico pero VENCIDO'}</b><br>
    Titular: ${esc(r.fullname)}<br>Curso: ${esc(COURSE_BY[r.courseId]?.title || r.courseId)}<br>Calificación: ${r.grade}/100<br>
    Emitido: ${fmtDate(r.date)}<br>Vigente hasta: ${fmtDate(expiryOf(r))}<br>Folio: RB-${r.id}</div></div>`;
}
$('#verifyForm').addEventListener('submit', e => { e.preventDefault(); checkFolio(); });

/* ============ CONFETI (canvas) ============ */
function launchConfetti() {
  const c = $('#confetti'), ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const colors = ['#ff3e9d', '#2de2e6', '#f9c80e', '#7dff7a'];
  const ps = Array.from({ length: 140 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height / 2,
    s: 6 + Math.random() * 8, v: 2 + Math.random() * 4, c: colors[Math.random() * 4 | 0], dx: Math.random() * 2 - 1 }));
  let frames = 0;
  (function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => { p.y += p.v; p.x += p.dx; ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.s, p.s); });
    if (++frames < 260) requestAnimationFrame(draw); else ctx.clearRect(0, 0, c.width, c.height);
  })();
}

/* ============ PANEL ADMIN ============ */
const courseName = id => COURSE_BY[id]?.title || id;

function renderAdmin() {
  $$('#adminTabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === adminTab));
  const list = ['all', 'pass', 'fail', 'answers'].includes(adminTab);
  $('#paneSummary').classList.toggle('hidden', adminTab !== 'summary');
  $('#paneAnalysis').classList.toggle('hidden', adminTab !== 'answers');
  $('#paneList').classList.toggle('hidden', !list);
  $('#paneUsers').classList.toggle('hidden', adminTab !== 'users');
  $('#paneRequests').classList.toggle('hidden', adminTab !== 'requests');
  $('#paneAudit').classList.toggle('hidden', adminTab !== 'audit');
  $('#paneCharts').classList.toggle('hidden', adminTab !== 'charts');
  $('#paneSettings').classList.toggle('hidden', adminTab !== 'settings');
  const pend = DB.data.requests.filter(r => r.status === 'pending').length;
  $('#reqBadge').textContent = pend ? ` (${pend})` : '';
  if (adminTab === 'summary') renderSummary();
  if (list) renderList();
  if (adminTab === 'users') renderUsers();
  if (adminTab === 'requests') renderRequests();
  if (adminTab === 'audit') renderAudit();
  if (adminTab === 'charts') renderCharts();
  if (adminTab === 'settings') renderSettings();
}

function renderSummary() {
  const { users, results } = DB.data, students = users.filter(u => u.role !== 'admin');
  const avg = results.length ? Math.round(results.reduce((s, r) => s + r.grade, 0) / results.length) : 0;
  const pass = results.filter(r => r.passed).length;
  const dips = COURSES.reduce((n, c) => n + students.filter(s => { const d = bestDiploma(s.username, c.id); return d && isValid(d); }).length, 0);
  const noExam = students.filter(s => !results.some(r => r.username === s.username)).length;
  const evaluated = new Set(results.map(r => r.username)).size;
  $('#adminStats').innerHTML = [[students.length, 'Estudiantes registrados'], [evaluated, 'Personas evaluadas'], [noExam, 'Sin examen'],
    [results.length, 'Intentos totales'], [avg, 'Promedio'], [pass, 'Aprobados'], [results.length - pass, 'Reprobados'],
    [dips, 'Diplomas vigentes'], [DB.data.requests.filter(r => r.status === 'pending').length, 'Solicitudes pendientes']]
    .map(([n, t]) => `<div><b>${n}</b>${t}</div>`).join('');
  $('#demoHint').textContent = students.length ? '' : '💡 Aún no hay estudiantes en este navegador. Ve a «⚙ Ajustes» y pulsa «Cargar datos de demostración» para ver el panel funcionando.';
}

function fillSelects() {
  const c = $('#fCourse'), u = $('#fUser'), cv = c.value, uv = u.value;
  c.innerHTML = '<option value="">Todos los cursos</option>' + COURSES.map(x => `<option value="${x.id}">${esc(x.short)}</option>`).join('');
  u.innerHTML = '<option value="">Todos los usuarios</option>' + DB.data.users.filter(x => x.role !== 'admin')
    .map(x => `<option value="${esc(x.username)}">${esc(x.name)} ${esc(x.lastname)} (${esc(x.username)})</option>`).join('');
  c.value = cv; u.value = uv;
}

function adminList() {
  const terms = $('#fText').value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const min = $('#fMin').value, max = $('#fMax').value, cid = $('#fCourse').value, who = $('#fUser').value;
  return DB.data.results.slice().reverse().map(r => ({ r, u: DB.findUser(r.username) || {} })).filter(({ r, u }) => {
    if (adminTab === 'pass' && !r.passed) return false;
    if (adminTab === 'fail' && r.passed) return false;
    if (cid && r.courseId !== cid) return false;
    if (who && r.username !== who) return false;
    if (min !== '' && r.grade < +min) return false;
    if (max !== '' && r.grade > +max) return false;
    const hay = [u.name, u.lastname, u.email, r.username, r.grade, courseName(r.courseId)].join(' ').toLowerCase();
    return terms.every(t => hay.includes(t));
  });
}

function renderList() {
  fillSelects();
  const list = adminList(), rows = pageSlice('list', list, '#pagerList');
  $('#adminCount').textContent = `${list.length} registro(s) en total`;
  $('#adminTable').innerHTML = `<tr><th>FECHA</th><th>CURSO</th><th>ESTUDIANTE</th><th>CORREO</th><th>USUARIO</th><th>NOTA</th><th>ESTADO</th><th>ACCIONES</th></tr>` +
    (rows.length ? rows.map(({ r, u }) => `<tr>
      <td>${fmtDateTime(r.date)}</td><td>${esc(COURSE_BY[r.courseId]?.short || r.courseId)}</td>
      <td>${esc(r.fullname)}</td><td>${esc(u.email || '—')}</td><td>${esc(r.username)}</td><td>${r.grade}</td>
      <td>${r.passed ? '✅ Aprobado' : '❌ Reprobado'}</td>
      <td><button class="mini" data-view="${r.id}">Ver respuestas</button><button class="mini del" data-del="${r.id}">Borrar</button></td></tr>`).join('')
      : `<tr><td colspan="8">No hay resultados con esos filtros.</td></tr>`);
  if (adminTab === 'answers') renderAnalysis(list);
}

function renderAnalysis(list) {
  const st = {};
  list.forEach(({ r }) => (r.qids || []).forEach((id, i) => {
    const q = QBANK[id]; if (!q) return;
    const s = st[id] ??= { q, n: 0, w: 0 }; s.n++; if (!isCorrect(q, r.answers[i])) s.w++;
  }));
  const arr = Object.values(st).sort((a, b) => b.w / b.n - a.w / a.n || b.n - a.n).slice(0, 12);
  $('#analysis').innerHTML = arr.length
    ? `<p class="hint">Basado en los exámenes filtrados. Las preguntas con más fallos indican qué contenido reforzar.</p>` +
      arr.map(s => bar(`[${esc(COURSE_BY[s.q.courseId].short)} · ${esc(s.q.topic)}] ${esc(s.q.q)}`, Math.round(s.w / s.n * 100), `${s.w} de ${s.n} fallaron · ${Math.round(s.w / s.n * 100)}%`)).join('')
    : '<p>Sin exámenes con detalle para analizar con los filtros actuales.</p>';
}

const bar = (label, pct, txt, cls = '') => `<div class="bar-row"><span>${label}</span><div class="bar ${cls}"><i style="width:${pct}%"></i></div><b>${txt}</b></div>`;

function renderCharts() {
  const rs = DB.data.results;
  if (!rs.length) { $('#charts').innerHTML = '<p>Aún no hay exámenes para graficar.</p>'; return; }
  let h = '<h3>✅ Aprobados vs ❌ reprobados por curso</h3>';
  COURSES.forEach(c => {
    const x = rs.filter(r => r.courseId === c.id), p = x.filter(r => r.passed).length;
    h += `<p>${c.icon} ${esc(c.short)} (${x.length} intento(s))</p>` +
      bar('Aprobados', x.length ? Math.round(p / x.length * 100) : 0, `${p}`, 'good') +
      bar('Reprobados', x.length ? Math.round((x.length - p) / x.length * 100) : 0, `${x.length - p}`);
  });
  h += '<h3>📈 Promedio por curso</h3>';
  COURSES.forEach(c => { const x = rs.filter(r => r.courseId === c.id); const a = x.length ? Math.round(x.reduce((s, r) => s + r.grade, 0) / x.length) : 0; h += bar(`${c.icon} ${esc(c.short)}`, a, `${a}/100`, 'good'); });
  const t = {};
  rs.forEach(r => (r.qids || []).forEach((id, i) => { const q = QBANK[id]; if (!q) return; const k = q.courseId + '|' + q.topic; const s = t[k] ??= { n: 0, ok: 0 }; s.n++; if (isCorrect(q, r.answers[i])) s.ok++; }));
  const keys = Object.keys(t).sort();
  if (keys.length) {
    h += '<h3>🎯 Dominio por tema (% de aciertos)</h3>';
    keys.forEach(k => { const [cid, topic] = k.split('|'), p = Math.round(t[k].ok / t[k].n * 100); h += bar(`${esc(COURSE_BY[cid].short)} · ${esc(topic)}`, p, `${p}% (${t[k].n} respuestas)`, 'good'); });
  }
  $('#charts').innerHTML = h;
}

function renderSettings() {
  if (document.activeElement !== $('#vDays')) $('#vDays').value = DB.data.settings.validityDays;
  if (document.activeElement !== $('#cMin')) $('#cMin').value = DB.data.settings.cooldownMin;
}

function showDetail(id) {
  const r = DB.data.results.find(x => x.id === id); if (!r) return;
  const u = DB.findUser(r.username) || {}, box = $('#detailBox');
  let body;
  if (!r.qids) body = '<p class="hint">Este resultado es de una versión anterior y no guarda el detalle de las preguntas.</p>';
  else {
    const items = r.qids.map((qid, i) => ({ q: QBANK[qid], a: r.answers[i], i }));
    const failed = items.filter(x => !x.q || !isCorrect(x.q, x.a)), weak = [...new Set(failed.filter(x => x.q).map(x => x.q.topic))];
    body = `<p class="hint">${failed.length ? `Falló en la(s) pregunta(s): <b>${failed.map(f => f.i + 1).join(', ')}</b> · Temas a reforzar: <b>${esc(weak.join(', '))}</b>` : '🏆 Sin errores.'}</p>` +
      items.map(x => x.q ? ansBlock(x.q, x.a, x.i) : `<div class="ans fail">${x.i + 1}. Pregunta ya no disponible</div>`).join('');
  }
  box.classList.remove('hidden');
  box.innerHTML = `<h3>${esc(courseName(r.courseId))} · ${esc(r.fullname)} · ${r.passed ? '✅ Aprobado' : '❌ Reprobado'}</h3>
    <p>Correo: ${esc(u.email || '—')} · Nota: <b>${r.grade}/100</b> (${r.correct}/${r.total}) · ${fmtDateTime(r.date)}${r.secs != null ? ' · ' + fmtClock(r.secs) : ''}</p>` +
    body + `<button class="btn yellow" id="closeDetail">Cerrar</button>`;
  box.scrollIntoView({ behavior: 'smooth' });
}

function deleteOne(id) {
  const r = DB.data.results.find(x => x.id === id); if (!r) return;
  if (!confirm(`¿Borrar el examen de ${r.fullname} (${courseName(r.courseId)}, nota ${r.grade})? Esta acción no se puede deshacer.`)) return;
  logAudit('Examen borrado', `${r.username} · ${courseName(r.courseId)} · nota ${r.grade}`);
  DB.deleteResult(id); $('#detailBox').classList.add('hidden'); renderAdmin();
}

/* --- Exportar a Excel (CSV) --- */
function csvCell(v) { let s = String(v ?? ''); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; }
function exportCSV(rows) {
  const head = ['Fecha', 'Curso', 'Nombre', 'Apellido', 'Correo', 'Usuario', 'Nota', 'Estado', 'Correctas', 'Total', 'Segundos', 'Diploma vence'];
  const lines = rows.map(({ r, u }) => [fmtDateTime(r.date), courseName(r.courseId), u.name || '', u.lastname || '', u.email || '', r.username, r.grade,
    r.passed ? 'Aprobado' : 'Reprobado', r.correct, r.total, r.secs ?? '', r.passed ? fmtDate(expiryOf(r)) : ''].map(csvCell).join(','));
  const csv = '\uFEFFsep=,\r\n' + [head.map(csvCell).join(','), ...lines].join('\r\n');
  download(new Blob([csv], { type: 'text/csv;charset=utf-8' }), 'retrobyte-resultados.csv');
}
$('#csvFiltered').addEventListener('click', () => exportCSV(adminList()));   // descarga TODO lo filtrado, no solo la página visible

/* --- Respaldo: Excel (CSV) y JSON --- */
$('#csvAll').addEventListener('click', () => {
  exportCSV(DB.data.results.slice().reverse().map(r => ({ r, u: DB.findUser(r.username) || {} })));
  logAudit('Respaldo Excel descargado'); DB.save();
});
$('#jsonExport').addEventListener('click', () => {
  download(new Blob([JSON.stringify(DB.data, null, 2)], { type: 'application/json' }), `retrobyte-respaldo-${new Date().toISOString().slice(0, 10)}.json`);
  logAudit('Respaldo JSON descargado'); DB.save();
});
$('#jsonImport').addEventListener('click', () => $('#jsonFile').click());
$('#jsonFile').addEventListener('change', async e => {
  const f = e.target.files[0], msg = $('#bkMsg'); e.target.value = ''; if (!f) return;
  msg.className = 'msg';
  let d;
  try {
    d = JSON.parse(await f.text());
    if (!d || !Array.isArray(d.users) || !Array.isArray(d.results) || !d.users.some(u => u.role === 'admin')) throw new Error('formato');
  } catch { msg.textContent = '⚠ El archivo no es un respaldo válido de Retro Byte.'; return; }
  if (!confirm(`Se reemplazarán TODOS los datos actuales por el respaldo (${d.users.length} usuarios, ${d.results.length} resultados). ¿Continuar?`)) return;
  const by = Session.user?.username;
  DB.data = d; DB.normalize();
  logAudit('Respaldo JSON restaurado', `${d.users.length} usuarios, ${d.results.length} resultados`, by);
  DB.save(); Session.clear();
  alert('Respaldo restaurado correctamente. Vuelve a iniciar sesión.');
  location.reload();
});

/* --- Eventos del panel --- */
$('#adminTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-tab]'); if (!b) return;
  adminTab = b.dataset.tab; for (const k in pages) pages[k] = 1;   // al cambiar de pestaña se vuelve a la página 1
  $('#detailBox').classList.add('hidden'); $('#userMsg').textContent = ''; renderAdmin();
});
['fText', 'fCourse', 'fUser', 'fMin', 'fMax'].forEach(id => $('#' + id).addEventListener('input', () => { pages.list = 1; renderAdmin(); }));
$('#fClear').addEventListener('click', () => { ['fText', 'fCourse', 'fUser', 'fMin', 'fMax'].forEach(id => $('#' + id).value = ''); pages.list = 1; renderAdmin(); });
$('#adminTable').addEventListener('click', e => {
  const v = e.target.closest('[data-view]'); if (v) showDetail(+v.dataset.view);
  const d = e.target.closest('[data-del]'); if (d) deleteOne(+d.dataset.del);
});
$('#detailBox').addEventListener('click', e => { if (e.target.id === 'closeDetail') $('#detailBox').classList.add('hidden'); });

$('#vSave').addEventListener('click', () => {
  const v = $('#vDays').value, c = $('#cMin').value, vn = Math.floor(+v), cn = Math.floor(+c), msg = $('#vMsg');
  if (v === '' || c === '' || isNaN(vn) || isNaN(cn) || vn < 0 || vn > 3650 || cn < 0 || cn > 1440) {
    msg.className = 'msg'; msg.textContent = '⚠ Vigencia: 0 a 3650 días. Espera: 0 a 1440 minutos.'; return;
  }
  DB.data.settings.validityDays = vn; DB.data.settings.cooldownMin = cn;
  logAudit('Ajustes guardados', `vigencia ${vn} día(s), espera ${cn} min`); DB.save();
  msg.className = 'msg ok'; msg.textContent = `✔ Guardado: vigencia ${vn} día(s), espera ${cn} min.`;
});
$('#resetBtn').addEventListener('click', () => {
  if (confirm('¿Limpiar TODOS los resultados? Los estudiantes perderán sus diplomas.')) {
    logAudit('Todos los resultados borrados', `${DB.data.results.length} registro(s)`);
    DB.data.results = []; DB.save(); $('#detailBox').classList.add('hidden'); renderAdmin();
  }
});

/* ============ DATOS DE DEMOSTRACIÓN ============ */
const DEMO_PASS = 'demo1234';
/* tries: [curso, aciertos de 7, hace cuántos días]. partial: lecciones del curso Web completadas (sin examen). */
const DEMO_USERS = [
  { u: 'demo_ana',      n: 'Ana',      l: 'Morales',  age: 19, c: 'Guatemala',   tries: [['web', 7, 12], ['nb', 6, 8], ['py', 5, 3]] },
  { u: 'demo_luis',     n: 'Luis',     l: 'Pérez',    age: 22, c: 'México',      tries: [['web', 3, 10], ['web', 5, 9], ['nb', 4, 5]] },
  { u: 'demo_maria',    n: 'María',    l: 'López',    age: 25, c: 'El Salvador', tries: [['py', 7, 6], ['web', 6, 2]] },
  { u: 'demo_carlos',   n: 'Carlos',   l: 'Ruiz',     age: 30, c: 'Honduras',    tries: [['nb', 2, 7], ['nb', 3, 6], ['py', 4, 1]] },
  { u: 'demo_sofia',    n: 'Sofía',    l: 'Castillo', age: 21, c: 'Costa Rica',  tries: [['web', 7, 4], ['nb', 7, 4], ['py', 6, 2]] },
  { u: 'demo_diego',    n: 'Diego',    l: 'Herrera',  age: 16, c: 'Guatemala',   tries: [['py', 5, 9]] },
  { u: 'demo_valeria',  n: 'Valeria',  l: 'Gómez',    age: 27, c: 'Otro',        tries: [], partial: 4 },
  { u: 'demo_pablo',    n: 'Pablo',    l: 'Díaz',     age: 35, c: 'Guatemala',   tries: [], request: true }
];

function demoAnswer(q, right) {   // construye una respuesta correcta o incorrecta para cualquier tipo de pregunta
  if (right) return q.type === 'text' ? q.ans[0] : q.ans;
  switch (q.type) {
    case 'checkbox': return [q.ans[0]];                                   // incompleta = incorrecta
    case 'text': return 'no se';
    case 'range': return q.ans === q.min ? q.min + 1 : q.min;
    default: return q.opts.findIndex((_, i) => i !== q.ans);              // la primera opción distinta de la correcta
  }
}

async function seedDemo() {
  const d = DB.data;
  if (d.users.some(u => u.demo)) return 'ℹ Ya hay datos de demostración cargados. Quítalos primero si quieres regenerarlos.';
  const base = Date.now(); let n = 0, added = 0;
  for (const x of DEMO_USERS) {
    if (DB.findUser(x.u)) continue;   // por si un estudiante real ya usa ese nombre de usuario
    const salt = randSalt();
    d.users.push({ username: x.u, name: x.n, lastname: x.l, email: `${x.u}@demo.com`, age: x.age, country: x.c, role: 'student', demo: true,
      salt, pass: await hashPw(DEMO_PASS, salt), createdAt: new Date(base - 30 * 86400000).toISOString() });
    added++;
    const done = new Set();
    x.tries.forEach(([cid, k, days]) => {
      const c = COURSE_BY[cid], qs = shuffle(c.bank).slice(0, EXAM_SIZE);
      const answers = qs.map((q, i) => demoAnswer(q, i < k));
      const correct = qs.filter((q, i) => isCorrect(q, answers[i])).length, grade = Math.round(correct / qs.length * 100);
      const id = base - days * 86400000 - (n % 8) * 3600000 + (++n);        // marca de tiempo única
      d.results.push({ id, username: x.u, fullname: `${x.n} ${x.l}`, courseId: cid, qids: qs.map(q => q.id), answers, correct, total: qs.length,
        grade, passed: grade >= PASS_GRADE, secs: 150 + (n * 47) % 400, date: new Date(id).toISOString() });
      c.lessons.forEach(l => done.add(l.id));                               // para presentar el examen se completan las lecciones
    });
    if (x.partial) COURSE_BY.web.lessons.slice(0, x.partial).forEach(l => done.add(l.id));
    if (done.size) d.progress[x.u] = [...done];
    if (x.request) d.requests.push({ id: base + 999, username: x.u, type: 'password', recover: true, note: 'Olvidó su contraseña', status: 'pending', date: new Date(base - 3600000).toISOString() });
  }
  d.results.sort((a, b) => a.id - b.id);
  logAudit('Datos de demostración cargados', `${added} estudiantes`);
  DB.save();
  return `✔ Listo: ${added} estudiantes de demostración creados (contraseña ${DEMO_PASS}). Revisa Resumen, Todos, Estudiantes y Gráficos.`;
}

function clearDemo() {
  const d = DB.data, names = d.users.filter(u => u.demo).map(u => u.username);
  if (!names.length) return 'ℹ No hay datos de demostración que quitar.';
  d.users = d.users.filter(u => !u.demo);
  d.results = d.results.filter(r => !names.includes(r.username));
  d.requests = d.requests.filter(r => !names.includes(r.username));
  names.forEach(u => delete d.progress[u]);
  logAudit('Datos de demostración eliminados', `${names.length} estudiantes`);
  DB.save();
  return `✔ Se quitaron ${names.length} estudiantes de demostración con sus resultados.`;
}

$('#demoLoad').addEventListener('click', async e => {
  const btn = e.currentTarget, msg = $('#demoMsg'); btn.disabled = true; msg.className = 'msg'; msg.textContent = 'Creando datos...';
  const text = await seedDemo();
  btn.disabled = false; msg.className = text.startsWith('✔') ? 'msg ok' : 'msg'; msg.textContent = text;
  renderAdmin();
});
$('#demoClear').addEventListener('click', () => {
  if (!confirm('¿Quitar todos los estudiantes de demostración y sus resultados? Los estudiantes reales no se tocan.')) return;
  const text = clearDemo(), msg = $('#demoMsg');
  msg.className = text.startsWith('✔') ? 'msg ok' : 'msg'; msg.textContent = text;
  renderAdmin();
});

/* ============ ADMIN: ESTUDIANTES (base de datos de usuarios) ============ */
function renderUsers() {
  const t = $('#uText').value.trim().toLowerCase(), all = studentsOf();
  const us = all.filter(u => !t || [u.name, u.lastname, u.email, u.username, u.country].join(' ').toLowerCase().includes(t));
  const rows = pageSlice('users', us, '#pagerUsers');
  $('#userCount').textContent = `Total de estudiantes registrados: ${all.length} · Coinciden con el filtro: ${us.length}`;
  $('#userTable').innerHTML = '<tr><th>USUARIO</th><th>NOMBRE</th><th>CORREO</th><th>EDAD</th><th>PAÍS</th><th>REGISTRO</th><th>INTENTOS</th><th>DIPLOMAS</th><th>ACCIONES</th></tr>' +
    (rows.length ? rows.map(u => {
      const tries = DB.data.results.filter(r => r.username === u.username).length;
      const dips = COURSES.filter(c => { const d = bestDiploma(u.username, c.id); return d && isValid(d); }).length;
      return `<tr><td>${esc(u.username)}${u.demo ? ' 🧪' : ''}</td><td>${esc(u.name)} ${esc(u.lastname)}</td><td>${esc(u.email)}</td><td>${esc(u.age)}</td><td>${esc(u.country)}</td>
        <td>${u.createdAt ? fmtDate(u.createdAt) : '—'}</td><td>${tries}</td><td>${dips}/${COURSES.length}</td>
        <td><button class="mini" data-uedit="${esc(u.username)}">Editar</button><button class="mini del" data-udel="${esc(u.username)}">Borrar</button></td></tr>`;
    }).join('') : '<tr><td colspan="9">No hay estudiantes con ese filtro.</td></tr>');
}

function openUserEdit(un) {
  const u = DB.findUser(un), box = $('#userEdit'); if (!u) return;
  box.dataset.user = u.username; box.classList.remove('hidden');
  box.innerHTML = `<h3>✏️ Editar a ${esc(u.username)}</h3>` + userFormHTML(u, 'adminEdit', 'Guardar cambios', true);
  box.scrollIntoView({ behavior: 'smooth' });
}

/* --- Agregar estudiante desde el panel admin --- */
function newUserFormHTML() {
  return `<form id="adminAdd" class="userform" novalidate>
    <div class="grid">
      <label>Nombre<input name="name" required></label>
      <label>Apellido<input name="lastname" required></label>
      <label>Correo<input name="email" type="email" required></label>
      <label>Edad<input name="age" type="number" min="10" max="99" required></label>
      <label>País<select name="country">${COUNTRIES.map(c => `<option>${c}</option>`).join('')}</select></label>
      <label>Usuario (letras, números o _)<input name="username" required autocomplete="off"></label>
      <label>Contraseña (mínimo 4 caracteres)
        <span class="pw"><input name="password" type="password" required autocomplete="new-password">
        <button type="button" class="eye" data-eye aria-label="Mostrar contraseña">👁</button></span>
      </label>
    </div>
    <p class="msg" aria-live="polite"></p>
    <button class="btn pink" type="submit">Crear estudiante</button>
    <button class="btn yellow" type="button" data-cancel>Cancelar</button>
  </form>`;
}

async function addStudent(form) {
  const d = Object.fromEntries(new FormData(form)), msg = $('.msg', form), age = +d.age;
  const un = d.username.trim(), em = d.email.trim();
  msg.className = 'msg';
  if (d.name.trim().length < 2 || d.lastname.trim().length < 2) { msg.textContent = '⚠ Nombre y apellido: mínimo 2 letras.'; return false; }
  if (!/^\S+@\S+\.\S+$/.test(em)) { msg.textContent = '⚠ Correo no válido.'; return false; }
  if (!(age >= 10 && age <= 99)) { msg.textContent = '⚠ Edad entre 10 y 99.'; return false; }
  if (!/^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(un)) { msg.textContent = '⚠ Usuario: 3 a 20 caracteres, empieza con letra; solo letras, números o _.'; return false; }
  if (DB.findUser(un)) { msg.textContent = '⚠ Ese usuario ya existe.'; return false; }
  if (DB.emailTaken(em)) { msg.textContent = '⚠ Ese correo ya está registrado.'; return false; }
  if (!d.password || d.password.length < 4) { msg.textContent = '⚠ La contraseña debe tener al menos 4 caracteres.'; return false; }
  const salt = randSalt();
  DB.data.users.push({ username: un, name: d.name.trim(), lastname: d.lastname.trim(), email: em, age, country: d.country,
    role: 'student', salt, pass: await hashPw(d.password, salt), createdAt: new Date().toISOString() });
  logAudit('Estudiante creado por el administrador', `${un} (${d.name.trim()} ${d.lastname.trim()})`);
  DB.save();
  return un;
}

$('#addStudentBtn').addEventListener('click', () => {
  const box = $('#userEdit'); box.dataset.user = '';
  box.classList.remove('hidden');
  box.innerHTML = '<h3>➕ Nuevo estudiante</h3>' + newUserFormHTML();
  box.scrollIntoView({ behavior: 'smooth' });
});

function deleteUser(un) {
  const u = DB.findUser(un); if (!u || u.role === 'admin') return;
  if (!confirm(`¿Borrar a ${u.name} ${u.lastname} (${un}) junto con sus resultados y progreso? No se puede deshacer.`)) return;
  logAudit('Estudiante borrado', `${un} (${u.name} ${u.lastname})`);
  DB.data.users = DB.data.users.filter(x => x !== u);
  DB.data.results = DB.data.results.filter(r => r.username !== un);
  DB.data.requests = DB.data.requests.filter(r => r.username !== un);
  delete DB.data.progress[un];
  DB.save(); $('#userEdit').classList.add('hidden'); renderAdmin();
}

$('#uText').addEventListener('input', () => { pages.users = 1; renderUsers(); });
$('#userTable').addEventListener('click', e => {
  const a = e.target.closest('[data-uedit]'); if (a) openUserEdit(a.dataset.uedit);
  const d = e.target.closest('[data-udel]'); if (d) deleteUser(d.dataset.udel);
});
$('#userEdit').addEventListener('submit', async e => {
  e.preventDefault();
  const um = $('#userMsg');
  if (e.target.id === 'adminAdd') {
    const created = await addStudent(e.target);
    if (created) {
      $('#userEdit').classList.add('hidden'); pages.users = 1; renderAdmin();
      um.className = 'msg ok'; um.textContent = `✔ Estudiante «${created}» creado correctamente.`;
    }
    return;
  }
  const u = DB.findUser($('#userEdit').dataset.user);
  if (u && await saveUserForm(e.target, u)) {
    $('#userEdit').classList.add('hidden'); renderAdmin();
    um.className = 'msg ok'; um.textContent = `✔ Datos de «${u.username}» actualizados.`;
  }
});
$('#userEdit').addEventListener('click', e => { if (e.target.closest('[data-cancel]')) $('#userEdit').classList.add('hidden'); });

$('#csvUsers').addEventListener('click', () => {
  const head = ['Usuario', 'Nombre', 'Apellido', 'Correo', 'Edad', 'País', 'Registro', 'Intentos'];
  const rows = studentsOf().map(u => [u.username, u.name, u.lastname, u.email, u.age, u.country, u.createdAt ? fmtDate(u.createdAt) : '',
    DB.data.results.filter(r => r.username === u.username).length].map(csvCell).join(','));
  const csv = '\uFEFFsep=,\r\n' + [head.map(csvCell).join(','), ...rows].join('\r\n');
  download(new Blob([csv], { type: 'text/csv;charset=utf-8' }), 'retrobyte-estudiantes.csv');
});

/* ============ ADMIN: SOLICITUDES ============ */
function renderRequests() {
  const all = DB.data.requests.slice().reverse(), rs = pageSlice('req', all, '#pagerReq');
  $('#reqTable').innerHTML = '<tr><th>FECHA</th><th>USUARIO</th><th>SOLICITA</th><th>MOTIVO</th><th>ESTADO</th><th>ACCIONES</th></tr>' +
    (rs.length ? rs.map(r => `<tr><td>${fmtDateTime(r.date)}</td><td>${esc(r.username)}</td><td>${REQ_TYPES[r.type]}${r.recover ? ' (recuperación)' : ''}</td><td>${esc(r.note)}</td><td>${REQ_STATE[r.status]}</td>
      <td>${r.status === 'pending' ? `<button class="mini" data-ok="${r.id}">Aprobar</button><button class="mini del" data-no="${r.id}">Rechazar</button>` : ''}
      <button class="mini del" data-rdel="${r.id}">Borrar</button></td></tr>`).join('')
      : '<tr><td colspan="6">No hay solicitudes.</td></tr>');
}
$('#reqTable').addEventListener('click', async e => {
  const a = e.target.closest('[data-ok]'), x = e.target.closest('[data-no]'), d = e.target.closest('[data-rdel]');
  const find = id => DB.data.requests.find(r => r.id === +id);
  if (a) {
    const r = find(a.dataset.ok), u = r && DB.findUser(r.username);
    if (r) {
      r.status = 'approved';
      if (u) {
        u.canEdit = true;
        if (r.recover) {   // recuperación: se genera una contraseña temporal para entregarla al estudiante
          const tmp = 'RB' + (crypto.getRandomValues(new Uint32Array(1))[0] % 9000 + 1000);
          u.salt = randSalt(); u.pass = await hashPw(tmp, u.salt);
          Lock.clear(u.username);   // si estaba bloqueado, queda libre
          alert(`Contraseña temporal de ${u.username}: ${tmp}\n\nEntrégasela al estudiante. Al ingresar podrá cambiarla desde «Mi ficha».`);
        }
      }
      logAudit('Solicitud aprobada', `${r.username} · ${REQ_TYPES[r.type]}`);
    }
  }
  if (x) { const r = find(x.dataset.no); if (r) { r.status = 'rejected'; logAudit('Solicitud rechazada', `${r.username} · ${REQ_TYPES[r.type]}`); } }
  if (d) { logAudit('Solicitud borrada', `id ${d.dataset.rdel}`); DB.data.requests = DB.data.requests.filter(r => r.id !== +d.dataset.rdel); }
  if (a || x || d) { DB.save(); renderAdmin(); }
});

/* ============ ADMIN: BITÁCORA ============ */
function renderAudit() {
  const all = DB.data.audit.slice().reverse(), a = pageSlice('audit', all, '#pagerAudit');
  $('#auditTable').innerHTML = '<tr><th>FECHA</th><th>POR</th><th>ACCIÓN</th><th>DETALLE</th></tr>' +
    (a.length ? a.map(x => `<tr><td>${fmtDateTime(x.date)}</td><td>${esc(x.by)}</td><td>${esc(x.action)}</td><td>${esc(x.detail)}</td></tr>`).join('')
      : '<tr><td colspan="4">Aún no hay movimientos registrados.</td></tr>');
}

/* ============ ARRANQUE ============ */
(async () => {
  await DB.init();
  Prefs.load();
  renderNav();
  let booted = false;
  const finish = () => {
    if (booted) return; booted = true;
    $('#boot').classList.add('off');
    const v = new URLSearchParams(location.search).get('verify');   // enlace de verificación: ?verify=RB-123...
    const pend = pendingExamCourse();                                // examen sin terminar: se retoma
    if (v) { go('verify'); $('#vFolio').value = v; checkFolio(); }
    else if (pend) { currentCourse = pend; go('quiz'); }
    else go('home');
    if (DB.notice) setTimeout(() => alert(DB.notice), 700);
  };
  $('#boot').addEventListener('click', finish);
  setTimeout(finish, 1800);
})();