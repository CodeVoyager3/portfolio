/** One engine for the React page and the self-contained HTML review. */
export function createQuietSnake(root){
 const svg=root.querySelector('[data-snake-board] svg'),board=root.querySelector('[data-snake-board]'),segments=[...root.querySelectorAll('[data-snake-segment]')],bodyGroup=root.querySelector('[data-snake-body]'),head=root.querySelector('[data-snake-head]'),food=root.querySelector('[data-snake-food]'),pause=root.querySelector('[data-snake-pause]'),play=root.querySelector('[data-snake-play]'),controls=root.querySelector('[data-snake-controls]'),status=root.querySelector('[data-snake-status]');
 const cols=Number(svg.dataset.columns),media=matchMedia('(prefers-reduced-motion: reduce)'),route=[];for(let x=0;x<cols;x++)for(let y=0;y<7;y++)route.push([x,x%2?6-y:y]);
 let mode='auto',paused=false,visible=false,dead=false,frame=0,last=0,elapsed=0,index=0,body=[],direction=[1,0],queued=[1,0],target=[10,3],score=0;
 const equal=(a,b)=>a[0]===b[0]&&a[1]===b[1];
 /* A real snake: one tapering body through the cell centres, a head that faces where it is going.
    While playing it starts faint and turns solid as it grows. */
 const centre=p=>[p[0]*11+4,p[1]*11+20];
 const adjacent=(a,b)=>Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])===1;
 function draw(points){const n=points.length;
  bodyGroup.setAttribute('opacity',n?(mode==='game'?(.42+.58*Math.min(1,(n-3)/15)).toFixed(3):'1'):'0');
  segments.forEach((el,i)=>{const a=points[i];if(!a){el.setAttribute('opacity','0');return}const b=points[i+1],[x1,y1]=centre(a),[x2,y2]=b&&adjacent(a,b)?centre(b):[x1,y1];
   el.setAttribute('x1',x1);el.setAttribute('y1',y1);el.setAttribute('x2',x2);el.setAttribute('y2',y2);el.setAttribute('stroke-width',(7.6-4.6*i/Math.max(1,n-1)).toFixed(2));el.setAttribute('opacity','1')});
  if(n){const [hx,hy]=centre(points[0]);let dx=1,dy=0;if(n>1){dx=points[0][0]-points[1][0];dy=points[0][1]-points[1][1];if(Math.abs(dx)>1)dx=-Math.sign(dx);if(Math.abs(dy)>1)dy=-Math.sign(dy)}
   head.setAttribute('transform',`translate(${hx},${hy}) rotate(${Math.atan2(dy,dx)*180/Math.PI})`)}
  food.setAttribute('opacity',mode==='game'?'1':'0');food.setAttribute('cx',String(target[0]*11+4));food.setAttribute('cy',String(target[1]*11+20))}
 function nextFood(){let choices=[];for(let x=0;x<cols;x++)for(let y=0;y<7;y++)if(!body.some(p=>equal(p,[x,y])))choices.push([x,y]);if(!choices.length){finish();return}target=choices[(score*37+51)%choices.length]}
 function finish(){paused=true;status.textContent=`Round over · ${score} collected. Play another round?`;play.textContent='Play again';pause.textContent='Resume animation';}
 function step(){if(mode==='auto'){index=(index+1)%route.length;draw(segments.slice(0,8).map((_,i)=>route[(index-i+route.length)%route.length]));return}direction=queued;const head=[(body[0][0]+direction[0]+cols)%cols,(body[0][1]+direction[1]+7)%7];const ate=equal(head,target);if(body.slice(0,ate?body.length:-1).some(p=>equal(p,head))){finish();return}body.unshift(head);if(ate){score++;if(body.length>segments.length)body.pop();nextFood();status.textContent=`${score} collected · length ${body.length}`}else body.pop();draw(body)}
 function tick(time){if(dead||paused||!visible||document.hidden||media.matches)return;if(last)elapsed+=Math.min(time-last,200);last=time;if(elapsed>=145){elapsed=0;step()}frame=requestAnimationFrame(tick)}
 function sync(){cancelAnimationFrame(frame);last=0;if(media.matches&&mode==='auto'){draw([]);pause.disabled=true;pause.textContent='Motion reduced'}else{pause.disabled=false;if(!paused&&visible&&!document.hidden&&!media.matches)frame=requestAnimationFrame(tick)}}
 function setDirection(name){if(mode!=='game'||paused)return;const d={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[name];if(d&&!(d[0]===-direction[0]&&d[1]===-direction[1]))queued=d;if(media.matches)step()}
 function click(e){if(e.target.closest('[data-snake-play]')){mode='game';paused=false;score=0;direction=[1,0];queued=[1,0];body=[[3,3],[2,3],[1,3]];nextFood();controls.hidden=false;play.textContent='Restart round';pause.textContent='Back to animation';status.textContent='Use arrow keys or the controls. Edges wrap around.';draw(body);board.focus({preventScroll:true});sync()}else if(e.target.closest('[data-snake-pause]')){if(mode==='game'){mode='auto';paused=false;controls.hidden=true;play.textContent='Play a round'}else paused=!paused;pause.textContent=paused?'Resume snake':'Pause snake';sync()}else{const b=e.target.closest('[data-snake-direction]');if(b)setDirection(b.dataset.snakeDirection)}}
 function key(e){const name={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'}[e.key];if(name&&mode==='game'){e.preventDefault();setDirection(name)}if(e.key==='Escape'&&mode==='game'){mode='auto';paused=false;controls.hidden=true;play.textContent='Play a round';pause.textContent='Pause snake';sync()}}
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});observer.observe(board);root.addEventListener('click',click);board.addEventListener('keydown',key);media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
 return{destroy(){dead=true;cancelAnimationFrame(frame);observer.disconnect();root.removeEventListener('click',click);board.removeEventListener('keydown',key);media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync)}};
}
/** A single subtle entrance; navigation and footer remain sharp. */
export function revealQuietPage(scope){
 const media=matchMedia('(prefers-reduced-motion: reduce)');if(media.matches)return()=>{};
 const main=scope.querySelector('main');if(!main)return()=>{};
 const animation=main.animate([{filter:'blur(1.5px)',opacity:.9},{filter:'blur(0px)',opacity:1}],{duration:360,easing:'cubic-bezier(.23,1,.32,1)'});
 const cancel=()=>animation.cancel();media.addEventListener('change',cancel);return()=>{cancel();media.removeEventListener('change',cancel)};
}
