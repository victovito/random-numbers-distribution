const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.contentType("text/html");

    const { repeats, numbers, sums } = req.query;

    if (!repeats || !numbers || !sums){
        const url = new URL("http://localhost:8080");
        url.searchParams.append("repeats", "1000000");
        url.searchParams.append("numbers", "50");
        url.searchParams.append("sums", "3");
        res.redirect(url);
        return;
    }

    const result = simulate(
        Number.parseInt(repeats),
        Number.parseInt(numbers),
        Number.parseInt(sums)
    );

    res.send(result);
});

function simulate(repeats, numbers, sums){
    const start = Date.now();

    const barsSize = 200;
    const array = new Array(numbers).fill(0);

    for (let i = 0; i < repeats; i++){
        
        let n = 0;
        for (let j = 0; j < sums; j++){
            n += Math.random() * (numbers / sums);
        }
        n = Math.floor(n);
        
        array[n]++;
        
    }

    const maxNumber = Math.max(Math.max(...array));
    const barSize = barsSize / maxNumber;
    let result = "";
    
    for (let i = 0; i < numbers; i++){
        const barAmount = Math.round((array[i]) * barSize);
        
        const n = array[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        result += `${"|".repeat(barAmount)} • [ ${i} : ${n} ]<br/>`;
    }

    result += `<br/>Total repeats: ${repeats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <br/>`;

    result += `Simulated in ${(Date.now() - start) / 1000} seconds`;

    return result;

}

app.listen(8080);
