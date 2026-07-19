import SignupForm from "../../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left */}

        <div className="hidden flex-col justify-center bg-blue-600 p-16 text-white lg:flex">
          <h1 className="text-5xl font-bold leading-tight">
            Join
            <br />
            ServiceHub
          </h1>

          <p className="mt-6 max-w-md text-lg text-blue-100">
            Create your account and connect with thousands of trusted service
            providers and customers.
          </p>

          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop"
            alt="Signup"
            className="mt-12 h-[420px] rounded-2xl object-cover shadow-2xl"
          />
        </div>

        {/* Right */}

        <div className="flex items-center justify-center px-6 py-12">
          <SignupForm />
        </div>
      </div>
    </section>
  );
};

export default SignupPage;