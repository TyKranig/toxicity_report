var chat = {}

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
                // console.log(obj)
                // chat[players[obj["slot"]]["account_id"]] += `\t${obj["key"]}`
            }
        }
        // console.log(all)
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
                chat[te["account_id"]] += ` ${te["key"]}`;
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

const getToxic = () => {
    // The minimum prediction confidence
    const threshold = 0.9;
    const proms = [];
    let index = 0;
    for (const i in chat) {
        if (index > 2) {
            return 0;
        }
        if (chat.hasOwnProperty(i)) {
            const text = chat[i].replace("undefined ", "")
            // dictionary get amount of keys
            // Load the model. Users optionally pass in a threshold and an array of
            // labels to include.

            const promise = toxicity.load(threshold).then(model => {
                const sentences = text.split(" ");
                document.getElementById("toxicity").innerHTML = `${index++}/${chat.length}`
                model.classify(sentences).then(predictions => {
                    // `predictions` is an array of objects, one for each prediction head,
                    // that contains the raw probabilities for each input along with the
                    // final prediction in `match` (either `true` or `false`).
                    // If neither prediction exceeds the threshold, `match` is `null`.

                    console.log(JSON.stringify(predictions));
                    return predictions;
                });
            });
            proms.push(promise);
        }
    }
    Promise.all(proms).then(values => {
        console.log(values);
    });
}