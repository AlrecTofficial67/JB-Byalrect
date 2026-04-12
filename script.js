(function(){
  window._safe=function(s){if(typeof s!=='string')return '';return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');};
  if(window.top!==window.self){try{window.top.location=window.self.location;}catch(e){document.body.innerHTML='';}}
  document.addEventListener('contextmenu',function(e){e.preventDefault();});
  document.addEventListener('keydown',function(e){if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='J'))||(e.ctrlKey&&e.key==='U')){e.preventDefault();}});
})();

var cart=[];
var selectedPayment='dana';
var musicPlaying=false;
var calcItems=[];
var logoTextColor='#ffffff';
var logoStoreIcon='none';
var logoStoreIconPos='left';
var logoBgImage=null;

var particlesContainer=document.getElementById('particles');
if(particlesContainer){
  var cols=['#3b82f6','#06b6d4','#f59e0b','#10b981','#8b5cf6'];
  for(var i=0;i<22;i++){
    var p=document.createElement('div');
    p.className='particle';
    var sz=Math.random()*2.5+1;
    p.style.cssText='left:'+Math.random()*100+'%;width:'+sz+'px;height:'+sz+'px;animation-duration:'+(Math.random()*18+12)+'s;animation-delay:'+(Math.random()*12)+'s;background:'+cols[Math.floor(Math.random()*cols.length)]+';';
    particlesContainer.appendChild(p);
  }
}

document.querySelectorAll('.product-card').forEach(function(c,i){c.style.animationDelay=(i*0.025)+'s';});
document.querySelectorAll('.product-card').forEach(function(card){card.addEventListener('click',function(){addToCart(card);});});

document.getElementById('logoFontShadow').addEventListener('change',function(){
  document.getElementById('fontShadowOptions').style.display=this.checked?'block':'none';
  drawLogo();
});
document.getElementById('logoInnerShadow').addEventListener('change',function(){
  document.getElementById('innerShadowOptions').style.display=this.checked?'block':'none';
  drawLogo();
});
document.getElementById('logoVignette').addEventListener('change',function(){
  document.getElementById('vignetteOptions').style.display=this.checked?'block':'none';
  drawLogo();
});
document.getElementById('showWaIcon').addEventListener('change',function(){
  document.getElementById('waOptions').style.display=this.checked?'block':'none';
  drawLogo();
});
document.getElementById('showIgIcon').addEventListener('change',function(){
  document.getElementById('igOptions').style.display=this.checked?'block':'none';
  drawLogo();
});
document.getElementById('showTtIcon').addEventListener('change',function(){
  document.getElementById('ttOptions').style.display=this.checked?'block':'none';
  drawLogo();
});
document.getElementById('logoBg').addEventListener('change',function(){
  document.getElementById('customBgWrap').style.display=this.value==='custom-bg'?'block':'none';
  document.getElementById('galleryBgWrap').style.display=this.value==='gallery'?'block':'none';
  drawLogo();
});

function toggleMusic(){
  var audio=document.getElementById('bgMusic');
  var btnD=document.getElementById('musicBtnDesktop');
  var btnM=document.getElementById('musicBtnMobile');
  if(musicPlaying){
    audio.pause();
    if(btnD){btnD.classList.remove('playing');btnD.innerHTML='<i class="fi fi-rr-music" style="line-height:1"></i>';}
    if(btnM){btnM.classList.remove('playing');btnM.innerHTML='<i class="fi fi-rr-music" style="line-height:1"></i>';}
    musicPlaying=false;
    showToast('🔇 Musik dimatikan','info');
  } else {
    audio.volume=1.0;
    audio.play().then(function(){
      if(btnD){btnD.classList.add('playing');btnD.innerHTML='<i class="fi fi-rr-music-note" style="line-height:1"></i>';}
      if(btnM){btnM.classList.add('playing');btnM.innerHTML='<i class="fi fi-rr-music-note" style="line-height:1"></i>';}
      musicPlaying=true;
      showToast('🎵 Musik diputar','success');
    }).catch(function(){showToast('⚠️ Tekan lagi untuk putar musik','warn');});
  }
}

function switchTab(id,title){
  document.querySelectorAll('.tab-page').forEach(function(p){p.classList.remove('active');});
  document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active');});
  document.querySelectorAll('.bottombar-item').forEach(function(n){n.classList.remove('active');});
  var el=document.getElementById('tab-'+id);
  if(el)el.classList.add('active');
  var ti=document.getElementById('topbarTitle');
  if(ti)ti.textContent=(id==='home'?'🏠':id==='ml'?'🎮':id==='calc'?'🧮':'🎨')+' '+(title||id);
  var sideNav=document.getElementById('navitem-'+id);
  if(sideNav)sideNav.classList.add('active');
  var botNav=document.getElementById('bnavitem-'+id);
  if(botNav)botNav.classList.add('active');
  if(id==='logo')setTimeout(drawLogo,100);
  window.scrollTo(0,0);
}

function handleSearch(q){
  q=q.toLowerCase().trim();
  var cards=document.querySelectorAll('.product-card');
  cards.forEach(function(card){
    var name=(card.dataset.name||'').toLowerCase();
    card.style.display=(!q||name.indexOf(q)>-1)?'':'none';
  });
  if(q){
    var found=false;
    document.querySelectorAll('.tab-page').forEach(function(p){p.classList.remove('active');});
    document.getElementById('tab-home').classList.add('active');
    cards.forEach(function(c){if(c.style.display!=='none')found=true;});
    if(!found&&q){
      var allPages=['home','ml'];
      allPages.forEach(function(pg){
        var tp=document.getElementById('tab-'+pg);
        if(tp){
          tp.querySelectorAll('.product-card').forEach(function(c){
            c.style.display=(c.dataset.name||'').toLowerCase().indexOf(q)>-1?'':'none';
          });
          tp.classList.add('active');
        }
      });
    }
  } else {
    cards.forEach(function(c){c.style.display='';});
  }
}

function switchMlTab(sub){
  document.querySelectorAll('.ml-subpage').forEach(function(p){p.classList.remove('active');});
  document.querySelectorAll('.ml-subtab').forEach(function(t){t.classList.remove('active');});
  var el=document.getElementById('mlsub-'+sub);if(el)el.classList.add('active');
  var tabs=document.querySelectorAll('.ml-subtab');
  if(sub==='diamond'&&tabs[0])tabs[0].classList.add('active');
  else if(tabs[1])tabs[1].classList.add('active');
}

function addToCart(card){
  var id=_safe(card.dataset.id),name=_safe(card.dataset.name),price=parseInt(card.dataset.price)||0,icon=card.dataset.icon,isDrip=card.dataset.drip==='1';
  var existing=null;
  for(var i=0;i<cart.length;i++){if(cart[i].id===id){existing=cart[i];break;}}
  if(existing){existing.qty++;showToast('✅ '+name+' +1','success');}
  else{cart.push({id:id,name:name,price:price,icon:icon,qty:1,isDrip:isDrip});card.classList.add('in-cart');var addEl=card.querySelector('.product-add');if(addEl)addEl.textContent='✓';showToast('🛒 Ditambah ke keranjang!','success');}
  renderCart();updateBadge();
}

function toggleCart(){
  document.getElementById('cartOverlay').classList.toggle('open');
  document.getElementById('cartDrawer').classList.toggle('open');
}

function renderCart(){
  var container=document.getElementById('cartItems');
  var totalEl=document.getElementById('cartTotal');
  var btn=document.getElementById('checkoutBtn');
  if(!container)return;
  if(cart.length===0){
    container.innerHTML='<div class="cart-empty"><span class="cart-empty-icon">🛒</span><p style="font-weight:700;font-size:15px;margin-bottom:6px;color:#f0f4ff">Keranjang kosong</p><p style="font-size:12px;color:#4a5568">Pilih produk dulu bro!</p></div>';
    if(totalEl)totalEl.textContent='Rp 0';
    if(btn)btn.disabled=true;
    return;
  }
  var html='',total=0;
  for(var i=0;i<cart.length;i++){
    var item=cart[i];total+=item.price*item.qty;
    var dripTag=item.isDrip?'<span style="font-size:9px;background:rgba(245,158,11,0.15);color:#fbbf24;padding:2px 5px;border-radius:4px;font-weight:700;margin-left:3px">DRIP</span>':'';
    var dripBtn=item.isDrip?'<a href="https://wa.me/6285137574558?text='+encodeURIComponent('Halo Admin Drip, mau order kunci!\n\n• '+item.name+' x'+item.qty+' = Rp '+item.price*item.qty+'\n\nMohon konfirmasi!')+'" target="_blank" rel="noopener" class="drip-order-btn">📞 Order Admin Drip</a>':'';
    html+='<div class="cart-item'+(item.isDrip?' drip-item':'')+'">';
    html+='<span class="cart-item-icon">'+item.icon+'</span>';
    html+='<div class="cart-item-body"><div class="cart-item-name">'+item.name+dripTag+'</div><div class="cart-item-price">'+formatRp(item.price)+'</div>'+dripBtn+'</div>';
    html+='<div class="cart-item-right"><button class="delete-btn" onclick="deleteItem(\''+item.id+'\');return false;">✕</button>';
    html+='<div class="cart-item-qty"><button class="qty-btn" onclick="changeQty(\''+item.id+'\',-1);return false;">−</button><span class="qty-num">'+item.qty+'</span><button class="qty-btn" onclick="changeQty(\''+item.id+'\',1);return false;">+</button></div></div></div>';
  }
  container.innerHTML=html;
  if(totalEl)totalEl.textContent=formatRp(total);
  if(btn)btn.disabled=false;
}

function deleteItem(id){
  var idx=-1;for(var i=0;i<cart.length;i++){if(cart[i].id===id){idx=i;break;}}
  if(idx===-1)return false;
  var cardEl=document.querySelector('.product-card[data-id="'+id+'"]');
  if(cardEl){cardEl.classList.remove('in-cart');var addEl=cardEl.querySelector('.product-add');if(addEl)addEl.textContent='+';}
  cart.splice(idx,1);showToast('🗑️ Item dihapus','info');renderCart();updateBadge();return false;
}

function changeQty(id,delta){
  var idx=-1;for(var i=0;i<cart.length;i++){if(cart[i].id===id){idx=i;break;}}
  if(idx===-1)return false;
  cart[idx].qty+=delta;
  if(cart[idx].qty<=0){var cardEl=document.querySelector('.product-card[data-id="'+id+'"]');if(cardEl){cardEl.classList.remove('in-cart');var addEl=cardEl.querySelector('.product-add');if(addEl)addEl.textContent='+';}cart.splice(idx,1);showToast('🗑️ Item dihapus','info');}
  renderCart();updateBadge();return false;
}

function updateBadge(){
  var total=0;
  for(var i=0;i<cart.length;i++)total+=cart[i].qty;
  var badges=['cartBadge','cartBadgeMobile'];
  badges.forEach(function(bid){
    var b=document.getElementById(bid);
    if(b){b.textContent=total;b.style.display=total>0?'flex':'none';}
  });
}

function selectPayment(method){
  selectedPayment=method;
  ['dana','kiopay','hyrizz'].forEach(function(m){var el=document.getElementById('pay-'+m);if(el){if(m===method)el.classList.add('selected');else el.classList.remove('selected');}});
}

function formatRp(n){return 'Rp '+n.toLocaleString('id-ID');}

function checkout(){
  if(cart.length===0)return;
  var payLabels={dana:'Dana',kiopay:'KioPay (QRIS)',hyrizz:'Hyrizz (QRIS)'},payLabel=payLabels[selectedPayment];
  var regular=cart.filter(function(i){return !i.isDrip;}),drip=cart.filter(function(i){return i.isDrip;});
  if(regular.length>0){
    var lines=regular.map(function(i){return '• '+i.name+' x'+i.qty+' = '+formatRp(i.price*i.qty);}).join('\n');
    var tot=regular.reduce(function(s,i){return s+i.price*i.qty;},0);
    window.open('https://wa.me/6282192401340?text='+encodeURIComponent('Halo Bang Alrect, mau order! 🛒\n\n*Pesanan:*\n'+lines+'\n\n*Total: '+formatRp(tot)+'*\n*Pembayaran: '+payLabel+'*\n\nMohon konfirmasi ya bang! 🙏'),'_blank','noopener,noreferrer');
  }
  if(drip.length>0){
    setTimeout(function(){
      var lines=drip.map(function(i){return '• '+i.name+' x'+i.qty+' = '+formatRp(i.price*i.qty);}).join('\n');
      var tot=drip.reduce(function(s,i){return s+i.price*i.qty;},0);
      window.open('https://wa.me/6285137574558?text='+encodeURIComponent('Halo Admin Drip, mau order kunci! 🔥\n\n*Pesanan:*\n'+lines+'\n\n*Total: '+formatRp(tot)+'*\n*Pembayaran: '+payLabel+'*\n\nMohon konfirmasi ya! 🙏'),'_blank','noopener,noreferrer');
    },regular.length>0?700:0);
  }
  showToast('✅ Pesanan dikirim ke WhatsApp!','success');
}

var _toastTimer;
function showToast(msg,type){
  clearTimeout(_toastTimer);
  var t=document.getElementById('toast');
  if(!t)return;
  t.textContent=msg;t.className='toast '+(type||'info')+' show';
  _toastTimer=setTimeout(function(){t.classList.remove('show');},2400);
}

function addCalcItem(){
  var name=document.getElementById('itemName').value.trim();
  var price=parseFloat(document.getElementById('itemPrice').value)||0;
  var qty=parseInt(document.getElementById('itemQty').value)||1;
  if(!name||!price){showToast('⚠️ Isi nama dan harga dulu','warn');return;}
  calcItems.push({name:name,price:price,qty:qty});
  renderCalcItems();
  document.getElementById('itemName').value='';document.getElementById('itemPrice').value='';document.getElementById('itemQty').value='1';
}

function renderCalcItems(){
  var el=document.getElementById('calcItemList');
  if(!el)return;
  if(calcItems.length===0){el.innerHTML='';return;}
  var html='<div style="border:1px solid var(--border);border-radius:var(--radius-xs);overflow:hidden;margin-bottom:4px;">';
  for(var i=0;i<calcItems.length;i++){
    var item=calcItems[i];
    html+='<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-bottom:1px solid var(--border);font-size:13px;">';
    html+='<span>'+_safe(item.name)+' x'+item.qty+'</span>';
    html+='<div style="display:flex;align-items:center;gap:10px;"><span style="font-weight:700;color:#60a5fa">'+formatRp(item.price*item.qty)+'</span>';
    html+='<button onclick="removeCalcItem('+i+')" style="background:rgba(239,68,68,0.15);border:none;border-radius:4px;padding:2px 8px;color:#f87171;cursor:pointer;font-size:11px;font-family:Outfit,sans-serif;">✕</button></div></div>';
  }
  html+='</div>';
  el.innerHTML=html;
}

function removeCalcItem(idx){calcItems.splice(idx,1);renderCalcItems();}

function calcTotal(){
  var subtotal=calcItems.reduce(function(s,i){return s+i.price*i.qty;},0);
  var disc=parseFloat(document.getElementById('calcDisc').value)||0;
  var extra=parseFloat(document.getElementById('calcExtra').value)||0;
  var discAmt=subtotal*(disc/100);
  var total=subtotal-discAmt+extra;
  document.getElementById('resSubtotal').textContent=formatRp(subtotal);
  document.getElementById('resDisc').textContent='-'+formatRp(discAmt)+' ('+disc+'%)';
  document.getElementById('resExtra').textContent=formatRp(extra);
  document.getElementById('resTotal').textContent=formatRp(Math.max(0,total));
  document.getElementById('calcResult').classList.add('show');
}

function calcProfit(){
  var modal=parseFloat(document.getElementById('pModal').value)||0;
  var jual=parseFloat(document.getElementById('pJual').value)||0;
  var qty=parseInt(document.getElementById('pQty').value)||1;
  var cost=parseFloat(document.getElementById('pCost').value)||0;
  var totalModal=(modal*qty)+cost;
  var totalJual=jual*qty;
  var profit=totalJual-totalModal;
  var margin=totalJual>0?((profit/totalJual)*100).toFixed(1):0;
  document.getElementById('pResModal').textContent=formatRp(totalModal);
  document.getElementById('pResJual').textContent=formatRp(totalJual);
  document.getElementById('pResProfit').textContent=(profit>=0?'+':'')+formatRp(profit);
  document.getElementById('pResProfit').style.color=profit>=0?'#34d399':'#f87171';
  document.getElementById('pResMargin').textContent=margin+'%';
  document.getElementById('profitResult').classList.add('show');
}

function selectTextColor(el){
  document.querySelectorAll('#textColors .color-preset').forEach(function(e){e.classList.remove('selected');});
  el.classList.add('selected');
  logoTextColor=el.dataset.color;
  drawLogo();
}

function selectCustomColor(val){
  document.querySelectorAll('#textColors .color-preset').forEach(function(e){e.classList.remove('selected');});
  logoTextColor=val;drawLogo();
}

function selectStoreIcon(el){
  document.querySelectorAll('#storeIconRow .fi-icon-btn').forEach(function(e){e.classList.remove('selected');});
  document.querySelectorAll('#storeIconRow .icon-btn').forEach(function(e){e.classList.remove('selected');});
  el.classList.add('selected');
  logoStoreIcon=el.dataset.icon;
  drawLogo();
}

function selectIconPos(el){
  document.querySelectorAll('.icon-pos-btn').forEach(function(e){e.classList.remove('selected');});
  el.classList.add('selected');
  logoStoreIconPos=el.dataset.pos;
  drawLogo();
}

function selectGalleryBg(el,url){
  document.querySelectorAll('.bg-gallery-item').forEach(function(e){e.classList.remove('selected');});
  el.classList.add('selected');
  if(url){
    var img=new Image();
    img.crossOrigin='anonymous';
    img.onload=function(){logoBgImage=img;drawLogo();};
    img.onerror=function(){logoBgImage=null;drawLogo();};
    img.src=url;
  } else {
    logoBgImage=null;drawLogo();
  }
}

function handleBgUpload(input){
  var file=input.files[0];
  if(!file)return;
  var reader=new FileReader();
  reader.onload=function(e){
    var img=new Image();
    img.onload=function(){logoBgImage=img;drawLogo();};
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
}

function getBgGradient(ctx,bg,W,H){
  var stops={
    'gradient-blue':[['#0d1b4b','#1a56db','#06b6d4']],
    'gradient-gold':[['#3a1a00','#f59e0b','#ef4444']],
    'gradient-purple':[['#1a0640','#7c3aed','#3b82f6']],
    'gradient-green':[['#003a20','#10b981','#06b6d4']],
    'gradient-pink':[['#2d0020','#ec4899','#f43f5e']],
    'gradient-red':[['#2d0000','#ef4444','#f97316']],
    'gradient-cyan':[['#001a2d','#0891b2','#22d3ee']],
    'gradient-dark-blue':[['#000814','#001d3d','#003566']],
    'gradient-sunset':[['#0d0015','#7c3aed','#f59e0b','#ef4444']],
    'gradient-neon':[['#000a1a','#06b6d4','#10b981']],
    'gradient-forest':[['#001a0a','#064e3b','#047857']]
  };
  var s=stops[bg];
  if(s){
    var grd=ctx.createLinearGradient(0,0,W,H);
    var c=s[0];
    c.forEach(function(col,i){grd.addColorStop(i/(c.length-1),col);});
    return grd;
  }
  return null;
}

function getTextColorFill(ctx,color,W,mainFontSize){
  if(color==='gradient-blue'){var g=ctx.createLinearGradient(W/2-mainFontSize*3,0,W/2+mainFontSize*3,0);g.addColorStop(0,'#3b82f6');g.addColorStop(1,'#06b6d4');return g;}
  if(color==='gradient-gold'){var g=ctx.createLinearGradient(W/2-mainFontSize*3,0,W/2+mainFontSize*3,0);g.addColorStop(0,'#f59e0b');g.addColorStop(1,'#ef4444');return g;}
  if(color==='gradient-pink'){var g=ctx.createLinearGradient(W/2-mainFontSize*3,0,W/2+mainFontSize*3,0);g.addColorStop(0,'#a855f7');g.addColorStop(1,'#ec4899');return g;}
  if(color==='gradient-green'){var g=ctx.createLinearGradient(W/2-mainFontSize*3,0,W/2+mainFontSize*3,0);g.addColorStop(0,'#10b981');g.addColorStop(1,'#06b6d4');return g;}
  if(color==='gradient-lime'){var g=ctx.createLinearGradient(W/2-mainFontSize*3,0,W/2+mainFontSize*3,0);g.addColorStop(0,'#f59e0b');g.addColorStop(1,'#84cc16');return g;}
  return color;
}

function drawLogo(){
  var canvas=document.getElementById('logoCanvas');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var W=canvas.width,H=canvas.height;
  ctx.clearRect(0,0,W,H);

  var bg=document.getElementById('logoBg').value;

  if(bg==='gallery'&&logoBgImage){
    ctx.drawImage(logoBgImage,0,0,W,H);
  } else if(bg==='transparent'){
    ctx.fillStyle='rgba(20,28,46,0.3)';ctx.fillRect(0,0,W,H);
  } else if(bg==='dark'){
    var bgGrd=ctx.createLinearGradient(0,0,W,H);bgGrd.addColorStop(0,'#07090f');bgGrd.addColorStop(1,'#0f1520');ctx.fillStyle=bgGrd;ctx.fillRect(0,0,W,H);
  } else if(bg==='black'){
    ctx.fillStyle='#000000';ctx.fillRect(0,0,W,H);
  } else if(bg==='white'){
    ctx.fillStyle='#ffffff';ctx.fillRect(0,0,W,H);
  } else if(bg==='navy'){
    ctx.fillStyle='#001d3d';ctx.fillRect(0,0,W,H);
  } else if(bg==='darkred'){
    ctx.fillStyle='#1a0000';ctx.fillRect(0,0,W,H);
  } else if(bg==='custom-bg'){
    ctx.fillStyle=document.getElementById('customBgColor').value;ctx.fillRect(0,0,W,H);
  } else {
    var grd=getBgGradient(ctx,bg,W,H);
    if(grd){ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);}
    else{ctx.fillStyle='#07090f';ctx.fillRect(0,0,W,H);}
  }

  if(document.getElementById('logoVignette').checked){
    var vi=parseInt(document.getElementById('vignetteIntensity').value)/100;
    var vcol=document.getElementById('vignetteColor').value;
    var vgrd=ctx.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,H*0.85);
    var r=parseInt(vcol.slice(1,3),16),g2=parseInt(vcol.slice(3,5),16),b2=parseInt(vcol.slice(5,7),16);
    vgrd.addColorStop(0,'rgba('+r+','+g2+','+b2+',0)');
    vgrd.addColorStop(1,'rgba('+r+','+g2+','+b2+','+vi+')');
    ctx.fillStyle=vgrd;ctx.fillRect(0,0,W,H);
  }

  var fontName=document.getElementById('logoFont').value;
  var fontSize=parseInt(document.getElementById('logoFontSize').value);
  var subSize=parseInt(document.getElementById('logoSubSize').value);
  var spacing=parseInt(document.getElementById('logoSpacing').value);
  var opacity=parseInt(document.getElementById('logoOpacity').value)/100;
  var effect=document.getElementById('logoEffect').value;
  var rotate=parseInt(document.getElementById('logoRotate').value);
  var posY=parseInt(document.getElementById('logoPosY').value)/100;
  var name=document.getElementById('logoName').value||'Logo';
  var sub=document.getElementById('logoSub').value;
  var extra=document.getElementById('logoExtra').value;
  var mainY=H*posY;

  ctx.save();
  ctx.globalAlpha=opacity;

  if(effect==='3d'){
    ctx.save();
    ctx.translate(W/2,mainY);
    if(rotate)ctx.rotate(rotate*Math.PI/180);
    ctx.font='bold '+fontSize+'px "'+fontName+'"';
    ctx.textAlign='center';
    ctx.letterSpacing=spacing+'px';
    var depth=6;
    for(var d=depth;d>0;d--){ctx.fillStyle='rgba(0,0,0,0.35)';ctx.fillText(name,d,d+fontSize*0.38);}
    ctx.fillStyle=getTextColorFill(ctx,logoTextColor,W,fontSize);
    ctx.fillText(name,0,fontSize*0.38);
    ctx.restore();
  } else if(effect==='neon'){
    ctx.save();
    ctx.translate(W/2,mainY);
    if(rotate)ctx.rotate(rotate*Math.PI/180);
    ctx.font='bold '+fontSize+'px "'+fontName+'"';
    ctx.textAlign='center';
    ctx.letterSpacing=spacing+'px';
    var ncol=logoTextColor&&logoTextColor.indexOf('gradient')===-1?logoTextColor:'#06b6d4';
    [40,25,12,5].forEach(function(bl){ctx.shadowColor=ncol;ctx.shadowBlur=bl;ctx.fillStyle=ncol;ctx.fillText(name,0,fontSize*0.38);});
    ctx.restore();
  } else if(effect==='emboss'){
    ctx.save();
    ctx.translate(W/2,mainY);
    if(rotate)ctx.rotate(rotate*Math.PI/180);
    ctx.font='bold '+fontSize+'px "'+fontName+'"';
    ctx.textAlign='center';
    ctx.letterSpacing=spacing+'px';
    ctx.shadowColor='rgba(255,255,255,0.4)';ctx.shadowBlur=0;ctx.shadowOffsetX=-2;ctx.shadowOffsetY=-2;
    ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillText(name,2,fontSize*0.38+2);
    ctx.shadowColor='rgba(255,255,255,0.6)';ctx.shadowOffsetX=1;ctx.shadowOffsetY=1;
    ctx.fillStyle=getTextColorFill(ctx,logoTextColor,W,fontSize);
    ctx.fillText(name,0,fontSize*0.38);
    ctx.restore();
  } else {
    ctx.save();
    ctx.translate(W/2,mainY);
    if(rotate)ctx.rotate(rotate*Math.PI/180);
    ctx.font='bold '+fontSize+'px "'+fontName+'"';
    ctx.textAlign='center';
    ctx.letterSpacing=spacing+'px';
    if(document.getElementById('logoFontShadow').checked){
      ctx.shadowColor=document.getElementById('shadowColor').value;
      ctx.shadowBlur=parseInt(document.getElementById('shadowBlur').value);
      ctx.shadowOffsetX=parseInt(document.getElementById('shadowOffX').value);
      ctx.shadowOffsetY=parseInt(document.getElementById('shadowOffY').value);
    }
    if(effect==='shadow'){ctx.shadowColor='rgba(0,0,0,0.85)';ctx.shadowBlur=20;ctx.shadowOffsetX=4;ctx.shadowOffsetY=4;}
    else if(effect==='glow'){ctx.shadowColor=logoTextColor&&logoTextColor.indexOf('#')===0?logoTextColor:'#06b6d4';ctx.shadowBlur=32;}
    else if(effect==='outline'){ctx.lineWidth=3;ctx.strokeStyle=logoTextColor==='#ffffff'?'#000':'#fff';}
    ctx.fillStyle=getTextColorFill(ctx,logoTextColor,W,fontSize);
    if(effect==='outline')ctx.strokeText(name,0,fontSize*0.38);
    ctx.fillText(name,0,fontSize*0.38);
    ctx.restore();
  }

  if(document.getElementById('logoInnerShadow').checked){
    ctx.save();
    ctx.translate(W/2,mainY);
    if(rotate)ctx.rotate(rotate*Math.PI/180);
    ctx.font='bold '+fontSize+'px "'+fontName+'"';
    ctx.textAlign='center';
    ctx.letterSpacing=spacing+'px';
    ctx.globalCompositeOperation='source-atop';
    var isColor=document.getElementById('innerShadowColor').value;
    var isOpac=parseInt(document.getElementById('innerShadowOpac').value)/100;
    var isr=parseInt(isColor.slice(1,3),16),isg=parseInt(isColor.slice(3,5),16),isb=parseInt(isColor.slice(5,7),16);
    ctx.shadowColor='rgba('+isr+','+isg+','+isb+','+isOpac+')';
    ctx.shadowBlur=15;ctx.shadowOffsetX=0;ctx.shadowOffsetY=6;
    ctx.fillStyle='rgba('+isr+','+isg+','+isb+',0.001)';
    ctx.fillText(name,0,fontSize*0.38);
    ctx.globalCompositeOperation='source-over';
    ctx.restore();
  }

  if(logoStoreIcon&&logoStoreIcon!=='none'){
    ctx.save();
    ctx.font=fontSize*0.8+'px serif';
    ctx.textAlign='center';
    var textWidth=ctx.measureText(name).width;
    ctx.font=(fontSize*0.75)+'px "'+fontName+'"';
    var iconOffsetX;
    if(logoStoreIconPos==='right'){
      iconOffsetX=textWidth/2+fontSize*0.45;
    } else if(logoStoreIconPos==='above'){
      ctx.font=(fontSize*0.7)+'px serif';
      ctx.textAlign='center';
      ctx.fillStyle=getTextColorFill(ctx,logoTextColor,W,fontSize);
      ctx.fillText(logoStoreIcon,W/2,mainY-fontSize*0.6);
      ctx.restore();
      goto_sub_render();
      return;
    } else {
      iconOffsetX=-(textWidth/2+fontSize*0.45);
    }
    ctx.fillStyle=getTextColorFill(ctx,logoTextColor,W,fontSize);
    ctx.textAlign='center';
    ctx.fillText(logoStoreIcon,W/2+iconOffsetX,mainY+fontSize*0.35);
    ctx.restore();
  }

  goto_sub_render();

  function goto_sub_render(){
    if(sub){
      ctx.save();
      ctx.globalAlpha=opacity*0.88;
      ctx.font='600 '+subSize+'px "'+fontName+'"';
      ctx.textAlign='center';
      ctx.letterSpacing=spacing+'px';
      if(document.getElementById('logoFontShadow').checked){
        ctx.shadowColor=document.getElementById('shadowColor').value;
        ctx.shadowBlur=parseInt(document.getElementById('shadowBlur').value)*0.6;
      }
      ctx.fillStyle=getTextColorFill(ctx,logoTextColor,W,subSize);
      ctx.fillText(sub,W/2,mainY+fontSize*0.55+subSize);
      ctx.restore();
    }
    if(extra){
      ctx.save();
      ctx.globalAlpha=opacity*0.65;
      ctx.font='500 '+(subSize*0.7)+'px "'+fontName+'"';
      ctx.textAlign='center';
      ctx.fillStyle=getTextColorFill(ctx,logoTextColor,W,subSize);
      var extraY=mainY+fontSize*0.55+(sub?subSize+subSize*0.7+10:subSize*0.7+10);
      ctx.fillText(extra,W/2,extraY);
      ctx.restore();
    }

    var iconY=H-30;
    var iconItems=[];
    if(document.getElementById('showWaIcon').checked){
      iconItems.push({icon:'fi fi-br-whatsapp',text:document.getElementById('waNumber').value,color:'#25d366'});
    }
    if(document.getElementById('showIgIcon').checked){
      iconItems.push({icon:'fi fi-br-instagram',text:document.getElementById('igUsername').value,color:'#e1306c'});
    }
    if(document.getElementById('showTtIcon').checked){
      iconItems.push({icon:'fi fi-br-tiktok',text:document.getElementById('ttUsername').value,color:'#ff0050'});
    }
    if(iconItems.length>0){
      var iconFontSize=13;
      var totalW=0;
      iconItems.forEach(function(it){
        ctx.font='600 '+iconFontSize+'px Outfit,sans-serif';
        totalW+=ctx.measureText(it.icon+' '+it.text).width+20;
      });
      var startX=(W-totalW)/2;
      iconItems.forEach(function(it){
        ctx.save();
        ctx.globalAlpha=0.9;
        ctx.font='600 '+iconFontSize+'px Outfit,sans-serif';
        ctx.fillStyle=it.color;
        ctx.textAlign='left';
        ctx.fillText(it.text,startX,iconY);
        var tw=ctx.measureText(it.text).width;
        startX+=tw+24;
        ctx.restore();
      });
    }

    ctx.restore();
  }
}

function downloadLogo(){
  var canvas=document.getElementById('logoCanvas');
  if(!canvas)return;
  var name=(document.getElementById('logoName').value||'logo').replace(/\s+/g,'_');
  var link=document.createElement('a');
  link.download=name+'_logo.png';
  link.href=canvas.toDataURL('image/png');
  link.click();
  showToast('✅ Logo berhasil didownload!','success');
}

renderCart();
setTimeout(drawLogo,500);
