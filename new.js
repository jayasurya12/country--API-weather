
let container=document.createElement('div');
container.setAttribute('class','container');
container.setAttribute('id','container');
document.body.appendChild(container);
    //row..
let row =document.createElement('div');
row.setAttribute('class',"row row-cols-1 row-cols-lg-4 row-cols-md-3 g-4");
container.appendChild(row);

async function apicalls(){
    try{
    const api=await fetch("https://restcountries.eu/rest/v2/all");
    apiData=await api.json();  
    apiData.filter(data => {
             //col.. 
             let col =document.createElement('div');
             col.setAttribute('class','col');
             row.appendChild(col);
             //card..
             let card =document.createElement('div');
             card.setAttribute('class','card');
             col.appendChild(card);
             //card Header..
             let cardHeader =document.createElement('div');
             cardHeader.setAttribute('class','card-header text-center bg-dark text-white');
             cardHeader.innerText=data.name;
             card.appendChild(cardHeader);
             //imgTag...
             let imgTag =document.createElement('img');
             imgTag.setAttribute('src',data.flag);
             imgTag.setAttribute('class','card-img-top');
             imgTag.setAttribute('atl','Flags');
             card.appendChild(imgTag);
             //card-body...
             let cardBody =document.createElement('div');
             cardBody.setAttribute('class','card-body text-center');
             card.appendChild(cardBody);
             //sapn...
             let capitals=document.createElement('span');
             capitals.setAttribute('class',"badge  text-dark my-auto");
             capitals.innerText="Capital :";
             cardBody.appendChild(capitals);
             //capitalNames..
             let capitalName=document.createElement('span');
             capitalName.innerText=data.capital;
             capitalName.setAttribute('class',"badge bg-success");
             cardBody.appendChild(capitalName);
             //br..
             let br=document.createElement('br');
             cardBody.appendChild(br);
             //lai
             let regionName=document.createElement('span');
             regionName.innerText="Region :";
             cardBody.appendChild(regionName);
             //Regions...
             let capitalRegion=document.createElement('span');
             capitalRegion.innerText=data.region;
             capitalRegion.setAttribute('class','badge text-dark my-auto');
             cardBody.appendChild(capitalRegion);
             //br1
             //br..
             let br1=document.createElement('br');
             cardBody.appendChild(br1);
             
             //countryCode innerHtml..
             let countreCodeInner=document.createElement('span');
             countreCodeInner.innerText='CountryCode :';
             cardBody.appendChild(countreCodeInner);
             //countryCode..
             let CountryCode1=document.createElement('span');
             CountryCode1.innerText=data.alpha2Code+","+data.alpha3Code;
             CountryCode1.setAttribute('class','badge text-dark my-auto');
             cardBody.appendChild(CountryCode1);
             ///
             let br2=document.createElement('br');
             cardBody.appendChild(br2);
             // console.log(data)
             //Latlng...
             let lat=document.createElement('span');
             lat.innerText='LatLng :';
             cardBody.appendChild(lat);
             let latLng=document.createElement('span');
             latLng.innerText=data.latlng;
             latLng.setAttribute('class','badge text-dark my-auto alpha3Code');
             cardBody.appendChild(latLng);
             let br5=document.createElement('br');
             cardBody.appendChild(br5);
             let currency=document.createElement('span',"currency");
             currency.innerText="Currency Code :";
             cardBody.appendChild(currency);
             let currencys=document.createElement('span');
             currencys.innerText=data.currencies[0].code;
             currencys.setAttribute('class','badge text-dark my-auto alpha3Code');
             cardBody.appendChild(currencys);
             let br4=document.createElement('br');
             cardBody.appendChild(br4);
             
             let currencyName=document.createElement('span',"currencyName");
            currencyName.innerText="Currency Name :";
            cardBody.appendChild(currencyName);
            let currencyNamed=document.createElement('span');
            currencyNamed.innerText=data.currencies[0].name;
            currencyNamed.setAttribute('class','badge text-dark my-auto alpha3Code');
            cardBody.appendChild(currencyNamed);
    
            let currencySymbol=document.createElement('div',"currencySymbol");
            currencySymbol.innerText="Currency Symbol :"+data.currencies[0].symbol;
            cardBody.appendChild(currencySymbol);

    const checkWeather = document.createElement("button");
    checkWeather.setAttribute("class", "btn btn-primary");
    checkWeather.setAttribute('data-bs-toggle','modal');
    checkWeather.setAttribute("data-bs-target",'#exampleModal');
    checkWeather.innerHTML = "Check Weather";
    card.appendChild(checkWeather);

    const countryWeatherName = document.querySelector('.countryWeatherName');
    const countryWeatherTemperature = document.querySelector('.countryWeatherTemperature');
    const weatherDetails = document.querySelector('.weatherDetails');
    const weatherImg = document.querySelector('.weatherImg');
    const spinnerBorder = document.querySelector('.spinner-grow');

    checkWeather.addEventListener("click", function () {
    countryWeatherName.innerHTML=data.name;  
     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.latlng[0]}&lon=${data.latlng[1]}&appid=c1d2b2fb256cb2b6a1fbdfe39412ebb3`)
     .then((data)=>{
      spinnerBorder.style.display ="block";
      
         return data.json(); 
     })
     .then((result)=>{
      
        spinnerBorder.style.display ="none";
         const temp = result.main.temp-273.15;
         countryWeatherTemperature.innerHTML=`${temp.toFixed(2)} °C`;
         const weatherDesc = result.weather[0].description;
         weatherDetails.innerHTML = weatherDesc;
         const weatherIcon = result.weather[0].icon;
         const weatherImgUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
         weatherImg.setAttribute('src', weatherImgUrl);
         
     })
     .catch(()=>{
        console.log("fetch error");
     })
  })
})
      }
catch(err){
    console.log(err);
  }
}
apicalls();
console.log("hello");