const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let lang=localStorage.getItem('cc-lang')||'en';
const LOGO='<img src="assets/care-compass-icon.jpeg" alt="Care Compass icon">';
/* ---------- Translations (English text lives in the HTML; Tamil here) ---------- */
const COMMON=[['fever','🌡️','Fever','காய்ச்சல்'],['cough','🤧','Cough','இருமல்'],['headache','🤕','Headache','தலைவலி'],['bodypain','💢','Body pain','உடல் வலி'],['vomiting','🤢','Vomiting','வாந்தி'],['diarrhea','💧','Loose motions','வயிற்றுப்போக்கு']];
const DANGER=[['chest','❤️','Chest pain','நெஞ்சு வலி'],['breath','🫁','Difficulty breathing','மூச்சுத் திணறல்'],['unconscious','😵','Fainting or unconscious','மயக்கம் / சுயநினைவின்மை'],['seizure','⚡','Fits or seizure','வலிப்பு'],['bleeding','🩸','Heavy bleeding','கடுமையான இரத்தப்போக்கு'],['snake','🐍','Snake bite','பாம்புக்கடி'],['preg','🤰','Bleeding in pregnancy','கர்ப்ப கால இரத்தப்போக்கு']];
const TA={n_home:'முகப்பு',n_sym:'அறிகுறிகள்',n_care:'அருகில் மருத்துவம்',n_about:'பற்றி',n_sos:'அவசரம்',
f_tag:'உங்கள் மொழியில், உங்கள் கிராமத்தில் மருத்துவ வழிகாட்டல்.',f_g:'வழிகாட்டல் மட்டுமே, நோய் கண்டறிதல் அல்ல.',sos_call:'108 அழைக்க',
h_label:'கிராமப்புற சுகாதாரத் துணை',h_title:'உங்கள் மொழியில், உங்கள் கிராமத்தில் மருத்துவ வழிகாட்டல்.',
h_desc:'கிராமக் குடும்பங்களுக்கான எளிய சுகாதார வழிகாட்டல். அறிகுறிகளைப் புரிந்துகொள்ளுங்கள், அருகிலுள்ள மருத்துவத்தைக் கண்டறியுங்கள், அவசர உதவியை அணுகுங்கள்.',
b_sym:'அறிகுறிகளைச் சோதிக்க',b_care:'அருகில் மருத்துவம் தேட',listen:'🔊 கேளுங்கள்',h_note:'✓ வழிகாட்டல் மட்டுமே, நோய் கண்டறிதல் அல்ல.',
sv_t:'தேவையான அனைத்தும் ஒரே இடத்தில்',r1_t:'அறிகுறி சோதனை',r1_p:'அறிகுறிகளைத் தேர்ந்தெடுத்து, வீட்டில் ஓய்வா, மருத்துவரா, அவசர உதவியா என அறியுங்கள்.',
r2_t:'அருகில் மருத்துவம் தேட',r2_p:'அருகிலுள்ள மருத்துவமனைகளையும் கிளினிக்குகளையும் வரைபடத்தில் காணுங்கள்; வழியும் அழைப்பும் உண்டு.',
r3_t:'அவசர எண்கள்',r3_p:'108, 102, 112 உள்ளிட்ட எண்களை ஒரே தொடுதலில் அழையுங்கள்.',
hw_t:'எப்படி செயல்படுகிறது',st1_t:'புரிந்துகொள்ளுங்கள்',st1_p:'அறிகுறிகளைத் தேர்ந்தெடுத்து எளிய வழிகாட்டலைப் பெறுங்கள்.',st2_t:'கண்டறியுங்கள்',st2_p:'அருகிலுள்ள மருத்துவமனை அல்லது கிளினிக்கைக் காணுங்கள்.',st3_t:'தொடர்பு கொள்ளுங்கள்',st3_p:'தேவைப்படும்போது ஒரே தொடுதலில் அவசர எண்ணை அழையுங்கள்.',
ta_t:'ஆங்கிலத்திலும் பயன்படுத்தலாம்',ta_p:'மேலே உள்ள மொழி பொத்தானை அழுத்துங்கள். பிறகு “கேளுங்கள்” மூலம் வழிகாட்டலைக் கேளுங்கள்; “பேசுங்கள்” மூலம் அறிகுறிகளைச் சொல்லுங்கள்.',ta_b:'மொழியை மாற்று',
sy_h:'உங்கள் அறிகுறிகளைப் புரிந்துகொள்ளுங்கள்',sy_p:'உங்களுக்கு உள்ளவற்றைத் தேர்ந்தெடுத்தால், அடுத்து என்ன செய்வது என்ற எளிய வழிகாட்டல் கிடைக்கும்.',sy_q:'என்ன அறிகுறிகள் உள்ளன?',mic:'🎤 பேசிச் சொல்லுங்கள்',
dg:'ஆபத்தான அறிகுறிகள். பொருந்துவனவற்றைத் தேர்க.',du:'எத்தனை நாட்களாக உள்ளது?',d0:'தேர்க',d1:'1 முதல் 3 நாட்கள்',d2:'4 முதல் 7 நாட்கள்',d3:'7 நாட்களுக்கு மேல்',ag:'யாருக்கு உடல்நலமில்லை?',child:'குழந்தை',adult:'பெரியவர்',elder:'முதியவர்',
go:'சோதிக்க',err:'அறிகுறி, எத்தனை நாட்கள், யாருக்கு என்பதைத் தேர்ந்தெடுக்கவும்.',why_h:'ஏன் இந்த முடிவு',share:'WhatsApp-ல் பகிர்',imp:'முக்கியம்',
sy_d:'இந்தச் சோதனை பொதுவான வழிகாட்டல் மட்டுமே; இது மருத்துவ நோய் கண்டறிதல் அல்ல. கவலை இருந்தாலோ அறிகுறிகள் மோசமானாலோ சுகாதாரப் பணியாளரைப் பாருங்கள்.',
hc_h:'அருகில் மருத்துவம் தேட',hc_p:'உங்கள் இருப்பிடத்தைப் பகிர்ந்தால், 10 கி.மீ.க்குள் உள்ள மருத்துவமனைகளும் கிளினிக்குகளும் அருகிலுள்ளவை முதலாகக் காட்டப்படும்.',near:'📍 என் இருப்பிடத்தைப் பயன்படுத்து',f_all:'அனைத்தும்',f_gov:'அரசு',f_pri:'தனியார்',pn:'கவனிக்க',
hc_n:'தரவு OpenStreetMap-இலிருந்து வருகிறது; முழுமையாக இல்லாமல் இருக்கலாம். செல்வதற்கு முன் அழைத்து உறுதிசெய்யுங்கள். ஆரம்ப சுகாதார நிலையம் பற்றி அறிய உங்கள் கிராம சுகாதார செவிலியரிடம் கேளுங்கள் அல்லது 104-ஐ அழையுங்கள்.',
em_h:'அவசர உதவி தேவையா?',em_p:'யாருக்காவது ஆபத்து என்றால் உடனே அழையுங்கள். காத்திருக்க வேண்டாம்.',
e1:'ஆம்புலன்ஸ்',e1p:'அவசர ஆம்புலன்ஸ் சேவை',e2:'தேசிய அவசர எண்',e2p:'காவல், தீயணைப்பு, மருத்துவ உதவி',e3:'தாய் சேய் நலன்',e3p:'கர்ப்பம், பச்சிளம் குழந்தைக்கான ஆம்புலன்ஸ்',e4:'சுகாதார உதவி எண்',e4p:'மாநில சுகாதார உதவி எண்ணில் மருத்துவ ஆலோசனை',e5:'பெண்கள் உதவி எண்',e5p:'துன்பத்தில் உள்ள பெண்களுக்கான உதவி',e6:'குழந்தைகள் உதவி எண்',e6p:'உதவி தேவைப்படும் குழந்தைகளுக்கான உதவி',
sa_h:'அழைக்கும்போது சொல்ல வேண்டியவை',sa1:'நீங்கள் இருக்கும் இடம்: ஊர் பெயர், அருகிலுள்ள அடையாளம்',sa2:'என்ன நடந்தது',sa3:'எத்தனை பேர் பாதிக்கப்பட்டுள்ளனர்',
em_d:'Care Compass அவசர சிகிச்சையோ நோய் கண்டறிதலோ வழங்காது. உடனடி உதவி தேவைப்படும்போது அவசர சேவைகளை அழையுங்கள்.',
ab_h:'ஆரோக்கியத் தகவல் எளிதில் புரிய வேண்டும்',ab_p:'ஓர் அறிகுறி எவ்வளவு தீவிரம், எங்கே செல்வது, யாரை அழைப்பது என்பதில் கிராமக் குடும்பங்கள் சிரமப்படுகின்றன. Care Compass இந்த மூன்று கேள்விகளுக்கும் எளிய மொழியில் பதில் தருகிறது.',
p1:'எளிமை',p1p:'தினசரி பயனர்களுக்கான குறுகிய, தெளிவான வழிகாட்டல்.',p2:'உங்கள் மொழியில்',p2p:'தமிழ், ஆங்கிலம்; கேட்கவும் பேசவும் குரல் வசதி.',p3:'அருகிலேயே',p3p:'அருகிலுள்ள மருத்துவத்தைக் காட்டும்; முக்கிய வசதிகள் இணையமின்றியும் செயல்படும்.',p4:'வழிகாட்டல் மட்டுமே',p4p:'தகுதியான சுகாதார நிபுணருக்கு இது மாற்றல்ல.',
dc_h:'மருத்துவ மறுப்பு',dc_p:'Care Compass ஒரு கல்வி மற்றும் வழிகாட்டல் கருவி. இது நோய்களைக் கண்டறியாது, மருந்துகளைப் பரிந்துரைக்காது, மருத்துவ சிகிச்சைக்கு மாற்றாகாது.',
red_l:'அவசரம்',red_t:'உடனே அவசர உதவியை நாடுங்கள்.',red_p:'இந்த அறிகுறிகள் உயிருக்கு ஆபத்தானவை. உடனே 108-ஐ அழையுங்கள் அல்லது அருகிலுள்ள மருத்துவமனைக்குச் செல்லுங்கள். காத்திருக்க வேண்டாம்.',red_a:'108 அழைக்க',
gold_l:'மருத்துவரைப் பாருங்கள்',gold_t:'இன்றே மருத்துவ மையத்திற்குச் செல்லுங்கள்.',gold_p:'ஒரு சுகாதாரப் பணியாளர் உங்களைப் பரிசோதிப்பது நல்லது. செல்லும் வழியில் நீர் அருந்துங்கள்.',gold_a:'அருகில் மருத்துவம் தேட',
green_l:'வீட்டிலேயே கவனியுங்கள்',green_t:'ஓய்வெடுத்து அறிகுறிகளைக் கவனியுங்கள்.',green_p:'ஓய்வெடுங்கள், நிறைய நீர் அருந்துங்கள் (வயிற்றுப்போக்கு அல்லது வாந்தி இருந்தால் ORS). மோசமானாலோ 3 நாட்களுக்கு மேல் நீடித்தாலோ மருத்துவரைப் பாருங்கள்.',green_a:'அருகில் மருத்துவம் தேட',
w_rd:'எச்சரிக்கை அறிகுறி: ',w_fy:'குழந்தை அல்லது முதியவருக்கு காய்ச்சல் விரைவில் தீவிரமாகலாம்.',w_fl:'காய்ச்சல் 3 நாட்களுக்கு மேல் நீடிக்கிறது.',w_dh:'வாந்தி அல்லது வயிற்றுப்போக்கு நீரிழப்பை ஏற்படுத்தலாம், குறிப்பாக குழந்தைகள், முதியோருக்கு.',w_du:'அறிகுறிகள் 4 நாட்களுக்கு மேல் உள்ளன.',w_mn:'மூன்று அல்லது அதற்கு மேற்பட்ட அறிகுறிகள் சேர்ந்துள்ளன.',w_ok:'எச்சரிக்கை அறிகுறிகள் எதுவும் தேர்ந்தெடுக்கப்படவில்லை.',
v_on:'கேட்கிறேன்… பேசுங்கள்.',v_none:'இந்த உலாவியில் குரல் உள்ளீடு இல்லை. அறிகுறிகளைத் தொட்டுத் தேர்ந்தெடுங்கள்.',v_found:'அறிகுறி(கள்) கண்டறியப்பட்டன',
hc_load:'அருகிலுள்ள மருத்துவத்தைத் தேடுகிறது…',hc_deny:'இருப்பிடம் கிடைக்கவில்லை. இருப்பிட அனுமதியை வழங்கி மீண்டும் முயலுங்கள்.',hc_none:'10 கி.மீ.க்குள் எதுவும் இல்லை. 104 அல்லது 108-ஐ அழையுங்கள்.',hc_off:'இணையம் இல்லை. அவசர எண்கள் செயல்படும்: 108-ஐ அழையுங்கள்.',hc_found:'இடங்கள் கிடைத்தன',km:'கி.மீ.',call:'அழை',dir:'வழி',unn:'பெயரில்லா மையம்',hosp:'மருத்துவமனை',clin:'கிளினிக்',you:'நீங்கள் இங்கே',
a_home:'முகப்பு',tl:'English',bigl:'பெரிய எழுத்து'};
const EN={red_l:'URGENT',red_t:'Get emergency help now.',red_p:'These symptoms can be life-threatening. Call 108 or go to the nearest hospital immediately. Do not wait.',red_a:'Call 108',
gold_l:'SEE A DOCTOR',gold_t:'Please visit a health centre today.',gold_p:'A health worker should examine you. Keep drinking fluids on the way.',gold_a:'Find care near me',
green_l:'MONITOR AT HOME',green_t:'Rest and keep watching your symptoms.',green_p:'Rest and drink plenty of fluids (ORS if you have loose motions or vomiting). If you get worse or it lasts beyond 3 days, see a doctor.',green_a:'Find care near me',
w_rd:'Warning sign: ',w_fy:'Fever in a child or older adult can become serious quickly.',w_fl:'Fever lasting more than 3 days.',w_dh:'Vomiting or loose motions can cause dehydration, especially in children and older adults.',w_du:'Symptoms have lasted 4 days or more.',w_mn:'Three or more symptoms together.',w_ok:'No warning signs were selected.',
v_on:'Listening… please speak.',v_none:'Voice input is not available in this browser. Tap to choose symptoms instead.',v_found:'symptom(s) found',
hc_load:'Finding care near you…',hc_deny:'Location not available. Allow location access and try again.',hc_none:'Nothing found within 10 km. Call 104 or 108.',hc_off:'No internet. Emergency numbers still work: call 108.',hc_found:'places found',km:'km',call:'Call',dir:'Directions',unn:'Unnamed facility',hosp:'Hospital',clin:'Clinic',you:'You are here',
a_home:'Home',tl:'தமிழ்',bigl:'Larger text'};
[...COMMON,...DANGER].forEach(s=>{TA['s_'+s[0]]=s[3];EN['s_'+s[0]]=s[2]});
Object.assign(TA,{n_lang:'மொழி',lg_h:'உங்கள் மொழியில் மருத்துவ வழிகாட்டல்',lg_p:'உங்களுக்கு வசதியான மொழியைத் தேர்ந்தெடுங்கள். குரல் வசதிகள் கேட்கவும் பேசவும் உதவும்.',lg_c:'மொழியைத் தேர்ந்தெடுங்கள்',lg_vh:'வழிகாட்டலைக் கேளுங்கள்',lg_s:'உடல்நிலை மிக மோசமாக இருந்தால் தாமதிக்காதீர்கள். 108-ஐ அழையுங்கள் அல்லது அருகிலுள்ள மருத்துவமனைக்குச் செல்லுங்கள்.',stop:'நிறுத்து',lg_ih:'பேசிச் சோதித்துப் பாருங்கள்',lg_ip:'மைக் பொத்தானை அழுத்தி ஓர் அறிகுறியைச் சொல்லுங்கள். நீங்கள் சொன்னது கீழே தோன்றும்.',lg_in:'குரல் வசதிகள் உங்கள் உலாவி மற்றும் கைபேசியைப் பொறுத்தவை. Chrome சிறப்பாகச் செயல்படும்.',lg_go:'அறிகுறி சோதனைக்குச் செல்'});
const t=k=>(lang==='ta'?TA[k]:EN[k])||EN[k]||k;
function applyLang(){
 $$('[data-t]').forEach(e=>{if(e.dataset.en===undefined)e.dataset.en=e.innerHTML;e.innerHTML=lang==='ta'&&TA[e.dataset.t]?TA[e.dataset.t]:e.dataset.en});
 document.documentElement.lang=lang==='ta'?'ta':'en';
 const b=$('#lg');if(b)b.textContent=t('tl');
 $$('[data-setlang]').forEach(x=>x.classList.toggle('on',x.dataset.setlang===lang));
 if(window.renderResult)renderResult();if(window.renderList)renderList();
}
function setLang(l){lang=l;localStorage.setItem('cc-lang',l);applyLang()}
/* ---------- Header, footer, SOS button ---------- */
function chrome(){
 const p=document.body.dataset.page,N=[['home','index.html','n_home','Home'],['symptoms','symptoms.html','n_sym','Symptoms'],['care','healthcare.html','n_care','Find care'],['lang','language.html','n_lang','Language'],['about','about.html','n_about','About'],['sos','emergency.html','n_sos','Emergency']];
 $('#hdr').innerHTML=`<div class="bar"><a class="brand" href="index.html">${LOGO}<span>Care <i>Compass</i></span></a><nav aria-label="Main">${N.map(n=>`<a href="${n[1]}" class="${p===n[0]?'on ':''}${n[0]==='sos'?'sosl':''}" data-t="${n[2]}">${n[3]}</a>`).join('')}</nav><div class="tools"><button id="lg" aria-label="Language"></button><button id="big" aria-label="Larger text">A+</button></div></div><div class="weave"></div>`;
 $('#ftr').innerHTML=`<div class="wrap foot"><div class="foot-brand"><a class="brand" href="index.html">${LOGO}<span>Care <i>Compass</i></span></a><p data-t="f_tag">Healthcare in your language, in your village.</p></div><div class="foot-links"><a href="symptoms.html" data-t="n_sym">Symptoms</a><a href="healthcare.html" data-t="n_care">Find care</a><a href="language.html" data-t="n_lang">Language</a><a href="emergency.html" data-t="n_sos">Emergency</a><a href="about.html" data-t="n_about">About</a></div><p class="foot-note"><span data-t="f_g">Guidance only, not a diagnosis.</span><br><small>© 2026 Care Compass</small></p></div>`;
 if(p!=='sos')document.body.insertAdjacentHTML('beforeend','<a class="sos" href="tel:108">🚨 <span data-t="sos_call">Call 108</span></a>');
 $('#lg').onclick=()=>setLang(lang==='ta'?'en':'ta');
 const big=()=>document.documentElement.classList.toggle('big',localStorage.getItem('cc-big')==='1');
 big();$('#big').onclick=()=>{localStorage.setItem('cc-big',localStorage.getItem('cc-big')==='1'?'0':'1');big()};
}
/* ---------- Voice ---------- */
function speak(x){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(x);u.lang=lang==='ta'?'ta-IN':'en-IN';speechSynthesis.speak(u)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-listen],[data-setlang],[data-stop]');if(!b)return;
 if(b.dataset.listen)speak($(b.dataset.listen).textContent);
 if(b.dataset.setlang)setLang(b.dataset.setlang);
 if('stop' in b.dataset&&'speechSynthesis' in window)speechSynthesis.cancel()});
const KW={fever:['fever','காய்ச்சல்'],cough:['cough','இருமல்'],headache:['headache','தலைவலி','தலை வலி'],bodypain:['body pain','உடல் வலி','உடல்வலி'],vomiting:['vomit','வாந்தி'],diarrhea:['loose motion','diarrhea','diarrhoea','வயிற்றுப்போக்கு','பேதி'],chest:['chest','நெஞ்சு'],breath:['breath','மூச்சு'],unconscious:['unconscious','faint','மயக்கம்'],seizure:['seizure','fits','வலிப்பு'],bleeding:['bleeding','இரத்தப்போக்கு','ரத்தம்'],snake:['snake','பாம்பு'],preg:['pregnan','கர்ப்ப']};
function listenSymptoms(){const R=window.SpeechRecognition||window.webkitSpeechRecognition,h=$('#heard');if(!R){h.textContent=t('v_none');return}
 const r=new R();r.lang=lang==='ta'?'ta-IN':'en-IN';h.textContent=t('v_on');
 r.onresult=e=>{const x=e.results[0][0].transcript.toLowerCase();let n=0;for(const k in KW)if(KW[k].some(w=>x.includes(w))){const i=$(`.chip input[value=${k}]`);if(i){i.checked=true;n++}}h.textContent=`“${x}” · ${n} ${t('v_found')}`};
 r.onerror=()=>h.textContent=t('v_none');r.start()}
/* ---------- Symptom checker (server first, built-in fallback) ---------- */
const RED=DANGER.map(s=>s[0]);let last=null;
function initChecker(){
 const chip=s=>`<label class="chip"><input type="checkbox" value="${s[0]}"><span>${s[1]} <b style="font-weight:500" data-t="s_${s[0]}">${s[2]}</b></span></label>`;
 $('#common').innerHTML=COMMON.map(chip).join('');$('#danger').innerHTML=DANGER.map(chip).join('');
 $('#go').onclick=check;
 $('#rs').onclick=()=>last&&speak([t(last.lv+'_t'),t(last.lv+'_p'),...last.why.map(x=>x.k?t(x.k)+t('s_'+x.x):t(x))].join('. '));
}
async function check(){
 const s=$$('.chip input:checked').map(i=>i.value),d=$('#dur').value,a=$('#age').value;
 if(!s.length||!d||!a){$('#err').hidden=false;return}$('#err').hidden=true;
 try{
  const r=await fetch('/api/check',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({symptoms:s,duration:d,age:a})});
  if(!r.ok)throw 0;
  const j=await r.json();
  if(!j||!['red','gold','green'].includes(j.lv)||!Array.isArray(j.why))throw 0;
  last=j;
 }catch(e){last=checkLocal(s,d,a)}
 renderResult();$('#res').scrollIntoView({behavior:'smooth',block:'center'});
}
function checkLocal(s,d,a){
 const has=x=>s.includes(x),young=a!=='adult',why=[];let lv='red';
 const red=s.filter(x=>RED.includes(x));
 if(red.length)why.push(...red.map(x=>({k:'w_rd',x})));
 else{
  if(has('fever')&&young)why.push('w_fy');
  if(has('fever')&&d!=='1')why.push('w_fl');
  if((has('vomiting')||has('diarrhea'))&&(young||(has('vomiting')&&has('diarrhea'))))why.push('w_dh');
  if(d!=='1'&&!why.includes('w_fl'))why.push('w_du');
  if(s.length>=3)why.push('w_mn');
  lv=why.length?'gold':'green';if(lv==='green')why.push('w_ok');
 }
 return {lv,why};
}
function renderResult(){
 if(!last||!$('#res'))return;const {lv,why}=last,r=$('#res');r.dataset.lv=lv;r.classList.add('show');
 const w=why.map(x=>x.k?t(x.k)+t('s_'+x.x):t(x));
 $('#ri').textContent={red:'🚨',gold:'🏥',green:'🌿'}[lv];$('#rl').textContent=t(lv+'_l');$('#rt').textContent=t(lv+'_t');$('#rp').textContent=t(lv+'_p');
 $('#rw').innerHTML=w.map(x=>`<li>${esc(x)}</li>`).join('');$('#ra').textContent=t(lv+'_a');$('#ra').href=lv==='red'?'tel:108':'healthcare.html';
 $('#rwa').href='https://wa.me/?text='+encodeURIComponent(`${t(lv+'_t')} ${t(lv+'_p')} (Care Compass)`);
}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* ---------- Find care near me (fast: parallel servers + cache + hand-checked list) ---------- */
let map,layer,items=[],flt='all',me=null;
function initCare(){
 if(!window.L)return;map=L.map('map').setView([10.9,78.4],7);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors',maxZoom:19}).addTo(map);layer=L.layerGroup().addTo(map);
 $('#near').onclick=nearMe;
 $$('#flt button').forEach(b=>b.onclick=()=>{flt=b.dataset.f;$$('#flt button').forEach(x=>x.classList.toggle('on',x===b));renderList()});
 $('#list').onclick=e=>{const c=e.target.closest('.fac');if(!c||e.target.closest('a'))return;const f=view()[+c.dataset.i];map.setView([f.lat,f.lng],16);f.m.openPopup()};
}
const km=(a,b,c,d)=>{const r=x=>x*Math.PI/180,h=Math.sin(r(c-a)/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(r(d-b)/2)**2;return 12742*Math.asin(Math.sqrt(h))};
const OVP=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter','https://overpass.private.coffee/api/interpreter'];
function ovpFetch(q){
 const ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),12000);
 return Promise.any(OVP.map(async u=>{
  const r=await fetch(u,{method:'POST',body:'data='+encodeURIComponent(q),signal:ctl.signal});
  if(!r.ok)throw 0;const j=await r.json();clearTimeout(tm);ctl.abort();return j;
 }));
}
const parseOsm=j=>j.elements.map(e=>({name:e.tags.name,kind:e.tags.amenity,lat:e.lat??e.center?.lat,lng:e.lon??e.center?.lon,
 gov:['government','public'].includes(e.tags['operator:type']),pri:e.tags['operator:type']==='private',
 phone:(e.tags.phone||e.tags['contact:phone']||'').split(';')[0]})).filter(e=>e.lat&&e.lng);
function nearMe(){const st=$('#st');st.textContent=t('hc_load');
 if(!navigator.geolocation){st.textContent=t('hc_deny');return}
 navigator.geolocation.getCurrentPosition(async p=>{
  me=[p.coords.latitude,p.coords.longitude];
  if(map)map.setView(me,13);renderList();
  const key='cc-osm-'+me[0].toFixed(2)+','+me[1].toFixed(2);
  let osm=[],own=[];
  try{osm=JSON.parse(localStorage.getItem(key)||'[]')}catch(x){}
  if(!Array.isArray(osm))osm=[];
  const ownP=(async()=>{let o=[];
   try{const r=await fetch(`/api/facilities?lat=${me[0]}&lng=${me[1]}`);if(!r.ok)throw 0;o=await r.json()}
   catch(x){try{o=await (await fetch('data/facilities.json')).json()}catch(y){}}
   if(!Array.isArray(o))o=[];
   o.forEach(f=>{f.kind=f.kind||'hospital';f.ok=true;f.gov=f.type==='government';f.pri=f.type==='private'});
   return o})();
  const refresh=final=>{
   items=[...own,...osm];items.forEach(e=>e.d=km(me[0],me[1],e.lat,e.lng));
   items=items.filter(e=>e.d<=(e.ok?25:10));items.sort((a,b)=>a.d-b.d);
   st.textContent=items.length?`${items.length} ${t('hc_found')}${final?'':' …'}`:(final?t('hc_none'):t('hc_load'));
   renderList(true);
  };
  if(osm.length)refresh(false);
  ownP.then(o=>{own=o;refresh(false)});
  const q=`[out:json][timeout:12];(nwr["amenity"="hospital"](around:10000,${me[0]},${me[1]});nwr["amenity"="clinic"](around:10000,${me[0]},${me[1]}););out center tags 60;`;
  try{
   osm=parseOsm(await ovpFetch(q));
   try{localStorage.setItem(key,JSON.stringify(osm))}catch(x){}
   own=await ownP;refresh(true);
  }catch(err){
   own=await ownP;refresh(true);
   if(!items.length)st.textContent=t('hc_off');
  }
 },()=>st.textContent=t('hc_deny'),{enableHighAccuracy:false,maximumAge:600000,timeout:10000});
}
const view=()=>items.filter(e=>flt==='all'||(flt==='gov'&&e.gov)||(flt==='pri'&&e.pri)).slice(0,30);
function renderList(fit){
 if(!map||!me)return;layer.clearLayers();
 L.circleMarker(me,{radius:8,color:'#0c7a5d',fillOpacity:.9}).addTo(layer).bindPopup(esc(t('you')));
 const v=view(),pts=[me];
 $('#list').innerHTML=v.map((f,i)=>{const n=esc(f.name||t('unn'));
  f.m=L.marker([f.lat,f.lng]).addTo(layer).bindPopup(`<b>${n}</b>`);pts.push([f.lat,f.lng]);
  return `<div class="fac" data-i="${i}"><h3>${f.ok?'✔ ':''}${n}</h3><p class="meta">${t(f.kind==='hospital'?'hosp':'clin')} · ${f.d.toFixed(1)} ${t('km')}</p><div class="acts">${f.phone?`<a href="tel:${esc(String(f.phone).replace(/[^\d+]/g,''))}">${t('call')}</a>`:''}<a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}">${t('dir')}</a></div></div>`}).join('');
 if(fit&&pts.length>1)map.fitBounds(pts,{padding:[30,30],maxZoom:15});
}
/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded',()=>{
 chrome();if($('#common'))initChecker();if($('#map'))initCare();$$('[data-mic]').forEach(b=>b.onclick=listenSymptoms);applyLang();
 if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('sw.js').catch(()=>{});
});