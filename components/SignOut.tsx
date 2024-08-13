import { cookies } from 'next/headers';
import React from 'react'




const SignOut = () => {
    async function action() {
        "use server"
        cookies().delete("jwt")
    }
  return (
      <form action={action}>
          <button>sign out</button>
    </form>
  )
}

export default SignOut



