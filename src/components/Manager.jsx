import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const [forms, setForms] = useState({ site: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showpassword, setshowpassword] = useState(false)


  useEffect(() => {
    let pass = localStorage.getItem('passwords');
    if (pass) {
      setPasswordArray(JSON.parse(pass));
    }
  }, []);

  const handleChange = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const handleHide = () => {
    setshowpassword(!showpassword)

  }

  const savePassword = () => {
    setForms({ site: "", username: "", password: "" })
    setPasswordArray([...passwordArray, forms]);
    localStorage.setItem('passwords', JSON.stringify([...passwordArray, forms]));
    console.log([...passwordArray, forms]);

  };

  const handleDelete = (passw) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this?");
    if (isConfirmed) {
      let newarray = passwordArray.filter(item => {
        return item.site !== passw
      })
      setPasswordArray(newarray)
    }

    // what the previous code was doing that setpasswordarray(newarray)takes time to change or update and before updating we were calling the savepassword due to which the oldpasswordArray was priniting and saving
    useEffect(() => {
      savePassword();
    }, [passwordArray]);
  }

  const handleEdit = (site) => {
    // Find the entry in passwordArray that matches the specified site
    const edit = passwordArray.find((item) => item.site === site);

    if (edit) {
      // Update the forms state with the found entry
      setForms({
        site: edit.site,
        username: edit.username,
        password: edit.password
      });
      let newpasswordarray = passwordArray.filter((item) => {
        return item.site !== site
      })
      setPasswordArray(newpasswordarray)
    } else {
      console.log(`No entry found for site: ${site}`);
    }

    useEffect(() => {
      savePassword();
    }, [passwordArray])





  };


  return (
    <>




      <div>
        <div className="heading">
          <h1 className='text-3xl flex justify-center items-center my-5'>
            <span className='text-black'>Pass</span>
            <span className='text-green-500'>OP</span>
          </h1>
        </div>
        <div className="inputs flex flex-col items-center ">
          <input value={forms.site} onChange={handleChange} className="mb-8 px-4 py-2 text-center border border-gray-300 rounded-md w-3/4" placeholder="Enter URL" type="text" name='site' />
          <div className="flex gap-9">
            <input value={forms.username} onChange={handleChange} className="mr-4 px-40 py-2 border border-gray-300 rounded-md " placeholder="Enter Username" type="text" name='username' />
            <div>
              <input type={showpassword ? 'text' : 'password'} value={forms.password} onChange={handleChange} className="px-14 py-2 border border-gray-300 rounded-md relative" placeholder="Enter Password" name='password' />
              {showpassword ? <img onClick={handleHide} className='absolute right-1/4 top-52' src="/iconmonstr-eye-10.svg" alt="" /> : <img onClick={handleHide} className='absolute right-1/4 top-52' src="/iconmonstr-eye-9.svg" alt="" />}
            </div>
          </div>
          <button onClick={savePassword} className="mt-8 flex items-center px-10 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            >
            </lord-icon>
            <span className='mx-2'>Add</span>
          </button>
        </div>
        <div className="passwords my-5 ">
          <h2 className="font-bold text-xl mb-4 flex justify-center ">Your Passwords</h2>
          {passwordArray.length === 0 && <div className='flex justify-center'> No passwords to show yet</div>}
          {passwordArray.length !== 0 && <table className="w-2/3 bg-green-100 rounded-lg mx-auto  ">
            <thead className=''>
              <tr>
                <th className="bg-green-500 text-white px-4 py-2 text-center">URL</th>
                <th className="bg-green-500 text-white px-4 py-2 text-center">Username</th>
                <th className="bg-green-500 text-white px-4 py-2 text-center">Password</th>
                <th className="bg-green-500 text-white px-4 py-2 text-center">Edit</th>
                <th className="bg-green-500 text-white px-4 py-2 text-center">Delete</th>

              </tr>
            </thead>

            {passwordArray.map((item) => {
              return <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2 text-center"><a href={item.site}></a>{item.site}</td>
                  <td className="px-4 py-2 text-center">{item.username}</td>
                  <td className="px-4 py-2 text-center">{item.password}</td>
                  <td className="px-4 py-2 text-center"><button onClick={() => { handleEdit(item.site) }} ><img src="/edit.svg" alt="edit" /></button></td>
                  <td className="px-4 py-2 text-center"><button onClick={() => { handleDelete(item.site) }}>
                    <lord-icon
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover"
                    >
                    </lord-icon>
                  </button></td>

                </tr>
              </tbody>

            })}
          </table>
          }

        </div>




      </div>
    </>

  );
};

export default Manager;

