import React from 'react'

export default function NotionalTextBox(props) {
  return <input className={props.className} type='text' value={props.value} onChange={props.onChange} />;
}
