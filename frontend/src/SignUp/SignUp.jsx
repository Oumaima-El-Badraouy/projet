import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SingUp () {
    
    // state containe the inputs values
    const [userData, setUserData] = useState({
        schoolName:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        phoneNumber:''
    })

    const initialUserDtata = { schoolName:'', email:'', password:'', phoneNumber:''}

    // state containe the value of comformation password
    const [validPassword, setValidPassword] = useState('')

    // state containe the errors of validation inputs
    const [errors, setErrors] = useState({
        schoolName:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        phoneNumber:'',
    })

    const[responseMessage, setResponseMessage] = useState('')
    const[errorMessage, setErrorMessage] = useState('')

    // regex of email
    const validateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // regex of phone number
    const validPhoneNumner = /[0-9]{10}/

    let refEmail = useRef()
    let refPasswordConfirmation = useRef()
    let refPassword = useRef()
    let refSchoolName = useRef()
    let refPhoneNumber = useRef()

    const handleSchoolName = ()=>{
        const school = refSchoolName.current
        if(school.value.trim() === ''){
            setErrors((prevState)=>({...prevState, schoolName:'Le nom de l\'école oubligatoire'}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, schoolName: school.value }))
            setErrors((prevState)=>({...prevState, schoolName:''}))
            return true
        }
    }

    const handleEmail = ()=>{
        const email = refEmail.current
        if(!email.value.trim() === ''){
            setErrors((prevState)=>({...prevState, email:'L\'émail oubligatoire'}))
            return false
        }else if(!email.value.match(validateEmail)){
            setErrors((prevState)=>({...prevState, email:"L'email n'est pas valide"}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, email:email.value}))
            setErrors((prevState)=>({...prevState, email:""}))
            return true
        }
    }

    const handlePassword = ()=>{
        const password = refPassword.current
        if(password.value.trim() === ''){
            setErrors((prevState)=>({...prevState, password:'Mot de passe oubligatoire'}))
            return false
        }else if(password.value.trim().length < 8){
            setErrors((prevState)=>({...prevState, password:'Le mot de passe doit contenir au moins 8 caractères'}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, password: password.value}))
            setErrors((prevState)=>({...prevState, password:''}))
            return true
        }
    }

    const handlePhoneNumber = ()=>{
        const phone = refPhoneNumber.current
        if(phone.value.trim() === ''){
            setErrors((prevState)=>({...prevState, phoneNumber:'Numéro de téléphone oubligatoire'}))
            return false
        }else if(!phone.value.match(validPhoneNumner)){
            setErrors((prevState)=>({...prevState, phoneNumber:"Le numéro de téléphone n'est pas valide (ex: 061010101)"}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, phoneNumber: phone.value}))
            setErrors((prevState)=>({...prevState, phoneNumber:''}))
            return true
        }
    }

    const handlePasswordConfirmation = ()=>{
        const confirmation = refPasswordConfirmation.current
        if(confirmation.value.trim() !== userData.password.trim() && userData.password.trim() !== ''){
            setErrors((prevState)=>({...prevState, passwordConfirmation:'Le mots de passe ne correspondent pas.'}))
            return false
        }else{
            setUserData((prevState)=>({...prevState, passwordConfirmation: confirmation.value}))
            setErrors((prevState)=>({...prevState, passwordConfirmation:''}))
            return true
        }
    }


    
    //  check the values of the inputs
    const handleData = async (e)=>{
        e.preventDefault()
        let validForm = true
        // handleSchoolName() 
        //     handleEmail()
        //     handlePassword()
        //     handlePasswordConfirmation()
        //     handlePhoneNumber()

        // if(handleSchoolName && handleEmail && handlePassword && handlePasswordConfirmation && handlePhoneNumber){
        //     validForm = true
        //     refEmail.current.value = ''
        //     refPasswordConfirmation.current.value = ''
        //     refPassword.current.value = ''
        //     refSchoolName.current.value = ''
        //     refPhoneNumber.current.value = ''
        //     console.log(handleSchoolName , 'IF')

        // }else{
        //     handleSchoolName() 
        //     handleEmail()
        //     handlePassword()
        //     handlePasswordConfirmation()
        //     handlePhoneNumber()
        //     console.log(handleSchoolName , 'ELSE')
        // }
        
        if(userData.schoolName.trim() === ''){
            validForm = false
            setErrors((prevState)=>({...prevState, schoolName:'Le nom de l\'école oubligatoire'}))
        }else{
            setErrors((prevState)=>({...prevState, schoolName:''}))
        }
        if(userData.email.trim() === ''){
            setErrors((prevState)=>({...prevState, email:'L\'émail oubligatoire'}))
        }else if(!userData.email.match(validateEmail)){
            
            setErrors((prevState)=>({...prevState, email:"L'email n'est pas valide"}))
        }else{
            setErrors((prevState)=>({...prevState, email:''}))
        }

        if(userData.password.trim() === ''){
            validForm = false
            setErrors((prevState)=>({...prevState, password:'Mot de passe oubligatoire'}))
        }else if(userData.password.trim().length < 8){
            validForm = false
            setErrors((prevState)=>({...prevState, password:'Le mot de passe doit contenir au moins 8 caractères'}))
        }else{
            setErrors((prevState)=>({...prevState, password:''}))
        }

        if(userData.passwordConfirmation.trim() !== userData.password.trim() && userData.password.trim() !== ''){
            validForm = false
            setErrors((prevState)=>({...prevState, passwordConfirmation:'Le mots de passe ne correspondent pas.'}))
        }else{
            setErrors((prevState)=>({...prevState, passwordConfirmation:''}))
        }

        if(userData.phoneNumber.trim() === ''){
            validForm = false
            setErrors((prevState)=>({...prevState, phoneNumber:'Numéro de téléphone oubligatoire'}))
        }else if(!userData.phoneNumber.trim().match(validPhoneNumner)){
            validForm = false
            setErrors((prevState)=>({...prevState, phoneNumber:"Le numéro de téléphone n'est pas valide (ex: 061010101)"}))
        }else{
            setErrors((prevState)=>({...prevState, phoneNumber:''}))
        }

        try{
            if(validForm){
                refEmail.current.value = ''
                refPasswordConfirmation.current.value = ''
                refPassword.current.value = ''
                refSchoolName.current.value = ''
                refPhoneNumber.current.value = ''

                const response = await axios.post('http://localhost:5001/api/register',userData)
        
                if(response.data.message){
                    setErrorMessage('')
                    setResponseMessage(response.data.message)
                    setUserData(initialUserDtata)
                }else{
                    setErrorMessage(response.data.error)
                }
            }
        }catch(error){
            // console.log('ERROR', error);
            if (error.response) {
                // console.log('Réponse serveur (erreur):', error.response.data);
                setResponseMessage('')
                setErrorMessage(error.response.data.error || "Une erreur est survenue lors de l'inscription.");
            } else {
                setResponseMessage('')
                setErrorMessage("Problème de connexion au serveur.");
            }
        }
    }

    return (
        <div>
            {responseMessage && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium"> {responseMessage}</span> 
                                </div>
            }
            {errorMessage && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium"> {errorMessage}</span> 
                                </div>
            }
            <div className='h-screen lg:flex md:block sm:block items-center justify-around'>
                <div className='lg:w-1/2 xl:w-1/2 2xl:w-1/2 md:w-full sm:w-full text-center h-1/2 grid place-items-center'>
                    <div>
                    <h1 className='mb-4 text-4xl text-blue-700 font-extrabold leading-none tracking-tight md:text-5xl lg:text-5xl dark:text-white'>
                            DALLEEL
                        </h1>
                        <p className='lg:text-3xl text-2xl font-bold'>
                            Ensemble vers un meilleur avenir !
                        </p>
                    </div>
                </div>
                <div className='lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full pb-4'>
                
                    <form className="w-11/12 lg:w-9/12 mx-auto" onSubmit={handleData}> 
                        <div>
                            <h1 className='mb-6 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white'> Créer un compt</h1>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="email" ref={refEmail} onChange={handleEmail} name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            <p className='text-red-600'>{errors.email}</p>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" ref={refPassword} onChange={handlePassword} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mot de passe</label>
                            <p className='text-red-600'>{errors.password}</p>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="password" ref={refPasswordConfirmation} onChange={handlePasswordConfirmation} name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmé le mot de passe</label>
                            <p className='text-red-600'>{errors.passwordConfirmation}</p>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" ref={refSchoolName} onChange={handleSchoolName} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom d'école</label>
                                <p className='text-red-600'>{errors.schoolName}</p>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="tel" ref={refPhoneNumber} onChange={handlePhoneNumber} name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                                <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Numéro téléphone </label>
                                <p className='text-red-600'>{errors.phoneNumber}</p>
                            </div>
                        </div>
                        <Link to={'/Login'} className='mb-3 block'>
                            Déjà inscrit ? <button className='text-blue-600'>Se connecter</button>
                        </Link>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
