type emotions = {
    angry: number;
    calm: number;
    disgust: number;
    fearful: number;
    happy: number;
    neutral: number;
    sad: number;
    surprised: number;
  };

type timestamp = Array<number>

type user ={
    _id: string;
    first_name: string;
    last_name: string;
    gender: string;
    birth_date: Date;
    start_date: Date;
    team: string;
    avatar: string;
  };

type entry = {
    timestamps:Array<timestamp>,
    emotions:Array<emotions>,
    created:Date
};

export function likeliness(entries:Array<entry>, user:user) {

    let gender;
    if(user.gender == "M"){
        gender = 1;
    }else{
        gender = 0;
    }
    let age = calculateAge(user.birth_date);
    let duration = calculateWorkingTime(user.start_date);

    let max = 0;
    let min = 10000000;

    let emotions:Array<emotions> = [];

    let i = entries.length - 10;
    if (i < 0){
        i=0;
    }

    for (; i < entries.length; i++) {  //for each dataenty (10)
        let length = entries[i].timestamps.length;
        let callLength = entries[i].timestamps[length - 1][1];
        if (callLength > max) {
            max = callLength;
        }
        if (callLength < min) {
            min = callLength;
        }

        let avgEmotions = callEmotions(entries[i]);

        emotions.push(avgEmotions);
    }
    
    let emotion = emotions.reduce(
        (acc, emotions) => { 
            return {
                angry: acc.angry + emotions.angry /10,
                calm: acc.calm + emotions.calm /10,
                disgust: acc.disgust + emotions.disgust /10,
                fearful: acc.fearful + emotions.fearful /10,
                happy: acc.happy + emotions.happy /10,
                neutral: acc.neutral + emotions.neutral /10,
                sad: acc.sad + emotions.sad /10,
                surprised: acc.surprised + emotions.surprised /10
              };
        },
        {
            angry: 0,
            calm: 0,
            disgust: 0,
            fearful: 0,
            happy: 0,
            neutral: 0,
            sad: 0,
            surprised: 0
        }
        );

    let x = -1.1588 + 
    0.0132 * age +
    0.0679 * gender +
    0.0001 * duration +
    0.0012 * (max - min) +
    0.0074 * emotion.happy -
    0.0081 * emotion.angry -
    0.0321 * emotion.sad -
    0.0507 * emotion.fearful;
    

    let result = 1/(1 + Math.exp(-x));

    result = Math.round(result*10000)/100;

    return result;
}

function callEmotions(entry: entry) {
    let avgEmotions = entry.emotions.reduce(
        (acc, emotions, index) => {

            let diff = entry.timestamps[index][1] - entry.timestamps[index][0];

            return {
                angry: acc.angry + Math.round(emotions.angry) * diff,
                calm: acc.calm + Math.round(emotions.calm) * diff,
                disgust: acc.disgust + Math.round(emotions.disgust) * diff,
                fearful: acc.fearful + Math.round(emotions.fearful) * diff,
                happy: acc.happy + Math.round(emotions.happy) * diff,
                neutral: acc.neutral + Math.round(emotions.neutral) * diff,
                sad: acc.sad + Math.round(emotions.sad) * diff,
                surprised: acc.surprised + Math.round(emotions.surprised) * diff
            };
        },
        {
            angry: 0,
            calm: 0,
            disgust: 0,
            fearful: 0,
            happy: 0,
            neutral: 0,
            sad: 0,
            surprised: 0
        }
    );
    return avgEmotions;
}

function calculateAge(birthday:Date) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function calculateWorkingTime(start:Date) {
    var ageDifMs = Date.now() - start.getTime();
    return Math.round(ageDifMs/(1000*60*60*24));
}

