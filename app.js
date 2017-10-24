var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

var expasdasd::
equire('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

var conversation = new ConversationV1({
    username: 'bfb29879-fb28-4d20-9c0e-9161bf96f314',
    password: 'up1wrv6NdPo0',
    version_date: ConversationV1.VERSION_DATE_2017_05_26
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 80

var router = express.Router();              // get an instance of the express Router

app.use('/api', router);

router.get('/', function (req, res) {
    var question = req.param('question')
    message = conversation.message({
        input: { text: question },
        workspace_id: '0ba8b54f-29fd-4775-aa77-202efa0d8b8e'
    }, function (err, response) {
        if (err) {
            console.error(err);
        } else {
            console.log(response);
            response = handleResponse(response)
            res.json({ message: response });
        }
    });
});

app.listen(port);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNextPhoneCall(type) {
    var premessage = ""
    if ("outgoing" != type && "incoming" != type) {
        if (getRndInteger(0, 9) % 2 === 0) {
            premessage = 'incoming call from: ';
        }
        else {
            premessage = 'outgoing call to: ';
        }
    }
    return premessage + getRndInteger(555000000, 580999999) + '\n';
}

function getPhoneCalls(numberOfQueries, type) {
    var output = '';
    for (var i = 0; i < numberOfQueries; i++) {
        output += getNextPhoneCall(type);
    }
    return output;
}

function lastCalls(text, params) {
    console.log("lastCalls");
    var type = "";
    var count = 0;
    params.forEach(function (element) {
        switch (element.entity) {
            case 'call_type':
                type = element.value;
                break;
            case 'sys-number':
                count = element.value;
                break;
        }
    });
    if(count == 0) {count = 10 } 
    calls = getPhoneCalls(count, type)
    text = text.replace("^user_calls", calls)
    return text
}


function accountBalance(text, params) {
    return text;
}


function handleResponse(response) {
    console.log("handleResponse");
    var intent = response.intents[0].intent;
    var text = response.output.text[0];
    var params = response.entities;
    var result = text;
    console.log("Intent: " + intent);
    console.log("Text: " + text);
    console.log("Params: " + params);

    switch (intent) {
        case "last_calls":
            result = lastCalls(text, params);
            break;
        case "account_balance":
            console.log("CASE: last_calls")
            result = accountBalance(text, params);
            break;
    }

    console.log(result)
    return result;
}

function sayIt(string) {
    // var text_to_speech = new TextToSpeechV1({
    //     username: 'f40f31a7-37ef-4203-bbcf-a4c190d1464a',
    //     password: '1OTYJy6A1HmN'
    // });

    // var params = {
    //     text: string,
    //     voice: 'en-US_AllisonVoice', // Optional voice
    //     accept: 'audio/wav'
    // };
    // var fs = require('fs');

    // // Pipe the synthesized text to a file
    // text_to_speech.synthesize(params).pipe(fs.createWriteStream('buffer.wav'));
}
