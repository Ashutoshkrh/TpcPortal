import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-800 py-10">
        <h1 className="text-white text-4xl font-bold text-center">Contact Us</h1>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Training and Placement Cell Contact */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">Training and Placement Cell</h2>
          <p className="text-lg mb-2"><strong>Email:</strong> <a href="mailto:tpc_com@iitp.ac.in" className="text-blue-600">tpc_com@iitp.ac.in</a></p>
          <p className="text-lg mb-2"><strong>Phone:</strong> +91-6115-233664</p>
          <p className="text-lg mb-2"><strong>Location:</strong> IIT Patna, Bihta, Bihar, 801106, India</p>
        </div>

        {/* General IIT Patna Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Administration Contact */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Administration Office</h3>
            <p className="text-lg mb-2"><strong>Phone:</strong> +91-6115-233600</p>
            <p className="text-lg mb-2"><strong>Email:</strong> <a href="mailto:office@iitp.ac.in" className="text-blue-600">office@iitp.ac.in</a></p>
          </div>

          {/* Registrar Contact */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Registrar</h3>
            <p className="text-lg mb-2"><strong>Phone:</strong> +91-6115-233633</p>
            <p className="text-lg mb-2"><strong>Email:</strong> <a href="mailto:registrar@iitp.ac.in" className="text-blue-600">registrar@iitp.ac.in</a></p>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">Location</h2>
          <iframe
            className="w-full h-64 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.224924516738!2d84.85257811498167!3d25.537384483743376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d4bc186afeac1%3A0x47796a2d0c36b04c!2sIndian%20Institute%20of%20Technology%20Patna!5e0!3m2!1sen!2sin!4v1639382809619!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
