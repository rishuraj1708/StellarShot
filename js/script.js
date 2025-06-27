//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/


document.querySelector('button').addEventListener('click', getImage)
document.querySelector('img').style.display = 'none';
document.querySelector('iframe').style.display = 'none';
document.querySelector('.description').style.display = 'none'; // Hide description initially
let key = 'VJnkO4gGk9L5bGnvBo0kzuaNcedPni6sCfNvyoaJ';

// Set default date input to today
function setDefaultDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    document.getElementById('dateInput').value = dateString;
}

function getTodaysImage(){
    let date = new Date();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Pad with leading zero
    let day = String(date.getDate()).padStart(2, '0'); // Pad with leading zero
    let today = `${date.getFullYear()}-${month}-${day}`; //In JS months are 0 indexed
    const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${today}`;
    
    // Show loading state
    document.querySelector('#name').innerHTML = 'Loading today\'s image...';
    document.querySelector('#desc').style.display = 'block';
    document.querySelector('#descHead').innerHTML = 'Please wait...';
    
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
            console.log(data);
            if(data.code == '404' || data.code == '400'){
                document.querySelector('#name').innerHTML = `No data available for date: ${today}`;
                document.querySelector('#desc').style.display = 'block';
                document.querySelector('#descHead').innerHTML = 'The picture is not there yet, check again later.';
            document.querySelector('img').style.display = 'none';
            document.querySelector('iframe').style.display = 'none';
            }else{
                if(data.media_type === 'image'){
                    document.querySelector('img').style.display = 'block';
                    document.querySelector('img').src = data.hdurl || data.url;
                    document.querySelector('iframe').style.display = 'none';
                }
                else{
                    document.querySelector('iframe').style.display = 'block';
                    document.querySelector('iframe').src = data.url;
                    document.querySelector('img').style.display = 'none';
                }
                document.querySelector('#date').innerHTML = data.date.split("-").reverse().join("-");
                document.querySelector('#name').innerHTML = data.title;
                document.querySelector('#desc').style.display = 'block';
                document.querySelector('#desc').innerHTML = data.explanation;
       }})
      .catch(err => {
          console.log(`error ${err}`)
          document.querySelector('#name').innerHTML = 'Error loading image';
          document.querySelector('#descHead').innerHTML = 'Please try again later';
      });
}
function getImage(){

    let choice = document.querySelector('input').value.toLocaleLowerCase();
    
    // Show loading state
    document.querySelector('#name').innerHTML = 'Loading image...';
    document.querySelector('.description').style.display = 'block';
    document.querySelector('#desc').style.display = 'block';
    document.querySelector('#descHead').innerHTML = 'Please wait...';
    document.querySelector('img').style.display = 'none';
    document.querySelector('iframe').style.display = 'none';
    
    const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${choice}`;
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
          console.log(data);
          if(data.code == '404' || data.code == '400'){
            document.querySelector('#name').innerHTML = `No data available for date: ${choice}`;
            document.querySelector('.description').style.display = 'block';
            document.querySelector('#desc').style.display = 'block';
            document.querySelector('#descHead').innerHTML = 'The data is not available for that date, check again later.';
            document.querySelector('img').style.display = 'none';
            document.querySelector('iframe').style.display = 'none';
        }else{
            document.querySelector('#descHead').innerHTML = 'Description';
            if(data.media_type === 'image'){
                document.querySelector('img').style.display = 'block';
                document.querySelector('img').src = data.hdurl;
                document.querySelector('iframe').style.display = 'none';
            }
            else{
                document.querySelector('iframe').style.display = 'block';
                document.querySelector('iframe').src = data.url;
                document.querySelector('img').style.display = 'none';
            }
            document.querySelector('#date').innerHTML = data.date.split("-").reverse().join("-");
            document.querySelector('#name').innerHTML = data.title;
            document.querySelector('.description').style.display = 'block';
            document.querySelector('#desc').style.display = 'block';
            document.querySelector('#desc').innerHTML = data.explanation;
        } })
        .catch(err => {
          console.log(`error ${err}`)
          document.querySelector('#name').innerHTML = 'Error loading image';
          document.querySelector('.description').style.display = 'block';
          document.querySelector('#descHead').innerHTML = 'Please try again later';
      });
}

// Initialize the page
setDefaultDate();
// Remove the automatic call to getTodaysImage() - let user choose when to load 