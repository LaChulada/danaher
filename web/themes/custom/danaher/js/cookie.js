'use strict';

//(function($) {
    function setCookie(cookieName, cookieValue, expireDays,isGlobal) {
        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (expireDays*24*60*60*1000));
        var expires = "expires="+expireDate.toUTCString();
        if (expireDays === 0) {
            if(isGlobal){
                document.cookie = cookieName + "=" + cookieValue + "; path=/";
            } else{
                document.cookie = cookieName + "=" + cookieValue + "; ";
            }
        } else {
            if(isGlobal){
                document.cookie = cookieName + "=" + cookieValue + "; " + expires+"; path=/";
            } else{
                document.cookie = cookieName + "=" + cookieValue + "; " + expires;
            }
        }
    }

    function getCookie(cookieName) {
        var name = cookieName + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
                if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
            }
        return "";
    }

    function checkCookie(cookieName) {
        if (getCookie(cookieName) !== "") {
            return true;
        } else {
            return false;
        }
    }
//})(jQuery);
