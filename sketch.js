let speeds = [1, 1, 1, 1, 2, 2, 2, 4, 4, 4, 3];
let dur = 10;
let octaves = [60, 72, 48, 36];


//////THree scales -- choose one below within each instrument 
// major scale
let majorscale = [0, 2, 4, 5, 7, 9, 11, 0, 0, 0, 4, 4, 4, 7, 7, 11];
// minor scale
let minorscale = [0, 2, 3, 5, 7, 8, 10, 0, 0, 0, 3, 3, 3, 7, 7, 10];
// whole tone scale
let wholetonescale = [0, 2, 4, 6, 8, 10];

///////////////////////////////////////////////////////

// Global object to hold results from the loadJSON call
let data = {};
let data1 = {};
let data2 = {};

//Arrays to store the JSON data
let friendAdds = [];
let adInteractions = [];
let likesOnStuff = [];

//will server as the master clock
let masterTime;

function preload() {
  data = loadJSON('friends.json');
  data1 = loadJSON('adInteracts.json');
  data2 = loadJSON('posts_and_comments.json')

}

//function for all dataloads.  This function is called once in setup
function loadData() {
  loadFriendAddData();
  loadAdInteractData();
  loadLikeData();
}

function setup() {
  createCanvas(640, 360);
  masterTime = -1;
  loadData();
  //console.log(friendAdds[766]);
  console.log("f 1 0 16384 10 1 0.5 0.2 0.1");


}

function draw() {
  background(255);
  let friendAddData = data['friends'];

  ///PLUCK 
  for (let i = 0; i < friendAdds.length; i++) {

    let pitch = pick(octaves) + pick(majorscale);
    let freq = mtof(pitch);
    let amp = Math.random() * 1000;
    let pan = Math.random();
    let beat = pick(speeds) * masterTime;

    // console.log(friendAdds[i].name);
    //console.log(friendAdds[20].addName);

    let mappedFriendAdds = map(friendAdds[i].timestamp, 1147669396, 1549045695, 1, 5000);
    let roundedMappedFriendAdds = round(mappedFriendAdds);
    // console.log(rounded);
    if (masterTime === roundedMappedFriendAdds) {
      //console.log(friendAdds[i].name + ", ", "timestamp = " + friendAdds[i].timestamp, "masterTime = " + masterTime, "index number " + i);
      console.log("i 1 " + (i * masterTime) / 6750 + " " + dur + " " + freq + " " + amp + " " + pan);
    } else {
      //console.log("no match");

    }
  }
  //BRASS
  //'history' below is from the top layer of the JSON
  let adInteractData = data1['history'];
  for (let j = 0; j < adInteractions.length; j++) {
    let pitch = pick(octaves) + pick(majorscale);
    let freq = mtof(pitch);
    let ifn = .137;
    let beat = pick(speeds) * masterTime;
    let att = .1;
    let brassDur = 2;



    //mapping the minimum and maximum of the timestamp values from the JSON to 1-5000 time units for the score
    let mappedAdInteractions = map(adInteractions[j].timestamp, 1544826946, 1549516406, 1, 5000);
    let roundedMappedAdInteractions = round(mappedAdInteractions);
    // console.log(rounded);
    if (masterTime === roundedMappedAdInteractions) {
      //console.log(adInteractions[j].title + ", ", "timestamp = " + adInteractions[j].timestamp, "masterTime = " + masterTime, "index number " + j);
      console.log("i 2 " + (j * masterTime) / 750 + " " + brassDur + " " + freq + " " + "0.4" + " " + att + " " + ifn);

    } else {
      //console.log("no match");

    }

  }
  //SINE
  let likeData = data2['reactions'];
  for (let h = 0; h < likesOnStuff.length; h++) {
    let pitch = pick(octaves) + pick(majorscale);
    let freq = mtof(pitch);
    let amp = Math.random() * 1000;
    let pan = Math.random();
    let beat = pick(speeds) * masterTime;
    let sineDur = .2;


    //mapping the minimum and maximum of the timestamp values from the JSON to 1-5000 time units for the score
    let mappedLikes = map(likesOnStuff[h].title, 1251139644, 1549652228, 1, 5000);
    let roundedMappedLikes = round(mappedLikes);
    // console.log(rounded);
    //console.log("master time = " + masterTime);
    //console.log("roundedMappedLikes = " + roundedMappedLikes);
    if (masterTime === roundedMappedLikes) {
      //console.log(likesOnStuff[h].timestamp + ", ", "timestamp = " + likesOnStuff[h].title, "masterTime = " + masterTime, "index number " + h);
      console.log("i 3 " + (h * masterTime) / 6750 + " " + sineDur + " " + amp + " " + freq);
    } else {
      //console.log("no match");

    }

  }

  masterTime += 1;
  //console.log("masterTime = " + masterTime);

}

function loadFriendAddData() {
  let friendAddData = data['friends']
  for (let i = 0; i < friendAddData.length; i++) {
    // Get each object in the array
    let friendAdd = friendAddData[i];
    let addTimestamp = friendAdd['timestamp'];
    let addName = friendAdd['name'];
    // Put object in array
    friendAdds.push(new FriendAdd(addName, addTimestamp));
    //console.log("Total friends = " + friendAddData.length);

  }

}

function loadAdInteractData() {
  let adInteractData = data1['history']
  for (let i = 0; i < adInteractData.length; i++) {
    // Get each object in the array
    let adAdd = adInteractData[i];
    let addTitle = adAdd['title'];
    let addAction = adAdd['action'];
    let addTimestamp = adAdd['timestamp'];
    // Put object in array
    adInteractions.push(new AdInteract(addTitle, addAction, addTimestamp));
    //console.log("Total interactions = " + adInteractData.length);

  }

}

function loadLikeData() {
  let likeData = data2['reactions']
  for (let i = 0; i < likeData.length; i++) {
    // Get each object in the array
    let likeAdd = likeData[i];
    let addTimestamp = likeAdd['timestamp'];
    let addReaction = likeAdd.data['reaction'];
    let addTitle = likeAdd['title'];
    // Put object in array
    likesOnStuff.push(new PostsCommentInteract(addTitle, addReaction, addTimestamp));
    //console.log("Total like interactions = " + likeData.length);

  }

}


//////////////////////////////////////////
//object classes
class PostsCommentInteract {
  constructor(timestamp, reaction, title) {
    this.timestamp = timestamp;
    this.data = reaction;
    this.title = title;

  }

}

class AdInteract {
  constructor(title, action, timestamp) {
    this.title = title;
    this.action = action;
    this.timestamp = timestamp;

  }
}

class FriendAdd {
  constructor(name, timestamp) {
    this.name = name;
    this.timestamp = timestamp;

  }
}
//object classes
//////////////////////////////////////////


//Array picker function
function pick(a) {
  return (a[Math.floor(Math.random() * a.length)]);

}

//MIDI to frequency conversion function
function mtof(f) {
  return (440. * Math.exp(.057762265 * (f - 69.)));
}
