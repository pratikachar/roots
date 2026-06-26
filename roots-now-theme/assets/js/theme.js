/* Roots Now — WordPress Theme JS */
(function(){
var $=function(s,c){return(c||document).querySelector(s)};
var $$=function(s,c){return Array.from((c||document).querySelectorAll(s))};
var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Theme */
var root=document.documentElement;
var savedTheme=localStorage.getItem("rn-theme");
if(savedTheme) root.setAttribute("data-theme",savedTheme);
var themeBtn=$("#themeToggle");
if(themeBtn) themeBtn.addEventListener("click",function(){
  var next=root.getAttribute("data-theme")==="dark"?"light":"dark";
  root.setAttribute("data-theme",next);
  localStorage.setItem("rn-theme",next);
});

/* Year */
var yearEl=$("#year");
if(yearEl) yearEl.textContent=new Date().getFullYear();

/* Live city rotator */
var cities=["Brooklyn · NY","Jersey City · NJ","Silver Lake · LA","Mission · SF","East Side · ATX"];
var ci=0;
setInterval(function(){
  ci=(ci+1)%cities.length;
  var el=$("#liveCity");
  if(el){el.style.opacity=0;setTimeout(function(){el.textContent=cities[ci];el.style.opacity=1},200)}
},3500);

/* Header scroll */
var header=$("#siteHeader");
function onScroll(){
  var y=window.scrollY;
  if(header) header.classList.toggle("scrolled",y>30);
  var h=document.documentElement.scrollHeight-window.innerHeight;
  var pct=Math.min(100,(y/h)*100);
  var sp=$("#scrollProgress");
  if(sp) sp.style.width=pct+"%";
  var bt=$("#backTop");
  if(bt)bt.classList.toggle("show",y>600);
  var ring=$("#ringFill");
  if(ring)ring.style.strokeDashoffset=100.5-(pct*100.5)/100;
  updateActiveLink();
}
window.addEventListener("scroll",onScroll,{passive:true});

/* Mobile menu */
var menuBtn=$("#menuToggle");
var mobileNav=$("#mobileNav");
if(menuBtn&&mobileNav){
  menuBtn.addEventListener("click",function(){
    var open=mobileNav.classList.toggle("open");
    menuBtn.classList.toggle("open",open);
    menuBtn.setAttribute("aria-expanded",open);
    mobileNav.setAttribute("aria-hidden",!open);
  });
  $$("#mobileNav a").forEach(function(a){
    a.addEventListener("click",function(){
      mobileNav.classList.remove("open");menuBtn.classList.remove("open");
    });
  });
}

/* Smooth scroll + active section */
var sections=$$("main section[id]");
function updateActiveLink(){
  var current="hero";
  var top=window.scrollY+120;
  for(var i=0;i<sections.length;i++){if(sections[i].offsetTop<=top)current=sections[i].id}
  $$(".primary-nav a[href*='#']").forEach(function(a){
    var href=a.getAttribute("href");
    if(href&&href.startsWith("#"))a.classList.toggle("active",href==="#"+current);
  });
}
updateActiveLink();

/* Back to top */
var backTop=$("#backTop");
if(backTop)backTop.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});

/* Reveal-item */
var revealItems=$$(".reveal-item");
if(revealItems.length&&window.IntersectionObserver){
  var rio=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){entry.target.classList.add("is-visible");rio.unobserve(entry.target)}
    });
  },{threshold:0.11,rootMargin:"0px 0px -44px 0px"});
  revealItems.forEach(function(el){rio.observe(el)});
}else{revealItems.forEach(function(el){el.classList.add("is-visible")})}

/* Reveal on scroll */
var io=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      var delay=parseInt(e.target.dataset.delay||"0",10)||0;
      setTimeout(function(){e.target.classList.add("in")},delay);
      io.unobserve(e.target);
    }
  });
},{threshold:0.12,rootMargin:"0px 0px -60px 0px"});
$$(".reveal").forEach(function(el,i){
  var parent=el.parentElement;
  var sibs=$$(":scope > .reveal",parent);
  var idx=sibs.indexOf(el);
  if(idx>-1&&sibs.length>1)el.dataset.delay=idx*90;
  io.observe(el);
});

/* Testimonials carousel */
(function(){
  var track=document.getElementById("testimonialsTrack");
  var dotsWrap=document.getElementById("tDots");
  var prev=document.getElementById("tPrev");
  var next=document.getElementById("tNext");
  if(!track)return;
  var cards=track.querySelectorAll(".testimonial-card");
  var total=cards.length;
  var current=0;
  var autoTimer;
  cards.forEach(function(_,i){
    var dot=document.createElement("button");
    dot.className="t-dot"+(i===0?" is-active":"");
    dot.setAttribute("aria-label","Testimonial "+(i+1));
    dot.addEventListener("click",function(){stopAuto();goTo(i);startAuto()});
    if(dotsWrap)dotsWrap.appendChild(dot);
  });
  function goTo(idx){
    current=((idx%total)+total)%total;
    if(track)track.style.transform="translateX(-"+(current*100)+"%)";
    if(dotsWrap)$$(".t-dot",dotsWrap).forEach(function(d,i){d.classList.toggle("is-active",i===current)});
  }
  function startAuto(){autoTimer=setInterval(function(){goTo(current+1)},5800)}
  function stopAuto(){clearInterval(autoTimer)}
  if(prev)prev.addEventListener("click",function(){stopAuto();goTo(current-1);startAuto()});
  if(next)next.addEventListener("click",function(){stopAuto();goTo(current+1);startAuto()});
  var touchX=0;
  if(track){track.addEventListener("touchstart",function(e){touchX=e.touches[0].clientX},{passive:true});
  track.addEventListener("touchend",function(e){var diff=touchX-e.changedTouches[0].clientX;if(Math.abs(diff)>50){stopAuto();goTo(diff>0?current+1:current-1);startAuto()}})}
  startAuto();
})();

/* Billing toggle */
var billBtns=$$(".billing-toggle button");
billBtns.forEach(function(b){
  b.addEventListener("click",function(){
    billBtns.forEach(function(x){x.classList.remove("active")});
    b.classList.add("active");
    var mode=b.dataset.bill;
    $$(".price .amt").forEach(function(a){a.textContent="$"+a.dataset[mode]});
    $$(".price .per").forEach(function(p){p.textContent=mode==="weekly"?"/ week":"/ month"});
    var label=mode==="weekly"?"Weekly":"Monthly";
    $$(".price-card .btn").forEach(function(btn){
      btn.textContent=btn.textContent.replace(/Weekly|Monthly/g,label);
    });
    var fb=document.querySelector('.plan-billing-toggle .pbf-btn[data-pb="'+mode+'"]');
    if(fb)fb.click();
    /* Blink save 12% on monthly */
    var save=$(".billing-toggle .save");
    if(save){
      save.classList.remove("blink");
      void save.offsetWidth;
      if(mode==="monthly")save.classList.add("blink");
    }
  });
});

/* Form billing toggle */
(function(){
  var pbfBtns=$$(".plan-billing-toggle .pbf-btn");
  var planSelect=document.getElementById("cf-plan");
  if(!pbfBtns.length||!planSelect)return;
  function updatePlanPrices(mode){
    Array.from(planSelect.options).forEach(function(opt){
      if(opt.value&&opt.dataset[mode]){
        var names={"Nest Basket":"The Nest Basket","Gastronomy Box":"The Gastronomy Box","Atelier Palette":"The Atelier Palette"};
        var label=names[opt.value]||opt.value;
        opt.textContent=label+" — $"+opt.dataset[mode]+"/"+(mode==="weekly"?"week":"month");
      }
    });
  }
  pbfBtns.forEach(function(b){
    b.addEventListener("click",function(){
      pbfBtns.forEach(function(x){x.classList.remove("active")});
      b.classList.add("active");
      updatePlanPrices(b.dataset.pb);
    });
  });
  var defaultMode=((document.querySelector(".billing-toggle .active"))||{}).dataset?document.querySelector(".billing-toggle .active").dataset.bill:"weekly";
  var fb=document.querySelector('.plan-billing-toggle .pbf-btn[data-pb="'+defaultMode+'"]');
  if(fb)fb.click();
})();

/* Count up */
var counters=$$(".count");
var countObs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(!e.isIntersecting)return;
    var el=e.target;
    var to=parseFloat(el.dataset.to||"0");
    var dur=1400;
    var start=performance.now();
    function tick(t){
      var p=Math.min(1,(t-start)/dur);
      var eased=1-Math.pow(1-p,3);
      el.textContent=Math.round(to*eased).toLocaleString();
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  });
},{threshold:0.4});
counters.forEach(function(c){countObs.observe(c)});

/* Hero particles */
if(!reduced){
  var wrap=$("#particles");
  if(wrap){
    var N=22;
    for(var i=0;i<N;i++){
      var p=document.createElement("span");
      p.className="particle";
      var size=2+Math.random()*4;
      p.style.width=p.style.height=size+"px";
      p.style.left=Math.random()*100+"%";
      p.style.bottom="-20px";
      p.style.animationDuration=(14+Math.random()*16)+"s";
      p.style.animationDelay=(-Math.random()*20)+"s";
      p.style.opacity=(0.3+Math.random()*0.5).toFixed(2);
      wrap.appendChild(p);
    }
  }
}

/* Live Harvest Network canvas */
(function(){
  var canvas=document.getElementById("cityCanvas");
  if(!canvas)return;
  var ctx=canvas.getContext("2d");
  var CW=480,CH=340;
  canvas.width=CW;canvas.height=CH;
  var farmDefs=[
    {fx:0.13,fy:0.22,label:"Farm #3 — Harvesting Now"},
    {fx:0.47,fy:0.14,label:"Farm #7 — Harvesting Now"},
    {fx:0.80,fy:0.26,label:"Farm #12 — Harvesting Now"},
    {fx:0.21,fy:0.70,label:"Farm #1 — Harvesting Now"},
    {fx:0.59,fy:0.78,label:"Farm #9 — Harvesting Now"},
    {fx:0.86,fy:0.65,label:"Farm #15 — Harvesting Now"},
  ];
  var farms=farmDefs.map(function(f){
    return{x:f.fx*CW,y:f.fy*CH,label:f.label,rings:[],ringTimer:Math.floor(Math.random()*100),phase:Math.random()*Math.PI*2};
  });
  var pathDefs=[[0,1],[1,2],[3,4],[4,5],[1,4],[0,3]];
  var deliveries=pathDefs.map(function(p){
    return{from:p[0],to:p[1],t:Math.random(),speed:0.0025+Math.random()*0.002};
  });
  var tick=0,activeIdx=1;
  function isLight(){return document.documentElement.getAttribute("data-theme")==="light"}
  function gridFill(){return isLight()?"rgba(0,90,30,0.13)":"rgba(142,198,64,0.11)"}
  function bgFill(){return isLight()?"rgba(228,242,228,0.55)":"rgba(4,10,4,0.93)"}
  function drawGrid(){
    var step=28;
    ctx.fillStyle=gridFill();
    for(var c=0;c*step<CW+step;c++){
      for(var r=0;r*step<CH+step;r++){
        ctx.beginPath();ctx.arc(c*step+14,r*step+14,1.15,0,Math.PI*2);ctx.fill();
      }
    }
  }
  function drawDeliveries(){
    deliveries.forEach(function(d){
      var from=farms[d.from],to=farms[d.to];
      var x=from.x+(to.x-from.x)*d.t;
      var y=from.y+(to.y-from.y)*d.t;
      ctx.save();ctx.setLineDash([4,7]);ctx.beginPath();
      ctx.strokeStyle="rgba(196,154,108,0.10)";ctx.lineWidth=0.9;
      ctx.moveTo(from.x,from.y);ctx.lineTo(to.x,to.y);ctx.stroke();ctx.restore();
      for(var i=1;i<=5;i++){
        var tt=Math.max(0,d.t-i*0.018);
        ctx.beginPath();
        ctx.fillStyle="rgba(196,154,108,"+(0.28-i*0.04)+")";
        ctx.arc(from.x+(to.x-from.x)*tt,from.y+(to.y-from.y)*tt,Math.max(0.5,2.2-i*0.3),0,Math.PI*2);
        ctx.fill();
      }
      ctx.save();ctx.shadowBlur=7;ctx.shadowColor="#C49A6C";
      ctx.beginPath();ctx.fillStyle="#C49A6C";
      ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fill();ctx.restore();
      d.t+=d.speed;
      if(d.t>=1){d.t=0;if(Math.random()>0.45){var tmp=d.from;d.from=d.to;d.to=tmp}}
    });
  }
  function drawFarms(){
    var t=tick*0.04;
    farms.forEach(function(farm,i){
      var active=(i===activeIdx);
      var glow=Math.sin(t+farm.phase)*0.5+0.5;
      var grad=ctx.createRadialGradient(farm.x,farm.y,0,farm.x,farm.y,active?30:18);
      grad.addColorStop(0,"rgba(142,198,64,"+(active?0.24+glow*0.14:0.09)+")");
      grad.addColorStop(1,"rgba(142,198,64,0)");
      ctx.beginPath();ctx.fillStyle=grad;ctx.arc(farm.x,farm.y,active?30:18,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.fillStyle=active?"#8EC640":"rgba(0,148,68,0.82)";
      ctx.arc(farm.x,farm.y,active?7:5,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.fillStyle="rgba(255,255,255,0.88)";
      ctx.arc(farm.x,farm.y,active?2.4:1.7,0,Math.PI*2);ctx.fill();
      farm.ringTimer++;
      if(farm.ringTimer>(active?58:145)){farm.ringTimer=0;farm.rings.push({r:0,alpha:active?0.68:0.28})}
      farm.rings=farm.rings.filter(function(ring){
        ring.r+=active?0.72:0.42;ring.alpha*=0.955;
        if(ring.alpha<0.012)return false;
        ctx.beginPath();ctx.strokeStyle="rgba(142,198,64,"+ring.alpha+")";
        ctx.lineWidth=active?1.4:0.9;ctx.arc(farm.x,farm.y,ring.r,0,Math.PI*2);ctx.stroke();
        return true;
      });
    });
  }
  function draw(){
    ctx.fillStyle=bgFill();ctx.fillRect(0,0,CW,CH);
    drawGrid();drawDeliveries();drawFarms();
    tick++;
    if(tick%180===0){activeIdx=(activeIdx+1)%farms.length;var label=document.getElementById("activeFarmLabel");if(label)label.textContent=farms[activeIdx].label}
    requestAnimationFrame(draw);
  }
  draw();
})();

/* Cursor glow */
if(matchMedia("(hover:hover) and (pointer:fine)").matches){
  var cg=$("#cursorGlow");
  if(cg){
    var tx=0,ty=0,cx=0,cy=0;
    window.addEventListener("mousemove",function(e){tx=e.clientX;ty=e.clientY});
    function loop(){cx+=(tx-cx)*0.12;cy+=(ty-cy)*0.12;cg.style.transform="translate("+cx+"px, "+cy+"px) translate(-50%, -50%)";requestAnimationFrame(loop)}
    loop();
  }
}

/* Magnetic buttons */
if(!reduced){
  $$(".magnetic").forEach(function(btn){
    btn.addEventListener("mousemove",function(e){
      var r=btn.getBoundingClientRect();
      var x=e.clientX-r.left-r.width/2;
      var y=e.clientY-r.top-r.height/2;
      btn.style.transform="translate("+(x*0.18)+"px, "+(y*0.25)+"px)";
    });
    btn.addEventListener("mouseleave",function(){btn.style.transform=""});
  });
}

/* Captcha + form via AJAX */
var cA=0,cB=0;
function newCaptcha(){
  cA=2+Math.floor(Math.random()*8);
  cB=1+Math.floor(Math.random()*7);
  var q=$("#captchaQ");
  if(q)q.textContent=cA+" + "+cB+" = ?";
  var inp=$("#cf-captcha");
  if(inp)inp.value="";
}
newCaptcha();
var captchaRefresh=$("#captchaRefresh");
if(captchaRefresh)captchaRefresh.addEventListener("click",newCaptcha);

function validateField(el){
  var field=el.closest(".field");
  if(!field)return true;
  var valid=el.checkValidity()&&el.value.trim()!=="";
  field.classList.toggle("invalid",!valid);
  return valid;
}
$$("#contactForm input, #contactForm select, #contactForm textarea").forEach(function(el){
  el.addEventListener("blur",function(){validateField(el)});
  el.addEventListener("input",function(){if(el.closest(".invalid"))validateField(el)});
});

var modal=$("#modal");
var modalTitle=$("#modalTitle");
var modalMsg=$("#modalMsg");
var modalIcon=$("#modalIcon");
function openModal(ok,title,msg){
  if(modalIcon)modalIcon.classList.toggle("error",!ok);
  if(modalIcon)modalIcon.textContent=ok?"✓":"!";
  if(modalTitle)modalTitle.textContent=title;
  if(modalMsg)modalMsg.textContent=msg;
  if(modal)modal.classList.add("open");
  if(modal)modal.setAttribute("aria-hidden","false");
}
function closeModal(){if(modal){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}}
var modalClose=$("#modalClose");
if(modalClose)modalClose.addEventListener("click",closeModal);
if(modal)modal.addEventListener("click",function(e){if(e.target===modal)closeModal()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeModal()});

var contactForm=$("#contactForm");
if(contactForm){
  contactForm.addEventListener("submit",function(e){
    e.preventDefault();
    var fields=$$("#contactForm input, #contactForm select, #contactForm textarea");
    var allValid=true;
    fields.forEach(function(el){if(!validateField(el))allValid=false});
    if(!allValid){openModal(false,"Missing details","Please fill in all required fields.");return}
    var data=new FormData(e.target);
    if(parseInt(data.get("captcha"),10)!==cA+cB){
      openModal(false,"Check the math","That captcha answer doesn't add up. Give it another go.");
      newCaptcha();
      var cf=$("#cf-captcha");
      if(cf&&cf.closest(".field"))cf.closest(".field").classList.add("invalid");
      return;
    }
    /* AJAX submit */
    var xhr=new XMLHttpRequest();
    xhr.open("POST",rn_ajax.url);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.onload=function(){
      var resp=JSON.parse(xhr.responseText);
      if(resp.success){
        openModal(true,"You're on the list",resp.data.msg);
        e.target.reset();
        fields.forEach(function(el){var f=el.closest(".field");if(f)f.classList.remove("invalid")});
        newCaptcha();
      }else{
        openModal(false,"Something went wrong",resp.data.msg);
        newCaptcha();
      }
    };
    var params="action=rn_contact&nonce="+encodeURIComponent(rn_ajax.nonce)+
      "&name="+encodeURIComponent(data.get("name"))+
      "&email="+encodeURIComponent(data.get("email"))+
      "&city="+encodeURIComponent(data.get("city"))+
      "&plan="+encodeURIComponent(data.get("plan"))+
      "&message="+encodeURIComponent(data.get("message")||"")+
      "&captcha="+encodeURIComponent(data.get("captcha"));
    xhr.send(params);
  });
}

onScroll();
})();
