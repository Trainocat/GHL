
function sortTable(tableId,col){
const table=document.getElementById(tableId);
const rows=[...table.rows].slice(1);
const asc=!table.dataset.sortDir||table.dataset.sortDir==='desc';
rows.sort((a,b)=>{
const av=a.cells[col].innerText.trim();
const bv=b.cells[col].innerText.trim();
const an=parseFloat(av), bn=parseFloat(bv);
if(!isNaN(an)&&!isNaN(bn)) return asc?an-bn:bn-an;
return asc?av.localeCompare(bv):bv.localeCompare(av);
});
rows.forEach(r=>table.tBodies[0].appendChild(r));
table.dataset.sortDir=asc?'asc':'desc';
}
