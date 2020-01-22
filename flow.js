axios.get("https://api.opendota.com/api/matches/5202117012").then(result => {
    console.log(result);
    document.write(JSON.stringify(result["data"]["chat"], null, '    '));
}).catch(error => {
    console.log(error)
})
// The minimum prediction confidence
const threshold = 0.9;

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
toxicity.load(threshold).then(model => {
    const sentences = ['you suck'];
    console.log(sentences);

    model.classify(sentences).then(predictions => {
        // `predictions` is an array of objects, one for each prediction head,
        // that contains the raw probabilities for each input along with the
        // final prediction in `match` (either `true` or `false`).
        // If neither prediction exceeds the threshold, `match` is `null`.

        console.log(JSON.stringify(predictions));
    });
});