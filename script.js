const timezones = [
  'UTC', 'Asia/Kolkata', 'America/New York', 'Europe/London',
  'Asia/Tokyo', 'Australia/Sydney', 'Africa/Cairo', 'Europe/Berlin',
  'America/Los Angeles'
];

const timeSlots_main = [
  "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM",
  "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM",
  "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
];

const timezone1Select = document.getElementById('timezone1Select');
const timezone2Select = document.getElementById('timezone2Select');
const timeSlots = document.getElementById('timeSlots');
const localTime = document.getElementById('localTime');
const convertedTime = document.getElementById('convertedTime');

timezones.forEach(zone => {
  let opt1 = document.createElement('option');
  opt1.value = zone;
  opt1.textContent = zone;
  timezone1Select.appendChild(opt1);

  let opt2 = document.createElement('option');
  opt2.value = zone;
  opt2.textContent = zone;
  timezone2Select.appendChild(opt2);
});

timeSlots_main.forEach(time => {
  let opt = document.createElement('option');
  opt.value = time;
  opt.textContent = time;
  timeSlots.appendChild(opt);
});

function convertTime() {
  const fromZone = timezone1Select.value;
  const toZone = timezone2Select.value;
  const selectedTime = timeSlots.value;

  const today = luxon.DateTime.now().setZone(fromZone);

  const parsedTime = luxon.DateTime.fromFormat(selectedTime, "h:mm a", { zone: fromZone });

  const fullTime = today.set({
    hour: parsedTime.hour,
    minute: parsedTime.minute,
    second: 0,
    millisecond: 0
  });

  const converted = fullTime.setZone(toZone);

  localTime.textContent = `Time in ${fromZone}: ${fullTime.toFormat("dd/MM/yyyy, hh:mm:ss a")}`;
  convertedTime.textContent = `Time in ${toZone}: ${converted.toFormat("dd/MM/yyyy, hh:mm:ss a")}`;
}

fetch('https://worldtimeapi.org/api/ip')
  .then(res => res.json())
  .then(data => {
    const DateTime = luxon.DateTime;
    const time = DateTime.fromISO(data.datetime).toFormat('HH:mm:ss');
    document.getElementById('time').textContent = time;
  })
  .catch(err => {
    document.getElementById('time').textContent = "Error fetching time.";
    console.error(err);
  });


alert("If you face 'Error fetching time' refresh the page")