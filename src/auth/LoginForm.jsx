import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import bg from "../assets/5563808.jpg";
import { AiOutlineShopping } from "react-icons/ai";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Validasi input
    if (!form.email || !form.password) {
      setError("Harap isi semua kolom.");
      return;
    }

    async function login() {
      try {
        setLoading(true);

        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/login", {
          email: form.email,
          password: form.password,
        });

        const accessToken = response.data.access_token;
        localStorage.setItem("access_token", accessToken);

        navigate("/user");
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Email atau password salah.");
        } else {
          setError("Terjadi kesalahan saat login.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    login();
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const googleToken = response.credential;
    try {
      setLoading(true);
      async function login() {
        const response = await axios.post(
          import.meta.env.VITE_BASE_URL + "/google-login",
          {
            googleToken,
            googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          }
        );
        const accessToken = response.data.access_token;
        localStorage.setItem("access_token", accessToken);
        navigate("/user");
      }
      login();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      toast.success("Selamat Datang!", { duration: 2000 });
    }
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
    window.google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
        }}
      >
        {" "}
        <AiOutlineShopping className="bg-slate-50 h-32 w-32 rounded-full absolute mb-96  p-4  shadow-xl" />
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl mt-28  ">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Masuk ke akun Anda
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="appearance-none bg-transparent rounded-lg mt-2  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Alamat email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="appearance-none bg-transparent rounded-lg mt-2  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    loading ? "bg-blue-300" : "bg-slate-800 hover:bg-blue-900"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {loading ? "Loading..." : "Masuk"}
                </button>
              </div>{" "}
              <div id="buttonDiv"></div>
              <div className="text-sm text-center">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-200 hover:text-blue-500"
                >
                  Daftar disini
                </Link>
              </div>
              <div className="text-sm text-center">
                Masuk sebagai{" "}
                <Link
                  to="/login-seller"
                  className="font-medium text-blue-200 hover:text-blue-500"
                >
                  Seller
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
