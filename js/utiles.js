/**! 
 * UtilesJS 1.0
 * 
 * @author jp7434 <scorpion9915@gmail.com>
 * @license MIT License
*/

/**
 * To use this class you can do this:
 * const Utiles = new UtilesClass();
*/

class UtilesClass {
    /**
     * This function allows initializing a promise
     * @param {any} data nullable
     *
     * @returns data in resolve
    */

    async initPromise(data = null){
        return new Promise(async (resolve, reject) => {
            try {
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * This function allows do a query to the backend with a promise using fetch
     * @param {string} url
     * @param {object | array} data nullable
     *
     * @returns data from backend in resolve
     *
     * Example:
     * const Utiles = new UtilesClass();
     * const getData = async() => {
     *      try {
     *          const url = "{{ route('data.backend') }}"; this is a example of route with Laravel
     *          let user = {
     *              id: 1,
     *              name: "Juan"
     *          }
     *
     *          await Utiles.getDataPromise(url, user)
     *          .then(data => {
     *              ...
     *          })
     *          catch(error => {
     *              ...
     *          });
     *      } catch (error) {
     *          ...
     *      }
     * }
    */

    async getDataPromise(url, data = null){
        return new Promise(async (resolve, reject) => {
            try {
                await fetch(url, {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(datos => {
                    resolve(datos);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    /** ATTENTION! This function use moment.js
     * This function calculates the age
     *
     * @param {date} birthDate 
     * @param {date} now
     * @param {string} lang default: spanish
     * 
     * @returns age
     * 
     * Example:
     * var date = '1982-04-26';
     * var now = moment.now();
     * var age = Utiles.calculateAge(date, now);
     *
     * The final string of the day, month and year is in spanish, if you want it in english, the param 'lang' most be 'en'
    */

    calculateAge(birthDate, now, lang = null){
        let birth = moment(birthDate);

        // get years
        let years = now.diff(birth, 'years');

        // get months
        let diffMonthsDate = now.add(years * -1, 'years');
        let months = diffMonthsDate.diff(birth, 'months');

        // get days
        let days = 0;

        if(months == 0){
            days = diffMonthsDate.diff(birth, 'days');
        }
        
        if(months > 0){
            let diffDaysDate = diffMonthsDate.add(months * -1, 'months');
            days = diffDaysDate.diff(birth, 'days');
        }

        switch (years) {
            case 0:
                years = '';
                break;
            case 1:
                years = `${years} ${lang ? 'year' : 'año'}`;
                break;
            default:
                years = `${years} ${lang ? 'years' : 'años'}`;
                break;
        }

        switch (months) {
            case 0:
                months = '';
                break;
            case 1:
                months = `, ${months} ${lang ? 'month' : 'mes'}`;
                break;
            default:
                months = `, ${months} ${lang ? 'months' : 'meses'}`;
                break;
        }

        switch (days) {
            case 0:
                days = '';
                break;
            case 1:
                days = ` ${lang ? 'and' : 'y'} ${days} ${lang ? 'day' : 'dia'}`;
                break;
            default:
                days = ` ${lang ? 'and' : 'y'} ${days} ${lang ? 'days' : 'dias'}`;
                break;
        }

        return `${years}${months}${days}`;
    }

    /**
     * This function sorts an array based on the string value of an attribute
     * @param {array} array array to filter
     * @param {string} attribute name of attribute of object to filter
     * @param {string} order asc | desc -> order of orderBy
     *
     * Example:
     * var array = [{name: 'Julio'},{name: 'Esteban'},{name: 'Andrés'}];
     * var newArray = Utiles.arrayOrderByString(array, 'name', 'asc');
     *
     * @return array sorted by specified string attribute
    */

    arrayOrderByString(array, attribute, order){
        array.sort(function (a,b) {
            return order == 'asc' ? ((a[attribute] == b[attribute]) ? 0 : ((a[attribute] < b[attribute]) ? 1 : -1 )):
                                    ((a[attribute] == b[attribute]) ? 0 : ((a[attribute] > b[attribute]) ? 1 : -1 ));
        });

        return array;
    }

    /**
     * This function orders an object according to the string or numeric value of an attribute.
     * @param {array} array array to filter
     * @param {string} type date | number
     * @param {string} order asc | desc
     * @param {string} date name of date attribute of object
     * @param {int} number name of number attribute of object
     *
     * Example:
     * var array = [{nextDate: '2022-10-26', nextNumber: 15},{date: '2022-12-14', nextNumber: 5}];
     * var newArray = Utiles.arrayOrderByDateOrNumber(array, 'date', 'asc', 'nextDate', null) || arrayOrderByDateOrNumber(array, 'number', 'desc', null, 'nextNumber');
     *
     * @return array sorted by specified date or number attribute
    */

    arrayOrderByDateOrNumber(array, type, order, date = null, number = null){
        array.sort(function (a, b) {
            let v1, v2;

            switch (type) {
                case 'date':
                    v1 = new Date(a[date]);
                    v2 = new Date(b[date]);
                break;
                case 'number':
                    v1 = a[number];
                    v2 = b[number];
                break;
            }

            let sort1 = v1, sort2 = v2;

            return order == 'asc' ? sort2 - sort1 : sort1 - sort2;
        });

        return array;
    }

    /**
     * This function groups an array by category/attribute
     * @param {array} array array to filter
     * @param {string} attribute attribute name to group
     *
     * Example:
     * var array = [{date: '2022-05-28', indicator: 1},{date: '2022-05-28', indicator: 2},{date: '2022-07-05', indicator: 1}];
     * var newArray = Utiles.arrayGroupBy(array, 'date');
     *
     * @return array grouped by attribute
    */

    arrayGroupBy(object, attribute){
        const groupBy = object.reduce((group, array) => {
            group[array[attribute]] = group[array[attribute]] ?? [];
            group[array[attribute]].push(array);
            return group;
        }, {});

        return groupBy;
    }

    /**
     * This function merges arrays by grouping an attribute
     * @param {array} arrays array set
     * @param {string} attribute attribute to group and merge arrayss
     *
     * Función requerida para funcionamiento: objectGroupBy
     *
     * Example:
     * var array1 = [{cost_price: '319095', date: '2023-02-17'},{cost_price: '1800', date: '2023-02-20'},{cost_price: '13611', date: '2023-02-27'}];
     * var array2 = [{sale_cost: '262840', date: '2023-02-17'},{sale_cost: '100376', date: '2023-02-20'},{sale_cost: '64474', date: '2023-03-01'}];
     * var finalArray = Utiles.arrayFusionByAttribute([oj1, obj2], 'date');
     *
     * @returns merged arrays and grouped according to the attribute
    */

    arrayFusionByAttribute(arrays, attribute){
        let newArray = [];
        let finalArray = [];

        arrays.forEach(element => {
            let obj = objectGroupBy(element, attribute);
            newArray.push(obj);
        });

        newArray.forEach(element => {
            for(const [key, value] of Object.entries(element)){
                switch (finalArray.hasOwnProperty(key)) {
                    case false:
                        finalArray[key] = value[0];
                        break;
                    case true:
                        for (const [key2, value2] of Object.entries(value[0])) {
                            if(!finalArray[key].hasOwnProperty(key2)){
                                finalArray[key][key2] = value2;
                            }
                        }
                        break;
                }
            }
        });

        return finalArray;
    }

    /**
     * This function finds the index of a value in an object
     * @param {object} object
     * @param {string | int} valor
     *
     * Example:
     * var objectIndex = [5, 12, 8, 130, 44];
     * var index = Utiles.objectGetIndex(objectIndex, 12);
     *
     * @return index of value
    */

    objectGetIndex(object, valor){
        const value = (element) => element == valor;

        return object.findIndex(value);
    }

    /**
     * This function converts the first letter of a string to uppercase.
     * @param {string} str
     *
     * Example:
     * ver str = 'word';
     * str = Utiles.capitalizeFirstLetter(str);
     *
     * @returns string with first letter capitalized
    */

    capitalizeFirstLetter(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Función para dar formato a las fechas
     * @param {string} fecha
     *
     * Uso de función: formatDate(fecha);
     *
     * @returns fecha con formato Y-m-d h:i:s
    */

    formatDate(date){
        let newDate = new Date(date);

        let formatDate = Intl.DateTimeFormat('es-CL', {
            year: 'numeric',    //  2-digits
            month: '2-digit',   //  numeric (03), long(Marzo), short(Mar), narrow(M)
            day: '2-digit',     //  numeric (05)
            hour: '2-digit',    //  numeric (05)
            minute: '2-digit',  //  nuemric (05)
            second: '2-digit',  //  numeric (05)
            hour12: false       //  true para formato de 12 horas
        }).format(newDate);

        return formatDate;
    }

    /**
     * Función para agregar puntos de mil a los precios
     * @param {int} price
     *
     * Uso de función: formatPrice(precio);
     *
     * @returns valor con puntos de miles
    */

    formatPrice(price){
        return new Intl.NumberFormat("de-DE").format(price);
    }

    /**
     * Función para redondear precios en base 10
     * @param {int} price
     *
     * Uso de función: roundPrice(precio);
     *
     * @returns precio rendondeado en base 10
    */

    roundPrice(price){
        let total = price;
        let round = total.toString().charAt(total.toString().length - 1);

        if(round != 0){
            if(round >= 6){
                round = 10 - round;
            }else if(round <= 5){
                round = round * -1;
            }
        }

        total = parseInt(total) + parseInt(round);

        return total;
    }

    /**
     * Función para obtener descuento de un precio
     * @param {int} price
     * @param {int} discount porcentaje de descuento
     *
     * Uso de la función: var {precio, precioNuevo} = discountPrice(1500, 50);
     *
     * @returns precio inicial y precio con descuento
    */

    discountPrice(price, discount){
        let newPrice = 0;
        newPrice = price - (price * (discount / 100));
        return {price, newPrice};
    }

    /**
     * Función para validar la estructura de un email
     * @param {string} email email a validar
     *
     * Uso de la función: let correo = validateEmail('algo@correo.cl');
     *
     * @returns si el correo es valido TRUE, de lo contrario, FALSE
    */

    validateEmail(email){
        const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Función para obtener texto de select
     * @param {element} select elemento select del DOM
     *
     * Uso de función:
     * 1 -> const select = document.querySelector('#select_id');
     * 2 -> var selectText = getTextOfSelect(select);
     *
     * @returns texto de select
    */

    getTextOfSelect(select){
        return select.options[select.selectedIndex].text;
    }

    /**
     * Función para obtener valores de atributos
     * @param {element} select elemento select del DOM
     * @param {string} attribute nombre de atributo a obtener
     *
     * Uso de función:
     * 1 -> const select = document.querySelector('#select_id');
     * 2 -> var valor = getDataOfSelect(select, 'data-id');
     *
     * @returns valor del atributo buscado
    */

    getDataOfSelect(select, attribute){
        return select.options[select.selectedIndex].getAttribute(attribute);
    }

    /**
     * Función para obtener todos los atributos de un elemento DOM
     * @param {element} element
     *
     * @returns array con atributos de elemento
    */

    getAllDataOfSelect(element){
        const option = element.options[element.selectedIndex].attributes;
        let array = {};

        for (const attr of option) {
            array[attr.name] = attr.value;
        }

        return array;
    }

    /**
     * Función para obtener valores de select multiple
     * @param {element} select elemento select del DOM
     *
     * Use de función:
     * 1 -> const select = document.querySelector('#select');
     * 2 -> var valores = getSelectMultipleValues(select);
     *
     * @returns array con valores de select
    */

    getValuesSelectMultiple(select){
        let values = [];
        let options = select.selectedOptions;

        for (const option of options) {
            values.push(option.value);
        }

        return values;
    }

    /**
     * Función para cambiar valor de select
     * @param {element} select elemento select del DOM
     * @param {string | int} value valor a asignar en select
     *
     * Uso de función:
     * 1 -> const select = document.querySelector('#select_id');
     * 2 -> setValueOfSelect(select, "1");
    */

    setValueOfSelect(select, value){
        const eventChange = new Event("change");
        select.value = value;
        select.dispatchEvent(eventChange);
    }

    /**
     * Función para asignar valores a select multiple
     * @param {element} select elemento select del DOM
     * @param {array} array objeto con atributos
     * @param {string} attribute nombre de atributo para dar valor a select
     *
     * Uso de función:
     * 1 -> const select = document.querySelector('#select_id');
     * 2 -> var object = [{id: 1, nombre: 'Pedro'},{id: 3, nombre: 'Cristian'}];
     * 2 -> setValuesSelectMultiple(select, object, 'id');
    */

    setValuesSelectMultiple(select, array, attribute){
        const event = new Event("change");
        let values = [];

        for(const object of array){
            values[values.length] = object[attribute];
        }

        select.value = values;
        select.dispatchEvent(event);
    }

    /**
     * Función para agrear fila a tabla HTML en ultima posición
     * @param {element} tabla elemento table del DOM
     * @param {string} fila HTML de la fila a agregar
     * @param {array} array array de valores para agregar a nueva fila
     * @param {string, int} position 'first' | 'last' | number -> posición de la fila en la tabla
     *
     * Uso de función:
     * 1 -> const tabla = document.querySelector('#tabla_id');
     * 2 -> var fila = `<tr><td></td><tr>`;
     * 3 -> var array = {id: 1, name: 'tr_1'};
     * 4 -> addRowToTable(tabla, fila, array, 'first'); || addRowToTable(tabla, fila, array, 'last') || addRowToTable(tabla, fila, array, 3);
    */

    addRowToTable(tabla, fila, array, position){
        let tablaRef = tabla.getElementsByTagName('tbody')[0];
        let nuevaFila;

        switch (position) {
            case 'first':
                nuevaFila = tablaRef.insertRow(0);
            break;
            case 'last':
                nuevaFila = tablaRef.insertRow(tablaRef.rows.length)
            break;
            default:
                nuevaFila = tablaRef.insertRow(position);
            break;
        }

        for(const [key, value] of Object.entries(array)){
            nuevaFila[key] = value;
        }

        nuevaFila.innerHTML = fila;
    }

    /**
     * Función para eliminar fila de tabla HTML
     * @param {element} fila elemento tr del DOM
     *
     * Uso de función:
     * 1 -> const fila = document.querySelector('#fila_id');
     * 2 -> deleteRowOfTable(fila);
    */

    deleteRowOfTable(fila){
        fila.parentNode.removeChild(fila);
    }

    /**
     * Función para obtener parametro de url
     * @param {string} parametro nombre de parametro de url
     *
     * Uso de función: var param = getParamUrl('id');
     *
     * @returns parametro de url
    */

    getParamUrl(parametro){
        let url = new URL(window.location.href);
        let param = url.searchParams.get(parametro);

        return param;
    }

    /**
     * Función para agregar parametros a la url (esto debe recargar la página para surtir efecto)
     * @param {string} parameter nombre del parametro
     * @param {string} value valor del parametro
    */

    setParamUrl(parameter, value){
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        params.set(parameter, value);
        document.location.search = params;
    }

    /**
     * Función para eliminar parametro de url
     * @param {string} parametro nombre de parametro url
     *
     * Uso de función: deleteParamUrl('id');
    */

    deleteParamUrl(parametro){
        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search.slice(1));
            params.delete(parametro);
            window.history.replaceState(
                {},
                '',
                `${window.location.pathname}${params}${window.location.hash}`,
            )
        }
    }

    /**
     * Función para obtener el hash actual de la url
     *
     * @returns hash de url
    */

    getHashUrl(){
        return window.location.hash;
    }

    /**
     * Función para agregar hash en url
     * @param {string} hash
    */

    setHashUrl(hash){
        window.location.hash = `#${hash}`;
    }

    /**
     * Función para eliminar hash de url
    */

    deleteHashUrl(){
        history.pushState("", "", `${location.pathname}${location.search}`);
    }

    /**
     * Función para bloquear botón y mostrar texto de cargando junto a un spinner según texto de botón (clase spinner de bootstap)
     * @param {element} btn elemento de botón DOM
     * @param {string} accion accion de botón
     * @param {string} texto texto de botón
     *
     * Uso de función:
     * 1 -> const btn = document.querySelector('#btn_id');
     * 2 -> Iniciar botón: loadingButton(btn, 'start', 'Cargando');
     * 3 -> Detener botón: loadingButton(btn, 'stop');
    */

    loadingButton(btn, action, text = null){
        switch (action) {
            case 'start':
                btn.setAttribute('data-btn-text', btn.innerHTML);
                btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> ${text}`;
                btn.disabled = true;
            break;
            case 'stop':
                btn.innerHTML = btn.getAttribute('data-btn-text');
                btn.disabled = false;
            break
        }
    }

    /**
     * Función para filtar página mediante parametros
     * @param {string} clase clase de elementos del filtro
     * @param {string} pagina nombre de url a filtar
     * @param {int} numPagina numero de pagina a mostrar
     *
     * Uso de función:
     * Ejemplo de url -> 127.0.0.1:8000/ventas
     * 1 -> <input class="filtro" id="flitro_id" value="1"/>
     * 2 -> filterPage('.filtro', 'ventas');
    */

    filterPage(clase, pagina, numPagina = null){
        const filtros = document.querySelectorAll(clase);
        let url = `${pagina}?`;

        filtros.forEach(element = (element, index) => {
            if(index == 0){
                url += `${element.id}=${element.value}`;
            }

            if(index != 0){
                if(element.id == 'page' && numPagina != null){
                    url += `&${element.id}=${numPagina}`;
                }else{
                    url += `&${element.id}=${element.value}`;
                }

            }
        });

        window.location.href = url;
    }

    /**
     * Función filtrar página la presionar enter en inputs de filtro
     * @param {string} clase clase de los input de filtro
     *
     * Uso de función: listenerInputsFilter('.filtros');
    */

    listenerInputsFilter(clase, url){
        const filtros = document.querySelectorAll(clase);

        Array.from(filtros).forEach(function(element) {
            element.addEventListener('keyup', function(e){
                e.preventDefault();
                if(e.which == 13) {
                    filterPage(clase, url, 1);
                }
            });
        });
    }

    /**
     * Función para filtar página la hacer clic en número de página (links)
     * @param {string} claseLink clase del elemento link
     * @param {string} claseFiltro clase de los input de filtro
     * @param {string} url nombre de url a filtrar
     * @param {string} idPageInput id de input page
     *
     * Uso de función:
     * 1 -> input <input id="page" class="filtro" value="" hidden /> El valor de page se determima según lenguaje de backend
     * Ej de laravel: <input type="text" class="filtro" id="page" name="page" value="{{ Request::get('page') }}" hidden>
     * 2 -> listenerNumberPage('.page-link', '.filtro', 'ventas', '#page');
    */

    listenerNumberPage(claseLink, claseFiltro, url, idPageInput){
        const links = document.querySelectorAll(claseLink);
        const page =  document.querySelector(idPageInput);

        Array.from(links).forEach(function(element) {
            element.addEventListener('click', function(e){
                e.preventDefault();
                if(this.text != undefined){
                    page.value = this.text;
                }

                filterPage(claseFiltro, url);
            });
        });
    }

    /**
     * Función para calcular los montos por producto / servicio
     * @param {object} producto
     * @param {string} origen
     * @param {int} iva
     * @param {int} descuento
     *
     * @returns totales del producto {totalProducto, totalNeto, precioNeto, montoAfecto, montoExento, montoDescuento}
    */

    calcularMontosProducto(producto, origen, iva, descuento){
        try {
            let [
                totalProducto,
                totalNeto,
                precio,
                precioNeto,
                montoAfecto,
                montoExento,
                montoDescuento,
                cantidad,
                ivaDec
            ] = Array(9).fill(0);

            ivaDec = parseFloat("1."+iva);

            switch (origen) {
                case 'cotizaciones':
                    cantidad = producto.unidad_medida == 'un' ? parseInt(producto.cantidad) : parseFloat(producto.cantidad);

                    if(descuento != 0){
                        if(producto.es_exento == 'No'){
                            montoDescuento= (((producto.precio_venta * cantidad) * cantidad) / 100);
                        }
                    }

                    if(producto.es_exento == 'No'){
                        totalProducto = Math.round(Math.round(Math.round(producto.precio_venta / ivaDec) * cantidad) * ivaDec);
                        totalNeto = Math.round(totalProducto / ivaDec);
                        precioNeto = Math.round(producto.precio_venta / ivaDec);
                        montoAfecto = totalProducto;
                    }else{
                        totalProducto = producto.precio_venta * cantidad;
                        totalNeto = producto.precio_venta;
                        precioNeto = producto.precio_venta;
                        montoExento = totalProducto;
                    }

                break;
                case 'devoluciones':
                    cantidad = producto.unidad_medida == 'un' ? parseInt(producto.cant_dev) : parseFloat(producto.cant_dev);
                    precio = producto.es_exento == 'Si' ? producto.precio_venta : producto.precio_venta - ((producto.precio_venta * descuento) / 100);
                    totalProducto = precio * cantidad;
                    totalNeto = precio;
                    precioNeto = precio;

                    if(descuento != null){
                        if(producto.es_exento == 'No'){
                            montoDescuento = (((producto.precio_venta * cantidad) * descuento) / 100);
                        }
                    }

                    if(producto.es_exento == 'No'){
                        montoAfecto = totalProducto;
                    }else{
                        montoExento = totalProducto;
                    }

                break;
                case 'ventas':
                    cantidad = producto.unidad_medida == 'un' ? parseInt(producto.cantidad) : parseFloat(producto.cantidad);
                    precio = producto.es_exento == 'Si' ? producto.precio_venta : producto.precio_venta - ((producto.precio_venta * descuento) / 100);
                    totalProducto = precio * cantidad;
                    totalNeto = precio;
                    precioNeto = precio;

                    if(descuento != 0){
                        if(producto.es_exento == 'No'){
                            montoDescuento = (((producto.precio_venta * cantidad) * descuento) / 100);
                        }
                    }

                    if(producto.es_exento == 'No'){
                        montoAfecto = totalProducto;
                    }else{
                        montoExento = totalProducto;
                    }
                break;
            }

            return {totalProducto, totalNeto, precioNeto, montoAfecto, montoExento, montoDescuento};
        } catch (error) {
            throw error;
        }
    }

    /**
     * Función para calcular montos totales
     * @param {int} montoAfecto
     * @param {int} iva
     *
     * @returns total afecto y total iva
     */

    calcularMontosTotales(montoAfecto, iva){
        try {
            let totalAfecto = 0;
            let montoIva = 0;
            let ivaDec = parseFloat("1."+iva);
            let ivaDec2 = parseFloat("0."+iva);

            totalAfecto = Math.round((montoAfecto / ivaDec));
            montoIva = Math.round(totalAfecto * ivaDec2);

            return {totalAfecto, montoIva};
        } catch (error) {
            throw error;
        }
    }
}
