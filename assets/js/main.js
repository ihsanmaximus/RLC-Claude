const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const WARN='PROTOTIPE UI/UX — Fitur ini memperlihatkan simulasi pengalaman pengguna. Belum terhubung dengan database, sistem login, cloud, maupun layanan eksternal.';
const IM='assets/images/';
const P=[
{id:1,g:'Pelatihan Klinis',cat:'Pelatihan Klinis',t:'Manajemen Keselamatan Pasien',img:'rlc-program-clinical.jpg',d:'Penerapan sasaran keselamatan pasien dalam praktik pelayanan sehari-hari.',goals:['Memahami sasaran keselamatan pasien','Mengidentifikasi dan melaporkan insiden','Menyusun rencana perbaikan'],dur:'2 hari (contoh)'},
{id:2,g:'Manajemen Layanan Kesehatan',cat:'Manajemen Layanan',t:'Peningkatan Mutu Layanan Klinik',img:'rlc-program-management.jpg',d:'Pencatatan, evaluasi, dan perbaikan berkelanjutan mutu layanan klinik.',goals:['Menetapkan indikator mutu','Melakukan evaluasi layanan','Menyusun tindak lanjut'],dur:'3 hari (contoh)'},
{id:3,g:'Manajemen Layanan Kesehatan',cat:'Manajemen Kesehatan',t:'Manajemen Rekam Medis dan Informasi Kesehatan',img:'rlc-program-medical-record.jpg',d:'Pengelolaan rekam medis dan informasi kesehatan yang tertib dan aman.',goals:['Memahami alur rekam medis','Menjaga kerahasiaan data pasien','Memanfaatkan informasi untuk layanan'],dur:'2 hari (contoh)'},
{id:4,g:'Workshop dan Bimtek',cat:'Pelatihan Profesional',t:'Keselamatan dan Kesehatan Kerja Fasilitas Pelayanan Kesehatan',img:'rlc-program-ohs.jpg',d:'Workshop penerapan K3 di fasilitas pelayanan kesehatan.',goals:['Mengenali risiko kerja','Menyusun prosedur K3','Melakukan simulasi tanggap darurat'],dur:'1 hari (contoh)'}];
P.forEach(p=>{p.m='Online / Hybrid';p.tg='Tenaga Kesehatan';p.rq=['Tenaga kesehatan aktif','Perangkat dengan koneksi internet']});
const E=[
{id:1,t:'Seminar Mutu Layanan Kesehatan',cat:'Seminar',dt:'12 Desember 2026 (tanggal contoh)',m:'Hybrid',d:'Seminar demonstrasi tentang praktik mutu layanan.'},
{id:2,t:'Webinar Keselamatan Pasien',cat:'Webinar',dt:'20 Januari 2027 (tanggal contoh)',m:'Online',d:'Webinar demonstrasi tentang budaya keselamatan pasien.'}];
const DEMO={'RLC-DEMO-2026-001':['Peserta Contoh A','Manajemen Keselamatan Pasien','10 Maret 2026'],'RLC-DEMO-2026-002':['Peserta Contoh B','Peningkatan Mutu Layanan Klinik','21 April 2026']};
const dlg=$('#m'),mb=$('#mb');
const open=h=>{mb.innerHTML='<button class="x" data-close aria-label="Tutup">×</button>'+h;dlg.showModal()};
dlg.addEventListener('click',e=>{if(e.target===dlg||e.target.closest('[data-close]'))dlg.close()});
function form(title,intro,fs,btn,tag){return `<h3>${title}</h3><p>${intro}</p><p class="warn">${WARN}</p><form novalidate data-tag="${tag}">${fs.map(f=>{const a=`name="${f[0]}" ${f[3]?'data-r':''} data-t="${f[2]}"`;return `<label>${f[1]}${f[3]?' *':''}${f[2]=='select'?`<select ${a}><option value="">Pilih…</option>${f[4].map(o=>`<option>${o}</option>`).join('')}</select>`:f[2]=='textarea'?`<textarea ${a} rows="3"></textarea>`:`<input ${a} type="${f[2]}">`}<small></small></label>`}).join('')}<button class="btn pri">${btn}</button></form>`}
const reg=(what,name)=>form('Pendaftaran Simulasi',`Anda mengisi formulir simulasi untuk: <b>${name}</b>.`,[['nama','Nama lengkap','text',1],['email','Email','email',1],['wa','Nomor WhatsApp','tel',1],['profesi','Profesi','text',0]],'Kirim Simulasi','Simulasi pendaftaran '+what+' selesai.');
mb.addEventListener('submit',e=>{const f=e.target;e.preventDefault();let ok=true;
$$('input,select,textarea',f).forEach(i=>{const v=i.value.trim(),t=i.dataset.t;let m='';
if(i.hasAttribute('data-r')&&!v)m='Wajib diisi.';else if(v&&t=='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))m='Format email tidak valid.';else if(v&&t=='tel'&&!/^[0-9+\s-]{9,16}$/.test(v))m='Nomor WhatsApp tidak valid.';else if(v&&t=='number'&&+v<1)m='Isi angka lebih dari 0.';
i.classList.toggle('bad',!!m);i.nextElementSibling.textContent=m;if(m)ok=false});
if(ok){f.outerHTML=`<div class="ok"><b>Simulasi berhasil.</b> ${f.dataset.tag} Tidak ada data yang dikirim, disimpan, atau diverifikasi.<br><br><button class="btn pri sm" data-close>Tutup</button></div>`}});
function detail(id){const p=P.find(x=>x.id==id);open(`<h3>${p.t}</h3><p><b>${p.cat}</b></p><p>${p.d}</p><h4>Tujuan pembelajaran</h4><ul>${p.goals.map(g=>`<li>${g}</li>`).join('')}</ul><h4>Sasaran peserta</h4><p>${p.tg}</p><h4>Metode pelaksanaan</h4><p>${p.m}</p><h4>Durasi contoh</h4><p>${p.dur}</p><h4>Persyaratan peserta</h4><ul>${p.rq.map(g=>`<li>${g}</li>`).join('')}</ul><p class="warn">Data demonstrasi, bukan program resmi RLC.</p><p><button class="btn pri" data-reg="${id}">Daftar / Minat Mengikuti Program</button></p>`)}
function evDetail(id){const v=E.find(x=>x.id==id);open(`<h3>${v.t}</h3><p><b>${v.cat}</b> · ${v.m}</p><p>${v.dt}</p><p>${v.d}</p><p class="warn">Data demonstrasi.</p><p><button class="btn pri" data-evreg="${id}">Daftar</button></p>`)}
const INST=['Rumah Sakit','Puskesmas','Klinik','Institusi Pendidikan','Organisasi Profesi','Lainnya'];
const FORMS={
collab:()=>form('Ajukan Kolaborasi','Ceritakan rencana kolaborasi Anda.',[['nama','Nama','text',1],['org','Organisasi','text',1],['email','Email','email',1],['pesan','Pesan','textarea',1]],'Kirim Simulasi','Simulasi pengajuan kolaborasi selesai.'),
inst:()=>form('Diskusikan Kebutuhan Pelatihan','Formulir permintaan pelatihan institusi.',[['inst','Nama institusi','text',1],['jenis','Jenis institusi','select',1,INST],['pj','Nama penanggung jawab','text',1],['jab','Jabatan','text',1],['email','Email','email',1],['wa','Nomor WhatsApp','tel',1],['keb','Kebutuhan pelatihan','textarea',1],['jml','Perkiraan jumlah peserta','number',1],['ket','Keterangan tambahan','textarea',0]],'Kirim Simulasi','Simulasi permintaan pelatihan institusi selesai.'),
events:()=>`<h3>Event Mendatang</h3><p class="warn">Seluruh event dan tanggal adalah data demonstrasi.</p>${E.map(v=>`<div class="ev"><b>${v.t}</b><br>${v.cat} · ${v.dt} · ${v.m}<div class="btns"><button class="btn sm" data-evd="${v.id}">Detail Event</button><button class="btn pri sm" data-evreg="${v.id}">Daftar</button></div></div>`).join('')}`};
let cur='Semua';
function render(){const gs=['Semua',...new Set(P.map(p=>p.g)),'Pelatihan Institusi'];
$('#chips').innerHTML=gs.map(g=>`<button class="chip ${g==cur?'on':''}" data-chip="${g}">${g}</button>`).join('');
const l=P.filter(p=>cur=='Semua'||p.g==cur);
$('#plist').innerHTML=l.length?l.map(p=>`<article class="pc" data-d="${p.id}"><img src="${IM+p.img}" alt="${p.t}"><div class="pc-b"><em>${p.cat}</em><h3>${p.t}</h3><div class="pc-m"><span><svg class="ic"><use href="#i-mon"/></svg>${p.m}</span><span><svg class="ic"><use href="#i-user"/></svg>${p.tg}</span><button>Lihat Detail →</button></div></div></article>`).join(''):'<p class="empty">Belum ada program demonstrasi pada kategori ini. Pilih kategori lain atau diskusikan kebutuhan institusi Anda.</p>'}
render();
const nav=$('#nav'),bg=$('#bg'),ddm=$('#ddm'),ddb=$('#ddb');
bg.onclick=()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
ddb.onclick=e=>{e.stopPropagation();const o=ddm.classList.toggle('open');ddb.setAttribute('aria-expanded',o)};
document.addEventListener('click',e=>{
const t=e.target;if(!t.closest('.dd'))ddm.classList.remove('open');
if(t.closest('#nav a')){nav.classList.remove('open');ddm.classList.remove('open')}
const f=t.closest('[data-f]');if(f){cur=f.dataset.f;render()}
const c=t.closest('[data-chip]');if(c){cur=c.dataset.chip;render()}
const d=t.closest('[data-d]');if(d)detail(d.dataset.d);
const r=t.closest('[data-reg]');if(r){const p=P.find(x=>x.id==r.dataset.reg);open(reg('program',p.t))}
const o=t.closest('[data-open]');if(o)open(FORMS[o.dataset.open]());
const ed=t.closest('[data-evd]');if(ed)evDetail(ed.dataset.evd);
const er=t.closest('[data-evreg]');if(er){const v=E.find(x=>x.id==er.dataset.evreg);open(reg('event',v.t))}});
$('#vf').onsubmit=e=>{e.preventDefault();const v=$('#vn').value.trim().toUpperCase(),r=$('#vr');r.className='';r.textContent='';
if(!v){r.className='er';r.textContent='Masukkan nomor sertifikat terlebih dahulu.';return}
const x=DEMO[v];if(!x){r.className='er';r.textContent='Data tidak ditemukan dalam data demonstrasi.';return}
[['Nomor',v],['Nama peserta contoh',x[0]],['Program contoh',x[1]],['Tanggal terbit contoh',x[2]],['Status','SIMULASI — bukan verifikasi resmi']].forEach(a=>{const p=document.createElement('div'),b=document.createElement('b');b.textContent=a[0]+': ';p.append(b,a[1]);r.append(p)})};
