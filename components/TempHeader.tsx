import React from 'react'
// import { useSession, signIn, signOut } from 'next-auth/react'

type TempHeaderProps = {}

const TempHeader: React.FC<TempHeaderProps> = () => {
  // const { data: session } = useSession() // The session will return the user’s details.
  // FIXME type <any>
  const handleSignin = (event: any) => {
    event.preventDefault()
    // signIn()
  }
  const handleSignout = (event: any) => {
    event.preventDefault()
    // signOut()
  }
  return (
    <div>
      {/* {session && (
        <a href='#' onClick={handleSignout} className='btn-signin'>
          Sign out
        </a>
      )}
      {!session && (
        <a href='#' onClick={handleSignin} className='btn-signin'>
          Sign in
        </a>
      )} */}
    </div>
  )
}
export default TempHeader
