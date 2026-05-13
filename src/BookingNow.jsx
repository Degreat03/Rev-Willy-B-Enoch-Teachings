import { useState } from 'react';
import Calendar from 'react-calendar';
import { supabase } from './SupaBase.js'; 
import 'react-calendar/dist/Calendar.css';

const BookingNow = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false); // Initialized to false

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "04:00 PM"];

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    
    // Note: Table name matches 'Appointments' from your Supabase screenshot
    const { error } = await supabase
      .from('Appointments') 
      .insert([
        {
          full_name: formData.get('fullName'),
          email: formData.get('email'),
          reason: formData.get('reason'),
          appointment_date: selectedDate.toISOString().split('T')[0], 
          appointment_time: selectedTime,
        },
      ]);

    if (error) {
      console.error('Error:', error.message);
      alert('Submission failed: ' + error.message);
      setLoading(false);
    } else {
      setIsBooked(true);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Better UX on mobile
    }
  };

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
        <h1 className="text-3xl font-extrabold text-gray-800">Book an Appointment</h1>
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
                className="rounded-xl border-gray-200 shadow-sm custom-calendar"
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
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">Reason for Visit</label>
              <textarea name="reason" rows="3" required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#db3838] bg-white outline-none resize-none" placeholder="Counseling, prayer request..."></textarea>
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