/**
 * login-script.js
 * ใช้วางบนทุกหน้าที่ต้อง Login ก่อนเข้าใช้งาน
 */

const API_URL = "https://script.google.com/macros/s/AKfycby5WekOkEZJBTR-uC-HRSpyBx9BMoWoI10pyrgcKS9AGmWQdNG2UsThnYaaM55C2xKP/exec";

const loginForm = document.getElementById('loginForm');
const loading = document.getElementById('loadingOverlay');

loginForm.addEventListener('submit', async function(e) {


e.preventDefault();

const username =
    document.getElementById('userpn').value.trim();

const password =
    document.getElementById('userpw').value;

loading.style.display = 'flex';

try {

    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'login',
            username: username,
            password: password
        }),
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        }
    });

    const result = await response.json();

    loading.style.display = 'none';

    if (!result.success) {

        showAlert(
            'เข้าสู่ระบบไม่สำเร็จ',
            result.message,
            'error'
        );

        return;
    }

    localStorage.setItem(
        'currentUser',
        JSON.stringify(result.data)
    );

   if (result.resetRequired === true) {
        // 1. บันทึกข้อมูลสิทธิ์ผู้ใช้ลงในตัวแปร Global ที่ระบบคุณเตรียมไว้
        if (typeof forceResetUser !== 'undefined') {
            forceResetUser = result.data;
        }

        // 2. เรียกฟังก์ชันสลับหน้าไปยังฟอร์มเปลี่ยนรหัสผ่าน (STATE 3) ทันที
        if (typeof switchState === 'function') {
            switchState('changeState');
        }

        // 3. ส่งค่าชื่อผู้ใช้งานไปรอไว้ที่ฟอร์มเปลี่ยนรหัสผ่าน พร้อมล็อกไม่ให้แก้ไข (ReadOnly)
        const changeUserpn = document.getElementById('changeUserpn');
        if (changeUserpn) {
            changeUserpn.value = username;
            changeUserpn.readOnly = true;
        }

        // 4. แสดงคำเตือนแจ้งผู้ใช้ และซ่อนปุ่มกดย้อนกลับชั่วคราวเพื่อบังคับให้เปลี่ยนรหัสผ่านก่อน
        const changePassDesc = document.getElementById('changePassDesc');
        if (changePassDesc) {
            changePassDesc.innerHTML = `<span class="text-danger fw-bold"><i class="fa-solid fa-triangle-exclamation me-1"></i>ระบบบังคับให้เปลี่ยนรหัสผ่านใหม่ก่อนเข้าใช้งาน</span><br>กรุณากำหนดรหัสผ่านใหม่เพื่อความปลอดภัยของบัญชี`;
        }
        
        const btnBackToLogin = document.getElementById('btnBackToLogin');
        const changeDivider = document.getElementById('changeDivider');
        if (btnBackToLogin) btnBackToLogin.classList.add('d-none');
        if (changeDivider) changeDivider.classList.add('d-none');

        return;
    }

    // กรณีผ่านเงื่อนไขปกติ ให้วิ่งไปที่หน้า main_menu.html ตามเดิม
    if (typeof safeRedirect === 'function') {
        safeRedirect('main_menu.html');
    } else {
        window.location.href = 'main_menu.html';
    }

function logout() {


localStorage.removeItem('currentUser');

window.location.href = 'index
    .html';


}

function getCurrentUser() {


return JSON.parse(
    localStorage.getItem('currentUser')
);


}
