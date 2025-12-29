const correctUsername = "admin";
const correctPassword = "admin123";

// MENGGUNAKAN FUNGSI DIBAWAH INI TIDAK REKOMEN KARENA TIDAK ADANYA PEMBATAS YANG MENYEBABKAN BISA DICOBA BERULANG KALI!
// function login() {
//   const user = document.getElementById("username").value;
//   const pass = document.getElementById("password").value;

//   if (user === correctUsername && pass === correctPassword) {
//     alert("LOGIN BERHASIL!");
//     if (bruteInterval) {
//       clearInterval(bruteInterval);
//       bruteInterval = null;
//     }
//     return;
//   } else {
//     alert("LOGIN GAGAL!");
//   }
// }

// MENYIMPAN BANYAKNYA PERCOBAAN
let attempt = localStorage.getItem("attempt")
  ? parseInt(localStorage.getItem("attempt"))
  : 0;

const maxAttempt = 3; //MAXIMAL PERCOBAAN 3 KALI

// MEMBUAT FUNGSI LOGIN
function login() {
  // kunci akun ketika user mencoba lebih dari 3 kali
  if (attempt > maxAttempt) {
    alert("Akun dikunci karena terlalu banyak percobaan");
    return;
  }

  // mengambil value dari input login
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // cek kondisi keselarasan username dan password
  if (user === correctUsername && pass === correctPassword) {
    alert("Login berhasil");

    attempt = 0; //set variable percobaan jadi 0 lagi
    localStorage.removeItem("attempt"); //hapus angka percobaan dari localeStorage
    window.location.href =
      "https://adrianzky10.github.io/WebBelajarJavascript/"; //alih kan ke web ketika berhasil (simulasi saja)
    clearInterval(bruteInterval); // sudahi perulangan interval brutForceSimulation function
  } else {
    //ketika username dan password tidak valid
    attempt++; //tambahkan percobaan
    localStorage.setItem("attempt", attempt); // simpan angka percobaan di localeStorage
    alert("Login gagal! Percobaan ke-" + attempt); // menampilkan alert gagal dalam percobaan login
  }
}

// SIMULASI BRUTE FORCE
function bruteForceSimulation() {
  // buat array beberapa percobaan password yang akan dicoba di input login
  const passwordList = [
    "123456",
    "admin13",
    "admin11",
    "admin14022",
    "admin123",
    "adm1n45",
  ];

  let index = 0; //set indexArray yang akan dipanggil

  // Melakukan percobaan login setiap 1.5 detik
  bruteInterval = setInterval(() => {
    // ketika passwordList sudah habis / kombinasi password selesai maka
    if (index >= passwordList.length) {
      // Jalankan ini
      console.log("Brute force selesai");
      clearInterval(bruteInterval);
      return;
    }

    // Ketika belum selesai maka
    document.getElementById("username").value = "admin"; // isi input username dengan "admin"
    // isi input password dengan seluruh kombinasi password dan dicoba 1 per 1 setiap 1,5detik
    document.getElementById("password").value = passwordList[index];

    // Menampilkan misalnya percobaan bot di console.log sedang mencoba 1 per 1 password
    console.log("Bot mencoba password:", passwordList[index]);

    //memanggil fungsi login untuk eksekusi apakah password benar atau salah
    login();
    // menambahkan index array untuk mengambil nilai array selanjutnya
    index++;
  }, 1500);
}
