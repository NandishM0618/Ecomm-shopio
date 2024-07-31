export default function About(params) {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h1>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to Shopio! We are committed to providing the best services
            to our customers. Our team works tirelessly to ensure that we meet
            and exceed your expectations.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Our mission is to deliver high-quality products that bring value to
            our clients. We believe in innovation, integrity, and excellence in
            everything we do.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            We have grown to become a trusted name in the industry. Our
            dedicated team of professionals is always here to assist you with
            any inquiries or support you may need.
          </p>
          <p className="text-lg text-gray-700">
            Thank you for choosing us. We look forward to serving you!
          </p>
        </div>
      </div>
    </div>
  );
}
