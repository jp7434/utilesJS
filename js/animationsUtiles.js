/**! 
 * AnimationsUtiles 1.0
 * 
 * @author jp7434 <scorpion9915@gmail.com>
 * @license MIT License
*/

/**
 * To use this class you can do this:
 * const Animation = new AnimationsUtilesClass();
*/

const animationCSS = document.createElement('link');
animationCSS.href = '../css/transition.css';
animationCSS.rel = 'stylesheet';
document.head.appendChild(animationCSS);

class AnimationsUtilesClass { 

    /**
     * This function displays a transition between a range of numbers in a DOM element
     * 
     * @param {element} element DOM element
     * @param {int} start number to start the count
     * @param {int} end number to end the count
     * @param {string} textBefore text to show before the number
     * @param {string} textAfter text to show after the number
     * 
     * Example: 
     * let divCount = document.querySelector("#divCount");
     * let credits = 150000;
     * animateValue(divCount, 0, credits, "$");
    */

    animateValue(element, start, end, textBefore = '', textAfter = ''){
        let current = start;
        let step = end / 30;
        let increment = step;
        let timer = setInterval(function() {
            current += increment;
            element.innerHTML = `${textBefore}${Math.floor(current).toLocaleString('de-DE')}`;
            if (current >= end) {
                clearInterval(timer);
                element.innerHTML = `${textBefore}${end.toLocaleString('de-DE')}${textAfter}`;
            }
        }, 10);
    }

    /** ATTENTION! this function just work with transition.css
     * This function make a transition for show or hide a element
     *
     * @param {element | array elements} element div, span, select, etc.
     * @param {string} action
     *
     * Example:
     * <html>
     *  ...
     *  <div id="el_id" class="divTransition divHide" hidden>
     *
     *  </div>
     *  <div id="el2_id" class="divTransition divHide" hidden>
     *
     *  </div>
     *  ...
     * </html>
     *
     * const el = document.querySelector('#el_id');
     * const el2 = document.querySelector('#el2_id');
     *
     * Show transition: elementTransition(el, 'show'); || elementTransition([el, el2], 'show');
     * Hide transition: elementTransition(el, 'hide'); || elementTransition([el, el2], 'hide');
    */

    elementTransition(element, action){
        switch (action) {
            case 'show':
                if(element.length == undefined){
                    element.removeAttribute('hidden');

                    setTimeout(() => {
                        element.classList.remove('divHide');
                        element.classList.add('divShow');
                    }, 200);
                }else{
                    for (const el of element) {
                        el.removeAttribute('hidden');
                    }

                    setTimeout(() => {
                        for (const el of element) {
                            el.classList.remove('divHide');
                            el.classList.add('divShow');
                        }
                    }, 200);
                }

                break;
            case 'hide':
                if(element.length == undefined){
                    element.classList.remove('divShow');
                    element.classList.add('divHide');

                    setTimeout(() => {
                        element.setAttribute('hidden', 'hidden');
                    }, 200);
                }else{
                    for (const el of element) {
                        el.classList.remove('divShow');
                        el.classList.add('divHide');
                    }

                    setTimeout(() => {
                        for (const el of element) {
                            el.setAttribute('hidden', 'hidden');
                        }
                    }, 200);
                }

                break;
        }
    }

    /**
     * This function disable a button and displays a loading text next to a spinner based on button text (bootstap spinner class)
     * 
     * @param {element} btn button element DOM
     * @param {string} action action of button
     * @param {string} text text of button
     *
     * Example:
     * const btn = document.querySelector('#btn_id');
     * Start loaging: loadingButton(btn, 'start', 'Loading');
     * Stop loading:  loadingButton(btn, 'stop');
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
                break;
        }
    }
}