// Import the functions you need from the SDKs you need
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPm8W273F2YpooBQ7OlAIgiIHJcfQxHwY",
    authDomain: "brealief-database.firebaseapp.com",
    projectId: "brealief-database",
    storageBucket: "brealief-database.appspot.com",
    messagingSenderId: "14621208391",
    appId: "1:14621208391:web:57eded423d790f1586e662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Instance of Firebase Database
const db = getDatabase();

// Variables for input fields on pages
var username, name, age, pwd, confirmPwd, newPwd, mood;

// Mood variables (individual mood values, maximum mood frequency, and array of mood names)
var moodaa, moodab, moodac, moodba, moodbb, moodbc, moodca, moodcb, moodcc, moods, maxmood = 0;
var moodlabs = ["Angry", "Restless", "Excited", "Sad", "Neutral", "Happy", "Hopeless", "Tired", "Content"];

/*Sign Up Functions*/

// Prep data for sign up: username, name, age, password, password confirmation
function dataPrepSignUp() {
    username = document.getElementById('usernameup').value;
    name = document.getElementById('nameText').value;
    age = document.getElementById('ageNumber').value;
    pwd = document.getElementById('passwordup').value;
    confirmPwd = document.getElementById('passwordconfirm').value;
}

// Insert data (create new user) on button click
$('.submit').click(() => {
    //Prepares data
    dataPrepSignUp();

    //Executes function if requirements are met
    if (username == "" || name == "" || age == "" || pwd == "") {  //Checks that all fields are filled
        alert("Please input required data");
    } else if (age < 13) {  //Ensures that user age is at least 13
        alert("You must be at least 13 years old to sign up");
    } else {  //Ensures that password and confirm password fields are the same
        if (pwd === confirmPwd) {
            insertData();
        } else {
            //Alerts user if not
            alert("The confirm password field must match the password field");
        }
    }
});

// Insert data (new user) into database function
function insertData() {
    const dbref = ref(db);

    //Checks that username doesn't already exist before creating new account
    get(child(dbref, 'user/' + username)).then((snapshot) => {
        if (snapshot.exists()) {
            //Displays message if username already exists
            alert("This username already exists");
        } else {
            //If username does not exist, enters data into database
            set(ref(db, 'user/' + username), {
                username: username,
                fullName: name,
                userAge: age,
                password: pwd,
                moodAngry: 0,
                moodRestless: 0,
                moodExcited: 0,
                moodSad: 0,
                moodNeutral: 0,
                moodHappy: 0,
                moodHopeless: 0,
                moodTired: 0,
                moodContent: 0
            })
            .then(() => {
                //Notifies user that their account has been created
                alert('Account created successfully');
            })
            .catch((error) => {
                //Notifies user of errors
                alert('Unsuccessful, error' + error);
            });
        }
    })
    .catch((error) => {
        //Notifies user of errors
        alert("Unsuccessful, error" + error);
    })
}

/*Change Password Functions*/

// Prepare password data: username, old password, new password, new password confirmation
function pwdataPrep() {
    username = document.getElementById('usernameup').value;  //Username input
    pwd = document.getElementById('pwdCurText').value;  //Current password input
    newPwd = document.getElementById('passwordup').value;  //New password input
    confirmPwd = document.getElementById('passwordconfirm').value;  //New password confirmation input
}

// Update information (change password) on click
$('.passchange').click(() => {
    //Prepares data
    pwdataPrep();

    //Executes change if requirements are met
    if (username == "" || pwd == "" ||  newPwd == "" || confirmPwd == "") {
        //Checks that all fields are inputted
        alert("Please input required data");
    } else if (newPwd === confirmPwd) {
        //Validates password and executes password update if password is correct
        validatePassword(updateData, "Username or current password is incorrect");
    } else {
        //Prints error message if password and confirm password fields do not match
        alert("The confirm password field must match the password field");
    }
});

// Update data (password) function
function updateData() {
    update(ref(db, 'user/' + username), {
        //Sets new password
        password: newPwd
    })
    .then(() => {
        //Prints message if update is successful
        alert('Password updated successfully');
    })
    .catch((error) => {
        //Prints error if update is unsuccessful
        alert('Unsuccessful, error' + error);
    });
}

/*Delete Account and Edit Account Functions*/

/* Preparing account accessing data: username, password, age, name
   (function is used for both delete account and update account)*/
function dataPrepEdit() {
    username = document.getElementById('usernameedit').value;
    pwd = document.getElementById('passwordedit').value;
    age = document.getElementById('ageNumberedit').value;
    name=  document.getElementById('nameedit').value;
}

/*Delete Account Functions*/

// Delete Data on click
$('#deleteacc').click(() => {
    //Prepares data
    dataPrepEdit();

    //Checks if password and confirm password fields match before continuing
    if (newPwd === confirmPwd) {
        //Validates password and account deletion if password is correct
        validatePassword(deleteData, "Current password is incorrect");
    } else {
        //Prints error message if password and confirm password fields do not match
        alert("The confirm password field must match the password field");
    }
});

// Delete Data function
function deleteData(){
    remove(ref(db,'user/'+ username))  //Deletes account
    .then(()=>{
        //Notifies user of successful account delection
        alert('Account deleted successfully');
    })
    .catch((error) => {
        //Notifies user of errors
        alert('Unsuccessful, error'+error);
    })
}

/*Edit Account Functions*/

//Enter account on click
$(".select-button").click(()=>{
    //Prepares data
    dataPrepEdit();

    //If username and password are not empty
    if (username.length!=0 && pwd.length!=0){
        //Validates password before displaying user profile
        validatePassword(selectData, "Username or Password Does Not Match");  
        
        //Creates mood graph
        getMood();
    } else {
        //Alerts user if either username or password fields are empty
        alert('Please input both username and password');
    }
});

//Update profile data function
function updateDataEdit() {
    update(ref(db, 'user/' + username), {
        //sets username, name, and age of selected user
        username: username,
        fullName: name,
        userAge: age
    })
    .then(() => {
        //prints message if update is successfull
        alert('Profile updated successfully');
    })
    .catch((error) => {
        //prints message if update is unsuccessful
        alert('Unsuccessful, error' + error);
    });
}

//Update profile on click
$("#change-button").click(() => {
    //Prepares data
    dataPrepEdit();

    //Updates data if requirements are met
    if (name == "" || age == "") {  //Checks that name and age fields are filled
        alert("Please input required fields");
    } else if (age < 13) {  //Checks that age is at least 13
        alert("You must be at least 13 years old");
    } else {
        updateDataEdit();  //Updates data in database
        getMood();  //Updates graph
    }
});

//Select data function for edit profile
function selectData(){
    const dbref = ref(db);

    //Gets elements in edit profile layer
    const name = document.getElementById('nameedit');
    const age = document.getElementById('ageNumberedit');
    const newusername = document.getElementById('newusername');
    
    //Gets the appropriate user and sets the values of the above selected elements
    get(child(dbref,'user/'+username)).then((snapshot)=>{
        if(snapshot.exists()){
            //Changes text to account info
            name.value = snapshot.val().fullName;
            age.value = snapshot.val().userAge;
            newusername.value = snapshot.val().username;

            //Hides the account input and shows the edit input
            $('.account-layer').hide();
            $('#editprof').show();
        }
        else{
            //Notifies user if data is not found
            alert('No data found');
        }
    })
    .catch((error) => {
        //Notifies user of errors
        alert("Unsuccessful, error" + error);
    })
}

/*Mood Tracker Functions*/

/*Update Mood Functions*/

// Prepare mood form data: mood, username, password
function moodDataPrep() {
    mood = document.getElementById('mood').value;
    username = document.getElementById('usernameText').value;
    pwd = document.getElementById('passwordText').value;
}

// Update mood data on click
$('#submitmood').click(() => {
    //Prepares data
    moodDataPrep();

    //Checks that username and password have been inputted
    if (username == "" || pwd == "") {
        alert("Please input both username and password");
    } else {
        //Validates password before updating mood
        validatePassword(updateMood, "Incorrect password");
    }
});

// Update mood data function
function updateMood() {
    const dbref = ref(db);

    /*Depending on mood inputted, increases corresponding mood frequency by 1
      (this solution is a bit excessive, but it works)*/
    get(child(dbref, 'user/' + username)).then((snapshot) => {
        if (snapshot.exists()) {
            if (mood === "Angry/Frustrated") {  // If angry mood is selected
                update(ref(db, 'user/' + username), {
                    // Increase angry mood frequency by 1
                    moodAngry: snapshot.val().moodAngry + 1
                });
            } else if (mood === "Restless/Nervous") {  // If restless mood is selected
                update(ref(db, 'user/' + username), {
                    // Increase restless mood frequency by 1
                    moodRestless: snapshot.val().moodRestless + 1
                });
            } else if (mood === "Excited/Elated") {  // If excited mood is selected
                update(ref(db, 'user/' + username), {
                    // Increase excited mood frequency by 1
                    moodExcited: snapshot.val().moodExcited + 1
                });
            } else if (mood === "Sad") {  // If sad mood is selected
                update(ref(db, 'user/' + username), {
                    // Increase sad mood frequency by 1
                    moodSad: snapshot.val().moodSad + 1
                });
            } else if (mood === "Neutral/Bored") {  // If neutral mood is selected
                update(ref(db, 'user/' + username), {
                    // Increase neutral mood frequency by 1
                    moodNeutral: snapshot.val().moodNeutral + 1
                });
            } else if (mood === "Happy") {  // If happy mood is selected
                update(ref(db, 'user/' + username), {
                    // Increase happy mood frequency by 1
                    moodHappy: snapshot.val().moodHappy + 1
                });
            } else if (mood === "Hopeless/Depressed") {  // If hopeless mood is selected
                update(ref(db, 'user/' + username), {
                    // Increase hopeless mood frequency by 1
                    moodHopeless: snapshot.val().moodHopeless + 1
                });
            } else if (mood === "Tired") {  // If tired mood is selected
                update(ref(db, 'user/' + username), {
                    // Increase tired mood frequency by 1
                    moodTired: snapshot.val().moodTired + 1
                });
            } else if (mood === "Content/Relaxed") {  // If content mood is selected
                update(ref(db, 'user/' + username), {
                    // Increase content mood frequency by 1
                    moodContent: snapshot.val().moodContent + 1
                });
            } else {
                //Alerts user to select a mood if mood was not selected
                alert("Please select a mood");
            }
        }
    })
    .then(() => {
        // Alerts user of updated mood frequency
        alert(mood + " mood frequency updated");
    })
    .catch((error) => {
        // Prints error if mood update is unsuccessful
        alert('Unsuccessful, error' + error);
    });
}

/*Mood Trend Functions*/

// Prepare mood form data: username, password
function trendDataPrep() {
    username = document.getElementById('usernameText').value;
    pwd = document.getElementById('passwordText').value;
}

// View mood trend graph on click
$('#submittrend').click(() => {
    //Prepares data
    trendDataPrep();

    //Checks that username and password have been inputted
    if (username == "" || pwd == "") {
        alert("Please input both username and password");
    } else {
        //Validates password before creating graph
        validatePassword(getMood, "Incorrect password");
    }
});

// Get mood frequencies from database function
function getMood() {
    const dbref = ref(db);

    //Gets name of user and mood frequencies from database
    get(child(dbref, 'user/' + username)).then((snapshot) => {
        if (snapshot.exists()) {
            //Name of user
            name = snapshot.val().fullName;

            //Mood values
            moodaa = snapshot.val().moodAngry;
            moodab = snapshot.val().moodRestless;
            moodac = snapshot.val().moodExcited;
            moodba = snapshot.val().moodSad;
            moodbb = snapshot.val().moodNeutral;
            moodbc = snapshot.val().moodHappy;
            moodca = snapshot.val().moodHopeless;
            moodcb = snapshot.val().moodTired;
            moodcc = snapshot.val().moodContent;

            //Array of mood values
            moods = [moodaa, moodab, moodac, moodba, moodbb, moodbc, moodca, moodcb, moodcc];

            //Calls graph creation function
            displayMood();
        }
    })
    .catch((error) => {
        // Prints error if mood update is unsuccessful
        alert('Unsuccessful, error' + error);
    })
}

// Create graph function
function displayMood(){
    /*Updates graph title to include name of user*/
    let result = /\w*/.exec(name);  //Finds string sequences in name field
    let firstName = result[0];  //Gets first name
    document.getElementById("graphtitle").textContent = firstName + "'s Moods";  //Updates graph title to "(firstName)'s Moods"

    /*Removes any existing mooditem and moodlabel elements that aren't the default
      so that double graphs do not appear if the user clicks view mood again*/
    for(let i = 1; i < 9; i++){
        $("#mooditem" + (i + 1)).remove();  //Bars
        $("#moodlabel" + (i + 1)).remove();  //Bar labels
        $("#moodhover" + (i + 1)).remove();  //Hover elements
    }

    /*Obtains the highest mood frequency*/
    for(let i = 0; i < moods.length; i++){
        if (moods[i] > maxmood){
            maxmood = moods[i];
        }
    }

    /*General graph formatting*/
    $(".form-mood").css("margin", "100px auto 0");  //Remove bottom form margin
    $(".moodcont").css("display", "block");  //Display graph

    /*Initial graph bar*/
    positionMood("#mooditem", 0);  //Set height of first bar
    moodHover("");  //Displays bar value on hover
    document.getElementById("moodhover").textContent = "Frequency: " + moods[0];  //Sets value of hover element

    /*Default color value*/
    var newcolor = 0;

    /*Iterates for all moods to create bars on graph*/
    for(let i = 1; i < 9; i++){
        /*Bar Element*/
        cloneElement("mooditem", i);  //Clones default element
        newcolor += 30;  //Gets new red rgb value (successive shades of red - from bright red to black)
        $("#mooditem" + (i + 1)).css("background-color", "rgb(" + newcolor + ", 0, 0)");  //Sets color of bar
        positionMood("#mooditem" + (i + 1), i);  //Sets heights of bars

        /*Bar Label Element (Name Below Bar)*/
        cloneElement("moodlabel", i);  //Clones default element
        document.getElementById("moodlabel" + (i + 1)).textContent = moodlabs[i];  //Sets value of label to mood name

        /*Bar Value Display Element*/
        cloneElement("moodhover", i);  //Clones default element
        document.getElementById("moodhover" + (i + 1)).textContent = "Frequency: " + moods[i];  //Sets text content of element to its height
        moodHover(i + 1);  //Element will display on hover
    }
}

// Function for bar heights
function positionMood(moodItemId, i) {
    if (moods[i] == 0) {
        //Height of bar is 10px is frequency is 0
        $(moodItemId).css("height", "10px");
    } else {
        //If mood frequency is above 0, height of bar is a percentage of the graph's total height
        var h = (moods[i] / maxmood) * 300 + "px";
        $(moodItemId).css("height", h);
    }
}

// Function for cloning elements
function cloneElement(toClone, i){
    var item = document.querySelector("#" + toClone);  //Get element to be clones
    var clone = item.cloneNode(true);  //Clone element

    //Set cloned element's id
    var newid = toClone + (i + 1);
    clone.id = newid;

    //Insert clone after default element
    item.after(clone);
}

// Function for hover elements
function moodHover(i) {
    $("#mooditem" + i).hover(() => {
        //Value of bar becomes visible
        $('#moodhover' + i).css('visibility', 'visible');

        //Value follow cursor with an offset
        $(document).mousemove(function (e) {
            $('#moodhover' + i).offset({ top: e.pageY - 25, left: e.pageX + 5 });
        });
    }, () => {
        //Value disappear when user stops hovering over bar
        $('#moodhover' + i).css("visibility", "hidden");
    });
}

/*Validate Password Function*/

/* Accepts the following as arguments:
   (1) function that password needs to be validated for
   (2) error message that will be printed if passwords do not match */
function validatePassword(func, msg) {
    const dbref = ref(db);

    //Gets current password from database
    get(child(dbref, 'user/' + username)).then((snapshot) => {
        if (snapshot.exists()) {
            var pd = snapshot.val().password;  //Current password

            //Checks current password against password entered
            if (pd === pwd) {
                func();  //Executes inputted function if passwords match
            } else {
                alert(msg);  //Prints error message if passwords do not match
            }
        } else {
            //Alerts user if username does not exist
            alert("This user does not exist");
        }
    })
    .catch((error) => {
        //Prints error if password validation is unsuccessful
        alert('Unsuccessful, error' + error);
    })
}