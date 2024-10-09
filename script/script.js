let cities = [
      {
        name: 'Montreal',
        lat: 45.5088,
        lng: -73.5878,
      },
      {
        name: 'Toronto',
        lat: 43.65107,
        lng: -79.347015,
      },
      {
        name: 'Vancouver',
        lat: 49.2827,
        lng: -123.1207,
      },
      {
        name: 'Calgary',
        lat: 51.0447,
        lng: -114.0719,
      },
      {
        name: 'Ottawa',
        lat: 45.4215,
        lng: -75.6972,
      },
      {
        name: 'Edmonton',
        lat: 53.5461,
        lng: -113.4938,
      },
      {
        name: 'Winnipeg',
        lat: 49.8951,
        lng: -97.1384,
      },
      {
        name: 'Quebec',
        lat: 46.8139,
        lng: -71.208,
      },
      {
        name: 'Hamilton',
        lat: 43.2557,
        lng: -79.8711,
      },
      {
        name: 'Kitchener',
        lat: 43.45,
        lng: -80.4833,
      },
      {
        name: 'London',
        lat: 42.9837,
        lng: -81.2497,
      },
      {
        name: 'Victoria',
        lat: 48.4284,
        lng: -123.3656,
      },
      {
        name: 'Halifax',
        lat: 44.6488,
        lng: -63.5752,
      },
      {
        name: 'Oshawa',
        lat: 43.8977,
        lng: -78.8611,
      },
      {
        name: 'Windsor',
        lat: 42.3016,
        lng: -83.0304,
      },
      {
        name: 'Saskatoon',
        lat: 52.1332,
        lng: -106.67,
      },
      {
        name: 'Regina',
        lat: 50.4452,
        lng: -104.6189,
      },
    ];
    
    for (const city of cities) {
      const content = `

      <option value="${city.name}">${city.name}</option>
      `;
      document.getElementById('city').innerHTML += content;
    }
    document.getElementById('city').addEventListener('change', function () {
      let cityName = '';
      for (let city of cities) {
        if (city.name === this.value) {
          getPrayerTimingsOfCity(city.name);
          document.getElementById('city-name').innerText = city.name;
        }
      }
    });

    function getPrayerTimingsOfCity(cityName) {
      let params = {
        country: 'CA',
        city: cityName,
        method: 0,
      };
      axios
        .get('http://api.aladhan.com/v1/timingsByCity', {
          params: params,
        })
        .then(function (response) {
          const timings = response.data.data.timings;
          fillTimeForPrayer('Fajr-time', timings.Fajr);
          fillTimeForPrayer('Sunrise-time', timings.Sunrise);
          fillTimeForPrayer('Dhuhr-time', timings.Dhuhr);
          fillTimeForPrayer('Asr-time', timings.Asr);
          fillTimeForPrayer('Maghrib-time', timings.Maghrib);
          fillTimeForPrayer('Isha-time', timings.Isha);
          const readableDate = response.data.data.date.readable;
          const weekDayEn = response.data.data.date.gregorian.weekday.en;
          const weekDayAr = response.data.data.date.hijri.weekday.en;
          const readableDateHijri = response.data.data.date.hijri.date;
          document.getElementById('date').innerText =
            readableDate +
            ' - ' +
            weekDayEn +
            ' - ' +
            weekDayAr +
            ' - ' +
            readableDateHijri;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getPrayerTimingsOfCity('Montreal');
    function fillTimeForPrayer(id, time) {
      document.getElementById(id).innerText = time;
    }
   
