/**
 * auth-check.js
 * ใช้วางบนทุกหน้าที่ต้องดึงข้อมูลสิทธิ์และผู้ใช้งานจาก LocalStorage
 */
(function () {
    try {
        const userData = localStorage.getItem('currentUser');
        if (!userData) {
            window.user = null;
            return;
        }

        const user = JSON.parse(userData);
        if (!user || !user.UserPN) {
            localStorage.removeItem('currentUser');
            window.user = null;
            return;
        }

        window.user = user;
    } catch (err) {
        console.error(err);
        localStorage.removeItem('currentUser');
        window.user = null;
    }
})();

function getCurrentUser() {
    return window.user || null;
}

function hasRole(role) {
    if (!window.user) return false;
    return String(window.user.UserTypeID).toUpperCase() === String(role).toUpperCase();
}

function getDisplayName() {
    if (!window.user) return "";
    return (window.user.UserName || "") + " " + (window.user.UserSname || "");
}

function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
    // ปรับให้สอดคล้องกับการใช้งานในสภาพแวดล้ม Google Apps Script / Web Server
    try {
        window.location.replace("index.html");
    } catch(e) {
        window.location.href = "index.html";
    }
}
