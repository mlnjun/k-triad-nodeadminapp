function submitForm(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "example" && password === "password") {
    showMessage("success", "로그인 성공!");
    setTimeout(() => {
      location.href = "/home.html";
    }, 2000);
  } else {
    showMessage("error", "아이디 또는 비밀번호가 올바르지 않습니다.");
  }
}

function showMessage(type, text) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = text;
  messageElement.className = type;
}
