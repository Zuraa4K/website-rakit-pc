
const WA = "6283134862681";

const products = [
{id:1,name:"AMD Ryzen 5 5600",cat:"Prosesor",emoji:"🧠",price:1450000,desc:"6 Core / 12 Thread · AM4"},
{id:2,name:"Intel Core i5-12400F",cat:"Prosesor",emoji:"🧠",price:1850000,desc:"6 Core / 12 Thread · LGA1700"},
{id:3,name:"AMD Ryzen 7 5700X",cat:"Prosesor",emoji:"🧠",price:2350000,desc:"8 Core / 16 Thread · AM4"},
{id:4,name:"NVIDIA RTX 4060 8GB",cat:"Kartu Grafis",emoji:"🎮",price:4650000,desc:"Gaming Full HD · 8GB"},
{id:5,name:"AMD Radeon RX 6600 8GB",cat:"Kartu Grafis",emoji:"🎮",price:3200000,desc:"Gaming Full HD · 8GB"},
{id:6,name:"NVIDIA RTX 3060 12GB",cat:"Kartu Grafis",emoji:"🎮",price:3900000,desc:"Gaming & editing · 12GB"},
{id:7,name:"B550M Motherboard",cat:"Motherboard",emoji:"🧩",price:1250000,desc:"AM4 · Micro ATX"},
{id:8,name:"H610M Motherboard",cat:"Motherboard",emoji:"🧩",price:1050000,desc:"Intel LGA1700 · Micro ATX"},
{id:9,name:"RAM DDR4 16GB (2x8)",cat:"Memori",emoji:"⚡",price:550000,desc:"3200MHz · Dual Channel"},
{id:10,name:"RAM DDR4 32GB (2x16)",cat:"Memori",emoji:"⚡",price:950000,desc:"3200MHz · Dual Channel"},
{id:11,name:"SSD NVMe 512GB",cat:"Penyimpanan",emoji:"💾",price:550000,desc:"M.2 NVMe · Cepat"},
{id:12,name:"SSD NVMe 1TB",cat:"Penyimpanan",emoji:"💾",price:950000,desc:"M.2 NVMe · Kapasitas besar"},
{id:13,name:"PSU 650W 80+ Bronze",cat:"Power Supply",emoji:"🔌",price:850000,desc:"650 Watt · Sertifikasi Bronze"},
{id:14,name:"Casing Gaming RGB",cat:"Casing",emoji:"🖥️",price:650000,desc:"Tempered glass · RGB"},
{id:15,name:"CPU Cooler Tower",cat:"Pendingin",emoji:"❄️",price:350000,desc:"Pendingin prosesor"},
{id:16,name:"Monitor 24 inci 144Hz",cat:"Monitor",emoji:"🖥️",price:1850000,desc:"Full HD · 144Hz"}
];

const packages = [
{name:"PC Pemula",tag:"PELAJAR & HARIAN",price:3500000,items:["Prosesor dengan grafis terintegrasi","RAM 16GB","SSD 512GB","Cocok untuk sekolah & kerja"]},
{name:"PC Gaming",tag:"PALING DIMINATI",price:7500000,items:["Prosesor 6 Core","Kartu grafis gaming","RAM 16GB","SSD NVMe 512GB"],featured:true},
{name:"PC Gaming Pro",tag:"PERFORMA TINGGI",price:12500000,items:["Prosesor 8 Core","Kartu grafis kelas tinggi","RAM 32GB","SSD NVMe 1TB"]}
];

let cart = JSON.parse(localStorage.getItem("wolfCart") || "[]");
let currentPage = "beranda";
let activeCategory = "Semua";
let searchText = "";

const content = document.getElementById("content");
const rupiah = n => "Rp" + Number(n).toLocaleString("id-ID");

function save(){
 localStorage.setItem("wolfCart",JSON.stringify(cart));
 updateCount();
}

function updateCount(){
 let n=cart.reduce((a,b)=>a+b.qty,0);
 document.getElementById("topCount").textContent=n;
 document.getElementById("sideCount").textContent=n;
}

function toast(t){
 let el=document.getElementById("toast");
 el.textContent=t;
 el.classList.add("show");
 setTimeout(()=>el.classList.remove("show"),2300);
}

function go(page){
 currentPage=page;
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 document.getElementById("crumb").textContent=({
 beranda:"Beranda",katalog:"Katalog Komponen",rakit:"Rakit PC Sendiri",
 paket:"Paket PC Gaming",keranjang:"Keranjang Belanja",
 tentang:"Tentang Wolfstore",kontak:"Hubungi Kami"
 })[page]||"Beranda";
 document.getElementById("sidebar").classList.remove("open");
 render();
}

function addCart(id){
 let p=products.find(x=>x.id===id);
 let item=cart.find(x=>x.id===id);
 if(item)item.qty++;
 else cart.push({...p,qty:1});
 save();
 toast(p.name+" ditambahkan ke keranjang");
}

function changeQty(id,d){
 let x=cart.find(p=>p.id===id);
 if(x){
  x.qty+=d;
  if(x.qty<=0)cart=cart.filter(p=>p.id!==id);
 }
 save();
 render();
}

function money(n){return rupiah(n)}

function productCard(p){
 return `<article class="product-card">
 <div class="product-visual"><small>${p.cat}</small>${p.emoji}</div>
 <div class="product-info">
 <div class="type">${p.cat.toUpperCase()}</div>
 <h3>${p.name}</h3><div class="desc">${p.desc}</div>
 <div class="price">${money(p.price)}</div>
 <div class="product-actions">
 <button class="btn" onclick="addCart(${p.id})">＋ Keranjang</button>
 <button class="btn secondary" onclick="orderProduct(${p.id})">Pesan</button>
 </div></div></article>`;
}

function orderProduct(id){
 let p=products.find(x=>x.id===id);
 checkoutText(`Halo WOLFSTORE, saya ingin memesan ${p.name} (${money(p.price)}).`);
}

function checkoutText(msg){
 window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg),"_blank");
}

function renderHome(){
 return `<section class="hero">
 <div class="eyebrow">✦ TOKO KOMPONEN & JASA RAKIT PC · LAMPUNG</div>
 <h1>Rakit PC Impianmu.<br><em>Mulai dari sini.</em></h1>
 <p>Temukan komponen komputer, pilih paket PC gaming, atau konsultasikan rakitan sesuai kebutuhan dan anggaranmu bersama WOLFSTORE.</p>
 <div class="hero-actions">
 <button class="btn" onclick="go('katalog')">Jelajahi Komponen ↗</button>
 <button class="btn secondary" onclick="go('rakit')">Rakit PC Sendiri</button>
 </div><div class="hero-decoration">⌘</div></section>

 <div class="stats">
 <div class="stat"><strong>Komponen PC</strong><span>Pilihan beragam</span></div>
 <div class="stat"><strong>Rakit Sesuai Budget</strong><span>Konsultasi kebutuhan</span></div>
 <div class="stat"><strong>Bandar Lampung</strong><span>Layanan lokal</span></div>
 </div>

 <div class="section-title"><div><h2>Jelajahi Kategori</h2><p>Pilih komponen yang kamu cari.</p></div><span class="link" onclick="go('katalog')">Lihat semua ↗</span></div>

 <div class="category-grid">${["Prosesor","Kartu Grafis","Motherboard","Memori","Penyimpanan","Power Supply"].map((c,i)=>`<div class="category" onclick="activeCategory='${c}';go('katalog')"><div class="emoji">${["🧠","🎮","🧩","⚡","💾","🔌"][i]}</div><b>${c}</b></div>`).join("")}</div>

 <div class="section-title"><div><h2>Produk Pilihan</h2><p>Komponen yang sering dicari.</p></div><span class="link" onclick="go('katalog')">Buka katalog ↗</span></div>
 <div class="product-grid">${products.slice(0,6).map(productCard).join("")}</div>`;
}

function renderCatalog(){
 let cats=["Semua",...new Set(products.map(p=>p.cat))];
 let filtered=products.filter(p=>(activeCategory==="Semua"||p.cat===activeCategory)&&(p.name.toLowerCase().includes(searchText)||p.cat.toLowerCase().includes(searchText)));
 return `<div class="page-heading"><h1>Katalog Komponen</h1><p>Temukan komponen PC yang sesuai dengan kebutuhanmu.</p></div>
 <div class="filters"><input class="search" id="searchInput" placeholder="⌕ Cari nama komponen..." value="${searchText}">
 ${cats.map(c=>`<button class="filter-btn ${activeCategory===c?"active":""}" onclick="activeCategory='${c}';render()">${c}</button>`).join("")}</div>
 <div class="product-grid">${filtered.map(productCard).join("")||'<p class="muted">Produk tidak ditemukan.</p>'}</div>`;
}

function renderPackages(){
 return `<div class="page-heading"><h1>Paket PC Gaming & Komputer</h1><p>Pilih gambaran paket, lalu konsultasikan spesifikasi dan harga final melalui WhatsApp.</p></div>
 <div class="package-grid">${packages.map(p=>`<article class="package ${p.featured?"featured":""}">
 <span class="pill">${p.tag}</span><h3>${p.name}</h3>
 <div class="price">${money(p.price)} <small class="muted">/ estimasi</small></div>
 <ul>${p.items.map(i=>`<li>${i}</li>`).join("")}</ul>
 <button class="btn ${p.featured?"":"secondary"} full" onclick="checkoutText('Halo WOLFSTORE, saya tertarik paket ${p.name}. Mohon info spesifikasi dan harga terbaru.')">Konsultasi Paket ↗</button>
 </article>`).join("")}</div>
 <p class="muted" style="margin-top:18px;font-size:11px">*Harga paket merupakan estimasi contoh, bukan penawaran harga tetap.</p>`;
}

function renderBuilder(){
 let options=cat=>products.filter(p=>p.cat===cat).map(p=>`<option value="${p.id}">${p.name} — ${money(p.price)}</option>`).join("");
 let cats=["Prosesor","Kartu Grafis","Motherboard","Memori","Penyimpanan","Power Supply","Casing","Pendingin"];
 return `<div class="page-heading"><h1>Rakit PC Sendiri</h1><p>Pilih komponen satu per satu. Total perkiraan akan dihitung otomatis.</p></div>
 <div class="builder"><div class="panel"><h3>⚙ Pilih Komponen</h3><div class="component-select">
 ${cats.map(c=>`<div class="field"><label>${c}</label><select id="build-${c}" onchange="calcBuild()"><option value="">-- Pilih ${c} --</option>${options(c)}</select></div>`).join("")}
 </div></div>
 <div class="panel"><h3>Ringkasan Rakitan</h3><div id="buildSummary"><p class="muted">Pilih komponen untuk mulai menghitung.</p></div>
 <button class="btn full" style="margin-top:16px" onclick="sendBuild()">Konsultasi Rakitan ↗</button>
 <p class="muted" style="font-size:10px;line-height:1.7;margin-top:12px">Kompatibilitas komponen perlu diperiksa sebelum pembelian.</p></div></div>`;
}

function calcBuild(){
 let selected=[];
 document.querySelectorAll(".component-select select").forEach(s=>{
  let p=products.find(x=>x.id===Number(s.value));
  if(p)selected.push(p);
 });
 let total=selected.reduce((a,p)=>a+p.price,0);
 document.getElementById("buildSummary").innerHTML=selected.length?
 selected.map(p=>`<div class="summary-line"><span>${p.cat}</span><b>${money(p.price)}</b></div>`).join("")+
 `<div class="summary-line total"><span>Perkiraan Total</span><span>${money(total)}</span></div>`:
 '<p class="muted">Pilih komponen untuk mulai menghitung.</p>';
 window.buildSelected=selected;
}

function sendBuild(){
 let arr=window.buildSelected||[];
 if(!arr.length)return toast("Pilih komponen terlebih dahulu");
 checkoutText("Halo WOLFSTORE, saya ingin konsultasi rakitan PC:\n"+
 arr.map(p=>p.cat+": "+p.name+" ("+money(p.price)+")").join("\n")+
 "\nTotal estimasi: "+money(arr.reduce((a,p)=>a+p.price,0)));
}

function renderCart(){
 if(!cart.length)return `<div class="page-heading"><h1>Keranjang Belanja</h1><p>Periksa produk pilihanmu sebelum konsultasi pemesanan.</p></div>
 <div class="panel empty"><div class="big">🛒</div><h3>Keranjang masih kosong</h3>
 <p style="margin:10px 0 20px">Yuk, cari komponen PC yang kamu butuhkan.</p>
 <button class="btn" onclick="go('katalog')">Jelajahi Katalog</button></div>`;

 let total=cart.reduce((a,p)=>a+p.price*p.qty,0);
 return `<div class="page-heading"><h1>Keranjang Belanja</h1><p>Atur jumlah produk dan lanjutkan konsultasi pesanan.</p></div>
 <div class="cart-layout"><div class="panel">${cart.map(p=>`<div class="cart-row"><div>
 <h4>${p.emoji} ${p.name}</h4><p>${p.cat} · ${money(p.price)}</p>
 <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${p.qty}</span><button onclick="changeQty(${p.id},1)">+</button><button class="remove" onclick="changeQty(${p.id},-${p.qty})">Hapus</button></div></div>
 <strong>${money(p.price*p.qty)}</strong></div>`).join("")}</div>
 <div class="panel"><h3>Ringkasan Belanja</h3>
 <div class="summary-line"><span>Jumlah produk</span><b>${cart.reduce((a,p)=>a+p.qty,0)} item</b></div>
 <div class="summary-line total"><span>Total estimasi</span><b>${money(total)}</b></div>
 <p class="muted" style="font-size:11px;line-height:1.7;margin:12px 0">Harga dan ketersediaan akan dikonfirmasi oleh admin.</p>
 <button class="btn green full" onclick="checkoutCart()">Pesan via WhatsApp ↗</button>
 <button class="btn secondary full" style="margin-top:9px" onclick="go('katalog')">Tambah Produk</button></div></div>`;
}

function checkoutCart(){
 checkoutText("Halo WOLFSTORE, saya ingin konsultasi pesanan:\n"+
 cart.map(p=>`${p.name} x${p.qty} = ${money(p.price*p.qty)}`).join("\n")+
 "\nTotal estimasi: "+money(cart.reduce((a,p)=>a+p.price*p.qty,0)));
}

function renderAbout(){
 return `<div class="page-heading"><h1>Tentang WOLFSTORE</h1><p>Teman untuk membangun komputer sesuai kebutuhan.</p></div>
 <div class="hero"><div class="eyebrow">WOLFSTORE · BANDAR LAMPUNG</div>
 <h1>Teknologi yang tepat.<br><em>Rakitan yang hebat.</em></h1>
 <p>WOLFSTORE hadir untuk membantu kamu memilih komponen komputer, merencanakan rakitan PC, dan mendapatkan solusi sesuai kebutuhan maupun anggaran. Kami melayani konsultasi komponen dan jasa rakit PC di Bandar Lampung.</p>
 <div class="hero-actions"><button class="btn" onclick="go('katalog')">Lihat Komponen</button><button class="btn secondary" onclick="go('kontak')">Hubungi Kami</button></div></div>`;
}

function renderContact(){
 return `<div class="page-heading"><h1>Hubungi WOLFSTORE</h1><p>Diskusikan kebutuhan PC kamu bersama kami.</p></div>
 <div class="contact-grid">
 <div class="contact-box"><div class="symbol">💬</div><h3>WhatsApp</h3><p>Konsultasi komponen, rakitan PC, dan pemesanan produk.</p><a target="_blank" href="https://wa.me/${WA}">+62 831-3486-2681 ↗</a></div>
 <div class="contact-box"><div class="symbol">📷</div><h3>Instagram</h3><p>Ikuti akun Instagram untuk melihat informasi dan update.</p><a target="_blank" href="https://instagram.com/jasarakitkomputer.lpg">@jasarakitkomputer.lpg ↗</a></div>
 <div class="contact-box"><div class="symbol">📍</div><h3>Lokasi</h3><p>Bandar Lampung, Lampung, Indonesia.</p><a target="_blank" href="https://maps.google.com/?q=Bandar+Lampung">Lihat lokasi ↗</a></div>
 <div class="contact-box"><div class="symbol">🛠️</div><h3>Jasa Rakit PC</h3><p>Rakit PC gaming, komputer kerja, dan rakitan sesuai anggaran.</p><a href="#" onclick="go('rakit')">Mulai rakit PC ↗</a></div></div>`;
}

function render(){
 content.innerHTML=({
 beranda:renderHome,
 katalog:renderCatalog,
 paket:renderPackages,
 rakit:renderBuilder,
 keranjang:renderCart,
 tentang:renderAbout,
 kontak:renderContact
 })[currentPage]();

 if(currentPage==="rakit")calcBuild();

 if(currentPage==="katalog"){
  let input=document.getElementById("searchInput");
  input.addEventListener("input",e=>{
   searchText=e.target.value;
   let pos=e.target.selectionStart;
   render();
   let n=document.getElementById("searchInput");
   n.focus();
   n.setSelectionRange(pos,pos);
  });
 }
}

document.querySelectorAll("[data-page]").forEach(el=>el.addEventListener("click",e=>{
 e.preventDefault();
 go(el.dataset.page);
}));

document.getElementById("mobileMenu").addEventListener("click",()=>{
 document.getElementById("sidebar").classList.toggle("open");
});

updateCount();
render();
