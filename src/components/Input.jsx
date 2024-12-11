import React, { forwardRef, useId } from 'react'

function Input({
    label ,
    type ='text',
    className ="",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {/*For Label */}
        {label && <label
        className='inline-block mb-1 p-1'
        htmlFor={id}
        >
        {label}
        </label>
        }

        {/*For Input field */}
        <input
        type={type}
        className={className}
        ref = {ref}
        {...props}
        id={id}
        />
    </div>
  )
}

export default forwardRef(Input) 