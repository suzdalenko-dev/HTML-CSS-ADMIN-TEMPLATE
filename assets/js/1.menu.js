// File: assets/js/0.menu.js
// Descripción: Este script genera un menú dinámico basado en los roles de usuario y la estructura de datos proporcionada.
let menuData = [
    {
        title: 'Administración',
        icon: '📁',
        roles: ['admin', 'gerente'],
        submenu: [
            {
                title: 'Gestión Usuarios',
                icon: '👥',
                roles: ['admin'],
                submenu: [
                    { title: 'Crear Usuario', icon: '➕', roles: ['admin'], submenu: null, view: 'crear-usuario' },
                    { title: 'Lista de Usuarios', icon: '📃', roles: ['admin'], submenu: null, view: 'lista-usuarios' }
                ]
            },
            {
                title: 'Informes Generales',
                icon: '📈',
                roles: ['gerente'],
                submenu: [
                    { title: 'Resumen Mensual', icon: '🗓️', roles: ['gerente'], submenu: null }
                ]
            }
        ]
    },
    {
        title: 'Calidad',
        icon: '✅',
        roles: ['calidad'],
        submenu: [
            {
                title: 'Reportes Calidad',
                icon: '📑',
                roles: ['calidad', 'gerente'],
                submenu: null
            },
            {
                title: 'Verificación',
                icon: '✔️',
                roles: ['calidad'],
                submenu: [
                    { title: 'Muestras Aleatorias', icon: '🎯', roles: ['calidad'], submenu: null }
                ]
            }
        ]
    },
    {
        title: 'Compras',
        icon: '🛒',
        roles: ['compras'],
        submenu: [
            {
                title: 'Nueva Orden',
                icon: '📝',
                roles: ['compras'],
                submenu: null
            },
            {
                title: 'Proveedores',
                icon: '🏷️',
                roles: ['compras'],
                submenu: [
                    { title: 'Alta Proveedor', icon: '➕', roles: ['compras'], submenu: null },
                    { title: 'Lista Proveedores', icon: '📃', roles: ['compras'], submenu: null }
                ]
            }
        ]
    },
    {
        title: 'Finanzas',
        icon: '💰',
        roles: ['finanzas'],
        submenu: [
            {
                title: 'Pagos',
                icon: '💳',
                roles: ['finanzas'],
                submenu: [
                    { title: 'Cuentas a Cobrar', icon: '📥', roles: ['finanzas'], submenu: null },
                    { title: 'Cuentas a Pagar', icon: '📤', roles: ['finanzas'], submenu: null }
                ]
            },
            {
                title: 'Resumen Financiero',
                icon: '📊',
                roles: ['finanzas'],
                submenu: null
            }
        ]
    },
    {
        title: 'Laboratorio',
        icon: '🔬',
        roles: ['laboratorio'],
        submenu: [
            {
                title: 'Análisis',
                icon: '🧪',
                roles: ['laboratorio'],
                submenu: [
                    { title: 'Microbiología', icon: '🦠', roles: ['laboratorio'], submenu: null },
                    { title: 'Química', icon: '⚗️', roles: ['laboratorio'], submenu: null }
                ]
            },
            {
                title: 'Informes',
                icon: '📋',
                roles: ['laboratorio', 'gerente'],
                submenu: null
            }
        ]
    },
    {
        title: 'Logística',
        icon: '🚚',
        roles: ['logistica'],
        submenu: [
            {
                title: 'Ruta',
                icon: '🗺️',
                roles: ['logistica'],
                submenu: null
            }
        ]
    },
    {
        title: 'Producción',
        icon: '🏭',
        roles: ['salaproduccion'],
        submenu: [
            {
                title: 'Control Producción',
                icon: '⚙️',
                roles: ['salaproduccion'],
                submenu: null
            },
            {
                title: 'Informes Producción',
                icon: '📊',
                roles: ['salaproduccion', 'gerente'],
                submenu: null
            }
        ]
    },
    {
        title: 'Taller',
        icon: '🛠️',
        roles: ['taller'],
        submenu: [
            {
                title: 'Control Equipos',
                icon: '🔍',
                roles: ['taller'],
                submenu: null
            },
            {
                title: 'Mantenimiento',
                icon: '🔧',
                roles: ['taller'],
                submenu: null
            }
        ]
    },
    {
        title: 'Ventas',
        icon: '💼',
        roles: ['ventas'],
        submenu: [
            {
                title: 'Historial Ventas',
                icon: '📜',
                roles: ['ventas', 'gerente'],
                submenu: null
            },
            {
                title: 'Nueva Venta',
                icon: '➕',
                roles: ['ventas'],
                submenu: [
                    { title: 'Cliente Existente', icon: '👤', roles: ['ventas'], submenu: null },
                    { title: 'Cliente Nuevo', icon: '🆕', roles: ['ventas'], submenu: null }
                ]
            }
        ]
    }
];



// 👤 Roles del usuario actual
let rolesDB = "gerente;ventas;laboratorio;salaproduccion";
// rolesDB = 'ventas;'
let currentUserRoles = rolesDB.split(';').filter(r => r);

// 🔤 Convierte título en id/view sin acentos y con guiones
function slugify(text) {
    return text.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita acentos
        .replace(/\s+/g, '-')         // espacios a guiones
        .replace(/[^\w\-]+/g, '')     // quita símbolos raros
        .replace(/\-\-+/g, '-');      // colapsa guiones
}

// ✅ Verifica si el usuario tiene permiso
function hasAccess(roles) {
    if (!roles || roles.length === 0) return true;
    if (currentUserRoles.includes('admin') || currentUserRoles.includes('gerente')) return true;
    return currentUserRoles.some(role => roles.includes(role));
}

// 🔄 Alterna el submenú y la flechita
function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    const icon = document.querySelector(`[data-icon-for="${id}"]`);
    if (submenu && icon) {
        const isHidden = submenu.classList.contains('hidden');
        submenu.classList.toggle('hidden');
        icon.textContent = isHidden ? '▲' : '▼';
    }
}

// 🧠 Generador recursivo de submenús
function generateSubmenu(items, parentId = '') {
    let html = '';
    items.forEach(item => {
        if (!hasAccess(item.roles)) return;

        const submenuId = `${parentId}-${slugify(item.title)}`;
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const view = item.view || slugify(item.title); // fallback si no tiene view

        if (hasSubmenu) {
            html += `
                <button class="flex justify-between w-full items-center px-2 py-2 hover:bg-gray-100 rounded-md" onclick="toggleSubmenu('${submenuId}')">
                    <span class="flex items-center gap-2">${item.icon} <span>${item.title}</span></span>
                    <span class="text-gray-400 text-[8px]" data-icon-for="${submenuId}">▼</span>
                </button>
                <div id="${submenuId}" class="ml-4 mt-1 hidden space-y-1">${generateSubmenu(item.submenu, submenuId)}</div>`;
        } else {
            html += `<a href="#${view}" class="block py-1 px-2 hover:bg-gray-100 rounded-md ml-6 flex items-center gap-2" onclick="loadView('${view}')">${item.icon} ${item.title}</a>`;
        }
    });
    return html;
}

// 🚀 Renderiza el menú completo
function createMenu() {
    const htmlMenu = generateSubmenu(menuData, 'menu');
    document.getElementById('menuContainer').innerHTML = htmlMenu;
}

createMenu();





