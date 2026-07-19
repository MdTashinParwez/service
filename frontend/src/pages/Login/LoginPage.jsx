import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left Section */}

        <div className="hidden flex-col justify-center bg-blue-600 p-16 text-white lg:flex">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back to
            <br />
            ServiceHub
          </h1>

          <p className="mt-6 max-w-md text-lg text-blue-100">
            Find trusted professionals, manage bookings, and access thousands
            of verified services across India.
          </p>

          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop"
            alt="Login"
            className="mt-12 h-[420px] rounded-2xl object-cover shadow-2xl"
          />
        </div>

        {/* Right Section */}

        <div className="flex items-center justify-center px-6 py-12">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;