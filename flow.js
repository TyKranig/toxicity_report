const chat = {}

const getToxic = async () => {
    // The minimum prediction confidence
    const threshold = 0.9;
    let index = 0;
    await toxicity.load(threshold).then(async model => {
        for (const player in chat) {
            if (index > 5) break;
            index++;
            let i = 0;
            const text = chat[player].replace("undefined\t", "");
            const sentences = text.split("\t");
            await model.classify(sentences).then(predictions => {
                document.getElementById("toxicity").innerHTML = `${i}`;
                results = predictions[6].results
                const returnable = {
                    "player": player,
                    "count": 0
                }
                results.forEach(r => {
                    returnable["count"] += r.match ? 1 : 0;
                });
                console.log(returnable);
            });
        }
    });
}

function getGame(matchid) {
    return axios.get(`https://api.opendota.com/api/matches/${matchid}`).then(result => {
        const chat = result["data"]["chat"]
        const players = result["data"]["players"]
        const all = [];
        for (const text in chat) {
            const obj = chat[text]
            if (obj["type"] == "chat" && obj["slot"] < 10) {
                obj["account_id"] = players[obj["slot"]]["account_id"];
                all.push(obj);
            }
        }
        return all;
    }).catch(error => {
        console.log(matchid);
        console.log(error);
    });
}

async function getChat(games) {
    const promises = [];
    let i = 0;
    for (game in games) {
        i++;
        match = games[game].trim();
        await new Promise(resolve => {
            setTimeout(resolve, 1000)
        })
        document.getElementById("chat").innerHTML = `${i}/${games.length}`
        promises.push(getGame(match));
        if (i > 3) {
            break;
        }
    }
    Promise.all(promises).then(values => {
        for (match in values) {
            mat = values[match];
            for (const text in mat) {
                te = mat[text];
                chat[te["account_id"]] += `\t${te["key"]}`;
            }
        }
        getToxic();
    });
}

const upload = () => {
    let fileUpload = document.getElementById("fileUpload");
    if (typeof (FileReader) != "undefined") {
        let reader = new FileReader();
        reader.onload = function (e) {
            let games = e.target.result.split("\n");
            getChat(games);
        }
        reader.readAsText(fileUpload.files[0]);
    } else {
        alert("This browser does not support HTML5.");
    }
}