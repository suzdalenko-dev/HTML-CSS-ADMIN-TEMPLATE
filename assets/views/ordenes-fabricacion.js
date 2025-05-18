let ordenesFabricacion = [
    { fecha: '2025-05-03', nombre: 'Lote A - Yogurt', estado: 'En Proceso' },
    { fecha: '2025-05-07', nombre: 'Lote B - Leche', estado: 'Completado' },
    { fecha: '2025-05-15', nombre: 'Lote C - Queso', estado: 'Pendiente' },
    { fecha: '2025-05-15', nombre: 'Lote F - Queso', estado: 'Pendiente' },
    { fecha: '2025-05-15', nombre: 'Lote D - Crema', estado: 'En Proceso' },
    { fecha: '2025-05-23', nombre: 'Lote E - Flan', estado: 'Cancelado' },
    { fecha: '2025-06-05', nombre: 'Lote F - Yogurt Frutado', estado: 'Pendiente' },
    { fecha: '2025-06-18', nombre: 'Lote G - Leche Descremada', estado: 'En Proceso' },
    { fecha: '2025-04-10', nombre: 'Lote H - Crema Batida', estado: 'Completado' },
    { fecha: '2025-04-22', nombre: 'Lote I - Postres', estado: 'Cancelado' }
];

let mesesOF = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let fechaActual = new Date();



function cambiarMes(delta) {
    fechaActual.setMonth(fechaActual.getMonth() + delta);
    renderCalendario(ordenesFabricacion, fechaActual.getFullYear(), fechaActual.getMonth());
}

function renderCalendario(ordenes, year, month) {
    const titulo = document.getElementById('tituloMes');
    titulo.textContent = `📅 Calendario de Órdenes de Fabricación - ${mesesOF[month]} ${year}`;

    const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const calendario = document.getElementById('calendario');
    calendario.innerHTML = '';

    // Encabezado de días
    diasSemana.forEach(dia => {
        const cell = document.createElement('div');
        cell.textContent = dia;
        cell.className = 'font-bold text-center text-gray-700';
        calendario.appendChild(cell);
    });

    let primerDia = new Date(year, month, 1).getDay();
    primerDia = (primerDia === 0) ? 6 : primerDia - 1;

    let diasEnMes = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < primerDia; i++) {
        console.log('primerDia=' + primerDia)
        calendario.appendChild(document.createElement('div'));
    }

    for (let dia = 1; dia <= diasEnMes; dia++) {
        const fechaStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
        const ordenesDelDia = ordenes.filter(o => o.fecha == fechaStr);

        const cell = document.createElement('div');
        cell.className = 'border p-2 rounded shadow text-xs h-32 overflow-y-auto bg-white hover:bg-gray-50 transition';
        cell.innerHTML = `<div class="text-center font-semibold mb-1">${dia}</div>`;

        ordenesDelDia.forEach(ord => {
            const estadoColor = {
                'En Proceso': 'bg-yellow-200',
                'Completado': 'bg-green-200',
                'Pendiente': 'bg-blue-200',
                'Cancelado': 'bg-red-200'
            }[ord.estado] || 'bg-gray-200';

            const item = document.createElement('div');
            item.className = `p-1 rounded mb-1 ${estadoColor}`;
            item.innerHTML = `<strong>${ord.nombre}</strong><br><span class="text-gray-700">${ord.estado}</span>`;
            cell.appendChild(item);
        });

        calendario.appendChild(cell);
    }
}










function ordenesFabricacionInit() {
    document.title = "ordenesFabricacionInit";
    document.getElementById('slugTitle').innerHTML = `<span class="b-top-page">1</span>
                                                    <span class="b-top-page">2</span>
                                                    <span class="b-top-page">3</span>
                                                    <span class="b-top-page">4</span>`;

    renderCalendario(ordenesFabricacion, fechaActual.getFullYear(), fechaActual.getMonth());
}

