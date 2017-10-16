var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var SoundPlayer = require('soundplayer')

var player = new SoundPlayer();

var conversation = new ConversationV1({
    username: 'bfb29879-fb28-4d20-9c0e-9161bf96f314',
    password: 'up1wrv6NdPo0',
    version_date: ConversationV1.VERSION_DATE_2017_05_26
});

message = conversation.message({
    input: { text: 'My last 666 incocming calls' },
    workspace_id: '0ba8b54f-29fd-4775-aa77-202efa0d8b8e'
}, function (err, response) {
    if (err) {
        console.error(err);
    } else {
        console.log(response);
        sayIt(response.output.text[0]);
    }
});

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


