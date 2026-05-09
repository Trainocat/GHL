
function sortTable(n,tableId){
const table=document.getElementById(tableId);
let switching=true,dir='asc',switchcount=0;
while(switching){
switching=false;
let rows=table.rows;
for(let i=1;i<rows.length-1;i++){
let shouldSwitch=false;
let x=rows[i].getElementsByTagName('TD')[n];
let y=rows[i+1].getElementsByTagName('TD')[n];
let xv=isNaN(x.innerHTML)?x.innerHTML.toLowerCase():Number(x.innerHTML);
let yv=isNaN(y.innerHTML)?y.innerHTML.toLowerCase():Number(y.innerHTML);
if((dir==='asc'&&xv>yv)||(dir==='desc'&&xv<yv)){shouldSwitch=true;break;}
}
if(shouldSwitch){
rows[i].parentNode.insertBefore(rows[i+1],rows[i]);
switching=true;
switchcount++;
}else{
if(switchcount===0&&dir==='asc'){dir='desc';switching=true;}
}
}
}
