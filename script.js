let container=document.createElement('div');
container.setAttribute('class','container');
container.setAttribute('id','container');
document.body.appendChild(container);
//row..
let row =document.createElement('div');
row.setAttribute('class',"row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4");
container.appendChild(row);

let mainSpinner=document.createElement("div");
mainSpinner.setAttribute("class"," spinner-border text-primary text-center")
mainSpinner.setAttribute("role","status");
let visual=document.createElement("span");
visual.setAttribute("class","visually-hidden");
mainSpinner.append(visual);
container.append(mainSpinner);
async function apicalls(){
  try{
    const api=await fetch("https://restcountries.eu/rest/v2/all");
    apiData=await api.json();
        apiData.filter(data => {
          mainSpinner.style.display="none";
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
          //footer...
         let footer=document.createElement("div");
         footer.setAttribute("class","card-footer text-center");
         card.appendChild(footer);
          //footer button
         let button=document.createElement("button");
         button.setAttribute("type","submit");
         button.setAttribute("class","btn btn-primary clicked ");
         button.setAttribute("data-bs-toggle","modal");
         button.setAttribute("data-bs-target","#exampleModal");
         button.innerText="CheckWeather";
         button.addEventListener("click",()=>{
           let latitude=data.latlng[0];
           let longitude=data.latlng[1];
           let spinnerGrow=document.querySelector(".spinner-grow")
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e0e83b0c17ddaf027f15d443e0c5e69a`)
            .then((data)=>{
              spinnerGrow.style.display="block";
              return data.json();
            })
            .then((data)=>{
              spinnerGrow.style.display="none";
              let country=document.querySelector(".country");
              country.innerHTML="Country :"+data.name;
              let temperature=document.querySelector(".temperature");
              temperature.innerHTML="Temperature"+((data.main.temp)-273).toFixed(2)+" °C";
              console.log(data);
              let weatherIcon=document.querySelector(".weatherIcons");
              weatherIcon.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
              let description=document.querySelector(".description");
              description.innerHTML=data.weather[0].description
            })
         });
         footer.appendChild(button); 

        let modalContainer=document.createElement("div");
        card.append(modalContainer)
        modalContainer.innerHTML=
         ` <div class="modal fade text-center" id="exampleModal" 
         tabindex="-1" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
           <div class="modal-dialog">
             <div class="modal-content">
               <div class="modal-header">
                 <h5 class="modal-title" id="exampleModalLabel">Weather Report</h5>
                 <button type="button" class="btn-close" 
                 data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body bg-info text-dark">
                   <h5><span class="badge text-dark country"></span></h5>
                   <span class="badge text-dark temperature"></span>
                   <br>
                   <img class="weatherIcons"alt="weatherIcon">
                   <br>
                   <span class="badge text-dark description"></span>
                   <div class="spinner-grow text-success" role="status">
                   <span class="visually-hidden">Loading...</span>
                   </div>
               </div>
               <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               </div>
             </div>
           </div>
         </div>`
        })
  }
  catch(err){
    console.log(err);
  }
}
apicalls();
 