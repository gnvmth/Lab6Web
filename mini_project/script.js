const form = document.getElementById("formWorkshop");
const namaEl = document.getElementById("nama");
const emailEl = document.getElementById("email");
const sesiEl = document.getElementById("sesi");
const catatanEl = document.getElementById("catatan");
const pesanStatus = document.getElementById("pesanStatus");
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fungsi 1: ringkasan input langsung (event input & change)
function perbaruiRingkasan() {
 document.getElementById("rNama").textContent = namaEl.value.trim() || "-";
 document.getElementById("rEmail").textContent = emailEl.value.trim() || "-";
 document.getElementById("rSesi").textContent = sesiEl.value || "-";
}
[[namaEl, "errNama", "input"], [emailEl, "errEmail", "input"], [sesiEl, "errSesi", "change"]].forEach(function (d) {
 d[0].addEventListener(d[2], function () {
  perbaruiRingkasan();
  setError(d[0], d[1], ""); // hapus pesan error saat pengguna memperbaiki isian
 });
});

// Fungsi 2: penghitung karakter catatan
catatanEl.addEventListener("input", function () {
 document.getElementById("hitung").textContent = catatanEl.value.length;
});

// Fungsi 3: validasi + pesan error/sukses (event submit)
function setError(inputEl, errId, teks) {
 document.getElementById(errId).textContent = teks;
 inputEl.classList.toggle("invalid", teks !== "");
 return teks === "";
}
form.addEventListener("submit", function (event) {
 event.preventDefault();
 const nama = namaEl.value.trim();
 const email = emailEl.value.trim();
 const okNama = setError(namaEl, "errNama",
  nama.length < 3 ? "Nama wajib diisi, minimal 3 karakter." : "");
 const okEmail = setError(emailEl, "errEmail",
  !polaEmail.test(email) ? "Masukkan email yang valid." : "");
 const okSesi = setError(sesiEl, "errSesi",
  sesiEl.value === "" ? "Pilih salah satu sesi." : "");

 if (okNama && okEmail && okSesi) {
  pesanStatus.className = "sukses";
  pesanStatus.textContent = "Pendaftaran berhasil! Sampai jumpa di sesi " + sesiEl.value + ", " + nama + ".";
  form.reset();
  document.getElementById("hitung").textContent = 0;
  perbaruiRingkasan();
 } else {
  pesanStatus.className = "gagal";
  pesanStatus.textContent = "Pendaftaran gagal. Periksa kembali isian Anda.";
 }
});

// Fungsi 4: tombol reset (event click)
document.getElementById("tombolReset").addEventListener("click", function () {
 form.reset();
 ["errNama", "errEmail", "errSesi"].forEach(function (id) { document.getElementById(id).textContent = ""; });
 [namaEl, emailEl, sesiEl].forEach(function (el) { el.classList.remove("invalid"); });
 document.getElementById("hitung").textContent = 0;
 pesanStatus.textContent = "";
 perbaruiRingkasan();
});

// Fungsi 5 (Eksperimen 4): sembunyikan/tampilkan paragraf dengan class CSS
const tombolInfo = document.getElementById("tombolInfo");
const infoWorkshop = document.getElementById("infoWorkshop");
tombolInfo.addEventListener("click", function () {
 infoWorkshop.classList.toggle("sembunyi");
 tombolInfo.textContent = infoWorkshop.classList.contains("sembunyi") ? "Tampilkan info" : "Sembunyikan info";
});
