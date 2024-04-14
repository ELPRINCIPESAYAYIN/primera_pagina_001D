
if (document.getElementById('mini_producto')) {
    var tarjeta = document.getElementById('mini_producto').outerHTML;
    var tarjetas = '';
    for (i = 0; i < 20; i++) {
    tarjetas = tarjetas + tarjeta;
    }
    document.getElementById('mini_producto').outerHTML = tarjetas;
}

if (document.getElementById('menu')) {
    fetch('menu_superior.html').then(response => {
        return response.text();
    }).then(htmlContent => {
        document.getElementById('menu').innerHTML = htmlContent;
        window.scrollTo(0, 0);
    });
};
if (document.getElementById('menu_usuario')) {
    fetch('menu_superior_usuario.html').then(response => {
        return response.text();
    }).then(htmlContent => {
        document.getElementById('menu_usuario').innerHTML = htmlContent;
        window.scrollTo(0, 0);
    });
};
if (document.getElementById('menu_admin')) {
    fetch('menu_superior_admin.html').then(response => {
        return response.text();
    }).then(htmlContent => {
        document.getElementById('menu_admin').innerHTML = htmlContent;
        window.scrollTo(0, 0);
    });
};
