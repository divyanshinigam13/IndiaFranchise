
//d41d8c
const firebaseConfig = {
    apiKey: "AIzaSyDgTDGC3RH7T22_KbGt827Eke_tY5OYu3E",
    authDomain: "registration-8b93e.firebaseapp.com",
    databaseURL: "https://registration-8b93e-default-rtdb.firebaseio.com",
    projectId: "registration-8b93e",
    storageBucket: "registration-8b93e.appspot.com",
    messagingSenderId: "689436964340",
    appId: "1:689436964340:web:9850f12a94d832607235a1",
    measurementId: "G-VCQ4M8SSRS"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  //generate 6 digit code by hashing email
  function generateCode(email) {
    var code = CryptoJS.MD5(email).toString().slice(0, 6);
  
    // Display the code
    document.getElementById("code").innerText = code;
  
    // Show the code container
    document.getElementById("code-container").style.display = "block";
    return code;
  }
  
  function login() {
    const email = document.getElementById("email").value;
    const code = document.getElementById("code").value;
    if (!email || !code) {
      alert("Please enter email and code");
      return;
    }
    fetchUserDetails(email, code);
  }
  
  function storeUserDetails() {
    // Get the user details
  
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
  
    if (!name || !email || !phone || !address) {
      alert("Please fill all the details");
      return;
    }
  
    //check if email already exist
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          alert("Email already exist");
          return;
        } else {
          var code = generateCode(email);
          // Store the user details in the browser
          const obj = {
            name,
            email,
            phone,
            address,
            code,
          };
          db.collection("users")
            .add(obj)
            .then((docRef) => {
              alert("User added successfully");
            })
            .catch((error) => {
              alert("Error adding user");
            });
        }
      });
  }
  
  // Add a function to fetch user details and redirect to the dashboard
  function fetchUserDetails(email, code) {
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            if (doc.data().code === code) {
              // User found, redirect to the dashboard and pass user details as query parameters
              const user = doc.data();
              localStorage.setItem("user", JSON.stringify(user));
              window.location.replace(`dashboard.html?name=${user.name}`);
            } else {
              alert("Invalid Code");
            }
          });
        } else {
          alert("User does not exist");
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }
  
  
  function fetchLoggedInUserDetails() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      document.getElementById("user-name").innerText = user.name;
      document.getElementById("user-email").innerText = user.email;
      document.getElementById("user-mobile").innerText = user.phone;
      document.getElementById("user-address").innerText = user.address;
    } else {
      alert("Please login")
      window.location.replace(`index.html`);
    }
  }
  
  function copyCode() {
    // Get the code
    const code = document.getElementById("code").innerText;
  
    // Copy the code to the clipboard
    navigator.clipboard.writeText(code);
  
    // Show a confirmation
    alert("Code copied to clipboard!");
  }
  
