
document.addEventListener("DOMContentLoaded",function(){
    const btn_run = document.getElementById("runScriptButton")
    const btn_close = document.getElementById("closeButton")
    const resultDiv = document.getElementById("result") 


    chrome.tabs.query({ active: true, currentWindow:true}, function(tabs){
        const tabId = tabs[0].id

        chrome.scripting.executeScript({
            target: {tabId : tabId},
            func : countAndDisplay
        }, (injectionResults) => {
            // BURASI ÖNEMLİ: Script çalışıp bittikten sonra burası çalışır.
            // injectionResults, scriptten dönen değerleri içeren bir dizidir.
            
            if (injectionResults && injectionResults[0] && injectionResults[0].result) {
                // Fonksiyondan return ettiğimiz değeri alıyoruz
                const scriptSonucu = injectionResults[0].result;
                
                // Pop-up içindeki dive yazdırıyoruz
                resultDiv.innerText = scriptSonucu;
            } else {
                resultDiv.innerText = "Make sure that you are on the right page!";
            }
        })
    })


    btn_close.addEventListener("click",()=>{
        window.close()
    })

})


function countAndDisplay(){
    console.clear() 
    var courseDivs = document.querySelectorAll("div.attendDiv") 
    
    var grandTotalMissed = 0  
    var grandTotalHours = 0 
    var reportText = "" 
    var out ="" 
    courseDivs.forEach(function(div) {
        var header = div.querySelector("h4") 
        var courseName = header ? header.innerText.replace("Attendance Records for", "").trim() : "Ders" 
        
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
        grandTotalMissed += missed 
        grandTotalHours += cTotal 
        
        if (cTotal > 0) {
            var allInnerDivs = div.querySelectorAll("div");

            // 2. Eğer hiç div yoksa, direkt attendDiv'in kendisine, varsa en sonuncusuna ekleyelim
            var targetDiv = (allInnerDivs.length > 0) ? allInnerDivs[allInnerDivs.length - 1] : div;
            console.log("Target div is " + targetDiv);
            
            if(targetDiv){
                targetDiv.innerHTML += " Total Missed Hours : " + missed
            }
            out += courseName + " " + missed + "\n"
        }

        
    }) 
    return out
}
    
