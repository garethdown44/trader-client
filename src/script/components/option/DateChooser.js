import React from 'react'
import moment from 'moment'

export default function DateChooser(props) {

  let date = moment(props.expiryDate).format('DD-MM-YY');

  return (<input {...props} value={date} type='text' />);
}