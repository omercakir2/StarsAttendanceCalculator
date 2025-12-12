
setInterval(countAndDisplay, 1000);

function countAndDisplay(){
    
    
    var courseDivs = document.querySelectorAll("div.attendDiv") 
    
    courseDivs.forEach(function(div) {
        var rows = div.querySelectorAll("table tbody tr") 
        var cTotal = 0 
        var cAttended = 0 
        
        rows.forEach(function(row) {
            var cells = row.querySelectorAll("td") 
            if (cells.length > 0) {
                var txt = cells[cells.length - 1].innerText.trim() 
                var parts = txt.split("/") 
                if (parts.length === 2) {
                    var att = parseInt(parts[0].trim()) 
                    var tot = parseInt(parts[1].trim()) 
                    if (!isNaN(att) && !isNaN(tot)) {
                        cAttended += att 
                        cTotal += tot 
                    }
                }
            }
        }) 
        
        var missed = cTotal - cAttended 
        
        if (cTotal > 0) {
            var allInnerDivs = div.querySelectorAll("div");

            var targetDiv = (allInnerDivs.length > 0) ? allInnerDivs[allInnerDivs.length - 1] : div;
            
            
            if(targetDiv && !targetDiv.innerHTML.includes("Total Missed Hours")){
                targetDiv.innerHTML += " <br><b style='color:red'>Total Missed Hours : " + missed + "</b>"
            }
        }
    }) 
}