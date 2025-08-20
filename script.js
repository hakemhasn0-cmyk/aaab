const firebaseConfig = {
  apiKey: "AIzaSyD_example", 
  authDomain: "demo-donation-site.firebaseapp.com",
  databaseURL: "https://demo-donation-site.firebaseio.com",
  projectId: "demo-donation-site",
  storageBucket: "demo-donation-site.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:example"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function addDonation() {
  const name = document.getElementById('name').value;
  const amount = parseInt(document.getElementById('amount').value);
  if (!name || !amount) return alert('الرجاء إدخال الاسم والمبلغ');

  const donationRef = database.ref('donations/' + Date.now());
  donationRef.set({ name, amount }).then(() => {
    document.getElementById('thanks').textContent = `شكراً لك ${name} على تبرعك ${amount} ليرة تركية! 🌟`;
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
    displayDonations();
  });
}

function displayDonations() {
  const donorsList = document.getElementById('donorsList');
  donorsList.innerHTML = '';
  let totalAmount = 0;
  const donationsRef = database.ref('donations');
  donationsRef.once('value', snapshot => {
    snapshot.forEach(childSnapshot => {
      const donation = childSnapshot.val();
      totalAmount += donation.amount;
      const div = document.createElement('div');
      div.className = 'donor-card';
      div.textContent = `${donation.name} تبرع بمبلغ ${donation.amount} ليرة تركية`;
      donorsList.appendChild(div);
    });
    document.getElementById('totalAmount').textContent = totalAmount;
  });
}

database.ref('donations').on('value', displayDonations);
displayDonations();