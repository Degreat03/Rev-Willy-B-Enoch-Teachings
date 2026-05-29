import { useState } from 'react';
import Calendar from 'react-calendar';
import { supabase } from './SupaBase.js'; 
import 'react-calendar/dist/Calendar.css';
import emailjs from "@emailjs/browser";

const BookingNow = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "04:00 PM"];

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const reason = formData.get('reason');
    const country = formData.get('country');
    
    // 1. Save to Supabase Table
    const { error } = await supabase
      .from('Appointments') 
      .insert([
        {
          full_name: fullName,
          email: email,
          phone: phone,
          reason: reason,
          country: country,
          appointment_date: selectedDate.toISOString().split('T')[0], 
          appointment_time: selectedTime,
        },
      ]);

    if (error) {
      console.error('Error:', error.message);
      alert('Submission failed: ' + error.message);
      setLoading(false);
    } else {
      // 2. Database insert succeeded -> Trigger EmailJS to notify the pastor
      const emailParams = {
        user_name: fullName,
        user_email: email,
        user_phone: phone,
        user_country: country,
        appointment_date: selectedDate.toDateString(),
        appointment_time: selectedTime,
        booking_reason: reason
      };

      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setIsBooked(true); 
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((mailError) => {
        console.error('Failed to send email to pastor:', mailError);
        // Still show the success UI screen since data saved to Supabase perfectly
        setIsBooked(true);
        setLoading(false);
      });
    }
  }; // Closes handleBooking

  // --- Success State View ---
  if (isBooked) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 bg-green-50 border border-green-200 rounded-xl text-center shadow-sm">
        <div className="text-5xl mb-4">🙏</div>
        <h2 className="text-2xl font-bold text-green-700">Appointment Requested!</h2>
        <p className="mt-2 text-green-600">
          The pastor's office will review your request for <br/>
          <span className="font-bold">{selectedDate.toDateString()}</span> at <span className="font-bold">{selectedTime}</span>.
        </p>
        <button 
          onClick={() => { setIsBooked(false); setSelectedTime(null); }} 
          className="mt-6 bg-[#db3838] text-white py-2 px-8 rounded-lg hover:bg-[#a52a2a] transition-all cursor-pointer shadow-md"
        >
          Book Another
        </button>
      </div>
    );
  }

  // --- Main Booking View ---
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-2xl rounded-2xl my-10 md:my-20">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-[#a52a2a]">Book an Appointment</h1>
        <p className="text-gray-500 mt-2">Select a convenient time for your spiritual counseling or meeting.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Date & Time */}
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="bg-[#db3838] text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">1</span>
              Select a Date
            </h3>
            <div className="flex justify-center lg:justify-start">
              <Calendar 
                onChange={setSelectedDate} 
                value={selectedDate}
                minDate={new Date()} 
                className="rounded-xl border-gray-200 shadow-sm text-[#a52a2a] custom-calendar"
              />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="bg-[#db3838] text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">2</span>
              Available Slots
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-3 px-4 rounded-lg border text-sm font-semibold transition-all cursor-pointer
                    ${selectedTime === slot 
                      ? 'bg-[#db3838] text-white border-[#db3838] shadow-md scale-105' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#db3838] hover:bg-red-50'
                    }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Form */}
        <div className={`bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 transition-all ${!selectedTime ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>
          <h3 className="text-lg font-semibold mb-6 flex items-center text-gray-800">
            <span className="bg-[#db3838] text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">3</span>
            Your Details
          </h3>
          
          <form onSubmit={handleBooking} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">Full Name</label>
              <input name="fullName" type="text" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#db3838] bg-white outline-none" placeholder="Emmanuel Great" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">Email Address</label>
              <input name="email" type="email" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#db3838] bg-white outline-none" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">Phone Number</label>
              <input name="phone" type="number" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#db3838] bg-white outline-none" placeholder="+234 789 670 5671" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">Reason for Visit</label>
              <textarea name="reason" rows="3" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#db3838] bg-white outline-none resize-none" placeholder="Counseling, prayer request..."></textarea>
            </div>
            <div>
              <select 
                name="country" 
                required 
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#db3838] bg-white outline-none text-gray-700 cursor-pointer"
              >
                <option value="" disabled selected>Select your country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cabo Verde">Cabo Verde</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
                <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Eswatini">Eswatini</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Greece">Greece</option>
                <option value="Grenada">Grenada</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Honduras">Honduras</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia">Micronesia</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="North Korea">North Korea</option>
                <option value="North Macedonia">North Macedonia</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestine State">Palestine State</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Qatar">Qatar</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Korea">South Korea</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-Leste">Timor-Leste</option>
                <option value="Togo">Togo</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#db3838] hover:bg-[#a52a2a] cursor-pointer'}`}
            >
              {loading ? (
                <span className="flex items-center">
                   Booking...
                </span>
              ) : `Confirm for ${selectedTime}`}
            </button>
          </form>
          {!selectedTime && <p className="text-xs text-center text-gray-400 mt-4 italic">Please select a time slot above to continue.</p>}
        </div>
      </div>
    </div>
  );
};

export default BookingNow;