const submitbtn = document.getElementById('submitbtn');
const cityName =document.getElementById('cityName');
const city_name =document.getElementById('city_name');


const temp =document.getElementById('temp');
const temp_status =document.getElementById('temp_status');
const datahide= document.querySelector('.middle_layer');

//target date and time
const day =document.getElementById('day');
const todaydate = document.getElementById('today_date');


const getInfo =async(event)=>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal ===""){
        city_name.innerText = `plz enter the name before the search`;
        datahide.classList.add('data_hide');
    }else{
        try{
            const url =`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=863e9a984b7a935263109cb874246062`
            const response =await fetch(url);
            //console.log(response);
            //now this response in json form so thats why response variable is not able to show the api  data becoz console read the javascript objject so we convert the json data to javascript object
            const data = await response.json();
            //convert javascript object into array
            const arrData = [data];
            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            const tempmood = arrData[0].weather[0].main;
            //condition to check sunny or cloudly

            if(tempmood == "Clear"){temp_status.innerHTML="<i class='fas fa-cloud-sun' style='color:#eccc68'></i>";}   
            else if (tempmood == "Clouds"){temp_status.innerHTML="<i class='fas fa-cloud' style='color:#f1f2f6'></i>";}
            else if (tempmood == "Rain"){temp_status.innerHTML="<i class='fas fa-cloud-rain' style='color:#a4b0be'></i>";}
            else{temp_status.innerHTML="<i class='fas fa-cloud' style='color:#f1f2f6'></i>";}

            datahide.classList.remove('data_hide');

           //get time and date

           const getCurrentDay = () =>{
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
 
            let currentTime =new Date();
            let day =weekday[currentTime.getDay()];
            return day;
        };
            //getCurrentDay();
 
            const getCurrentTime =()=>{
 
                var months=[
                    "jan",
                    "feb",
                    "march",
                    "april",
                    "may",
                    "june",
                    "july",
                    "august",
                    "september",
                    "october",
                    "november",
                    "december",
                ]
                var now= new Date();
                var month= months[now.getMonth() ];
                var date=now.getDate();
                var day = now.getDate();
 
                var hours= now.getHours();
                var mins =now.getMinutes();
                let perios =  "AM";
 
                if(hours >11){
                    perios ="PM";
                    if(hours>12)  hours-=12;
                }
                if(mins <10){
                    mins ="0" + mins;
                }
                return `${month} ${date} | ${hours}:${mins}${perios}`;
            }
            day.innerHTML = getCurrentDay();
            todaydate.innerHTML = getCurrentTime();

        }catch{
            
        }
    }
     
}

submitbtn.addEventListener('click',getInfo);