const modal = $('#modal');
const modalOverlay = $('.modal-overlay');
const modalContent = $('.modal-content');

const navLoginBtn = $('.nav-login');
const navSignBtn = $('.nav-signin');

const htmlLogin = `
    <div class="modal-main" id="login">
        <header class="modal-header">
            Đăng nhập
        </header>
        <section class="modal-body">
            <div class="form-input-wrap">
                <i class="fa-solid fa-user-astronaut form-icon"></i>
                <input type="text"
                id="user-login"
                class="form-input" placeholder="Nhập tên đăng nhập">
            </div>
            <div class="form-input-wrap">
                <i class="fa-solid fa-key form-icon"></i>
                <input type="password"
                id="pass-login"
                class="form-input" placeholder="Nhập mật khẩu">
            </div>
            <button class="form-btn" onclick="loginHandle()">
                Đăng nhập
            </button>
        </section>
        <footer class="modal-footer">
            <a class="modal-footer-link"
            onclick="formLoginToSign()">
                Bạn chưa có tài khoản?
                <span>Đăng ký ngay!</span>
            </a>
        </footer>
    </div>
    `;
const htmlSign = `
    <div class="modal-main" id="sign">
        <header class="modal-header">
            Đăng ký
        </header>
        <section class="modal-body">
            <div class="form-input-wrap">
                <i class="fa-solid fa-file-signature"></i>
                <input type="text"
                id="name-sign"
                class="form-input" placeholder="Nhập họ và tên">
            </div>
            <div class="form-input-wrap">
            <i class="fa-solid fa-user-astronaut form-icon"></i>
                <input type="text"
                id="user-sign"
                class="form-input" placeholder="Nhập tên đăng nhập">
            </div>
            <div class="form-input-wrap">
                <i class="fa-solid fa-key form-icon"></i>
                <input type="password"
                id="password-sign"
                class="form-input" placeholder="Nhập mật khẩu">
            </div>
            <div class="form-input-wrap">
                <i class="fa-solid fa-link"></i>
                <input type="text"
                id="avt-sign"
                class="form-input" placeholder="Nhập link avartar">
            </div>
            <button class="form-btn" onclick="signHandle()">
            Đăng ký
            </button>
        </section>
        <footer class="modal-footer">
            <a class="modal-footer-link"
            onclick="formSignToLogin()">
                bạn đã có tài khoản?
                <span>Đăng nhập ngay!</span>
            </a>
        </footer>
    </div>
`;
const formLoginToSign = () => {
    modalContent.innerHTML = htmlSign;
}
const formSignToLogin = () => {
    modalContent.innerHTML = htmlLogin;
}
modalOverlay.onclick = function() {
    modal.classList.remove('df');
}
navLoginBtn.onclick = function() {
    modal.classList.add('df');
    modalContent.innerHTML = htmlLogin;
}
navSignBtn.onclick = function() {
    modal.classList.add('df');
    modalContent.innerHTML = htmlSign;
}

// khoi tao 
var userDatas = JSON.parse(localStorage.getItem('account'));
if (userDatas === null) {
    userDatas = [
        {
            id: 0,
            name: 'Admin',
            user: 'admin',
            password: 'admin',
            avt: 'https://i.pinimg.com/originals/13/1e/2d/131e2d8f23e2033c461e3c5770b9520b.jpg'
        }
    ];
}

const loginHandle = () => {
    const userLogin = $('#user-login').value;
    const passLogin = $('#pass-login').value;
    // check
    if (userLogin === '' && passLogin === '') {
        alert('Ban chua nhap ten dang nhap va mat khau!');
    } else if (userLogin === '' && passLogin !== '') {
        alert('Ban chua nhap ten dang nhap!');
    } else if (userLogin !== '' && passLogin === '') {
        alert('Ban chua nhap mat khau!');
    } else {
        const result = userDatas.find(user => {
            return userLogin === user.user;
        });
        if (!result) {
            alert('User khong ton tai!');
        } else {
            if (passLogin !== result.password) {
                alert('Mat khau khong dung!');
            } else {
                alert(`Dang nhap thanh cong!\nChao mung ${result.name}`);
                modal.classList.remove('df');
                $('#nav-user .user-wrap1').classList.remove('df');
                $('#nav-user .user-wrap2').innerHTML = `
                <li class="nav-user-item">
                    <a class="nav-login">
                        <div class="user-avt">
                            <img class="user-avt-img" src="${result.avt}">
                        </div>
                        Xin chao, ${result.name}
                    </a>
                </li>
                <li class="nav-user-item" id="log-out">
                    <a class="nav-login"
                    onclick="logoutHandle()"
                    >
                        <i class="fa-solid fa-right-from-bracket"></i>
                        Đăng xuất
                    </a>
                </li>
                `;
            }
        }
    }
};
const logoutHandle = () => {
    alert('Xin chao, hen gap lai!');
    $('#nav-user .user-wrap1').classList.add('df');
    $('#nav-user .user-wrap2').innerHTML = ``;
}
const signHandle = () => {
    const idSign = userDatas.length;
    const nameSign = $('#name-sign').value;
    const userSign = $('#user-sign').value;
    const passSign = $('#password-sign').value;
    const avtSign = $('#avt-sign').value || 'https://i.pinimg.com/originals/13/1e/2d/131e2d8f23e2033c461e3c5770b9520b.jpg';
    var newUser;
    // check
    if(nameSign === '') {
        alert('Ban chua nhap ten!');
    } else if(userSign === '') {
        alert('Ban chua nhap ten dang nhap!');
    } else if(passSign === '') {
        alert('Ban chua nhap mat khau!');
    } else {
        const result = userDatas.find(user => {
            return userSign === user.user;
        });
        if (result) {
            alert('Ten dang nhap da duoc su dung!');
        } else {
            newUser = {
                id: idSign,
                name: nameSign,
                user: userSign,
                password: passSign,
                avt: avtSign
            };
            userDatas.push(newUser);
            alert('Dang ky thanh cong!');
            formSignToLogin();
            localStorage.setItem('account', JSON.stringify(userDatas));
        }
    }
};