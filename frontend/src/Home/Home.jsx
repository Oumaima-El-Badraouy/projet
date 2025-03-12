import React from 'react'
import homeBG from '../assets/homeBG.jpg'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <section class="h-screen bg-center bg-no-repeat bg-[url('./assets/homeBG.jpg')] bg-gray-700 bg-blend-multiply">
      <div class="px-2 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 class="mb-5 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"> Offrez à vos étudiants un accompagnement sur mesure pour leur avenir !</h1>
          {/* <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
          <div class="p-9 sm:justify-center sm:space-y-0">
            <Link type='button' to="/signup" class="text-white bg-blue-600 hover:bg-gradient-to-br focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Créer un compte École
            </Link>
          </div>
      </div>
    </section>
  )
}

export default Home