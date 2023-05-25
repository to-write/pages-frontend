import React from 'react'
import InputField from '../shared/components/InputField'
import TextareaField from '../shared/components/TextareaField'

const TempPage = () => {
  return (
    <div style={{ background: '#fff', height: 600 }}>
      <InputField label='default' placeholder='default' />
      <br />
      <InputField label='error' error placeholder='error' />
      <br />
      <InputField label='read-only' readOnly />
      <br />
      <TextareaField placeholder='textarea field' />
    </div>
  )
}

export default TempPage
