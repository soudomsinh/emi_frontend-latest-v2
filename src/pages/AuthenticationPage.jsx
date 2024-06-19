
import { Link } from "react-router-dom"
import emi_logo from'../assets/images/emi_logo.png'
// import LoginPage from "./LoginPage"

const AuthenticationPage = ({onLogin}) => {
  return (
    <>
      <div className="flex w-full h-screen bg-gray-200">
        <div className="w-full flex items-center justify-center lg:w-2/2 ">
          <div className="bg-white text-black py-10 px-20 rounded-md shadow-md ">
            <h1 className="text-5xl font-semibold"> Welcome back</h1>
            <p className="font-medium text-lg text-gray-500 mt-4" >Please enter your details</p>
            <div className="space-y-5 mt-8">
              <div >
                <label 
                  className="text-lg font-medium"
                  htmlFor="">
                  Email: 
                </label>
                <input 
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border-2 border-gray-100 rounded-md p-3 bg-transparent"
                />
              </div>
              <div>
                <label 
                  className="text-lg font-medium"
                  htmlFor="">Password: </label>
                <input 
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border-2 border-gray-100 rounded-md p-3 bg-transparent"

                />
              </div>
              <div className="flex justify-between items-center">
                <button className="font-medium text-base text-green-700">Forget password</button>
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <Link 
                  to='/3-in-1-credit'
                  onClick={onLogin}
                  className="  bg-emerald-500 text-white text-lg font-bold py-3 rounded-md active:scale-[.98] active:duration-75 transition-all"
                >
                  <p className="text-center">Sign in</p>
                </Link>
                <button>Sign in with Google</button>
                <button>Sign in with Microsoft</button>
                <div className="flex justify-between items-center">
                  <p>Don't have an account? </p>
                    <Link 
                      to='/register'
                      className="text-green-700"
                    >
                      Register
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex h-full w-full items-center justify-center bg-white">
          <div className="w-full h-full p-8">
              <img 
                className='w-full h-full object-contain animate-pulse'
                src={emi_logo} alt="emi image" 
              />
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthenticationPage